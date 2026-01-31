import type { SearchNodesParams } from "@shared/types";
import { serializeNode } from "../../serialization/serialization";
import { ToolResult } from "../tool-result";

export async function searchNodes(args: SearchNodesParams): Promise<ToolResult> {
    try {
        await figma.loadAllPagesAsync();
        
        let searchRoot: BaseNode = figma.root;
        
        // If pageId specified, search only in that page
        if (args.pageId) {
            const page = await figma.getNodeByIdAsync(args.pageId);
            if (!page || page.type !== "PAGE") {
                return {
                    isError: true,
                    content: `Page with id ${args.pageId} not found`
                };
            }
            searchRoot = page;
        }

        // Build search criteria
        const criteria: { types?: NodeType[] } = {};
        if (args.types && args.types.length > 0) {
            criteria.types = args.types as NodeType[];
        }

        // Find all nodes matching type criteria
        const allNodes = searchRoot.findAllWithCriteria(criteria);
        
        // Filter by name
        const matchingNodes = allNodes.filter(node => {
            if (args.exactMatch) {
                return node.name === args.query;
            } else {
                return node.name.toLowerCase().includes(args.query.toLowerCase());
            }
        });

        const serializedNodes = matchingNodes.map(node => ({
            id: node.id,
            name: node.name,
            type: node.type,
            visible: node.visible,
            locked: node.locked,
            parent: node.parent?.id,
            parentName: node.parent?.name,
            ...serializeNode(node as SceneNode)
        }));

        return {
            isError: false,
            content: {
                query: args.query,
                exactMatch: args.exactMatch,
                types: args.types,
                count: serializedNodes.length,
                results: serializedNodes
            }
        };
    } catch (error) {
        return {
            isError: true,
            content: error instanceof Error ? error.message : "Unknown error occurred"
        };
    }
}
