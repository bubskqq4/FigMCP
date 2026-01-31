import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as E from "../../shared/types/params/effects/index.js";

export function registerEffectTools(server: McpServer, taskManager: TaskManager) {
  server.tool("add-drop-shadow", "Add a drop shadow effect.", E.AddDropShadowParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("add-drop-shadow", p)));
  server.tool("add-inner-shadow", "Add an inner shadow effect.", E.AddInnerShadowParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("add-inner-shadow", p)));
  server.tool("add-layer-blur", "Add a layer blur effect.", E.AddLayerBlurParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("add-layer-blur", p)));
  server.tool("add-background-blur", "Add a background blur effect.", E.AddBackgroundBlurParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("add-background-blur", p)));
  server.tool("remove-effect", "Remove an effect by index.", E.RemoveEffectParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("remove-effect", p)));
  server.tool("remove-all-effects", "Remove all effects.", E.RemoveAllEffectsParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("remove-all-effects", p)));
  server.tool("set-effect-radius", "Set effect blur radius.", E.SetEffectRadiusParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-effect-radius", p)));
  server.tool("set-effect-offset", "Set shadow offset.", E.SetEffectOffsetParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-effect-offset", p)));
  server.tool("set-effect-spread", "Set shadow spread.", E.SetEffectSpreadParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-effect-spread", p)));
  server.tool("set-effect-color", "Set effect color.", E.SetEffectColorParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-effect-color", p)));
  server.tool("copy-effects", "Copy effects to other nodes.", E.CopyEffectsParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("copy-effects", p)));
  server.tool("paste-effects", "Paste effects from one node to another.", E.PasteEffectsParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("paste-effects", p)));
}
