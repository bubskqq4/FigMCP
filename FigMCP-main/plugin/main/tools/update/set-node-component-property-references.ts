import { serializeNode } from "serialization/serialization";
import { SetNodeComponentPropertyReferencesParams } from "@shared/types";
import { ToolResult } from "tools/tool-result";

export async function setNodeComponentPropertyReferences(args: SetNodeComponentPropertyReferencesParams): Promise<ToolResult> {
    const node = await figma.getNodeByIdAsync(args.id);
    if (!node) {
        return { isError: true, content: "Node not found" };
    }

    const sceneNode = node as SceneNode;
    sceneNode.componentPropertyReferences = args.componentPropertyReferences;
    
    const updatedNode = await figma.getNodeByIdAsync(args.id);
    return { isError: false, content: serializeNode(updatedNode as SceneNode) };
}