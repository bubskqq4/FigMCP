import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreateStickyParamsSchema, type CreateStickyParams } from "../../shared/types/params/shapes/create-sticky.js";

export function createSticky(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-sticky",
        "Create a sticky note for annotations.",
        CreateStickyParamsSchema.shape,
        async (params: CreateStickyParams) => {
            return await safeToolProcessor<CreateStickyParams>(
                taskManager.runTask("create-sticky", params)
            );
        }
    );
}
