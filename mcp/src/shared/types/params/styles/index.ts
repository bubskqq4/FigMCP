import z from "zod";

export const GetAllStylesParamsSchema = z.object({});
export type GetAllStylesParams = z.infer<typeof GetAllStylesParamsSchema>;

export const GetStyleByIdParamsSchema = z.object({ styleId: z.string() });
export type GetStyleByIdParams = z.infer<typeof GetStyleByIdParamsSchema>;

export const CreateColorStyleParamsSchema = z.object({ name: z.string(), color: z.string() });
export type CreateColorStyleParams = z.infer<typeof CreateColorStyleParamsSchema>;

export const CreateTextStyleParamsSchema = z.object({ name: z.string(), fontFamily: z.string().default("Inter"), fontSize: z.number().default(16), fontWeight: z.string().default("Regular") });
export type CreateTextStyleParams = z.infer<typeof CreateTextStyleParamsSchema>;

export const CreateEffectStyleParamsSchema = z.object({ name: z.string(), effectType: z.enum(["DROP_SHADOW", "INNER_SHADOW", "LAYER_BLUR", "BACKGROUND_BLUR"]), blur: z.number().default(10), color: z.string().optional() });
export type CreateEffectStyleParams = z.infer<typeof CreateEffectStyleParamsSchema>;

export const ApplyFillStyleParamsSchema = z.object({ nodeId: z.string(), styleId: z.string() });
export type ApplyFillStyleParams = z.infer<typeof ApplyFillStyleParamsSchema>;

export const ApplyStrokeStyleParamsSchema = z.object({ nodeId: z.string(), styleId: z.string() });
export type ApplyStrokeStyleParams = z.infer<typeof ApplyStrokeStyleParamsSchema>;

export const ApplyEffectStyleParamsSchema = z.object({ nodeId: z.string(), styleId: z.string() });
export type ApplyEffectStyleParams = z.infer<typeof ApplyEffectStyleParamsSchema>;

export const ApplyGridStyleParamsSchema = z.object({ nodeId: z.string(), styleId: z.string() });
export type ApplyGridStyleParams = z.infer<typeof ApplyGridStyleParamsSchema>;

export const DeleteStyleParamsSchema = z.object({ styleId: z.string() });
export type DeleteStyleParams = z.infer<typeof DeleteStyleParamsSchema>;

export const UpdateStyleParamsSchema = z.object({ styleId: z.string(), name: z.string().optional() });
export type UpdateStyleParams = z.infer<typeof UpdateStyleParamsSchema>;

export const DetachStyleParamsSchema = z.object({ nodeId: z.string(), styleType: z.enum(["FILL", "STROKE", "TEXT", "EFFECT", "GRID"]) });
export type DetachStyleParams = z.infer<typeof DetachStyleParamsSchema>;
