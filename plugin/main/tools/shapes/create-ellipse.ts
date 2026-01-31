import { CreateEllipseParams } from "@shared/types/params/shapes/create-ellipse";
import { ToolResult } from "../tool-result";

export async function createEllipse(args: CreateEllipseParams): Promise<ToolResult> {
    const ellipse = figma.createEllipse();
    ellipse.name = args.name;
    ellipse.x = args.x;
    ellipse.y = args.y;
    ellipse.resize(args.width, args.height);

    if (args.parentId) {
        const parent = await figma.getNodeByIdAsync(args.parentId);
        if (parent && "appendChild" in parent) {
            (parent as FrameNode).appendChild(ellipse);
        } else {
            return {
                isError: true,
                content: "Parent node not found or cannot have children"
            };
        }
    } else {
        figma.currentPage.appendChild(ellipse);
    }

    return {
        isError: false,
        content: JSON.stringify({
            id: ellipse.id,
            name: ellipse.name,
            type: ellipse.type,
            x: ellipse.x,
            y: ellipse.y,
            width: ellipse.width,
            height: ellipse.height
        })
    };
}
