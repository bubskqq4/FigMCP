import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { TaskManager } from "../../task-manager.js";
import { GetNodeChildrenParamsSchema, type GetNodeChildrenParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";

export function getNodeChildren(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "get-node-children",
        "Get all children of a specific node. Supports recursive traversal to get all descendants.",
        GetNodeChildrenParamsSchema.shape,
        async (params: GetNodeChildrenParams) => {
            return await safeToolProcessor<GetNodeChildrenParams>(
                taskManager.runTask("get-node-children", params)
            );
        }
    )
}
