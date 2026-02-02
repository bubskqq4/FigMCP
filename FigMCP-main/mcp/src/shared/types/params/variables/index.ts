import z from "zod";

export const GetAllVariablesParamsSchema = z.object({});
export type GetAllVariablesParams = z.infer<typeof GetAllVariablesParamsSchema>;

export const GetVariableByIdParamsSchema = z.object({ variableId: z.string() });
export type GetVariableByIdParams = z.infer<typeof GetVariableByIdParamsSchema>;

export const GetVariableCollectionsParamsSchema = z.object({});
export type GetVariableCollectionsParams = z.infer<typeof GetVariableCollectionsParamsSchema>;

export const CreateVariableParamsSchema = z.object({ collectionId: z.string(), name: z.string(), type: z.enum(["COLOR", "FLOAT", "STRING", "BOOLEAN"]) });
export type CreateVariableParams = z.infer<typeof CreateVariableParamsSchema>;

export const SetVariableValueParamsSchema = z.object({ variableId: z.string(), modeId: z.string(), value: z.any() });
export type SetVariableValueParams = z.infer<typeof SetVariableValueParamsSchema>;

export const BindVariableToNodeParamsSchema = z.object({ nodeId: z.string(), property: z.string(), variableId: z.string() });
export type BindVariableToNodeParams = z.infer<typeof BindVariableToNodeParamsSchema>;

export const UnbindVariableFromNodeParamsSchema = z.object({ nodeId: z.string(), property: z.string() });
export type UnbindVariableFromNodeParams = z.infer<typeof UnbindVariableFromNodeParamsSchema>;

export const GetBoundVariablesParamsSchema = z.object({ nodeId: z.string() });
export type GetBoundVariablesParams = z.infer<typeof GetBoundVariablesParamsSchema>;

export const CreateVariableCollectionParamsSchema = z.object({ name: z.string() });
export type CreateVariableCollectionParams = z.infer<typeof CreateVariableCollectionParamsSchema>;

export const DeleteVariableParamsSchema = z.object({ variableId: z.string() });
export type DeleteVariableParams = z.infer<typeof DeleteVariableParamsSchema>;
