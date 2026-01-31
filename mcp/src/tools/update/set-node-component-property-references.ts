import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { SetNodeComponentPropertyReferencesParamsSchema, type SetNodeComponentPropertyReferencesParams } from "../../shared/types/index.js";

export function setNodeComponentPropertyReferences(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "set-node-component-property-references",
        "Set the component property references of a node.",
        SetNodeComponentPropertyReferencesParamsSchema.shape,
        async (params: SetNodeComponentPropertyReferencesParams) => {
            return await safeToolProcessor<SetNodeComponentPropertyReferencesParams>(
                taskManager.runTask("set-node-component-property-references", params)
            );
        }
    );
}