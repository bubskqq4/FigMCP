import { SetLayoutParamsSchema, type SetLayoutParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

export function setLayout(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "set-layout",
        "Set the layout of a node.",
        SetLayoutParamsSchema.shape,
        async (params: SetLayoutParams) => {
            return await safeToolProcessor<SetLayoutParams>(
                taskManager.runTask("set-layout", params)
            );
        }
    );
}