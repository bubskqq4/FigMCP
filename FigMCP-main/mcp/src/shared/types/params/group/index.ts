import z from "zod";

// create-group
export const CreateGroupParamsSchema = z.object({
  name: z.string().default("Group").describe("Name of the group"),
  nodeIds: z.array(z.string()).min(1).describe("Array of node IDs to group"),
});
export type CreateGroupParams = z.infer<typeof CreateGroupParamsSchema>;

// ungroup
export const UngroupParamsSchema = z.object({
  nodeId: z.string().describe("ID of the group to ungroup"),
});
export type UngroupParams = z.infer<typeof UngroupParamsSchema>;

// create-component-set (from group tools)
export const GroupCreateComponentSetParamsSchema = z.object({
  name: z.string().default("Component Set").describe("Name of the component set"),
  componentIds: z.array(z.string()).min(1).describe("Array of component IDs to combine into a set"),
});
export type GroupCreateComponentSetParams = z.infer<typeof GroupCreateComponentSetParamsSchema>;

// create-variant
export const CreateVariantParamsSchema = z.object({
  componentSetId: z.string().describe("ID of the component set to add variant to"),
  sourceComponentId: z.string().describe("ID of a component to duplicate as a variant"),
  variantProperties: z.record(z.string()).optional().describe("Variant property values (e.g., { 'Size': 'Large', 'State': 'Hover' })"),
});
export type CreateVariantParams = z.infer<typeof CreateVariantParamsSchema>;

// frame-selection
export const FrameSelectionParamsSchema = z.object({
  name: z.string().default("Frame").describe("Name of the frame"),
  padding: z.number().default(0).describe("Padding around the selection"),
});
export type FrameSelectionParams = z.infer<typeof FrameSelectionParamsSchema>;

// wrap-in-frame
export const WrapInFrameParamsSchema = z.object({
  name: z.string().default("Frame").describe("Name of the frame"),
  nodeIds: z.array(z.string()).min(1).describe("Array of node IDs to wrap"),
  padding: z.number().default(0).describe("Padding around the nodes"),
});
export type WrapInFrameParams = z.infer<typeof WrapInFrameParamsSchema>;

// wrap-in-group
export const WrapInGroupParamsSchema = z.object({
  name: z.string().default("Group").describe("Name of the group"),
  nodeIds: z.array(z.string()).min(1).describe("Array of node IDs to wrap"),
});
export type WrapInGroupParams = z.infer<typeof WrapInGroupParamsSchema>;

// extract-from-parent
export const ExtractFromParentParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node to extract"),
  newParentId: z.string().optional().describe("ID of the new parent (defaults to page)"),
});
export type ExtractFromParentParams = z.infer<typeof ExtractFromParentParamsSchema>;

// flatten-to-frame
export const FlattenToFrameParamsSchema = z.object({
  nodeId: z.string().describe("ID of the group or nested structure to flatten"),
  name: z.string().optional().describe("New name for the flattened frame"),
});
export type FlattenToFrameParams = z.infer<typeof FlattenToFrameParamsSchema>;

// merge-frames
export const MergeFramesParamsSchema = z.object({
  frameIds: z.array(z.string()).min(2).describe("Array of frame IDs to merge"),
  name: z.string().default("Merged Frame").describe("Name of the resulting frame"),
});
export type MergeFramesParams = z.infer<typeof MergeFramesParamsSchema>;
