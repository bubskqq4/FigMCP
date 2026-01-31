import { CreateSectionParams } from "@shared/types/params/shapes/create-section";
import { ToolResult } from "../tool-result";

export async function createSection(args: CreateSectionParams): Promise<ToolResult> {
    const section = figma.createSection();
    section.name = args.name;
    section.x = args.x;
    section.y = args.y;
    section.resizeWithoutConstraints(
        args.width !== undefined ? args.width : 400,
        args.height !== undefined ? args.height : 300
    );

    figma.currentPage.appendChild(section);

    return {
        isError: false,
        content: JSON.stringify({
            id: section.id,
            name: section.name,
            type: section.type,
            x: section.x,
            y: section.y,
            width: section.width,
            height: section.height
        })
    };
}
