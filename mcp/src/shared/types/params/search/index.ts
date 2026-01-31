import z from "zod";

export const FindByNameParamsSchema = z.object({ name: z.string(), exact: z.boolean().default(false) });
export type FindByNameParams = z.infer<typeof FindByNameParamsSchema>;

export const FindByTypeParamsSchema = z.object({ type: z.string() });
export type FindByTypeParams = z.infer<typeof FindByTypeParamsSchema>;

export const FindByStyleParamsSchema = z.object({ styleId: z.string() });
export type FindByStyleParams = z.infer<typeof FindByStyleParamsSchema>;

export const FindByColorParamsSchema = z.object({ color: z.string(), tolerance: z.number().default(0.1) });
export type FindByColorParams = z.infer<typeof FindByColorParamsSchema>;

export const FindByTextContentParamsSchema = z.object({ text: z.string(), caseSensitive: z.boolean().default(false) });
export type FindByTextContentParams = z.infer<typeof FindByTextContentParamsSchema>;

export const FindInstancesOfComponentParamsSchema = z.object({ componentId: z.string() });
export type FindInstancesOfComponentParams = z.infer<typeof FindInstancesOfComponentParamsSchema>;

export const FindAllWithPropertyParamsSchema = z.object({ property: z.string(), value: z.any().optional() });
export type FindAllWithPropertyParams = z.infer<typeof FindAllWithPropertyParamsSchema>;

export const FindEmptyFramesParamsSchema = z.object({});
export type FindEmptyFramesParams = z.infer<typeof FindEmptyFramesParamsSchema>;
