import { SetStrokeColorParams } from "@shared/types";
import { getSolidHEXColorPaint } from "utils/get-solid-color-paint";
import { ToolResult } from "tools/tool-result";
import { serializeNode } from "serialization/serialization";

export async function setStrokeColor(args: SetStrokeColorParams): Promise<ToolResult> {
    const node = await figma.getNodeByIdAsync(args.id);
    if (!node) {
        return { isError: true, content: "Node not found" };
    }
    try {
        if ("strokes" in node) {
            (node as unknown as { strokes: Paint[] }).strokes = [getSolidHEXColorPaint(args.color)];
        }
        else {
            return { isError: true, content: "Node does not have a strokes property" };
        }
    }
    catch (error) {
        return { isError: true, content: `Error setting stroke color: ${error instanceof Error ? error.message : JSON.stringify(error)}` };
    }
    return { isError: false, content: serializeNode(node) };
}