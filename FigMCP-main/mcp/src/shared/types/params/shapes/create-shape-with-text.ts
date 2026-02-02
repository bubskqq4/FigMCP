import z from "zod";

export const CreateShapeWithTextParamsSchema = z.object({
  name: z.string().describe("Name of the shape"),
  text: z.string().describe("Text content inside the shape"),
  shapeType: z.enum(["SQUARE", "ELLIPSE", "ROUNDED_RECTANGLE", "DIAMOND", "TRIANGLE_UP", "TRIANGLE_DOWN", "PARALLELOGRAM_RIGHT", "PARALLELOGRAM_LEFT"]).default("ROUNDED_RECTANGLE").describe("Type of shape"),
  x: z.number().describe("X position"),
  y: z.number().describe("Y position"),
  width: z.number().default(200).describe("Width of the shape"),
  height: z.number().default(100).describe("Height of the shape"),
  parentId: z.string().optional().describe("Parent node ID to append the shape to"),
});

export type CreateShapeWithTextParams = z.infer<typeof CreateShapeWithTextParamsSchema>;
