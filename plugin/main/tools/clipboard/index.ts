import { ToolResult } from "../tool-result";

export interface DuplicateNodeParams { nodeId: string; }
export interface CopyPropertiesParams { sourceNodeId: string; targetNodeIds: string[]; properties?: string[]; }
export interface GetCssParams { nodeId: string; }
export interface GetSvgCodeParams { nodeId: string; }
export interface CloneToLocationParams { nodeId: string; x: number; y: number; parentId?: string; }
export interface CopyNodeAcrossPagesParams { nodeId: string; targetPageId: string; }

export async function duplicateNode(args: DuplicateNodeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const clone = (node as SceneNode).clone();
  return { isError: false, content: JSON.stringify({ id: clone.id, name: clone.name }) };
}

export async function copyProperties(args: CopyPropertiesParams): Promise<ToolResult> {
  const source = await figma.getNodeByIdAsync(args.sourceNodeId);
  if (!source) return { isError: true, content: "Source not found" };
  
  const propertiesToCopy = args.properties || ["fills", "strokes", "effects", "cornerRadius", "opacity"];
  let copied = 0;
  
  for (const targetId of args.targetNodeIds) {
    const target = await figma.getNodeByIdAsync(targetId);
    if (!target) continue;
    
    for (const prop of propertiesToCopy) {
      if (prop in source && prop in target) {
        try {
          (target as any)[prop] = (source as any)[prop];
        } catch (e) {
          // Property might be read-only
        }
      }
    }
    copied++;
  }
  
  return { isError: false, content: JSON.stringify({ copied, properties: propertiesToCopy }) };
}

export async function getCss(args: GetCssParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const css: string[] = [];
  
  // Position and size
  if ("x" in node) css.push(`left: ${(node as SceneNode).x}px;`);
  if ("y" in node) css.push(`top: ${(node as SceneNode).y}px;`);
  if ("width" in node) css.push(`width: ${(node as SceneNode).width}px;`);
  if ("height" in node) css.push(`height: ${(node as SceneNode).height}px;`);
  
  // Corner radius
  if ("cornerRadius" in node) {
    const cr = (node as CornerMixin).cornerRadius;
    if (typeof cr === "number" && cr > 0) {
      css.push(`border-radius: ${cr}px;`);
    }
  }
  
  // Opacity
  if ("opacity" in node) {
    const opacity = (node as BlendMixin).opacity;
    if (opacity < 1) css.push(`opacity: ${opacity};`);
  }
  
  // Fill
  if ("fills" in node) {
    const fills = (node as GeometryMixin).fills;
    if (fills !== figma.mixed && (fills as Paint[]).length > 0) {
      const fill = (fills as Paint[])[0];
      if (fill.type === "SOLID") {
        const r = Math.round(fill.color.r * 255);
        const g = Math.round(fill.color.g * 255);
        const b = Math.round(fill.color.b * 255);
        const a = fill.opacity ?? 1;
        css.push(`background-color: rgba(${r}, ${g}, ${b}, ${a});`);
      }
    }
  }
  
  // Stroke
  if ("strokes" in node) {
    const strokes = (node as GeometryMixin).strokes;
    if (strokes !== figma.mixed && (strokes as Paint[]).length > 0) {
      const stroke = (strokes as Paint[])[0];
      if (stroke.type === "SOLID") {
        const r = Math.round(stroke.color.r * 255);
        const g = Math.round(stroke.color.g * 255);
        const b = Math.round(stroke.color.b * 255);
        const weight = "strokeWeight" in node ? (node as GeometryMixin).strokeWeight : 1;
        css.push(`border: ${weight}px solid rgb(${r}, ${g}, ${b});`);
      }
    }
  }
  
  return { isError: false, content: JSON.stringify({ id: (node as any).id, css: css.join("\n") }) };
}

export async function getSvgCode(args: GetSvgCodeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("exportAsync" in node)) return { isError: true, content: "Node not found" };
  
  const bytes = await (node as ExportMixin).exportAsync({ format: "SVG" });
  const svgString = String.fromCharCode(...bytes);
  
  return { isError: false, content: JSON.stringify({ id: (node as any).id, svg: svgString }) };
}

export async function cloneToLocation(args: CloneToLocationParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const clone = (node as SceneNode).clone();
  clone.x = args.x;
  clone.y = args.y;
  
  if (args.parentId) {
    const parent = await figma.getNodeByIdAsync(args.parentId);
    if (parent && "appendChild" in parent) {
      (parent as ChildrenMixin).appendChild(clone);
    }
  }
  
  return { isError: false, content: JSON.stringify({ id: clone.id, x: clone.x, y: clone.y }) };
}

export async function copyNodeAcrossPages(args: CopyNodeAcrossPagesParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const targetPage = figma.root.children.find(p => p.id === args.targetPageId);
  if (!targetPage) return { isError: true, content: "Target page not found" };
  
  const clone = (node as SceneNode).clone();
  targetPage.appendChild(clone);
  
  return { isError: false, content: JSON.stringify({ id: clone.id, pageId: targetPage.id }) };
}
