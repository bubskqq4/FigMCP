import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreateBooleanIntersectParamsSchema, type CreateBooleanIntersectParams } from "../../shared/types/params/shapes/create-boolean-intersect.js";

export function createBooleanIntersect(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-boolean-intersect",
        "Create a boolean intersect operation (overlapping area only).",
        CreateBooleanIntersectParamsSchema.shape,
        async (params: CreateBooleanIntersectParams) => {
            return await safeToolProcessor<CreateBooleanIntersectParams>(
                taskManager.runTask("create-boolean-intersect", params)
            );
        }
    );
}
