import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as C from "../../shared/types/params/components/index.js";

export function registerComponentTools(server: McpServer, taskManager: TaskManager) {
  server.tool("create-component-from-node", "Create a component from selection.", C.CreateComponentFromNodeParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("create-component-from-node", p)));
  server.tool("create-component-set-from-nodes", "Create a component set (variants).", C.CreateComponentSetFromNodesParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("create-component-set-from-nodes", p)));
  server.tool("detach-instance", "Detach an instance from its component.", C.DetachInstanceParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("detach-instance", p)));
  server.tool("swap-instance", "Swap instance to different component.", C.SwapInstanceParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("swap-instance", p)));
  server.tool("reset-instance", "Reset instance overrides.", C.ResetInstanceParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("reset-instance", p)));
  server.tool("get-main-component", "Get the main component of an instance.", C.GetMainComponentParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-main-component", p)));
  server.tool("get-all-document-components", "Get all components in document.", C.GetAllDocumentComponentsParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-all-document-components", p)));
  server.tool("get-component-overrides", "Get overrides on an instance.", C.GetComponentOverridesParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-component-overrides", p)));
  server.tool("set-override", "Set an override on an instance.", C.SetOverrideParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-override", p)));
  server.tool("publish-component", "Publish component to library.", C.PublishComponentParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("publish-component", p)));
  server.tool("create-instance-from-key", "Create instance of a component.", C.CreateInstanceFromKeyParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("create-instance-from-key", p)));
  server.tool("set-variant-property", "Set variant property value.", C.SetVariantPropertyParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-variant-property", p)));
}
