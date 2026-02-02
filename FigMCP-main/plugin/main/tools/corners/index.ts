import { ToolResult } from "../tool-result";

export interface SetAllCornersParams { nodeId: string; radius: number; }
export interface SetIndividualCornersParams { nodeId: string; topLeft?: number; topRight?: number; bottomRight?: number; bottomLeft?: number; }
export interface SetCornerSmoothingParams { nodeId: string; smoothing: number; }
export interface CopyCornersParams { sourceNodeId: string; targetNodeIds: string[]; }
export interface ResetCornersParams { nodeId: string; }
export interface SetTopCornersParams { nodeId: string; radius: number; }

export async function setAllCorners(args: SetAllCornersParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("cornerRadius" in node)) return { isError: true, content: "Node not found or has no corners" };
  (node as CornerMixin).cornerRadius = args.radius;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, cornerRadius: args.radius }) };
}

export async function setIndividualCorners(args: SetIndividualCornersParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("topLeftRadius" in node)) return { isError: true, content: "Node not found or doesn't support individual corners" };
  const rect = node as RectangleCornerMixin;
  if (args.topLeft !== undefined) rect.topLeftRadius = args.topLeft;
  if (args.topRight !== undefined) rect.topRightRadius = args.topRight;
  if (args.bottomRight !== undefined) rect.bottomRightRadius = args.bottomRight;
  if (args.bottomLeft !== undefined) rect.bottomLeftRadius = args.bottomLeft;
  return { isError: false, content: JSON.stringify({ 
    id: (node as any).id, 
    corners: { 
      topLeft: rect.topLeftRadius, 
      topRight: rect.topRightRadius, 
      bottomRight: rect.bottomRightRadius, 
      bottomLeft: rect.bottomLeftRadius 
    } 
  }) };
}

export async function setCornerSmoothing(args: SetCornerSmoothingParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("cornerSmoothing" in node)) return { isError: true, content: "Node not found or doesn't support corner smoothing" };
  (node as CornerMixin).cornerSmoothing = args.smoothing;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, cornerSmoothing: args.smoothing }) };
}

export async function copyCorners(args: CopyCornersParams): Promise<ToolResult> {
  const source = await figma.getNodeByIdAsync(args.sourceNodeId);
  if (!source || !("cornerRadius" in source)) return { isError: true, content: "Source not found" };
  const srcRect = source as RectangleCornerMixin & CornerMixin;
  
  for (const id of args.targetNodeIds) {
    const target = await figma.getNodeByIdAsync(id);
    if (target && "cornerRadius" in target) {
      const tgtRect = target as RectangleCornerMixin & CornerMixin;
      if ("topLeftRadius" in srcRect && "topLeftRadius" in tgtRect) {
        tgtRect.topLeftRadius = srcRect.topLeftRadius;
        tgtRect.topRightRadius = srcRect.topRightRadius;
        tgtRect.bottomRightRadius = srcRect.bottomRightRadius;
        tgtRect.bottomLeftRadius = srcRect.bottomLeftRadius;
      } else if ("cornerRadius" in srcRect) {
        tgtRect.cornerRadius = srcRect.cornerRadius;
      }
      if ("cornerSmoothing" in srcRect && "cornerSmoothing" in tgtRect) {
        tgtRect.cornerSmoothing = srcRect.cornerSmoothing;
      }
    }
  }
  return { isError: false, content: JSON.stringify({ copied: args.targetNodeIds.length }) };
}

export async function resetCorners(args: ResetCornersParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("cornerRadius" in node)) return { isError: true, content: "Node not found" };
  (node as CornerMixin).cornerRadius = 0;
  if ("topLeftRadius" in node) {
    const rect = node as RectangleCornerMixin;
    rect.topLeftRadius = 0;
    rect.topRightRadius = 0;
    rect.bottomRightRadius = 0;
    rect.bottomLeftRadius = 0;
  }
  return { isError: false, content: JSON.stringify({ id: (node as any).id, cornerRadius: 0 }) };
}

export async function setTopCorners(args: SetTopCornersParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("topLeftRadius" in node)) return { isError: true, content: "Node not found or doesn't support individual corners" };
  const rect = node as RectangleCornerMixin;
  rect.topLeftRadius = args.radius;
  rect.topRightRadius = args.radius;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, topCorners: args.radius }) };
}
