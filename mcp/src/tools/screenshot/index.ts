import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import * as S from "../../shared/types/params/screenshot/index.js";
import { getToken } from "../token-mgmt/index.js";

// Helper to get current file key from plugin
async function getCurrentFileKey(taskManager: TaskManager): Promise<string | null> {
  try {
    const taskResult = await taskManager.runTask<any, {}>("get-file-key", {});
    
    // The result is a string containing JSON
    if (!taskResult || typeof taskResult !== 'string') {
      return null;
    }
    
    // Check for errors in the result string
    if (taskResult.includes("error") || taskResult.includes("Error")) {
      return null;
    }
    
    // Parse the JSON result
    const parsed = JSON.parse(taskResult);
    return parsed.fileKey || null;
  } catch (error) {
    console.error("Failed to get file key:", error);
    return null;
  }
}

// Helper to make authenticated Figma API calls and download images
async function downloadImage(endpoint: string, token: string): Promise<{ data: string; mimeType: string } | { error: string }> {
  try {
    const response = await fetch(`https://api.figma.com/v1${endpoint}`, {
      headers: { "X-Figma-Token": token }
    });
    
    if (!response.ok) {
      return { error: `Figma API error: ${response.status} ${response.statusText}` };
    }
    
    const data = await response.json() as any;
    
    // Extract image URL from response
    const imageKeys = data.images ? Object.keys(data.images) : [];
    if (imageKeys.length === 0) {
      return { error: "No image URL returned from Figma API" };
    }
    
    const firstKey = imageKeys[0];
    if (!firstKey) {
      return { error: "No image key found in response" };
    }
    
    const imageUrl = data.images[firstKey];
    if (!imageUrl) {
      return { error: "No image URL returned from Figma API" };
    }
    
    // Download the actual image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return { error: `Failed to download image: ${imageResponse.status}` };
    }
    
    // Get image as buffer and convert to base64
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    
    // Determine MIME type from content-type header
    const contentType = imageResponse.headers.get('content-type') || 'image/png';
    
    return {
      data: base64,
      mimeType: contentType
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export function registerScreenshotTools(server: McpServer, taskManager: TaskManager) {
  server.tool(
    "screenshot-node",
    "Take a screenshot of a specific layer/node and return the image to the AI. Use this to visually inspect designs, validate layouts, or analyze node appearance.",
    S.ScreenshotNodeParamsSchema.shape,
    async (p: S.ScreenshotNodeParams) => {
      const token = getToken();
      if (!token) {
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ error: "No API token configured. Use request-api-token first." })
          }]
        };
      }
      
      // Get current file key from plugin
      const fileKey = await getCurrentFileKey(taskManager);
      if (!fileKey) {
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ error: "Could not determine current file. Make sure you have a file open in Figma." })
          }]
        };
      }
      
      // Build API endpoint for image export
      const scale = p.scale || 2;
      const format = p.format || "png";
      const endpoint = `/images/${fileKey}?ids=${p.nodeId}&format=${format}&scale=${scale}`;
      
      // Download the image
      const result = await downloadImage(endpoint, token);
      
      if ('error' in result) {
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ error: result.error })
          }]
        };
      }
      
      // Return image to AI
      return {
        content: [
          {
            type: "image",
            data: result.data,
            mimeType: result.mimeType
          },
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              nodeId: p.nodeId,
              format: format,
              scale: scale,
              message: `Screenshot captured successfully for node ${p.nodeId}`
            })
          }
        ]
      };
    }
  );
}
