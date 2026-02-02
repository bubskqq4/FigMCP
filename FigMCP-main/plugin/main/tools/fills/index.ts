import { ToolResult } from "../tool-result";
import * as F from "@shared/types/params/fills/index";

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  } : { r: 0, g: 0, b: 0 };
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, "0")).join("");
}

export async function setSolidFill(args: F.SetSolidFillParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("fills" in node)) return { isError: true, content: "Node not found or has no fills" };
  const rgb = hexToRgb(args.color);
  (node as GeometryMixin).fills = [{ type: "SOLID", color: rgb, opacity: args.opacity !== undefined ? args.opacity : 1 }];
  return { isError: false, content: JSON.stringify({ id: (node as any).id, fill: args.color }) };
}

export async function setGradientLinear(args: F.SetGradientLinearParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("fills" in node)) return { isError: true, content: "Node not found" };
  const stops = args.stops.map(s => ({ position: s.position, color: { ...hexToRgb(s.color), a: 1 } }));
  const angle = (args.angle !== undefined ? args.angle : 0) * Math.PI / 180;
  (node as GeometryMixin).fills = [{
    type: "GRADIENT_LINEAR",
    gradientStops: stops,
    gradientTransform: [[Math.cos(angle), -Math.sin(angle), 0.5], [Math.sin(angle), Math.cos(angle), 0.5]],
  }];
  return { isError: false, content: JSON.stringify({ id: (node as any).id, gradient: "linear" }) };
}

export async function setGradientRadial(args: F.SetGradientRadialParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("fills" in node)) return { isError: true, content: "Node not found" };
  const stops = args.stops.map(s => ({ position: s.position, color: { ...hexToRgb(s.color), a: 1 } }));
  (node as GeometryMixin).fills = [{ type: "GRADIENT_RADIAL", gradientStops: stops, gradientTransform: [[1, 0, 0.5], [0, 1, 0.5]] }];
  return { isError: false, content: JSON.stringify({ id: (node as any).id, gradient: "radial" }) };
}

export async function setGradientAngular(args: F.SetGradientAngularParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("fills" in node)) return { isError: true, content: "Node not found" };
  const stops = args.stops.map(s => ({ position: s.position, color: { ...hexToRgb(s.color), a: 1 } }));
  (node as GeometryMixin).fills = [{ type: "GRADIENT_ANGULAR", gradientStops: stops, gradientTransform: [[1, 0, 0.5], [0, 1, 0.5]] }];
  return { isError: false, content: JSON.stringify({ id: (node as any).id, gradient: "angular" }) };
}

export async function setGradientDiamond(args: F.SetGradientDiamondParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("fills" in node)) return { isError: true, content: "Node not found" };
  const stops = args.stops.map(s => ({ position: s.position, color: { ...hexToRgb(s.color), a: 1 } }));
  (node as GeometryMixin).fills = [{ type: "GRADIENT_DIAMOND", gradientStops: stops, gradientTransform: [[1, 0, 0.5], [0, 1, 0.5]] }];
  return { isError: false, content: JSON.stringify({ id: (node as any).id, gradient: "diamond" }) };
}

export async function setImageFill(args: F.SetImageFillParams): Promise<ToolResult> {
  // Note: Image fill from URL requires fetching and creating image hash - simplified version
  return { isError: true, content: "Image fill from URL not supported in plugin mode. Use Figma's native image upload." };
}

export async function setVideoFill(args: F.SetVideoFillParams): Promise<ToolResult> {
  return { isError: true, content: "Video fill not supported in plugin mode." };
}

export async function addFill(args: F.AddFillParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("fills" in node)) return { isError: true, content: "Node not found" };
  const fills = [...((node as GeometryMixin).fills as Paint[])];
  fills.push({ type: "SOLID", color: hexToRgb(args.color), opacity: args.opacity !== undefined ? args.opacity : 1 });
  (node as GeometryMixin).fills = fills;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, fillCount: fills.length }) };
}

export async function removeFill(args: F.RemoveFillParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("fills" in node)) return { isError: true, content: "Node not found" };
  const fills = [...((node as GeometryMixin).fills as Paint[])];
  const index = args.index !== undefined ? args.index : 0;
  if (index >= fills.length) return { isError: true, content: "Invalid fill index" };
  fills.splice(index, 1);
  (node as GeometryMixin).fills = fills;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, removed: index }) };
}

export async function removeAllFills(args: F.RemoveAllFillsParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("fills" in node)) return { isError: true, content: "Node not found" };
  (node as GeometryMixin).fills = [];
  return { isError: false, content: JSON.stringify({ id: (node as any).id, fills: 0 }) };
}

export async function reorderFills(args: F.ReorderFillsParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("fills" in node)) return { isError: true, content: "Node not found" };
  const fills = [...((node as GeometryMixin).fills as Paint[])];
  const [fill] = fills.splice(args.fromIndex, 1);
  fills.splice(args.toIndex, 0, fill);
  (node as GeometryMixin).fills = fills;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, reordered: true }) };
}

export async function setFillOpacity(args: F.SetFillOpacityParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("fills" in node)) return { isError: true, content: "Node not found" };
  const fills = [...((node as GeometryMixin).fills as Paint[])];
  const index = args.index !== undefined ? args.index : 0;
  if (index >= fills.length) return { isError: true, content: "Invalid fill index" };
  fills[index] = { ...fills[index], opacity: args.opacity };
  (node as GeometryMixin).fills = fills;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, opacity: args.opacity }) };
}

export async function setFillBlendMode(args: F.SetFillBlendModeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("fills" in node)) return { isError: true, content: "Node not found" };
  const fills = [...((node as GeometryMixin).fills as Paint[])];
  const index = args.index !== undefined ? args.index : 0;
  if (index >= fills.length) return { isError: true, content: "Invalid fill index" };
  fills[index] = { ...fills[index], blendMode: args.blendMode };
  (node as GeometryMixin).fills = fills;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, blendMode: args.blendMode }) };
}

export async function copyFills(args: F.CopyFillsParams): Promise<ToolResult> {
  const source = await figma.getNodeByIdAsync(args.sourceNodeId);
  if (!source || !("fills" in source)) return { isError: true, content: "Source not found" };
  const fills = (source as GeometryMixin).fills;
  for (const id of args.targetNodeIds) {
    const target = await figma.getNodeByIdAsync(id);
    if (target && "fills" in target) (target as GeometryMixin).fills = fills;
  }
  return { isError: false, content: JSON.stringify({ copied: args.targetNodeIds.length }) };
}

export async function pasteFills(args: F.PasteFillsParams): Promise<ToolResult> {
  const source = await figma.getNodeByIdAsync(args.sourceNodeId);
  const target = await figma.getNodeByIdAsync(args.targetNodeId);
  if (!source || !("fills" in source)) return { isError: true, content: "Source not found" };
  if (!target || !("fills" in target)) return { isError: true, content: "Target not found" };
  (target as GeometryMixin).fills = (source as GeometryMixin).fills;
  return { isError: false, content: JSON.stringify({ pasted: true }) };
}

export async function sampleColor(args: F.SampleColorParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("fills" in node)) return { isError: true, content: "Node not found" };
  const fills = (node as GeometryMixin).fills as Paint[];
  if (fills.length === 0) return { isError: true, content: "No fills to sample" };
  const fill = fills[0];
  if (fill.type === "SOLID") {
    const hex = rgbToHex(fill.color.r, fill.color.g, fill.color.b);
    return { isError: false, content: JSON.stringify({ color: hex, opacity: fill.opacity }) };
  }
  return { isError: true, content: "First fill is not a solid color" };
}

export async function swapFillColors(args: F.SwapFillColorsParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("fills" in node)) return { isError: true, content: "Node not found" };
  const rgb1 = hexToRgb(args.color1);
  const rgb2 = hexToRgb(args.color2);
  const fills = ((node as GeometryMixin).fills as Paint[]).map(fill => {
    if (fill.type === "SOLID") {
      if (Math.abs(fill.color.r - rgb1.r) < 0.01 && Math.abs(fill.color.g - rgb1.g) < 0.01 && Math.abs(fill.color.b - rgb1.b) < 0.01) {
        return { ...fill, color: rgb2 };
      }
      if (Math.abs(fill.color.r - rgb2.r) < 0.01 && Math.abs(fill.color.g - rgb2.g) < 0.01 && Math.abs(fill.color.b - rgb2.b) < 0.01) {
        return { ...fill, color: rgb1 };
      }
    }
    return fill;
  });
  (node as GeometryMixin).fills = fills;
  return { isError: false, content: JSON.stringify({ swapped: true }) };
}

export async function setFrameBackground(args: F.SetFrameBackgroundParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "FRAME") return { isError: true, content: "Frame not found" };
  const frame = node as FrameNode;
  frame.fills = [{ type: "SOLID", color: hexToRgb(args.color), opacity: args.opacity !== undefined ? args.opacity : 1 }];
  return { isError: false, content: JSON.stringify({ id: frame.id, background: args.color }) };
}
