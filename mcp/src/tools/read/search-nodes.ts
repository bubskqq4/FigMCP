import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { TaskManager } from "../../task-manager.js";
import { SearchNodesParamsSchema, type SearchNodesParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";

export function searchNodes(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "search-nodes",
        "Search for nodes by name across the document or within a specific page. Supports type filtering and exact/fuzzy matching.",
        SearchNodesParamsSchema.shape,
        async (params: SearchNodesParams) => {
            return await safeToolProcessor<SearchNodesParams>(
                taskManager.runTask("search-nodes", params)
            );
        }
    )
}
