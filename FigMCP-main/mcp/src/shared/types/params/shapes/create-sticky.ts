import z from "zod";

export const CreateStickyParamsSchema = z.object({
  text: z.string().describe("Text content of the sticky note"),
  x: z.number().describe("X position"),
  y: z.number().describe("Y position"),
  authorVisible: z.boolean().default(true).describe("Whether to show the author name"),
});

export type CreateStickyParams = z.infer<typeof CreateStickyParamsSchema>;
