import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as T from "../../shared/types/params/text/index.js";

export function registerTextTools(server: McpServer, taskManager: TaskManager) {
  server.tool("set-text-content", "Set text content.", T.SetTextContentParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-text-content", p)));
  server.tool("set-font-family", "Set font family.", T.SetFontFamilyParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-font-family", p)));
  server.tool("set-font-size", "Set font size.", T.SetFontSizeParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-font-size", p)));
  server.tool("set-font-weight", "Set font weight.", T.SetFontWeightParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-font-weight", p)));
  server.tool("set-text-align", "Set horizontal text alignment.", T.SetTextAlignParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-text-align", p)));
  server.tool("set-vertical-align", "Set vertical text alignment.", T.SetVerticalAlignParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-vertical-align", p)));
  server.tool("set-line-height", "Set line height.", T.SetLineHeightParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-line-height", p)));
  server.tool("set-letter-spacing", "Set letter spacing.", T.SetLetterSpacingParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-letter-spacing", p)));
  server.tool("set-paragraph-spacing", "Set paragraph spacing.", T.SetParagraphSpacingParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-paragraph-spacing", p)));
  server.tool("set-text-case", "Set text case (upper, lower, title).", T.SetTextCaseParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-text-case", p)));
  server.tool("set-text-decoration", "Set text decoration.", T.SetTextDecorationParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-text-decoration", p)));
  server.tool("set-text-auto-resize", "Set text auto-resize mode.", T.SetTextAutoResizeParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-text-auto-resize", p)));
  server.tool("set-text-truncation", "Set text truncation.", T.SetTextTruncationParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-text-truncation", p)));
  server.tool("set-list-type", "Set list type (ordered/unordered).", T.SetListTypeParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-list-type", p)));
  server.tool("set-hyperlink", "Add hyperlink to text.", T.SetHyperlinkParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-hyperlink", p)));
  server.tool("set-range-style", "Style a range of text.", T.SetRangeStyleParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("set-range-style", p)));
  server.tool("get-available-fonts", "Get list of available fonts.", T.GetAvailableFontsParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-available-fonts", p)));
  server.tool("load-font", "Load a font for use.", T.LoadFontParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("load-font", p)));
  server.tool("get-text-styles", "Get text styles from node.", T.GetTextStylesParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("get-text-styles", p)));
  server.tool("apply-text-style", "Apply a text style.", T.ApplyTextStyleParamsSchema.shape, async (p) => await safeToolProcessor(taskManager.runTask("apply-text-style", p)));
}
