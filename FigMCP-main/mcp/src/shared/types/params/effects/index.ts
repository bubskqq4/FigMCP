import z from "zod";

export const AddDropShadowParamsSchema = z.object({ nodeId: z.string(), color: z.string().default("#00000040"), x: z.number().default(0), y: z.number().default(4), blur: z.number().default(8), spread: z.number().default(0) });
export type AddDropShadowParams = z.infer<typeof AddDropShadowParamsSchema>;

export const AddInnerShadowParamsSchema = z.object({ nodeId: z.string(), color: z.string().default("#00000040"), x: z.number().default(0), y: z.number().default(4), blur: z.number().default(8), spread: z.number().default(0) });
export type AddInnerShadowParams = z.infer<typeof AddInnerShadowParamsSchema>;

export const AddLayerBlurParamsSchema = z.object({ nodeId: z.string(), radius: z.number().default(10) });
export type AddLayerBlurParams = z.infer<typeof AddLayerBlurParamsSchema>;

export const AddBackgroundBlurParamsSchema = z.object({ nodeId: z.string(), radius: z.number().default(10) });
export type AddBackgroundBlurParams = z.infer<typeof AddBackgroundBlurParamsSchema>;

export const RemoveEffectParamsSchema = z.object({ nodeId: z.string(), index: z.number().default(0) });
export type RemoveEffectParams = z.infer<typeof RemoveEffectParamsSchema>;

export const RemoveAllEffectsParamsSchema = z.object({ nodeId: z.string() });
export type RemoveAllEffectsParams = z.infer<typeof RemoveAllEffectsParamsSchema>;

export const SetEffectRadiusParamsSchema = z.object({ nodeId: z.string(), index: z.number().default(0), radius: z.number() });
export type SetEffectRadiusParams = z.infer<typeof SetEffectRadiusParamsSchema>;

export const SetEffectOffsetParamsSchema = z.object({ nodeId: z.string(), index: z.number().default(0), x: z.number(), y: z.number() });
export type SetEffectOffsetParams = z.infer<typeof SetEffectOffsetParamsSchema>;

export const SetEffectSpreadParamsSchema = z.object({ nodeId: z.string(), index: z.number().default(0), spread: z.number() });
export type SetEffectSpreadParams = z.infer<typeof SetEffectSpreadParamsSchema>;

export const SetEffectColorParamsSchema = z.object({ nodeId: z.string(), index: z.number().default(0), color: z.string() });
export type SetEffectColorParams = z.infer<typeof SetEffectColorParamsSchema>;

export const CopyEffectsParamsSchema = z.object({ sourceNodeId: z.string(), targetNodeIds: z.array(z.string()) });
export type CopyEffectsParams = z.infer<typeof CopyEffectsParamsSchema>;

export const PasteEffectsParamsSchema = z.object({ sourceNodeId: z.string(), targetNodeId: z.string() });
export type PasteEffectsParams = z.infer<typeof PasteEffectsParamsSchema>;
