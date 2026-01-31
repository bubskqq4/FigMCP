import z from "zod";

export const CreateBooleanUnionParamsSchema = z.object({
  name: z.string().default("Boolean Union").describe("Name of the boolean group"),
  nodeIds: z.array(z.string()).min(2).describe("Array of node IDs to combine (minimum 2)"),
});

export type CreateBooleanUnionParams = z.infer<typeof CreateBooleanUnionParamsSchema>;
