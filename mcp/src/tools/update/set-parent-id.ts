import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { SetParentIdParamsSchema } from "../../shared/types/index.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import type { SetParentIdParams } from "../../shared/types/index.js";

export function setParentId(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "set-parent-id",
        "Set the parent id of a node.",
        SetParentIdParamsSchema.shape,
        async (params: SetParentIdParams) => {
            return await safeToolProcessor<SetParentIdParams>(
                taskManager.runTask("set-parent-id", params)
            );
        }
    );
}