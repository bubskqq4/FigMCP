import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { TaskManager } from "../../task-manager.js";
import { GetNodeTreeParamsSchema, type GetNodeTreeParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";

export function getNodeTree(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "get-node-tree",
        "Get the complete hierarchical tree structure of a node and its descendants. Supports depth control and visibility filtering.",
        GetNodeTreeParamsSchema.shape,
        async (params: GetNodeTreeParams) => {
            return await safeToolProcessor<GetNodeTreeParams>(
                taskManager.runTask("get-node-tree", params)
            );
        }
    )
}
