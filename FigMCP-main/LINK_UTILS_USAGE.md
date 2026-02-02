# Link to Node ID Tool - Usage Guide

## Overview

The `link-to-node-id` tool converts Figma element/layer share links into node IDs that can be used with other MCP tools. This is especially useful when working with designs shared by team members or extracting node references from documentation.

## How It Works

When you copy a link to a Figma element (right-click → Copy Link), Figma creates a URL with a `node-id` parameter. This tool:
1. Parses the Figma URL
2. Extracts the `node-id` parameter
3. Converts the URL format (dash-separated) to API format (colon-separated)
4. Returns the usable node ID

## Supported Link Formats

The tool supports all standard Figma link formats:

### File Links
```
https://www.figma.com/file/FILE_KEY/FILE_NAME?node-id=123-456
```

### Design Links
```
https://www.figma.com/design/FILE_KEY/FILE_NAME?node-id=123-456
```

### Prototype Links
```
https://www.figma.com/proto/FILE_KEY/FILE_NAME?node-id=123-456
```

## Usage Examples

### Basic Usage

```typescript
import { CallMcpTool } from "@/mcp";

// Convert a Figma link to node ID
const result = await CallMcpTool("user-Figma_Local", "link-to-node-id", {
  link: "https://www.figma.com/file/abc123/MyDesign?node-id=123-456"
});

console.log(result.nodeId); // Output: "123:456"
```

### Workflow: From Link to Node Information

```typescript
// Step 1: Convert link to node ID
const linkResult = await CallMcpTool("user-Figma_Local", "link-to-node-id", {
  link: "https://www.figma.com/file/abc123/MyDesign?node-id=789-101"
});

// Step 2: Use the node ID to get node information
const nodeInfo = await CallMcpTool("user-Figma_Local", "get-node-info", {
  id: linkResult.nodeId
});

console.log(nodeInfo);
```

### Batch Processing Multiple Links

```typescript
const figmaLinks = [
  "https://www.figma.com/file/abc/Design?node-id=1-2",
  "https://www.figma.com/file/abc/Design?node-id=3-4",
  "https://www.figma.com/file/abc/Design?node-id=5-6"
];

const nodeIds = await Promise.all(
  figmaLinks.map(async (link) => {
    const result = await CallMcpTool("user-Figma_Local", "link-to-node-id", {
      link
    });
    return result.nodeId;
  })
);

console.log(nodeIds); // ["1:2", "3:4", "5:6"]
```

### Error Handling

```typescript
try {
  const result = await CallMcpTool("user-Figma_Local", "link-to-node-id", {
    link: "https://invalid-url.com"
  });
  console.log(result.nodeId);
} catch (error) {
  console.error("Invalid Figma link:", error);
}
```

## Common Use Cases

### 1. Design Handoff Automation
When developers receive Figma links from designers:
```typescript
async function processDesignHandoff(figmaLink: string) {
  // Convert link to node ID
  const { nodeId } = await CallMcpTool("user-Figma_Local", "link-to-node-id", {
    link: figmaLink
  });
  
  // Export the design element
  const exportResult = await CallMcpTool("user-Figma_Local", "export-node", {
    nodeId,
    format: "PNG",
    scale: 2
  });
  
  return exportResult;
}
```

### 2. Documentation Link Parsing
Extract node IDs from markdown documentation:
```typescript
async function parseDesignDocs(markdownContent: string) {
  const figmaLinkRegex = /https:\/\/www\.figma\.com\/[^\s)]+/g;
  const links = markdownContent.match(figmaLinkRegex) || [];
  
  const nodeIds = await Promise.all(
    links.map(async (link) => {
      const result = await CallMcpTool("user-Figma_Local", "link-to-node-id", {
        link
      });
      return { link, nodeId: result.nodeId };
    })
  );
  
  return nodeIds;
}
```

### 3. Component Library Sync
Sync components referenced in external systems:
```typescript
async function syncComponentFromLink(componentLink: string) {
  const { nodeId } = await CallMcpTool("user-Figma_Local", "link-to-node-id", {
    link: componentLink
  });
  
  // Get component details
  const component = await CallMcpTool("user-Figma_Local", "get-node-info", {
    id: nodeId
  });
  
  // Create local instance
  const instance = await CallMcpTool("user-Figma_Local", "create-instance", {
    componentId: nodeId,
    x: 0,
    y: 0
  });
  
  return instance;
}
```

## Response Format

### Success Response
```json
{
  "nodeId": "123:456",
  "originalLink": "https://www.figma.com/file/abc123/MyFile?node-id=123-456",
  "success": true
}
```

### Error Response
```json
{
  "error": "No node-id parameter found in the Figma link",
  "originalLink": "https://www.figma.com/file/abc123/MyFile",
  "success": false
}
```

## Format Conversion

The tool automatically converts between URL and API formats:

| Format | Example | Usage |
|--------|---------|-------|
| **URL Format** (dash-separated) | `123-456` | Used in Figma share links |
| **API Format** (colon-separated) | `123:456` | Used in Figma API and MCP tools |

## Tips & Best Practices

1. **Always validate links** before processing in production
2. **Cache node IDs** if you're processing the same links multiple times
3. **Handle errors gracefully** - invalid links should not break your workflow
4. **Consider rate limiting** when batch processing many links
5. **Store node IDs separately** - links may become outdated but node IDs remain stable

## Integration with Other Tools

The node ID returned by this tool can be used with any MCP tool that accepts a node ID:

- `get-node-info` - Get detailed node information
- `get-node-children` - Get child nodes
- `clone-node` - Duplicate the element
- `delete-node` - Remove the element
- `move-node` - Reposition the element
- `resize-node` - Change dimensions
- `set-fill-color` - Modify colors
- And 200+ other tools!

## Troubleshooting

### "No node-id parameter found"
- Ensure the link contains a `?node-id=` parameter
- Check that you copied the link from a specific element, not just the file

### "Invalid URL format"
- Verify the link starts with `https://www.figma.com/`
- Make sure the link isn't truncated or malformed

### Node ID doesn't work with other tools
- Confirm you're using the correct file in Figma
- Verify the node hasn't been deleted
- Check that you have access to the Figma file

## Additional Resources

- [Figma MCP Server Documentation](./README.md)
- [All Available Tools](./TOOLS.md)
- [Setup Guide](./SETUP_GUIDE.md)
