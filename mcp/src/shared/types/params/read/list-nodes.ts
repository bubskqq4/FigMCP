import { z } from "zod";

export const ListNodesParamsSchema = z.object({
    parentId: z.string().optional().describe("Parent node ID. If not provided, lists nodes in the current page"),
    types: z.array(z.string()).optional().describe("Filter by node types (e.g., ['FRAME', 'TEXT', 'RECTANGLE'])"),
    maxDepth: z.number().optional().default(1).describe("Maximum depth to traverse (1 = direct children only)"),
});

export type ListNodesParams = z.infer<typeof ListNodesParamsSchema>;
