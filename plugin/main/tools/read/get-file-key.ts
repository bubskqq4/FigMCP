import { ToolResult } from "../tool-result";

export async function getFileKey(): Promise<ToolResult> {
  try {
    // Extract file key from the current Figma file URL
    // Figma file URL format: https://www.figma.com/file/FILE_KEY/...
    const fileKey = figma.fileKey;
    
    if (!fileKey) {
      return {
        isError: true,
        content: JSON.stringify({ error: "Could not access file key" })
      };
    }
    
    return {
      isError: false,
      content: JSON.stringify({ fileKey })
    };
  } catch (error) {
    return {
      isError: true,
      content: error instanceof Error ? error.message : "Unknown error getting file key"
    };
  }
}
