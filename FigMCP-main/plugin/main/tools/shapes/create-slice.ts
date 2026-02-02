import { CreateSliceParams } from "@shared/types/params/shapes/create-slice";
import { ToolResult } from "../tool-result";

export async function createSlice(args: CreateSliceParams): Promise<ToolResult> {
    const slice = figma.createSlice();
    slice.name = args.name;
    slice.x = args.x;
    slice.y = args.y;
    slice.resize(args.width, args.height);

    if (args.parentId) {
        const parent = await figma.getNodeByIdAsync(args.parentId);
        if (parent && "appendChild" in parent) {
            (parent as FrameNode).appendChild(slice);
        } else {
            return {
                isError: true,
                content: "Parent node not found or cannot have children"
            };
        }
    } else {
        figma.currentPage.appendChild(slice);
    }

    return {
        isError: false,
        content: JSON.stringify({
            id: slice.id,
            name: slice.name,
            type: slice.type,
            x: slice.x,
            y: slice.y,
            width: slice.width,
            height: slice.height
        })
    };
}
