import z from "zod";

// Screenshot tool schema - captures a node and returns the image to AI
export const ScreenshotNodeParamsSchema = z.object({ 
  nodeId: z.string().describe("The ID of the node to screenshot (supports both 123:456 and 123-456 formats)"),
  scale: z.number().min(0.01).max(4).default(2).describe("Scale factor for the screenshot (0.01-4, default: 2). Higher values = better quality but larger file."),
  format: z.enum(["png", "jpg"]).default("png").describe("Image format. PNG supports transparency, JPG is smaller."),
  saveToPath: z.string().optional().describe("Optional: Save screenshot to a custom file path (e.g., './screenshots/my-image.png'). If not provided, saves to temp directory."),
});

export type ScreenshotNodeParams = z.infer<typeof ScreenshotNodeParamsSchema>;
