import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as Z from "../../shared/types/params/zorder/index.js";

export function registerZOrderTools(server: McpServer, taskManager: TaskManager) {
  server.tool("bring-to-front", "Bring node to front.", Z.BringToFrontParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("bring-to-front", p)));
  server.tool("send-to-back", "Send node to back.", Z.SendToBackParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("send-to-back", p)));
  server.tool("bring-forward", "Move node forward.", Z.BringForwardParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("bring-forward", p)));
  server.tool("send-backward", "Move node backward.", Z.SendBackwardParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("send-backward", p)));
  server.tool("move-to-index", "Move node to specific z-index.", Z.MoveToIndexParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("move-to-index", p)));
  server.tool("get-z-index", "Get node z-index.", Z.GetZIndexParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-z-index", p)));
  server.tool("sort-children-by-name", "Sort children alphabetically.", Z.SortChildrenByNameParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("sort-children-by-name", p)));
  server.tool("reverse-child-order", "Reverse order of children.", Z.ReverseChildOrderParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("reverse-child-order", p)));
}
