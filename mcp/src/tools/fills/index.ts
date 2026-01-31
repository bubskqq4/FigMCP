import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as F from "../../shared/types/params/fills/index.js";

export function registerFillTools(server: McpServer, taskManager: TaskManager) {
  server.tool("set-solid-fill", "Set a solid color fill.", F.SetSolidFillParamsSchema.shape,
    async (p: F.SetSolidFillParams) => await safeToolProcessor(taskManager.runTask("set-solid-fill", p)));
  
  server.tool("set-gradient-linear", "Set a linear gradient fill.", F.SetGradientLinearParamsSchema.shape,
    async (p: F.SetGradientLinearParams) => await safeToolProcessor(taskManager.runTask("set-gradient-linear", p)));
  
  server.tool("set-gradient-radial", "Set a radial gradient fill.", F.SetGradientRadialParamsSchema.shape,
    async (p: F.SetGradientRadialParams) => await safeToolProcessor(taskManager.runTask("set-gradient-radial", p)));
  
  server.tool("set-gradient-angular", "Set an angular gradient fill.", F.SetGradientAngularParamsSchema.shape,
    async (p: F.SetGradientAngularParams) => await safeToolProcessor(taskManager.runTask("set-gradient-angular", p)));
  
  server.tool("set-gradient-diamond", "Set a diamond gradient fill.", F.SetGradientDiamondParamsSchema.shape,
    async (p: F.SetGradientDiamondParams) => await safeToolProcessor(taskManager.runTask("set-gradient-diamond", p)));
  
  server.tool("set-image-fill", "Set an image fill.", F.SetImageFillParamsSchema.shape,
    async (p: F.SetImageFillParams) => await safeToolProcessor(taskManager.runTask("set-image-fill", p)));
  
  server.tool("set-video-fill", "Set a video fill.", F.SetVideoFillParamsSchema.shape,
    async (p: F.SetVideoFillParams) => await safeToolProcessor(taskManager.runTask("set-video-fill", p)));
  
  server.tool("add-fill", "Add a new fill layer.", F.AddFillParamsSchema.shape,
    async (p: F.AddFillParams) => await safeToolProcessor(taskManager.runTask("add-fill", p)));
  
  server.tool("remove-fill", "Remove a fill layer by index.", F.RemoveFillParamsSchema.shape,
    async (p: F.RemoveFillParams) => await safeToolProcessor(taskManager.runTask("remove-fill", p)));
  
  server.tool("remove-all-fills", "Remove all fills from a node.", F.RemoveAllFillsParamsSchema.shape,
    async (p: F.RemoveAllFillsParams) => await safeToolProcessor(taskManager.runTask("remove-all-fills", p)));
  
  server.tool("reorder-fills", "Reorder fill layers.", F.ReorderFillsParamsSchema.shape,
    async (p: F.ReorderFillsParams) => await safeToolProcessor(taskManager.runTask("reorder-fills", p)));
  
  server.tool("set-fill-opacity", "Set fill opacity.", F.SetFillOpacityParamsSchema.shape,
    async (p: F.SetFillOpacityParams) => await safeToolProcessor(taskManager.runTask("set-fill-opacity", p)));
  
  server.tool("set-fill-blend-mode", "Set fill blend mode.", F.SetFillBlendModeParamsSchema.shape,
    async (p: F.SetFillBlendModeParams) => await safeToolProcessor(taskManager.runTask("set-fill-blend-mode", p)));
  
  server.tool("copy-fills", "Copy fills to other nodes.", F.CopyFillsParamsSchema.shape,
    async (p: F.CopyFillsParams) => await safeToolProcessor(taskManager.runTask("copy-fills", p)));
  
  server.tool("paste-fills", "Paste fills from one node to another.", F.PasteFillsParamsSchema.shape,
    async (p: F.PasteFillsParams) => await safeToolProcessor(taskManager.runTask("paste-fills", p)));
  
  server.tool("sample-color", "Sample the primary color from a node.", F.SampleColorParamsSchema.shape,
    async (p: F.SampleColorParams) => await safeToolProcessor(taskManager.runTask("sample-color", p)));
  
  server.tool("swap-fill-colors", "Swap two colors in fills.", F.SwapFillColorsParamsSchema.shape,
    async (p: F.SwapFillColorsParams) => await safeToolProcessor(taskManager.runTask("swap-fill-colors", p)));
  
  server.tool("set-frame-background", "Set frame background color.", F.SetFrameBackgroundParamsSchema.shape,
    async (p: F.SetFrameBackgroundParams) => await safeToolProcessor(taskManager.runTask("set-frame-background", p)));
}
