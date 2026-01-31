import { ToolResult } from "../tool-result";

export interface SetTextContentParams { nodeId: string; content: string; }
export interface SetFontFamilyParams { nodeId: string; family: string; style?: string; }
export interface SetFontSizeParams { nodeId: string; size: number; }
export interface SetFontWeightParams { nodeId: string; weight: string; }
export interface SetTextAlignParams { nodeId: string; align: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED"; }
export interface SetVerticalAlignParams { nodeId: string; align: "TOP" | "CENTER" | "BOTTOM"; }
export interface SetLineHeightParams { nodeId: string; value: number; unit?: "PIXELS" | "PERCENT" | "AUTO"; }
export interface SetLetterSpacingParams { nodeId: string; value: number; unit?: "PIXELS" | "PERCENT"; }
export interface SetParagraphSpacingParams { nodeId: string; spacing: number; }
export interface SetTextCaseParams { nodeId: string; textCase: "ORIGINAL" | "UPPER" | "LOWER" | "TITLE"; }
export interface SetTextDecorationParams { nodeId: string; decoration: "NONE" | "UNDERLINE" | "STRIKETHROUGH"; }
export interface SetTextAutoResizeParams { nodeId: string; mode: "NONE" | "HEIGHT" | "WIDTH_AND_HEIGHT" | "TRUNCATE"; }
export interface SetTextTruncationParams { nodeId: string; truncation: "DISABLED" | "ENDING"; }
export interface SetListTypeParams { nodeId: string; type: "NONE" | "ORDERED" | "UNORDERED"; }
export interface SetHyperlinkParams { nodeId: string; url: string; start?: number; end?: number; }
export interface SetRangeStyleParams { nodeId: string; start: number; end: number; fontSize?: number; fontWeight?: string; color?: string; }
export interface GetAvailableFontsParams { }
export interface LoadFontParams { family: string; style?: string; }
export interface GetTextStylesParams { nodeId: string; }
export interface ApplyTextStyleParams { nodeId: string; styleId: string; }

async function loadFontForNode(node: TextNode): Promise<void> {
  const fontName = node.fontName;
  if (fontName !== figma.mixed) {
    await figma.loadFontAsync(fontName);
  } else {
    // Load all fonts used in the text
    const len = node.characters.length;
    for (let i = 0; i < len; i++) {
      const font = node.getRangeFontName(i, i + 1);
      if (font !== figma.mixed) {
        await figma.loadFontAsync(font);
      }
    }
  }
}

export async function setTextContent(args: SetTextContentParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  await loadFontForNode(node);
  node.characters = args.content;
  return { isError: false, content: JSON.stringify({ id: node.id, content: args.content }) };
}

export async function setFontFamily(args: SetFontFamilyParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  const style = args.style || "Regular";
  await figma.loadFontAsync({ family: args.family, style });
  node.fontName = { family: args.family, style };
  return { isError: false, content: JSON.stringify({ id: node.id, fontFamily: args.family, fontStyle: style }) };
}

export async function setFontSize(args: SetFontSizeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  await loadFontForNode(node);
  node.fontSize = args.size;
  return { isError: false, content: JSON.stringify({ id: node.id, fontSize: args.size }) };
}

export async function setFontWeight(args: SetFontWeightParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  const currentFont = node.fontName;
  if (currentFont === figma.mixed) return { isError: true, content: "Mixed fonts not supported" };
  await figma.loadFontAsync({ family: currentFont.family, style: args.weight });
  node.fontName = { family: currentFont.family, style: args.weight };
  return { isError: false, content: JSON.stringify({ id: node.id, fontWeight: args.weight }) };
}

export async function setTextAlign(args: SetTextAlignParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  await loadFontForNode(node);
  node.textAlignHorizontal = args.align;
  return { isError: false, content: JSON.stringify({ id: node.id, textAlign: args.align }) };
}

export async function setVerticalAlign(args: SetVerticalAlignParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  await loadFontForNode(node);
  node.textAlignVertical = args.align;
  return { isError: false, content: JSON.stringify({ id: node.id, verticalAlign: args.align }) };
}

export async function setLineHeight(args: SetLineHeightParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  await loadFontForNode(node);
  if (args.unit === "AUTO") {
    node.lineHeight = { unit: "AUTO" };
  } else if (args.unit === "PERCENT") {
    node.lineHeight = { unit: "PERCENT", value: args.value };
  } else {
    node.lineHeight = { unit: "PIXELS", value: args.value };
  }
  return { isError: false, content: JSON.stringify({ id: node.id, lineHeight: args.value }) };
}

export async function setLetterSpacing(args: SetLetterSpacingParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  await loadFontForNode(node);
  if (args.unit === "PERCENT") {
    node.letterSpacing = { unit: "PERCENT", value: args.value };
  } else {
    node.letterSpacing = { unit: "PIXELS", value: args.value };
  }
  return { isError: false, content: JSON.stringify({ id: node.id, letterSpacing: args.value }) };
}

export async function setParagraphSpacing(args: SetParagraphSpacingParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  await loadFontForNode(node);
  node.paragraphSpacing = args.spacing;
  return { isError: false, content: JSON.stringify({ id: node.id, paragraphSpacing: args.spacing }) };
}

export async function setTextCase(args: SetTextCaseParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  await loadFontForNode(node);
  node.textCase = args.textCase;
  return { isError: false, content: JSON.stringify({ id: node.id, textCase: args.textCase }) };
}

export async function setTextDecoration(args: SetTextDecorationParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  await loadFontForNode(node);
  node.textDecoration = args.decoration;
  return { isError: false, content: JSON.stringify({ id: node.id, textDecoration: args.decoration }) };
}

export async function setTextAutoResize(args: SetTextAutoResizeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  await loadFontForNode(node);
  node.textAutoResize = args.mode;
  return { isError: false, content: JSON.stringify({ id: node.id, textAutoResize: args.mode }) };
}

export async function setTextTruncation(args: SetTextTruncationParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  await loadFontForNode(node);
  node.textTruncation = args.truncation;
  return { isError: false, content: JSON.stringify({ id: node.id, textTruncation: args.truncation }) };
}

export async function setListType(args: SetListTypeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  await loadFontForNode(node);
  // Figma uses different list options
  if (args.type === "ORDERED") {
    node.setRangeListOptions(0, node.characters.length, { type: "ORDERED" });
  } else if (args.type === "UNORDERED") {
    node.setRangeListOptions(0, node.characters.length, { type: "UNORDERED" });
  } else {
    node.setRangeListOptions(0, node.characters.length, { type: "NONE" });
  }
  return { isError: false, content: JSON.stringify({ id: node.id, listType: args.type }) };
}

export async function setHyperlink(args: SetHyperlinkParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  await loadFontForNode(node);
  const start = args.start ?? 0;
  const end = args.end ?? node.characters.length;
  node.setRangeHyperlink(start, end, { type: "URL", value: args.url });
  return { isError: false, content: JSON.stringify({ id: node.id, hyperlink: args.url }) };
}

export async function setRangeStyle(args: SetRangeStyleParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  await loadFontForNode(node);
  
  if (args.fontSize !== undefined) {
    node.setRangeFontSize(args.start, args.end, args.fontSize);
  }
  if (args.fontWeight !== undefined) {
    const currentFont = node.getRangeFontName(args.start, args.end);
    if (currentFont !== figma.mixed) {
      await figma.loadFontAsync({ family: currentFont.family, style: args.fontWeight });
      node.setRangeFontName(args.start, args.end, { family: currentFont.family, style: args.fontWeight });
    }
  }
  if (args.color !== undefined) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(args.color);
    if (result) {
      const rgb = {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      };
      node.setRangeFills(args.start, args.end, [{ type: "SOLID", color: rgb }]);
    }
  }
  return { isError: false, content: JSON.stringify({ id: node.id, styled: { start: args.start, end: args.end } }) };
}

export async function getAvailableFonts(_args: GetAvailableFontsParams): Promise<ToolResult> {
  const fonts = await figma.listAvailableFontsAsync();
  const fontList = fonts.slice(0, 100).map(f => ({ family: f.fontName.family, style: f.fontName.style }));
  return { isError: false, content: JSON.stringify({ fonts: fontList, total: fonts.length }) };
}

export async function loadFont(args: LoadFontParams): Promise<ToolResult> {
  try {
    await figma.loadFontAsync({ family: args.family, style: args.style || "Regular" });
    return { isError: false, content: JSON.stringify({ loaded: args.family, style: args.style || "Regular" }) };
  } catch (e) {
    return { isError: true, content: `Failed to load font: ${args.family}` };
  }
}

export async function getTextStyles(args: GetTextStylesParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  
  const styles = {
    fontSize: node.fontSize,
    fontName: node.fontName,
    textAlignHorizontal: node.textAlignHorizontal,
    textAlignVertical: node.textAlignVertical,
    lineHeight: node.lineHeight,
    letterSpacing: node.letterSpacing,
    textCase: node.textCase,
    textDecoration: node.textDecoration,
  };
  return { isError: false, content: JSON.stringify(styles) };
}

export async function applyTextStyle(args: ApplyTextStyleParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  
  try {
    const style = await figma.getStyleByIdAsync(args.styleId);
    if (!style || style.type !== "TEXT") return { isError: true, content: "Text style not found" };
    node.textStyleId = args.styleId;
    return { isError: false, content: JSON.stringify({ id: node.id, textStyleId: args.styleId }) };
  } catch (e) {
    return { isError: true, content: "Failed to apply text style" };
  }
}
