import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as E from "../../shared/types/params/export/index.js";

export function registerExportTools(server: McpServer, taskManager: TaskManager) {
  server.tool("export-png", "Export node as PNG.", E.ExportPngParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("export-png", p)));
  server.tool("export-svg", "Export node as SVG.", E.ExportSvgParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("export-svg", p)));
  server.tool("export-jpg", "Export node as JPG.", E.ExportJpgParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("export-jpg", p)));
  server.tool("export-pdf", "Export node as PDF.", E.ExportPdfParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("export-pdf", p)));
  server.tool("export-webp", "Export node as WebP.", E.ExportWebpParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("export-webp", p)));
  server.tool("batch-export", "Export multiple nodes.", E.BatchExportParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("batch-export", p)));
  server.tool("get-export-settings", "Get export settings for node.", E.GetExportSettingsParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-export-settings", p)));
  server.tool("set-export-settings", "Set export settings for node.", E.SetExportSettingsParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-export-settings", p)));
}
