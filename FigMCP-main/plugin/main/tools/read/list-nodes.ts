import type { ListNodesParams } from "@shared/types";
import { serializeNode } from "../../serialization/serialization";
import { ToolResult } from "../tool-result";

export async function listNodes(args: ListNodesParams): Promise<ToolResult> {
    try {
        let parentNode: BaseNode | null = null;
        
        // Get parent node
        if (args.parentId) {
            parentNode = await figma.getNodeByIdAsync(args.parentId);
            if (!parentNode) {
                return {
                    isError: true,
                    content: `Parent node with id ${args.parentId} not found`
                };
            }
        } else {
            // Use current page if no parent specified
            parentNode = figma.currentPage;
        }

        // Check if parent has children
        if (!("children" in parentNode)) {
            return {
                isError: true,
                content: "The specified node does not have children"
            };
        }

        // Collect nodes based on depth
        const collectNodes = (node: BaseNode, currentDepth: number, maxDepth: number): SceneNode[] => {
            const nodes: SceneNode[] = [];
            
            if (!("children" in node)) {
                return nodes;
            }

            for (const child of node.children) {
                // Filter by type if specified
                if (!args.types || args.types.length === 0 || args.types.includes(child.type)) {
                    nodes.push(child as SceneNode);
                }

                // Recursively collect children if within depth limit
                if (currentDepth < maxDepth && "children" in child) {
                    nodes.push(...collectNodes(child, currentDepth + 1, maxDepth));
                }
            }

            return nodes;
        };

        const maxDepth = args.maxDepth !== undefined ? args.maxDepth : 1;
        const nodes = collectNodes(parentNode, 1, maxDepth);

        const serializedNodes = nodes.map(node => ({
            id: node.id,
            name: node.name,
            type: node.type,
            visible: node.visible,
            locked: node.locked,
            ...serializeNode(node)
        }));

        return {
            isError: false,
            content: {
                parentId: parentNode.id,
                parentName: parentNode.name,
                count: serializedNodes.length,
                nodes: serializedNodes
            }
        };
    } catch (error) {
        return {
            isError: true,
            content: error instanceof Error ? error.message : "Unknown error occurred"
        };
    }
}
