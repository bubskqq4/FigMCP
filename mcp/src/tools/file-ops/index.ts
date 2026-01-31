import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as F from "../../shared/types/params/file-ops/index.js";

export function registerFileOpsTools(server: McpServer, taskManager: TaskManager) {
  server.tool("set-text-from-file", "Set text node content from provided text.", F.SetTextFromFileParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-text-from-file", p)));
  server.tool("import-svg", "Import SVG content as a node.", F.ImportSvgParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("import-svg", p)));
  server.tool("import-json-data", "Populate design from JSON data.", F.ImportJsonDataParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("import-json-data", p)));
  server.tool("export-to-json", "Export node structure to JSON.", F.ExportToJsonParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("export-to-json", p)));
  server.tool("bulk-update-text", "Update multiple text nodes at once.", F.BulkUpdateTextParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("bulk-update-text", p)));
  server.tool("get-file-key", "Get the current Figma file key.", F.GetFileKeyParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-file-key", p)));
  server.tool("set-plugin-data", "Store plugin data on a node.", F.SetPluginDataParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-plugin-data", p)));
  server.tool("get-plugin-data", "Get plugin data from a node.", F.GetPluginDataParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-plugin-data", p)));
}
