import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../task-manager.js";

/**
 * Resource definition interface
 */
export interface ResourceDefinition {
  uri: string;
  name: string;
  description: string;
  mimeType?: string;
}

/**
 * Resource with content
 */
export interface ResourceWithContent extends ResourceDefinition {
  content: string | (() => Promise<string>);
}

/**
 * Resource Registry - manages all MCP resources
 */
export class ResourceRegistry {
  private resources: Map<string, ResourceWithContent> = new Map();
  private server: McpServer;
  private taskManager: TaskManager;

  constructor(server: McpServer, taskManager: TaskManager) {
    this.server = server;
    this.taskManager = taskManager;
  }

  /**
   * Register a static resource with fixed content
   */
  registerStatic(definition: ResourceDefinition, content: string): void {
    this.resources.set(definition.uri, {
      ...definition,
      content,
    });
  }

  /**
   * Register a dynamic resource with content fetched on demand
   */
  registerDynamic(definition: ResourceDefinition, contentFn: () => Promise<string>): void {
    this.resources.set(definition.uri, {
      ...definition,
      content: contentFn,
    });
  }

  /**
   * Get all registered resources
   */
  getResources(): ResourceDefinition[] {
    return Array.from(this.resources.values()).map(({ content, ...def }) => def);
  }

  /**
   * Get resource content by URI
   */
  async getResourceContent(uri: string): Promise<string | null> {
    const resource = this.resources.get(uri);
    if (!resource) return null;

    if (typeof resource.content === 'function') {
      return await resource.content();
    }
    return resource.content;
  }

  /**
   * Initialize all resources with the MCP server
   */
  initializeWithServer(): void {
    // Register resource list handler
    this.server.resource(
      "figma-resources",
      "figma://resources",
      async () => {
        const resourceList = this.getResources();
        return {
          contents: [{
            uri: "figma://resources",
            mimeType: "application/json",
            text: JSON.stringify(resourceList, null, 2)
          }]
        };
      }
    );

    // Register individual resource handlers
    for (const [uri, resource] of this.resources) {
      this.server.resource(
        resource.name,
        uri,
        async () => {
          const content = await this.getResourceContent(uri);
          return {
            contents: [{
              uri,
              mimeType: resource.mimeType || "application/json",
              text: content || ""
            }]
          };
        }
      );
    }
  }
}

/**
 * Create and configure the resource registry
 */
export function createResourceRegistry(server: McpServer, taskManager: TaskManager): ResourceRegistry {
  return new ResourceRegistry(server, taskManager);
}
