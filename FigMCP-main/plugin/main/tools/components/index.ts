import { ToolResult } from "../tool-result";

export interface CreateComponentFromNodeParams { nodeId: string; }
export interface CreateComponentSetFromNodesParams { nodeIds: string[]; name?: string; }
export interface DetachInstanceParams { nodeId: string; }
export interface SwapInstanceParams { nodeId: string; componentKey: string; }
export interface ResetInstanceParams { nodeId: string; }
export interface GetMainComponentParams { nodeId: string; }
export interface GetAllDocumentComponentsParams { }
export interface GetComponentOverridesParams { nodeId: string; }
export interface SetOverrideParams { nodeId: string; property: string; value: any; }
export interface PublishComponentParams { nodeId: string; }
export interface CreateInstanceFromKeyParams { componentKey: string; parentId?: string; x?: number; y?: number; }
export interface SetVariantPropertyParams { nodeId: string; property: string; value: string; }

export async function createComponentFromNode(args: CreateComponentFromNodeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("type" in node)) return { isError: true, content: "Node not found" };
  
  // Create component from frame or other nodes
  if (node.type === "FRAME" || node.type === "GROUP" || node.type === "RECTANGLE" || node.type === "ELLIPSE") {
    const component = figma.createComponent();
    component.name = node.name;
    component.x = (node as SceneNode).x;
    component.y = (node as SceneNode).y;
    component.resize((node as SceneNode).width, (node as SceneNode).height);
    
    // Clone children if it's a frame
    if ("children" in node) {
      for (const child of (node as FrameNode).children) {
        component.appendChild(child.clone());
      }
    }
    
    return { isError: false, content: JSON.stringify({ id: component.id, key: component.key }) };
  }
  
  return { isError: true, content: "Node type not supported for component creation" };
}

export async function createComponentSetFromNodes(args: CreateComponentSetFromNodesParams): Promise<ToolResult> {
  const components: ComponentNode[] = [];
  for (const id of args.nodeIds) {
    const node = await figma.getNodeByIdAsync(id);
    if (node && node.type === "COMPONENT") {
      components.push(node as ComponentNode);
    }
  }
  
  if (components.length < 2) {
    return { isError: true, content: "Need at least 2 components to create a component set" };
  }
  
  const set = figma.combineAsVariants(components, figma.currentPage);
  if (args.name) set.name = args.name;
  
  return { isError: false, content: JSON.stringify({ id: set.id, name: set.name }) };
}

export async function detachInstance(args: DetachInstanceParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "INSTANCE") return { isError: true, content: "Instance not found" };
  const detached = (node as InstanceNode).detachInstance();
  return { isError: false, content: JSON.stringify({ id: detached.id, type: detached.type }) };
}

export async function swapInstance(args: SwapInstanceParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "INSTANCE") return { isError: true, content: "Instance not found" };
  
  try {
    const component = await figma.importComponentByKeyAsync(args.componentKey);
    (node as InstanceNode).swapComponent(component);
    return { isError: false, content: JSON.stringify({ id: node.id, swappedTo: args.componentKey }) };
  } catch (e) {
    return { isError: true, content: "Failed to swap instance" };
  }
}

export async function resetInstance(args: ResetInstanceParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "INSTANCE") return { isError: true, content: "Instance not found" };
  (node as InstanceNode).resetOverrides();
  return { isError: false, content: JSON.stringify({ id: node.id, reset: true }) };
}

export async function getMainComponent(args: GetMainComponentParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "INSTANCE") return { isError: true, content: "Instance not found" };
  const main = await (node as InstanceNode).getMainComponentAsync();
  if (!main) return { isError: true, content: "Main component not found" };
  return { isError: false, content: JSON.stringify({ id: main.id, name: main.name, key: main.key }) };
}

export async function getAllDocumentComponents(_args: GetAllDocumentComponentsParams): Promise<ToolResult> {
  const components = figma.root.findAllWithCriteria({ types: ["COMPONENT"] }) as ComponentNode[];
  const list = components.slice(0, 100).map(c => ({ id: c.id, name: c.name, key: c.key }));
  return { isError: false, content: JSON.stringify({ components: list, total: components.length }) };
}

export async function getComponentOverrides(args: GetComponentOverridesParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "INSTANCE") return { isError: true, content: "Instance not found" };
  const overrides = (node as InstanceNode).overrides;
  return { isError: false, content: JSON.stringify({ overrides }) };
}

export async function setOverride(args: SetOverrideParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "INSTANCE") return { isError: true, content: "Instance not found" };
  const instance = node as InstanceNode;
  
  // Set component properties
  try {
    instance.setProperties({ [args.property]: args.value });
    return { isError: false, content: JSON.stringify({ id: node.id, property: args.property, value: args.value }) };
  } catch (e) {
    return { isError: true, content: "Failed to set override" };
  }
}

export async function publishComponent(args: PublishComponentParams): Promise<ToolResult> {
  // Publishing requires manual action in Figma - can't be done programmatically
  return { isError: true, content: "Publishing components requires manual action in Figma" };
}

export async function createInstanceFromKey(args: CreateInstanceFromKeyParams): Promise<ToolResult> {
  try {
    const component = await figma.importComponentByKeyAsync(args.componentKey);
    const instance = component.createInstance();
    
    if (args.parentId) {
      const parent = await figma.getNodeByIdAsync(args.parentId);
      if (parent && "appendChild" in parent) {
        (parent as FrameNode).appendChild(instance);
      }
    }
    
    if (args.x !== undefined) instance.x = args.x;
    if (args.y !== undefined) instance.y = args.y;
    
    return { isError: false, content: JSON.stringify({ id: instance.id, x: instance.x, y: instance.y }) };
  } catch (e) {
    return { isError: true, content: "Failed to create instance from key" };
  }
}

export async function setVariantProperty(args: SetVariantPropertyParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "INSTANCE") return { isError: true, content: "Instance not found" };
  
  try {
    const instance = node as InstanceNode;
    instance.setProperties({ [args.property]: args.value });
    return { isError: false, content: JSON.stringify({ id: node.id, property: args.property, value: args.value }) };
  } catch (e) {
    return { isError: true, content: "Failed to set variant property" };
  }
}
