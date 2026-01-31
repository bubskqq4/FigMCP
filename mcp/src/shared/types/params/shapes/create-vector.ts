import z from "zod";

export const VectorPathSchema = z.object({
  x: z.number().describe("X coordinate"),
  y: z.number().describe("Y coordinate"),
});

export const CreateVectorParamsSchema = z.object({
  name: z.string().describe("Name of the vector"),
  x: z.number().describe("X position"),
  y: z.number().describe("Y position"),
  vectorPaths: z.string().describe("SVG path data string (d attribute)"),
  parentId: z.string().optional().describe("Parent node ID to append the vector to"),
});

export type CreateVectorParams = z.infer<typeof CreateVectorParamsSchema>;
