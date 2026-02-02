import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../task-manager.js";
import z from "zod";

/**
 * Prompt argument definition
 */
export interface PromptArgument {
  name: string;
  description: string;
  required?: boolean;
}

/**
 * Prompt definition interface
 */
export interface PromptDefinition {
  name: string;
  description: string;
  arguments?: PromptArgument[];
}

/**
 * Prompt message content
 */
export interface PromptMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Prompt handler function type
 */
export type PromptHandler = (args: Record<string, string>) => Promise<PromptMessage[]>;

/**
 * Prompt with handler
 */
export interface PromptWithHandler extends PromptDefinition {
  handler: PromptHandler;
}

/**
 * Prompt Registry - manages all MCP prompts
 */
export class PromptRegistry {
  private prompts: Map<string, PromptWithHandler> = new Map();
  private server: McpServer;
  private taskManager: TaskManager;

  constructor(server: McpServer, taskManager: TaskManager) {
    this.server = server;
    this.taskManager = taskManager;
  }

  /**
   * Register a prompt
   */
  register(definition: PromptDefinition, handler: PromptHandler): void {
    this.prompts.set(definition.name, {
      ...definition,
      handler,
    });
  }

  /**
   * Get all registered prompts
   */
  getPrompts(): PromptDefinition[] {
    return Array.from(this.prompts.values()).map(({ handler, ...def }) => def);
  }

  /**
   * Get prompt by name
   */
  getPrompt(name: string): PromptWithHandler | undefined {
    return this.prompts.get(name);
  }

  /**
   * Execute a prompt with given arguments
   */
  async executePrompt(name: string, args: Record<string, string>): Promise<PromptMessage[] | null> {
    const prompt = this.prompts.get(name);
    if (!prompt) return null;
    return await prompt.handler(args);
  }

  /**
   * Initialize all prompts with the MCP server
   */
  initializeWithServer(): void {
    // Register each prompt with the server
    for (const [name, prompt] of this.prompts) {
      // Build argument schema
      const argSchema: Record<string, z.ZodTypeAny> = {};
      if (prompt.arguments) {
        for (const arg of prompt.arguments) {
          if (arg.required) {
            argSchema[arg.name] = z.string().describe(arg.description);
          } else {
            argSchema[arg.name] = z.string().optional().describe(arg.description);
          }
        }
      }

      this.server.prompt(
        name,
        prompt.description,
        argSchema,
        async (args) => {
          const messages = await prompt.handler(args as Record<string, string>);
          return {
            messages: messages.map(msg => ({
              role: msg.role,
              content: { type: "text" as const, text: msg.content }
            }))
          };
        }
      );
    }
  }
}

/**
 * Create and configure the prompt registry
 */
export function createPromptRegistry(server: McpServer, taskManager: TaskManager): PromptRegistry {
  return new PromptRegistry(server, taskManager);
}
