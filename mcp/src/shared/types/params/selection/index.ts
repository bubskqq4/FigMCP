import z from "zod";

export const SetSelectionParamsSchema = z.object({ nodeIds: z.array(z.string()) });
export type SetSelectionParams = z.infer<typeof SetSelectionParamsSchema>;

export const AddToSelectionParamsSchema = z.object({ nodeIds: z.array(z.string()) });
export type AddToSelectionParams = z.infer<typeof AddToSelectionParamsSchema>;

export const RemoveFromSelectionParamsSchema = z.object({ nodeIds: z.array(z.string()) });
export type RemoveFromSelectionParams = z.infer<typeof RemoveFromSelectionParamsSchema>;

export const ClearSelectionParamsSchema = z.object({});
export type ClearSelectionParams = z.infer<typeof ClearSelectionParamsSchema>;

export const SelectAllOnPageParamsSchema = z.object({});
export type SelectAllOnPageParams = z.infer<typeof SelectAllOnPageParamsSchema>;

export const SelectChildrenParamsSchema = z.object({ nodeId: z.string() });
export type SelectChildrenParams = z.infer<typeof SelectChildrenParamsSchema>;

export const ZoomToSelectionParamsSchema = z.object({});
export type ZoomToSelectionParams = z.infer<typeof ZoomToSelectionParamsSchema>;

export const ZoomToNodeParamsSchema = z.object({ nodeId: z.string() });
export type ZoomToNodeParams = z.infer<typeof ZoomToNodeParamsSchema>;

export const ZoomToFitParamsSchema = z.object({});
export type ZoomToFitParams = z.infer<typeof ZoomToFitParamsSchema>;

export const ScrollIntoViewParamsSchema = z.object({ nodeId: z.string() });
export type ScrollIntoViewParams = z.infer<typeof ScrollIntoViewParamsSchema>;
