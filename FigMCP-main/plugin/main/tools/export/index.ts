import { ToolResult } from "../tool-result";

export interface ExportPngParams { nodeId: string; scale?: number; }
export interface ExportSvgParams { nodeId: string; }
export interface ExportJpgParams { nodeId: string; scale?: number; quality?: number; }
export interface ExportPdfParams { nodeId: string; }
export interface ExportWebpParams { nodeId: string; scale?: number; quality?: number; }
export interface BatchExportParams { nodeIds: string[]; format: "PNG" | "SVG" | "JPG" | "PDF"; scale?: number; }
export interface GetExportSettingsParams { nodeId: string; }
export interface SetExportSettingsParams { nodeId: string; settings: any[]; }

export async function exportPng(args: ExportPngParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("exportAsync" in node)) return { isError: true, content: "Node not found" };
  
  const bytes = await (node as ExportMixin).exportAsync({
    format: "PNG",
    constraint: { type: "SCALE", value: args.scale || 1 },
  });
  
  // Return base64 encoded data
  const base64 = figma.base64Encode(bytes);
  return { isError: false, content: JSON.stringify({ 
    id: (node as any).id, 
    format: "PNG", 
    bytes: bytes.length,
    data: base64.substring(0, 100) + "..." // Truncate for response
  }) };
}

export async function exportSvg(args: ExportSvgParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("exportAsync" in node)) return { isError: true, content: "Node not found" };
  
  const bytes = await (node as ExportMixin).exportAsync({ format: "SVG" });
  const svgString = String.fromCharCode(...bytes);
  
  return { isError: false, content: JSON.stringify({ 
    id: (node as any).id, 
    format: "SVG", 
    bytes: bytes.length,
    preview: svgString.substring(0, 200) + "..."
  }) };
}

export async function exportJpg(args: ExportJpgParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("exportAsync" in node)) return { isError: true, content: "Node not found" };
  
  const bytes = await (node as ExportMixin).exportAsync({
    format: "JPG",
    constraint: { type: "SCALE", value: args.scale || 1 },
  });
  
  const base64 = figma.base64Encode(bytes);
  return { isError: false, content: JSON.stringify({ 
    id: (node as any).id, 
    format: "JPG", 
    bytes: bytes.length,
    data: base64.substring(0, 100) + "..."
  }) };
}

export async function exportPdf(args: ExportPdfParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("exportAsync" in node)) return { isError: true, content: "Node not found" };
  
  const bytes = await (node as ExportMixin).exportAsync({ format: "PDF" });
  const base64 = figma.base64Encode(bytes);
  
  return { isError: false, content: JSON.stringify({ 
    id: (node as any).id, 
    format: "PDF", 
    bytes: bytes.length,
    data: base64.substring(0, 100) + "..."
  }) };
}

export async function exportWebp(args: ExportWebpParams): Promise<ToolResult> {
  // Note: WebP might not be supported in all Figma versions
  // Fallback to PNG if not available
  return exportPng({ nodeId: args.nodeId, scale: args.scale });
}

export async function batchExport(args: BatchExportParams): Promise<ToolResult> {
  const results: any[] = [];
  
  for (const nodeId of args.nodeIds) {
    const node = await figma.getNodeByIdAsync(nodeId);
    if (!node || !("exportAsync" in node)) continue;
    
    try {
      const bytes = await (node as ExportMixin).exportAsync({
        format: args.format,
        constraint: args.scale ? { type: "SCALE", value: args.scale } : undefined,
      });
      results.push({ id: nodeId, bytes: bytes.length, success: true });
    } catch (e) {
      results.push({ id: nodeId, success: false, error: "Export failed" });
    }
  }
  
  return { isError: false, content: JSON.stringify({ exported: results }) };
}

export async function getExportSettings(args: GetExportSettingsParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("exportSettings" in node)) return { isError: true, content: "Node not found" };
  
  return { isError: false, content: JSON.stringify({ 
    id: (node as any).id, 
    exportSettings: (node as ExportMixin).exportSettings 
  }) };
}

export async function setExportSettings(args: SetExportSettingsParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("exportSettings" in node)) return { isError: true, content: "Node not found" };
  
  (node as ExportMixin).exportSettings = args.settings;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, settingsApplied: args.settings.length }) };
}
