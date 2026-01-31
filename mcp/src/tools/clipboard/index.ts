import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as C from "../../shared/types/params/clipboard/index.js";

export function registerClipboardTools(server: McpServer, taskManager: TaskManager) {
  server.tool("duplicate-node", "Duplicate a node.", C.DuplicateNodeParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("duplicate-node", p)));
  server.tool("copy-properties", "Copy properties to other nodes.", C.CopyPropertiesParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("copy-properties", p)));
  server.tool("get-css", "Get CSS for a node.", C.GetCssParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-css", p)));
  server.tool("get-svg-code", "Get SVG code for a node.", C.GetSvgCodeParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-svg-code", p)));
  server.tool("clone-to-location", "Clone a node to a new location.", C.CloneToLocationParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("clone-to-location", p)));
  server.tool("copy-node-across-pages", "Copy a node to another page.", C.CopyNodeAcrossPagesParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("copy-node-across-pages", p)));
}
