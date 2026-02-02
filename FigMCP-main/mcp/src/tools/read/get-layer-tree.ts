import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { TaskManager } from "../../task-manager.js";
import { GetLayerTreeParamsSchema, type GetLayerTreeParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";

export function getLayerTree(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "get-layer-tree",
        "Get the complete layer tree of the entire Figma document. Returns all nodes with their IDs, types, names, and child relationships. Does not require any node ID - automatically traverses the entire document hierarchy.",
        GetLayerTreeParamsSchema.shape,
        async (params: GetLayerTreeParams) => {
            return await safeToolProcessor<GetLayerTreeParams>(
                taskManager.runTask("get-layer-tree", params)
            );
        }
    )
}
