import { CreateStickyParams } from "@shared/types/params/shapes/create-sticky";
import { ToolResult } from "../tool-result";

export async function createSticky(args: CreateStickyParams): Promise<ToolResult> {
    const sticky = figma.createSticky();
    sticky.x = args.x;
    sticky.y = args.y;
    sticky.text.characters = args.text;
    sticky.authorVisible = args.authorVisible !== undefined ? args.authorVisible : true;

    figma.currentPage.appendChild(sticky);

    return {
        isError: false,
        content: JSON.stringify({
            id: sticky.id,
            type: sticky.type,
            x: sticky.x,
            y: sticky.y,
            text: sticky.text.characters,
            authorVisible: sticky.authorVisible
        })
    };
}
