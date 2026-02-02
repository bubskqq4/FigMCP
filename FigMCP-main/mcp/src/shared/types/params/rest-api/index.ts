import z from "zod";

// File Access Tools
export const GetFigmaFileParamsSchema = z.object({ fileKey: z.string(), nodeIds: z.array(z.string()).optional(), depth: z.number().optional() });
export type GetFigmaFileParams = z.infer<typeof GetFigmaFileParamsSchema>;

export const GetFigmaNodesParamsSchema = z.object({ fileKey: z.string(), nodeIds: z.array(z.string()) });
export type GetFigmaNodesParams = z.infer<typeof GetFigmaNodesParamsSchema>;

export const GetFileVersionsParamsSchema = z.object({ fileKey: z.string() });
export type GetFileVersionsParams = z.infer<typeof GetFileVersionsParamsSchema>;

export const GetFileCommentsParamsSchema = z.object({ fileKey: z.string() });
export type GetFileCommentsParams = z.infer<typeof GetFileCommentsParamsSchema>;

// Image Export Tools
export const DownloadImagesParamsSchema = z.object({ fileKey: z.string(), nodeIds: z.array(z.string()), format: z.enum(["png", "svg", "jpg", "pdf"]).default("png"), scale: z.number().default(1) });
export type DownloadImagesParams = z.infer<typeof DownloadImagesParamsSchema>;

export const GetImageFillsParamsSchema = z.object({ fileKey: z.string() });
export type GetImageFillsParams = z.infer<typeof GetImageFillsParamsSchema>;

// Component Library Tools
export const GetTeamComponentsParamsSchema = z.object({ teamId: z.string() });
export type GetTeamComponentsParams = z.infer<typeof GetTeamComponentsParamsSchema>;

export const GetFileComponentsParamsSchema = z.object({ fileKey: z.string() });
export type GetFileComponentsParams = z.infer<typeof GetFileComponentsParamsSchema>;

export const GetTeamStylesParamsSchema = z.object({ teamId: z.string() });
export type GetTeamStylesParams = z.infer<typeof GetTeamStylesParamsSchema>;

export const GetFileStylesParamsSchema = z.object({ fileKey: z.string() });
export type GetFileStylesParams = z.infer<typeof GetFileStylesParamsSchema>;

// Project/Team Tools
export const GetTeamProjectsParamsSchema = z.object({ teamId: z.string() });
export type GetTeamProjectsParams = z.infer<typeof GetTeamProjectsParamsSchema>;

export const GetProjectFilesParamsSchema = z.object({ projectId: z.string() });
export type GetProjectFilesParams = z.infer<typeof GetProjectFilesParamsSchema>;

// Dev Resources
export const GetDevResourcesParamsSchema = z.object({ fileKey: z.string(), nodeId: z.string() });
export type GetDevResourcesParams = z.infer<typeof GetDevResourcesParamsSchema>;

// Design Extractor Tools
export const ExtractSimplifiedDesignParamsSchema = z.object({ fileKey: z.string(), nodeId: z.string() });
export type ExtractSimplifiedDesignParams = z.infer<typeof ExtractSimplifiedDesignParamsSchema>;

export const ExtractLayoutStructureParamsSchema = z.object({ fileKey: z.string(), nodeId: z.string() });
export type ExtractLayoutStructureParams = z.infer<typeof ExtractLayoutStructureParamsSchema>;

export const ExtractStylesFromNodeParamsSchema = z.object({ fileKey: z.string(), nodeId: z.string() });
export type ExtractStylesFromNodeParams = z.infer<typeof ExtractStylesFromNodeParamsSchema>;

export const ExtractTextContentParamsSchema = z.object({ fileKey: z.string(), nodeId: z.string() });
export type ExtractTextContentParams = z.infer<typeof ExtractTextContentParamsSchema>;

export const ExtractAssetsParamsSchema = z.object({ fileKey: z.string(), nodeId: z.string() });
export type ExtractAssetsParams = z.infer<typeof ExtractAssetsParamsSchema>;

// Variables (REST API)
export const GetFileVariablesParamsSchema = z.object({ fileKey: z.string() });
export type GetFileVariablesParams = z.infer<typeof GetFileVariablesParamsSchema>;

export const GetVariableModesParamsSchema = z.object({ fileKey: z.string() });
export type GetVariableModesParams = z.infer<typeof GetVariableModesParamsSchema>;

// Webhooks
export const GetWebhooksParamsSchema = z.object({ teamId: z.string() });
export type GetWebhooksParams = z.infer<typeof GetWebhooksParamsSchema>;

export const CreateWebhookParamsSchema = z.object({ teamId: z.string(), event: z.string(), endpoint: z.string() });
export type CreateWebhookParams = z.infer<typeof CreateWebhookParamsSchema>;
