import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as C from "../../shared/types/params/constraints/index.js";

export function registerConstraintTools(server: McpServer, taskManager: TaskManager) {
  server.tool("set-horizontal-constraint", "Set horizontal constraint.", C.SetHorizontalConstraintParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-horizontal-constraint", p)));
  server.tool("set-vertical-constraint", "Set vertical constraint.", C.SetVerticalConstraintParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-vertical-constraint", p)));
  server.tool("set-constraints", "Set both constraints.", C.SetConstraintsParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-constraints", p)));
  server.tool("reset-constraints", "Reset constraints to default.", C.ResetConstraintsParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("reset-constraints", p)));
  server.tool("set-constraint-proportions", "Lock/unlock proportions.", C.SetConstraintProportionsParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-constraint-proportions", p)));
  server.tool("get-constraints", "Get current constraints.", C.GetConstraintsParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-constraints", p)));
}
