import { ToolResult } from "../tool-result";
import * as T from "@shared/types/params/transform/index";

export async function scaleNode(args: T.ScaleNodeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("resize" in node)) return { isError: true, content: "Node not found" };
  const n = node as SceneNode & { width: number; height: number };
  const newW = n.width * (args.scaleX !== undefined ? args.scaleX : 1);
  const newH = n.height * (args.scaleY !== undefined ? args.scaleY : 1);
  (n as any).resize(newW, newH);
  return { isError: false, content: JSON.stringify({ id: n.id, width: n.width, height: n.height }) };
}

export async function setRotation(args: T.SetRotationParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("rotation" in node)) return { isError: true, content: "Node not found" };
  (node as any).rotation = args.rotation;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, rotation: args.rotation }) };
}

export async function rotateBy(args: T.RotateByParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("rotation" in node)) return { isError: true, content: "Node not found" };
  const n = node as any;
  n.rotation = (n.rotation + args.degrees) % 360;
  return { isError: false, content: JSON.stringify({ id: n.id, rotation: n.rotation }) };
}

export async function resetRotation(args: T.ResetRotationParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("rotation" in node)) return { isError: true, content: "Node not found" };
  (node as any).rotation = 0;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, rotation: 0 }) };
}

export async function setWidth(args: T.SetWidthParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("resize" in node)) return { isError: true, content: "Node not found" };
  const n = node as SceneNode & { width: number; height: number };
  (n as any).resize(args.width, n.height);
  return { isError: false, content: JSON.stringify({ id: n.id, width: n.width }) };
}

export async function setHeight(args: T.SetHeightParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("resize" in node)) return { isError: true, content: "Node not found" };
  const n = node as SceneNode & { width: number; height: number };
  (n as any).resize(n.width, args.height);
  return { isError: false, content: JSON.stringify({ id: n.id, height: n.height }) };
}

export async function fitToContent(args: T.FitToContentParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "FRAME") return { isError: true, content: "Frame not found" };
  const frame = node as FrameNode;
  let maxX = 0, maxY = 0;
  for (const child of frame.children) {
    maxX = Math.max(maxX, child.x + child.width);
    maxY = Math.max(maxY, child.y + child.height);
  }
  frame.resize(maxX, maxY);
  return { isError: false, content: JSON.stringify({ id: frame.id, width: frame.width, height: frame.height }) };
}

export async function matchWidth(args: T.MatchWidthParams): Promise<ToolResult> {
  const source = await figma.getNodeByIdAsync(args.sourceNodeId);
  if (!source || !("width" in source)) return { isError: true, content: "Source not found" };
  const w = (source as any).width;
  for (const id of args.targetNodeIds) {
    const target = await figma.getNodeByIdAsync(id);
    if (target && "resize" in target) {
      const t = target as any;
      t.resize(w, t.height);
    }
  }
  return { isError: false, content: JSON.stringify({ matched: args.targetNodeIds.length, width: w }) };
}

export async function matchHeight(args: T.MatchHeightParams): Promise<ToolResult> {
  const source = await figma.getNodeByIdAsync(args.sourceNodeId);
  if (!source || !("height" in source)) return { isError: true, content: "Source not found" };
  const h = (source as any).height;
  for (const id of args.targetNodeIds) {
    const target = await figma.getNodeByIdAsync(id);
    if (target && "resize" in target) {
      const t = target as any;
      t.resize(t.width, h);
    }
  }
  return { isError: false, content: JSON.stringify({ matched: args.targetNodeIds.length, height: h }) };
}

export async function matchSize(args: T.MatchSizeParams): Promise<ToolResult> {
  const source = await figma.getNodeByIdAsync(args.sourceNodeId);
  if (!source || !("width" in source)) return { isError: true, content: "Source not found" };
  const { width: w, height: h } = source as any;
  for (const id of args.targetNodeIds) {
    const target = await figma.getNodeByIdAsync(id);
    if (target && "resize" in target) (target as any).resize(w, h);
  }
  return { isError: false, content: JSON.stringify({ matched: args.targetNodeIds.length, width: w, height: h }) };
}

export async function flipHorizontal(args: T.FlipHorizontalParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("relativeTransform" in node)) return { isError: true, content: "Node not found" };
  const n = node as SceneNode;
  const t = n.relativeTransform;
  n.relativeTransform = [[-t[0][0], t[0][1], t[0][2] + n.width], [t[1][0], t[1][1], t[1][2]]];
  return { isError: false, content: JSON.stringify({ id: n.id, flipped: "horizontal" }) };
}

export async function flipVertical(args: T.FlipVerticalParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("relativeTransform" in node)) return { isError: true, content: "Node not found" };
  const n = node as SceneNode;
  const t = n.relativeTransform;
  n.relativeTransform = [[t[0][0], t[0][1], t[0][2]], [-t[1][0], -t[1][1], t[1][2] + n.height]];
  return { isError: false, content: JSON.stringify({ id: n.id, flipped: "vertical" }) };
}
