import z from "zod";

export const EnableAutoLayoutParamsSchema = z.object({ nodeId: z.string(), direction: z.enum(["HORIZONTAL", "VERTICAL"]).default("VERTICAL") });
export type EnableAutoLayoutParams = z.infer<typeof EnableAutoLayoutParamsSchema>;

export const DisableAutoLayoutParamsSchema = z.object({ nodeId: z.string() });
export type DisableAutoLayoutParams = z.infer<typeof DisableAutoLayoutParamsSchema>;

export const SetLayoutDirectionParamsSchema = z.object({ nodeId: z.string(), direction: z.enum(["HORIZONTAL", "VERTICAL"]) });
export type SetLayoutDirectionParams = z.infer<typeof SetLayoutDirectionParamsSchema>;

export const SetLayoutWrapParamsSchema = z.object({ nodeId: z.string(), wrap: z.enum(["NO_WRAP", "WRAP"]) });
export type SetLayoutWrapParams = z.infer<typeof SetLayoutWrapParamsSchema>;

export const SetLayoutGapParamsSchema = z.object({ nodeId: z.string(), gap: z.number().min(0) });
export type SetLayoutGapParams = z.infer<typeof SetLayoutGapParamsSchema>;

export const SetLayoutPaddingAllParamsSchema = z.object({ nodeId: z.string(), padding: z.number().min(0) });
export type SetLayoutPaddingAllParams = z.infer<typeof SetLayoutPaddingAllParamsSchema>;

export const SetLayoutPaddingIndividualParamsSchema = z.object({ nodeId: z.string(), top: z.number().min(0).optional(), right: z.number().min(0).optional(), bottom: z.number().min(0).optional(), left: z.number().min(0).optional() });
export type SetLayoutPaddingIndividualParams = z.infer<typeof SetLayoutPaddingIndividualParamsSchema>;

export const SetLayoutAlignItemsParamsSchema = z.object({ nodeId: z.string(), align: z.enum(["MIN", "CENTER", "MAX", "BASELINE"]) });
export type SetLayoutAlignItemsParams = z.infer<typeof SetLayoutAlignItemsParamsSchema>;

export const SetLayoutJustifyContentParamsSchema = z.object({ nodeId: z.string(), justify: z.enum(["MIN", "CENTER", "MAX", "SPACE_BETWEEN"]) });
export type SetLayoutJustifyContentParams = z.infer<typeof SetLayoutJustifyContentParamsSchema>;

export const SetLayoutSizingParamsSchema = z.object({ nodeId: z.string(), horizontal: z.enum(["FIXED", "HUG", "FILL"]).optional(), vertical: z.enum(["FIXED", "HUG", "FILL"]).optional() });
export type SetLayoutSizingParams = z.infer<typeof SetLayoutSizingParamsSchema>;

export const SetChildPositioningParamsSchema = z.object({ nodeId: z.string(), childId: z.string(), positioning: z.enum(["AUTO", "ABSOLUTE"]) });
export type SetChildPositioningParams = z.infer<typeof SetChildPositioningParamsSchema>;

export const SetLayoutModeParamsSchema = z.object({ nodeId: z.string(), mode: z.enum(["NONE", "HORIZONTAL", "VERTICAL"]) });
export type SetLayoutModeParams = z.infer<typeof SetLayoutModeParamsSchema>;

export const SetCounterAxisSizingParamsSchema = z.object({ nodeId: z.string(), sizing: z.enum(["FIXED", "AUTO"]) });
export type SetCounterAxisSizingParams = z.infer<typeof SetCounterAxisSizingParamsSchema>;

export const SetPrimaryAxisSizingParamsSchema = z.object({ nodeId: z.string(), sizing: z.enum(["FIXED", "AUTO"]) });
export type SetPrimaryAxisSizingParams = z.infer<typeof SetPrimaryAxisSizingParamsSchema>;

export const ReorderChildParamsSchema = z.object({ nodeId: z.string(), childId: z.string(), index: z.number().min(0) });
export type ReorderChildParams = z.infer<typeof ReorderChildParamsSchema>;
