import { safeToolProcessor } from "../safe-tool-processor.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { SetStrokeColorParamsSchema } from "../../shared/types/index.js";
import type { SetStrokeColorParams } from "../../shared/types/index.js";

export function setStrokeColor(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "set-stroke-color",
        "Set the stroke color of a node.",
        SetStrokeColorParamsSchema.shape,
        async (params: SetStrokeColorParams) => {
            return await safeToolProcessor<SetStrokeColorParams>(
                taskManager.runTask("set-stroke-color", params)
            );
        }
    );
}