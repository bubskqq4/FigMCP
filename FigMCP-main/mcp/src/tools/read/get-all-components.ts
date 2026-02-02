import { GetAllComponentsParamsSchema, type GetAllComponentsParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

export function getAllComponents(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "get-all-components",   
        "Get all components in the current file.",
        GetAllComponentsParamsSchema.shape,
        async (params: GetAllComponentsParams) => {
            return await safeToolProcessor<GetAllComponentsParams>(
                taskManager.runTask("get-all-components", params)
            );
        }
    )
}