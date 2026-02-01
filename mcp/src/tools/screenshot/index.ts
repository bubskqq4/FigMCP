import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import * as S from "../../shared/types/params/screenshot/index.js";
import { getToken } from "../token-mgmt/index.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Helper to save image to file
function saveImageToFile(base64Data: string, format: string, customPath?: string): string {
  try {
    let filePath: string;
    
    if (customPath) {
      // Use custom path - ensure directory exists
      const dir = path.dirname(customPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      filePath = customPath;
    } else {
      // Use temp directory
      const tempDir = os.tmpdir();
      const timestamp = Date.now();
      const filename = `figma-screenshot-${timestamp}.${format}`;
      filePath = path.join(tempDir, filename);
    }
    
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filePath, buffer);
    
    console.error("[Screenshot] Saved image to:", filePath);
    return filePath;
  } catch (error) {
    console.error("[Screenshot] Failed to save file:", error);
    return '';
  }
}

// Helper to get current file key from plugin
async function getCurrentFileKey(taskManager: TaskManager): Promise<string | null> {
  try {
    const taskResult = await taskManager.runTask<any, {}>("get-file-key", {});
    
    // The result is a string containing JSON
    if (!taskResult || typeof taskResult !== 'string') {
      console.error("[Screenshot] No task result or not a string:", taskResult);
      return null;
    }
    
    // Check for errors in the result string
    if (taskResult.includes("error") || taskResult.includes("Error")) {
      console.error("[Screenshot] Error in task result:", taskResult);
      return null;
    }
    
    // Parse the JSON result
    const parsed = JSON.parse(taskResult);
    console.error("[Screenshot] Got file key:", parsed.fileKey);
    return parsed.fileKey || null;
  } catch (error) {
    console.error("[Screenshot] Failed to get file key:", error);
    return null;
  }
}

// Helper to clean mimeType (remove charset and other extra info)
function cleanMimeType(contentType: string): string {
  // Extract just the mime type, e.g., "image/png" from "image/png; charset=utf-8"
  const mimeType = contentType.split(';')[0]?.trim().toLowerCase() || 'image/png';
  
  // Normalize common mime types
  if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
    return 'image/jpeg';
  }
  if (mimeType === 'image/png') {
    return 'image/png';
  }
  if (mimeType === 'image/webp') {
    return 'image/webp';
  }
  if (mimeType === 'image/gif') {
    return 'image/gif';
  }
  
  // Default to png if unknown
  return 'image/png';
}

// Helper to make authenticated Figma API calls and download images
async function downloadImage(endpoint: string, token: string): Promise<{ data: string; mimeType: string } | { error: string }> {
  try {
    console.error("[Screenshot] Fetching from Figma API:", `https://api.figma.com/v1${endpoint}`);
    
    const response = await fetch(`https://api.figma.com/v1${endpoint}`, {
      headers: { "X-Figma-Token": token }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Screenshot] Figma API error response:", errorText);
      return { error: `Figma API error: ${response.status} ${response.statusText}` };
    }
    
    const data = await response.json() as any;
    console.error("[Screenshot] Figma API response:", JSON.stringify(data, null, 2));
    
    // Check for API errors
    if (data.err) {
      return { error: `Figma API error: ${data.err}` };
    }
    
    // Extract image URL from response
    const imageKeys = data.images ? Object.keys(data.images) : [];
    if (imageKeys.length === 0) {
      return { error: "No image URL returned from Figma API. Check that the node ID exists and is visible." };
    }
    
    const firstKey = imageKeys[0];
    if (!firstKey) {
      return { error: "No image key found in response" };
    }
    
    const imageUrl = data.images[firstKey];
    if (!imageUrl) {
      return { error: `Image URL is null for node ${firstKey}. The node may not be renderable.` };
    }
    
    console.error("[Screenshot] Downloading image from:", imageUrl);
    
    // Download the actual image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return { error: `Failed to download image: ${imageResponse.status}` };
    }
    
    // Get image as buffer and convert to base64
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    
    // Determine and clean MIME type from content-type header
    const rawContentType = imageResponse.headers.get('content-type') || 'image/png';
    const mimeType = cleanMimeType(rawContentType);
    
    console.error("[Screenshot] Image downloaded successfully. Size:", buffer.length, "bytes, MIME:", mimeType);
    
    return {
      data: base64,
      mimeType: mimeType
    };
  } catch (error) {
    console.error("[Screenshot] Download error:", error);
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// Helper to normalize node ID format (convert - to : for API compatibility)
function normalizeNodeId(nodeId: string): string {
  // Figma URLs use - but API expects : as separator
  // e.g., "123-456" should be "123:456"
  return nodeId.replace(/-/g, ':');
}

// Helper to get current selection from plugin
async function getCurrentSelection(taskManager: TaskManager): Promise<{ id: string; name: string }[] | null> {
  try {
    const taskResult = await taskManager.runTask<any, {}>("get-selection", {});
    
    if (!taskResult || typeof taskResult !== 'string') {
      console.error("[Screenshot] No selection result or not a string");
      return null;
    }
    
    const parsed = JSON.parse(taskResult);
    if (parsed.selection && Array.isArray(parsed.selection) && parsed.selection.length > 0) {
      return parsed.selection;
    }
    
    return null;
  } catch (error) {
    console.error("[Screenshot] Failed to get selection:", error);
    return null;
  }
}

export function registerScreenshotTools(server: McpServer, taskManager: TaskManager) {
  // Screenshot a specific node by ID
  server.tool(
    "screenshot-node",
    "Take a screenshot of a specific layer/node by ID and return the image to the AI for visual inspection. The AI can see and analyze this image.",
    S.ScreenshotNodeParamsSchema.shape,
    async (p: S.ScreenshotNodeParams) => {
      console.error("[Screenshot] screenshot-node called with:", JSON.stringify(p));
      
      const token = getToken();
      if (!token) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({ error: "No API token configured. Use request-api-token first." })
          }]
        };
      }
      
      // Get current file key from plugin
      const fileKey = await getCurrentFileKey(taskManager);
      if (!fileKey) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({ error: "Could not determine current file. Make sure you have a file open in Figma." })
          }]
        };
      }
      
      // Normalize node ID format
      const normalizedNodeId = normalizeNodeId(p.nodeId);
      console.error("[Screenshot] Normalized node ID:", normalizedNodeId);
      
      // Build API endpoint for image export
      const scale = p.scale || 2;
      const format = p.format || "png";
      const endpoint = `/images/${fileKey}?ids=${encodeURIComponent(normalizedNodeId)}&format=${format}&scale=${scale}`;
      
      // Download the image
      const result = await downloadImage(endpoint, token);
      
      if ('error' in result) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({ error: result.error })
          }]
        };
      }
      
      console.error("[Screenshot] Returning image to AI. Data length:", result.data.length);
      
      // Ensure mimeType matches the requested format
      const expectedMimeType = format === "jpg" ? "image/jpeg" : "image/png";
      const fileExtension = format === "jpg" ? "jpg" : "png";
      
      // Save to file (custom path or temp directory)
      const savedFilePath = saveImageToFile(result.data, fileExtension, p.saveToPath);
      
      // Return image to AI - the AI will see this image (Cursor v0.49+)
      return {
        content: [
          {
            type: "image" as const,
            data: result.data,
            mimeType: expectedMimeType
          },
          {
            type: "text" as const,
            text: JSON.stringify({
              success: true,
              nodeId: normalizedNodeId,
              format: format,
              scale: scale,
              imageSizeBytes: result.data.length,
              savedFilePath: savedFilePath || undefined,
              message: `Screenshot captured successfully for node ${normalizedNodeId}. The image is included above and should be visible to the AI for analysis.`,
              note: savedFilePath 
                ? `Image also saved to: ${savedFilePath}` 
                : "Image could not be saved to disk."
            })
          }
        ]
      };
    }
  );

  // Screenshot the current selection (convenience tool)
  server.tool(
    "screenshot-selection",
    "Take a screenshot of the currently selected layer(s) in Figma and return the image to the AI for visual inspection. Select something in Figma first, then use this tool.",
    {
      scale: S.ScreenshotNodeParamsSchema.shape.scale,
      format: S.ScreenshotNodeParamsSchema.shape.format
    },
    async (p: { scale?: number; format?: "png" | "jpg" }) => {
      console.error("[Screenshot] screenshot-selection called");
      
      const token = getToken();
      if (!token) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({ error: "No API token configured. Use request-api-token first." })
          }]
        };
      }
      
      // Get current file key from plugin
      const fileKey = await getCurrentFileKey(taskManager);
      if (!fileKey) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({ error: "Could not determine current file. Make sure you have a file open in Figma." })
          }]
        };
      }
      
      // Get current selection
      const selection = await getCurrentSelection(taskManager);
      if (!selection || selection.length === 0) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({ error: "No selection found. Please select a layer in Figma first." })
          }]
        };
      }
      
      // Use the first selected node
      const selectedNode = selection[0];
      if (!selectedNode) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({ error: "Selection is empty. Please select a layer in Figma first." })
          }]
        };
      }
      const nodeId = selectedNode.id;
      const nodeName = selectedNode.name || 'Unnamed Node';
      console.error("[Screenshot] Selected node:", nodeName, "ID:", nodeId);
      
      // Build API endpoint for image export
      const scale = p.scale || 2;
      const format = p.format || "png";
      const endpoint = `/images/${fileKey}?ids=${encodeURIComponent(nodeId)}&format=${format}&scale=${scale}`;
      
      // Download the image
      const result = await downloadImage(endpoint, token);
      
      if ('error' in result) {
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify({ error: result.error })
          }]
        };
      }
      
      console.error("[Screenshot] Returning selection image to AI. Data length:", result.data.length);
      
      // Ensure mimeType matches the requested format
      const expectedMimeType = format === "jpg" ? "image/jpeg" : "image/png";
      const fileExtension = format === "jpg" ? "jpg" : "png";
      
      // Save to temp file
      const savedFilePath = saveImageToFile(result.data, fileExtension);
      
      // Return image to AI (Cursor v0.49+)
      return {
        content: [
          {
            type: "image" as const,
            data: result.data,
            mimeType: expectedMimeType
          },
          {
            type: "text" as const,
            text: JSON.stringify({
              success: true,
              nodeId: nodeId,
              nodeName: nodeName,
              format: format,
              scale: scale,
              imageSizeBytes: result.data.length,
              savedFilePath: savedFilePath || undefined,
              message: `Screenshot captured of "${nodeName}". The image is included above and should be visible to the AI for analysis.`,
              note: savedFilePath 
                ? `Image also saved to: ${savedFilePath}` 
                : "Image could not be saved to disk."
            })
          }
        ]
      };
    }
  );
}
