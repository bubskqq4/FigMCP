import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as S from "../../shared/types/params/selection/index.js";

export function registerSelectionTools(server: McpServer, taskManager: TaskManager) {
  server.tool("set-selection", "Set the current selection.", S.SetSelectionParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-selection", p)));
  server.tool("add-to-selection", "Add nodes to selection.", S.AddToSelectionParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("add-to-selection", p)));
  server.tool("remove-from-selection", "Remove nodes from selection.", S.RemoveFromSelectionParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("remove-from-selection", p)));
  server.tool("clear-selection", "Clear the current selection.", S.ClearSelectionParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("clear-selection", p)));
  server.tool("select-all-on-page", "Select all nodes on current page.", S.SelectAllOnPageParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("select-all-on-page", p)));
  server.tool("select-children", "Select all children of a node.", S.SelectChildrenParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("select-children", p)));
  server.tool("zoom-to-selection", "Zoom viewport to selection.", S.ZoomToSelectionParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("zoom-to-selection", p)));
  server.tool("zoom-to-node", "Zoom viewport to a specific node.", S.ZoomToNodeParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("zoom-to-node", p)));
  server.tool("zoom-to-fit", "Zoom to fit all content.", S.ZoomToFitParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("zoom-to-fit", p)));
  server.tool("scroll-into-view", "Scroll node into view.", S.ScrollIntoViewParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("scroll-into-view", p)));
}
