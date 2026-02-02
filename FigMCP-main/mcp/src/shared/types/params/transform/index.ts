import z from "zod";

export const ScaleNodeParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  scaleX: z.number().default(1).describe("Horizontal scale factor"),
  scaleY: z.number().default(1).describe("Vertical scale factor"),
});
export type ScaleNodeParams = z.infer<typeof ScaleNodeParamsSchema>;

export const SetRotationParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  rotation: z.number().describe("Rotation angle in degrees"),
});
export type SetRotationParams = z.infer<typeof SetRotationParamsSchema>;

export const RotateByParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  degrees: z.number().describe("Degrees to rotate by"),
});
export type RotateByParams = z.infer<typeof RotateByParamsSchema>;

export const ResetRotationParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
});
export type ResetRotationParams = z.infer<typeof ResetRotationParamsSchema>;

export const SetWidthParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  width: z.number().min(0.01).describe("New width"),
});
export type SetWidthParams = z.infer<typeof SetWidthParamsSchema>;

export const SetHeightParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  height: z.number().min(0.01).describe("New height"),
});
export type SetHeightParams = z.infer<typeof SetHeightParamsSchema>;

export const FitToContentParamsSchema = z.object({
  nodeId: z.string().describe("ID of the frame to fit"),
});
export type FitToContentParams = z.infer<typeof FitToContentParamsSchema>;

export const MatchWidthParamsSchema = z.object({
  sourceNodeId: z.string().describe("ID of node to match width from"),
  targetNodeIds: z.array(z.string()).describe("IDs of nodes to resize"),
});
export type MatchWidthParams = z.infer<typeof MatchWidthParamsSchema>;

export const MatchHeightParamsSchema = z.object({
  sourceNodeId: z.string().describe("ID of node to match height from"),
  targetNodeIds: z.array(z.string()).describe("IDs of nodes to resize"),
});
export type MatchHeightParams = z.infer<typeof MatchHeightParamsSchema>;

export const MatchSizeParamsSchema = z.object({
  sourceNodeId: z.string().describe("ID of node to match size from"),
  targetNodeIds: z.array(z.string()).describe("IDs of nodes to resize"),
});
export type MatchSizeParams = z.infer<typeof MatchSizeParamsSchema>;

export const FlipHorizontalParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node to flip"),
});
export type FlipHorizontalParams = z.infer<typeof FlipHorizontalParamsSchema>;

export const FlipVerticalParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node to flip"),
});
export type FlipVerticalParams = z.infer<typeof FlipVerticalParamsSchema>;
