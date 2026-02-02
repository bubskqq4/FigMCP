# Screenshot Tool Implementation

## Overview

The screenshot tool (`screenshot-node`) has been successfully added to your Figma Local MCP server. This tool captures visual screenshots of any Figma layer/node and returns the image directly to the AI for analysis.

## Features

- **Direct Image Capture**: Takes screenshots of specific nodes by ID
- **Configurable Quality**: Supports scale factors from 0.01x to 4x
- **Multiple Formats**: PNG (with transparency) or JPG (smaller files)
- **AI Integration**: Images are sent directly to the AI for visual analysis
- **No Manual Downloads**: Fully automated - no need to handle URLs or downloads

## Files Added/Modified

### New Files Created

1. **`mcp/src/shared/types/params/screenshot/index.ts`**
   - Schema definition for screenshot parameters
   - TypeScript types for the tool

2. **`mcp/src/tools/screenshot/index.ts`**
   - Main screenshot tool implementation
   - Handles Figma REST API calls
   - Downloads and encodes images as base64
   - Returns images in MCP-compatible format

3. **`plugin/main/tools/read/get-file-key.ts`**
   - Helper tool to get current file key from Figma plugin
   - Required for screenshot tool to work

### Modified Files

1. **`mcp/src/server.ts`**
   - Added screenshot tool registration
   - Import statement for screenshot tools

2. **`plugin/main/main.ts`**
   - Added import for `getFileKey` function
   - Added handler for `get-file-key` command

3. **`TOOLS.md`**
   - Added comprehensive documentation for `screenshot-node` tool
   - Included examples and use cases

## Usage

### Basic Screenshot

```typescript
// Take a 2x screenshot (default)
await mcp.callTool("screenshot-node", {
  nodeId: "123:456"
});
```

### High Quality Screenshot

```typescript
// Ultra high quality 4x screenshot
await mcp.callTool("screenshot-node", {
  nodeId: "123:456",
  scale: 4,
  format: "png"
});
```

### Optimized for File Size

```typescript
// Lower resolution JPG for faster processing
await mcp.callTool("screenshot-node", {
  nodeId: "789:012",
  scale: 1,
  format: "jpg"
});
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `nodeId` | string | required | The ID of the node to screenshot |
| `scale` | number | 2 | Scale factor (0.01-4) |
| `format` | "png" \| "jpg" | "png" | Image format |

### Scale Factor Guide

- **`1`** = Standard resolution (fast, smaller files)
- **`2`** = Retina resolution (recommended, good balance)
- **`3`** = High quality (detailed work)
- **`4`** = Ultra quality (maximum detail)

### Format Guide

- **PNG**: Best for UI elements, icons, graphics with transparency
- **JPG**: Best for photos or complex graphics, smaller file size

## Return Value

The tool returns:
1. **Image**: Base64-encoded image sent directly to AI
2. **Metadata**: JSON with success status and screenshot details

```json
{
  "success": true,
  "nodeId": "123:456",
  "format": "png",
  "scale": 2,
  "message": "Screenshot captured successfully for node 123:456"
}
```

## Requirements

### Before Using

1. **Figma API Token**: Configure your token first
   ```typescript
   await mcp.callTool("request-api-token", {});
   ```

2. **Open Figma File**: Have a file open in the Figma desktop app

### Getting Node IDs

You can get node IDs in several ways:

1. **From Selection**:
   ```typescript
   const selection = await mcp.callTool("get-selection", {});
   const nodeId = selection.selection[0].id;
   ```

2. **From Figma Link**:
   ```typescript
   const result = await mcp.callTool("link-to-node-id", {
     link: "https://www.figma.com/file/abc/MyFile?node-id=123-456"
   });
   const nodeId = result.nodeId; // "123:456"
   ```

3. **From Node Tree**:
   ```typescript
   const tree = await mcp.callTool("get-node-tree", { depth: 2 });
   // Browse tree to find your node ID
   ```

## Common Use Cases

### Design Inspection

```typescript
// Take screenshot of a frame for visual review
const screenshot = await mcp.callTool("screenshot-node", {
  nodeId: frameId,
  scale: 2
});
// AI can now analyze the design visually
```

### Design Validation

```typescript
// Capture before making changes
const before = await mcp.callTool("screenshot-node", {
  nodeId: componentId,
  scale: 2
});

// Make modifications...
await mcp.callTool("set-fill-color", {
  nodeId: componentId,
  color: { r: 255, g: 0, b: 0 }
});

// Capture after changes
const after = await mcp.callTool("screenshot-node", {
  nodeId: componentId,
  scale: 2
});
// AI can compare before/after
```

### Multi-Device Preview

```typescript
// Capture mobile and desktop versions
const mobile = await mcp.callTool("screenshot-node", {
  nodeId: "mobile-frame-id",
  scale: 2
});

const desktop = await mcp.callTool("screenshot-node", {
  nodeId: "desktop-frame-id",
  scale: 2
});
// AI can analyze responsive design
```

### Component Library Documentation

```typescript
// Generate screenshots of all components
const components = await mcp.callTool("get-all-components", {});

for (const component of components) {
  const screenshot = await mcp.callTool("screenshot-node", {
    nodeId: component.id,
    scale: 2,
    format: "png"
  });
  // Use for component library documentation
}
```

## Architecture

### How It Works

1. **File Key Retrieval**: Tool requests current file key from Figma plugin
2. **API Call**: Makes authenticated request to Figma REST API
3. **Image Download**: Fetches image from Figma's CDN
4. **Encoding**: Converts image to base64
5. **MCP Response**: Returns image in MCP-compatible format to AI

### Tech Stack

- **Figma REST API**: For image generation
- **Node.js fetch**: For HTTP requests
- **Buffer**: For image encoding
- **TypeScript**: Full type safety
- **Zod**: Schema validation

## Error Handling

The tool handles common errors gracefully:

### No API Token
```json
{
  "error": "No API token configured. Use request-api-token first."
}
```
**Solution**: Configure your Figma API token

### No File Open
```json
{
  "error": "Could not determine current file. Make sure you have a file open in Figma."
}
```
**Solution**: Open a Figma file in the desktop app

### Invalid Node ID
```json
{
  "error": "No image URL returned from Figma API"
}
```
**Solution**: Verify the node ID is correct and exists in the current file

### API Error
```json
{
  "error": "Figma API error: 404 Not Found"
}
```
**Solution**: Check API token permissions and file access

## Performance Tips

1. **Use Appropriate Scale**: Don't use scale 4 unless needed - it's much slower
2. **Batch Operations**: If capturing multiple screenshots, add small delays between calls
3. **Format Selection**: Use JPG for large complex images to reduce transfer time
4. **Cache Results**: If analyzing the same node multiple times, save the image

## Integration with good-fullstack Skill

This tool integrates perfectly with the `good-fullstack` skill:

### Design-First Workflow

```typescript
// 1. Create design in Pencil MCP
// 2. Take screenshot for validation
const screenshot = await mcp.callTool("screenshot-node", {
  nodeId: dashboardFrameId,
  scale: 2
});

// 3. AI analyzes screenshot and confirms design matches requirements
// 4. Implement code based on validated design
```

### Design Recreation from Reference

```typescript
// 1. User provides reference image
// 2. AI analyzes reference image
// 3. Create Figma design
// 4. Take screenshot
const created = await mcp.callTool("screenshot-node", {
  nodeId: newDesignId,
  scale: 2
});

// 5. AI compares created design with reference
// 6. Iterate until match is achieved
```

## Testing the Tool

### Quick Test

```bash
# 1. Start the MCP server
cd mcp
npm run dev

# 2. In another terminal, start the Figma plugin
cd plugin
# Open Figma and run the plugin

# 3. In Cursor, test the tool:
# Get current selection
# Take screenshot of selected node
```

### Full Workflow Test

1. Open a Figma file
2. Configure API token
3. Select a frame
4. Get selection to get node ID
5. Call screenshot-node with that ID
6. Verify image is returned to AI

## Troubleshooting

### Build Errors

If you encounter TypeScript errors:
```bash
cd mcp
npm run build

cd ../plugin
npm run build
```

### Runtime Errors

Check the console logs:
- MCP server logs: Terminal where server is running
- Plugin logs: Figma > Plugins > Development > Open Console

### Common Issues

1. **"No API token"**: Run `request-api-token` first
2. **"Could not determine file"**: Make sure Figma file is open
3. **"Task timed out"**: Plugin might not be running - check Figma

## Future Enhancements

Potential improvements:
- [ ] Support for exporting entire pages
- [ ] Batch screenshot multiple nodes at once
- [ ] Screenshot with specific viewport/zoom level
- [ ] Video/GIF export for prototypes
- [ ] Comparison mode (before/after overlays)

## Support

For issues or questions:
1. Check TOOLS.md for full documentation
2. Review console logs for error details
3. Verify Figma plugin is running
4. Ensure API token has proper permissions

## Credits

This tool was built as an extension to the Figma MCP Server, following the architecture and patterns established in the existing codebase.
