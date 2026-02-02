import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import { CreateConnectorParamsSchema, type CreateConnectorParams } from "../../shared/types/params/shapes/create-connector.js";

export function createConnector(server: McpServer, taskManager: TaskManager) {
    server.tool(
        "create-connector",
        "Create a connector line between nodes or points.",
        CreateConnectorParamsSchema.shape,
        async (params: CreateConnectorParams) => {
            return await safeToolProcessor<CreateConnectorParams>(
                taskManager.runTask("create-connector", params)
            );
        }
    );
}
