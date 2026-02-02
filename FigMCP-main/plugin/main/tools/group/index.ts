import { ToolResult } from "../tool-result";
import { 
  CreateGroupParams,
  UngroupParams,
  CreateComponentSetParams,
  CreateVariantParams,
  FrameSelectionParams,
  WrapInFrameParams,
  WrapInGroupParams,
  ExtractFromParentParams,
  FlattenToFrameParams,
  MergeFramesParams
} from "@shared/types/params/group/index";

export async function createGroup(args: CreateGroupParams): Promise<ToolResult> {
  const nodes: SceneNode[] = [];
  for (const nodeId of args.nodeIds) {
    const node = await figma.getNodeByIdAsync(nodeId);
    if (node && "type" in node) {
      nodes.push(node as SceneNode);
    }
  }
  if (nodes.length === 0) {
    return { isError: true, content: "No valid nodes found" };
  }
  const group = figma.group(nodes, nodes[0].parent as FrameNode | GroupNode | PageNode);
  group.name = args.name !== undefined ? args.name : "Group";
  return {
    isError: false,
    content: JSON.stringify({ id: group.id, name: group.name, type: group.type })
  };
}

export async function ungroup(args: UngroupParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "GROUP") {
    return { isError: true, content: "Node not found or not a group" };
  }
  const group = node as GroupNode;
  const parent = group.parent as FrameNode | GroupNode | PageNode;
  const children = [...group.children];
  const childIds: string[] = [];
  for (const child of children) {
    parent.appendChild(child);
    childIds.push(child.id);
  }
  group.remove();
  return {
    isError: false,
    content: JSON.stringify({ ungrouped: true, childIds })
  };
}

export async function createComponentSet(args: CreateComponentSetParams): Promise<ToolResult> {
  const components: ComponentNode[] = [];
  for (const id of args.componentIds) {
    const node = await figma.getNodeByIdAsync(id);
    if (node && node.type === "COMPONENT") {
      components.push(node as ComponentNode);
    }
  }
  if (components.length === 0) {
    return { isError: true, content: "No valid components found" };
  }
  const componentSet = figma.combineAsVariants(components, components[0].parent as FrameNode | PageNode);
  componentSet.name = args.name !== undefined ? args.name : "Component Set";
  return {
    isError: false,
    content: JSON.stringify({ id: componentSet.id, name: componentSet.name, type: componentSet.type })
  };
}

export async function createVariant(args: CreateVariantParams): Promise<ToolResult> {
  const setNode = await figma.getNodeByIdAsync(args.componentSetId);
  if (!setNode || setNode.type !== "COMPONENT_SET") {
    return { isError: true, content: "Component set not found" };
  }
  const sourceNode = await figma.getNodeByIdAsync(args.sourceComponentId);
  if (!sourceNode || sourceNode.type !== "COMPONENT") {
    return { isError: true, content: "Source component not found" };
  }
  const newVariant = (sourceNode as ComponentNode).clone();
  (setNode as ComponentSetNode).appendChild(newVariant);
  if (args.variantProperties) {
    for (const [key, value] of Object.entries(args.variantProperties)) {
      try {
        newVariant.setProperties({ [key]: value });
      } catch (e) {
        // Property may not exist yet
      }
    }
  }
  return {
    isError: false,
    content: JSON.stringify({ id: newVariant.id, name: newVariant.name, type: newVariant.type })
  };
}

export async function frameSelection(args: FrameSelectionParams): Promise<ToolResult> {
  const selection = figma.currentPage.selection;
  if (selection.length === 0) {
    return { isError: true, content: "No nodes selected" };
  }
  const frame = figma.createFrame();
  frame.name = args.name !== undefined ? args.name : "Frame";
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const node of selection) {
    minX = Math.min(minX, node.x);
    minY = Math.min(minY, node.y);
    maxX = Math.max(maxX, node.x + node.width);
    maxY = Math.max(maxY, node.y + node.height);
  }
  const padding = args.padding !== undefined ? args.padding : 0;
  frame.x = minX - padding;
  frame.y = minY - padding;
  frame.resize(maxX - minX + padding * 2, maxY - minY + padding * 2);
  for (const node of selection) {
    node.x = node.x - frame.x;
    node.y = node.y - frame.y;
    frame.appendChild(node);
  }
  figma.currentPage.appendChild(frame);
  return {
    isError: false,
    content: JSON.stringify({ id: frame.id, name: frame.name, type: frame.type })
  };
}

export async function wrapInFrame(args: WrapInFrameParams): Promise<ToolResult> {
  const nodes: SceneNode[] = [];
  for (const nodeId of args.nodeIds) {
    const node = await figma.getNodeByIdAsync(nodeId);
    if (node && "type" in node) {
      nodes.push(node as SceneNode);
    }
  }
  if (nodes.length === 0) {
    return { isError: true, content: "No valid nodes found" };
  }
  const frame = figma.createFrame();
  frame.name = args.name !== undefined ? args.name : "Frame";
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const node of nodes) {
    minX = Math.min(minX, node.x);
    minY = Math.min(minY, node.y);
    maxX = Math.max(maxX, node.x + node.width);
    maxY = Math.max(maxY, node.y + node.height);
  }
  const padding = args.padding !== undefined ? args.padding : 0;
  frame.x = minX - padding;
  frame.y = minY - padding;
  frame.resize(maxX - minX + padding * 2, maxY - minY + padding * 2);
  const parent = nodes[0].parent as FrameNode | PageNode;
  parent.appendChild(frame);
  for (const node of nodes) {
    node.x = node.x - frame.x;
    node.y = node.y - frame.y;
    frame.appendChild(node);
  }
  return {
    isError: false,
    content: JSON.stringify({ id: frame.id, name: frame.name, type: frame.type })
  };
}

export async function wrapInGroup(args: WrapInGroupParams): Promise<ToolResult> {
  const nodes: SceneNode[] = [];
  for (const nodeId of args.nodeIds) {
    const node = await figma.getNodeByIdAsync(nodeId);
    if (node && "type" in node) {
      nodes.push(node as SceneNode);
    }
  }
  if (nodes.length === 0) {
    return { isError: true, content: "No valid nodes found" };
  }
  const group = figma.group(nodes, nodes[0].parent as FrameNode | GroupNode | PageNode);
  group.name = args.name !== undefined ? args.name : "Group";
  return {
    isError: false,
    content: JSON.stringify({ id: group.id, name: group.name, type: group.type })
  };
}

export async function extractFromParent(args: ExtractFromParentParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("parent" in node)) {
    return { isError: true, content: "Node not found" };
  }
  const sceneNode = node as SceneNode;
  const absoluteX = sceneNode.absoluteTransform[0][2];
  const absoluteY = sceneNode.absoluteTransform[1][2];
  let newParent: FrameNode | PageNode = figma.currentPage;
  if (args.newParentId) {
    const parent = await figma.getNodeByIdAsync(args.newParentId);
    if (parent && "appendChild" in parent) {
      newParent = parent as FrameNode;
    }
  }
  newParent.appendChild(sceneNode);
  sceneNode.x = absoluteX;
  sceneNode.y = absoluteY;
  return {
    isError: false,
    content: JSON.stringify({ id: sceneNode.id, name: sceneNode.name, newParentId: newParent.id })
  };
}

export async function flattenToFrame(args: FlattenToFrameParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) {
    return { isError: true, content: "Node not found" };
  }
  if (node.type !== "GROUP" && node.type !== "FRAME") {
    return { isError: true, content: "Node must be a group or frame" };
  }
  const container = node as GroupNode | FrameNode;
  const frame = figma.createFrame();
  frame.name = args.name !== undefined ? args.name : container.name;
  frame.x = container.x;
  frame.y = container.y;
  frame.resize(container.width, container.height);
  const children = [...container.children];
  for (const child of children) {
    child.x = child.x;
    child.y = child.y;
    frame.appendChild(child);
  }
  const parent = container.parent as FrameNode | PageNode;
  parent.appendChild(frame);
  container.remove();
  return {
    isError: false,
    content: JSON.stringify({ id: frame.id, name: frame.name, type: frame.type })
  };
}

export async function mergeFrames(args: MergeFramesParams): Promise<ToolResult> {
  const frames: FrameNode[] = [];
  for (const id of args.frameIds) {
    const node = await figma.getNodeByIdAsync(id);
    if (node && node.type === "FRAME") {
      frames.push(node as FrameNode);
    }
  }
  if (frames.length < 2) {
    return { isError: true, content: "Need at least 2 frames to merge" };
  }
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const frame of frames) {
    minX = Math.min(minX, frame.x);
    minY = Math.min(minY, frame.y);
    maxX = Math.max(maxX, frame.x + frame.width);
    maxY = Math.max(maxY, frame.y + frame.height);
  }
  const merged = figma.createFrame();
  merged.name = args.name !== undefined ? args.name : "Merged Frame";
  merged.x = minX;
  merged.y = minY;
  merged.resize(maxX - minX, maxY - minY);
  for (const frame of frames) {
    const children = [...frame.children];
    for (const child of children) {
      child.x = child.x + frame.x - merged.x;
      child.y = child.y + frame.y - merged.y;
      merged.appendChild(child);
    }
    frame.remove();
  }
  figma.currentPage.appendChild(merged);
  return {
    isError: false,
    content: JSON.stringify({ id: merged.id, name: merged.name, type: merged.type })
  };
}
