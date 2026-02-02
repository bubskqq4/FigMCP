import z from "zod";

export const SetTextFromFileParamsSchema = z.object({ nodeId: z.string(), content: z.string() });
export type SetTextFromFileParams = z.infer<typeof SetTextFromFileParamsSchema>;

export const ImportSvgParamsSchema = z.object({ svgContent: z.string(), x: z.number().default(0), y: z.number().default(0), parentId: z.string().optional() });
export type ImportSvgParams = z.infer<typeof ImportSvgParamsSchema>;

export const ImportJsonDataParamsSchema = z.object({ nodeId: z.string(), jsonData: z.string(), mappings: z.record(z.string()).optional() });
export type ImportJsonDataParams = z.infer<typeof ImportJsonDataParamsSchema>;

export const ExportToJsonParamsSchema = z.object({ nodeId: z.string(), includeChildren: z.boolean().default(true) });
export type ExportToJsonParams = z.infer<typeof ExportToJsonParamsSchema>;

export const BulkUpdateTextParamsSchema = z.object({ updates: z.array(z.object({ nodeId: z.string(), text: z.string() })) });
export type BulkUpdateTextParams = z.infer<typeof BulkUpdateTextParamsSchema>;

export const GetFileKeyParamsSchema = z.object({});
export type GetFileKeyParams = z.infer<typeof GetFileKeyParamsSchema>;

export const SetPluginDataParamsSchema = z.object({ nodeId: z.string(), key: z.string(), value: z.string() });
export type SetPluginDataParams = z.infer<typeof SetPluginDataParamsSchema>;

export const GetPluginDataParamsSchema = z.object({ nodeId: z.string(), key: z.string() });
export type GetPluginDataParams = z.infer<typeof GetPluginDataParamsSchema>;
