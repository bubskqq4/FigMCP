import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreateSectionParamsSchema, type CreateSectionParams } from "../../shared/types/params/shapes/create-section.js";

export function createSection(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-section",
        "Create a section to organize frames on the canvas.",
        CreateSectionParamsSchema.shape,
        async (params: CreateSectionParams) => {
            return await safeToolProcessor<CreateSectionParams>(
                taskManager.runTask("create-section", params)
            );
        }
    );
}
