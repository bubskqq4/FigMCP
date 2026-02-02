import { ToolResult } from "../tool-result";

export interface GetDocumentPagesParams { }
export interface CreatePageParams { name?: string; }
export interface DeletePageParams { pageId: string; }
export interface RenamePageParams { pageId: string; name: string; }
export interface DuplicatePageParams { pageId: string; }
export interface SetCurrentPageParams { pageId: string; }

export async function getDocumentPages(_args: GetDocumentPagesParams): Promise<ToolResult> {
  const pages = figma.root.children.map(page => ({
    id: page.id,
    name: page.name,
  }));
  return { isError: false, content: JSON.stringify({ pages, currentPageId: figma.currentPage.id }) };
}

export async function createPage(args: CreatePageParams): Promise<ToolResult> {
  const page = figma.createPage();
  if (args.name) page.name = args.name;
  return { isError: false, content: JSON.stringify({ id: page.id, name: page.name }) };
}

export async function deletePage(args: DeletePageParams): Promise<ToolResult> {
  const page = figma.root.children.find(p => p.id === args.pageId);
  if (!page) return { isError: true, content: "Page not found" };
  if (figma.root.children.length <= 1) return { isError: true, content: "Cannot delete the only page" };
  page.remove();
  return { isError: false, content: JSON.stringify({ deleted: args.pageId }) };
}

export async function renamePage(args: RenamePageParams): Promise<ToolResult> {
  const page = figma.root.children.find(p => p.id === args.pageId);
  if (!page) return { isError: true, content: "Page not found" };
  page.name = args.name;
  return { isError: false, content: JSON.stringify({ id: page.id, name: page.name }) };
}

export async function duplicatePage(args: DuplicatePageParams): Promise<ToolResult> {
  const page = figma.root.children.find(p => p.id === args.pageId);
  if (!page) return { isError: true, content: "Page not found" };
  const newPage = page.clone();
  return { isError: false, content: JSON.stringify({ id: newPage.id, name: newPage.name }) };
}

export async function setCurrentPage(args: SetCurrentPageParams): Promise<ToolResult> {
  const page = figma.root.children.find(p => p.id === args.pageId);
  if (!page) return { isError: true, content: "Page not found" };
  figma.currentPage = page;
  return { isError: false, content: JSON.stringify({ currentPageId: page.id, name: page.name }) };
}
