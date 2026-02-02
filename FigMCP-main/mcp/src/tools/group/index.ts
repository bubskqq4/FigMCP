import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import {
  CreateGroupParamsSchema, type CreateGroupParams,
  UngroupParamsSchema, type UngroupParams,
  GroupCreateComponentSetParamsSchema, type GroupCreateComponentSetParams,
  CreateVariantParamsSchema, type CreateVariantParams,
  FrameSelectionParamsSchema, type FrameSelectionParams,
  WrapInFrameParamsSchema, type WrapInFrameParams,
  WrapInGroupParamsSchema, type WrapInGroupParams,
  ExtractFromParentParamsSchema, type ExtractFromParentParams,
  FlattenToFrameParamsSchema, type FlattenToFrameParams,
  MergeFramesParamsSchema, type MergeFramesParams,
} from "../../shared/types/params/group/index.js";

export function registerGroupTools(server: McpServer, taskManager: TaskManager) {
  server.tool(
    "create-group",
    "Create a group from multiple nodes.",
    CreateGroupParamsSchema.shape,
    async (params: CreateGroupParams) => {
      return await safeToolProcessor<CreateGroupParams>(
        taskManager.runTask("create-group", params)
      );
    }
  );

  server.tool(
    "ungroup",
    "Ungroup a group node, releasing its children.",
    UngroupParamsSchema.shape,
    async (params: UngroupParams) => {
      return await safeToolProcessor<UngroupParams>(
        taskManager.runTask("ungroup", params)
      );
    }
  );

  server.tool(
    "group-create-component-set",
    "Create a component set from multiple components.",
    GroupCreateComponentSetParamsSchema.shape,
    async (params: GroupCreateComponentSetParams) => {
      return await safeToolProcessor<GroupCreateComponentSetParams>(
        taskManager.runTask("group-create-component-set", params)
      );
    }
  );

  server.tool(
    "create-variant",
    "Add a new variant to an existing component set.",
    CreateVariantParamsSchema.shape,
    async (params: CreateVariantParams) => {
      return await safeToolProcessor<CreateVariantParams>(
        taskManager.runTask("create-variant", params)
      );
    }
  );

  server.tool(
    "frame-selection",
    "Create a frame around the current selection.",
    FrameSelectionParamsSchema.shape,
    async (params: FrameSelectionParams) => {
      return await safeToolProcessor<FrameSelectionParams>(
        taskManager.runTask("frame-selection", params)
      );
    }
  );

  server.tool(
    "wrap-in-frame",
    "Wrap specified nodes in a new frame.",
    WrapInFrameParamsSchema.shape,
    async (params: WrapInFrameParams) => {
      return await safeToolProcessor<WrapInFrameParams>(
        taskManager.runTask("wrap-in-frame", params)
      );
    }
  );

  server.tool(
    "wrap-in-group",
    "Wrap specified nodes in a new group.",
    WrapInGroupParamsSchema.shape,
    async (params: WrapInGroupParams) => {
      return await safeToolProcessor<WrapInGroupParams>(
        taskManager.runTask("wrap-in-group", params)
      );
    }
  );

  server.tool(
    "extract-from-parent",
    "Extract a node from its parent container.",
    ExtractFromParentParamsSchema.shape,
    async (params: ExtractFromParentParams) => {
      return await safeToolProcessor<ExtractFromParentParams>(
        taskManager.runTask("extract-from-parent", params)
      );
    }
  );

  server.tool(
    "flatten-to-frame",
    "Flatten a nested group structure to a single frame.",
    FlattenToFrameParamsSchema.shape,
    async (params: FlattenToFrameParams) => {
      return await safeToolProcessor<FlattenToFrameParams>(
        taskManager.runTask("flatten-to-frame", params)
      );
    }
  );

  server.tool(
    "merge-frames",
    "Merge multiple frames into a single frame.",
    MergeFramesParamsSchema.shape,
    async (params: MergeFramesParams) => {
      return await safeToolProcessor<MergeFramesParams>(
        taskManager.runTask("merge-frames", params)
      );
    }
  );
}
