import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreateStarParamsSchema, type CreateStarParams } from "../../shared/types/params/shapes/create-star.js";

export function createStar(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-star",
        "Create a star shape with specified number of points.",
        CreateStarParamsSchema.shape,
        async (params: CreateStarParams) => {
            return await safeToolProcessor<CreateStarParams>(
                taskManager.runTask("create-star", params)
            );
        }
    );
}
