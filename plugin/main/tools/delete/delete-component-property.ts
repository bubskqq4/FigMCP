import { DeleteComponentPropertyParams } from "@shared/types";
import { ToolResult } from "tools/tool-result";

export async function deleteComponentProperty(args: DeleteComponentPropertyParams): Promise<ToolResult> {
    const component = await figma.getNodeByIdAsync(args.componentId);
    if (!component) {
        return { isError: true, content: "Component not found" };
    }
    if (!(component.type === "COMPONENT")) {
        return { isError: true, content: "Node is not a component" };
    }   
    const componentNode = component as ComponentNode;
    componentNode.deleteComponentProperty(args.name);
    return { isError: false, content: "Component property deleted successfully" };
}