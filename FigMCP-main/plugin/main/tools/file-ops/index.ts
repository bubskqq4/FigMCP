import { ToolResult } from "../tool-result";

export interface SetTextFromFileParams { nodeId: string; content: string; }
export interface ImportSvgParams { svgContent: string; name?: string; x?: number; y?: number; }
export interface ImportJsonDataParams { nodeId: string; data: Record<string, any>; mapping?: Record<string, string>; }
export interface ExportToJsonParams { nodeId: string; }
export interface BulkUpdateTextParams { updates: Array<{ nodeId: string; content: string }>; }
export interface GetFileKeyParams { }
export interface SetPluginDataParams { nodeId: string; key: string; value: string; }
export interface GetPluginDataParams { nodeId: string; key: string; }

async function loadFontForNode(node: TextNode) {
  if (node.fontName !== figma.mixed) {
    await figma.loadFontAsync(node.fontName);
  }
}

export async function setTextFromFile(args: SetTextFromFileParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  await loadFontForNode(node as TextNode);
  (node as TextNode).characters = args.content;
  return { isError: false, content: JSON.stringify({ id: node.id, length: args.content.length }) };
}

export async function importSvg(args: ImportSvgParams): Promise<ToolResult> {
  try {
    const node = figma.createNodeFromSvg(args.svgContent);
    if (args.name) node.name = args.name;
    if (args.x !== undefined) node.x = args.x;
    if (args.y !== undefined) node.y = args.y;
    return { isError: false, content: JSON.stringify({ id: node.id, name: node.name, width: node.width, height: node.height }) };
  } catch (e) {
    return { isError: true, content: `Failed to import SVG: ${e}` };
  }
}

export async function importJsonData(args: ImportJsonDataParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  // Find text nodes and update them based on mapping
  const textNodes = (node as FrameNode).findAll ? 
    (node as FrameNode).findAll(n => n.type === "TEXT") as TextNode[] : [];
  
  let updated = 0;
  for (const textNode of textNodes) {
    const dataKey = args.mapping?.[textNode.name] || textNode.name;
    if (args.data[dataKey]) {
      await loadFontForNode(textNode);
      textNode.characters = String(args.data[dataKey]);
      updated++;
    }
  }
  
  return { isError: false, content: JSON.stringify({ updated, totalTextNodes: textNodes.length }) };
}

export async function exportToJson(args: ExportToJsonParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  function serializeNode(n: BaseNode): any {
    const base: any = { id: n.id, name: n.name, type: n.type };
    if ("x" in n) base.x = (n as SceneNode).x;
    if ("y" in n) base.y = (n as SceneNode).y;
    if ("width" in n) base.width = (n as SceneNode).width;
    if ("height" in n) base.height = (n as SceneNode).height;
    if (n.type === "TEXT") base.characters = (n as TextNode).characters;
    if ("children" in n) base.children = (n as ChildrenMixin).children.map(serializeNode);
    return base;
  }
  
  return { isError: false, content: JSON.stringify(serializeNode(node)) };
}

export async function bulkUpdateText(args: BulkUpdateTextParams): Promise<ToolResult> {
  let updated = 0;
  let errors: string[] = [];
  
  for (const update of args.updates) {
    try {
      const node = await figma.getNodeByIdAsync(update.nodeId);
      if (!node || node.type !== "TEXT") {
        errors.push(`Node ${update.nodeId} not found or not text`);
        continue;
      }
      await loadFontForNode(node as TextNode);
      (node as TextNode).characters = update.content;
      updated++;
    } catch (e) {
      errors.push(`Failed to update ${update.nodeId}: ${e}`);
    }
  }
  
  return { isError: errors.length > 0 && updated === 0, content: JSON.stringify({ updated, errors }) };
}

export async function getFileKey(_args: GetFileKeyParams): Promise<ToolResult> {
  // Figma plugin API doesn't expose file key directly, but we can get it from fileKey property
  const fileKey = figma.fileKey;
  return { isError: false, content: JSON.stringify({ fileKey }) };
}

export async function setPluginData(args: SetPluginDataParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  node.setPluginData(args.key, args.value);
  return { isError: false, content: JSON.stringify({ id: node.id, key: args.key, set: true }) };
}

export async function getPluginData(args: GetPluginDataParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  const value = node.getPluginData(args.key);
  return { isError: false, content: JSON.stringify({ id: node.id, key: args.key, value }) };
}
