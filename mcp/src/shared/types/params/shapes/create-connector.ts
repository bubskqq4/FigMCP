import z from "zod";

export const ConnectorEndpointSchema = z.object({
  nodeId: z.string().optional().describe("ID of the node to connect to"),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }).optional().describe("Position if not connected to a node"),
  magnet: z.enum(["AUTO", "TOP", "BOTTOM", "LEFT", "RIGHT", "CENTER"]).default("AUTO").describe("Connection point on the node"),
});

export const CreateConnectorParamsSchema = z.object({
  name: z.string().default("Connector").describe("Name of the connector"),
  startEndpoint: ConnectorEndpointSchema.describe("Starting endpoint configuration"),
  endEndpoint: ConnectorEndpointSchema.describe("Ending endpoint configuration"),
  strokeWeight: z.number().default(2).describe("Stroke weight of the connector"),
  connectorLineType: z.enum(["ELBOWED", "STRAIGHT"]).default("ELBOWED").describe("Type of connector line"),
});

export type CreateConnectorParams = z.infer<typeof CreateConnectorParamsSchema>;
