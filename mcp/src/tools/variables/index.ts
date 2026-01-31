import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as V from "../../shared/types/params/variables/index.js";

export function registerVariableTools(server: McpServer, taskManager: TaskManager) {
  server.tool("get-all-variables", "Get all variables in document.", V.GetAllVariablesParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-all-variables", p)));
  server.tool("get-variable-by-id", "Get a specific variable.", V.GetVariableByIdParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-variable-by-id", p)));
  server.tool("get-variable-collections", "Get all variable collections.", V.GetVariableCollectionsParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-variable-collections", p)));
  server.tool("create-variable", "Create a new variable.", V.CreateVariableParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("create-variable", p)));
  server.tool("set-variable-value", "Set variable value for a mode.", V.SetVariableValueParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-variable-value", p)));
  server.tool("bind-variable-to-node", "Bind a variable to a node property.", V.BindVariableToNodeParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("bind-variable-to-node", p)));
  server.tool("unbind-variable-from-node", "Unbind a variable from node.", V.UnbindVariableFromNodeParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("unbind-variable-from-node", p)));
  server.tool("get-bound-variables", "Get variables bound to node.", V.GetBoundVariablesParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-bound-variables", p)));
  server.tool("create-variable-collection", "Create a variable collection.", V.CreateVariableCollectionParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("create-variable-collection", p)));
  server.tool("delete-variable", "Delete a variable.", V.DeleteVariableParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("delete-variable", p)));
}
