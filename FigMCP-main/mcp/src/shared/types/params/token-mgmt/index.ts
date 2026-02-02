import z from "zod";

export const RequestApiTokenParamsSchema = z.object({
  message: z.string().optional().describe("Optional message to show in the token input dialog"),
});
export type RequestApiTokenParams = z.infer<typeof RequestApiTokenParamsSchema>;

export const ValidateApiTokenParamsSchema = z.object({});
export type ValidateApiTokenParams = z.infer<typeof ValidateApiTokenParamsSchema>;

export const GetTokenStatusParamsSchema = z.object({});
export type GetTokenStatusParams = z.infer<typeof GetTokenStatusParamsSchema>;

export const ClearApiTokenParamsSchema = z.object({});
export type ClearApiTokenParams = z.infer<typeof ClearApiTokenParamsSchema>;

export const GetPluginSettingsParamsSchema = z.object({});
export type GetPluginSettingsParams = z.infer<typeof GetPluginSettingsParamsSchema>;
