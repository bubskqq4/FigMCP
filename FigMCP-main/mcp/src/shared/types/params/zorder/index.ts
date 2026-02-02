import z from "zod";

export const BringToFrontParamsSchema = z.object({ nodeId: z.string() });
export type BringToFrontParams = z.infer<typeof BringToFrontParamsSchema>;

export const SendToBackParamsSchema = z.object({ nodeId: z.string() });
export type SendToBackParams = z.infer<typeof SendToBackParamsSchema>;

export const BringForwardParamsSchema = z.object({ nodeId: z.string() });
export type BringForwardParams = z.infer<typeof BringForwardParamsSchema>;

export const SendBackwardParamsSchema = z.object({ nodeId: z.string() });
export type SendBackwardParams = z.infer<typeof SendBackwardParamsSchema>;

export const MoveToIndexParamsSchema = z.object({ nodeId: z.string(), index: z.number().min(0) });
export type MoveToIndexParams = z.infer<typeof MoveToIndexParamsSchema>;

export const GetZIndexParamsSchema = z.object({ nodeId: z.string() });
export type GetZIndexParams = z.infer<typeof GetZIndexParamsSchema>;

export const SortChildrenByNameParamsSchema = z.object({ nodeId: z.string(), ascending: z.boolean().default(true) });
export type SortChildrenByNameParams = z.infer<typeof SortChildrenByNameParamsSchema>;

export const ReverseChildOrderParamsSchema = z.object({ nodeId: z.string() });
export type ReverseChildOrderParams = z.infer<typeof ReverseChildOrderParamsSchema>;
