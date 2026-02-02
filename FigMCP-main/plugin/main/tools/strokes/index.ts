import { ToolResult } from "../tool-result";

// Helper to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  } : { r: 0, g: 0, b: 0 };
}

export interface SetStrokeWeightParams { nodeId: string; weight: number; }
export interface SetStrokeAlignParams { nodeId: string; align: "INSIDE" | "OUTSIDE" | "CENTER"; }
export interface SetStrokeCapParams { nodeId: string; cap: "NONE" | "ROUND" | "SQUARE" | "ARROW_LINES" | "ARROW_EQUILATERAL"; }
export interface SetStrokeJoinParams { nodeId: string; join: "MITER" | "BEVEL" | "ROUND"; }
export interface SetDashPatternParams { nodeId: string; dashPattern: number[]; }
export interface SetStrokeOpacityParams { nodeId: string; opacity: number; index?: number; }
export interface AddStrokeParams { nodeId: string; color: string; weight?: number; opacity?: number; }
export interface RemoveStrokeParams { nodeId: string; index?: number; }
export interface RemoveAllStrokesParams { nodeId: string; }
export interface SetIndividualStrokesParams { nodeId: string; top?: number; right?: number; bottom?: number; left?: number; }
export interface OutlineStrokeParams { nodeId: string; }
export interface CopyStrokesParams { sourceNodeId: string; targetNodeIds: string[]; }

export async function setStrokeWeight(args: SetStrokeWeightParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("strokeWeight" in node)) return { isError: true, content: "Node not found or has no strokes" };
  (node as GeometryMixin).strokeWeight = args.weight;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, strokeWeight: args.weight }) };
}

export async function setStrokeAlign(args: SetStrokeAlignParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("strokeAlign" in node)) return { isError: true, content: "Node not found" };
  (node as GeometryMixin).strokeAlign = args.align;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, strokeAlign: args.align }) };
}

export async function setStrokeCap(args: SetStrokeCapParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("strokeCap" in node)) return { isError: true, content: "Node not found" };
  (node as GeometryMixin).strokeCap = args.cap;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, strokeCap: args.cap }) };
}

export async function setStrokeJoin(args: SetStrokeJoinParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("strokeJoin" in node)) return { isError: true, content: "Node not found" };
  (node as GeometryMixin).strokeJoin = args.join;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, strokeJoin: args.join }) };
}

export async function setDashPattern(args: SetDashPatternParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("dashPattern" in node)) return { isError: true, content: "Node not found" };
  (node as GeometryMixin).dashPattern = args.dashPattern;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, dashPattern: args.dashPattern }) };
}

export async function setStrokeOpacity(args: SetStrokeOpacityParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("strokes" in node)) return { isError: true, content: "Node not found" };
  const strokes = [...((node as GeometryMixin).strokes as Paint[])];
  const index = args.index !== undefined ? args.index : 0;
  if (index >= strokes.length) return { isError: true, content: "Invalid stroke index" };
  strokes[index] = { ...strokes[index], opacity: args.opacity };
  (node as GeometryMixin).strokes = strokes;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, opacity: args.opacity }) };
}

export async function addStroke(args: AddStrokeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("strokes" in node)) return { isError: true, content: "Node not found" };
  const strokes = [...((node as GeometryMixin).strokes as Paint[])];
  strokes.push({ type: "SOLID", color: hexToRgb(args.color), opacity: args.opacity !== undefined ? args.opacity : 1 });
  (node as GeometryMixin).strokes = strokes;
  if (args.weight !== undefined && "strokeWeight" in node) {
    (node as GeometryMixin).strokeWeight = args.weight;
  }
  return { isError: false, content: JSON.stringify({ id: (node as any).id, strokeCount: strokes.length }) };
}

export async function removeStroke(args: RemoveStrokeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("strokes" in node)) return { isError: true, content: "Node not found" };
  const strokes = [...((node as GeometryMixin).strokes as Paint[])];
  const index = args.index !== undefined ? args.index : 0;
  if (index >= strokes.length) return { isError: true, content: "Invalid stroke index" };
  strokes.splice(index, 1);
  (node as GeometryMixin).strokes = strokes;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, removed: index }) };
}

export async function removeAllStrokes(args: RemoveAllStrokesParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("strokes" in node)) return { isError: true, content: "Node not found" };
  (node as GeometryMixin).strokes = [];
  return { isError: false, content: JSON.stringify({ id: (node as any).id, strokes: 0 }) };
}

export async function setIndividualStrokes(args: SetIndividualStrokesParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "FRAME" && node.type !== "RECTANGLE" && node.type !== "COMPONENT") {
    return { isError: true, content: "Node not found or doesn't support individual strokes" };
  }
  const frame = node as FrameNode | RectangleNode | ComponentNode;
  if (args.top !== undefined) frame.strokeTopWeight = args.top;
  if (args.right !== undefined) frame.strokeRightWeight = args.right;
  if (args.bottom !== undefined) frame.strokeBottomWeight = args.bottom;
  if (args.left !== undefined) frame.strokeLeftWeight = args.left;
  return { isError: false, content: JSON.stringify({ id: frame.id, individualStrokes: true }) };
}

export async function outlineStroke(args: OutlineStrokeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("outlineStroke" in node)) return { isError: true, content: "Node not found or cannot outline stroke" };
  const outlined = (node as VectorNode).outlineStroke();
  if (!outlined) return { isError: true, content: "Failed to outline stroke" };
  return { isError: false, content: JSON.stringify({ id: outlined.id, type: outlined.type }) };
}

export async function copyStrokes(args: CopyStrokesParams): Promise<ToolResult> {
  const source = await figma.getNodeByIdAsync(args.sourceNodeId);
  if (!source || !("strokes" in source)) return { isError: true, content: "Source not found" };
  const strokes = (source as GeometryMixin).strokes;
  const strokeWeight = "strokeWeight" in source ? (source as GeometryMixin).strokeWeight : 1;
  for (const id of args.targetNodeIds) {
    const target = await figma.getNodeByIdAsync(id);
    if (target && "strokes" in target) {
      (target as GeometryMixin).strokes = strokes;
      if ("strokeWeight" in target) (target as GeometryMixin).strokeWeight = strokeWeight;
    }
  }
  return { isError: false, content: JSON.stringify({ copied: args.targetNodeIds.length }) };
}
