import type { GetAllComponentsParams } from "@shared/types";
import { ToolResult } from "../tool-result";
import { serializeComponent } from "serialization/serialize-component";

export async function getAllComponents(args: GetAllComponentsParams): Promise<ToolResult> {
    await figma.loadAllPagesAsync();
    const components = figma.root.findAllWithCriteria({
        types: ["COMPONENT", "COMPONENT_SET"],
    });

    if (components.length === 0) {
        return {
            isError: false,
            content: "No components found"
        };
    }

    const serializedComponents = components.map(
        component => serializeComponent(component as ComponentNode | ComponentSetNode));

    return {
        isError: false,
        content: serializedComponents
    };
}