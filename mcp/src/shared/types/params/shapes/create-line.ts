import z from "zod";

export const CreateLineParamsSchema = z.object({
  name: z.string().describe("Name of the line"),
  x: z.number().describe("X position of start point"),
  y: z.number().describe("Y position of start point"),
  length: z.number().describe("Length of the line"),
  rotation: z.number().default(0).describe("Rotation angle in degrees"),
  strokeWeight: z.number().default(1).describe("Stroke weight"),
  parentId: z.string().optional().describe("Parent node ID to append the line to"),
});

export type CreateLineParams = z.infer<typeof CreateLineParamsSchema>;
