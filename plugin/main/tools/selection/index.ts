import { ToolResult } from "../tool-result";

export interface SetSelectionParams { nodeIds: string[]; }
export interface AddToSelectionParams { nodeIds: string[]; }
export interface RemoveFromSelectionParams { nodeIds: string[]; }
export interface ClearSelectionParams { }
export interface SelectAllOnPageParams { }
export interface SelectChildrenParams { nodeId: string; }
export interface ZoomToSelectionParams { }
export interface ZoomToNodeParams { nodeId: string; }
export interface ZoomToFitParams { }
export interface ScrollIntoViewParams { nodeId: string; }

export async function setSelection(args: SetSelectionParams): Promise<ToolResult> {
  const nodes: SceneNode[] = [];
  for (const id of args.nodeIds) {
    const node = await figma.getNodeByIdAsync(id);
    if (node && "type" in node && node.type !== "DOCUMENT" && node.type !== "PAGE") {
      nodes.push(node as SceneNode);
    }
  }
  figma.currentPage.selection = nodes;
  return { isError: false, content: JSON.stringify({ selected: nodes.length }) };
}

export async function addToSelection(args: AddToSelectionParams): Promise<ToolResult> {
  const currentSelection = [...figma.currentPage.selection];
  for (const id of args.nodeIds) {
    const node = await figma.getNodeByIdAsync(id);
    if (node && "type" in node && node.type !== "DOCUMENT" && node.type !== "PAGE") {
      if (!currentSelection.find(n => n.id === id)) {
        currentSelection.push(node as SceneNode);
      }
    }
  }
  figma.currentPage.selection = currentSelection;
  return { isError: false, content: JSON.stringify({ selected: currentSelection.length }) };
}

export async function removeFromSelection(args: RemoveFromSelectionParams): Promise<ToolResult> {
  const currentSelection = figma.currentPage.selection.filter(
    node => !args.nodeIds.includes(node.id)
  );
  figma.currentPage.selection = currentSelection;
  return { isError: false, content: JSON.stringify({ selected: currentSelection.length }) };
}

export async function clearSelection(_args: ClearSelectionParams): Promise<ToolResult> {
  figma.currentPage.selection = [];
  return { isError: false, content: JSON.stringify({ selected: 0 }) };
}

export async function selectAllOnPage(_args: SelectAllOnPageParams): Promise<ToolResult> {
  figma.currentPage.selection = figma.currentPage.children;
  return { isError: false, content: JSON.stringify({ selected: figma.currentPage.children.length }) };
}

export async function selectChildren(args: SelectChildrenParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("children" in node)) return { isError: true, content: "Node not found or has no children" };
  const parent = node as ChildrenMixin;
  figma.currentPage.selection = parent.children;
  return { isError: false, content: JSON.stringify({ selected: parent.children.length }) };
}

export async function zoomToSelection(_args: ZoomToSelectionParams): Promise<ToolResult> {
  figma.viewport.scrollAndZoomIntoView(figma.currentPage.selection);
  return { isError: false, content: JSON.stringify({ zoomed: true }) };
}

export async function zoomToNode(args: ZoomToNodeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  figma.viewport.scrollAndZoomIntoView([node as SceneNode]);
  return { isError: false, content: JSON.stringify({ zoomed: true, nodeId: args.nodeId }) };
}

export async function zoomToFit(_args: ZoomToFitParams): Promise<ToolResult> {
  if (figma.currentPage.children.length > 0) {
    figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
  }
  return { isError: false, content: JSON.stringify({ zoomed: true }) };
}

export async function scrollIntoView(args: ScrollIntoViewParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  figma.viewport.scrollAndZoomIntoView([node as SceneNode]);
  return { isError: false, content: JSON.stringify({ scrolled: true, nodeId: args.nodeId }) };
}
