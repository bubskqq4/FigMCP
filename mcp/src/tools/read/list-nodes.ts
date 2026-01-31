import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { TaskManager } from "../../task-manager.js";
import { ListNodesParamsSchema, type ListNodesParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";

export function listNodes(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "list-nodes",
        "List all nodes in the current page or within a specific parent node. Supports filtering by type and depth traversal.",
        ListNodesParamsSchema.shape,
        async (params: ListNodesParams) => {
            return await safeToolProcessor<ListNodesParams>(
                taskManager.runTask("list-nodes", params)
            );
        }
    )
}
