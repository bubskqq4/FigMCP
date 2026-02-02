import { DeleteComponentPropertyParamsSchema, type DeleteComponentPropertyParams } from "../../shared/types/params/delete/delete-component-property.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";

export function deleteComponentProperty(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "delete-component-property",
        "Delete a component property.",
        DeleteComponentPropertyParamsSchema.shape,
        async (params: DeleteComponentPropertyParams) => {
            return await safeToolProcessor<DeleteComponentPropertyParams>(
                taskManager.runTask("delete-component-property", params)
            );
        }
    );
}