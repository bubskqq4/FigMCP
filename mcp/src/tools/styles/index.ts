import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as S from "../../shared/types/params/styles/index.js";

export function registerStyleTools(server: McpServer, taskManager: TaskManager) {
  server.tool("get-all-styles", "Get all styles in document.", S.GetAllStylesParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-all-styles", p)));
  server.tool("get-style-by-id", "Get a specific style.", S.GetStyleByIdParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-style-by-id", p)));
  server.tool("create-color-style", "Create a color (paint) style.", S.CreateColorStyleParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("create-color-style", p)));
  server.tool("create-text-style", "Create a text style.", S.CreateTextStyleParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("create-text-style", p)));
  server.tool("create-effect-style", "Create an effect style.", S.CreateEffectStyleParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("create-effect-style", p)));
  server.tool("apply-fill-style", "Apply a fill style to node.", S.ApplyFillStyleParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("apply-fill-style", p)));
  server.tool("apply-stroke-style", "Apply a stroke style to node.", S.ApplyStrokeStyleParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("apply-stroke-style", p)));
  server.tool("apply-effect-style", "Apply an effect style to node.", S.ApplyEffectStyleParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("apply-effect-style", p)));
  server.tool("apply-grid-style", "Apply a grid style to frame.", S.ApplyGridStyleParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("apply-grid-style", p)));
  server.tool("delete-style", "Delete a style.", S.DeleteStyleParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("delete-style", p)));
  server.tool("update-style", "Update a style.", S.UpdateStyleParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("update-style", p)));
  server.tool("detach-style", "Detach style from node.", S.DetachStyleParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("detach-style", p)));
}
