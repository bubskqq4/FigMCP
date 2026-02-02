import z from "zod";

export const CreateBooleanSubtractParamsSchema = z.object({
  name: z.string().default("Boolean Subtract").describe("Name of the boolean group"),
  nodeIds: z.array(z.string()).min(2).describe("Array of node IDs - first is the base, rest are subtracted"),
});

export type CreateBooleanSubtractParams = z.infer<typeof CreateBooleanSubtractParamsSchema>;
