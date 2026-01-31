import { CreateStarParams } from "@shared/types/params/shapes/create-star";
import { ToolResult } from "../tool-result";

export async function createStar(args: CreateStarParams): Promise<ToolResult> {
    const star = figma.createStar();
    star.name = args.name;
    star.x = args.x;
    star.y = args.y;
    star.resize(args.width, args.height);
    star.pointCount = args.pointCount !== undefined ? args.pointCount : 5;
    star.innerRadius = args.innerRadius !== undefined ? args.innerRadius : 0.382;

    if (args.parentId) {
        const parent = await figma.getNodeByIdAsync(args.parentId);
        if (parent && "appendChild" in parent) {
            (parent as FrameNode).appendChild(star);
        } else {
            return {
                isError: true,
                content: "Parent node not found or cannot have children"
            };
        }
    } else {
        figma.currentPage.appendChild(star);
    }

    return {
        isError: false,
        content: JSON.stringify({
            id: star.id,
            name: star.name,
            type: star.type,
            x: star.x,
            y: star.y,
            width: star.width,
            height: star.height,
            pointCount: star.pointCount,
            innerRadius: star.innerRadius
        })
    };
}
