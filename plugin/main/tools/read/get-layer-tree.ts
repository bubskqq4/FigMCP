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
    childIds: string[];
    properties: Record<string, any>;
    children?: LayerTreeNode[];
}

export async function getLayerTree(args: GetLayerTreeParams): Promise<ToolResult> {
    try {
        const includeHidden = args.includeHidden !== undefined ? args.includeHidden : true;
        const maxDepth = args.maxDepth;

        const buildLayerTree = (node: BaseNode, currentDepth: number): LayerTreeNode | null => {
            // Skip hidden nodes if not included
            if (!includeHidden && "visible" in node && !node.visible) {
                return null;
            }

            // Check max depth limit if specified
            if (maxDepth !== undefined && currentDepth > maxDepth) {
                return null;
            }

            // Get child IDs
            const childIds: string[] = [];
            if ("children" in node && node.children) {
                childIds.push(...node.children.map(child => child.id));
            }

            // Serialize node properties
            const serialized = serializeNode(node as SceneNode);

            const layerNode: LayerTreeNode = {
                id: node.id,
                name: node.name,
                type: node.type,
                visible: "visible" in node ? node.visible : true,
                locked: "locked" in node ? node.locked : false,
                depth: currentDepth,
                childIds,
                properties: {
                    ...serialized,
                    // Add additional useful properties
                    ...(("x" in node && "y" in node) && {
                        x: node.x,
                        y: node.y,
                    }),
                    ...(("width" in node && "height" in node) && {
                        width: node.width,
                        height: node.height,
                    }),
                    ...(("opacity" in node) && {
                        opacity: node.opacity,
                    }),
                    ...(("blendMode" in node) && {
                        blendMode: node.blendMode,
                    }),
                }
            };

            // Recursively build children
            if ("children" in node && node.children) {
                const children: LayerTreeNode[] = [];
                
                for (const child of node.children) {
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
                    maxDepthScanned: maxDepth || "unlimited",
                    includeHidden
                },
                documentName: figma.root.name
            }
        };
    } catch (error) {
        return {
            isError: true,
            content: error instanceof Error ? error.message : "Unknown error occurred while building layer tree"
        };
    }
}
