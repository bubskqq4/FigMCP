import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import * as R from "../../shared/types/params/rest-api/index.js";
import { getToken } from "../token-mgmt/index.js";

// Helper to make authenticated Figma API calls
async function figmaApi(endpoint: string, token: string | null): Promise<any> {
  if (!token) {
    return { error: "No API token configured. Use request-api-token first." };
  }
  
  try {
    const response = await fetch(`https://api.figma.com/v1${endpoint}`, {
      headers: { "X-Figma-Token": token }
    });
    if (!response.ok) {
      return { error: `Figma API error: ${response.status} ${response.statusText}` };
    }
    return await response.json();
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export function registerRestApiTools(server: McpServer, taskManager: TaskManager) {
  // File Access Tools
  server.tool("get-figma-file", "Get Figma file data via REST API.", R.GetFigmaFileParamsSchema.shape,
    async (p: R.GetFigmaFileParams) => {
      let url = `/files/${p.fileKey}`;
      if (p.nodeIds) url += `?ids=${p.nodeIds.join(",")}`;
      if (p.depth) url += `${p.nodeIds ? "&" : "?"}depth=${p.depth}`;
      const data = await figmaApi(url, getToken());
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });

  server.tool("get-figma-nodes", "Get specific nodes from a Figma file.", R.GetFigmaNodesParamsSchema.shape,
    async (p: R.GetFigmaNodesParams) => {
      const data = await figmaApi(`/files/${p.fileKey}/nodes?ids=${p.nodeIds.join(",")}`, getToken());
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });

  server.tool("get-file-versions", "Get version history of a file.", R.GetFileVersionsParamsSchema.shape,
    async (p: R.GetFileVersionsParams) => {
      const data = await figmaApi(`/files/${p.fileKey}/versions`, getToken());
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });

  server.tool("get-file-comments", "Get comments on a file.", R.GetFileCommentsParamsSchema.shape,
    async (p: R.GetFileCommentsParams) => {
      const data = await figmaApi(`/files/${p.fileKey}/comments`, getToken());
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });

  // Image Export Tools
  server.tool("download-images", "Get image URLs for nodes.", R.DownloadImagesParamsSchema.shape,
    async (p: R.DownloadImagesParams) => {
      const format = p.format || "png";
      const scale = p.scale || 1;
      const data = await figmaApi(`/images/${p.fileKey}?ids=${p.nodeIds.join(",")}&format=${format}&scale=${scale}`, getToken());
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });

  server.tool("get-image-fills", "Get URLs for image fills in file.", R.GetImageFillsParamsSchema.shape,
    async (p: R.GetImageFillsParams) => {
      const data = await figmaApi(`/files/${p.fileKey}/images`, getToken());
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });

  // Component Library Tools
  server.tool("get-team-components", "Get team component library.", R.GetTeamComponentsParamsSchema.shape,
    async (p: R.GetTeamComponentsParams) => {
      const data = await figmaApi(`/teams/${p.teamId}/components`, getToken());
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });

  server.tool("get-file-components", "Get components from a file.", R.GetFileComponentsParamsSchema.shape,
    async (p: R.GetFileComponentsParams) => {
      const data = await figmaApi(`/files/${p.fileKey}/components`, getToken());
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });

  server.tool("get-team-styles", "Get team style library.", R.GetTeamStylesParamsSchema.shape,
    async (p: R.GetTeamStylesParams) => {
      const data = await figmaApi(`/teams/${p.teamId}/styles`, getToken());
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });

  server.tool("get-file-styles", "Get styles from a file.", R.GetFileStylesParamsSchema.shape,
    async (p: R.GetFileStylesParams) => {
      const data = await figmaApi(`/files/${p.fileKey}/styles`, getToken());
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });

  // Project/Team Tools
  server.tool("get-team-projects", "Get projects in a team.", R.GetTeamProjectsParamsSchema.shape,
    async (p: R.GetTeamProjectsParams) => {
      const data = await figmaApi(`/teams/${p.teamId}/projects`, getToken());
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });

  server.tool("get-project-files", "Get files in a project.", R.GetProjectFilesParamsSchema.shape,
    async (p: R.GetProjectFilesParams) => {
      const data = await figmaApi(`/projects/${p.projectId}/files`, getToken());
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });

  // Dev Resources
  server.tool("get-dev-resources", "Get developer resources for a node.", R.GetDevResourcesParamsSchema.shape,
    async (p: R.GetDevResourcesParams) => {
      const data = await figmaApi(`/files/${p.fileKey}/dev_resources?node_id=${p.nodeId}`, getToken());
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });

  // Variables (REST API)
  server.tool("get-file-variables-rest", "Get file variables via REST API.", R.GetFileVariablesParamsSchema.shape,
    async (p: R.GetFileVariablesParams) => {
      const data = await figmaApi(`/files/${p.fileKey}/variables/local`, getToken());
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });

  server.tool("get-variable-modes-rest", "Get variable modes via REST API.", R.GetVariableModesParamsSchema.shape,
    async (p: R.GetVariableModesParams) => {
      const data = await figmaApi(`/files/${p.fileKey}/variables/published`, getToken());
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });

  // Design Extractors (these simplify raw Figma data)
  server.tool("extract-simplified-design", "Extract simplified design data from a node.", R.ExtractSimplifiedDesignParamsSchema.shape,
    async (p: R.ExtractSimplifiedDesignParams) => {
      const data = await figmaApi(`/files/${p.fileKey}/nodes?ids=${p.nodeId}`, getToken());
      if (data.error) return { content: [{ type: "text", text: JSON.stringify(data) }] };
      // Simplify the response
      const nodes = data.nodes || {};
      const node = nodes[p.nodeId]?.document;
      if (!node) return { content: [{ type: "text", text: JSON.stringify({ error: "Node not found" }) }] };
      const simplified = {
        id: node.id,
        name: node.name,
        type: node.type,
        size: { width: node.absoluteBoundingBox?.width, height: node.absoluteBoundingBox?.height },
        position: { x: node.absoluteBoundingBox?.x, y: node.absoluteBoundingBox?.y },
        fills: node.fills,
        strokes: node.strokes,
        effects: node.effects,
        children: node.children?.length || 0,
      };
      return { content: [{ type: "text", text: JSON.stringify(simplified) }] };
    });

  server.tool("extract-layout-structure", "Extract layout structure from a frame.", R.ExtractLayoutStructureParamsSchema.shape,
    async (p: R.ExtractLayoutStructureParams) => {
      const data = await figmaApi(`/files/${p.fileKey}/nodes?ids=${p.nodeId}`, getToken());
      if (data.error) return { content: [{ type: "text", text: JSON.stringify(data) }] };
      const node = data.nodes?.[p.nodeId]?.document;
      if (!node) return { content: [{ type: "text", text: JSON.stringify({ error: "Node not found" }) }] };
      const layout = {
        layoutMode: node.layoutMode,
        primaryAxisSizingMode: node.primaryAxisSizingMode,
        counterAxisSizingMode: node.counterAxisSizingMode,
        paddingTop: node.paddingTop,
        paddingRight: node.paddingRight,
        paddingBottom: node.paddingBottom,
        paddingLeft: node.paddingLeft,
        itemSpacing: node.itemSpacing,
        primaryAxisAlignItems: node.primaryAxisAlignItems,
        counterAxisAlignItems: node.counterAxisAlignItems,
      };
      return { content: [{ type: "text", text: JSON.stringify(layout) }] };
    });

  server.tool("extract-styles-from-node", "Extract style information from a node.", R.ExtractStylesFromNodeParamsSchema.shape,
    async (p: R.ExtractStylesFromNodeParams) => {
      const data = await figmaApi(`/files/${p.fileKey}/nodes?ids=${p.nodeId}`, getToken());
      if (data.error) return { content: [{ type: "text", text: JSON.stringify(data) }] };
      const node = data.nodes?.[p.nodeId]?.document;
      if (!node) return { content: [{ type: "text", text: JSON.stringify({ error: "Node not found" }) }] };
      const styles = {
        fills: node.fills,
        strokes: node.strokes,
        strokeWeight: node.strokeWeight,
        effects: node.effects,
        cornerRadius: node.cornerRadius,
        opacity: node.opacity,
      };
      return { content: [{ type: "text", text: JSON.stringify(styles) }] };
    });

  server.tool("extract-text-content", "Extract all text content from a node tree.", R.ExtractTextContentParamsSchema.shape,
    async (p: R.ExtractTextContentParams) => {
      const data = await figmaApi(`/files/${p.fileKey}/nodes?ids=${p.nodeId}&depth=100`, getToken());
      if (data.error) return { content: [{ type: "text", text: JSON.stringify(data) }] };
      const texts: Array<{ id: string; name: string; characters: string }> = [];
      function findText(node: any) {
        if (node.type === "TEXT") {
          texts.push({ id: node.id, name: node.name, characters: node.characters });
        }
        if (node.children) node.children.forEach(findText);
      }
      const root = data.nodes?.[p.nodeId]?.document;
      if (root) findText(root);
      return { content: [{ type: "text", text: JSON.stringify(texts) }] };
    });

  server.tool("extract-assets", "Extract asset references (images, etc) from a node.", R.ExtractAssetsParamsSchema.shape,
    async (p: R.ExtractAssetsParams) => {
      const data = await figmaApi(`/files/${p.fileKey}/nodes?ids=${p.nodeId}&depth=100`, getToken());
      if (data.error) return { content: [{ type: "text", text: JSON.stringify(data) }] };
      const assets: Array<{ type: string; ref: string }> = [];
      function findAssets(node: any) {
        if (node.fills) {
          node.fills.forEach((fill: any) => {
            if (fill.type === "IMAGE" && fill.imageRef) {
              assets.push({ type: "image", ref: fill.imageRef });
            }
          });
        }
        if (node.children) node.children.forEach(findAssets);
      }
      const root = data.nodes?.[p.nodeId]?.document;
      if (root) findAssets(root);
      return { content: [{ type: "text", text: JSON.stringify(assets) }] };
    });

  // Webhooks
  server.tool("get-webhooks", "Get webhooks for a team.", R.GetWebhooksParamsSchema.shape,
    async (p: R.GetWebhooksParams) => {
      const data = await figmaApi(`/webhooks?team_id=${p.teamId}`, getToken());
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    });

  server.tool("create-webhook", "Create a webhook for a team.", R.CreateWebhookParamsSchema.shape,
    async (p: R.CreateWebhookParams) => {
      // Note: This would need to be a POST request, simplified for demo
      return { content: [{ type: "text", text: JSON.stringify({ message: "Webhook creation requires POST - use Figma's webhook API directly" }) }] };
    });
}
