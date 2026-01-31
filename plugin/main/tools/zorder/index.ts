import { ToolResult } from "../tool-result";

export interface BringToFrontParams { nodeId: string; }
export interface SendToBackParams { nodeId: string; }
export interface BringForwardParams { nodeId: string; }
export interface SendBackwardParams { nodeId: string; }
export interface MoveToIndexParams { nodeId: string; index: number; }
export interface GetZIndexParams { nodeId: string; }
export interface SortChildrenByNameParams { nodeId: string; ascending?: boolean; }
export interface ReverseChildOrderParams { nodeId: string; }

export async function bringToFront(args: BringToFrontParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !node.parent || !("children" in node.parent)) return { isError: true, content: "Node not found" };
  const parent = node.parent as ChildrenMixin;
  const children = [...parent.children];
  const idx = children.indexOf(node as SceneNode);
  if (idx === -1) return { isError: true, content: "Node not in parent" };
  parent.insertChild(children.length - 1, node as SceneNode);
  return { isError: false, content: JSON.stringify({ id: (node as any).id, zIndex: children.length - 1 }) };
}

export async function sendToBack(args: SendToBackParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !node.parent || !("children" in node.parent)) return { isError: true, content: "Node not found" };
  const parent = node.parent as ChildrenMixin;
  parent.insertChild(0, node as SceneNode);
  return { isError: false, content: JSON.stringify({ id: (node as any).id, zIndex: 0 }) };
}

export async function bringForward(args: BringForwardParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !node.parent || !("children" in node.parent)) return { isError: true, content: "Node not found" };
  const parent = node.parent as ChildrenMixin;
  const children = [...parent.children];
  const idx = children.indexOf(node as SceneNode);
  if (idx === -1) return { isError: true, content: "Node not in parent" };
  if (idx < children.length - 1) {
    parent.insertChild(idx + 1, node as SceneNode);
  }
  return { isError: false, content: JSON.stringify({ id: (node as any).id, zIndex: Math.min(idx + 1, children.length - 1) }) };
}

export async function sendBackward(args: SendBackwardParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !node.parent || !("children" in node.parent)) return { isError: true, content: "Node not found" };
  const parent = node.parent as ChildrenMixin;
  const children = [...parent.children];
  const idx = children.indexOf(node as SceneNode);
  if (idx === -1) return { isError: true, content: "Node not in parent" };
  if (idx > 0) {
    parent.insertChild(idx - 1, node as SceneNode);
  }
  return { isError: false, content: JSON.stringify({ id: (node as any).id, zIndex: Math.max(idx - 1, 0) }) };
}

export async function moveToIndex(args: MoveToIndexParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !node.parent || !("children" in node.parent)) return { isError: true, content: "Node not found" };
  const parent = node.parent as ChildrenMixin;
  const maxIndex = parent.children.length - 1;
  const targetIndex = Math.max(0, Math.min(args.index, maxIndex));
  parent.insertChild(targetIndex, node as SceneNode);
  return { isError: false, content: JSON.stringify({ id: (node as any).id, zIndex: targetIndex }) };
}

export async function getZIndex(args: GetZIndexParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !node.parent || !("children" in node.parent)) return { isError: true, content: "Node not found" };
  const parent = node.parent as ChildrenMixin;
  const idx = parent.children.indexOf(node as SceneNode);
  return { isError: false, content: JSON.stringify({ id: (node as any).id, zIndex: idx, total: parent.children.length }) };
}

export async function sortChildrenByName(args: SortChildrenByNameParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("children" in node)) return { isError: true, content: "Node not found or has no children" };
  const parent = node as ChildrenMixin;
  const children = [...parent.children];
  const ascending = args.ascending !== false;
  children.sort((a, b) => ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  children.forEach((child, idx) => parent.insertChild(idx, child));
  return { isError: false, content: JSON.stringify({ id: (node as any).id, sorted: children.length }) };
}

export async function reverseChildOrder(args: ReverseChildOrderParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("children" in node)) return { isError: true, content: "Node not found or has no children" };
  const parent = node as ChildrenMixin;
  const children = [...parent.children].reverse();
  children.forEach((child, idx) => parent.insertChild(idx, child));
  return { isError: false, content: JSON.stringify({ id: (node as any).id, reversed: children.length }) };
}
