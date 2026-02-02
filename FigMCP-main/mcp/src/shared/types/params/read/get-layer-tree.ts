import { z } from "zod";

export const GetLayerTreeParamsSchema = z.object({
    includeHidden: z.boolean().optional().default(true).describe("Include hidden layers in the tree"),
    maxDepth: z.number().optional().describe("Maximum depth to traverse (unlimited if not specified)"),
});

export type GetLayerTreeParams = z.infer<typeof GetLayerTreeParamsSchema>;
