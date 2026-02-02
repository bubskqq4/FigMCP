import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreateBooleanSubtractParamsSchema, type CreateBooleanSubtractParams } from "../../shared/types/params/shapes/create-boolean-subtract.js";

export function createBooleanSubtract(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-boolean-subtract",
        "Create a boolean subtract operation (first shape minus rest).",
        CreateBooleanSubtractParamsSchema.shape,
        async (params: CreateBooleanSubtractParams) => {
            return await safeToolProcessor<CreateBooleanSubtractParams>(
                taskManager.runTask("create-boolean-subtract", params)
            );
        }
    );
}
