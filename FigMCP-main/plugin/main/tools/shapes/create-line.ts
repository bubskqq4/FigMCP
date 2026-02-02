import { CreateLineParams } from "@shared/types/params/shapes/create-line";
import { ToolResult } from "../tool-result";

export async function createLine(args: CreateLineParams): Promise<ToolResult> {
    const line = figma.createLine();
    line.name = args.name;
    line.x = args.x;
    line.y = args.y;
    line.resize(args.length, 0);
    line.rotation = args.rotation !== undefined ? args.rotation : 0;
    line.strokeWeight = args.strokeWeight !== undefined ? args.strokeWeight : 1;

    if (args.parentId) {
        const parent = await figma.getNodeByIdAsync(args.parentId);
        if (parent && "appendChild" in parent) {
            (parent as FrameNode).appendChild(line);
        } else {
            return {
                isError: true,
                content: "Parent node not found or cannot have children"
            };
        }
    } else {
        figma.currentPage.appendChild(line);
    }

    return {
        isError: false,
        content: JSON.stringify({
            id: line.id,
            name: line.name,
            type: line.type,
            x: line.x,
            y: line.y,
            width: line.width,
            rotation: line.rotation,
            strokeWeight: line.strokeWeight
        })
    };
}
