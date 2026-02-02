import { CreatePolygonParams } from "@shared/types/params/shapes/create-polygon";
import { ToolResult } from "../tool-result";

export async function createPolygon(args: CreatePolygonParams): Promise<ToolResult> {
    const polygon = figma.createPolygon();
    polygon.name = args.name;
    polygon.x = args.x;
    polygon.y = args.y;
    polygon.resize(args.width, args.height);
    polygon.pointCount = args.pointCount !== undefined ? args.pointCount : 6;

    if (args.parentId) {
        const parent = await figma.getNodeByIdAsync(args.parentId);
        if (parent && "appendChild" in parent) {
            (parent as FrameNode).appendChild(polygon);
        } else {
            return {
                isError: true,
                content: "Parent node not found or cannot have children"
            };
        }
    } else {
        figma.currentPage.appendChild(polygon);
    }

    return {
        isError: false,
        content: JSON.stringify({
            id: polygon.id,
            name: polygon.name,
            type: polygon.type,
            x: polygon.x,
            y: polygon.y,
            width: polygon.width,
            height: polygon.height,
            pointCount: polygon.pointCount
        })
    };
}
