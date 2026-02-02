import { z } from "zod";

export const SearchNodesParamsSchema = z.object({
    query: z.string().describe("Search query (matches node names)"),
    types: z.array(z.string()).optional().describe("Filter by node types (e.g., ['FRAME', 'TEXT', 'RECTANGLE'])"),
    pageId: z.string().optional().describe("Limit search to specific page"),
    exactMatch: z.boolean().optional().default(false).describe("Require exact name match"),
});

export type SearchNodesParams = z.infer<typeof SearchNodesParamsSchema>;
