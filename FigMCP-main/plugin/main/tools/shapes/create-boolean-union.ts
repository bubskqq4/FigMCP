import { CreateBooleanUnionParams } from "@shared/types/params/shapes/create-boolean-union";
import { ToolResult } from "../tool-result";

export async function createBooleanUnion(args: CreateBooleanUnionParams): Promise<ToolResult> {
    // Get all nodes to combine
    const nodes: SceneNode[] = [];
    for (const nodeId of args.nodeIds) {
        const node = await figma.getNodeByIdAsync(nodeId);
        if (node && "type" in node) {
            nodes.push(node as SceneNode);
        }
    }

    if (nodes.length < 2) {
        return {
            isError: true,
            content: "Need at least 2 valid nodes for boolean union"
        };
    }

    // Create boolean union
    const booleanGroup = figma.union(nodes, nodes[0].parent as FrameNode | GroupNode | PageNode);
    booleanGroup.name = args.name !== undefined ? args.name : "Boolean Union";

    return {
        isError: false,
        content: JSON.stringify({
            id: booleanGroup.id,
            name: booleanGroup.name,
            type: booleanGroup.type,
            x: booleanGroup.x,
            y: booleanGroup.y,
            width: booleanGroup.width,
            height: booleanGroup.height,
            booleanOperation: "UNION"
        })
    };
}
