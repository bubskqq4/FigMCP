import z from "zod";

export const CreatePolygonParamsSchema = z.object({
  name: z.string().describe("Name of the polygon"),
  x: z.number().describe("X position"),
  y: z.number().describe("Y position"),
  width: z.number().describe("Width of the polygon"),
  height: z.number().describe("Height of the polygon"),
  pointCount: z.number().min(3).max(100).default(6).describe("Number of sides/points (3-100)"),
  parentId: z.string().optional().describe("Parent node ID to append the polygon to"),
});

export type CreatePolygonParams = z.infer<typeof CreatePolygonParamsSchema>;
