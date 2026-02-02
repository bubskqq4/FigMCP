import z from "zod";

export const ExportPngParamsSchema = z.object({ nodeId: z.string(), scale: z.number().default(1) });
export type ExportPngParams = z.infer<typeof ExportPngParamsSchema>;

export const ExportSvgParamsSchema = z.object({ nodeId: z.string(), outline: z.boolean().default(false) });
export type ExportSvgParams = z.infer<typeof ExportSvgParamsSchema>;

export const ExportJpgParamsSchema = z.object({ nodeId: z.string(), scale: z.number().default(1), quality: z.number().min(0).max(100).default(80) });
export type ExportJpgParams = z.infer<typeof ExportJpgParamsSchema>;

export const ExportPdfParamsSchema = z.object({ nodeId: z.string() });
export type ExportPdfParams = z.infer<typeof ExportPdfParamsSchema>;

export const ExportWebpParamsSchema = z.object({ nodeId: z.string(), scale: z.number().default(1), quality: z.number().min(0).max(100).default(80) });
export type ExportWebpParams = z.infer<typeof ExportWebpParamsSchema>;

export const BatchExportParamsSchema = z.object({ nodeIds: z.array(z.string()), format: z.enum(["PNG", "SVG", "JPG", "PDF", "WEBP"]).default("PNG"), scale: z.number().default(1) });
export type BatchExportParams = z.infer<typeof BatchExportParamsSchema>;

export const GetExportSettingsParamsSchema = z.object({ nodeId: z.string() });
export type GetExportSettingsParams = z.infer<typeof GetExportSettingsParamsSchema>;

export const SetExportSettingsParamsSchema = z.object({ nodeId: z.string(), format: z.enum(["PNG", "SVG", "JPG", "PDF"]), scale: z.number().default(1) });
export type SetExportSettingsParams = z.infer<typeof SetExportSettingsParamsSchema>;
