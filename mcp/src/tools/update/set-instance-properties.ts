import { safeToolProcessor } from "../safe-tool-processor.js";
import { SetInstancePropertiesParamsSchema, type SetInstancePropertiesParams } from "../../shared/types/index.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { TaskManager } from "../../task-manager.js";

export function setInstanceProperties(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "set-instance-properties",
        "Set the properties of an instance.",
        SetInstancePropertiesParamsSchema.shape,
        async (params: SetInstancePropertiesParams) => {
            return await safeToolProcessor<SetInstancePropertiesParams>(
                taskManager.runTask("set-instance-properties", params)
            );
        }
    );
}