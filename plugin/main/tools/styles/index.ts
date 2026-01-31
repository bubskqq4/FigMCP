import { ToolResult } from "../tool-result";

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  } : { r: 0, g: 0, b: 0 };
}

export interface GetAllStylesParams { type?: "PAINT" | "TEXT" | "EFFECT" | "GRID"; }
export interface GetStyleByIdParams { styleId: string; }
export interface CreateColorStyleParams { name: string; color: string; opacity?: number; }
export interface CreateTextStyleParams { name: string; fontFamily?: string; fontSize?: number; fontWeight?: string; }
export interface CreateEffectStyleParams { name: string; effects: any[]; }
export interface ApplyFillStyleParams { nodeId: string; styleId: string; }
export interface ApplyStrokeStyleParams { nodeId: string; styleId: string; }
export interface ApplyEffectStyleParams { nodeId: string; styleId: string; }
export interface ApplyGridStyleParams { nodeId: string; styleId: string; }
export interface DeleteStyleParams { styleId: string; }
export interface UpdateStyleParams { styleId: string; name?: string; }
export interface DetachStyleParams { nodeId: string; styleType: "fill" | "stroke" | "effect" | "text"; }

export async function getAllStyles(args: GetAllStylesParams): Promise<ToolResult> {
  let styles: BaseStyle[] = [];
  
  if (!args.type || args.type === "PAINT") {
    styles = [...styles, ...figma.getLocalPaintStyles()];
  }
  if (!args.type || args.type === "TEXT") {
    styles = [...styles, ...figma.getLocalTextStyles()];
  }
  if (!args.type || args.type === "EFFECT") {
    styles = [...styles, ...figma.getLocalEffectStyles()];
  }
  if (!args.type || args.type === "GRID") {
    styles = [...styles, ...figma.getLocalGridStyles()];
  }
  
  const list = styles.slice(0, 100).map(s => ({ id: s.id, name: s.name, type: s.type }));
  return { isError: false, content: JSON.stringify({ styles: list, total: styles.length }) };
}

export async function getStyleById(args: GetStyleByIdParams): Promise<ToolResult> {
  const style = await figma.getStyleByIdAsync(args.styleId);
  if (!style) return { isError: true, content: "Style not found" };
  return { isError: false, content: JSON.stringify({ id: style.id, name: style.name, type: style.type }) };
}

export async function createColorStyle(args: CreateColorStyleParams): Promise<ToolResult> {
  const style = figma.createPaintStyle();
  style.name = args.name;
  style.paints = [{ type: "SOLID", color: hexToRgb(args.color), opacity: args.opacity ?? 1 }];
  return { isError: false, content: JSON.stringify({ id: style.id, name: style.name }) };
}

export async function createTextStyle(args: CreateTextStyleParams): Promise<ToolResult> {
  const style = figma.createTextStyle();
  style.name = args.name;
  
  if (args.fontFamily) {
    const fontStyle = args.fontWeight || "Regular";
    await figma.loadFontAsync({ family: args.fontFamily, style: fontStyle });
    style.fontName = { family: args.fontFamily, style: fontStyle };
  }
  if (args.fontSize) style.fontSize = args.fontSize;
  
  return { isError: false, content: JSON.stringify({ id: style.id, name: style.name }) };
}

export async function createEffectStyle(args: CreateEffectStyleParams): Promise<ToolResult> {
  const style = figma.createEffectStyle();
  style.name = args.name;
  // Note: effects need to be in proper Figma format
  style.effects = args.effects || [];
  return { isError: false, content: JSON.stringify({ id: style.id, name: style.name }) };
}

export async function applyFillStyle(args: ApplyFillStyleParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("fillStyleId" in node)) return { isError: true, content: "Node not found" };
  (node as any).fillStyleId = args.styleId;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, fillStyleId: args.styleId }) };
}

export async function applyStrokeStyle(args: ApplyStrokeStyleParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("strokeStyleId" in node)) return { isError: true, content: "Node not found" };
  (node as any).strokeStyleId = args.styleId;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, strokeStyleId: args.styleId }) };
}

export async function applyEffectStyle(args: ApplyEffectStyleParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("effectStyleId" in node)) return { isError: true, content: "Node not found" };
  (node as any).effectStyleId = args.styleId;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, effectStyleId: args.styleId }) };
}

export async function applyGridStyle(args: ApplyGridStyleParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("gridStyleId" in node)) return { isError: true, content: "Node not found or is not a frame" };
  (node as FrameNode).gridStyleId = args.styleId;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, gridStyleId: args.styleId }) };
}

export async function deleteStyle(args: DeleteStyleParams): Promise<ToolResult> {
  const style = await figma.getStyleByIdAsync(args.styleId);
  if (!style) return { isError: true, content: "Style not found" };
  style.remove();
  return { isError: false, content: JSON.stringify({ deleted: args.styleId }) };
}

export async function updateStyle(args: UpdateStyleParams): Promise<ToolResult> {
  const style = await figma.getStyleByIdAsync(args.styleId);
  if (!style) return { isError: true, content: "Style not found" };
  if (args.name) style.name = args.name;
  return { isError: false, content: JSON.stringify({ id: style.id, name: style.name }) };
}

export async function detachStyle(args: DetachStyleParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  switch (args.styleType) {
    case "fill":
      if ("fillStyleId" in node) (node as any).fillStyleId = "";
      break;
    case "stroke":
      if ("strokeStyleId" in node) (node as any).strokeStyleId = "";
      break;
    case "effect":
      if ("effectStyleId" in node) (node as any).effectStyleId = "";
      break;
    case "text":
      if ("textStyleId" in node) (node as any).textStyleId = "";
      break;
  }
  
  return { isError: false, content: JSON.stringify({ id: (node as any).id, detached: args.styleType }) };
}
