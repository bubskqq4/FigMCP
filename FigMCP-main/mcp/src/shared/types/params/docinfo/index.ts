import z from "zod";

export const GetDocumentInfoParamsSchema = z.object({});
export type GetDocumentInfoParams = z.infer<typeof GetDocumentInfoParamsSchema>;

export const GetCurrentUserParamsSchema = z.object({});
export type GetCurrentUserParams = z.infer<typeof GetCurrentUserParamsSchema>;

export const GetViewportParamsSchema = z.object({});
export type GetViewportParams = z.infer<typeof GetViewportParamsSchema>;

export const SetViewportParamsSchema = z.object({ x: z.number(), y: z.number(), zoom: z.number().min(0.01).max(256) });
export type SetViewportParams = z.infer<typeof SetViewportParamsSchema>;

export const NotifyParamsSchema = z.object({ message: z.string(), timeout: z.number().default(3000), error: z.boolean().default(false) });
export type NotifyParams = z.infer<typeof NotifyParamsSchema>;
