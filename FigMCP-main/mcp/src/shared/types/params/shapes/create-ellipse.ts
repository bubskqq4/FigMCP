import z from "zod";

export const CreateEllipseParamsSchema = z.object({
  name: z.string().describe("Name of the ellipse"),
  x: z.number().describe("X position"),
  y: z.number().describe("Y position"),
  width: z.number().describe("Width of the ellipse"),
  height: z.number().describe("Height of the ellipse"),
  parentId: z.string().optional().describe("Parent node ID to append the ellipse to"),
});

export type CreateEllipseParams = z.infer<typeof CreateEllipseParamsSchema>;
