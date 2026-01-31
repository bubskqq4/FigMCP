import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as S from "../../shared/types/params/strokes/index.js";

export function registerStrokeTools(server: McpServer, taskManager: TaskManager) {
  server.tool("set-stroke-weight", "Set stroke weight.", S.SetStrokeWeightParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-stroke-weight", p)));
  server.tool("set-stroke-align", "Set stroke alignment.", S.SetStrokeAlignParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-stroke-align", p)));
  server.tool("set-stroke-cap", "Set stroke cap style.", S.SetStrokeCapParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-stroke-cap", p)));
  server.tool("set-stroke-join", "Set stroke join style.", S.SetStrokeJoinParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-stroke-join", p)));
  server.tool("set-dash-pattern", "Set stroke dash pattern.", S.SetDashPatternParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-dash-pattern", p)));
  server.tool("set-stroke-opacity", "Set stroke opacity.", S.SetStrokeOpacityParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-stroke-opacity", p)));
  server.tool("add-stroke", "Add a new stroke.", S.AddStrokeParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("add-stroke", p)));
  server.tool("remove-stroke", "Remove a stroke.", S.RemoveStrokeParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("remove-stroke", p)));
  server.tool("remove-all-strokes", "Remove all strokes.", S.RemoveAllStrokesParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("remove-all-strokes", p)));
  server.tool("set-individual-strokes", "Set individual stroke weights.", S.SetIndividualStrokesParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-individual-strokes", p)));
  server.tool("outline-stroke", "Convert stroke to fill.", S.OutlineStrokeParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("outline-stroke", p)));
  server.tool("copy-strokes", "Copy strokes to other nodes.", S.CopyStrokesParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("copy-strokes", p)));
}
