import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreateEllipseParamsSchema, type CreateEllipseParams } from "../../shared/types/params/shapes/create-ellipse.js";

export function createEllipse(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-ellipse",
        "Create an ellipse/circle shape.",
        CreateEllipseParamsSchema.shape,
        async (params: CreateEllipseParams) => {
            return await safeToolProcessor<CreateEllipseParams>(
                taskManager.runTask("create-ellipse", params)
            );
        }
    );
}
