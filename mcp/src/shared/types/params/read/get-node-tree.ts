import { z } from "zod";

export const GetNodeTreeParamsSchema = z.object({
    id: z.string().describe("Root node ID to build tree from"),
    maxDepth: z.number().optional().default(3).describe("Maximum depth to traverse"),
    includeHidden: z.boolean().optional().default(false).describe("Include hidden nodes"),
});

export type GetNodeTreeParams = z.infer<typeof GetNodeTreeParamsSchema>;
