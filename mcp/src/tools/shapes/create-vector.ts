import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreateVectorParamsSchema, type CreateVectorParams } from "../../shared/types/params/shapes/create-vector.js";

export function createVector(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-vector",
        "Create a vector shape from SVG path data.",
        CreateVectorParamsSchema.shape,
        async (params: CreateVectorParams) => {
            return await safeToolProcessor<CreateVectorParams>(
                taskManager.runTask("create-vector", params)
            );
        }
    );
}
