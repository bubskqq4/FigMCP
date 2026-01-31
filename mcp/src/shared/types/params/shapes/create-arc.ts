import z from "zod";

export const CreateArcParamsSchema = z.object({
  name: z.string().describe("Name of the arc"),
  x: z.number().describe("X position"),
  y: z.number().describe("Y position"),
  width: z.number().describe("Width of the arc"),
  height: z.number().describe("Height of the arc"),
  startAngle: z.number().default(0).describe("Starting angle in degrees"),
  endAngle: z.number().default(270).describe("Ending angle in degrees"),
  innerRadius: z.number().min(0).max(1).default(0).describe("Inner radius ratio for donut shape (0-1)"),
  parentId: z.string().optional().describe("Parent node ID to append the arc to"),
});

export type CreateArcParams = z.infer<typeof CreateArcParamsSchema>;
