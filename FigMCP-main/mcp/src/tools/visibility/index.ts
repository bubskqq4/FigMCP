import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as V from "../../shared/types/params/visibility/index.js";

export function registerVisibilityTools(server: McpServer, taskManager: TaskManager) {
  server.tool("set-opacity", "Set node opacity (0-1).", V.SetOpacityParamsSchema.shape,
    async (p: V.SetOpacityParams) => await safeToolProcessor(taskManager.runTask("set-opacity", p)));
  
  server.tool("set-blend-mode", "Set node blend mode.", V.SetBlendModeParamsSchema.shape,
    async (p: V.SetBlendModeParams) => await safeToolProcessor(taskManager.runTask("set-blend-mode", p)));
  
  server.tool("hide-node", "Hide a node.", V.HideNodeParamsSchema.shape,
    async (p: V.HideNodeParams) => await safeToolProcessor(taskManager.runTask("hide-node", p)));
  
  server.tool("show-node", "Show a hidden node.", V.ShowNodeParamsSchema.shape,
    async (p: V.ShowNodeParams) => await safeToolProcessor(taskManager.runTask("show-node", p)));
  
  server.tool("toggle-visibility", "Toggle node visibility.", V.ToggleVisibilityParamsSchema.shape,
    async (p: V.ToggleVisibilityParams) => await safeToolProcessor(taskManager.runTask("toggle-visibility", p)));
  
  server.tool("lock-node", "Lock a node from editing.", V.LockNodeParamsSchema.shape,
    async (p: V.LockNodeParams) => await safeToolProcessor(taskManager.runTask("lock-node", p)));
  
  server.tool("unlock-node", "Unlock a node.", V.UnlockNodeParamsSchema.shape,
    async (p: V.UnlockNodeParams) => await safeToolProcessor(taskManager.runTask("unlock-node", p)));
  
  server.tool("toggle-lock", "Toggle node lock state.", V.ToggleLockParamsSchema.shape,
    async (p: V.ToggleLockParams) => await safeToolProcessor(taskManager.runTask("toggle-lock", p)));
}
