import z from "zod";

export const SetHorizontalConstraintParamsSchema = z.object({ nodeId: z.string(), constraint: z.enum(["MIN", "CENTER", "MAX", "STRETCH", "SCALE"]) });
export type SetHorizontalConstraintParams = z.infer<typeof SetHorizontalConstraintParamsSchema>;

export const SetVerticalConstraintParamsSchema = z.object({ nodeId: z.string(), constraint: z.enum(["MIN", "CENTER", "MAX", "STRETCH", "SCALE"]) });
export type SetVerticalConstraintParams = z.infer<typeof SetVerticalConstraintParamsSchema>;

export const SetConstraintsParamsSchema = z.object({ nodeId: z.string(), horizontal: z.enum(["MIN", "CENTER", "MAX", "STRETCH", "SCALE"]), vertical: z.enum(["MIN", "CENTER", "MAX", "STRETCH", "SCALE"]) });
export type SetConstraintsParams = z.infer<typeof SetConstraintsParamsSchema>;

export const ResetConstraintsParamsSchema = z.object({ nodeId: z.string() });
export type ResetConstraintsParams = z.infer<typeof ResetConstraintsParamsSchema>;

export const SetConstraintProportionsParamsSchema = z.object({ nodeId: z.string(), locked: z.boolean() });
export type SetConstraintProportionsParams = z.infer<typeof SetConstraintProportionsParamsSchema>;

export const GetConstraintsParamsSchema = z.object({ nodeId: z.string() });
export type GetConstraintsParams = z.infer<typeof GetConstraintsParamsSchema>;
