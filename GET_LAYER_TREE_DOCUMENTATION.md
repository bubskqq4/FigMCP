# Get Layer Tree Tool Documentation

## Overview

The `get-layer-tree` tool is a new MCP tool that retrieves the complete hierarchical layer structure of an entire Figma document. Unlike `get-node-tree` which requires a specific node ID, this tool automatically traverses the entire document from the root, making it easy to visualize and analyze the full layer hierarchy.

## Features

✅ **No Node ID Required** - Automatically starts from the document root
✅ **Complete Hierarchy** - Returns all nodes with their relationships
✅ **Child IDs Included** - Shows all child node IDs for each layer
✅ **Comprehensive Properties** - Includes all node properties (type, name, position, size, etc.)
✅ **Statistics** - Provides document statistics (total nodes, node types breakdown)
✅ **Depth Control** - Optional maximum depth limit for large documents
✅ **Visibility Filtering** - Option to include or exclude hidden layers

## Tool Definition

**Tool Name:** `get-layer-tree`

**Description:** Get the complete layer tree of the entire Figma document. Returns all nodes with their IDs, types, names, and child relationships. Does not require any node ID - automatically traverses the entire document hierarchy.

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `includeHidden` | boolean | No | `true` | Include hidden layers in the tree |
| `maxDepth` | number | No | unlimited | Maximum depth to traverse (useful for large documents) |

## Response Structure

```typescript
{
  tree: {
    id: string;              // Node ID
    name: string;            // Node name
    type: string;            // Node type (e.g., "DOCUMENT", "PAGE", "FRAME", "TEXT")
    visible: boolean;        // Visibility state
    locked: boolean;         // Lock state
    depth: number;           // Depth in hierarchy (0 = root)
    childIds: string[];      // Array of direct child node IDs
    properties: {            // All node properties
      x?: number;
      y?: number;
      width?: number;
      height?: number;
      opacity?: number;
      blendMode?: string;
      // ... and many more properties from serialization
    };
    children?: [             // Recursive children (if any)
      {
        id: string;
        name: string;
        // ... same structure
      }
    ];
  };
  statistics: {
    totalNodes: number;      // Total number of nodes in the tree
    totalLayers: number;     // Total number of child relationships
    nodeTypes: {             // Breakdown of node types
      "DOCUMENT": 1,
      "PAGE": 3,
      "FRAME": 45,
      "TEXT": 12,
      // ... etc
    };
    maxDepthScanned: number | "unlimited";
    includeHidden: boolean;
  };
  documentName: string;      // Name of the Figma document
}
```

## Usage Examples

### Example 1: Get entire document structure

```javascript
const result = await getLayerTree({
  // No parameters needed!
});

console.log(result.tree);
console.log(result.statistics);
```

### Example 2: Exclude hidden layers

```javascript
const result = await getLayerTree({
  includeHidden: false
});

// Only visible layers will be returned
```

### Example 3: Limit depth for performance

```javascript
const result = await getLayerTree({
  maxDepth: 5  // Only traverse 5 levels deep
});

// Useful for very large documents with deep nesting
```

## Use Cases

1. **Document Analysis** - Understand the complete structure of a Figma file
2. **Layer Inventory** - Get a full list of all layers and their IDs
3. **Hierarchy Visualization** - Build visual tree representations of the design
4. **Bulk Operations** - Collect all node IDs for batch processing
5. **Documentation** - Generate documentation of design structure
6. **Migration Tools** - Map layer relationships for migration or export
7. **Quality Assurance** - Analyze naming conventions, organization patterns
8. **Asset Cataloging** - Find all components, frames, or specific node types

## Comparison with Other Tools

| Tool | Requires Node ID | Scope | Use Case |
|------|------------------|-------|----------|
| `get-layer-tree` | ❌ No | Entire document | Full hierarchy analysis |
| `get-node-tree` | ✅ Yes | Single node subtree | Specific branch analysis |
| `list-nodes` | Optional | Page or parent | Flat list of nodes |
| `get-node-children` | ✅ Yes | Direct children | Immediate children only |

## Performance Considerations

- **Large Documents**: Use `maxDepth` parameter to limit traversal depth
- **Hidden Layers**: Set `includeHidden: false` to skip hidden nodes and improve performance
- **Memory Usage**: Very large documents may return substantial data; consider pagination if needed

## Example Output

```json
{
  "tree": {
    "id": "0:0",
    "name": "My Design File",
    "type": "DOCUMENT",
    "visible": true,
    "locked": false,
    "depth": 0,
    "childIds": ["1:2", "1:3", "1:4"],
    "properties": {},
    "children": [
      {
        "id": "1:2",
        "name": "Home Page",
        "type": "PAGE",
        "visible": true,
        "locked": false,
        "depth": 1,
        "childIds": ["2:5", "2:6"],
        "properties": {},
        "children": [
          {
            "id": "2:5",
            "name": "Header",
            "type": "FRAME",
            "visible": true,
            "locked": false,
            "depth": 2,
            "childIds": ["3:7", "3:8"],
            "properties": {
              "x": 0,
              "y": 0,
              "width": 1440,
              "height": 80,
              "opacity": 1,
              "blendMode": "PASS_THROUGH"
            },
            "children": [
              {
                "id": "3:7",
                "name": "Logo",
                "type": "TEXT",
                "visible": true,
                "locked": false,
                "depth": 3,
                "childIds": [],
                "properties": {
                  "x": 24,
                  "y": 28,
                  "width": 120,
                  "height": 24,
                  "opacity": 1
                }
              }
            ]
          }
        ]
      }
    ]
  },
  "statistics": {
    "totalNodes": 157,
    "totalLayers": 156,
    "nodeTypes": {
      "DOCUMENT": 1,
      "PAGE": 5,
      "FRAME": 42,
      "TEXT": 38,
      "RECTANGLE": 25,
      "GROUP": 15,
      "COMPONENT": 12,
      "INSTANCE": 19
    },
    "maxDepthScanned": "unlimited",
    "includeHidden": true
  },
  "documentName": "My Design File"
}
```

## Implementation Details

### Files Created/Modified

**MCP Server:**
- `mcp/src/shared/types/params/read/get-layer-tree.ts` - Parameter schema
- `mcp/src/tools/read/get-layer-tree.ts` - MCP tool registration
- `mcp/src/shared/types/index.ts` - Type exports
- `mcp/src/server.ts` - Tool registration

**Figma Plugin:**
- `plugin/main/tools/read/get-layer-tree.ts` - Implementation logic
- `plugin/main/main.ts` - Command handler registration

### Key Differences from `get-node-tree`

1. **No ID Required**: Automatically starts from `figma.root`
2. **Child IDs Array**: Explicitly lists child IDs in `childIds` field
3. **Statistics**: Includes document-wide statistics
4. **Document Name**: Returns the document name
5. **Default Include Hidden**: Defaults to `true` (shows everything)

## Error Handling

The tool handles the following error cases:

- Invalid parameters (validated by Zod schema)
- Serialization errors (caught and reported)
- Document access errors (wrapped in try-catch)

All errors return a standardized error response:

```javascript
{
  isError: true,
  content: "Error message description"
}
```

## Testing

Both the MCP server and Figma plugin build successfully:

```bash
# Test MCP server build
cd mcp
npm run build
# ✓ Success

# Test Figma plugin build
cd plugin
npm run build
# ✓ Success
```

## Future Enhancements

Potential improvements for future versions:

- [ ] Add filtering by node type
- [ ] Add option to exclude specific node types
- [ ] Add pagination for very large documents
- [ ] Add option to include/exclude specific properties
- [ ] Add performance metrics (execution time, nodes per second)
- [ ] Add caching for repeated calls

## Support

For issues or questions:
1. Check the implementation files listed above
2. Review the Figma Plugin API documentation
3. Test with small documents first before large ones
4. Use `maxDepth` parameter for performance optimization

---

**Version:** 1.0.0  
**Created:** January 2026  
**Author:** Figma MCP Server Team
