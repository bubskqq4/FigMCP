import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as A from "../../shared/types/params/autolayout/index.js";

export function registerAutoLayoutTools(server: McpServer, taskManager: TaskManager) {
  server.tool("enable-auto-layout", "Enable auto-layout on a frame.", A.EnableAutoLayoutParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("enable-auto-layout", p)));
  server.tool("disable-auto-layout", "Disable auto-layout.", A.DisableAutoLayoutParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("disable-auto-layout", p)));
  server.tool("set-layout-direction", "Set auto-layout direction.", A.SetLayoutDirectionParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-layout-direction", p)));
  server.tool("set-layout-wrap", "Set auto-layout wrap behavior.", A.SetLayoutWrapParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-layout-wrap", p)));
  server.tool("set-layout-gap", "Set gap between items.", A.SetLayoutGapParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-layout-gap", p)));
  server.tool("set-layout-padding-all", "Set equal padding on all sides.", A.SetLayoutPaddingAllParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-layout-padding-all", p)));
  server.tool("set-layout-padding-individual", "Set individual padding.", A.SetLayoutPaddingIndividualParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-layout-padding-individual", p)));
  server.tool("set-layout-align-items", "Set cross-axis alignment.", A.SetLayoutAlignItemsParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-layout-align-items", p)));
  server.tool("set-layout-justify-content", "Set main-axis distribution.", A.SetLayoutJustifyContentParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-layout-justify-content", p)));
  server.tool("set-layout-sizing", "Set horizontal/vertical sizing mode.", A.SetLayoutSizingParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-layout-sizing", p)));
  server.tool("set-child-positioning", "Set child positioning mode.", A.SetChildPositioningParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-child-positioning", p)));
  server.tool("set-layout-mode", "Set layout mode.", A.SetLayoutModeParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-layout-mode", p)));
  server.tool("set-counter-axis-sizing", "Set counter axis sizing.", A.SetCounterAxisSizingParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-counter-axis-sizing", p)));
  server.tool("set-primary-axis-sizing", "Set primary axis sizing.", A.SetPrimaryAxisSizingParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-primary-axis-sizing", p)));
  server.tool("reorder-child", "Reorder a child in auto-layout.", A.ReorderChildParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("reorder-child", p)));
}
