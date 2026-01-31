// Shape creation tools
export { createEllipse } from './create-ellipse.js';
export { createPolygon } from './create-polygon.js';
export { createStar } from './create-star.js';
export { createLine } from './create-line.js';
export { createVector } from './create-vector.js';
export { createArc } from './create-arc.js';
export { createSlice } from './create-slice.js';
export { createSection } from './create-section.js';
export { createSticky } from './create-sticky.js';
export { createConnector } from './create-connector.js';
export { createShapeWithText } from './create-shape-with-text.js';
export { createBooleanUnion } from './create-boolean-union.js';
export { createBooleanSubtract } from './create-boolean-subtract.js';
export { createBooleanIntersect } from './create-boolean-intersect.js';
export { createBooleanExclude } from './create-boolean-exclude.js';

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { createEllipse } from './create-ellipse.js';
import { createPolygon } from './create-polygon.js';
import { createStar } from './create-star.js';
import { createLine } from './create-line.js';
import { createVector } from './create-vector.js';
import { createArc } from './create-arc.js';
import { createSlice } from './create-slice.js';
import { createSection } from './create-section.js';
import { createSticky } from './create-sticky.js';
import { createConnector } from './create-connector.js';
import { createShapeWithText } from './create-shape-with-text.js';
import { createBooleanUnion } from './create-boolean-union.js';
import { createBooleanSubtract } from './create-boolean-subtract.js';
import { createBooleanIntersect } from './create-boolean-intersect.js';
import { createBooleanExclude } from './create-boolean-exclude.js';

/**
 * Register all shape creation tools
 */
export function registerShapeTools(server: McpServer, taskManager: TaskManager) {
    createEllipse(server, taskManager);
    createPolygon(server, taskManager);
    createStar(server, taskManager);
    createLine(server, taskManager);
    createVector(server, taskManager);
    createArc(server, taskManager);
    createSlice(server, taskManager);
    createSection(server, taskManager);
    createSticky(server, taskManager);
    createConnector(server, taskManager);
    createShapeWithText(server, taskManager);
    createBooleanUnion(server, taskManager);
    createBooleanSubtract(server, taskManager);
    createBooleanIntersect(server, taskManager);
    createBooleanExclude(server, taskManager);
}
