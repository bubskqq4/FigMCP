import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as S from "../../shared/types/params/search/index.js";

export function registerSearchTools(server: McpServer, taskManager: TaskManager) {
  server.tool("find-by-name", "Find nodes by name.", S.FindByNameParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("find-by-name", p)));
  server.tool("find-by-type", "Find nodes by type.", S.FindByTypeParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("find-by-type", p)));
  server.tool("find-by-style", "Find nodes using a style.", S.FindByStyleParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("find-by-style", p)));
  server.tool("find-by-color", "Find nodes with specific color.", S.FindByColorParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("find-by-color", p)));
  server.tool("find-by-text-content", "Find text nodes by content.", S.FindByTextContentParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("find-by-text-content", p)));
  server.tool("find-instances-of-component", "Find all instances of a component.", S.FindInstancesOfComponentParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("find-instances-of-component", p)));
  server.tool("find-all-with-property", "Find nodes with a specific property.", S.FindAllWithPropertyParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("find-all-with-property", p)));
  server.tool("find-empty-frames", "Find empty frames.", S.FindEmptyFramesParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("find-empty-frames", p)));
}
