import { ToolResult } from "../tool-result";
import {
  MoveByDeltaParams, SetPositionParams, AlignLeftParams, AlignRightParams,
  AlignTopParams, AlignBottomParams, AlignCenterHParams, AlignCenterVParams,
  DistributeHorizontalParams, DistributeVerticalParams, CenterInParentParams,
  MoveToPageParams, DuplicateAtOffsetParams, DuplicateArrayParams, SwapPositionsParams
} from "@shared/types/params/movement/index";

async function getNodes(nodeIds: string[]): Promise<SceneNode[]> {
  const nodes: SceneNode[] = [];
  for (const id of nodeIds) {
    const node = await figma.getNodeByIdAsync(id);
    if (node && "x" in node) nodes.push(node as SceneNode);
  }
  return nodes;
}

export async function moveByDelta(args: MoveByDeltaParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("x" in node)) return { isError: true, content: "Node not found" };
  const n = node as SceneNode;
  n.x += args.deltaX;
  n.y += args.deltaY;
  return { isError: false, content: JSON.stringify({ id: n.id, x: n.x, y: n.y }) };
}

export async function setPosition(args: SetPositionParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("x" in node)) return { isError: true, content: "Node not found" };
  const n = node as SceneNode;
  n.x = args.x;
  n.y = args.y;
  return { isError: false, content: JSON.stringify({ id: n.id, x: n.x, y: n.y }) };
}

export async function alignLeft(args: AlignLeftParams): Promise<ToolResult> {
  const nodes = await getNodes(args.nodeIds);
  if (nodes.length < 2) return { isError: true, content: "Need at least 2 nodes" };
  const minX = Math.min(...nodes.map(n => n.x));
  nodes.forEach(n => n.x = minX);
  return { isError: false, content: JSON.stringify({ aligned: nodes.length, edge: "left" }) };
}

export async function alignRight(args: AlignRightParams): Promise<ToolResult> {
  const nodes = await getNodes(args.nodeIds);
  if (nodes.length < 2) return { isError: true, content: "Need at least 2 nodes" };
  const maxRight = Math.max(...nodes.map(n => n.x + n.width));
  nodes.forEach(n => n.x = maxRight - n.width);
  return { isError: false, content: JSON.stringify({ aligned: nodes.length, edge: "right" }) };
}

export async function alignTop(args: AlignTopParams): Promise<ToolResult> {
  const nodes = await getNodes(args.nodeIds);
  if (nodes.length < 2) return { isError: true, content: "Need at least 2 nodes" };
  const minY = Math.min(...nodes.map(n => n.y));
  nodes.forEach(n => n.y = minY);
  return { isError: false, content: JSON.stringify({ aligned: nodes.length, edge: "top" }) };
}

export async function alignBottom(args: AlignBottomParams): Promise<ToolResult> {
  const nodes = await getNodes(args.nodeIds);
  if (nodes.length < 2) return { isError: true, content: "Need at least 2 nodes" };
  const maxBottom = Math.max(...nodes.map(n => n.y + n.height));
  nodes.forEach(n => n.y = maxBottom - n.height);
  return { isError: false, content: JSON.stringify({ aligned: nodes.length, edge: "bottom" }) };
}

export async function alignCenterH(args: AlignCenterHParams): Promise<ToolResult> {
  const nodes = await getNodes(args.nodeIds);
  if (nodes.length < 2) return { isError: true, content: "Need at least 2 nodes" };
  const centers = nodes.map(n => n.x + n.width / 2);
  const avgCenter = centers.reduce((a, b) => a + b, 0) / centers.length;
  nodes.forEach(n => n.x = avgCenter - n.width / 2);
  return { isError: false, content: JSON.stringify({ aligned: nodes.length, axis: "horizontal-center" }) };
}

export async function alignCenterV(args: AlignCenterVParams): Promise<ToolResult> {
  const nodes = await getNodes(args.nodeIds);
  if (nodes.length < 2) return { isError: true, content: "Need at least 2 nodes" };
  const centers = nodes.map(n => n.y + n.height / 2);
  const avgCenter = centers.reduce((a, b) => a + b, 0) / centers.length;
  nodes.forEach(n => n.y = avgCenter - n.height / 2);
  return { isError: false, content: JSON.stringify({ aligned: nodes.length, axis: "vertical-center" }) };
}

export async function distributeHorizontal(args: DistributeHorizontalParams): Promise<ToolResult> {
  const nodes = await getNodes(args.nodeIds);
  if (nodes.length < 3) return { isError: true, content: "Need at least 3 nodes" };
  nodes.sort((a, b) => a.x - b.x);
  const first = nodes[0], last = nodes[nodes.length - 1];
  const totalWidth = (last.x + last.width) - first.x;
  const nodeWidths = nodes.reduce((sum, n) => sum + n.width, 0);
  const gap = (totalWidth - nodeWidths) / (nodes.length - 1);
  let currentX = first.x;
  for (const n of nodes) {
    n.x = currentX;
    currentX += n.width + gap;
  }
  return { isError: false, content: JSON.stringify({ distributed: nodes.length, axis: "horizontal" }) };
}

export async function distributeVertical(args: DistributeVerticalParams): Promise<ToolResult> {
  const nodes = await getNodes(args.nodeIds);
  if (nodes.length < 3) return { isError: true, content: "Need at least 3 nodes" };
  nodes.sort((a, b) => a.y - b.y);
  const first = nodes[0], last = nodes[nodes.length - 1];
  const totalHeight = (last.y + last.height) - first.y;
  const nodeHeights = nodes.reduce((sum, n) => sum + n.height, 0);
  const gap = (totalHeight - nodeHeights) / (nodes.length - 1);
  let currentY = first.y;
  for (const n of nodes) {
    n.y = currentY;
    currentY += n.height + gap;
  }
  return { isError: false, content: JSON.stringify({ distributed: nodes.length, axis: "vertical" }) };
}

export async function centerInParent(args: CenterInParentParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("x" in node) || !("parent" in node)) return { isError: true, content: "Node not found" };
  const n = node as SceneNode;
  const parent = n.parent;
  if (!parent || !("width" in parent)) return { isError: true, content: "Parent not valid" };
  const p = parent as FrameNode;
  if (args.horizontal !== false) n.x = (p.width - n.width) / 2;
  if (args.vertical !== false) n.y = (p.height - n.height) / 2;
  return { isError: false, content: JSON.stringify({ id: n.id, x: n.x, y: n.y }) };
}

export async function moveToPage(args: MoveToPageParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  const page = await figma.getNodeByIdAsync(args.pageId);
  if (!node || !("x" in node)) return { isError: true, content: "Node not found" };
  if (!page || page.type !== "PAGE") return { isError: true, content: "Page not found" };
  (page as PageNode).appendChild(node as SceneNode);
  return { isError: false, content: JSON.stringify({ id: (node as SceneNode).id, newPageId: page.id }) };
}

export async function duplicateAtOffset(args: DuplicateAtOffsetParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("clone" in node)) return { isError: true, content: "Node not found" };
  const clone = (node as SceneNode).clone();
  clone.x += args.offsetX !== undefined ? args.offsetX : 20;
  clone.y += args.offsetY !== undefined ? args.offsetY : 20;
  return { isError: false, content: JSON.stringify({ id: clone.id, x: clone.x, y: clone.y }) };
}

export async function duplicateArray(args: DuplicateArrayParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("clone" in node)) return { isError: true, content: "Node not found" };
  const n = node as SceneNode;
  const clones: string[] = [];
  for (let i = 1; i <= args.count; i++) {
    const clone = n.clone();
    clone.x = n.x + (args.offsetX !== undefined ? args.offsetX : 50) * i;
    clone.y = n.y + (args.offsetY !== undefined ? args.offsetY : 0) * i;
    clones.push(clone.id);
  }
  return { isError: false, content: JSON.stringify({ cloneIds: clones, count: clones.length }) };
}

export async function swapPositions(args: SwapPositionsParams): Promise<ToolResult> {
  const node1 = await figma.getNodeByIdAsync(args.nodeId1);
  const node2 = await figma.getNodeByIdAsync(args.nodeId2);
  if (!node1 || !node2 || !("x" in node1) || !("x" in node2)) return { isError: true, content: "Nodes not found" };
  const n1 = node1 as SceneNode, n2 = node2 as SceneNode;
  const [x1, y1, x2, y2] = [n1.x, n1.y, n2.x, n2.y];
  n1.x = x2; n1.y = y2;
  n2.x = x1; n2.y = y1;
  return { isError: false, content: JSON.stringify({ swapped: [n1.id, n2.id] }) };
}
