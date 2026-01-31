import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreateSliceParamsSchema, type CreateSliceParams } from "../../shared/types/params/shapes/create-slice.js";

export function createSlice(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-slice",
        "Create a slice for export regions.",
        CreateSliceParamsSchema.shape,
        async (params: CreateSliceParams) => {
            return await safeToolProcessor<CreateSliceParams>(
                taskManager.runTask("create-slice", params)
            );
        }
    );
}
