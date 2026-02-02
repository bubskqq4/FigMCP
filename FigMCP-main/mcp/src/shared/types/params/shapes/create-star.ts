import z from "zod";

export const CreateStarParamsSchema = z.object({
  name: z.string().describe("Name of the star"),
  x: z.number().describe("X position"),
  y: z.number().describe("Y position"),
  width: z.number().describe("Width of the star"),
  height: z.number().describe("Height of the star"),
  pointCount: z.number().min(3).max(100).default(5).describe("Number of points (3-100)"),
  innerRadius: z.number().min(0).max(1).default(0.382).describe("Inner radius ratio (0-1)"),
  parentId: z.string().optional().describe("Parent node ID to append the star to"),
});

export type CreateStarParams = z.infer<typeof CreateStarParamsSchema>;
