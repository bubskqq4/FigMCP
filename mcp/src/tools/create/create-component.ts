import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreateComponentParamsSchema, type CreateComponentParams } from "../../shared/types/index.js";

export function createComponent(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-component",
        "Create a component.",
        CreateComponentParamsSchema.shape,
        async (params: CreateComponentParams) => {
            return await safeToolProcessor<CreateComponentParams>(
                taskManager.runTask("create-component", params)
            );
        }
    );
}