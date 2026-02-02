import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as D from "../../shared/types/params/docinfo/index.js";

export function registerDocInfoTools(server: McpServer, taskManager: TaskManager) {
  server.tool("get-document-info", "Get document information.", D.GetDocumentInfoParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-document-info", p)));
  server.tool("get-current-user", "Get current user info.", D.GetCurrentUserParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-current-user", p)));
  server.tool("get-viewport", "Get current viewport.", D.GetViewportParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-viewport", p)));
  server.tool("set-viewport", "Set viewport position and zoom.", D.SetViewportParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-viewport", p)));
  server.tool("notify", "Show a notification in Figma.", D.NotifyParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("notify", p)));
}
