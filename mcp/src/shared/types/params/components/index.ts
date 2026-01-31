import z from "zod";

export const CreateComponentFromNodeParamsSchema = z.object({ nodeId: z.string() });
export type CreateComponentFromNodeParams = z.infer<typeof CreateComponentFromNodeParamsSchema>;

export const CreateComponentSetFromNodesParamsSchema = z.object({ nodeIds: z.array(z.string()) });
export type CreateComponentSetFromNodesParams = z.infer<typeof CreateComponentSetFromNodesParamsSchema>;

export const DetachInstanceParamsSchema = z.object({ nodeId: z.string() });
export type DetachInstanceParams = z.infer<typeof DetachInstanceParamsSchema>;

export const SwapInstanceParamsSchema = z.object({ nodeId: z.string(), componentKey: z.string() });
export type SwapInstanceParams = z.infer<typeof SwapInstanceParamsSchema>;

export const ResetInstanceParamsSchema = z.object({ nodeId: z.string() });
export type ResetInstanceParams = z.infer<typeof ResetInstanceParamsSchema>;

export const GetMainComponentParamsSchema = z.object({ nodeId: z.string() });
export type GetMainComponentParams = z.infer<typeof GetMainComponentParamsSchema>;

export const GetAllDocumentComponentsParamsSchema = z.object({});
export type GetAllDocumentComponentsParams = z.infer<typeof GetAllDocumentComponentsParamsSchema>;

export const GetComponentOverridesParamsSchema = z.object({ nodeId: z.string() });
export type GetComponentOverridesParams = z.infer<typeof GetComponentOverridesParamsSchema>;

export const SetOverrideParamsSchema = z.object({ nodeId: z.string(), property: z.string(), value: z.any() });
export type SetOverrideParams = z.infer<typeof SetOverrideParamsSchema>;

export const PublishComponentParamsSchema = z.object({ nodeId: z.string() });
export type PublishComponentParams = z.infer<typeof PublishComponentParamsSchema>;

export const CreateInstanceFromKeyParamsSchema = z.object({ componentKey: z.string(), x: z.number(), y: z.number() });
export type CreateInstanceFromKeyParams = z.infer<typeof CreateInstanceFromKeyParamsSchema>;

export const SetVariantPropertyParamsSchema = z.object({ nodeId: z.string(), property: z.string(), value: z.string() });
export type SetVariantPropertyParams = z.infer<typeof SetVariantPropertyParamsSchema>;
