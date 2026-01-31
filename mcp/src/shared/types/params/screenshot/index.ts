import z from "zod";

// Screenshot tool schema - captures a node and returns the image to AI
export const ScreenshotNodeParamsSchema = z.object({ 
  nodeId: z.string().describe("The ID of the node to screenshot"),
  scale: z.number().min(0.01).max(4).default(2).describe("Scale factor for the screenshot (0.01-4, default: 2)"),
  format: z.enum(["png", "jpg"]).default("png").describe("Image format"),
});

export type ScreenshotNodeParams = z.infer<typeof ScreenshotNodeParamsSchema>;
