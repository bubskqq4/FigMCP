import z from "zod";

// move-by-delta
export const MoveByDeltaParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node to move"),
  deltaX: z.number().describe("X offset to move by"),
  deltaY: z.number().describe("Y offset to move by"),
});
export type MoveByDeltaParams = z.infer<typeof MoveByDeltaParamsSchema>;

// set-position
export const SetPositionParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node"),
  x: z.number().describe("New X position"),
  y: z.number().describe("New Y position"),
});
export type SetPositionParams = z.infer<typeof SetPositionParamsSchema>;

// align-left
export const AlignLeftParamsSchema = z.object({
  nodeIds: z.array(z.string()).min(2).describe("IDs of nodes to align"),
});
export type AlignLeftParams = z.infer<typeof AlignLeftParamsSchema>;

// align-right
export const AlignRightParamsSchema = z.object({
  nodeIds: z.array(z.string()).min(2).describe("IDs of nodes to align"),
});
export type AlignRightParams = z.infer<typeof AlignRightParamsSchema>;

// align-top
export const AlignTopParamsSchema = z.object({
  nodeIds: z.array(z.string()).min(2).describe("IDs of nodes to align"),
});
export type AlignTopParams = z.infer<typeof AlignTopParamsSchema>;

// align-bottom
export const AlignBottomParamsSchema = z.object({
  nodeIds: z.array(z.string()).min(2).describe("IDs of nodes to align"),
});
export type AlignBottomParams = z.infer<typeof AlignBottomParamsSchema>;

// align-center-h
export const AlignCenterHParamsSchema = z.object({
  nodeIds: z.array(z.string()).min(2).describe("IDs of nodes to center horizontally"),
});
export type AlignCenterHParams = z.infer<typeof AlignCenterHParamsSchema>;

// align-center-v
export const AlignCenterVParamsSchema = z.object({
  nodeIds: z.array(z.string()).min(2).describe("IDs of nodes to center vertically"),
});
export type AlignCenterVParams = z.infer<typeof AlignCenterVParamsSchema>;

// distribute-horizontal
export const DistributeHorizontalParamsSchema = z.object({
  nodeIds: z.array(z.string()).min(3).describe("IDs of nodes to distribute"),
});
export type DistributeHorizontalParams = z.infer<typeof DistributeHorizontalParamsSchema>;

// distribute-vertical
export const DistributeVerticalParamsSchema = z.object({
  nodeIds: z.array(z.string()).min(3).describe("IDs of nodes to distribute"),
});
export type DistributeVerticalParams = z.infer<typeof DistributeVerticalParamsSchema>;

// center-in-parent
export const CenterInParentParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node to center"),
  horizontal: z.boolean().default(true).describe("Center horizontally"),
  vertical: z.boolean().default(true).describe("Center vertically"),
});
export type CenterInParentParams = z.infer<typeof CenterInParentParamsSchema>;

// move-to-page
export const MoveToPageParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node to move"),
  pageId: z.string().describe("ID of the target page"),
});
export type MoveToPageParams = z.infer<typeof MoveToPageParamsSchema>;

// duplicate-at-offset
export const DuplicateAtOffsetParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node to duplicate"),
  offsetX: z.number().default(20).describe("X offset for the duplicate"),
  offsetY: z.number().default(20).describe("Y offset for the duplicate"),
});
export type DuplicateAtOffsetParams = z.infer<typeof DuplicateAtOffsetParamsSchema>;

// duplicate-array
export const DuplicateArrayParamsSchema = z.object({
  nodeId: z.string().describe("ID of the node to duplicate"),
  count: z.number().min(1).max(100).describe("Number of copies to create"),
  offsetX: z.number().default(50).describe("X spacing between copies"),
  offsetY: z.number().default(0).describe("Y spacing between copies"),
});
export type DuplicateArrayParams = z.infer<typeof DuplicateArrayParamsSchema>;

// swap-positions
export const SwapPositionsParamsSchema = z.object({
  nodeId1: z.string().describe("ID of the first node"),
  nodeId2: z.string().describe("ID of the second node"),
});
export type SwapPositionsParams = z.infer<typeof SwapPositionsParamsSchema>;
