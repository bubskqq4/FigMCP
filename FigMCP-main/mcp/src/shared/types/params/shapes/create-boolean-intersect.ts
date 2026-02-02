import z from "zod";

export const CreateBooleanIntersectParamsSchema = z.object({
  name: z.string().default("Boolean Intersect").describe("Name of the boolean group"),
  nodeIds: z.array(z.string()).min(2).describe("Array of node IDs to intersect (minimum 2)"),
});

export type CreateBooleanIntersectParams = z.infer<typeof CreateBooleanIntersectParamsSchema>;
