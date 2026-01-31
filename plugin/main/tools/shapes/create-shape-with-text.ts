import { CreateShapeWithTextParams } from "@shared/types/params/shapes/create-shape-with-text";
import { ToolResult } from "../tool-result";

export async function createShapeWithText(args: CreateShapeWithTextParams): Promise<ToolResult> {
    const shapeWithText = figma.createShapeWithText();
    shapeWithText.name = args.name;
    shapeWithText.x = args.x;
    shapeWithText.y = args.y;
    shapeWithText.resize(
        args.width !== undefined ? args.width : 200,
        args.height !== undefined ? args.height : 100
    );
    shapeWithText.shapeType = args.shapeType !== undefined ? args.shapeType : "ROUNDED_RECTANGLE";
    
    // Load font before setting text
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    shapeWithText.text.characters = args.text;

    if (args.parentId) {
        const parent = await figma.getNodeByIdAsync(args.parentId);
        if (parent && "appendChild" in parent) {
            (parent as FrameNode).appendChild(shapeWithText);
        } else {
            return {
                isError: true,
                content: "Parent node not found or cannot have children"
            };
        }
    } else {
        figma.currentPage.appendChild(shapeWithText);
    }

    return {
        isError: false,
        content: JSON.stringify({
            id: shapeWithText.id,
            name: shapeWithText.name,
            type: shapeWithText.type,
            x: shapeWithText.x,
            y: shapeWithText.y,
            width: shapeWithText.width,
            height: shapeWithText.height,
            shapeType: shapeWithText.shapeType,
            text: shapeWithText.text.characters
        })
    };
}
