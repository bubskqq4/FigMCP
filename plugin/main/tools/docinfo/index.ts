import { ToolResult } from "../tool-result";

export interface GetDocumentInfoParams { }
export interface GetCurrentUserParams { }
export interface GetViewportParams { }
export interface SetViewportParams { x: number; y: number; zoom?: number; }
export interface NotifyParams { message: string; timeout?: number; error?: boolean; }

export async function getDocumentInfo(_args: GetDocumentInfoParams): Promise<ToolResult> {
  const doc = figma.root;
  const pages = doc.children.map(page => ({
    id: page.id,
    name: page.name,
    childCount: page.children.length,
  }));
  
  return { isError: false, content: JSON.stringify({
    name: doc.name,
    pageCount: pages.length,
    pages,
    currentPageId: figma.currentPage.id,
    currentPageName: figma.currentPage.name,
  }) };
}

export async function getCurrentUser(_args: GetCurrentUserParams): Promise<ToolResult> {
  const user = figma.currentUser;
  if (!user) return { isError: false, content: JSON.stringify({ user: null }) };
  
  return { isError: false, content: JSON.stringify({
    id: user.id,
    name: user.name,
    photoUrl: user.photoUrl,
    color: user.color,
  }) };
}

export async function getViewport(_args: GetViewportParams): Promise<ToolResult> {
  const viewport = figma.viewport;
  return { isError: false, content: JSON.stringify({
    center: viewport.center,
    zoom: viewport.zoom,
    bounds: viewport.bounds,
  }) };
}

export async function setViewport(args: SetViewportParams): Promise<ToolResult> {
  figma.viewport.center = { x: args.x, y: args.y };
  if (args.zoom !== undefined) {
    figma.viewport.zoom = args.zoom;
  }
  return { isError: false, content: JSON.stringify({
    center: figma.viewport.center,
    zoom: figma.viewport.zoom,
  }) };
}

export async function notify(args: NotifyParams): Promise<ToolResult> {
  const options: NotificationOptions = {
    timeout: args.timeout || 4000,
    error: args.error || false,
  };
  
  figma.notify(args.message, options);
  return { isError: false, content: JSON.stringify({ notified: true, message: args.message }) };
}
