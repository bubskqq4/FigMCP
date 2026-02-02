import { StartTaskHandler, TaskFinishedHandler, TaskFailedHandler } from './types';
import { ToolResult } from './tools/tool-result';
import { serializeNode } from './serialization/serialization';
import { getNodeInfo } from './tools/read/get-node-info';
import { getAllComponents } from './tools/read/get-all-components';
import { createRectangle } from './tools/create/create-rectangle';
import { safeToolProcessor } from './tools/safe-tool-processor';
import { GetNodeInfoParams, GetAllComponentsParams, CreateRectangleParams, MoveNodeParams, ResizeNodeParams, DeleteNodeParams, CloneNodeParams, CreateFrameParams, CreateTextParams, SetFillColorParams, SetStrokeColorParams, SetCornerRadiusParams, SetLayoutParams, CreateInstanceParams, AddComponentPropertyParams, EditComponentPropertyParams, DeleteComponentPropertyParams, SetInstancePropertiesParams, SetNodeComponentPropertyReferencesParams, CreateComponentParams, SetParentIdParams, GetPagesParams, ListNodesParams, GetNodeChildrenParams, SearchNodesParams, GetNodeTreeParams, GetLayerTreeParams, CreateEllipseParams, CreatePolygonParams, CreateStarParams, CreateLineParams, CreateVectorParams, CreateArcParams, CreateSliceParams, CreateSectionParams, CreateStickyParams, CreateConnectorParams, CreateShapeWithTextParams, CreateBooleanUnionParams, CreateBooleanSubtractParams, CreateBooleanIntersectParams, CreateBooleanExcludeParams } from '@shared/types';
import { emit, on } from '@create-figma-plugin/utilities';
import { getSelection } from 'tools/read/get-selection';
import { getFileKey } from 'tools/read/get-file-key';
import { moveNode } from 'tools/update/move-node';
import { resizeNode } from 'tools/update/resize-node';
import { deleteNode } from 'tools/delete/delete-node';
import { cloneNode } from 'tools/create/clone-node';
import { createFrame } from 'tools/create/create-frame';
import { createText } from 'tools/create/create-text';
import { setFillColor } from 'tools/update/set-fill-color';
import { setStrokeColor } from 'tools/update/set-stroke-color';
import { setCornerRadius } from 'tools/update/set-corner-radius';
import { setLayout } from 'tools/update/set-layout';
import { createInstance } from 'tools/create/create-instance';
import { addComponentProperty } from 'tools/create/add-component-property';
import { editComponentProperty } from 'tools/update/edit-component-property';
import { deleteComponentProperty } from 'tools/delete/delete-component-property';
import { setInstanceProperties } from 'tools/update/set-instance-properties';
import { setNodeComponentPropertyReferences } from 'tools/update/set-node-component-property-references';
import { createComponent } from 'tools/create/create-component';
import { setParentId } from 'tools/update/set-parent-id';
import { getPages } from 'tools/read/get-pages';
import { listNodes } from 'tools/read/list-nodes';
import { getNodeChildren } from 'tools/read/get-node-children';
import { searchNodes } from 'tools/read/search-nodes';
import { getNodeTree } from 'tools/read/get-node-tree';
import { getLayerTree } from 'tools/read/get-layer-tree';
import { visualFeedback, isCreateOrModifyCommand, extractNodeIdFromResult } from './utils/visual-feedback';

// Shape tools
import { createEllipse } from 'tools/shapes/create-ellipse';
import { createPolygon } from 'tools/shapes/create-polygon';
import { createStar } from 'tools/shapes/create-star';
import { createLine } from 'tools/shapes/create-line';
import { createVector } from 'tools/shapes/create-vector';
import { createArc } from 'tools/shapes/create-arc';
import { createSlice } from 'tools/shapes/create-slice';
import { createSection } from 'tools/shapes/create-section';
import { createSticky } from 'tools/shapes/create-sticky';
import { createConnector } from 'tools/shapes/create-connector';
import { createShapeWithText } from 'tools/shapes/create-shape-with-text';
import { createBooleanUnion } from 'tools/shapes/create-boolean-union';
import { createBooleanSubtract } from 'tools/shapes/create-boolean-subtract';
import { createBooleanIntersect } from 'tools/shapes/create-boolean-intersect';
import { createBooleanExclude } from 'tools/shapes/create-boolean-exclude';

// Group tools
import { 
  createGroup, ungroup, createComponentSet, createVariant,
  frameSelection, wrapInFrame, wrapInGroup, extractFromParent,
  flattenToFrame, mergeFrames
} from 'tools/group/index';
import {
  CreateGroupParams, UngroupParams, CreateComponentSetParams, CreateVariantParams,
  FrameSelectionParams, WrapInFrameParams, WrapInGroupParams, ExtractFromParentParams,
  FlattenToFrameParams, MergeFramesParams
} from '@shared/types/params/group/index';

// Movement tools
import * as MovementTools from 'tools/movement/index';
import * as MovementTypes from '@shared/types/params/movement/index';

// Transform tools
import * as TransformTools from 'tools/transform/index';
import * as TransformTypes from '@shared/types/params/transform/index';

// Visibility tools
import * as VisibilityTools from 'tools/visibility/index';
import * as VisibilityTypes from '@shared/types/params/visibility/index';

// AI Helper tools
import * as AIHelperTools from 'tools/ai-helper/index';
import * as AIHelperTypes from '@shared/types/params/ai-helper/index';

// Token Management tools
import * as TokenMgmtTools from 'tools/token-mgmt/index';
import * as TokenMgmtTypes from '@shared/types/params/token-mgmt/index';

// Auto Layout tools
import * as AutoLayoutTools from 'tools/autolayout/index';

// Fill tools
import * as FillTools from 'tools/fills/index';
import * as FillTypes from '@shared/types/params/fills/index';

// Stroke tools
import * as StrokeTools from 'tools/strokes/index';

// Effect tools
import * as EffectTools from 'tools/effects/index';

// Corner tools
import * as CornerTools from 'tools/corners/index';

// Text tools
import * as TextTools from 'tools/text/index';

// Component tools
import * as ComponentTools from 'tools/components/index';

// Style tools
import * as StyleTools from 'tools/styles/index';

// Variable tools
import * as VariableTools from 'tools/variables/index';

// Constraint tools
import * as ConstraintTools from 'tools/constraints/index';

// Z-Order tools
import * as ZOrderTools from 'tools/zorder/index';

// Page tools
import * as PageTools from 'tools/pages/index';

// Selection tools
import * as SelectionTools from 'tools/selection/index';

// Export tools
import * as ExportTools from 'tools/export/index';

// Search tools
import * as SearchTools from 'tools/search/index';

// Clipboard tools
import * as ClipboardTools from 'tools/clipboard/index';

// DocInfo tools
import * as DocInfoTools from 'tools/docinfo/index';

// File Ops tools
import * as FileOpsTools from 'tools/file-ops/index';

// File Lock tools (agent coordination)
import * as FileLockTools from 'tools/file-lock/index';

// Design Thinking tools
import * as DesignThinkingTools from 'tools/design-thinking/index';

// UI Pattern tools
import * as UIPatternTools from 'tools/ui-patterns/index';

// Code Gen tools
import * as CodeGenTools from 'tools/code-gen/index';

// Analysis tools
import * as AnalysisTools from 'tools/analysis/index';

// Design System Extended tools
import * as DesignSystemExtendedTools from 'tools/design-system-extended/index';

// Accessibility tools
import * as AccessibilityTools from 'tools/accessibility-tools/index';

// Performance tools
import * as PerformanceTools from 'tools/performance-tools/index';

// Track whether pages have been loaded this session
let pagesLoaded = false;
let pagesLoadPromise: Promise<void> | null = null;

// Commands that require fresh page data (should reload pages)
const COMMANDS_REQUIRING_PAGE_RELOAD = new Set([
  'get-pages',
  'get-layer-tree',
  'get-node-tree',
  'list-nodes',
  'search-nodes',
]);

// Efficiently load pages with caching
async function ensurePagesLoaded(command: string): Promise<void> {
  // If pages are loading, wait for that to complete
  if (pagesLoadPromise) {
    await pagesLoadPromise;
    return;
  }
  
  // Check if we need to reload (first time or command requires fresh data)
  const needsReload = !pagesLoaded || COMMANDS_REQUIRING_PAGE_RELOAD.has(command);
  
  if (needsReload) {
    console.log(`[Performance] Loading pages for command: ${command}`);
    pagesLoadPromise = figma.loadAllPagesAsync();
    try {
      await pagesLoadPromise;
      pagesLoaded = true;
    } finally {
      pagesLoadPromise = null;
    }
  }
}

function main() {

  on<StartTaskHandler>('START_TASK', async function (task: StartTaskHandler) {
    try {
      console.log('start-task', task)
      
      // Efficiently load pages with caching
      await ensurePagesLoaded(task.command);

      // Activate visual feedback for create/modify operations
      const isCreatingOrModifying = isCreateOrModifyCommand(task.command);
      if (isCreatingOrModifying) {
        visualFeedback.start();
      }

      let result: ToolResult = {
        isError: true,
        content: "Tool not found"
      };

      if (task.command === 'get-selection') {
        result = await safeToolProcessor<void>(getSelection)();
      }

      if (task.command === 'get-file-key') {
        result = await safeToolProcessor<void>(getFileKey)();
      }

      if (task.command === 'get-node-info') {
        result = await safeToolProcessor<GetNodeInfoParams>(getNodeInfo)(task.args as GetNodeInfoParams);
      }

      if (task.command === 'get-all-components') {
        result = await safeToolProcessor<GetAllComponentsParams>(getAllComponents)(task.args as GetAllComponentsParams);
      }

      if (task.command === 'get-pages') {
        result = await safeToolProcessor<GetPagesParams>(getPages)(task.args as GetPagesParams);
      }

      if (task.command === 'list-nodes') {
        result = await safeToolProcessor<ListNodesParams>(listNodes)(task.args as ListNodesParams);
      }

      if (task.command === 'get-node-children') {
        result = await safeToolProcessor<GetNodeChildrenParams>(getNodeChildren)(task.args as GetNodeChildrenParams);
      }

      if (task.command === 'search-nodes') {
        result = await safeToolProcessor<SearchNodesParams>(searchNodes)(task.args as SearchNodesParams);
      }

      if (task.command === 'get-node-tree') {
        result = await safeToolProcessor<GetNodeTreeParams>(getNodeTree)(task.args as GetNodeTreeParams);
      }

      if (task.command === 'get-layer-tree') {
        result = await safeToolProcessor<GetLayerTreeParams>(getLayerTree)(task.args as GetLayerTreeParams);
      }

      if (task.command === 'create-rectangle') {
        result = await safeToolProcessor<CreateRectangleParams>(createRectangle)(task.args as CreateRectangleParams);
      }

      if (task.command === 'move-node') {
        result = await safeToolProcessor<MoveNodeParams>(moveNode)(task.args as MoveNodeParams);
      }

      if (task.command === 'resize-node') {
        result = await safeToolProcessor<ResizeNodeParams>(resizeNode)(task.args as ResizeNodeParams);
      }

      if (task.command === 'delete-node') {
        result = await safeToolProcessor<DeleteNodeParams>(deleteNode)(task.args as DeleteNodeParams);
      }

      if (task.command === 'clone-node') {
        result = await safeToolProcessor<CloneNodeParams>(cloneNode)(task.args as CloneNodeParams);
      }

      if (task.command === 'create-frame') {
        result = await safeToolProcessor<CreateFrameParams>(createFrame)(task.args as CreateFrameParams);
      }

      if (task.command === 'create-text') {
        result = await safeToolProcessor<CreateTextParams>(createText)(task.args as CreateTextParams);
      }

      if (task.command === 'create-instance') {
        result = await safeToolProcessor<CreateInstanceParams>(createInstance)(task.args as CreateInstanceParams);
      }

      if (task.command === 'set-fill-color') {
        result = await safeToolProcessor<SetFillColorParams>(setFillColor)(task.args as SetFillColorParams);
      }

      if (task.command === 'set-stroke-color') {
        result = await safeToolProcessor<SetStrokeColorParams>(setStrokeColor)(task.args as SetStrokeColorParams);
      }

      if (task.command === 'set-corner-radius') {
        result = await safeToolProcessor<SetCornerRadiusParams>(setCornerRadius)(task.args as SetCornerRadiusParams);
      }
      if (task.command === 'set-layout') {
        result = await safeToolProcessor<SetLayoutParams>(setLayout)(task.args as SetLayoutParams);
      }

      if (task.command === 'add-component-property') {
        result = await safeToolProcessor<AddComponentPropertyParams>(addComponentProperty)(task.args as AddComponentPropertyParams);
      }

      if (task.command === 'edit-component-property') {
        result = await safeToolProcessor<EditComponentPropertyParams>(editComponentProperty)(task.args as EditComponentPropertyParams);
      }

      if (task.command === 'delete-component-property') {
        result = await safeToolProcessor<DeleteComponentPropertyParams>(deleteComponentProperty)(task.args as DeleteComponentPropertyParams);
      }

      if (task.command === 'set-instance-properties') {
        result = await safeToolProcessor<SetInstancePropertiesParams>(setInstanceProperties)(task.args as SetInstancePropertiesParams);
      }

      if (task.command === 'set-node-component-property-references') {
        result = await safeToolProcessor<SetNodeComponentPropertyReferencesParams>(setNodeComponentPropertyReferences)(task.args as SetNodeComponentPropertyReferencesParams);
      }

      if (task.command === 'create-component') {
        result = await safeToolProcessor<CreateComponentParams>(createComponent)(task.args as CreateComponentParams);
      }

      if (task.command === 'set-parent-id') {
        result = await safeToolProcessor<SetParentIdParams>(setParentId)(task.args as SetParentIdParams);
      }

      // Shape tools
      if (task.command === 'create-ellipse') {
        result = await safeToolProcessor<CreateEllipseParams>(createEllipse)(task.args as CreateEllipseParams);
      }

      if (task.command === 'create-polygon') {
        result = await safeToolProcessor<CreatePolygonParams>(createPolygon)(task.args as CreatePolygonParams);
      }

      if (task.command === 'create-star') {
        result = await safeToolProcessor<CreateStarParams>(createStar)(task.args as CreateStarParams);
      }

      if (task.command === 'create-line') {
        result = await safeToolProcessor<CreateLineParams>(createLine)(task.args as CreateLineParams);
      }

      if (task.command === 'create-vector') {
        result = await safeToolProcessor<CreateVectorParams>(createVector)(task.args as CreateVectorParams);
      }

      if (task.command === 'create-arc') {
        result = await safeToolProcessor<CreateArcParams>(createArc)(task.args as CreateArcParams);
      }

      if (task.command === 'create-slice') {
        result = await safeToolProcessor<CreateSliceParams>(createSlice)(task.args as CreateSliceParams);
      }

      if (task.command === 'create-section') {
        result = await safeToolProcessor<CreateSectionParams>(createSection)(task.args as CreateSectionParams);
      }

      if (task.command === 'create-sticky') {
        result = await safeToolProcessor<CreateStickyParams>(createSticky)(task.args as CreateStickyParams);
      }

      if (task.command === 'create-connector') {
        result = await safeToolProcessor<CreateConnectorParams>(createConnector)(task.args as CreateConnectorParams);
      }

      if (task.command === 'create-shape-with-text') {
        result = await safeToolProcessor<CreateShapeWithTextParams>(createShapeWithText)(task.args as CreateShapeWithTextParams);
      }

      if (task.command === 'create-boolean-union') {
        result = await safeToolProcessor<CreateBooleanUnionParams>(createBooleanUnion)(task.args as CreateBooleanUnionParams);
      }

      if (task.command === 'create-boolean-subtract') {
        result = await safeToolProcessor<CreateBooleanSubtractParams>(createBooleanSubtract)(task.args as CreateBooleanSubtractParams);
      }

      if (task.command === 'create-boolean-intersect') {
        result = await safeToolProcessor<CreateBooleanIntersectParams>(createBooleanIntersect)(task.args as CreateBooleanIntersectParams);
      }

      if (task.command === 'create-boolean-exclude') {
        result = await safeToolProcessor<CreateBooleanExcludeParams>(createBooleanExclude)(task.args as CreateBooleanExcludeParams);
      }

      // Group tools
      if (task.command === 'create-group') {
        result = await safeToolProcessor<CreateGroupParams>(createGroup)(task.args as CreateGroupParams);
      }
      if (task.command === 'ungroup') {
        result = await safeToolProcessor<UngroupParams>(ungroup)(task.args as UngroupParams);
      }
      if (task.command === 'create-component-set') {
        result = await safeToolProcessor<CreateComponentSetParams>(createComponentSet)(task.args as CreateComponentSetParams);
      }
      if (task.command === 'create-variant') {
        result = await safeToolProcessor<CreateVariantParams>(createVariant)(task.args as CreateVariantParams);
      }
      if (task.command === 'frame-selection') {
        result = await safeToolProcessor<FrameSelectionParams>(frameSelection)(task.args as FrameSelectionParams);
      }
      if (task.command === 'wrap-in-frame') {
        result = await safeToolProcessor<WrapInFrameParams>(wrapInFrame)(task.args as WrapInFrameParams);
      }
      if (task.command === 'wrap-in-group') {
        result = await safeToolProcessor<WrapInGroupParams>(wrapInGroup)(task.args as WrapInGroupParams);
      }
      if (task.command === 'extract-from-parent') {
        result = await safeToolProcessor<ExtractFromParentParams>(extractFromParent)(task.args as ExtractFromParentParams);
      }
      if (task.command === 'flatten-to-frame') {
        result = await safeToolProcessor<FlattenToFrameParams>(flattenToFrame)(task.args as FlattenToFrameParams);
      }
      if (task.command === 'merge-frames') {
        result = await safeToolProcessor<MergeFramesParams>(mergeFrames)(task.args as MergeFramesParams);
      }

      // Movement tools
      if (task.command === 'move-by-delta') {
        result = await safeToolProcessor<MovementTypes.MoveByDeltaParams>(MovementTools.moveByDelta)(task.args as MovementTypes.MoveByDeltaParams);
      }
      if (task.command === 'set-position') {
        result = await safeToolProcessor<MovementTypes.SetPositionParams>(MovementTools.setPosition)(task.args as MovementTypes.SetPositionParams);
      }
      if (task.command === 'align-left') {
        result = await safeToolProcessor<MovementTypes.AlignLeftParams>(MovementTools.alignLeft)(task.args as MovementTypes.AlignLeftParams);
      }
      if (task.command === 'align-right') {
        result = await safeToolProcessor<MovementTypes.AlignRightParams>(MovementTools.alignRight)(task.args as MovementTypes.AlignRightParams);
      }
      if (task.command === 'align-top') {
        result = await safeToolProcessor<MovementTypes.AlignTopParams>(MovementTools.alignTop)(task.args as MovementTypes.AlignTopParams);
      }
      if (task.command === 'align-bottom') {
        result = await safeToolProcessor<MovementTypes.AlignBottomParams>(MovementTools.alignBottom)(task.args as MovementTypes.AlignBottomParams);
      }
      if (task.command === 'align-center-h') {
        result = await safeToolProcessor<MovementTypes.AlignCenterHParams>(MovementTools.alignCenterH)(task.args as MovementTypes.AlignCenterHParams);
      }
      if (task.command === 'align-center-v') {
        result = await safeToolProcessor<MovementTypes.AlignCenterVParams>(MovementTools.alignCenterV)(task.args as MovementTypes.AlignCenterVParams);
      }
      if (task.command === 'distribute-horizontal') {
        result = await safeToolProcessor<MovementTypes.DistributeHorizontalParams>(MovementTools.distributeHorizontal)(task.args as MovementTypes.DistributeHorizontalParams);
      }
      if (task.command === 'distribute-vertical') {
        result = await safeToolProcessor<MovementTypes.DistributeVerticalParams>(MovementTools.distributeVertical)(task.args as MovementTypes.DistributeVerticalParams);
      }
      if (task.command === 'center-in-parent') {
        result = await safeToolProcessor<MovementTypes.CenterInParentParams>(MovementTools.centerInParent)(task.args as MovementTypes.CenterInParentParams);
      }
      if (task.command === 'move-to-page') {
        result = await safeToolProcessor<MovementTypes.MoveToPageParams>(MovementTools.moveToPage)(task.args as MovementTypes.MoveToPageParams);
      }
      if (task.command === 'duplicate-at-offset') {
        result = await safeToolProcessor<MovementTypes.DuplicateAtOffsetParams>(MovementTools.duplicateAtOffset)(task.args as MovementTypes.DuplicateAtOffsetParams);
      }
      if (task.command === 'duplicate-array') {
        result = await safeToolProcessor<MovementTypes.DuplicateArrayParams>(MovementTools.duplicateArray)(task.args as MovementTypes.DuplicateArrayParams);
      }
      if (task.command === 'swap-positions') {
        result = await safeToolProcessor<MovementTypes.SwapPositionsParams>(MovementTools.swapPositions)(task.args as MovementTypes.SwapPositionsParams);
      }

      // Transform tools
      if (task.command === 'scale-node') {
        result = await safeToolProcessor<TransformTypes.ScaleNodeParams>(TransformTools.scaleNode)(task.args as TransformTypes.ScaleNodeParams);
      }
      if (task.command === 'set-rotation') {
        result = await safeToolProcessor<TransformTypes.SetRotationParams>(TransformTools.setRotation)(task.args as TransformTypes.SetRotationParams);
      }
      if (task.command === 'rotate-by') {
        result = await safeToolProcessor<TransformTypes.RotateByParams>(TransformTools.rotateBy)(task.args as TransformTypes.RotateByParams);
      }
      if (task.command === 'reset-rotation') {
        result = await safeToolProcessor<TransformTypes.ResetRotationParams>(TransformTools.resetRotation)(task.args as TransformTypes.ResetRotationParams);
      }
      if (task.command === 'set-width') {
        result = await safeToolProcessor<TransformTypes.SetWidthParams>(TransformTools.setWidth)(task.args as TransformTypes.SetWidthParams);
      }
      if (task.command === 'set-height') {
        result = await safeToolProcessor<TransformTypes.SetHeightParams>(TransformTools.setHeight)(task.args as TransformTypes.SetHeightParams);
      }
      if (task.command === 'fit-to-content') {
        result = await safeToolProcessor<TransformTypes.FitToContentParams>(TransformTools.fitToContent)(task.args as TransformTypes.FitToContentParams);
      }
      if (task.command === 'match-width') {
        result = await safeToolProcessor<TransformTypes.MatchWidthParams>(TransformTools.matchWidth)(task.args as TransformTypes.MatchWidthParams);
      }
      if (task.command === 'match-height') {
        result = await safeToolProcessor<TransformTypes.MatchHeightParams>(TransformTools.matchHeight)(task.args as TransformTypes.MatchHeightParams);
      }
      if (task.command === 'match-size') {
        result = await safeToolProcessor<TransformTypes.MatchSizeParams>(TransformTools.matchSize)(task.args as TransformTypes.MatchSizeParams);
      }
      if (task.command === 'flip-horizontal') {
        result = await safeToolProcessor<TransformTypes.FlipHorizontalParams>(TransformTools.flipHorizontal)(task.args as TransformTypes.FlipHorizontalParams);
      }
      if (task.command === 'flip-vertical') {
        result = await safeToolProcessor<TransformTypes.FlipVerticalParams>(TransformTools.flipVertical)(task.args as TransformTypes.FlipVerticalParams);
      }

      // Visibility tools
      if (task.command === 'set-opacity') {
        result = await safeToolProcessor<VisibilityTypes.SetOpacityParams>(VisibilityTools.setOpacity)(task.args as VisibilityTypes.SetOpacityParams);
      }
      if (task.command === 'set-blend-mode') {
        result = await safeToolProcessor<VisibilityTypes.SetBlendModeParams>(VisibilityTools.setBlendMode)(task.args as VisibilityTypes.SetBlendModeParams);
      }
      if (task.command === 'hide-node') {
        result = await safeToolProcessor<VisibilityTypes.HideNodeParams>(VisibilityTools.hideNode)(task.args as VisibilityTypes.HideNodeParams);
      }
      if (task.command === 'show-node') {
        result = await safeToolProcessor<VisibilityTypes.ShowNodeParams>(VisibilityTools.showNode)(task.args as VisibilityTypes.ShowNodeParams);
      }
      if (task.command === 'toggle-visibility') {
        result = await safeToolProcessor<VisibilityTypes.ToggleVisibilityParams>(VisibilityTools.toggleVisibility)(task.args as VisibilityTypes.ToggleVisibilityParams);
      }
      if (task.command === 'lock-node') {
        result = await safeToolProcessor<VisibilityTypes.LockNodeParams>(VisibilityTools.lockNode)(task.args as VisibilityTypes.LockNodeParams);
      }
      if (task.command === 'unlock-node') {
        result = await safeToolProcessor<VisibilityTypes.UnlockNodeParams>(VisibilityTools.unlockNode)(task.args as VisibilityTypes.UnlockNodeParams);
      }
      if (task.command === 'toggle-lock') {
        result = await safeToolProcessor<VisibilityTypes.ToggleLockParams>(VisibilityTools.toggleLock)(task.args as VisibilityTypes.ToggleLockParams);
      }

      // AI Helper tools (plugin-based ones)
      if (task.command === 'analyze-design-complexity') {
        result = await safeToolProcessor<AIHelperTypes.AnalyzeDesignComplexityParams>(AIHelperTools.analyzeDesignComplexity)(task.args as AIHelperTypes.AnalyzeDesignComplexityParams);
      }
      if (task.command === 'generate-implementation-plan') {
        result = await safeToolProcessor<AIHelperTypes.GenerateImplementationPlanParams>(AIHelperTools.generateImplementationPlan)(task.args as AIHelperTypes.GenerateImplementationPlanParams);
      }
      if (task.command === 'validate-design-accessibility') {
        result = await safeToolProcessor<AIHelperTypes.ValidateDesignAccessibilityParams>(AIHelperTools.validateDesignAccessibility)(task.args as AIHelperTypes.ValidateDesignAccessibilityParams);
      }

      // Token Management tools (plugin-based ones)
      if (task.command === 'request-api-token') {
        result = await safeToolProcessor<TokenMgmtTypes.RequestApiTokenParams>(TokenMgmtTools.requestApiToken)(task.args as TokenMgmtTypes.RequestApiTokenParams);
      }
      if (task.command === 'get-plugin-settings') {
        result = await safeToolProcessor<TokenMgmtTypes.GetPluginSettingsParams>(TokenMgmtTools.getPluginSettings)(task.args as TokenMgmtTypes.GetPluginSettingsParams);
      }

      // Auto Layout tools
      if (task.command === 'enable-auto-layout') {
        result = await safeToolProcessor<AutoLayoutTools.EnableAutoLayoutParams>(AutoLayoutTools.enableAutoLayout)(task.args as AutoLayoutTools.EnableAutoLayoutParams);
      }
      if (task.command === 'disable-auto-layout') {
        result = await safeToolProcessor<AutoLayoutTools.DisableAutoLayoutParams>(AutoLayoutTools.disableAutoLayout)(task.args as AutoLayoutTools.DisableAutoLayoutParams);
      }
      if (task.command === 'set-layout-direction') {
        result = await safeToolProcessor<AutoLayoutTools.SetLayoutDirectionParams>(AutoLayoutTools.setLayoutDirection)(task.args as AutoLayoutTools.SetLayoutDirectionParams);
      }
      if (task.command === 'set-layout-wrap') {
        result = await safeToolProcessor<AutoLayoutTools.SetLayoutWrapParams>(AutoLayoutTools.setLayoutWrap)(task.args as AutoLayoutTools.SetLayoutWrapParams);
      }
      if (task.command === 'set-layout-gap') {
        result = await safeToolProcessor<AutoLayoutTools.SetLayoutGapParams>(AutoLayoutTools.setLayoutGap)(task.args as AutoLayoutTools.SetLayoutGapParams);
      }
      if (task.command === 'set-layout-padding-all') {
        result = await safeToolProcessor<AutoLayoutTools.SetLayoutPaddingAllParams>(AutoLayoutTools.setLayoutPaddingAll)(task.args as AutoLayoutTools.SetLayoutPaddingAllParams);
      }
      if (task.command === 'set-layout-padding-individual') {
        result = await safeToolProcessor<AutoLayoutTools.SetLayoutPaddingIndividualParams>(AutoLayoutTools.setLayoutPaddingIndividual)(task.args as AutoLayoutTools.SetLayoutPaddingIndividualParams);
      }
      if (task.command === 'set-layout-align-items') {
        result = await safeToolProcessor<AutoLayoutTools.SetLayoutAlignItemsParams>(AutoLayoutTools.setLayoutAlignItems)(task.args as AutoLayoutTools.SetLayoutAlignItemsParams);
      }
      if (task.command === 'set-layout-justify-content') {
        result = await safeToolProcessor<AutoLayoutTools.SetLayoutJustifyContentParams>(AutoLayoutTools.setLayoutJustifyContent)(task.args as AutoLayoutTools.SetLayoutJustifyContentParams);
      }
      if (task.command === 'set-layout-sizing') {
        result = await safeToolProcessor<AutoLayoutTools.SetLayoutSizingParams>(AutoLayoutTools.setLayoutSizing)(task.args as AutoLayoutTools.SetLayoutSizingParams);
      }
      if (task.command === 'set-child-positioning') {
        result = await safeToolProcessor<AutoLayoutTools.SetChildPositioningParams>(AutoLayoutTools.setChildPositioning)(task.args as AutoLayoutTools.SetChildPositioningParams);
      }
      if (task.command === 'set-layout-mode') {
        result = await safeToolProcessor<AutoLayoutTools.SetLayoutModeParams>(AutoLayoutTools.setLayoutMode)(task.args as AutoLayoutTools.SetLayoutModeParams);
      }
      if (task.command === 'set-counter-axis-sizing') {
        result = await safeToolProcessor<AutoLayoutTools.SetCounterAxisSizingParams>(AutoLayoutTools.setCounterAxisSizing)(task.args as AutoLayoutTools.SetCounterAxisSizingParams);
      }
      if (task.command === 'set-primary-axis-sizing') {
        result = await safeToolProcessor<AutoLayoutTools.SetPrimaryAxisSizingParams>(AutoLayoutTools.setPrimaryAxisSizing)(task.args as AutoLayoutTools.SetPrimaryAxisSizingParams);
      }
      if (task.command === 'reorder-child') {
        result = await safeToolProcessor<AutoLayoutTools.ReorderChildParams>(AutoLayoutTools.reorderChild)(task.args as AutoLayoutTools.ReorderChildParams);
      }

      // Fill tools
      if (task.command === 'set-solid-fill') {
        result = await safeToolProcessor<FillTypes.SetSolidFillParams>(FillTools.setSolidFill)(task.args as FillTypes.SetSolidFillParams);
      }
      if (task.command === 'set-gradient-linear') {
        result = await safeToolProcessor<FillTypes.SetGradientLinearParams>(FillTools.setGradientLinear)(task.args as FillTypes.SetGradientLinearParams);
      }
      if (task.command === 'set-gradient-radial') {
        result = await safeToolProcessor<FillTypes.SetGradientRadialParams>(FillTools.setGradientRadial)(task.args as FillTypes.SetGradientRadialParams);
      }
      if (task.command === 'set-gradient-angular') {
        result = await safeToolProcessor<FillTypes.SetGradientAngularParams>(FillTools.setGradientAngular)(task.args as FillTypes.SetGradientAngularParams);
      }
      if (task.command === 'set-gradient-diamond') {
        result = await safeToolProcessor<FillTypes.SetGradientDiamondParams>(FillTools.setGradientDiamond)(task.args as FillTypes.SetGradientDiamondParams);
      }
      if (task.command === 'set-image-fill') {
        result = await safeToolProcessor<FillTypes.SetImageFillParams>(FillTools.setImageFill)(task.args as FillTypes.SetImageFillParams);
      }
      if (task.command === 'set-video-fill') {
        result = await safeToolProcessor<FillTypes.SetVideoFillParams>(FillTools.setVideoFill)(task.args as FillTypes.SetVideoFillParams);
      }
      if (task.command === 'add-fill') {
        result = await safeToolProcessor<FillTypes.AddFillParams>(FillTools.addFill)(task.args as FillTypes.AddFillParams);
      }
      if (task.command === 'remove-fill') {
        result = await safeToolProcessor<FillTypes.RemoveFillParams>(FillTools.removeFill)(task.args as FillTypes.RemoveFillParams);
      }
      if (task.command === 'remove-all-fills') {
        result = await safeToolProcessor<FillTypes.RemoveAllFillsParams>(FillTools.removeAllFills)(task.args as FillTypes.RemoveAllFillsParams);
      }
      if (task.command === 'reorder-fills') {
        result = await safeToolProcessor<FillTypes.ReorderFillsParams>(FillTools.reorderFills)(task.args as FillTypes.ReorderFillsParams);
      }
      if (task.command === 'set-fill-opacity') {
        result = await safeToolProcessor<FillTypes.SetFillOpacityParams>(FillTools.setFillOpacity)(task.args as FillTypes.SetFillOpacityParams);
      }
      if (task.command === 'set-fill-blend-mode') {
        result = await safeToolProcessor<FillTypes.SetFillBlendModeParams>(FillTools.setFillBlendMode)(task.args as FillTypes.SetFillBlendModeParams);
      }
      if (task.command === 'copy-fills') {
        result = await safeToolProcessor<FillTypes.CopyFillsParams>(FillTools.copyFills)(task.args as FillTypes.CopyFillsParams);
      }
      if (task.command === 'paste-fills') {
        result = await safeToolProcessor<FillTypes.PasteFillsParams>(FillTools.pasteFills)(task.args as FillTypes.PasteFillsParams);
      }
      if (task.command === 'sample-color') {
        result = await safeToolProcessor<FillTypes.SampleColorParams>(FillTools.sampleColor)(task.args as FillTypes.SampleColorParams);
      }
      if (task.command === 'swap-fill-colors') {
        result = await safeToolProcessor<FillTypes.SwapFillColorsParams>(FillTools.swapFillColors)(task.args as FillTypes.SwapFillColorsParams);
      }
      if (task.command === 'set-frame-background') {
        result = await safeToolProcessor<FillTypes.SetFrameBackgroundParams>(FillTools.setFrameBackground)(task.args as FillTypes.SetFrameBackgroundParams);
      }

      // Stroke tools
      if (task.command === 'set-stroke-weight') {
        result = await safeToolProcessor<StrokeTools.SetStrokeWeightParams>(StrokeTools.setStrokeWeight)(task.args as StrokeTools.SetStrokeWeightParams);
      }
      if (task.command === 'set-stroke-align') {
        result = await safeToolProcessor<StrokeTools.SetStrokeAlignParams>(StrokeTools.setStrokeAlign)(task.args as StrokeTools.SetStrokeAlignParams);
      }
      if (task.command === 'set-stroke-cap') {
        result = await safeToolProcessor<StrokeTools.SetStrokeCapParams>(StrokeTools.setStrokeCap)(task.args as StrokeTools.SetStrokeCapParams);
      }
      if (task.command === 'set-stroke-join') {
        result = await safeToolProcessor<StrokeTools.SetStrokeJoinParams>(StrokeTools.setStrokeJoin)(task.args as StrokeTools.SetStrokeJoinParams);
      }
      if (task.command === 'set-dash-pattern') {
        result = await safeToolProcessor<StrokeTools.SetDashPatternParams>(StrokeTools.setDashPattern)(task.args as StrokeTools.SetDashPatternParams);
      }
      if (task.command === 'set-stroke-opacity') {
        result = await safeToolProcessor<StrokeTools.SetStrokeOpacityParams>(StrokeTools.setStrokeOpacity)(task.args as StrokeTools.SetStrokeOpacityParams);
      }
      if (task.command === 'add-stroke') {
        result = await safeToolProcessor<StrokeTools.AddStrokeParams>(StrokeTools.addStroke)(task.args as StrokeTools.AddStrokeParams);
      }
      if (task.command === 'remove-stroke') {
        result = await safeToolProcessor<StrokeTools.RemoveStrokeParams>(StrokeTools.removeStroke)(task.args as StrokeTools.RemoveStrokeParams);
      }
      if (task.command === 'remove-all-strokes') {
        result = await safeToolProcessor<StrokeTools.RemoveAllStrokesParams>(StrokeTools.removeAllStrokes)(task.args as StrokeTools.RemoveAllStrokesParams);
      }
      if (task.command === 'set-individual-strokes') {
        result = await safeToolProcessor<StrokeTools.SetIndividualStrokesParams>(StrokeTools.setIndividualStrokes)(task.args as StrokeTools.SetIndividualStrokesParams);
      }
      if (task.command === 'outline-stroke') {
        result = await safeToolProcessor<StrokeTools.OutlineStrokeParams>(StrokeTools.outlineStroke)(task.args as StrokeTools.OutlineStrokeParams);
      }
      if (task.command === 'copy-strokes') {
        result = await safeToolProcessor<StrokeTools.CopyStrokesParams>(StrokeTools.copyStrokes)(task.args as StrokeTools.CopyStrokesParams);
      }

      // Effect tools
      if (task.command === 'add-drop-shadow') {
        result = await safeToolProcessor<EffectTools.AddDropShadowParams>(EffectTools.addDropShadow)(task.args as EffectTools.AddDropShadowParams);
      }
      if (task.command === 'add-inner-shadow') {
        result = await safeToolProcessor<EffectTools.AddInnerShadowParams>(EffectTools.addInnerShadow)(task.args as EffectTools.AddInnerShadowParams);
      }
      if (task.command === 'add-layer-blur') {
        result = await safeToolProcessor<EffectTools.AddLayerBlurParams>(EffectTools.addLayerBlur)(task.args as EffectTools.AddLayerBlurParams);
      }
      if (task.command === 'add-background-blur') {
        result = await safeToolProcessor<EffectTools.AddBackgroundBlurParams>(EffectTools.addBackgroundBlur)(task.args as EffectTools.AddBackgroundBlurParams);
      }
      if (task.command === 'remove-effect') {
        result = await safeToolProcessor<EffectTools.RemoveEffectParams>(EffectTools.removeEffect)(task.args as EffectTools.RemoveEffectParams);
      }
      if (task.command === 'remove-all-effects') {
        result = await safeToolProcessor<EffectTools.RemoveAllEffectsParams>(EffectTools.removeAllEffects)(task.args as EffectTools.RemoveAllEffectsParams);
      }
      if (task.command === 'set-effect-radius') {
        result = await safeToolProcessor<EffectTools.SetEffectRadiusParams>(EffectTools.setEffectRadius)(task.args as EffectTools.SetEffectRadiusParams);
      }
      if (task.command === 'set-effect-offset') {
        result = await safeToolProcessor<EffectTools.SetEffectOffsetParams>(EffectTools.setEffectOffset)(task.args as EffectTools.SetEffectOffsetParams);
      }
      if (task.command === 'set-effect-spread') {
        result = await safeToolProcessor<EffectTools.SetEffectSpreadParams>(EffectTools.setEffectSpread)(task.args as EffectTools.SetEffectSpreadParams);
      }
      if (task.command === 'set-effect-color') {
        result = await safeToolProcessor<EffectTools.SetEffectColorParams>(EffectTools.setEffectColor)(task.args as EffectTools.SetEffectColorParams);
      }
      if (task.command === 'copy-effects') {
        result = await safeToolProcessor<EffectTools.CopyEffectsParams>(EffectTools.copyEffects)(task.args as EffectTools.CopyEffectsParams);
      }
      if (task.command === 'paste-effects') {
        result = await safeToolProcessor<EffectTools.PasteEffectsParams>(EffectTools.pasteEffects)(task.args as EffectTools.PasteEffectsParams);
      }

      // Corner tools
      if (task.command === 'set-all-corners') {
        result = await safeToolProcessor<CornerTools.SetAllCornersParams>(CornerTools.setAllCorners)(task.args as CornerTools.SetAllCornersParams);
      }
      if (task.command === 'set-individual-corners') {
        result = await safeToolProcessor<CornerTools.SetIndividualCornersParams>(CornerTools.setIndividualCorners)(task.args as CornerTools.SetIndividualCornersParams);
      }
      if (task.command === 'set-corner-smoothing') {
        result = await safeToolProcessor<CornerTools.SetCornerSmoothingParams>(CornerTools.setCornerSmoothing)(task.args as CornerTools.SetCornerSmoothingParams);
      }
      if (task.command === 'copy-corners') {
        result = await safeToolProcessor<CornerTools.CopyCornersParams>(CornerTools.copyCorners)(task.args as CornerTools.CopyCornersParams);
      }
      if (task.command === 'reset-corners') {
        result = await safeToolProcessor<CornerTools.ResetCornersParams>(CornerTools.resetCorners)(task.args as CornerTools.ResetCornersParams);
      }
      if (task.command === 'set-top-corners') {
        result = await safeToolProcessor<CornerTools.SetTopCornersParams>(CornerTools.setTopCorners)(task.args as CornerTools.SetTopCornersParams);
      }

      // Text tools
      if (task.command === 'set-text-content') {
        result = await safeToolProcessor<TextTools.SetTextContentParams>(TextTools.setTextContent)(task.args as TextTools.SetTextContentParams);
      }
      if (task.command === 'set-font-family') {
        result = await safeToolProcessor<TextTools.SetFontFamilyParams>(TextTools.setFontFamily)(task.args as TextTools.SetFontFamilyParams);
      }
      if (task.command === 'set-font-size') {
        result = await safeToolProcessor<TextTools.SetFontSizeParams>(TextTools.setFontSize)(task.args as TextTools.SetFontSizeParams);
      }
      if (task.command === 'set-font-weight') {
        result = await safeToolProcessor<TextTools.SetFontWeightParams>(TextTools.setFontWeight)(task.args as TextTools.SetFontWeightParams);
      }
      if (task.command === 'set-text-align') {
        result = await safeToolProcessor<TextTools.SetTextAlignParams>(TextTools.setTextAlign)(task.args as TextTools.SetTextAlignParams);
      }
      if (task.command === 'set-vertical-align') {
        result = await safeToolProcessor<TextTools.SetVerticalAlignParams>(TextTools.setVerticalAlign)(task.args as TextTools.SetVerticalAlignParams);
      }
      if (task.command === 'set-line-height') {
        result = await safeToolProcessor<TextTools.SetLineHeightParams>(TextTools.setLineHeight)(task.args as TextTools.SetLineHeightParams);
      }
      if (task.command === 'set-letter-spacing') {
        result = await safeToolProcessor<TextTools.SetLetterSpacingParams>(TextTools.setLetterSpacing)(task.args as TextTools.SetLetterSpacingParams);
      }
      if (task.command === 'set-paragraph-spacing') {
        result = await safeToolProcessor<TextTools.SetParagraphSpacingParams>(TextTools.setParagraphSpacing)(task.args as TextTools.SetParagraphSpacingParams);
      }
      if (task.command === 'set-text-case') {
        result = await safeToolProcessor<TextTools.SetTextCaseParams>(TextTools.setTextCase)(task.args as TextTools.SetTextCaseParams);
      }
      if (task.command === 'set-text-decoration') {
        result = await safeToolProcessor<TextTools.SetTextDecorationParams>(TextTools.setTextDecoration)(task.args as TextTools.SetTextDecorationParams);
      }
      if (task.command === 'set-text-auto-resize') {
        result = await safeToolProcessor<TextTools.SetTextAutoResizeParams>(TextTools.setTextAutoResize)(task.args as TextTools.SetTextAutoResizeParams);
      }
      if (task.command === 'set-text-truncation') {
        result = await safeToolProcessor<TextTools.SetTextTruncationParams>(TextTools.setTextTruncation)(task.args as TextTools.SetTextTruncationParams);
      }
      if (task.command === 'set-list-type') {
        result = await safeToolProcessor<TextTools.SetListTypeParams>(TextTools.setListType)(task.args as TextTools.SetListTypeParams);
      }
      if (task.command === 'set-hyperlink') {
        result = await safeToolProcessor<TextTools.SetHyperlinkParams>(TextTools.setHyperlink)(task.args as TextTools.SetHyperlinkParams);
      }
      if (task.command === 'set-range-style') {
        result = await safeToolProcessor<TextTools.SetRangeStyleParams>(TextTools.setRangeStyle)(task.args as TextTools.SetRangeStyleParams);
      }
      if (task.command === 'get-available-fonts') {
        result = await safeToolProcessor<TextTools.GetAvailableFontsParams>(TextTools.getAvailableFonts)(task.args as TextTools.GetAvailableFontsParams);
      }
      if (task.command === 'load-font') {
        result = await safeToolProcessor<TextTools.LoadFontParams>(TextTools.loadFont)(task.args as TextTools.LoadFontParams);
      }
      if (task.command === 'get-text-styles') {
        result = await safeToolProcessor<TextTools.GetTextStylesParams>(TextTools.getTextStyles)(task.args as TextTools.GetTextStylesParams);
      }
      if (task.command === 'apply-text-style') {
        result = await safeToolProcessor<TextTools.ApplyTextStyleParams>(TextTools.applyTextStyle)(task.args as TextTools.ApplyTextStyleParams);
      }

      // Component tools
      if (task.command === 'create-component-from-node') {
        result = await safeToolProcessor<ComponentTools.CreateComponentFromNodeParams>(ComponentTools.createComponentFromNode)(task.args as ComponentTools.CreateComponentFromNodeParams);
      }
      if (task.command === 'create-component-set-from-nodes') {
        result = await safeToolProcessor<ComponentTools.CreateComponentSetFromNodesParams>(ComponentTools.createComponentSetFromNodes)(task.args as ComponentTools.CreateComponentSetFromNodesParams);
      }
      if (task.command === 'detach-instance') {
        result = await safeToolProcessor<ComponentTools.DetachInstanceParams>(ComponentTools.detachInstance)(task.args as ComponentTools.DetachInstanceParams);
      }
      if (task.command === 'swap-instance') {
        result = await safeToolProcessor<ComponentTools.SwapInstanceParams>(ComponentTools.swapInstance)(task.args as ComponentTools.SwapInstanceParams);
      }
      if (task.command === 'reset-instance') {
        result = await safeToolProcessor<ComponentTools.ResetInstanceParams>(ComponentTools.resetInstance)(task.args as ComponentTools.ResetInstanceParams);
      }
      if (task.command === 'get-main-component') {
        result = await safeToolProcessor<ComponentTools.GetMainComponentParams>(ComponentTools.getMainComponent)(task.args as ComponentTools.GetMainComponentParams);
      }
      if (task.command === 'get-all-document-components') {
        result = await safeToolProcessor<ComponentTools.GetAllDocumentComponentsParams>(ComponentTools.getAllDocumentComponents)(task.args as ComponentTools.GetAllDocumentComponentsParams);
      }
      if (task.command === 'get-component-overrides') {
        result = await safeToolProcessor<ComponentTools.GetComponentOverridesParams>(ComponentTools.getComponentOverrides)(task.args as ComponentTools.GetComponentOverridesParams);
      }
      if (task.command === 'set-override') {
        result = await safeToolProcessor<ComponentTools.SetOverrideParams>(ComponentTools.setOverride)(task.args as ComponentTools.SetOverrideParams);
      }
      if (task.command === 'publish-component') {
        result = await safeToolProcessor<ComponentTools.PublishComponentParams>(ComponentTools.publishComponent)(task.args as ComponentTools.PublishComponentParams);
      }
      if (task.command === 'create-instance-from-key') {
        result = await safeToolProcessor<ComponentTools.CreateInstanceFromKeyParams>(ComponentTools.createInstanceFromKey)(task.args as ComponentTools.CreateInstanceFromKeyParams);
      }
      if (task.command === 'set-variant-property') {
        result = await safeToolProcessor<ComponentTools.SetVariantPropertyParams>(ComponentTools.setVariantProperty)(task.args as ComponentTools.SetVariantPropertyParams);
      }

      // Style tools
      if (task.command === 'get-all-styles') {
        result = await safeToolProcessor<StyleTools.GetAllStylesParams>(StyleTools.getAllStyles)(task.args as StyleTools.GetAllStylesParams);
      }
      if (task.command === 'get-style-by-id') {
        result = await safeToolProcessor<StyleTools.GetStyleByIdParams>(StyleTools.getStyleById)(task.args as StyleTools.GetStyleByIdParams);
      }
      if (task.command === 'create-color-style') {
        result = await safeToolProcessor<StyleTools.CreateColorStyleParams>(StyleTools.createColorStyle)(task.args as StyleTools.CreateColorStyleParams);
      }
      if (task.command === 'create-text-style') {
        result = await safeToolProcessor<StyleTools.CreateTextStyleParams>(StyleTools.createTextStyle)(task.args as StyleTools.CreateTextStyleParams);
      }
      if (task.command === 'create-effect-style') {
        result = await safeToolProcessor<StyleTools.CreateEffectStyleParams>(StyleTools.createEffectStyle)(task.args as StyleTools.CreateEffectStyleParams);
      }
      if (task.command === 'apply-fill-style') {
        result = await safeToolProcessor<StyleTools.ApplyFillStyleParams>(StyleTools.applyFillStyle)(task.args as StyleTools.ApplyFillStyleParams);
      }
      if (task.command === 'apply-stroke-style') {
        result = await safeToolProcessor<StyleTools.ApplyStrokeStyleParams>(StyleTools.applyStrokeStyle)(task.args as StyleTools.ApplyStrokeStyleParams);
      }
      if (task.command === 'apply-effect-style') {
        result = await safeToolProcessor<StyleTools.ApplyEffectStyleParams>(StyleTools.applyEffectStyle)(task.args as StyleTools.ApplyEffectStyleParams);
      }
      if (task.command === 'apply-grid-style') {
        result = await safeToolProcessor<StyleTools.ApplyGridStyleParams>(StyleTools.applyGridStyle)(task.args as StyleTools.ApplyGridStyleParams);
      }
      if (task.command === 'delete-style') {
        result = await safeToolProcessor<StyleTools.DeleteStyleParams>(StyleTools.deleteStyle)(task.args as StyleTools.DeleteStyleParams);
      }
      if (task.command === 'update-style') {
        result = await safeToolProcessor<StyleTools.UpdateStyleParams>(StyleTools.updateStyle)(task.args as StyleTools.UpdateStyleParams);
      }
      if (task.command === 'detach-style') {
        result = await safeToolProcessor<StyleTools.DetachStyleParams>(StyleTools.detachStyle)(task.args as StyleTools.DetachStyleParams);
      }

      // Variable tools
      if (task.command === 'get-all-variables') {
        result = await safeToolProcessor<VariableTools.GetAllVariablesParams>(VariableTools.getAllVariables)(task.args as VariableTools.GetAllVariablesParams);
      }
      if (task.command === 'get-variable-by-id') {
        result = await safeToolProcessor<VariableTools.GetVariableByIdParams>(VariableTools.getVariableById)(task.args as VariableTools.GetVariableByIdParams);
      }
      if (task.command === 'get-variable-collections') {
        result = await safeToolProcessor<VariableTools.GetVariableCollectionsParams>(VariableTools.getVariableCollections)(task.args as VariableTools.GetVariableCollectionsParams);
      }
      if (task.command === 'create-variable') {
        result = await safeToolProcessor<VariableTools.CreateVariableParams>(VariableTools.createVariable)(task.args as VariableTools.CreateVariableParams);
      }
      if (task.command === 'set-variable-value') {
        result = await safeToolProcessor<VariableTools.SetVariableValueParams>(VariableTools.setVariableValue)(task.args as VariableTools.SetVariableValueParams);
      }
      if (task.command === 'bind-variable-to-node') {
        result = await safeToolProcessor<VariableTools.BindVariableToNodeParams>(VariableTools.bindVariableToNode)(task.args as VariableTools.BindVariableToNodeParams);
      }
      if (task.command === 'unbind-variable-from-node') {
        result = await safeToolProcessor<VariableTools.UnbindVariableFromNodeParams>(VariableTools.unbindVariableFromNode)(task.args as VariableTools.UnbindVariableFromNodeParams);
      }
      if (task.command === 'get-bound-variables') {
        result = await safeToolProcessor<VariableTools.GetBoundVariablesParams>(VariableTools.getBoundVariables)(task.args as VariableTools.GetBoundVariablesParams);
      }
      if (task.command === 'create-variable-collection') {
        result = await safeToolProcessor<VariableTools.CreateVariableCollectionParams>(VariableTools.createVariableCollection)(task.args as VariableTools.CreateVariableCollectionParams);
      }
      if (task.command === 'delete-variable') {
        result = await safeToolProcessor<VariableTools.DeleteVariableParams>(VariableTools.deleteVariable)(task.args as VariableTools.DeleteVariableParams);
      }

      // Constraint tools
      if (task.command === 'set-horizontal-constraint') {
        result = await safeToolProcessor<ConstraintTools.SetHorizontalConstraintParams>(ConstraintTools.setHorizontalConstraint)(task.args as ConstraintTools.SetHorizontalConstraintParams);
      }
      if (task.command === 'set-vertical-constraint') {
        result = await safeToolProcessor<ConstraintTools.SetVerticalConstraintParams>(ConstraintTools.setVerticalConstraint)(task.args as ConstraintTools.SetVerticalConstraintParams);
      }
      if (task.command === 'set-constraints') {
        result = await safeToolProcessor<ConstraintTools.SetConstraintsParams>(ConstraintTools.setConstraints)(task.args as ConstraintTools.SetConstraintsParams);
      }
      if (task.command === 'reset-constraints') {
        result = await safeToolProcessor<ConstraintTools.ResetConstraintsParams>(ConstraintTools.resetConstraints)(task.args as ConstraintTools.ResetConstraintsParams);
      }
      if (task.command === 'set-constraint-proportions') {
        result = await safeToolProcessor<ConstraintTools.SetConstraintProportionsParams>(ConstraintTools.setConstraintProportions)(task.args as ConstraintTools.SetConstraintProportionsParams);
      }
      if (task.command === 'get-constraints') {
        result = await safeToolProcessor<ConstraintTools.GetConstraintsParams>(ConstraintTools.getConstraints)(task.args as ConstraintTools.GetConstraintsParams);
      }

      // Z-Order tools
      if (task.command === 'bring-to-front') {
        result = await safeToolProcessor<ZOrderTools.BringToFrontParams>(ZOrderTools.bringToFront)(task.args as ZOrderTools.BringToFrontParams);
      }
      if (task.command === 'send-to-back') {
        result = await safeToolProcessor<ZOrderTools.SendToBackParams>(ZOrderTools.sendToBack)(task.args as ZOrderTools.SendToBackParams);
      }
      if (task.command === 'bring-forward') {
        result = await safeToolProcessor<ZOrderTools.BringForwardParams>(ZOrderTools.bringForward)(task.args as ZOrderTools.BringForwardParams);
      }
      if (task.command === 'send-backward') {
        result = await safeToolProcessor<ZOrderTools.SendBackwardParams>(ZOrderTools.sendBackward)(task.args as ZOrderTools.SendBackwardParams);
      }
      if (task.command === 'move-to-index') {
        result = await safeToolProcessor<ZOrderTools.MoveToIndexParams>(ZOrderTools.moveToIndex)(task.args as ZOrderTools.MoveToIndexParams);
      }
      if (task.command === 'get-z-index') {
        result = await safeToolProcessor<ZOrderTools.GetZIndexParams>(ZOrderTools.getZIndex)(task.args as ZOrderTools.GetZIndexParams);
      }
      if (task.command === 'sort-children-by-name') {
        result = await safeToolProcessor<ZOrderTools.SortChildrenByNameParams>(ZOrderTools.sortChildrenByName)(task.args as ZOrderTools.SortChildrenByNameParams);
      }
      if (task.command === 'reverse-child-order') {
        result = await safeToolProcessor<ZOrderTools.ReverseChildOrderParams>(ZOrderTools.reverseChildOrder)(task.args as ZOrderTools.ReverseChildOrderParams);
      }

      // Page tools
      if (task.command === 'get-document-pages') {
        result = await safeToolProcessor<PageTools.GetDocumentPagesParams>(PageTools.getDocumentPages)(task.args as PageTools.GetDocumentPagesParams);
      }
      if (task.command === 'create-page') {
        result = await safeToolProcessor<PageTools.CreatePageParams>(PageTools.createPage)(task.args as PageTools.CreatePageParams);
      }
      if (task.command === 'delete-page') {
        result = await safeToolProcessor<PageTools.DeletePageParams>(PageTools.deletePage)(task.args as PageTools.DeletePageParams);
      }
      if (task.command === 'rename-page') {
        result = await safeToolProcessor<PageTools.RenamePageParams>(PageTools.renamePage)(task.args as PageTools.RenamePageParams);
      }
      if (task.command === 'duplicate-page') {
        result = await safeToolProcessor<PageTools.DuplicatePageParams>(PageTools.duplicatePage)(task.args as PageTools.DuplicatePageParams);
      }
      if (task.command === 'set-current-page') {
        result = await safeToolProcessor<PageTools.SetCurrentPageParams>(PageTools.setCurrentPage)(task.args as PageTools.SetCurrentPageParams);
      }

      // Selection tools
      if (task.command === 'set-selection') {
        result = await safeToolProcessor<SelectionTools.SetSelectionParams>(SelectionTools.setSelection)(task.args as SelectionTools.SetSelectionParams);
      }
      if (task.command === 'add-to-selection') {
        result = await safeToolProcessor<SelectionTools.AddToSelectionParams>(SelectionTools.addToSelection)(task.args as SelectionTools.AddToSelectionParams);
      }
      if (task.command === 'remove-from-selection') {
        result = await safeToolProcessor<SelectionTools.RemoveFromSelectionParams>(SelectionTools.removeFromSelection)(task.args as SelectionTools.RemoveFromSelectionParams);
      }
      if (task.command === 'clear-selection') {
        result = await safeToolProcessor<SelectionTools.ClearSelectionParams>(SelectionTools.clearSelection)(task.args as SelectionTools.ClearSelectionParams);
      }
      if (task.command === 'select-all-on-page') {
        result = await safeToolProcessor<SelectionTools.SelectAllOnPageParams>(SelectionTools.selectAllOnPage)(task.args as SelectionTools.SelectAllOnPageParams);
      }
      if (task.command === 'select-children') {
        result = await safeToolProcessor<SelectionTools.SelectChildrenParams>(SelectionTools.selectChildren)(task.args as SelectionTools.SelectChildrenParams);
      }
      if (task.command === 'zoom-to-selection') {
        result = await safeToolProcessor<SelectionTools.ZoomToSelectionParams>(SelectionTools.zoomToSelection)(task.args as SelectionTools.ZoomToSelectionParams);
      }
      if (task.command === 'zoom-to-node') {
        result = await safeToolProcessor<SelectionTools.ZoomToNodeParams>(SelectionTools.zoomToNode)(task.args as SelectionTools.ZoomToNodeParams);
      }
      if (task.command === 'zoom-to-fit') {
        result = await safeToolProcessor<SelectionTools.ZoomToFitParams>(SelectionTools.zoomToFit)(task.args as SelectionTools.ZoomToFitParams);
      }
      if (task.command === 'scroll-into-view') {
        result = await safeToolProcessor<SelectionTools.ScrollIntoViewParams>(SelectionTools.scrollIntoView)(task.args as SelectionTools.ScrollIntoViewParams);
      }

      // Export tools
      if (task.command === 'export-png') {
        result = await safeToolProcessor<ExportTools.ExportPngParams>(ExportTools.exportPng)(task.args as ExportTools.ExportPngParams);
      }
      if (task.command === 'export-svg') {
        result = await safeToolProcessor<ExportTools.ExportSvgParams>(ExportTools.exportSvg)(task.args as ExportTools.ExportSvgParams);
      }
      if (task.command === 'export-jpg') {
        result = await safeToolProcessor<ExportTools.ExportJpgParams>(ExportTools.exportJpg)(task.args as ExportTools.ExportJpgParams);
      }
      if (task.command === 'export-pdf') {
        result = await safeToolProcessor<ExportTools.ExportPdfParams>(ExportTools.exportPdf)(task.args as ExportTools.ExportPdfParams);
      }
      if (task.command === 'export-webp') {
        result = await safeToolProcessor<ExportTools.ExportWebpParams>(ExportTools.exportWebp)(task.args as ExportTools.ExportWebpParams);
      }
      if (task.command === 'batch-export') {
        result = await safeToolProcessor<ExportTools.BatchExportParams>(ExportTools.batchExport)(task.args as ExportTools.BatchExportParams);
      }
      if (task.command === 'get-export-settings') {
        result = await safeToolProcessor<ExportTools.GetExportSettingsParams>(ExportTools.getExportSettings)(task.args as ExportTools.GetExportSettingsParams);
      }
      if (task.command === 'set-export-settings') {
        result = await safeToolProcessor<ExportTools.SetExportSettingsParams>(ExportTools.setExportSettings)(task.args as ExportTools.SetExportSettingsParams);
      }

      // Search tools
      if (task.command === 'find-by-name') {
        result = await safeToolProcessor<SearchTools.FindByNameParams>(SearchTools.findByName)(task.args as SearchTools.FindByNameParams);
      }
      if (task.command === 'find-by-type') {
        result = await safeToolProcessor<SearchTools.FindByTypeParams>(SearchTools.findByType)(task.args as SearchTools.FindByTypeParams);
      }
      if (task.command === 'find-by-style') {
        result = await safeToolProcessor<SearchTools.FindByStyleParams>(SearchTools.findByStyle)(task.args as SearchTools.FindByStyleParams);
      }
      if (task.command === 'find-by-color') {
        result = await safeToolProcessor<SearchTools.FindByColorParams>(SearchTools.findByColor)(task.args as SearchTools.FindByColorParams);
      }
      if (task.command === 'find-by-text-content') {
        result = await safeToolProcessor<SearchTools.FindByTextContentParams>(SearchTools.findByTextContent)(task.args as SearchTools.FindByTextContentParams);
      }
      if (task.command === 'find-instances-of-component') {
        result = await safeToolProcessor<SearchTools.FindInstancesOfComponentParams>(SearchTools.findInstancesOfComponent)(task.args as SearchTools.FindInstancesOfComponentParams);
      }
      if (task.command === 'find-all-with-property') {
        result = await safeToolProcessor<SearchTools.FindAllWithPropertyParams>(SearchTools.findAllWithProperty)(task.args as SearchTools.FindAllWithPropertyParams);
      }
      if (task.command === 'find-empty-frames') {
        result = await safeToolProcessor<SearchTools.FindEmptyFramesParams>(SearchTools.findEmptyFrames)(task.args as SearchTools.FindEmptyFramesParams);
      }

      // Clipboard tools
      if (task.command === 'duplicate-node') {
        result = await safeToolProcessor<ClipboardTools.DuplicateNodeParams>(ClipboardTools.duplicateNode)(task.args as ClipboardTools.DuplicateNodeParams);
      }
      if (task.command === 'copy-properties') {
        result = await safeToolProcessor<ClipboardTools.CopyPropertiesParams>(ClipboardTools.copyProperties)(task.args as ClipboardTools.CopyPropertiesParams);
      }
      if (task.command === 'get-css') {
        result = await safeToolProcessor<ClipboardTools.GetCssParams>(ClipboardTools.getCss)(task.args as ClipboardTools.GetCssParams);
      }
      if (task.command === 'get-svg-code') {
        result = await safeToolProcessor<ClipboardTools.GetSvgCodeParams>(ClipboardTools.getSvgCode)(task.args as ClipboardTools.GetSvgCodeParams);
      }
      if (task.command === 'clone-to-location') {
        result = await safeToolProcessor<ClipboardTools.CloneToLocationParams>(ClipboardTools.cloneToLocation)(task.args as ClipboardTools.CloneToLocationParams);
      }
      if (task.command === 'copy-node-across-pages') {
        result = await safeToolProcessor<ClipboardTools.CopyNodeAcrossPagesParams>(ClipboardTools.copyNodeAcrossPages)(task.args as ClipboardTools.CopyNodeAcrossPagesParams);
      }

      // DocInfo tools
      if (task.command === 'get-document-info') {
        result = await safeToolProcessor<DocInfoTools.GetDocumentInfoParams>(DocInfoTools.getDocumentInfo)(task.args as DocInfoTools.GetDocumentInfoParams);
      }
      if (task.command === 'get-current-user') {
        result = await safeToolProcessor<DocInfoTools.GetCurrentUserParams>(DocInfoTools.getCurrentUser)(task.args as DocInfoTools.GetCurrentUserParams);
      }
      if (task.command === 'get-viewport') {
        result = await safeToolProcessor<DocInfoTools.GetViewportParams>(DocInfoTools.getViewport)(task.args as DocInfoTools.GetViewportParams);
      }
      if (task.command === 'set-viewport') {
        result = await safeToolProcessor<DocInfoTools.SetViewportParams>(DocInfoTools.setViewport)(task.args as DocInfoTools.SetViewportParams);
      }
      if (task.command === 'notify') {
        result = await safeToolProcessor<DocInfoTools.NotifyParams>(DocInfoTools.notify)(task.args as DocInfoTools.NotifyParams);
      }

      // File Ops tools
      if (task.command === 'set-text-from-file') {
        result = await safeToolProcessor<FileOpsTools.SetTextFromFileParams>(FileOpsTools.setTextFromFile)(task.args as FileOpsTools.SetTextFromFileParams);
      }
      if (task.command === 'import-svg') {
        result = await safeToolProcessor<FileOpsTools.ImportSvgParams>(FileOpsTools.importSvg)(task.args as FileOpsTools.ImportSvgParams);
      }
      if (task.command === 'import-json-data') {
        result = await safeToolProcessor<FileOpsTools.ImportJsonDataParams>(FileOpsTools.importJsonData)(task.args as FileOpsTools.ImportJsonDataParams);
      }
      if (task.command === 'export-to-json') {
        result = await safeToolProcessor<FileOpsTools.ExportToJsonParams>(FileOpsTools.exportToJson)(task.args as FileOpsTools.ExportToJsonParams);
      }
      if (task.command === 'bulk-update-text') {
        result = await safeToolProcessor<FileOpsTools.BulkUpdateTextParams>(FileOpsTools.bulkUpdateText)(task.args as FileOpsTools.BulkUpdateTextParams);
      }
      if (task.command === 'set-plugin-data') {
        result = await safeToolProcessor<FileOpsTools.SetPluginDataParams>(FileOpsTools.setPluginData)(task.args as FileOpsTools.SetPluginDataParams);
      }
      if (task.command === 'get-plugin-data') {
        result = await safeToolProcessor<FileOpsTools.GetPluginDataParams>(FileOpsTools.getPluginData)(task.args as FileOpsTools.GetPluginDataParams);
      }

      // File Lock tools (agent coordination)
      if (task.command === 'acquire-file-lock') {
        result = await safeToolProcessor<FileLockTools.AcquireFileLockParams>(FileLockTools.acquireFileLock)(task.args as FileLockTools.AcquireFileLockParams);
      }
      if (task.command === 'release-file-lock') {
        result = await safeToolProcessor<FileLockTools.ReleaseFileLockParams>(FileLockTools.releaseFileLock)(task.args as FileLockTools.ReleaseFileLockParams);
      }
      if (task.command === 'acquire-context-lock') {
        result = await safeToolProcessor<FileLockTools.AcquireContextLockParams>(FileLockTools.acquireContextLock)(task.args as FileLockTools.AcquireContextLockParams);
      }
      if (task.command === 'release-context-lock') {
        result = await safeToolProcessor<FileLockTools.ReleaseContextLockParams>(FileLockTools.releaseContextLock)(task.args as FileLockTools.ReleaseContextLockParams);
      }
      if (task.command === 'release-all-locks') {
        result = await safeToolProcessor<FileLockTools.ReleaseAllLocksParams>(FileLockTools.releaseAllLocks)(task.args as FileLockTools.ReleaseAllLocksParams);
      }
      if (task.command === 'get-lock-status') {
        result = await safeToolProcessor<FileLockTools.GetLockStatusParams>(FileLockTools.getLockStatus)(task.args as FileLockTools.GetLockStatusParams);
      }

      // Design Thinking tools
      if (task.command === 'create-persona') {
        result = await safeToolProcessor<DesignThinkingTools.CreatePersonaParams>(DesignThinkingTools.createPersona)(task.args as DesignThinkingTools.CreatePersonaParams);
      }
      if (task.command === 'create-journey-map') {
        result = await safeToolProcessor<DesignThinkingTools.CreateJourneyMapParams>(DesignThinkingTools.createJourneyMap)(task.args as DesignThinkingTools.CreateJourneyMapParams);
      }
      if (task.command === 'create-empathy-map') {
        result = await safeToolProcessor<DesignThinkingTools.CreateEmpathyMapParams>(DesignThinkingTools.createEmpathyMap)(task.args as DesignThinkingTools.CreateEmpathyMapParams);
      }
      if (task.command === 'create-user-story') {
        result = await safeToolProcessor<DesignThinkingTools.CreateUserStoryParams>(DesignThinkingTools.createUserStory)(task.args as DesignThinkingTools.CreateUserStoryParams);
      }
      if (task.command === 'create-wireframe') {
        result = await safeToolProcessor<DesignThinkingTools.CreateWireframeParams>(DesignThinkingTools.createWireframe)(task.args as DesignThinkingTools.CreateWireframeParams);
      }
      if (task.command === 'create-sitemap') {
        result = await safeToolProcessor<DesignThinkingTools.CreateSitemapParams>(DesignThinkingTools.createSitemap)(task.args as DesignThinkingTools.CreateSitemapParams);
      }
      if (task.command === 'create-flow-diagram') {
        result = await safeToolProcessor<DesignThinkingTools.CreateFlowDiagramParams>(DesignThinkingTools.createFlowDiagram)(task.args as DesignThinkingTools.CreateFlowDiagramParams);
      }
      if (task.command === 'create-affinity-diagram') {
        result = await safeToolProcessor<DesignThinkingTools.CreateAffinityDiagramParams>(DesignThinkingTools.createAffinityDiagram)(task.args as DesignThinkingTools.CreateAffinityDiagramParams);
      }
      if (task.command === 'create-mood-board') {
        result = await safeToolProcessor<DesignThinkingTools.CreateMoodBoardParams>(DesignThinkingTools.createMoodBoard)(task.args as DesignThinkingTools.CreateMoodBoardParams);
      }
      if (task.command === 'create-style-tile') {
        result = await safeToolProcessor<DesignThinkingTools.CreateStyleTileParams>(DesignThinkingTools.createStyleTile)(task.args as DesignThinkingTools.CreateStyleTileParams);
      }
      if (task.command === 'create-storyboard') {
        result = await safeToolProcessor<DesignThinkingTools.CreateStoryboardParams>(DesignThinkingTools.createStoryboard)(task.args as DesignThinkingTools.CreateStoryboardParams);
      }
      if (task.command === 'create-competitive-analysis') {
        result = await safeToolProcessor<DesignThinkingTools.CreateCompetitiveAnalysisParams>(DesignThinkingTools.createCompetitiveAnalysis)(task.args as DesignThinkingTools.CreateCompetitiveAnalysisParams);
      }
      if (task.command === 'create-value-proposition') {
        result = await safeToolProcessor<DesignThinkingTools.CreateValuePropositionParams>(DesignThinkingTools.createValueProposition)(task.args as DesignThinkingTools.CreateValuePropositionParams);
      }
      if (task.command === 'create-feature-prioritization') {
        result = await safeToolProcessor<DesignThinkingTools.CreateFeaturePrioritizationParams>(DesignThinkingTools.createFeaturePrioritization)(task.args as DesignThinkingTools.CreateFeaturePrioritizationParams);
      }
      if (task.command === 'create-usability-test-plan') {
        result = await safeToolProcessor<DesignThinkingTools.CreateUsabilityTestPlanParams>(DesignThinkingTools.createUsabilityTestPlan)(task.args as DesignThinkingTools.CreateUsabilityTestPlanParams);
      }
      if (task.command === 'create-design-sprint') {
        result = await safeToolProcessor<DesignThinkingTools.CreateDesignSprintParams>(DesignThinkingTools.createDesignSprint)(task.args as DesignThinkingTools.CreateDesignSprintParams);
      }
      if (task.command === 'create-how-might-we') {
        result = await safeToolProcessor<DesignThinkingTools.CreateHowMightWeParams>(DesignThinkingTools.createHowMightWe)(task.args as DesignThinkingTools.CreateHowMightWeParams);
      }
      if (task.command === 'create-crazy-eights') {
        result = await safeToolProcessor<DesignThinkingTools.CreateCrazyEightsParams>(DesignThinkingTools.createCrazyEights)(task.args as DesignThinkingTools.CreateCrazyEightsParams);
      }
      if (task.command === 'create-stakeholder-map') {
        result = await safeToolProcessor<DesignThinkingTools.CreateStakeholderMapParams>(DesignThinkingTools.createStakeholderMap)(task.args as DesignThinkingTools.CreateStakeholderMapParams);
      }
      if (task.command === 'create-service-blueprint') {
        result = await safeToolProcessor<DesignThinkingTools.CreateServiceBlueprintParams>(DesignThinkingTools.createServiceBlueprint)(task.args as DesignThinkingTools.CreateServiceBlueprintParams);
      }
      if (task.command === 'create-jobs-to-be-done') {
        result = await safeToolProcessor<DesignThinkingTools.CreateJobsToBeDoneParams>(DesignThinkingTools.createJobsToBeDone)(task.args as DesignThinkingTools.CreateJobsToBeDoneParams);
      }
      if (task.command === 'create-task-analysis') {
        result = await safeToolProcessor<DesignThinkingTools.CreateTaskAnalysisParams>(DesignThinkingTools.createTaskAnalysis)(task.args as DesignThinkingTools.CreateTaskAnalysisParams);
      }
      if (task.command === 'create-five-whys') {
        result = await safeToolProcessor<DesignThinkingTools.CreateFiveWhysParams>(DesignThinkingTools.createFiveWhys)(task.args as DesignThinkingTools.CreateFiveWhysParams);
      }
      if (task.command === 'create-assumption-mapping') {
        result = await safeToolProcessor<DesignThinkingTools.CreateAssumptionMappingParams>(DesignThinkingTools.createAssumptionMapping)(task.args as DesignThinkingTools.CreateAssumptionMappingParams);
      }
      if (task.command === 'create-interview-guide') {
        result = await safeToolProcessor<DesignThinkingTools.CreateInterviewGuideParams>(DesignThinkingTools.createInterviewGuide)(task.args as DesignThinkingTools.CreateInterviewGuideParams);
      }
      if (task.command === 'create-survey') {
        result = await safeToolProcessor<DesignThinkingTools.CreateSurveyParams>(DesignThinkingTools.createSurvey)(task.args as DesignThinkingTools.CreateSurveyParams);
      }
      if (task.command === 'create-card-sort-results') {
        result = await safeToolProcessor<DesignThinkingTools.CreateCardSortResultsParams>(DesignThinkingTools.createCardSortResults)(task.args as DesignThinkingTools.CreateCardSortResultsParams);
      }
      if (task.command === 'create-tree-test-results') {
        result = await safeToolProcessor<DesignThinkingTools.CreateTreeTestResultsParams>(DesignThinkingTools.createTreeTestResults)(task.args as DesignThinkingTools.CreateTreeTestResultsParams);
      }
      if (task.command === 'create-a11y-annotations') {
        result = await safeToolProcessor<DesignThinkingTools.CreateA11yAnnotationsParams>(DesignThinkingTools.createA11yAnnotations)(task.args as DesignThinkingTools.CreateA11yAnnotationsParams);
      }
      if (task.command === 'create-design-tokens') {
        result = await safeToolProcessor<DesignThinkingTools.CreateDesignTokensParams>(DesignThinkingTools.createDesignTokens)(task.args as DesignThinkingTools.CreateDesignTokensParams);
      }
      if (task.command === 'create-component-doc') {
        result = await safeToolProcessor<DesignThinkingTools.CreateComponentDocParams>(DesignThinkingTools.createComponentDoc)(task.args as DesignThinkingTools.CreateComponentDocParams);
      }
      if (task.command === 'create-use-case-diagram') {
        result = await safeToolProcessor<DesignThinkingTools.CreateUseCaseDiagramParams>(DesignThinkingTools.createUseCaseDiagram)(task.args as DesignThinkingTools.CreateUseCaseDiagramParams);
      }
      if (task.command === 'create-timeline') {
        result = await safeToolProcessor<DesignThinkingTools.CreateTimelineParams>(DesignThinkingTools.createTimeline)(task.args as DesignThinkingTools.CreateTimelineParams);
      }
      if (task.command === 'create-progress-tracker') {
        result = await safeToolProcessor<DesignThinkingTools.CreateProgressTrackerParams>(DesignThinkingTools.createProgressTracker)(task.args as DesignThinkingTools.CreateProgressTrackerParams);
      }
      if (task.command === 'create-kanban-board') {
        result = await safeToolProcessor<DesignThinkingTools.CreateKanbanBoardParams>(DesignThinkingTools.createKanbanBoard)(task.args as DesignThinkingTools.CreateKanbanBoardParams);
      }
      if (task.command === 'create-retro') {
        result = await safeToolProcessor<DesignThinkingTools.CreateRetroParams>(DesignThinkingTools.createRetro)(task.args as DesignThinkingTools.CreateRetroParams);
      }
      if (task.command === 'create-swot-analysis') {
        result = await safeToolProcessor<DesignThinkingTools.CreateSwotAnalysisParams>(DesignThinkingTools.createSwotAnalysis)(task.args as DesignThinkingTools.CreateSwotAnalysisParams);
      }
      if (task.command === 'create-brainstorm') {
        result = await safeToolProcessor<DesignThinkingTools.CreateBrainstormParams>(DesignThinkingTools.createBrainstorm)(task.args as DesignThinkingTools.CreateBrainstormParams);
      }
      if (task.command === 'create-decision-matrix') {
        result = await safeToolProcessor<DesignThinkingTools.CreateDecisionMatrixParams>(DesignThinkingTools.createDecisionMatrix)(task.args as DesignThinkingTools.CreateDecisionMatrixParams);
      }
      if (task.command === 'create-mvp-definition') {
        result = await safeToolProcessor<DesignThinkingTools.CreateMvpDefinitionParams>(DesignThinkingTools.createMvpDefinition)(task.args as DesignThinkingTools.CreateMvpDefinitionParams);
      }
      if (task.command === 'create-roadmap') {
        result = await safeToolProcessor<DesignThinkingTools.CreateRoadmapParams>(DesignThinkingTools.createRoadmap)(task.args as DesignThinkingTools.CreateRoadmapParams);
      }
      if (task.command === 'create-release-plan') {
        result = await safeToolProcessor<DesignThinkingTools.CreateReleasePlanParams>(DesignThinkingTools.createReleasePlan)(task.args as DesignThinkingTools.CreateReleasePlanParams);
      }

      // UI Pattern tools
      if (task.command === 'create-navbar') {
        result = await safeToolProcessor<UIPatternTools.CreateNavbarParams>(UIPatternTools.createNavbar)(task.args as UIPatternTools.CreateNavbarParams);
      }
      if (task.command === 'create-sidebar') {
        result = await safeToolProcessor<UIPatternTools.CreateSidebarParams>(UIPatternTools.createSidebar)(task.args as UIPatternTools.CreateSidebarParams);
      }
      if (task.command === 'create-tabs') {
        result = await safeToolProcessor<UIPatternTools.CreateTabsParams>(UIPatternTools.createTabs)(task.args as UIPatternTools.CreateTabsParams);
      }
      if (task.command === 'create-breadcrumbs') {
        result = await safeToolProcessor<UIPatternTools.CreateBreadcrumbsParams>(UIPatternTools.createBreadcrumbs)(task.args as UIPatternTools.CreateBreadcrumbsParams);
      }
      if (task.command === 'create-pagination') {
        result = await safeToolProcessor<UIPatternTools.CreatePaginationParams>(UIPatternTools.createPagination)(task.args as UIPatternTools.CreatePaginationParams);
      }
      if (task.command === 'create-stepper') {
        result = await safeToolProcessor<UIPatternTools.CreateStepperParams>(UIPatternTools.createStepper)(task.args as UIPatternTools.CreateStepperParams);
      }
      if (task.command === 'create-card') {
        result = await safeToolProcessor<UIPatternTools.CreateCardParams>(UIPatternTools.createCard)(task.args as UIPatternTools.CreateCardParams);
      }
      if (task.command === 'create-hero-section') {
        result = await safeToolProcessor<UIPatternTools.CreateHeroSectionParams>(UIPatternTools.createHeroSection)(task.args as UIPatternTools.CreateHeroSectionParams);
      }
      if (task.command === 'create-testimonial') {
        result = await safeToolProcessor<UIPatternTools.CreateTestimonialParams>(UIPatternTools.createTestimonial)(task.args as UIPatternTools.CreateTestimonialParams);
      }
      if (task.command === 'create-feature-grid') {
        result = await safeToolProcessor<UIPatternTools.CreateFeatureGridParams>(UIPatternTools.createFeatureGrid)(task.args as UIPatternTools.CreateFeatureGridParams);
      }
      if (task.command === 'create-pricing-card') {
        result = await safeToolProcessor<UIPatternTools.CreatePricingCardParams>(UIPatternTools.createPricingCard)(task.args as UIPatternTools.CreatePricingCardParams);
      }
      if (task.command === 'create-form-field') {
        result = await safeToolProcessor<UIPatternTools.CreateFormFieldParams>(UIPatternTools.createFormField)(task.args as UIPatternTools.CreateFormFieldParams);
      }
      if (task.command === 'create-button') {
        result = await safeToolProcessor<UIPatternTools.CreateButtonParams>(UIPatternTools.createButton)(task.args as UIPatternTools.CreateButtonParams);
      }
      if (task.command === 'create-checkbox') {
        result = await safeToolProcessor<UIPatternTools.CreateCheckboxParams>(UIPatternTools.createCheckbox)(task.args as UIPatternTools.CreateCheckboxParams);
      }
      if (task.command === 'create-radio-group') {
        result = await safeToolProcessor<UIPatternTools.CreateRadioGroupParams>(UIPatternTools.createRadioGroup)(task.args as UIPatternTools.CreateRadioGroupParams);
      }
      if (task.command === 'create-toggle') {
        result = await safeToolProcessor<UIPatternTools.CreateToggleParams>(UIPatternTools.createToggle)(task.args as UIPatternTools.CreateToggleParams);
      }
      if (task.command === 'create-table') {
        result = await safeToolProcessor<UIPatternTools.CreateTableParams>(UIPatternTools.createTable)(task.args as UIPatternTools.CreateTableParams);
      }
      if (task.command === 'create-list-item') {
        result = await safeToolProcessor<UIPatternTools.CreateListItemParams>(UIPatternTools.createListItem)(task.args as UIPatternTools.CreateListItemParams);
      }
      if (task.command === 'create-badge') {
        result = await safeToolProcessor<UIPatternTools.CreateBadgeParams>(UIPatternTools.createBadge)(task.args as UIPatternTools.CreateBadgeParams);
      }
      if (task.command === 'create-avatar') {
        result = await safeToolProcessor<UIPatternTools.CreateAvatarParams>(UIPatternTools.createAvatar)(task.args as UIPatternTools.CreateAvatarParams);
      }
      if (task.command === 'create-progress-bar') {
        result = await safeToolProcessor<UIPatternTools.CreateProgressBarParams>(UIPatternTools.createProgressBar)(task.args as UIPatternTools.CreateProgressBarParams);
      }
      if (task.command === 'create-alert') {
        result = await safeToolProcessor<UIPatternTools.CreateAlertParams>(UIPatternTools.createAlert)(task.args as UIPatternTools.CreateAlertParams);
      }
      if (task.command === 'create-toast') {
        result = await safeToolProcessor<UIPatternTools.CreateToastParams>(UIPatternTools.createToast)(task.args as UIPatternTools.CreateToastParams);
      }
      if (task.command === 'create-modal') {
        result = await safeToolProcessor<UIPatternTools.CreateModalParams>(UIPatternTools.createModal)(task.args as UIPatternTools.CreateModalParams);
      }
      if (task.command === 'create-tooltip') {
        result = await safeToolProcessor<UIPatternTools.CreateTooltipParams>(UIPatternTools.createTooltip)(task.args as UIPatternTools.CreateTooltipParams);
      }
      if (task.command === 'create-spinner') {
        result = await safeToolProcessor<UIPatternTools.CreateSpinnerParams>(UIPatternTools.createSpinner)(task.args as UIPatternTools.CreateSpinnerParams);
      }
      if (task.command === 'create-skeleton') {
        result = await safeToolProcessor<UIPatternTools.CreateSkeletonParams>(UIPatternTools.createSkeleton)(task.args as UIPatternTools.CreateSkeletonParams);
      }
      if (task.command === 'create-empty-state') {
        result = await safeToolProcessor<UIPatternTools.CreateEmptyStateParams>(UIPatternTools.createEmptyState)(task.args as UIPatternTools.CreateEmptyStateParams);
      }
      if (task.command === 'create-dropdown') {
        result = await safeToolProcessor<UIPatternTools.CreateDropdownParams>(UIPatternTools.createDropdown)(task.args as UIPatternTools.CreateDropdownParams);
      }
      if (task.command === 'create-search-bar') {
        result = await safeToolProcessor<UIPatternTools.CreateSearchBarParams>(UIPatternTools.createSearchBar)(task.args as UIPatternTools.CreateSearchBarParams);
      }
      if (task.command === 'create-date-picker') {
        result = await safeToolProcessor<UIPatternTools.CreateDatePickerParams>(UIPatternTools.createDatePicker)(task.args as UIPatternTools.CreateDatePickerParams);
      }
      if (task.command === 'create-slider') {
        result = await safeToolProcessor<UIPatternTools.CreateSliderParams>(UIPatternTools.createSlider)(task.args as UIPatternTools.CreateSliderParams);
      }
      if (task.command === 'create-footer') {
        result = await safeToolProcessor<UIPatternTools.CreateFooterParams>(UIPatternTools.createFooter)(task.args as UIPatternTools.CreateFooterParams);
      }
      if (task.command === 'create-accordion') {
        result = await safeToolProcessor<UIPatternTools.CreateAccordionParams>(UIPatternTools.createAccordion)(task.args as UIPatternTools.CreateAccordionParams);
      }
      if (task.command === 'create-carousel') {
        result = await safeToolProcessor<UIPatternTools.CreateCarouselParams>(UIPatternTools.createCarousel)(task.args as UIPatternTools.CreateCarouselParams);
      }
      if (task.command === 'create-masonry-grid') {
        result = await safeToolProcessor<UIPatternTools.CreateMasonryGridParams>(UIPatternTools.createMasonryGrid)(task.args as UIPatternTools.CreateMasonryGridParams);
      }
      if (task.command === 'create-timeline-ui') {
        result = await safeToolProcessor<UIPatternTools.CreateTimelineParams>(UIPatternTools.createTimelineUI)(task.args as UIPatternTools.CreateTimelineParams);
      }
      if (task.command === 'create-rating') {
        result = await safeToolProcessor<UIPatternTools.CreateRatingParams>(UIPatternTools.createRating)(task.args as UIPatternTools.CreateRatingParams);
      }
      if (task.command === 'create-tag-input') {
        result = await safeToolProcessor<UIPatternTools.CreateTagInputParams>(UIPatternTools.createTagInput)(task.args as UIPatternTools.CreateTagInputParams);
      }
      if (task.command === 'create-file-upload') {
        result = await safeToolProcessor<UIPatternTools.CreateFileUploadParams>(UIPatternTools.createFileUpload)(task.args as UIPatternTools.CreateFileUploadParams);
      }
      if (task.command === 'create-avatar-group') {
        result = await safeToolProcessor<UIPatternTools.CreateAvatarGroupParams>(UIPatternTools.createAvatarGroup)(task.args as UIPatternTools.CreateAvatarGroupParams);
      }
      if (task.command === 'create-stats-card') {
        result = await safeToolProcessor<UIPatternTools.CreateStatsCardParams>(UIPatternTools.createStatsCard)(task.args as UIPatternTools.CreateStatsCardParams);
      }
      if (task.command === 'create-chart-placeholder') {
        result = await safeToolProcessor<UIPatternTools.CreateChartPlaceholderParams>(UIPatternTools.createChartPlaceholder)(task.args as UIPatternTools.CreateChartPlaceholderParams);
      }
      if (task.command === 'create-notification-badge') {
        result = await safeToolProcessor<UIPatternTools.CreateNotificationBadgeParams>(UIPatternTools.createNotificationBadge)(task.args as UIPatternTools.CreateNotificationBadgeParams);
      }
      if (task.command === 'create-divider') {
        result = await safeToolProcessor<UIPatternTools.CreateDividerParams>(UIPatternTools.createDivider)(task.args as UIPatternTools.CreateDividerParams);
      }
      if (task.command === 'create-calendar') {
        result = await safeToolProcessor<UIPatternTools.CreateCalendarParams>(UIPatternTools.createCalendar)(task.args as UIPatternTools.CreateCalendarParams);
      }
      if (task.command === 'create-color-picker') {
        result = await safeToolProcessor<UIPatternTools.CreateColorPickerParams>(UIPatternTools.createColorPicker)(task.args as UIPatternTools.CreateColorPickerParams);
      }
      if (task.command === 'create-tree-view') {
        result = await safeToolProcessor<UIPatternTools.CreateTreeViewParams>(UIPatternTools.createTreeView)(task.args as UIPatternTools.CreateTreeViewParams);
      }
      if (task.command === 'create-menu') {
        result = await safeToolProcessor<UIPatternTools.CreateMenuParams>(UIPatternTools.createMenu)(task.args as UIPatternTools.CreateMenuParams);
      }
      if (task.command === 'create-textarea') {
        result = await safeToolProcessor<UIPatternTools.CreateTextareaParams>(UIPatternTools.createTextarea)(task.args as UIPatternTools.CreateTextareaParams);
      }
      if (task.command === 'create-bottom-sheet') {
        result = await safeToolProcessor<UIPatternTools.CreateBottomSheetParams>(UIPatternTools.createBottomSheet)(task.args as UIPatternTools.CreateBottomSheetParams);
      }
      if (task.command === 'create-drawer') {
        result = await safeToolProcessor<UIPatternTools.CreateDrawerParams>(UIPatternTools.createDrawer)(task.args as UIPatternTools.CreateDrawerParams);
      }
      if (task.command === 'create-tab-bar') {
        result = await safeToolProcessor<UIPatternTools.CreateTabBarParams>(UIPatternTools.createTabBar)(task.args as UIPatternTools.CreateTabBarParams);
      }
      if (task.command === 'create-popover') {
        result = await safeToolProcessor<UIPatternTools.CreatePopoverParams>(UIPatternTools.createPopover)(task.args as UIPatternTools.CreatePopoverParams);
      }
      if (task.command === 'create-segmented-control') {
        result = await safeToolProcessor<UIPatternTools.CreateSegmentedControlParams>(UIPatternTools.createSegmentedControl)(task.args as UIPatternTools.CreateSegmentedControlParams);
      }
      if (task.command === 'create-chip') {
        result = await safeToolProcessor<UIPatternTools.CreateChipParams>(UIPatternTools.createChip)(task.args as UIPatternTools.CreateChipParams);
      }
      if (task.command === 'create-floating-action-button') {
        result = await safeToolProcessor<UIPatternTools.CreateFloatingActionButtonParams>(UIPatternTools.createFloatingActionButton)(task.args as UIPatternTools.CreateFloatingActionButtonParams);
      }
      if (task.command === 'create-snackbar') {
        result = await safeToolProcessor<UIPatternTools.CreateSnackbarParams>(UIPatternTools.createSnackbar)(task.args as UIPatternTools.CreateSnackbarParams);
      }
      if (task.command === 'create-banner') {
        result = await safeToolProcessor<UIPatternTools.CreateBannerParams>(UIPatternTools.createBanner)(task.args as UIPatternTools.CreateBannerParams);
      }
      if (task.command === 'create-image-gallery') {
        result = await safeToolProcessor<UIPatternTools.CreateImageGalleryParams>(UIPatternTools.createImageGallery)(task.args as UIPatternTools.CreateImageGalleryParams);
      }
      if (task.command === 'create-login-form') {
        result = await safeToolProcessor<UIPatternTools.CreateLoginFormParams>(UIPatternTools.createLoginForm)(task.args as UIPatternTools.CreateLoginFormParams);
      }
      if (task.command === 'create-signup-form') {
        result = await safeToolProcessor<UIPatternTools.CreateSignupFormParams>(UIPatternTools.createSignupForm)(task.args as UIPatternTools.CreateSignupFormParams);
      }
      if (task.command === 'create-profile-card') {
        result = await safeToolProcessor<UIPatternTools.CreateProfileCardParams>(UIPatternTools.createProfileCard)(task.args as UIPatternTools.CreateProfileCardParams);
      }
      if (task.command === 'create-cta-section') {
        result = await safeToolProcessor<UIPatternTools.CreateCTASectionParams>(UIPatternTools.createCTASection)(task.args as UIPatternTools.CreateCTASectionParams);
      }
      if (task.command === 'create-faq-section') {
        result = await safeToolProcessor<UIPatternTools.CreateFAQSectionParams>(UIPatternTools.createFAQSection)(task.args as UIPatternTools.CreateFAQSectionParams);
      }
      if (task.command === 'create-team-section') {
        result = await safeToolProcessor<UIPatternTools.CreateTeamSectionParams>(UIPatternTools.createTeamSection)(task.args as UIPatternTools.CreateTeamSectionParams);
      }
      if (task.command === 'create-contact-form') {
        result = await safeToolProcessor<UIPatternTools.CreateContactFormParams>(UIPatternTools.createContactForm)(task.args as UIPatternTools.CreateContactFormParams);
      }
      if (task.command === 'create-newsletter-signup') {
        result = await safeToolProcessor<UIPatternTools.CreateNewsletterSignupParams>(UIPatternTools.createNewsletterSignup)(task.args as UIPatternTools.CreateNewsletterSignupParams);
      }
      if (task.command === 'create-social-links') {
        result = await safeToolProcessor<UIPatternTools.CreateSocialLinksParams>(UIPatternTools.createSocialLinks)(task.args as UIPatternTools.CreateSocialLinksParams);
      }
      if (task.command === 'create-cookie-banner') {
        result = await safeToolProcessor<UIPatternTools.CreateCookieBannerParams>(UIPatternTools.createCookieBanner)(task.args as UIPatternTools.CreateCookieBannerParams);
      }
      if (task.command === 'create-onboarding-screen') {
        result = await safeToolProcessor<UIPatternTools.CreateOnboardingScreenParams>(UIPatternTools.createOnboardingScreen)(task.args as UIPatternTools.CreateOnboardingScreenParams);
      }
      if (task.command === 'create-app-shell') {
        result = await safeToolProcessor<UIPatternTools.CreateAppShellParams>(UIPatternTools.createAppShell)(task.args as UIPatternTools.CreateAppShellParams);
      }
      if (task.command === 'create-dashboard-layout') {
        result = await safeToolProcessor<UIPatternTools.CreateDashboardLayoutParams>(UIPatternTools.createDashboardLayout)(task.args as UIPatternTools.CreateDashboardLayoutParams);
      }
      if (task.command === 'create-landing-page') {
        result = await safeToolProcessor<UIPatternTools.CreateLandingPageParams>(UIPatternTools.createLandingPage)(task.args as UIPatternTools.CreateLandingPageParams);
      }
      if (task.command === 'create-blog-layout') {
        result = await safeToolProcessor<UIPatternTools.CreateBlogLayoutParams>(UIPatternTools.createBlogLayout)(task.args as UIPatternTools.CreateBlogLayoutParams);
      }
      if (task.command === 'create-ecommerce-layout') {
        result = await safeToolProcessor<UIPatternTools.CreateEcommerceLayoutParams>(UIPatternTools.createEcommerceLayout)(task.args as UIPatternTools.CreateEcommerceLayoutParams);
      }
      if (task.command === 'create-settings-page') {
        result = await safeToolProcessor<UIPatternTools.CreateSettingsPageParams>(UIPatternTools.createSettingsPage)(task.args as UIPatternTools.CreateSettingsPageParams);
      }
      if (task.command === 'create-auth-layout') {
        result = await safeToolProcessor<UIPatternTools.CreateAuthLayoutParams>(UIPatternTools.createAuthLayout)(task.args as UIPatternTools.CreateAuthLayoutParams);
      }
      if (task.command === 'create-admin-layout') {
        result = await safeToolProcessor<UIPatternTools.CreateAdminLayoutParams>(UIPatternTools.createAdminLayout)(task.args as UIPatternTools.CreateAdminLayoutParams);
      }

      // Code Gen tools
      if (task.command === 'generate-css') {
        result = await safeToolProcessor<CodeGenTools.GenerateCssParams>(CodeGenTools.generateCss)(task.args as CodeGenTools.GenerateCssParams);
      }
      if (task.command === 'generate-tailwind') {
        result = await safeToolProcessor<CodeGenTools.GenerateTailwindParams>(CodeGenTools.generateTailwind)(task.args as CodeGenTools.GenerateTailwindParams);
      }
      if (task.command === 'generate-react') {
        result = await safeToolProcessor<CodeGenTools.GenerateReactParams>(CodeGenTools.generateReact)(task.args as CodeGenTools.GenerateReactParams);
      }
      if (task.command === 'extract-layout-css') {
        result = await safeToolProcessor<CodeGenTools.ExtractLayoutCssParams>(CodeGenTools.extractLayoutCss)(task.args as CodeGenTools.ExtractLayoutCssParams);
      }
      if (task.command === 'extract-typography-css') {
        result = await safeToolProcessor<CodeGenTools.ExtractTypographyCssParams>(CodeGenTools.extractTypographyCss)(task.args as CodeGenTools.ExtractTypographyCssParams);
      }
      if (task.command === 'extract-color-palette') {
        result = await safeToolProcessor<CodeGenTools.ExtractColorPaletteParams>(CodeGenTools.extractColorPalette)(task.args as CodeGenTools.ExtractColorPaletteParams);
      }
      if (task.command === 'generate-design-tokens') {
        result = await safeToolProcessor<CodeGenTools.GenerateDesignTokensParams>(CodeGenTools.generateDesignTokens)(task.args as CodeGenTools.GenerateDesignTokensParams);
      }
      if (task.command === 'generate-html-structure') {
        result = await safeToolProcessor<CodeGenTools.GenerateHtmlStructureParams>(CodeGenTools.generateHtmlStructure)(task.args as CodeGenTools.GenerateHtmlStructureParams);
      }
      if (task.command === 'layout-to-flexbox') {
        result = await safeToolProcessor<CodeGenTools.LayoutToFlexboxParams>(CodeGenTools.layoutToFlexbox)(task.args as CodeGenTools.LayoutToFlexboxParams);
      }
      if (task.command === 'layout-to-grid') {
        result = await safeToolProcessor<CodeGenTools.LayoutToGridParams>(CodeGenTools.layoutToGrid)(task.args as CodeGenTools.LayoutToGridParams);
      }

      // Analysis tools
      if (task.command === 'analyze-color-harmony') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeColorHarmonyParams>(AnalysisTools.analyzeColorHarmony)(task.args as AnalysisTools.AnalyzeColorHarmonyParams);
      }
      if (task.command === 'analyze-contrast-ratio') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeContrastRatioParams>(AnalysisTools.analyzeContrastRatio)(task.args as AnalysisTools.AnalyzeContrastRatioParams);
      }
      if (task.command === 'analyze-color-blindness') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeColorBlindnessParams>(AnalysisTools.analyzeColorBlindness)(task.args as AnalysisTools.AnalyzeColorBlindnessParams);
      }
      if (task.command === 'analyze-typography-scale') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeTypographyScaleParams>(AnalysisTools.analyzeTypographyScale)(task.args as AnalysisTools.AnalyzeTypographyScaleParams);
      }
      if (task.command === 'analyze-spacing-consistency') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeSpacingConsistencyParams>(AnalysisTools.analyzeSpacingConsistency)(task.args as AnalysisTools.AnalyzeSpacingConsistencyParams);
      }
      if (task.command === 'analyze-visual-hierarchy') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeVisualHierarchyParams>(AnalysisTools.analyzeVisualHierarchy)(task.args as AnalysisTools.AnalyzeVisualHierarchyParams);
      }
      if (task.command === 'analyze-alignment') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeAlignmentParams>(AnalysisTools.analyzeAlignment)(task.args as AnalysisTools.AnalyzeAlignmentParams);
      }
      if (task.command === 'analyze-grid-usage') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeGridUsageParams>(AnalysisTools.analyzeGridUsage)(task.args as AnalysisTools.AnalyzeGridUsageParams);
      }
      if (task.command === 'analyze-whitespace') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeWhitespaceParams>(AnalysisTools.analyzeWhitespace)(task.args as AnalysisTools.AnalyzeWhitespaceParams);
      }
      if (task.command === 'analyze-touch-targets') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeTouchTargetsParams>(AnalysisTools.analyzeTouchTargets)(task.args as AnalysisTools.AnalyzeTouchTargetsParams);
      }
      if (task.command === 'analyze-readability') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeReadabilityParams>(AnalysisTools.analyzeReadability)(task.args as AnalysisTools.AnalyzeReadabilityParams);
      }
      if (task.command === 'analyze-navigation-patterns') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeNavigationPatternsParams>(AnalysisTools.analyzeNavigationPatterns)(task.args as AnalysisTools.AnalyzeNavigationPatternsParams);
      }
      if (task.command === 'analyze-form-patterns') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeFormPatternsParams>(AnalysisTools.analyzeFormPatterns)(task.args as AnalysisTools.AnalyzeFormPatternsParams);
      }
      if (task.command === 'analyze-cta-placement') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeCTAPlacementParams>(AnalysisTools.analyzeCTAPlacement)(task.args as AnalysisTools.AnalyzeCTAPlacementParams);
      }
      if (task.command === 'analyze-visual-flow') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeVisualFlowParams>(AnalysisTools.analyzeVisualFlow)(task.args as AnalysisTools.AnalyzeVisualFlowParams);
      }
      if (task.command === 'analyze-feedback-patterns') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeFeedbackPatternsParams>(AnalysisTools.analyzeFeedbackPatterns)(task.args as AnalysisTools.AnalyzeFeedbackPatternsParams);
      }
      if (task.command === 'analyze-loading-states') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeLoadingStatesParams>(AnalysisTools.analyzeLoadingStates)(task.args as AnalysisTools.AnalyzeLoadingStatesParams);
      }
      if (task.command === 'analyze-error-states') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeErrorStatesParams>(AnalysisTools.analyzeErrorStates)(task.args as AnalysisTools.AnalyzeErrorStatesParams);
      }
      if (task.command === 'analyze-empty-states') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeEmptyStatesParams>(AnalysisTools.analyzeEmptyStates)(task.args as AnalysisTools.AnalyzeEmptyStatesParams);
      }
      if (task.command === 'analyze-icon-consistency') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeIconConsistencyParams>(AnalysisTools.analyzeIconConsistency)(task.args as AnalysisTools.AnalyzeIconConsistencyParams);
      }
      if (task.command === 'analyze-brand-consistency') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeBrandConsistencyParams>(AnalysisTools.analyzeBrandConsistency)(task.args as AnalysisTools.AnalyzeBrandConsistencyParams);
      }
      if (task.command === 'analyze-responsiveness') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeResponsivenessParams>(AnalysisTools.analyzeResponsiveness)(task.args as AnalysisTools.AnalyzeResponsivenessParams);
      }
      if (task.command === 'analyze-component-usage') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeComponentUsageParams>(AnalysisTools.analyzeComponentUsage)(task.args as AnalysisTools.AnalyzeComponentUsageParams);
      }
      if (task.command === 'analyze-layer-naming') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeLayerNamingParams>(AnalysisTools.analyzeLayerNaming)(task.args as AnalysisTools.AnalyzeLayerNamingParams);
      }
      if (task.command === 'analyze-focus-order') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeFocusOrderParams>(AnalysisTools.analyzeFocusOrder)(task.args as AnalysisTools.AnalyzeFocusOrderParams);
      }
      if (task.command === 'analyze-heading-structure') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeHeadingStructureParams>(AnalysisTools.analyzeHeadingStructure)(task.args as AnalysisTools.AnalyzeHeadingStructureParams);
      }
      if (task.command === 'analyze-alt-text') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeAltTextParams>(AnalysisTools.analyzeAltText)(task.args as AnalysisTools.AnalyzeAltTextParams);
      }
      if (task.command === 'analyze-aria-labels') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeAriaLabelsParams>(AnalysisTools.analyzeAriaLabels)(task.args as AnalysisTools.AnalyzeAriaLabelsParams);
      }
      if (task.command === 'analyze-motion-preferences') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeMotionPreferencesParams>(AnalysisTools.analyzeMotionPreferences)(task.args as AnalysisTools.AnalyzeMotionPreferencesParams);
      }
      if (task.command === 'analyze-complexity') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeComplexityParams>(AnalysisTools.analyzeComplexity)(task.args as AnalysisTools.AnalyzeComplexityParams);
      }
      if (task.command === 'analyze-render-performance') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeRenderPerformanceParams>(AnalysisTools.analyzeRenderPerformance)(task.args as AnalysisTools.AnalyzeRenderPerformanceParams);
      }
      if (task.command === 'analyze-memory-usage') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeMemoryUsageParams>(AnalysisTools.analyzeMemoryUsage)(task.args as AnalysisTools.AnalyzeMemoryUsageParams);
      }
      if (task.command === 'analyze-file-optimization') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeFileOptimizationParams>(AnalysisTools.analyzeFileOptimization)(task.args as AnalysisTools.AnalyzeFileOptimizationParams);
      }
      if (task.command === 'analyze-asset-optimization') {
        result = await safeToolProcessor<AnalysisTools.AnalyzeAssetOptimizationParams>(AnalysisTools.analyzeAssetOptimization)(task.args as AnalysisTools.AnalyzeAssetOptimizationParams);
      }
      if (task.command === 'generate-design-report') {
        result = await safeToolProcessor<AnalysisTools.GenerateDesignReportParams>(AnalysisTools.generateDesignReport)(task.args as AnalysisTools.GenerateDesignReportParams);
      }
      if (task.command === 'generate-accessibility-report') {
        result = await safeToolProcessor<AnalysisTools.GenerateAccessibilityReportParams>(AnalysisTools.generateAccessibilityReport)(task.args as AnalysisTools.GenerateAccessibilityReportParams);
      }
      if (task.command === 'generate-performance-report') {
        result = await safeToolProcessor<AnalysisTools.GeneratePerformanceReportParams>(AnalysisTools.generatePerformanceReport)(task.args as AnalysisTools.GeneratePerformanceReportParams);
      }
      if (task.command === 'generate-color-report') {
        result = await safeToolProcessor<AnalysisTools.GenerateColorReportParams>(AnalysisTools.generateColorReport)(task.args as AnalysisTools.GenerateColorReportParams);
      }
      if (task.command === 'generate-typography-report') {
        result = await safeToolProcessor<AnalysisTools.GenerateTypographyReportParams>(AnalysisTools.generateTypographyReport)(task.args as AnalysisTools.GenerateTypographyReportParams);
      }
      if (task.command === 'generate-spacing-report') {
        result = await safeToolProcessor<AnalysisTools.GenerateSpacingReportParams>(AnalysisTools.generateSpacingReport)(task.args as AnalysisTools.GenerateSpacingReportParams);
      }
      if (task.command === 'generate-consistency-report') {
        result = await safeToolProcessor<AnalysisTools.GenerateConsistencyReportParams>(AnalysisTools.generateConsistencyReport)(task.args as AnalysisTools.GenerateConsistencyReportParams);
      }
      if (task.command === 'generate-ux-report') {
        result = await safeToolProcessor<AnalysisTools.GenerateUXReportParams>(AnalysisTools.generateUXReport)(task.args as AnalysisTools.GenerateUXReportParams);
      }
      if (task.command === 'suggest-improvements') {
        result = await safeToolProcessor<AnalysisTools.SuggestImprovementsParams>(AnalysisTools.suggestImprovements)(task.args as AnalysisTools.SuggestImprovementsParams);
      }
      if (task.command === 'compare-designs') {
        result = await safeToolProcessor<AnalysisTools.CompareDesignsParams>(AnalysisTools.compareDesigns)(task.args as AnalysisTools.CompareDesignsParams);
      }
      if (task.command === 'validate-design-system') {
        result = await safeToolProcessor<AnalysisTools.ValidateDesignSystemParams>(AnalysisTools.validateDesignSystem)(task.args as AnalysisTools.ValidateDesignSystemParams);
      }
      if (task.command === 'check-brand-guidelines') {
        result = await safeToolProcessor<AnalysisTools.CheckBrandGuidelinesParams>(AnalysisTools.checkBrandGuidelines)(task.args as AnalysisTools.CheckBrandGuidelinesParams);
      }
      if (task.command === 'measure-design-metrics') {
        result = await safeToolProcessor<AnalysisTools.MeasureDesignMetricsParams>(AnalysisTools.measureDesignMetrics)(task.args as AnalysisTools.MeasureDesignMetricsParams);
      }
      if (task.command === 'track-design-changes') {
        result = await safeToolProcessor<AnalysisTools.TrackDesignChangesParams>(AnalysisTools.trackDesignChanges)(task.args as AnalysisTools.TrackDesignChangesParams);
      }
      if (task.command === 'benchmark-design') {
        result = await safeToolProcessor<AnalysisTools.BenchmarkDesignParams>(AnalysisTools.benchmarkDesign)(task.args as AnalysisTools.BenchmarkDesignParams);
      }

      // Design System Extended tools
      if (task.command === 'create-color-tokens') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateColorTokensParams>(DesignSystemExtendedTools.createColorTokens)(task.args as DesignSystemExtendedTools.CreateColorTokensParams);
      }
      if (task.command === 'create-spacing-tokens') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateSpacingTokensParams>(DesignSystemExtendedTools.createSpacingTokens)(task.args as DesignSystemExtendedTools.CreateSpacingTokensParams);
      }
      if (task.command === 'create-typography-tokens') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateTypographyTokensParams>(DesignSystemExtendedTools.createTypographyTokens)(task.args as DesignSystemExtendedTools.CreateTypographyTokensParams);
      }
      if (task.command === 'create-shadow-tokens') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateShadowTokensParams>(DesignSystemExtendedTools.createShadowTokens)(task.args as DesignSystemExtendedTools.CreateShadowTokensParams);
      }
      if (task.command === 'create-radius-tokens') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateRadiusTokensParams>(DesignSystemExtendedTools.createRadiusTokens)(task.args as DesignSystemExtendedTools.CreateRadiusTokensParams);
      }
      if (task.command === 'create-animation-tokens') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateAnimationTokensParams>(DesignSystemExtendedTools.createAnimationTokens)(task.args as DesignSystemExtendedTools.CreateAnimationTokensParams);
      }
      if (task.command === 'create-breakpoint-tokens') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateBreakpointTokensParams>(DesignSystemExtendedTools.createBreakpointTokens)(task.args as DesignSystemExtendedTools.CreateBreakpointTokensParams);
      }
      if (task.command === 'create-z-index-tokens') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateZIndexTokensParams>(DesignSystemExtendedTools.createZIndexTokens)(task.args as DesignSystemExtendedTools.CreateZIndexTokensParams);
      }
      if (task.command === 'export-tokens') {
        result = await safeToolProcessor<DesignSystemExtendedTools.ExportTokensParams>(DesignSystemExtendedTools.exportTokens)(task.args as DesignSystemExtendedTools.ExportTokensParams);
      }
      if (task.command === 'import-tokens') {
        result = await safeToolProcessor<DesignSystemExtendedTools.ImportTokensParams>(DesignSystemExtendedTools.importTokens)(task.args as DesignSystemExtendedTools.ImportTokensParams);
      }
      if (task.command === 'create-button-component') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateButtonComponentParams>(DesignSystemExtendedTools.createButtonComponent)(task.args as DesignSystemExtendedTools.CreateButtonComponentParams);
      }
      if (task.command === 'create-input-component') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateInputComponentParams>(DesignSystemExtendedTools.createInputComponent)(task.args as DesignSystemExtendedTools.CreateInputComponentParams);
      }
      if (task.command === 'create-card-component') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateCardComponentParams>(DesignSystemExtendedTools.createCardComponent)(task.args as DesignSystemExtendedTools.CreateCardComponentParams);
      }
      if (task.command === 'create-avatar-component') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateAvatarComponentParams>(DesignSystemExtendedTools.createAvatarComponent)(task.args as DesignSystemExtendedTools.CreateAvatarComponentParams);
      }
      if (task.command === 'create-badge-component') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateBadgeComponentParams>(DesignSystemExtendedTools.createBadgeComponent)(task.args as DesignSystemExtendedTools.CreateBadgeComponentParams);
      }
      if (task.command === 'create-icon-component') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateIconComponentParams>(DesignSystemExtendedTools.createIconComponent)(task.args as DesignSystemExtendedTools.CreateIconComponentParams);
      }
      if (task.command === 'create-divider-component') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateDividerComponentParams>(DesignSystemExtendedTools.createDividerComponent)(task.args as DesignSystemExtendedTools.CreateDividerComponentParams);
      }
      if (task.command === 'create-tooltip-component') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateTooltipComponentParams>(DesignSystemExtendedTools.createTooltipComponent)(task.args as DesignSystemExtendedTools.CreateTooltipComponentParams);
      }
      if (task.command === 'create-modal-component') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateModalComponentParams>(DesignSystemExtendedTools.createModalComponent)(task.args as DesignSystemExtendedTools.CreateModalComponentParams);
      }
      if (task.command === 'create-alert-component') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateAlertComponentParams>(DesignSystemExtendedTools.createAlertComponent)(task.args as DesignSystemExtendedTools.CreateAlertComponentParams);
      }
      if (task.command === 'document-component') {
        result = await safeToolProcessor<DesignSystemExtendedTools.DocumentComponentParams>(DesignSystemExtendedTools.documentComponent)(task.args as DesignSystemExtendedTools.DocumentComponentParams);
      }
      if (task.command === 'generate-component-docs') {
        result = await safeToolProcessor<DesignSystemExtendedTools.GenerateComponentDocsParams>(DesignSystemExtendedTools.generateComponentDocs)(task.args as DesignSystemExtendedTools.GenerateComponentDocsParams);
      }
      if (task.command === 'create-style-guide-page') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateStyleGuidePageParams>(DesignSystemExtendedTools.createStyleGuidePage)(task.args as DesignSystemExtendedTools.CreateStyleGuidePageParams);
      }
      if (task.command === 'create-color-swatch-page') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateColorSwatchPageParams>(DesignSystemExtendedTools.createColorSwatchPage)(task.args as DesignSystemExtendedTools.CreateColorSwatchPageParams);
      }
      if (task.command === 'create-typography-showcase') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateTypographyShowcaseParams>(DesignSystemExtendedTools.createTypographyShowcase)(task.args as DesignSystemExtendedTools.CreateTypographyShowcaseParams);
      }
      if (task.command === 'create-component-showcase') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateComponentShowcaseParams>(DesignSystemExtendedTools.createComponentShowcase)(task.args as DesignSystemExtendedTools.CreateComponentShowcaseParams);
      }
      if (task.command === 'create-usage-guidelines') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateUsageGuidelinesParams>(DesignSystemExtendedTools.createUsageGuidelines)(task.args as DesignSystemExtendedTools.CreateUsageGuidelinesParams);
      }
      if (task.command === 'create-spacing-guide') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateSpacingGuideParams>(DesignSystemExtendedTools.createSpacingGuide)(task.args as DesignSystemExtendedTools.CreateSpacingGuideParams);
      }
      if (task.command === 'create-icon-guide') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateIconGuideParams>(DesignSystemExtendedTools.createIconGuide)(task.args as DesignSystemExtendedTools.CreateIconGuideParams);
      }
      if (task.command === 'create-motion-guide') {
        result = await safeToolProcessor<DesignSystemExtendedTools.CreateMotionGuideParams>(DesignSystemExtendedTools.createMotionGuide)(task.args as DesignSystemExtendedTools.CreateMotionGuideParams);
      }

      // Accessibility tools
      if (task.command === 'check-color-contrast') {
        result = await safeToolProcessor<AccessibilityTools.CheckColorContrastParams>(AccessibilityTools.checkColorContrast)(task.args as AccessibilityTools.CheckColorContrastParams);
      }
      if (task.command === 'check-text-sizing') {
        result = await safeToolProcessor<AccessibilityTools.CheckTextSizingParams>(AccessibilityTools.checkTextSizing)(task.args as AccessibilityTools.CheckTextSizingParams);
      }
      if (task.command === 'check-touch-targets') {
        result = await safeToolProcessor<AccessibilityTools.CheckTouchTargetsParams>(AccessibilityTools.checkTouchTargets)(task.args as AccessibilityTools.CheckTouchTargetsParams);
      }
      if (task.command === 'check-focus-indicators') {
        result = await safeToolProcessor<AccessibilityTools.CheckFocusIndicatorsParams>(AccessibilityTools.checkFocusIndicators)(task.args as AccessibilityTools.CheckFocusIndicatorsParams);
      }
      if (task.command === 'check-label-associations') {
        result = await safeToolProcessor<AccessibilityTools.CheckLabelAssociationsParams>(AccessibilityTools.checkLabelAssociations)(task.args as AccessibilityTools.CheckLabelAssociationsParams);
      }
      if (task.command === 'check-reading-order') {
        result = await safeToolProcessor<AccessibilityTools.CheckReadingOrderParams>(AccessibilityTools.checkReadingOrder)(task.args as AccessibilityTools.CheckReadingOrderParams);
      }
      if (task.command === 'check-alt-text') {
        result = await safeToolProcessor<AccessibilityTools.CheckAltTextParams>(AccessibilityTools.checkAltText)(task.args as AccessibilityTools.CheckAltTextParams);
      }
      if (task.command === 'check-heading-hierarchy') {
        result = await safeToolProcessor<AccessibilityTools.CheckHeadingHierarchyParams>(AccessibilityTools.checkHeadingHierarchy)(task.args as AccessibilityTools.CheckHeadingHierarchyParams);
      }
      if (task.command === 'check-motion-reduced') {
        result = await safeToolProcessor<AccessibilityTools.CheckMotionReducedParams>(AccessibilityTools.checkMotionReduced)(task.args as AccessibilityTools.CheckMotionReducedParams);
      }
      if (task.command === 'check-keyboard-navigation') {
        result = await safeToolProcessor<AccessibilityTools.CheckKeyboardNavigationParams>(AccessibilityTools.checkKeyboardNavigation)(task.args as AccessibilityTools.CheckKeyboardNavigationParams);
      }
      if (task.command === 'check-screen-reader') {
        result = await safeToolProcessor<AccessibilityTools.CheckScreenReaderParams>(AccessibilityTools.checkScreenReader)(task.args as AccessibilityTools.CheckScreenReaderParams);
      }
      if (task.command === 'check-language') {
        result = await safeToolProcessor<AccessibilityTools.CheckLanguageParams>(AccessibilityTools.checkLanguage)(task.args as AccessibilityTools.CheckLanguageParams);
      }
      if (task.command === 'check-link-purpose') {
        result = await safeToolProcessor<AccessibilityTools.CheckLinkPurposeParams>(AccessibilityTools.checkLinkPurpose)(task.args as AccessibilityTools.CheckLinkPurposeParams);
      }
      if (task.command === 'check-form-errors') {
        result = await safeToolProcessor<AccessibilityTools.CheckFormErrorsParams>(AccessibilityTools.checkFormErrors)(task.args as AccessibilityTools.CheckFormErrorsParams);
      }
      if (task.command === 'check-timeouts') {
        result = await safeToolProcessor<AccessibilityTools.CheckTimeoutsParams>(AccessibilityTools.checkTimeouts)(task.args as AccessibilityTools.CheckTimeoutsParams);
      }
      if (task.command === 'fix-contrast-issues') {
        result = await safeToolProcessor<AccessibilityTools.FixContrastIssuesParams>(AccessibilityTools.fixContrastIssues)(task.args as AccessibilityTools.FixContrastIssuesParams);
      }
      if (task.command === 'fix-touch-target-size') {
        result = await safeToolProcessor<AccessibilityTools.FixTouchTargetSizeParams>(AccessibilityTools.fixTouchTargetSize)(task.args as AccessibilityTools.FixTouchTargetSizeParams);
      }
      if (task.command === 'fix-text-size') {
        result = await safeToolProcessor<AccessibilityTools.FixTextSizeParams>(AccessibilityTools.fixTextSize)(task.args as AccessibilityTools.FixTextSizeParams);
      }
      if (task.command === 'add-alt-text') {
        result = await safeToolProcessor<AccessibilityTools.AddAltTextParams>(AccessibilityTools.addAltText)(task.args as AccessibilityTools.AddAltTextParams);
      }
      if (task.command === 'add-aria-label') {
        result = await safeToolProcessor<AccessibilityTools.AddAriaLabelParams>(AccessibilityTools.addAriaLabel)(task.args as AccessibilityTools.AddAriaLabelParams);
      }
      if (task.command === 'add-focus-state') {
        result = await safeToolProcessor<AccessibilityTools.AddFocusStateParams>(AccessibilityTools.addFocusState)(task.args as AccessibilityTools.AddFocusStateParams);
      }
      if (task.command === 'create-accessible-button') {
        result = await safeToolProcessor<AccessibilityTools.CreateAccessibleButtonParams>(AccessibilityTools.createAccessibleButton)(task.args as AccessibilityTools.CreateAccessibleButtonParams);
      }
      if (task.command === 'create-accessible-form-field') {
        result = await safeToolProcessor<AccessibilityTools.CreateAccessibleFormFieldParams>(AccessibilityTools.createAccessibleFormField)(task.args as AccessibilityTools.CreateAccessibleFormFieldParams);
      }
      if (task.command === 'create-accessible-modal') {
        result = await safeToolProcessor<AccessibilityTools.CreateAccessibleModalParams>(AccessibilityTools.createAccessibleModal)(task.args as AccessibilityTools.CreateAccessibleModalParams);
      }
      if (task.command === 'create-accessible-card') {
        result = await safeToolProcessor<AccessibilityTools.CreateAccessibleCardParams>(AccessibilityTools.createAccessibleCard)(task.args as AccessibilityTools.CreateAccessibleCardParams);
      }
      if (task.command === 'create-skip-link') {
        result = await safeToolProcessor<AccessibilityTools.CreateSkipLinkParams>(AccessibilityTools.createSkipLink)(task.args as AccessibilityTools.CreateSkipLinkParams);
      }
      if (task.command === 'generate-a11y-report') {
        result = await safeToolProcessor<AccessibilityTools.GenerateAccessibilityReportParams>(AccessibilityTools.generateA11yReport)(task.args as AccessibilityTools.GenerateAccessibilityReportParams);
      }
      if (task.command === 'generate-wcag-checklist') {
        result = await safeToolProcessor<AccessibilityTools.GenerateWcagChecklistParams>(AccessibilityTools.generateWcagChecklist)(task.args as AccessibilityTools.GenerateWcagChecklistParams);
      }

      // Performance tools
      if (task.command === 'optimize-layer-structure') {
        result = await safeToolProcessor<PerformanceTools.OptimizeLayerStructureParams>(PerformanceTools.optimizeLayerStructure)(task.args as PerformanceTools.OptimizeLayerStructureParams);
      }
      if (task.command === 'flatten-unnecessary-groups') {
        result = await safeToolProcessor<PerformanceTools.FlattenUnnecessaryGroupsParams>(PerformanceTools.flattenUnnecessaryGroups)(task.args as PerformanceTools.FlattenUnnecessaryGroupsParams);
      }
      if (task.command === 'reduce-effects-count') {
        result = await safeToolProcessor<PerformanceTools.ReduceEffectsCountParams>(PerformanceTools.reduceEffectsCount)(task.args as PerformanceTools.ReduceEffectsCountParams);
      }
      if (task.command === 'optimize-vectors') {
        result = await safeToolProcessor<PerformanceTools.OptimizeVectorsParams>(PerformanceTools.optimizeVectors)(task.args as PerformanceTools.OptimizeVectorsParams);
      }
      if (task.command === 'optimize-images') {
        result = await safeToolProcessor<PerformanceTools.OptimizeImagesParams>(PerformanceTools.optimizeImages)(task.args as PerformanceTools.OptimizeImagesParams);
      }
      if (task.command === 'remove-hidden-layers') {
        result = await safeToolProcessor<PerformanceTools.RemoveHiddenLayersParams>(PerformanceTools.removeHiddenLayers)(task.args as PerformanceTools.RemoveHiddenLayersParams);
      }
      if (task.command === 'simplify-gradients') {
        result = await safeToolProcessor<PerformanceTools.SimplifyGradientsParams>(PerformanceTools.simplifyGradients)(task.args as PerformanceTools.SimplifyGradientsParams);
      }
      if (task.command === 'detach-unused-styles') {
        result = await safeToolProcessor<PerformanceTools.DetachUnusedStylesParams>(PerformanceTools.detachUnusedStyles)(task.args as PerformanceTools.DetachUnusedStylesParams);
      }
      if (task.command === 'merge-identical-nodes') {
        result = await safeToolProcessor<PerformanceTools.MergeIdenticalNodesParams>(PerformanceTools.mergeIdenticalNodes)(task.args as PerformanceTools.MergeIdenticalNodesParams);
      }
      if (task.command === 'convert-to-components') {
        result = await safeToolProcessor<PerformanceTools.ConvertToComponentsParams>(PerformanceTools.convertToComponents)(task.args as PerformanceTools.ConvertToComponentsParams);
      }
      if (task.command === 'analyze-layer-count') {
        result = await safeToolProcessor<PerformanceTools.AnalyzeLayerCountParams>(PerformanceTools.analyzeLayerCount)(task.args as PerformanceTools.AnalyzeLayerCountParams);
      }
      if (task.command === 'analyze-file-size') {
        result = await safeToolProcessor<PerformanceTools.AnalyzeFileSizeParams>(PerformanceTools.analyzeFileSize)(task.args as PerformanceTools.AnalyzeFileSizeParams);
      }
      if (task.command === 'suggest-optimizations') {
        result = await safeToolProcessor<PerformanceTools.SuggestOptimizationsParams>(PerformanceTools.suggestOptimizations)(task.args as PerformanceTools.SuggestOptimizationsParams);
      }
      if (task.command === 'generate-perf-report') {
        result = await safeToolProcessor<PerformanceTools.GeneratePerformanceReportParams>(PerformanceTools.generatePerfReport)(task.args as PerformanceTools.GeneratePerformanceReportParams);
      }

      if (result) {
        // If this was a create/modify operation and succeeded, highlight the node
        if (!result.isError && isCreatingOrModifying) {
          const nodeId = extractNodeIdFromResult(result.content, task.command);
          if (nodeId) {
            await visualFeedback.highlightNode(nodeId);
          }
        }

        if (result.isError) {
          // Stop visual feedback on error
          if (isCreatingOrModifying) {
            await visualFeedback.forceCleanup();
          }

          emit<TaskFailedHandler>('TASK_FAILED', {
            name: 'TASK_FAILED',
            taskId: task.taskId,
            content: result.content,
            isError: result.isError
          })
        }
        else {
          emit<TaskFinishedHandler>('TASK_FINISHED', {
            name: 'TASK_FINISHED',
            taskId: task.taskId,
            content: result.content,
            isError: result.isError
          })

          // Schedule cleanup of visual feedback after success
          if (isCreatingOrModifying) {
            await visualFeedback.stop(3000); // Clean up after 3 seconds
          }
        }
      }
    }
    catch (error) {
      console.error(error);
      
      // Clean up visual feedback on error
      await visualFeedback.forceCleanup();

      emit<TaskFailedHandler>('TASK_FAILED', {
        name: 'TASK_FAILED',
        taskId: task.taskId,
        content: error instanceof Error ? error.message : JSON.stringify(error),
        isError: true
      })
    }
  })


  const additionalData = `<div id='data' />`;
  const html = `${additionalData}${__html__}`;
  figma.showUI(`${html}`, { width: 500, height: 405 });

  // Handle token storage messages from the UI
  // IMPORTANT: Use 'on' from utilities instead of overwriting figma.ui.onmessage
  // Directly assigning figma.ui.onmessage breaks @create-figma-plugin/utilities event system
  on('STORE_TOKEN', async (msg: { token?: string }) => {
    if (msg.token) {
      await TokenMgmtTools.storeApiToken(msg.token);
      // Notify UI that token was stored
      figma.ui.postMessage({ type: 'TOKEN_STATUS', hasToken: true });
      figma.notify('API Token saved successfully!');
    }
  });

  // Check and notify UI about existing token status
  TokenMgmtTools.getStoredToken().then((token) => {
    figma.ui.postMessage({ type: 'TOKEN_STATUS', hasToken: !!token });
  });
}

main();