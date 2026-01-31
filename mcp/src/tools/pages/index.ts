import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as P from "../../shared/types/params/pages/index.js";

export function registerPageTools(server: McpServer, taskManager: TaskManager) {
  server.tool("get-document-pages", "Get list of pages.", P.GetDocumentPagesParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-document-pages", p)));
  server.tool("create-page", "Create a new page.", P.CreatePageParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("create-page", p)));
  server.tool("delete-page", "Delete a page.", P.DeletePageParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("delete-page", p)));
  server.tool("rename-page", "Rename a page.", P.RenamePageParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("rename-page", p)));
  server.tool("duplicate-page", "Duplicate a page.", P.DuplicatePageParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("duplicate-page", p)));
  server.tool("set-current-page", "Switch to a page.", P.SetCurrentPageParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-current-page", p)));
}
