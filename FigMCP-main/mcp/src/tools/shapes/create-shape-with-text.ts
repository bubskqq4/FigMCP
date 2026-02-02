import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreateShapeWithTextParamsSchema, type CreateShapeWithTextParams } from "../../shared/types/params/shapes/create-shape-with-text.js";

export function createShapeWithText(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-shape-with-text",
        "Create a shape with embedded text content.",
        CreateShapeWithTextParamsSchema.shape,
        async (params: CreateShapeWithTextParams) => {
            return await safeToolProcessor<CreateShapeWithTextParams>(
                taskManager.runTask("create-shape-with-text", params)
            );
        }
    );
}
