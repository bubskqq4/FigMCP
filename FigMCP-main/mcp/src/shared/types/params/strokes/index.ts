import z from "zod";

export const SetStrokeWeightParamsSchema = z.object({ nodeId: z.string(), weight: z.number().min(0) });
export type SetStrokeWeightParams = z.infer<typeof SetStrokeWeightParamsSchema>;

export const SetStrokeAlignParamsSchema = z.object({ nodeId: z.string(), align: z.enum(["INSIDE", "OUTSIDE", "CENTER"]) });
export type SetStrokeAlignParams = z.infer<typeof SetStrokeAlignParamsSchema>;

export const SetStrokeCapParamsSchema = z.object({ nodeId: z.string(), cap: z.enum(["NONE", "ROUND", "SQUARE", "ARROW_LINES", "ARROW_EQUILATERAL"]) });
export type SetStrokeCapParams = z.infer<typeof SetStrokeCapParamsSchema>;

export const SetStrokeJoinParamsSchema = z.object({ nodeId: z.string(), join: z.enum(["MITER", "BEVEL", "ROUND"]) });
export type SetStrokeJoinParams = z.infer<typeof SetStrokeJoinParamsSchema>;

export const SetDashPatternParamsSchema = z.object({ nodeId: z.string(), dash: z.number(), gap: z.number() });
export type SetDashPatternParams = z.infer<typeof SetDashPatternParamsSchema>;

export const SetStrokeOpacityParamsSchema = z.object({ nodeId: z.string(), opacity: z.number().min(0).max(1), index: z.number().default(0) });
export type SetStrokeOpacityParams = z.infer<typeof SetStrokeOpacityParamsSchema>;

export const AddStrokeParamsSchema = z.object({ nodeId: z.string(), color: z.string(), weight: z.number().default(1) });
export type AddStrokeParams = z.infer<typeof AddStrokeParamsSchema>;

export const RemoveStrokeParamsSchema = z.object({ nodeId: z.string(), index: z.number().default(0) });
export type RemoveStrokeParams = z.infer<typeof RemoveStrokeParamsSchema>;

export const RemoveAllStrokesParamsSchema = z.object({ nodeId: z.string() });
export type RemoveAllStrokesParams = z.infer<typeof RemoveAllStrokesParamsSchema>;

export const SetIndividualStrokesParamsSchema = z.object({ nodeId: z.string(), top: z.number().optional(), right: z.number().optional(), bottom: z.number().optional(), left: z.number().optional() });
export type SetIndividualStrokesParams = z.infer<typeof SetIndividualStrokesParamsSchema>;

export const OutlineStrokeParamsSchema = z.object({ nodeId: z.string() });
export type OutlineStrokeParams = z.infer<typeof OutlineStrokeParamsSchema>;

export const CopyStrokesParamsSchema = z.object({ sourceNodeId: z.string(), targetNodeIds: z.array(z.string()) });
export type CopyStrokesParams = z.infer<typeof CopyStrokesParamsSchema>;
