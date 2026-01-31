import z from "zod";

export const SetAllCornersParamsSchema = z.object({ nodeId: z.string(), radius: z.number().min(0) });
export type SetAllCornersParams = z.infer<typeof SetAllCornersParamsSchema>;

export const SetIndividualCornersParamsSchema = z.object({ nodeId: z.string(), topLeft: z.number().min(0).optional(), topRight: z.number().min(0).optional(), bottomRight: z.number().min(0).optional(), bottomLeft: z.number().min(0).optional() });
export type SetIndividualCornersParams = z.infer<typeof SetIndividualCornersParamsSchema>;

export const SetCornerSmoothingParamsSchema = z.object({ nodeId: z.string(), smoothing: z.number().min(0).max(1) });
export type SetCornerSmoothingParams = z.infer<typeof SetCornerSmoothingParamsSchema>;

export const CopyCornersParamsSchema = z.object({ sourceNodeId: z.string(), targetNodeIds: z.array(z.string()) });
export type CopyCornersParams = z.infer<typeof CopyCornersParamsSchema>;

export const ResetCornersParamsSchema = z.object({ nodeId: z.string() });
export type ResetCornersParams = z.infer<typeof ResetCornersParamsSchema>;

export const SetTopCornersParamsSchema = z.object({ nodeId: z.string(), radius: z.number().min(0) });
export type SetTopCornersParams = z.infer<typeof SetTopCornersParamsSchema>;
