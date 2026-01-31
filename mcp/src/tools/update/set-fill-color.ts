import type { SetFillColorParams } from "../../shared/types/index.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import type { TaskManager } from "../../task-manager.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { SetFillColorParamsSchema } from "../../shared/types/index.js";

export function setFillColor(server: McpServer, taskManager: TaskManager) {
    server.tool(    
        "set-fill-color",
        "Set the fill color of a node.",
        SetFillColorParamsSchema.shape, 
        async (params: SetFillColorParams) => {
            return await safeToolProcessor<SetFillColorParams>(
                taskManager.runTask("set-fill-color", params)
            );
        }
    );
} 