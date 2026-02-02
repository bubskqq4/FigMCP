import type { GetNodeTreeParams } from "@shared/types";
import { serializeNode } from "../../serialization/serialization";
import { ToolResult } from "../tool-result";

interface NodeTreeItem {
    id: string;
    name: string;
    type: string;
    visible: boolean;
    locked: boolean;
    depth: number;
    children?: NodeTreeItem[];
    [key: string]: any;
}

export async function getNodeTree(args: GetNodeTreeParams): Promise<ToolResult> {
    try {
        const rootNode = await figma.getNodeByIdAsync(args.id);
        
        if (!rootNode) {
            return {
                isError: true,
                content: `Node with id ${args.id} not found`
            };
        }

        const maxDepth = args.maxDepth !== undefined ? args.maxDepth : 3;
        const includeHidden = args.includeHidden !== undefined ? args.includeHidden : false;

        const buildTree = (node: BaseNode, currentDepth: number): NodeTreeItem | null => {
            // Skip hidden nodes if not included
            if (!includeHidden && "visible" in node && !node.visible) {
                return null;
            }

            const treeItem: NodeTreeItem = {
                id: node.id,
                name: node.name,
                type: node.type,
                visible: "visible" in node ? node.visible : true,
                locked: "locked" in node ? node.locked : false,
                depth: currentDepth,
                ...serializeNode(node as SceneNode)
            };

            // Add children if within depth limit and node has children
            if (currentDepth < maxDepth && "children" in node) {
                const children: NodeTreeItem[] = [];
                
                for (const child of node.children) {
                    const childTree = buildTree(child, currentDepth + 1);
                    if (childTree !== null) {
                        children.push(childTree);
                    }
                }
                
                if (children.length > 0) {
                    treeItem.children = children;
                }
            }

            return treeItem;
        };

        const tree = buildTree(rootNode, 0);

        if (!tree) {
            return {
                isError: true,
                content: "Node is hidden and includeHidden is false"
            };
        }

        return {
            isError: false,
            content: {
                maxDepth,
                includeHidden,
                tree
            }
        };
    } catch (error) {
        return {
            isError: true,
            content: error instanceof Error ? error.message : "Unknown error occurred"
        };
    }
}
