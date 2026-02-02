import { EditComponentPropertyParamsSchema, type EditComponentPropertyParams } from "../../shared/types/params/update/edit-component-property.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";

export function editComponentProperty(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "edit-component-property",
        "Edit a component property.",
        EditComponentPropertyParamsSchema.shape,
        async (params: EditComponentPropertyParams) => {
            return await safeToolProcessor<EditComponentPropertyParams>(
                taskManager.runTask("edit-component-property", params)
            );
        }
    );
}