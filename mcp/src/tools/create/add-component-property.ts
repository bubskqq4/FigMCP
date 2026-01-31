import { AddComponentPropertyParamsSchema, type AddComponentPropertyParams } from "../../shared/types/params/create/add-component-property.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { safeToolProcessor } from "../safe-tool-processor.js";

export function addComponentProperty(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "add-component-property",
        "Add a component property.",
        AddComponentPropertyParamsSchema.shape,
        async (params: AddComponentPropertyParams) => {
            return await safeToolProcessor<AddComponentPropertyParams>(
                taskManager.runTask("add-component-property", params)
            );
        }
    );
}