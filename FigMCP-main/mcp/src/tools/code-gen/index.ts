import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as C from "../../shared/types/params/code-gen/index.js";

export function registerCodeGenTools(server: McpServer, taskManager: TaskManager) {
  server.tool("generate-css", "Generate CSS from a node.", C.GenerateCssParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("generate-css", p)));
  server.tool("generate-tailwind", "Generate Tailwind classes from a node.", C.GenerateTailwindParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("generate-tailwind", p)));
  server.tool("generate-react", "Generate React component code.", C.GenerateReactParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("generate-react", p)));
  server.tool("extract-layout-css", "Extract layout properties as CSS.", C.ExtractLayoutCssParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("extract-layout-css", p)));
  server.tool("extract-typography-css", "Extract typography as CSS.", C.ExtractTypographyCssParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("extract-typography-css", p)));
  server.tool("extract-color-palette", "Extract color palette from design.", C.ExtractColorPaletteParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("extract-color-palette", p)));
  server.tool("generate-design-tokens", "Generate design tokens from document.", C.GenerateDesignTokensParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("generate-design-tokens", p)));
  server.tool("generate-html-structure", "Generate HTML structure from design.", C.GenerateHtmlStructureParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("generate-html-structure", p)));
  server.tool("layout-to-flexbox", "Convert Figma auto-layout to CSS flexbox.", C.LayoutToFlexboxParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("layout-to-flexbox", p)));
  server.tool("layout-to-grid", "Convert Figma layout to CSS grid.", C.LayoutToGridParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("layout-to-grid", p)));
}
