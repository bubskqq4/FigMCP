import z from "zod";

export const SetOpacityParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  opacity: z.number().min(0).max(1).describe("Opacity value (0-1)"),
});
export type SetOpacityParams = z.infer<typeof SetOpacityParamsSchema>;

export const SetBlendModeParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  blendMode: z.enum(["PASS_THROUGH", "NORMAL", "DARKEN", "MULTIPLY", "LINEAR_BURN", "COLOR_BURN", "LIGHTEN", "SCREEN", "LINEAR_DODGE", "COLOR_DODGE", "OVERLAY", "SOFT_LIGHT", "HARD_LIGHT", "DIFFERENCE", "EXCLUSION", "HUE", "SATURATION", "COLOR", "LUMINOSITY"]).describe("Blend mode"),
});
export type SetBlendModeParams = z.infer<typeof SetBlendModeParamsSchema>;

export const HideNodeParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node to hide"),
});
export type HideNodeParams = z.infer<typeof HideNodeParamsSchema>;

export const ShowNodeParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node to show"),
});
export type ShowNodeParams = z.infer<typeof ShowNodeParamsSchema>;

export const ToggleVisibilityParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
});
export type ToggleVisibilityParams = z.infer<typeof ToggleVisibilityParamsSchema>;

export const LockNodeParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node to lock"),
});
export type LockNodeParams = z.infer<typeof LockNodeParamsSchema>;

export const UnlockNodeParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node to unlock"),
});
export type UnlockNodeParams = z.infer<typeof UnlockNodeParamsSchema>;

export const ToggleLockParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
});
export type ToggleLockParams = z.infer<typeof ToggleLockParamsSchema>;
