import z from "zod";

export const DuplicateNodeParamsSchema = z.object({ nodeId: z.string(), offsetX: z.number().default(10), offsetY: z.number().default(10) });
export type DuplicateNodeParams = z.infer<typeof DuplicateNodeParamsSchema>;

export const CopyPropertiesParamsSchema = z.object({ sourceNodeId: z.string(), targetNodeIds: z.array(z.string()), properties: z.array(z.enum(["fills", "strokes", "effects", "cornerRadius", "size", "opacity"])) });
export type CopyPropertiesParams = z.infer<typeof CopyPropertiesParamsSchema>;

export const GetCssParamsSchema = z.object({ nodeId: z.string() });
export type GetCssParams = z.infer<typeof GetCssParamsSchema>;

export const GetSvgCodeParamsSchema = z.object({ nodeId: z.string() });
export type GetSvgCodeParams = z.infer<typeof GetSvgCodeParamsSchema>;

export const CloneToLocationParamsSchema = z.object({ nodeId: z.string(), targetParentId: z.string(), x: z.number().optional(), y: z.number().optional() });
export type CloneToLocationParams = z.infer<typeof CloneToLocationParamsSchema>;

export const CopyNodeAcrossPagesParamsSchema = z.object({ nodeId: z.string(), targetPageId: z.string() });
export type CopyNodeAcrossPagesParams = z.infer<typeof CopyNodeAcrossPagesParamsSchema>;
