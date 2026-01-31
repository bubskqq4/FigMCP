import { ToolResult } from "../tool-result";
import * as T from "@shared/types/params/token-mgmt/index";

// Token storage key
const TOKEN_KEY = "figma-mcp-api-token";

export async function requestApiToken(args: T.RequestApiTokenParams): Promise<ToolResult> {
  // This would ideally trigger a UI dialog, but for now we'll use clientStorage
  // The plugin UI should handle this via a separate message
  
  // Check if token already exists
  const existingToken = await figma.clientStorage.getAsync(TOKEN_KEY);
  if (existingToken) {
    return {
      isError: false,
      content: JSON.stringify({
        hasToken: true,
        message: "Token already stored. Use clear-api-token to remove it first.",
        tokenPreview: `${existingToken.substring(0, 8)}...`
      })
    };
  }

  // Signal to UI that we need token input
  figma.ui.postMessage({ type: "REQUEST_TOKEN", message: args.message });
  
  return {
    isError: false,
    content: JSON.stringify({
      hasToken: false,
      message: "Token input requested. Please enter your Figma Personal Access Token in the plugin UI.",
      instructions: "Go to Figma Account Settings > Personal Access Tokens to generate one."
    })
  };
}

export async function storeApiToken(token: string): Promise<ToolResult> {
  await figma.clientStorage.setAsync(TOKEN_KEY, token);
  return {
    isError: false,
    content: JSON.stringify({
      stored: true,
      tokenPreview: `${token.substring(0, 8)}...`
    })
  };
}

export async function getStoredToken(): Promise<string | null> {
  return await figma.clientStorage.getAsync(TOKEN_KEY);
}

export async function clearApiToken(_args: T.ClearApiTokenParams): Promise<ToolResult> {
  await figma.clientStorage.deleteAsync(TOKEN_KEY);
  return {
    isError: false,
    content: JSON.stringify({ cleared: true })
  };
}

export async function getPluginSettings(_args: T.GetPluginSettingsParams): Promise<ToolResult> {
  const hasToken = !!(await figma.clientStorage.getAsync(TOKEN_KEY));
  
  return {
    isError: false,
    content: JSON.stringify({
      hasApiToken: hasToken,
      pluginVersion: "1.0.0",
      figmaFileKey: figma.fileKey,
      currentPageId: figma.currentPage.id,
      currentPageName: figma.currentPage.name,
      documentName: figma.root.name,
    })
  };
}
