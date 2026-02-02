import { ToolResult } from "../tool-result";

export interface FindByNameParams { name: string; exact?: boolean; pageId?: string; }
export interface FindByTypeParams { type: string; pageId?: string; }
export interface FindByStyleParams { styleId: string; }
export interface FindByColorParams { color: string; tolerance?: number; }
export interface FindByTextContentParams { text: string; caseSensitive?: boolean; }
export interface FindInstancesOfComponentParams { componentKey: string; }
export interface FindAllWithPropertyParams { property: string; value?: any; }
export interface FindEmptyFramesParams { pageId?: string; }

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  } : { r: 0, g: 0, b: 0 };
}

export async function findByName(args: FindByNameParams): Promise<ToolResult> {
  const page = args.pageId ? figma.root.children.find(p => p.id === args.pageId) : figma.currentPage;
  if (!page) return { isError: true, content: "Page not found" };
  
  const nodes = page.findAll(node => {
    if (args.exact) return node.name === args.name;
    return node.name.toLowerCase().includes(args.name.toLowerCase());
  });
  
  const list = nodes.slice(0, 100).map(n => ({ id: n.id, name: n.name, type: n.type }));
  return { isError: false, content: JSON.stringify({ nodes: list, total: nodes.length }) };
}

export async function findByType(args: FindByTypeParams): Promise<ToolResult> {
  const page = args.pageId ? figma.root.children.find(p => p.id === args.pageId) : figma.currentPage;
  if (!page) return { isError: true, content: "Page not found" };
  
  const nodes = page.findAllWithCriteria({ types: [args.type as NodeType] });
  const list = nodes.slice(0, 100).map(n => ({ id: n.id, name: n.name, type: n.type }));
  return { isError: false, content: JSON.stringify({ nodes: list, total: nodes.length }) };
}

export async function findByStyle(args: FindByStyleParams): Promise<ToolResult> {
  const nodes = figma.currentPage.findAll(node => {
    if ("fillStyleId" in node && (node as any).fillStyleId === args.styleId) return true;
    if ("strokeStyleId" in node && (node as any).strokeStyleId === args.styleId) return true;
    if ("effectStyleId" in node && (node as any).effectStyleId === args.styleId) return true;
    if ("textStyleId" in node && (node as any).textStyleId === args.styleId) return true;
    return false;
  });
  
  const list = nodes.slice(0, 100).map(n => ({ id: n.id, name: n.name, type: n.type }));
  return { isError: false, content: JSON.stringify({ nodes: list, total: nodes.length }) };
}

export async function findByColor(args: FindByColorParams): Promise<ToolResult> {
  const targetRgb = hexToRgb(args.color);
  const tolerance = args.tolerance || 0.01;
  
  const nodes = figma.currentPage.findAll(node => {
    if (!("fills" in node)) return false;
    const fills = (node as GeometryMixin).fills;
    if (fills === figma.mixed) return false;
    
    for (const fill of fills as Paint[]) {
      if (fill.type === "SOLID") {
        const diff = Math.abs(fill.color.r - targetRgb.r) + 
                     Math.abs(fill.color.g - targetRgb.g) + 
                     Math.abs(fill.color.b - targetRgb.b);
        if (diff < tolerance) return true;
      }
    }
    return false;
  });
  
  const list = nodes.slice(0, 100).map(n => ({ id: n.id, name: n.name, type: n.type }));
  return { isError: false, content: JSON.stringify({ nodes: list, total: nodes.length }) };
}

export async function findByTextContent(args: FindByTextContentParams): Promise<ToolResult> {
  const nodes = figma.currentPage.findAllWithCriteria({ types: ["TEXT"] }) as TextNode[];
  const filtered = nodes.filter(node => {
    if (args.caseSensitive) return node.characters.includes(args.text);
    return node.characters.toLowerCase().includes(args.text.toLowerCase());
  });
  
  const list = filtered.slice(0, 100).map(n => ({ id: n.id, name: n.name, text: n.characters.substring(0, 50) }));
  return { isError: false, content: JSON.stringify({ nodes: list, total: filtered.length }) };
}

export async function findInstancesOfComponent(args: FindInstancesOfComponentParams): Promise<ToolResult> {
  const instances = figma.currentPage.findAllWithCriteria({ types: ["INSTANCE"] }) as InstanceNode[];
  const matchingInstances: any[] = [];
  
  for (const instance of instances) {
    const main = await instance.getMainComponentAsync();
    if (main && main.key === args.componentKey) {
      matchingInstances.push({ id: instance.id, name: instance.name });
    }
  }
  
  return { isError: false, content: JSON.stringify({ instances: matchingInstances.slice(0, 100), total: matchingInstances.length }) };
}

export async function findAllWithProperty(args: FindAllWithPropertyParams): Promise<ToolResult> {
  const nodes = figma.currentPage.findAll(node => {
    if (!(args.property in node)) return false;
    if (args.value !== undefined) {
      return (node as any)[args.property] === args.value;
    }
    return true;
  });
  
  const list = nodes.slice(0, 100).map(n => ({ id: n.id, name: n.name, type: n.type }));
  return { isError: false, content: JSON.stringify({ nodes: list, total: nodes.length }) };
}

export async function findEmptyFrames(args: FindEmptyFramesParams): Promise<ToolResult> {
  const page = args.pageId ? figma.root.children.find(p => p.id === args.pageId) : figma.currentPage;
  if (!page) return { isError: true, content: "Page not found" };
  
  const frames = page.findAllWithCriteria({ types: ["FRAME"] }) as FrameNode[];
  const empty = frames.filter(f => f.children.length === 0);
  
  const list = empty.slice(0, 100).map(f => ({ id: f.id, name: f.name }));
  return { isError: false, content: JSON.stringify({ frames: list, total: empty.length }) };
}
