import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { config } from "node:process";
import z from "zod";
import type { Config } from "./config.js";
import * as fs from "fs";
import * as path from "path";
import { TaskManager } from "./task-manager.js";
import type { Server, Socket } from "socket.io";
import { SocketManager } from "./socket-manager.js";
import { Orchestrator } from "./orchestrator.js";
import { getSelection } from "./tools/read/get-selection.js";
import { getNodeInfo } from "./tools/read/get-node-info.js";
import { listNodes } from "./tools/read/list-nodes.js";
import { getNodeChildren } from "./tools/read/get-node-children.js";
import { searchNodes } from "./tools/read/search-nodes.js";
import { getNodeTree } from "./tools/read/get-node-tree.js";
import { getLayerTree } from "./tools/read/get-layer-tree.js";
import { createRectangle } from "./tools/create/create-rectangle.js";
import { moveNode } from "./tools/update/move-node.js";
import { resizeNode } from "./tools/update/resize-node.js";
import { deleteNode } from "./tools/delete/delete-node.js";
import { cloneNode } from "./tools/create/clone-node.js";
import { createFrame } from "./tools/create/create-frame.js";
import { createText } from "./tools/create/create-text.js";
import { setFillColor } from "./tools/update/set-fill-color.js";
import { setStrokeColor } from "./tools/update/set-stroke-color.js";
import { setCornerRadius } from "./tools/update/set-corner-radius.js";
import { setLayout } from "./tools/update/set-layout.js";
import { getAllComponents } from "./tools/read/get-all-components.js";
import { createInstance } from "./tools/create/create-instance.js";
import { addComponentProperty } from "./tools/create/add-component-property.js";
import { editComponentProperty } from "./tools/update/edit-component-property.js";
import { deleteComponentProperty } from "./tools/delete/delete-component-property.js";
import { setInstanceProperties } from "./tools/update/set-instance-properties.js";
import { createComponent } from "./tools/create/create-component.js";
import { setParentId } from "./tools/update/set-parent-id.js";
import { setNodeComponentPropertyReferences } from "./tools/update/set-node-component-property-references.js";
import { getPages } from "./tools/read/get-pages.js";

// Shape tools
import { registerShapeTools } from "./tools/shapes/index.js";
// Group tools
import { registerGroupTools } from "./tools/group/index.js";
// Movement tools
import { registerMovementTools } from "./tools/movement/index.js";
// Transform tools
import { registerTransformTools } from "./tools/transform/index.js";
// Visibility tools
import { registerVisibilityTools } from "./tools/visibility/index.js";
// AI Helper tools
import { registerAIHelperTools } from "./tools/ai-helper/index.js";
// Token Management tools
import { registerTokenManagementTools } from "./tools/token-mgmt/index.js";
// Fill tools
import { registerFillTools } from "./tools/fills/index.js";
// Stroke tools
import { registerStrokeTools } from "./tools/strokes/index.js";
// Effect tools
import { registerEffectTools } from "./tools/effects/index.js";
// Corner tools
import { registerCornerTools } from "./tools/corners/index.js";
// Text tools
import { registerTextTools } from "./tools/text/index.js";
// Auto Layout tools
import { registerAutoLayoutTools } from "./tools/autolayout/index.js";
// Component tools
import { registerComponentTools } from "./tools/components/index.js";
// Style tools
import { registerStyleTools } from "./tools/styles/index.js";
// Variable tools
import { registerVariableTools } from "./tools/variables/index.js";
// Export tools
import { registerExportTools } from "./tools/export/index.js";
// Selection tools
import { registerSelectionTools } from "./tools/selection/index.js";
// Page tools
import { registerPageTools } from "./tools/pages/index.js";
// Search tools
import { registerSearchTools } from "./tools/search/index.js";
// Clipboard tools
import { registerClipboardTools } from "./tools/clipboard/index.js";
// Constraint tools
import { registerConstraintTools } from "./tools/constraints/index.js";
// Z-Order tools
import { registerZOrderTools } from "./tools/zorder/index.js";
// Doc Info tools
import { registerDocInfoTools } from "./tools/docinfo/index.js";
// File Operations tools
import { registerFileOpsTools } from "./tools/file-ops/index.js";
// Code Generation tools
import { registerCodeGenTools } from "./tools/code-gen/index.js";
// REST API tools
import { registerRestApiTools } from "./tools/rest-api/index.js";
// Link Utils tools
import { registerLinkUtilsTools } from "./tools/link-utils/index.js";
// Screenshot tools
import { registerScreenshotTools } from "./tools/screenshot/index.js";
// Design System tools
import { registerDesignSystemTools } from "./tools/design-system/index.js";
// Design Thinking tools (40)
import { registerDesignThinkingTools } from "./tools/design-thinking/index.js";
// UI Pattern tools (60)
import { registerUIPatternTools } from "./tools/ui-patterns/index.js";
// Analysis tools (50)
import { registerAnalysisTools } from "./tools/analysis/index.js";
// Design System Extended tools (30)
import { registerDesignSystemExtendedTools } from "./tools/design-system-extended/index.js";
// Accessibility tools (25)
import { registerAccessibilityTools } from "./tools/accessibility-tools/index.js";
// Performance tools (15)
import { registerPerformanceTools } from "./tools/performance-tools/index.js";
// Resources
import { registerAllResources } from "./resources/all-resources.js";
// Prompts
import { registerAllPrompts } from "./prompts/all-prompts.js";

export async function getServer(server: Server): Promise<McpServer> {

    const taskManager = new TaskManager();
    const socketManager = new SocketManager(server);
    const orchestrator = new Orchestrator(socketManager, taskManager);

    const mcpServer = new McpServer({
        name: `MCP Server for Figma`,
        description: "Model Context Protocol Server for Figma",
        version: "0.1.1",
    });

    // ============================================
    // CONNECTION STATUS TOOL (doesn't require Figma connection)
    // ============================================
    mcpServer.tool(
        "check-connection",
        "Check if the Figma plugin is connected to this MCP server. Use this first to diagnose connection issues.",
        {},
        async () => {
            const isConnected = socketManager.isConnected;
            const connectionCount = socketManager.connectionCount;
            
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify({
                        connected: isConnected,
                        connectionCount: connectionCount,
                        serverPort: process.env.PORT || 38451,
                        status: isConnected 
                            ? `✓ Figma plugin is connected (${connectionCount} active connection${connectionCount > 1 ? 's' : ''})` 
                            : "✗ Figma plugin is NOT connected",
                        instructions: isConnected 
                            ? "You can now use all Figma MCP tools."
                            : [
                                "To connect the Figma plugin:",
                                "1. Open Figma desktop app",
                                "2. Open a design file",
                                "3. Go to Plugins > FigMCP (or run from Recent)",
                                "4. The plugin should auto-connect to this server",
                                `5. Make sure the plugin is connecting to port ${process.env.PORT || 38451}`
                            ]
                    }, null, 2)
                }]
            };
        }
    );
 
    // Register tools

    // Create tools
    createRectangle(mcpServer, taskManager);
    cloneNode(mcpServer, taskManager);
    createFrame(mcpServer, taskManager);
    createText(mcpServer, taskManager);
    createInstance(mcpServer, taskManager);
    addComponentProperty(mcpServer, taskManager);
    createComponent(mcpServer, taskManager);
    // Read tools
    getSelection(mcpServer, taskManager);
    getNodeInfo(mcpServer, taskManager);
    getAllComponents(mcpServer, taskManager);
    getPages(mcpServer, taskManager);
    listNodes(mcpServer, taskManager);
    getNodeChildren(mcpServer, taskManager);
    searchNodes(mcpServer, taskManager);
    getNodeTree(mcpServer, taskManager);
    getLayerTree(mcpServer, taskManager);

    // Update tools
    moveNode(mcpServer, taskManager);
    resizeNode(mcpServer, taskManager);
    setFillColor(mcpServer, taskManager);
    setStrokeColor(mcpServer, taskManager);
    setCornerRadius(mcpServer, taskManager);
    setLayout(mcpServer, taskManager);
    editComponentProperty(mcpServer, taskManager);
    setInstanceProperties(mcpServer, taskManager);
    setParentId(mcpServer, taskManager);
    setNodeComponentPropertyReferences(mcpServer, taskManager);
    // Delete tools
    deleteNode(mcpServer, taskManager);
    deleteComponentProperty(mcpServer, taskManager);

    // Shape tools (15)
    registerShapeTools(mcpServer, taskManager);

    // Group tools (10)
    registerGroupTools(mcpServer, taskManager);

    // Movement tools (15)
    registerMovementTools(mcpServer, taskManager);

    // Transform tools (12)
    registerTransformTools(mcpServer, taskManager);

    // Visibility tools (8)
    registerVisibilityTools(mcpServer, taskManager);

    // AI Helper tools (15)
    registerAIHelperTools(mcpServer, taskManager);

    // Token Management tools (5)
    registerTokenManagementTools(mcpServer, taskManager);

    // Fill tools (18)
    registerFillTools(mcpServer, taskManager);

    // Stroke tools (12)
    registerStrokeTools(mcpServer, taskManager);

    // Effect tools (12)
    registerEffectTools(mcpServer, taskManager);

    // Corner tools (6)
    registerCornerTools(mcpServer, taskManager);

    // Text tools (20)
    registerTextTools(mcpServer, taskManager);

    // Auto Layout tools (15)
    registerAutoLayoutTools(mcpServer, taskManager);

    // Component tools (12)
    registerComponentTools(mcpServer, taskManager);

    // Style tools (12)
    registerStyleTools(mcpServer, taskManager);

    // Variable tools (10)
    registerVariableTools(mcpServer, taskManager);

    // Export tools (8)
    registerExportTools(mcpServer, taskManager);

    // Selection tools (10)
    registerSelectionTools(mcpServer, taskManager);

    // Page tools (6)
    registerPageTools(mcpServer, taskManager);

    // Search tools (8)
    registerSearchTools(mcpServer, taskManager);

    // Clipboard tools (6)
    registerClipboardTools(mcpServer, taskManager);

    // Constraint tools (6)
    registerConstraintTools(mcpServer, taskManager);

    // Z-Order tools (8)
    registerZOrderTools(mcpServer, taskManager);

    // Doc Info tools (5)
    registerDocInfoTools(mcpServer, taskManager);

    // File Operations tools (8)
    registerFileOpsTools(mcpServer, taskManager);

    // Code Generation tools (10)
    registerCodeGenTools(mcpServer, taskManager);

    // REST API tools (25)
    registerRestApiTools(mcpServer, taskManager);

    // Link Utils tools (1)
    registerLinkUtilsTools(mcpServer, taskManager);

    // Screenshot tools (1)
    registerScreenshotTools(mcpServer, taskManager);

    // Design System tools (15) - Guidelines, style guides, UI patterns
    registerDesignSystemTools(mcpServer, taskManager);

    // Design Thinking tools (40) - Personas, journey maps, wireframes, etc.
    registerDesignThinkingTools(mcpServer, taskManager);

    // UI Pattern tools (60) - Navigation, content, forms, data display, feedback, layouts
    registerUIPatternTools(mcpServer, taskManager);

    // Analysis tools (50) - Visual, UX, accessibility, performance analysis
    registerAnalysisTools(mcpServer, taskManager);

    // Design System Extended tools (30) - Tokens, component docs, guidelines
    registerDesignSystemExtendedTools(mcpServer, taskManager);

    // Accessibility tools (25) - Checks, fixes, accessible component creation
    registerAccessibilityTools(mcpServer, taskManager);

    // Performance tools (15) - Optimization, analysis, skeleton screens
    registerPerformanceTools(mcpServer, taskManager);

    // Resources (94 total: 40 original + 54 new)
    registerAllResources(mcpServer, taskManager);

    // Prompts (55 total: 25 original + 30 new)
    registerAllPrompts(mcpServer);

    return mcpServer;
}
