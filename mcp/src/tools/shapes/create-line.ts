import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreateLineParamsSchema, type CreateLineParams } from "../../shared/types/params/shapes/create-line.js";

export function createLine(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-line",
        "Create a line with specified length and rotation.",
        CreateLineParamsSchema.shape,
        async (params: CreateLineParams) => {
            return await safeToolProcessor<CreateLineParams>(
                taskManager.runTask("create-line", params)
            );
        }
    );
}
