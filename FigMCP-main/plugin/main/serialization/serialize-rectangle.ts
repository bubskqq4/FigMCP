export function serializeRectangle(rectangle: RectangleNode): string {
    return JSON.stringify({
        id: rectangle.id,
        x: rectangle.x,
        y: rectangle.y,
        width: rectangle.width,
        height: rectangle.height,
        name: rectangle.name,
        parentId: rectangle.parent
            ? `${rectangle.parent.id}:${rectangle.parent.type}`
            : undefined
    });
}