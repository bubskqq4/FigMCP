import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import {
  MoveByDeltaParamsSchema, type MoveByDeltaParams,
  SetPositionParamsSchema, type SetPositionParams,
  AlignLeftParamsSchema, type AlignLeftParams,
  AlignRightParamsSchema, type AlignRightParams,
  AlignTopParamsSchema, type AlignTopParams,
  AlignBottomParamsSchema, type AlignBottomParams,
  AlignCenterHParamsSchema, type AlignCenterHParams,
  AlignCenterVParamsSchema, type AlignCenterVParams,
  DistributeHorizontalParamsSchema, type DistributeHorizontalParams,
  DistributeVerticalParamsSchema, type DistributeVerticalParams,
  CenterInParentParamsSchema, type CenterInParentParams,
  MoveToPageParamsSchema, type MoveToPageParams,
  DuplicateAtOffsetParamsSchema, type DuplicateAtOffsetParams,
  DuplicateArrayParamsSchema, type DuplicateArrayParams,
  SwapPositionsParamsSchema, type SwapPositionsParams,
} from "../../shared/types/params/movement/index.js";

export function registerMovementTools(server: McpServer, taskManager: TaskManager) {
  server.tool("move-by-delta", "Move a node by a relative offset.", MoveByDeltaParamsSchema.shape,
    async (params: MoveByDeltaParams) => await safeToolProcessor(taskManager.runTask("move-by-delta", params)));
  
  server.tool("set-position", "Set the absolute position of a node.", SetPositionParamsSchema.shape,
    async (params: SetPositionParams) => await safeToolProcessor(taskManager.runTask("set-position", params)));
  
  server.tool("align-left", "Align nodes to the left edge.", AlignLeftParamsSchema.shape,
    async (params: AlignLeftParams) => await safeToolProcessor(taskManager.runTask("align-left", params)));
  
  server.tool("align-right", "Align nodes to the right edge.", AlignRightParamsSchema.shape,
    async (params: AlignRightParams) => await safeToolProcessor(taskManager.runTask("align-right", params)));
  
  server.tool("align-top", "Align nodes to the top edge.", AlignTopParamsSchema.shape,
    async (params: AlignTopParams) => await safeToolProcessor(taskManager.runTask("align-top", params)));
  
  server.tool("align-bottom", "Align nodes to the bottom edge.", AlignBottomParamsSchema.shape,
    async (params: AlignBottomParams) => await safeToolProcessor(taskManager.runTask("align-bottom", params)));
  
  server.tool("align-center-h", "Align nodes to horizontal center.", AlignCenterHParamsSchema.shape,
    async (params: AlignCenterHParams) => await safeToolProcessor(taskManager.runTask("align-center-h", params)));
  
  server.tool("align-center-v", "Align nodes to vertical center.", AlignCenterVParamsSchema.shape,
    async (params: AlignCenterVParams) => await safeToolProcessor(taskManager.runTask("align-center-v", params)));
  
  server.tool("distribute-horizontal", "Distribute nodes evenly horizontally.", DistributeHorizontalParamsSchema.shape,
    async (params: DistributeHorizontalParams) => await safeToolProcessor(taskManager.runTask("distribute-horizontal", params)));
  
  server.tool("distribute-vertical", "Distribute nodes evenly vertically.", DistributeVerticalParamsSchema.shape,
    async (params: DistributeVerticalParams) => await safeToolProcessor(taskManager.runTask("distribute-vertical", params)));
  
  server.tool("center-in-parent", "Center a node within its parent.", CenterInParentParamsSchema.shape,
    async (params: CenterInParentParams) => await safeToolProcessor(taskManager.runTask("center-in-parent", params)));
  
  server.tool("move-to-page", "Move a node to a different page.", MoveToPageParamsSchema.shape,
    async (params: MoveToPageParams) => await safeToolProcessor(taskManager.runTask("move-to-page", params)));
  
  server.tool("duplicate-at-offset", "Duplicate a node at an offset.", DuplicateAtOffsetParamsSchema.shape,
    async (params: DuplicateAtOffsetParams) => await safeToolProcessor(taskManager.runTask("duplicate-at-offset", params)));
  
  server.tool("duplicate-array", "Create an array of duplicates.", DuplicateArrayParamsSchema.shape,
    async (params: DuplicateArrayParams) => await safeToolProcessor(taskManager.runTask("duplicate-array", params)));
  
  server.tool("swap-positions", "Swap positions of two nodes.", SwapPositionsParamsSchema.shape,
    async (params: SwapPositionsParams) => await safeToolProcessor(taskManager.runTask("swap-positions", params)));
}
