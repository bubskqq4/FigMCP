import { CreateArcParams } from "@shared/types/params/shapes/create-arc";
import { ToolResult } from "../tool-result";

export async function createArc(args: CreateArcParams): Promise<ToolResult> {
    // Create an ellipse and configure it as an arc
    const arc = figma.createEllipse();
    arc.name = args.name;
    arc.x = args.x;
    arc.y = args.y;
    arc.resize(args.width, args.height);
    
    // Convert degrees to radians for Figma API
    const startAngle = ((args.startAngle !== undefined ? args.startAngle : 0) * Math.PI) / 180;
    const endAngle = ((args.endAngle !== undefined ? args.endAngle : 270) * Math.PI) / 180;
    const innerRadius = args.innerRadius !== undefined ? args.innerRadius : 0;
    
    arc.arcData = {
        startingAngle: startAngle,
        endingAngle: endAngle,
        innerRadius: innerRadius
    };

    if (args.parentId) {
        const parent = await figma.getNodeByIdAsync(args.parentId);
        if (parent && "appendChild" in parent) {
            (parent as FrameNode).appendChild(arc);
        } else {
            return {
                isError: true,
                content: "Parent node not found or cannot have children"
            };
        }
    } else {
        figma.currentPage.appendChild(arc);
    }

    return {
        isError: false,
        content: JSON.stringify({
            id: arc.id,
            name: arc.name,
            type: arc.type,
            x: arc.x,
            y: arc.y,
            width: arc.width,
            height: arc.height,
            arcData: arc.arcData
        })
    };
}
