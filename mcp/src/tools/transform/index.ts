import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as T from "../../shared/types/params/transform/index.js";

export function registerTransformTools(server: McpServer, taskManager: TaskManager) {
  server.tool("scale-node", "Scale a node by factors.", T.ScaleNodeParamsSchema.shape,
    async (p: T.ScaleNodeParams) => await safeToolProcessor(taskManager.runTask("scale-node", p)));
  
  server.tool("set-rotation", "Set absolute rotation of a node.", T.SetRotationParamsSchema.shape,
    async (p: T.SetRotationParams) => await safeToolProcessor(taskManager.runTask("set-rotation", p)));
  
  server.tool("rotate-by", "Rotate a node by degrees.", T.RotateByParamsSchema.shape,
    async (p: T.RotateByParams) => await safeToolProcessor(taskManager.runTask("rotate-by", p)));
  
  server.tool("reset-rotation", "Reset node rotation to 0.", T.ResetRotationParamsSchema.shape,
    async (p: T.ResetRotationParams) => await safeToolProcessor(taskManager.runTask("reset-rotation", p)));
  
  server.tool("set-width", "Set the width of a node.", T.SetWidthParamsSchema.shape,
    async (p: T.SetWidthParams) => await safeToolProcessor(taskManager.runTask("set-width", p)));
  
  server.tool("set-height", "Set the height of a node.", T.SetHeightParamsSchema.shape,
    async (p: T.SetHeightParams) => await safeToolProcessor(taskManager.runTask("set-height", p)));
  
  server.tool("fit-to-content", "Resize frame to fit its contents.", T.FitToContentParamsSchema.shape,
    async (p: T.FitToContentParams) => await safeToolProcessor(taskManager.runTask("fit-to-content", p)));
  
  server.tool("match-width", "Match width to source node.", T.MatchWidthParamsSchema.shape,
    async (p: T.MatchWidthParams) => await safeToolProcessor(taskManager.runTask("match-width", p)));
  
  server.tool("match-height", "Match height to source node.", T.MatchHeightParamsSchema.shape,
    async (p: T.MatchHeightParams) => await safeToolProcessor(taskManager.runTask("match-height", p)));
  
  server.tool("match-size", "Match size to source node.", T.MatchSizeParamsSchema.shape,
    async (p: T.MatchSizeParams) => await safeToolProcessor(taskManager.runTask("match-size", p)));
  
  server.tool("flip-horizontal", "Flip node horizontally.", T.FlipHorizontalParamsSchema.shape,
    async (p: T.FlipHorizontalParams) => await safeToolProcessor(taskManager.runTask("flip-horizontal", p)));
  
  server.tool("flip-vertical", "Flip node vertically.", T.FlipVerticalParamsSchema.shape,
    async (p: T.FlipVerticalParams) => await safeToolProcessor(taskManager.runTask("flip-vertical", p)));
}
