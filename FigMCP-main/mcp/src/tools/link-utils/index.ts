import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { LinkToNodeIdParamsSchema, type LinkToNodeIdParams } from "../../shared/types/params/link-utils/index.js";

/**
 * Extract node ID from a Figma link
 * Supports formats:
 * - https://www.figma.com/file/FILE_KEY/FILE_NAME?node-id=123-456
 * - https://www.figma.com/design/FILE_KEY/FILE_NAME?node-id=123-456
 * - https://www.figma.com/proto/FILE_KEY/FILE_NAME?node-id=123-456
 * 
 * Converts URL format (123-456) to Figma API format (123:456)
 */
function extractNodeIdFromLink(link: string): string {
    try {
        const url = new URL(link);
        
        // Get node-id parameter from URL
        const nodeIdParam = url.searchParams.get('node-id');
        
        if (!nodeIdParam) {
            throw new Error('No node-id parameter found in the Figma link');
        }
        
        // Convert dash format to colon format (123-456 -> 123:456)
        const nodeId = nodeIdParam.replace(/-/g, ':');
        
        return nodeId;
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Invalid URL format. Please provide a valid Figma link.');
        }
        throw error;
    }
}

export function registerLinkUtilsTools(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "link-to-node-id",
        "Convert a Figma element/layer link to a node ID. Accepts Figma file/design/proto URLs with node-id parameter.",
        LinkToNodeIdParamsSchema.shape,
        async (params: LinkToNodeIdParams) => {
            try {
                const nodeId = extractNodeIdFromLink(params.link);
                
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                nodeId,
                                originalLink: params.link,
                                success: true
                            }, null, 2)
                        }
                    ]
                };
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({
                                error: errorMessage,
                                originalLink: params.link,
                                success: false
                            }, null, 2)
                        }
                    ],
                    isError: true
                };
            }
        }
    );
}
