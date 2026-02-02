export function serializeComponent(component: ComponentNode | ComponentSetNode): string {
    const properties = component.componentPropertyDefinitions;

    return JSON.stringify({
        id: component.id,
        name: component.name,
        key: component.key,
        properties: properties,
    });
}