import type { GetLayerTreeParams } from "@shared/types";
import { serializeNode } from "../../serialization/serialization";
import { ToolResult } from "../tool-result";

interface LayerTreeNode {
    id: string;
    name: string;
    type: string;
    visible: boolean;
    locked: boolean;
    depth: number;
    childCount: number;
    hasChildren: boolean;
    // Only include children refs, not full child objects (for chunking)
    childIds: string[];
    properties: Record<string, any>;
    children?: LayerTreeNode[];
}

// Configuration for preventing timeouts
const CONFIG = {
    // Default max depth if not specified (prevents runaway recursion)
    DEFAULT_MAX_DEPTH: 5,
    // Absolute max depth even if user requests more
    ABSOLUTE_MAX_DEPTH: 10,
    // Max nodes to process before yielding (prevents blocking)
    BATCH_SIZE: 50,
    // Max total nodes to return in one response
    MAX_NODES_PER_RESPONSE: 500,
    // Whether to include full serialization (expensive) or lightweight
    LIGHTWEIGHT_MODE_THRESHOLD: 100,
};

export async function getLayerTree(args: GetLayerTreeParams): Promise<ToolResult> {
    try {
        const includeHidden = args.includeHidden !== undefined ? args.includeHidden : true;
        // Apply sensible depth limit
        const requestedDepth = args.maxDepth ?? CONFIG.DEFAULT_MAX_DEPTH;
        const maxDepth = Math.min(requestedDepth, CONFIG.ABSOLUTE_MAX_DEPTH);
        
        // Track visited nodes to prevent infinite loops
        const visited = new Set<string>();
        let nodeCount = 0;
        let truncated = false;

        const buildLayerTree = (node: BaseNode, currentDepth: number): LayerTreeNode | null => {
            // Prevent infinite loops
            if (visited.has(node.id)) {
                return null;
            }
            visited.add(node.id);

            // Check node limit
            if (nodeCount >= CONFIG.MAX_NODES_PER_RESPONSE) {
                truncated = true;
                return null;
            }
            nodeCount++;

            // Skip hidden nodes if not included
            if (!includeHidden && "visible" in node && !node.visible) {
                return null;
            }

            // Check max depth limit
            if (currentDepth > maxDepth) {
                // Return a stub indicating there are more children
                const childCount = "children" in node && node.children ? node.children.length : 0;
                if (childCount > 0) {
                    return {
                        id: node.id,
                        name: node.name,
                        type: node.type,
                        visible: "visible" in node ? node.visible : true,
                        locked: "locked" in node ? node.locked : false,
                        depth: currentDepth,
                        childCount,
                        hasChildren: true,
                        childIds: ("children" in node && node.children) 
                            ? node.children.map(c => c.id) 
                            : [],
                        properties: {
                            _truncatedAtDepth: true,
                            _message: `Use get-node-children with nodeId="${node.id}" to fetch children`
                        }
                    };
                }
                return null;
            }

            // Get child info
            const childIds: string[] = [];
            const childCount = "children" in node && node.children ? node.children.length : 0;
            if ("children" in node && node.children) {
                childIds.push(...node.children.map(child => child.id));
            }

            // Use lightweight serialization for large trees
            const useLightweight = nodeCount > CONFIG.LIGHTWEIGHT_MODE_THRESHOLD;
            
            const layerNode: LayerTreeNode = {
                id: node.id,
                name: node.name,
                type: node.type,
                visible: "visible" in node ? node.visible : true,
                locked: "locked" in node ? node.locked : false,
                depth: currentDepth,
                childCount,
                hasChildren: childCount > 0,
                childIds,
                properties: useLightweight 
                    ? {
                        // Lightweight: only essential properties
                        ...(("x" in node && "y" in node) && { x: node.x, y: node.y }),
                        ...(("width" in node && "height" in node) && { width: node.width, height: node.height }),
                    }
                    : {
                        // Full serialization for smaller trees
                        ...serializeNode(node as SceneNode),
                        ...(("x" in node && "y" in node) && { x: node.x, y: node.y }),
                        ...(("width" in node && "height" in node) && { width: node.width, height: node.height }),
                        ...(("opacity" in node) && { opacity: node.opacity }),
                        ...(("blendMode" in node) && { blendMode: node.blendMode }),
                    }
            };

            // Recursively build children (with depth check already applied above)
            if ("children" in node && node.children && currentDepth < maxDepth) {
                const children: LayerTreeNode[] = [];
                
                for (const child of node.children) {
                    // Check if we've hit the node limit
                    if (nodeCount >= CONFIG.MAX_NODES_PER_RESPONSE) {
                        truncated = true;
                        break;
                    }
                    
                    const childTree = buildLayerTree(child, currentDepth + 1);
                    if (childTree !== null) {
                        children.push(childTree);
                    }
                }
                
                if (children.length > 0) {
                    layerNode.children = children;
                }
            }

            return layerNode;
        };

        // Start from the root document
        const documentTree = buildLayerTree(figma.root, 0);

        if (!documentTree) {
            return {
                isError: true,
                content: "Failed to build layer tree"
            };
        }

        // Calculate statistics
        let totalNodes = 0;
        let totalLayers = 0;
        const nodeTypes: Record<string, number> = {};

        const countNodes = (node: LayerTreeNode) => {
            totalNodes++;
            nodeTypes[node.type] = (nodeTypes[node.type] || 0) + 1;
            
            if (node.children) {
                totalLayers += node.children.length;
                node.children.forEach(countNodes);
            }
        };

        countNodes(documentTree);

        return {
            isError: false,
            content: {
                tree: documentTree,
                statistics: {
                    totalNodes,
                    totalLayers,
                    nodeTypes,
                    maxDepthScanned: maxDepth,
                    requestedDepth: args.maxDepth ?? "default",
                    includeHidden,
                    truncated,
                    truncatedReason: truncated 
                        ? `Response limited to ${CONFIG.MAX_NODES_PER_RESPONSE} nodes. Use get-node-children to fetch specific subtrees.`
                        : undefined
                },
                documentName: figma.root.name,
                _hint: truncated 
                    ? "Tree was truncated. Use 'get-node-children' with specific nodeIds to explore deeper."
                    : undefined
            }
        };
    } catch (error) {
        return {
            isError: true,
            content: error instanceof Error ? error.message : "Unknown error occurred while building layer tree"
        };
    }
}
