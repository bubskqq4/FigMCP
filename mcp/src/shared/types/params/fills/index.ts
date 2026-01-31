import z from "zod";

export const SetSolidFillParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  color: z.string().describe("Hex color (e.g., #FF5500)"),
  opacity: z.number().min(0).max(1).optional().describe("Opacity (0-1)"),
});
export type SetSolidFillParams = z.infer<typeof SetSolidFillParamsSchema>;

export const SetGradientLinearParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  stops: z.array(z.object({
    position: z.number().min(0).max(1),
    color: z.string(),
  })).min(2).describe("Gradient color stops"),
  angle: z.number().default(0).describe("Gradient angle in degrees"),
});
export type SetGradientLinearParams = z.infer<typeof SetGradientLinearParamsSchema>;

export const SetGradientRadialParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  stops: z.array(z.object({
    position: z.number().min(0).max(1),
    color: z.string(),
  })).min(2).describe("Gradient color stops"),
});
export type SetGradientRadialParams = z.infer<typeof SetGradientRadialParamsSchema>;

export const SetGradientAngularParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  stops: z.array(z.object({
    position: z.number().min(0).max(1),
    color: z.string(),
  })).min(2).describe("Gradient color stops"),
});
export type SetGradientAngularParams = z.infer<typeof SetGradientAngularParamsSchema>;

export const SetGradientDiamondParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  stops: z.array(z.object({
    position: z.number().min(0).max(1),
    color: z.string(),
  })).min(2).describe("Gradient color stops"),
});
export type SetGradientDiamondParams = z.infer<typeof SetGradientDiamondParamsSchema>;

export const SetImageFillParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  imageUrl: z.string().describe("URL of the image"),
  scaleMode: z.enum(["FILL", "FIT", "CROP", "TILE"]).default("FILL").describe("Image scaling mode"),
});
export type SetImageFillParams = z.infer<typeof SetImageFillParamsSchema>;

export const AddFillParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  color: z.string().describe("Hex color"),
  opacity: z.number().min(0).max(1).optional().describe("Opacity"),
});
export type AddFillParams = z.infer<typeof AddFillParamsSchema>;

export const RemoveFillParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  index: z.number().default(0).describe("Index of fill to remove"),
});
export type RemoveFillParams = z.infer<typeof RemoveFillParamsSchema>;

export const RemoveAllFillsParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
});
export type RemoveAllFillsParams = z.infer<typeof RemoveAllFillsParamsSchema>;

export const ReorderFillsParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  fromIndex: z.number().describe("Current index"),
  toIndex: z.number().describe("New index"),
});
export type ReorderFillsParams = z.infer<typeof ReorderFillsParamsSchema>;

export const SetFillOpacityParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  index: z.number().default(0).describe("Index of fill"),
  opacity: z.number().min(0).max(1).describe("New opacity"),
});
export type SetFillOpacityParams = z.infer<typeof SetFillOpacityParamsSchema>;

export const SetFillBlendModeParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  index: z.number().default(0).describe("Index of fill"),
  blendMode: z.enum(["NORMAL", "DARKEN", "MULTIPLY", "COLOR_BURN", "LIGHTEN", "SCREEN", "COLOR_DODGE", "OVERLAY", "SOFT_LIGHT", "HARD_LIGHT", "DIFFERENCE", "EXCLUSION", "HUE", "SATURATION", "COLOR", "LUMINOSITY"]).describe("Blend mode"),
});
export type SetFillBlendModeParams = z.infer<typeof SetFillBlendModeParamsSchema>;

export const CopyFillsParamsSchema = z.object({
  sourceNodeId: z.string().describe("ID of source node"),
  targetNodeIds: z.array(z.string()).describe("IDs of target nodes"),
});
export type CopyFillsParams = z.infer<typeof CopyFillsParamsSchema>;

export const SampleColorParamsSchema = z.object({
  nodeId: z.string().describe("ID of node to sample from"),
});
export type SampleColorParams = z.infer<typeof SampleColorParamsSchema>;

export const SwapFillColorsParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  color1: z.string().describe("First color to swap"),
  color2: z.string().describe("Second color to swap"),
});
export type SwapFillColorsParams = z.infer<typeof SwapFillColorsParamsSchema>;

export const SetFrameBackgroundParamsSchema = z.object({
  nodeId: z.string().describe("ID of the frame"),
  color: z.string().describe("Background color (hex)"),
  opacity: z.number().min(0).max(1).optional().describe("Background opacity"),
});
export type SetFrameBackgroundParams = z.infer<typeof SetFrameBackgroundParamsSchema>;

export const SetVideoFillParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  videoUrl: z.string().describe("URL of the video"),
});
export type SetVideoFillParams = z.infer<typeof SetVideoFillParamsSchema>;

export const PasteFillsParamsSchema = z.object({
  sourceNodeId: z.string().describe("ID of source node"),
  targetNodeId: z.string().describe("ID of target node"),
});
export type PasteFillsParams = z.infer<typeof PasteFillsParamsSchema>;
