import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as T from "../../shared/types/params/token-mgmt/index.js";
import { z } from "zod";

// In-memory token storage (per session)
let currentToken: string | null = null;
let tokenValidated: boolean = false;

export function setToken(token: string) {
  currentToken = token;
  tokenValidated = false;
}

export function getToken(): string | null {
  return currentToken;
}

export function clearToken() {
  currentToken = null;
  tokenValidated = false;
}

// Schema for set-api-token
const SetApiTokenParamsSchema = z.object({
  token: z.string().describe("The Figma Personal Access Token (starts with figd_)")
});

export function registerTokenManagementTools(server: McpServer, taskManager: TaskManager) {
  // Set API token directly
  server.tool("set-api-token", "Set the Figma Personal Access Token directly.", SetApiTokenParamsSchema.shape,
    async (params) => {
      if (!params.token || !params.token.trim()) {
        return { content: [{ type: "text", text: JSON.stringify({ success: false, error: "Token is required" }) }] };
      }
      setToken(params.token.trim());
      return { 
        content: [{ 
          type: "text", 
          text: JSON.stringify({ 
            success: true, 
            message: "Token stored successfully",
            tokenPreview: `${params.token.substring(0, 8)}...`
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
  server.tool("get-token-status", "Check if token is configured.", T.GetTokenStatusParamsSchema.shape,
    async (_params: T.GetTokenStatusParams) => {
      return { 
        content: [{ 
          type: "text", 
          text: JSON.stringify({ 
            hasToken: currentToken !== null, 
            validated: tokenValidated,
            tokenLength: currentToken ? currentToken.length : 0
          }) 
        }] 
      };
    });

  // Clear API token
  server.tool("clear-api-token", "Remove stored token.", T.ClearApiTokenParamsSchema.shape,
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
