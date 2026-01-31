import z from "zod";

export const CreateBooleanExcludeParamsSchema = z.object({
  name: z.string().default("Boolean Exclude").describe("Name of the boolean group"),
  nodeIds: z.array(z.string()).min(2).describe("Array of node IDs to exclude (minimum 2)"),
});

export type CreateBooleanExcludeParams = z.infer<typeof CreateBooleanExcludeParamsSchema>;
