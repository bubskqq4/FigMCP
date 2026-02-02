import { ToolResult } from '../tool-result';

// Types
export interface EnableAutoLayoutParams {
  nodeId: string;
  direction?: 'HORIZONTAL' | 'VERTICAL';
}

export interface DisableAutoLayoutParams {
  nodeId: string;
}

export interface SetLayoutDirectionParams {
  nodeId: string;
  direction: 'HORIZONTAL' | 'VERTICAL';
}

export interface SetLayoutWrapParams {
  nodeId: string;
  wrap: 'NO_WRAP' | 'WRAP';
}

export interface SetLayoutGapParams {
  nodeId: string;
  gap: number;
}

export interface SetLayoutPaddingAllParams {
  nodeId: string;
  padding: number;
}

export interface SetLayoutPaddingIndividualParams {
  nodeId: string;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface SetLayoutAlignItemsParams {
  nodeId: string;
  align: 'MIN' | 'CENTER' | 'MAX' | 'BASELINE';
}

export interface SetLayoutJustifyContentParams {
  nodeId: string;
  justify: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
}

export interface SetLayoutSizingParams {
  nodeId: string;
  horizontal?: 'FIXED' | 'HUG' | 'FILL';
  vertical?: 'FIXED' | 'HUG' | 'FILL';
}

export interface SetChildPositioningParams {
  nodeId: string;
  childId: string;
  positioning: 'AUTO' | 'ABSOLUTE';
}

export interface SetLayoutModeParams {
  nodeId: string;
  mode: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
}

export interface SetCounterAxisSizingParams {
  nodeId: string;
  sizing: 'FIXED' | 'AUTO';
}

export interface SetPrimaryAxisSizingParams {
  nodeId: string;
  sizing: 'FIXED' | 'AUTO';
}

export interface ReorderChildParams {
  nodeId: string;
  childId: string;
  index: number;
}

// Helper to get frame node
function getFrameNode(nodeId: string): FrameNode | ComponentNode | InstanceNode | null {
  const node = figma.getNodeById(nodeId);
  if (!node) return null;
  if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE') {
    return node as FrameNode | ComponentNode | InstanceNode;
  }
  return null;
}

// Enable auto-layout on a frame
export async function enableAutoLayout(params: EnableAutoLayoutParams): Promise<ToolResult> {
  const { nodeId, direction = 'VERTICAL' } = params;
  
  const node = getFrameNode(nodeId);
  if (!node) {
    return {
      isError: true,
      content: `Node ${nodeId} not found or is not a frame/component`
    };
  }

  // Set layout mode
  node.layoutMode = direction;
  
  return {
    isError: false,
    content: JSON.stringify({
      success: true,
      nodeId: node.id,
      layoutMode: node.layoutMode,
      message: `Auto-layout enabled with ${direction} direction`
    })
  };
}

// Disable auto-layout
export async function disableAutoLayout(params: DisableAutoLayoutParams): Promise<ToolResult> {
  const { nodeId } = params;
  
  const node = getFrameNode(nodeId);
  if (!node) {
    return {
      isError: true,
      content: `Node ${nodeId} not found or is not a frame/component`
    };
  }

  node.layoutMode = 'NONE';
  
  return {
    isError: false,
    content: JSON.stringify({
      success: true,
      nodeId: node.id,
      message: 'Auto-layout disabled'
    })
  };
}

// Set layout direction
export async function setLayoutDirection(params: SetLayoutDirectionParams): Promise<ToolResult> {
  const { nodeId, direction } = params;
  
  const node = getFrameNode(nodeId);
  if (!node) {
    return {
      isError: true,
      content: `Node ${nodeId} not found or is not a frame/component`
    };
  }

  node.layoutMode = direction;
  
  return {
    isError: false,
    content: JSON.stringify({
      success: true,
      nodeId: node.id,
      layoutMode: node.layoutMode,
      message: `Layout direction set to ${direction}`
    })
  };
}

// Set layout wrap
export async function setLayoutWrap(params: SetLayoutWrapParams): Promise<ToolResult> {
  const { nodeId, wrap } = params;
  
  const node = getFrameNode(nodeId);
  if (!node) {
    return {
      isError: true,
      content: `Node ${nodeId} not found or is not a frame/component`
    };
  }

  if (node.layoutMode === 'NONE') {
    return {
      isError: true,
      content: 'Auto-layout must be enabled before setting wrap'
    };
  }

  node.layoutWrap = wrap;
  
  return {
    isError: false,
    content: JSON.stringify({
      success: true,
      nodeId: node.id,
      layoutWrap: node.layoutWrap,
      message: `Layout wrap set to ${wrap}`
    })
  };
}

// Set layout gap
export async function setLayoutGap(params: SetLayoutGapParams): Promise<ToolResult> {
  const { nodeId, gap } = params;
  
  const node = getFrameNode(nodeId);
  if (!node) {
    return {
      isError: true,
      content: `Node ${nodeId} not found or is not a frame/component`
    };
  }

  if (node.layoutMode === 'NONE') {
    return {
      isError: true,
      content: 'Auto-layout must be enabled before setting gap'
    };
  }

  node.itemSpacing = gap;
  
  return {
    isError: false,
    content: JSON.stringify({
      success: true,
      nodeId: node.id,
      itemSpacing: node.itemSpacing,
      message: `Layout gap set to ${gap}`
    })
  };
}

// Set padding on all sides
export async function setLayoutPaddingAll(params: SetLayoutPaddingAllParams): Promise<ToolResult> {
  const { nodeId, padding } = params;
  
  const node = getFrameNode(nodeId);
  if (!node) {
    return {
      isError: true,
      content: `Node ${nodeId} not found or is not a frame/component`
    };
  }

  node.paddingTop = padding;
  node.paddingRight = padding;
  node.paddingBottom = padding;
  node.paddingLeft = padding;
  
  return {
    isError: false,
    content: JSON.stringify({
      success: true,
      nodeId: node.id,
      padding: {
        top: node.paddingTop,
        right: node.paddingRight,
        bottom: node.paddingBottom,
        left: node.paddingLeft
      },
      message: `Padding set to ${padding} on all sides`
    })
  };
}

// Set individual padding
export async function setLayoutPaddingIndividual(params: SetLayoutPaddingIndividualParams): Promise<ToolResult> {
  const { nodeId, top, right, bottom, left } = params;
  
  const node = getFrameNode(nodeId);
  if (!node) {
    return {
      isError: true,
      content: `Node ${nodeId} not found or is not a frame/component`
    };
  }

  if (top !== undefined) node.paddingTop = top;
  if (right !== undefined) node.paddingRight = right;
  if (bottom !== undefined) node.paddingBottom = bottom;
  if (left !== undefined) node.paddingLeft = left;
  
  return {
    isError: false,
    content: JSON.stringify({
      success: true,
      nodeId: node.id,
      padding: {
        top: node.paddingTop,
        right: node.paddingRight,
        bottom: node.paddingBottom,
        left: node.paddingLeft
      },
      message: 'Individual padding updated'
    })
  };
}

// Set cross-axis alignment
export async function setLayoutAlignItems(params: SetLayoutAlignItemsParams): Promise<ToolResult> {
  const { nodeId, align } = params;
  
  const node = getFrameNode(nodeId);
  if (!node) {
    return {
      isError: true,
      content: `Node ${nodeId} not found or is not a frame/component`
    };
  }

  if (node.layoutMode === 'NONE') {
    return {
      isError: true,
      content: 'Auto-layout must be enabled before setting alignment'
    };
  }

  node.counterAxisAlignItems = align;
  
  return {
    isError: false,
    content: JSON.stringify({
      success: true,
      nodeId: node.id,
      counterAxisAlignItems: node.counterAxisAlignItems,
      message: `Cross-axis alignment set to ${align}`
    })
  };
}

// Set main-axis distribution
export async function setLayoutJustifyContent(params: SetLayoutJustifyContentParams): Promise<ToolResult> {
  const { nodeId, justify } = params;
  
  const node = getFrameNode(nodeId);
  if (!node) {
    return {
      isError: true,
      content: `Node ${nodeId} not found or is not a frame/component`
    };
  }

  if (node.layoutMode === 'NONE') {
    return {
      isError: true,
      content: 'Auto-layout must be enabled before setting justify content'
    };
  }

  node.primaryAxisAlignItems = justify;
  
  return {
    isError: false,
    content: JSON.stringify({
      success: true,
      nodeId: node.id,
      primaryAxisAlignItems: node.primaryAxisAlignItems,
      message: `Main-axis distribution set to ${justify}`
    })
  };
}

// Set sizing mode
export async function setLayoutSizing(params: SetLayoutSizingParams): Promise<ToolResult> {
  const { nodeId, horizontal, vertical } = params;
  
  const node = getFrameNode(nodeId);
  if (!node) {
    return {
      isError: true,
      content: `Node ${nodeId} not found or is not a frame/component`
    };
  }

  if (horizontal) {
    node.primaryAxisSizingMode = horizontal === 'HUG' ? 'AUTO' : 'FIXED';
    if (horizontal === 'FILL' && node.parent && 'layoutMode' in node.parent && node.parent.layoutMode !== 'NONE') {
      node.layoutGrow = 1;
    }
  }
  
  if (vertical) {
    node.counterAxisSizingMode = vertical === 'HUG' ? 'AUTO' : 'FIXED';
    if (vertical === 'FILL' && node.parent && 'layoutMode' in node.parent && node.parent.layoutMode !== 'NONE') {
      node.layoutAlign = 'STRETCH';
    }
  }
  
  return {
    isError: false,
    content: JSON.stringify({
      success: true,
      nodeId: node.id,
      message: 'Sizing mode updated'
    })
  };
}

// Set child positioning
export async function setChildPositioning(params: SetChildPositioningParams): Promise<ToolResult> {
  const { nodeId, childId, positioning } = params;
  
  const parentNode = getFrameNode(nodeId);
  if (!parentNode) {
    return {
      isError: true,
      content: `Parent node ${nodeId} not found or is not a frame/component`
    };
  }

  const childNode = figma.getNodeById(childId);
  if (!childNode) {
    return {
      isError: true,
      content: `Child node ${childId} not found`
    };
  }

  if (!('layoutPositioning' in childNode)) {
    return {
      isError: true,
      content: `Child node ${childId} does not support layout positioning`
    };
  }

  (childNode as SceneNode & { layoutPositioning: 'AUTO' | 'ABSOLUTE' }).layoutPositioning = positioning;
  
  return {
    isError: false,
    content: JSON.stringify({
      success: true,
      childId: childNode.id,
      positioning,
      message: `Child positioning set to ${positioning}`
    })
  };
}

// Set layout mode
export async function setLayoutMode(params: SetLayoutModeParams): Promise<ToolResult> {
  const { nodeId, mode } = params;
  
  const node = getFrameNode(nodeId);
  if (!node) {
    return {
      isError: true,
      content: `Node ${nodeId} not found or is not a frame/component`
    };
  }

  node.layoutMode = mode;
  
  return {
    isError: false,
    content: JSON.stringify({
      success: true,
      nodeId: node.id,
      layoutMode: node.layoutMode,
      message: `Layout mode set to ${mode}`
    })
  };
}

// Set counter axis sizing
export async function setCounterAxisSizing(params: SetCounterAxisSizingParams): Promise<ToolResult> {
  const { nodeId, sizing } = params;
  
  const node = getFrameNode(nodeId);
  if (!node) {
    return {
      isError: true,
      content: `Node ${nodeId} not found or is not a frame/component`
    };
  }

  node.counterAxisSizingMode = sizing;
  
  return {
    isError: false,
    content: JSON.stringify({
      success: true,
      nodeId: node.id,
      counterAxisSizingMode: node.counterAxisSizingMode,
      message: `Counter axis sizing set to ${sizing}`
    })
  };
}

// Set primary axis sizing
export async function setPrimaryAxisSizing(params: SetPrimaryAxisSizingParams): Promise<ToolResult> {
  const { nodeId, sizing } = params;
  
  const node = getFrameNode(nodeId);
  if (!node) {
    return {
      isError: true,
      content: `Node ${nodeId} not found or is not a frame/component`
    };
  }

  node.primaryAxisSizingMode = sizing;
  
  return {
    isError: false,
    content: JSON.stringify({
      success: true,
      nodeId: node.id,
      primaryAxisSizingMode: node.primaryAxisSizingMode,
      message: `Primary axis sizing set to ${sizing}`
    })
  };
}

// Reorder child in auto-layout
export async function reorderChild(params: ReorderChildParams): Promise<ToolResult> {
  const { nodeId, childId, index } = params;
  
  const parentNode = getFrameNode(nodeId);
  if (!parentNode) {
    return {
      isError: true,
      content: `Parent node ${nodeId} not found or is not a frame/component`
    };
  }

  const childNode = figma.getNodeById(childId) as SceneNode;
  if (!childNode) {
    return {
      isError: true,
      content: `Child node ${childId} not found`
    };
  }

  if (childNode.parent?.id !== parentNode.id) {
    return {
      isError: true,
      content: `Child ${childId} is not a child of ${nodeId}`
    };
  }

  // Move the child to the specified index
  const clampedIndex = Math.min(Math.max(0, index), parentNode.children.length - 1);
  parentNode.insertChild(clampedIndex, childNode);
  
  return {
    isError: false,
    content: JSON.stringify({
      success: true,
      childId: childNode.id,
      newIndex: clampedIndex,
      message: `Child reordered to index ${clampedIndex}`
    })
  };
}
