import { CreateVectorParams } from "@shared/types/params/shapes/create-vector";
import { ToolResult } from "../tool-result";

export async function createVector(args: CreateVectorParams): Promise<ToolResult> {
    const vector = figma.createVector();
    vector.name = args.name;
    vector.x = args.x;
    vector.y = args.y;
    
    // Set the vector path data
    try {
        vector.vectorPaths = [{
            windingRule: "EVENODD",
            data: args.vectorPaths
        }];
    } catch (e) {
        return {
            isError: true,
            content: `Invalid vector path data: ${e instanceof Error ? e.message : String(e)}`
        };
    }

    if (args.parentId) {
        const parent = await figma.getNodeByIdAsync(args.parentId);
        if (parent && "appendChild" in parent) {
            (parent as FrameNode).appendChild(vector);
        } else {
            return {
                isError: true,
                content: "Parent node not found or cannot have children"
            };
        }
    } else {
        figma.currentPage.appendChild(vector);
    }

    return {
        isError: false,
        content: JSON.stringify({
            id: vector.id,
            name: vector.name,
            type: vector.type,
            x: vector.x,
            y: vector.y,
            width: vector.width,
            height: vector.height
        })
    };
}
