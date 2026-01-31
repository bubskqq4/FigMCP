import { CreateConnectorParams } from "@shared/types/params/shapes/create-connector";
import { ToolResult } from "../tool-result";

export async function createConnector(args: CreateConnectorParams): Promise<ToolResult> {
    const connector = figma.createConnector();
    connector.name = args.name !== undefined ? args.name : "Connector";
    connector.strokeWeight = args.strokeWeight !== undefined ? args.strokeWeight : 2;
    connector.connectorLineType = args.connectorLineType !== undefined ? args.connectorLineType : "ELBOWED";

    // Configure start endpoint
    if (args.startEndpoint.nodeId) {
        const startNode = await figma.getNodeByIdAsync(args.startEndpoint.nodeId);
        if (startNode && "absoluteBoundingBox" in startNode) {
            connector.connectorStart = {
                endpointNodeId: args.startEndpoint.nodeId,
                magnet: args.startEndpoint.magnet !== undefined ? args.startEndpoint.magnet : "AUTO"
            };
        }
    } else if (args.startEndpoint.position) {
        connector.connectorStart = {
            position: args.startEndpoint.position
        };
    }

    // Configure end endpoint
    if (args.endEndpoint.nodeId) {
        const endNode = await figma.getNodeByIdAsync(args.endEndpoint.nodeId);
        if (endNode && "absoluteBoundingBox" in endNode) {
            connector.connectorEnd = {
                endpointNodeId: args.endEndpoint.nodeId,
                magnet: args.endEndpoint.magnet !== undefined ? args.endEndpoint.magnet : "AUTO"
            };
        }
    } else if (args.endEndpoint.position) {
        connector.connectorEnd = {
            position: args.endEndpoint.position
        };
    }

    figma.currentPage.appendChild(connector);

    return {
        isError: false,
        content: JSON.stringify({
            id: connector.id,
            name: connector.name,
            type: connector.type,
            strokeWeight: connector.strokeWeight,
            connectorLineType: connector.connectorLineType
        })
    };
}
