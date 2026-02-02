import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as T from "../../shared/types/params/token-mgmt/index.js";
import { z } from "zod";
import * as fs from 'fs';
import * as path from 'path';

// Token file path - users can manually edit this file
const TOKEN_FILE_NAME = 'figma-token.txt';
const TOKEN_FILE_PATH = path.join(process.cwd(), TOKEN_FILE_NAME);

// In-memory token storage (per session)
let currentToken: string | null = null;
let tokenValidated: boolean = false;
let tokenSource: 'env' | 'file' | 'manual' | null = null;

/**
 * Load token from environment variable or config file
 * Priority: ENV > File > null
 */
function loadTokenFromConfig(): void {
  // 1. Check environment variable first
  const envToken = process.env.FIGMA_PERSONAL_ACCESS_TOKEN || process.env.FIGMA_TOKEN;
  if (envToken && envToken.trim()) {
    currentToken = envToken.trim();
    tokenSource = 'env';
    console.error(`[Token] Loaded Figma token from environment variable (${currentToken.substring(0, 8)}...)`);
    return;
  }

  // 2. Check config file
  try {
    if (fs.existsSync(TOKEN_FILE_PATH)) {
      const fileContent = fs.readFileSync(TOKEN_FILE_PATH, 'utf-8').trim();
      // Skip if file is empty or contains only the placeholder
      if (fileContent && !fileContent.startsWith('#') && !fileContent.includes('YOUR_TOKEN_HERE')) {
        currentToken = fileContent;
        tokenSource = 'file';
        console.error(`[Token] Loaded Figma token from ${TOKEN_FILE_NAME} (${currentToken.substring(0, 8)}...)`);
        return;
      }
    }
  } catch (error) {
    console.error(`[Token] Failed to read token file:`, error);
  }

  // 3. Create the token file with instructions if it doesn't exist
  ensureTokenFileExists();
  
  console.error(`[Token] No token configured. Add your token to ${TOKEN_FILE_NAME} or set FIGMA_PERSONAL_ACCESS_TOKEN environment variable.`);
}

/**
 * Create the token file with instructions if it doesn't exist
 */
function ensureTokenFileExists(): void {
  try {
    if (!fs.existsSync(TOKEN_FILE_PATH)) {
      const instructions = `# Figma Personal Access Token
# 
# Replace this entire file content with your Figma Personal Access Token.
# Get your token from: https://www.figma.com/developers/api#access-tokens
#
# Your token should start with "figd_" 
# Example: figd_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
#
# Alternatively, set the FIGMA_PERSONAL_ACCESS_TOKEN environment variable in your .env file:
# FIGMA_PERSONAL_ACCESS_TOKEN=figd_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
#
# DELETE ALL THESE COMMENTS and paste ONLY your token below:
YOUR_TOKEN_HERE`;
      
      fs.writeFileSync(TOKEN_FILE_PATH, instructions, 'utf-8');
      console.error(`[Token] Created ${TOKEN_FILE_NAME} - please add your Figma Personal Access Token to this file.`);
    }
  } catch (error) {
    console.error(`[Token] Failed to create token file:`, error);
  }
}

/**
 * Save token to file for persistence
 */
function saveTokenToFile(token: string): boolean {
  try {
    fs.writeFileSync(TOKEN_FILE_PATH, token, 'utf-8');
    console.error(`[Token] Token saved to ${TOKEN_FILE_NAME}`);
    return true;
  } catch (error) {
    console.error(`[Token] Failed to save token to file:`, error);
    return false;
  }
}

// Initialize token on module load
loadTokenFromConfig();

export function setToken(token: string, persist: boolean = true) {
  currentToken = token;
  tokenValidated = false;
  tokenSource = 'manual';
  
  // Optionally persist to file
  if (persist) {
    saveTokenToFile(token);
    tokenSource = 'file';
  }
}

export function getToken(): string | null {
  return currentToken;
}

export function getTokenSource(): 'env' | 'file' | 'manual' | null {
  return tokenSource;
}

export function getTokenFilePath(): string {
  return TOKEN_FILE_PATH;
}

export function reloadToken(): void {
  currentToken = null;
  tokenValidated = false;
  tokenSource = null;
  loadTokenFromConfig();
}

export function clearToken() {
  currentToken = null;
  tokenValidated = false;
  tokenSource = null;
}

// Schema for set-api-token
const SetApiTokenParamsSchema = z.object({
  token: z.string().describe("The Figma Personal Access Token (starts with figd_)"),
  persist: z.boolean().optional().describe("Whether to save the token to file for persistence across sessions. Defaults to true.")
});

export function registerTokenManagementTools(server: McpServer, taskManager: TaskManager) {
  // Set API token directly
  server.tool("set-api-token", "Set the Figma Personal Access Token directly. By default, saves to file for persistence.", SetApiTokenParamsSchema.shape,
    async (params) => {
      if (!params.token || !params.token.trim()) {
        return { content: [{ type: "text", text: JSON.stringify({ success: false, error: "Token is required" }) }] };
      }
      
      const persist = params.persist !== false; // Default to true
      setToken(params.token.trim(), persist);
      
      return { 
        content: [{ 
          type: "text", 
          text: JSON.stringify({ 
            success: true, 
            message: persist 
              ? `Token stored and saved to ${TOKEN_FILE_NAME} for persistence`
              : "Token stored in memory (session only)",
            tokenPreview: `${params.token.substring(0, 8)}...`,
            tokenFilePath: persist ? TOKEN_FILE_PATH : undefined
          }) 
        }] 
      };
    });

  // Request API token - sends request to plugin to show dialog
  server.tool("request-api-token", "Prompt user to enter Figma Personal Access Token.", T.RequestApiTokenParamsSchema.shape,
    async (params: T.RequestApiTokenParams) => {
      return await safeToolProcessor(taskManager.runTask("request-api-token", params));
    });

  // Validate API token - test if stored token works
  server.tool("validate-api-token", "Test if stored token is valid.", T.ValidateApiTokenParamsSchema.shape,
    async (params: T.ValidateApiTokenParams) => {
      if (!currentToken) {
        return { content: [{ type: "text", text: JSON.stringify({ valid: false, error: "No token stored" }) }] };
      }
      
      try {
        // Test the token by calling Figma API /v1/me
        const response = await fetch("https://api.figma.com/v1/me", {
          headers: { "X-Figma-Token": currentToken }
        });
        
        if (response.ok) {
          const data = await response.json() as { id: string; email: string; handle: string };
          tokenValidated = true;
          return { content: [{ type: "text", text: JSON.stringify({ valid: true, user: { id: data.id, email: data.email, handle: data.handle } }) }] };
        } else {
          tokenValidated = false;
          return { content: [{ type: "text", text: JSON.stringify({ valid: false, error: `API returned ${response.status}` }) }] };
        }
      } catch (error) {
        tokenValidated = false;
        return { content: [{ type: "text", text: JSON.stringify({ valid: false, error: error instanceof Error ? error.message : "Unknown error" }) }] };
      }
    });

  // Get token status
  server.tool("get-token-status", "Check if token is configured and where it was loaded from.", T.GetTokenStatusParamsSchema.shape,
    async (_params: T.GetTokenStatusParams) => {
      return { 
        content: [{ 
          type: "text", 
          text: JSON.stringify({ 
            hasToken: currentToken !== null, 
            validated: tokenValidated,
            tokenLength: currentToken ? currentToken.length : 0,
            tokenSource: tokenSource,
            tokenFilePath: TOKEN_FILE_PATH,
            tokenPreview: currentToken ? `${currentToken.substring(0, 8)}...` : null,
            instructions: !currentToken 
              ? `To configure your token, either:
1. Add your Figma Personal Access Token to: ${TOKEN_FILE_PATH}
2. Or set FIGMA_PERSONAL_ACCESS_TOKEN in your .env file
3. Or use the set-api-token tool to set it directly

Get your token from: https://www.figma.com/developers/api#access-tokens`
              : null
          }) 
        }] 
      };
    });

  // Reload token from file/env
  server.tool("reload-api-token", "Reload the API token from environment variable or config file. Use after manually editing the token file.", {},
    async () => {
      reloadToken();
      return { 
        content: [{ 
          type: "text", 
          text: JSON.stringify({ 
            success: true,
            hasToken: currentToken !== null,
            tokenSource: tokenSource,
            tokenPreview: currentToken ? `${currentToken.substring(0, 8)}...` : null,
            message: currentToken 
              ? `Token reloaded successfully from ${tokenSource}`
              : `No token found. Please add your token to ${TOKEN_FILE_PATH} or set FIGMA_PERSONAL_ACCESS_TOKEN environment variable.`
          }) 
        }] 
      };
    });

  // Clear API token
  server.tool("clear-api-token", "Remove stored token from memory (does not delete the config file).", T.ClearApiTokenParamsSchema.shape,
    async (_params: T.ClearApiTokenParams) => {
      clearToken();
      return { content: [{ type: "text", text: JSON.stringify({ cleared: true }) }] };
    });

  // Get plugin settings
  server.tool("get-plugin-settings", "Get current plugin configuration.", T.GetPluginSettingsParamsSchema.shape,
    async (_params: T.GetPluginSettingsParams) => {
      return await safeToolProcessor(taskManager.runTask("get-plugin-settings", _params));
    });
}
