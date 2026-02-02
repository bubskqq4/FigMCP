import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreateBooleanExcludeParamsSchema, type CreateBooleanExcludeParams } from "../../shared/types/params/shapes/create-boolean-exclude.js";

export function createBooleanExclude(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-boolean-exclude",
        "Create a boolean exclude operation (XOR - non-overlapping areas).",
        CreateBooleanExcludeParamsSchema.shape,
        async (params: CreateBooleanExcludeParams) => {
            return await safeToolProcessor<CreateBooleanExcludeParams>(
                taskManager.runTask("create-boolean-exclude", params)
            );
        }
    );
}
