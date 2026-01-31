import z from "zod";

export const GenerateCssParamsSchema = z.object({ nodeId: z.string(), includeChildren: z.boolean().default(false) });
export type GenerateCssParams = z.infer<typeof GenerateCssParamsSchema>;

export const GenerateTailwindParamsSchema = z.object({ nodeId: z.string() });
export type GenerateTailwindParams = z.infer<typeof GenerateTailwindParamsSchema>;

export const GenerateReactParamsSchema = z.object({ nodeId: z.string(), componentName: z.string().optional(), styling: z.enum(["tailwind", "css", "inline"]).default("tailwind") });
export type GenerateReactParams = z.infer<typeof GenerateReactParamsSchema>;

export const ExtractLayoutCssParamsSchema = z.object({ nodeId: z.string() });
export type ExtractLayoutCssParams = z.infer<typeof ExtractLayoutCssParamsSchema>;

export const ExtractTypographyCssParamsSchema = z.object({ nodeId: z.string() });
export type ExtractTypographyCssParams = z.infer<typeof ExtractTypographyCssParamsSchema>;

export const ExtractColorPaletteParamsSchema = z.object({ nodeId: z.string().optional() });
export type ExtractColorPaletteParams = z.infer<typeof ExtractColorPaletteParamsSchema>;

export const GenerateDesignTokensParamsSchema = z.object({ format: z.enum(["json", "css", "scss"]).default("json") });
export type GenerateDesignTokensParams = z.infer<typeof GenerateDesignTokensParamsSchema>;

export const GenerateHtmlStructureParamsSchema = z.object({ nodeId: z.string() });
export type GenerateHtmlStructureParams = z.infer<typeof GenerateHtmlStructureParamsSchema>;

export const LayoutToFlexboxParamsSchema = z.object({ nodeId: z.string() });
export type LayoutToFlexboxParams = z.infer<typeof LayoutToFlexboxParamsSchema>;

export const LayoutToGridParamsSchema = z.object({ nodeId: z.string() });
export type LayoutToGridParams = z.infer<typeof LayoutToGridParamsSchema>;
