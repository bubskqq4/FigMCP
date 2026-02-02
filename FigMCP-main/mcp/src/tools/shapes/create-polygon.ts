import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreatePolygonParamsSchema, type CreatePolygonParams } from "../../shared/types/params/shapes/create-polygon.js";

export function createPolygon(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-polygon",
        "Create a polygon shape with specified number of sides.",
        CreatePolygonParamsSchema.shape,
        async (params: CreatePolygonParams) => {
            return await safeToolProcessor<CreatePolygonParams>(
                taskManager.runTask("create-polygon", params)
            );
        }
    );
}
