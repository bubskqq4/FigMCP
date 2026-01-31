import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as C from "../../shared/types/params/corners/index.js";

export function registerCornerTools(server: McpServer, taskManager: TaskManager) {
  server.tool("set-all-corners", "Set corner radius for all corners.", C.SetAllCornersParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-all-corners", p)));
  server.tool("set-individual-corners", "Set individual corner radii.", C.SetIndividualCornersParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-individual-corners", p)));
  server.tool("set-corner-smoothing", "Set iOS-style corner smoothing.", C.SetCornerSmoothingParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-corner-smoothing", p)));
  server.tool("copy-corners", "Copy corner settings to other nodes.", C.CopyCornersParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("copy-corners", p)));
  server.tool("reset-corners", "Reset corners to 0.", C.ResetCornersParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("reset-corners", p)));
  server.tool("set-top-corners", "Set only top corners.", C.SetTopCornersParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-top-corners", p)));
}
