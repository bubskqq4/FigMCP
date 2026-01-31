import { ToolResult } from "../tool-result";
import * as V from "@shared/types/params/visibility/index";

export async function setOpacity(args: V.SetOpacityParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("opacity" in node)) return { isError: true, content: "Node not found" };
  (node as any).opacity = args.opacity;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, opacity: args.opacity }) };
}

export async function setBlendMode(args: V.SetBlendModeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("blendMode" in node)) return { isError: true, content: "Node not found" };
  (node as any).blendMode = args.blendMode;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, blendMode: args.blendMode }) };
}

export async function hideNode(args: V.HideNodeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("visible" in node)) return { isError: true, content: "Node not found" };
  (node as any).visible = false;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, visible: false }) };
}

export async function showNode(args: V.ShowNodeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("visible" in node)) return { isError: true, content: "Node not found" };
  (node as any).visible = true;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, visible: true }) };
}

export async function toggleVisibility(args: V.ToggleVisibilityParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("visible" in node)) return { isError: true, content: "Node not found" };
  const n = node as any;
  n.visible = !n.visible;
  return { isError: false, content: JSON.stringify({ id: n.id, visible: n.visible }) };
}

export async function lockNode(args: V.LockNodeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("locked" in node)) return { isError: true, content: "Node not found" };
  (node as any).locked = true;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, locked: true }) };
}

export async function unlockNode(args: V.UnlockNodeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("locked" in node)) return { isError: true, content: "Node not found" };
  (node as any).locked = false;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, locked: false }) };
}

export async function toggleLock(args: V.ToggleLockParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("locked" in node)) return { isError: true, content: "Node not found" };
  const n = node as any;
  n.locked = !n.locked;
  return { isError: false, content: JSON.stringify({ id: n.id, locked: n.locked }) };
}
