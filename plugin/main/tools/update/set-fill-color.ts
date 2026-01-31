import { ToolResult } from "tools/tool-result";
import { SetFillColorParams } from "@shared/types";
import { getSolidHEXColorPaint } from "utils/get-solid-color-paint";
import { serializeNode } from "serialization/serialization";
export async function setFillColor(args: SetFillColorParams): Promise<ToolResult> {
    const node = await figma.getNodeByIdAsync(args.id);
    if (!node) {
        return { isError: true, content: "Node not found" };
    }
    try {
        if ("fills" in node) {
            (node as unknown as { fills: Paint[] }).fills = [getSolidHEXColorPaint(args.color)];
        }
        else {
            return { isError: true, content: "Node does not have a fills property" };
        }
    }
    catch (error) {
        return { isError: true, content: `Error setting fill color: ${error instanceof Error ? error.message : JSON.stringify(error)}` };
    }
    return { isError: false, content: serializeNode(node) };
}