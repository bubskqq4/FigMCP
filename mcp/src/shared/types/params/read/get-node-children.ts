import { z } from "zod";

export const GetNodeChildrenParamsSchema = z.object({
    id: z.string().describe("Node ID to get children from"),
    recursive: z.boolean().optional().default(false).describe("Include all descendants recursively"),
});

export type GetNodeChildrenParams = z.infer<typeof GetNodeChildrenParamsSchema>;
