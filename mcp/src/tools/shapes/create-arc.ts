import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreateArcParamsSchema, type CreateArcParams } from "../../shared/types/params/shapes/create-arc.js";

export function createArc(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-arc",
        "Create an arc or pie chart segment.",
        CreateArcParamsSchema.shape,
        async (params: CreateArcParams) => {
            return await safeToolProcessor<CreateArcParams>(
                taskManager.runTask("create-arc", params)
            );
        }
    );
}
