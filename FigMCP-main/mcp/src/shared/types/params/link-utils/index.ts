import { z } from "zod";

export const LinkToNodeIdParamsSchema = z.object({
    link: z.string().describe("Figma link to convert to node ID (e.g., https://www.figma.com/file/xxx?node-id=123-456)"),
});

export type LinkToNodeIdParams = z.infer<typeof LinkToNodeIdParamsSchema>;
