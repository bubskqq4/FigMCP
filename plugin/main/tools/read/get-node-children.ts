import type { GetNodeChildrenParams } from "@shared/types";
import { serializeNode } from "../../serialization/serialization";
import { ToolResult } from "../tool-result";

export async function getNodeChildren(args: GetNodeChildrenParams): Promise<ToolResult> {
    try {
        const node = await figma.getNodeByIdAsync(args.id);
        
        if (!node) {
            return {
                isError: true,
                content: `Node with id ${args.id} not found`
            };
        }

        if (!("children" in node)) {
            return {
                isError: true,
                content: `Node "${node.name}" (${node.type}) does not have children`
            };
        }

        const collectChildren = (parentNode: BaseNode): SceneNode[] => {
            const children: SceneNode[] = [];
            
            if (!("children" in parentNode)) {
                return children;
            }

            for (const child of parentNode.children) {
                children.push(child as SceneNode);
                
                // Recursively collect if requested
                if (args.recursive && "children" in child) {
                    children.push(...collectChildren(child));
                }
            }

            return children;
        };

        const children = collectChildren(node);
        const serializedChildren = children.map(child => ({
            id: child.id,
            name: child.name,
            type: child.type,
            visible: child.visible,
            locked: child.locked,
            parent: child.parent?.id,
            ...serializeNode(child)
        }));

        return {
            isError: false,
            content: {
                nodeId: node.id,
                nodeName: node.name,
                nodeType: node.type,
                count: serializedChildren.length,
                recursive: args.recursive,
                children: serializedChildren
            }
        };
    } catch (error) {
        return {
            isError: true,
            content: error instanceof Error ? error.message : "Unknown error occurred"
        };
    }
}
