import z from "zod";

export const CreateSliceParamsSchema = z.object({
  name: z.string().describe("Name of the slice"),
  x: z.number().describe("X position"),
  y: z.number().describe("Y position"),
  width: z.number().describe("Width of the slice"),
  height: z.number().describe("Height of the slice"),
  parentId: z.string().optional().describe("Parent node ID to append the slice to"),
});

export type CreateSliceParams = z.infer<typeof CreateSliceParamsSchema>;
