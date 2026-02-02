import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreateBooleanUnionParamsSchema, type CreateBooleanUnionParams } from "../../shared/types/params/shapes/create-boolean-union.js";

export function createBooleanUnion(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-boolean-union",
        "Create a boolean union operation combining multiple shapes.",
        CreateBooleanUnionParamsSchema.shape,
        async (params: CreateBooleanUnionParams) => {
            return await safeToolProcessor<CreateBooleanUnionParams>(
                taskManager.runTask("create-boolean-union", params)
            );
        }
    );
}
