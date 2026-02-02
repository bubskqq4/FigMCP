# Figma MCP Server Tools Documentation

This document provides comprehensive documentation for all available MCP tools.

## ✨ Visual Feedback

When using create or modify tools, the Figma plugin automatically provides visual feedback:

- **Border Highlighting**: Created/modified elements are highlighted with blue borders
- **Popup Animations**: Smooth fade-in effects draw attention to new elements
- **Auto-Zoom**: Viewport scrolls to show the element being worked on
- **Auto-Cleanup**: Visual indicators clear after 3 seconds

📖 **[Learn More About Visual Feedback](./VISUAL_FEEDBACK.md)**

---

## Table of Contents

- [🎨 Design System Tools](#design-system-tools) **⭐ NEW!**
  - [get-design-guidelines](#get-design-guidelines)
  - [get-style-guide-tags](#get-style-guide-tags)
  - [get-style-guide](#get-style-guide)
  - [get-ui-pattern](#get-ui-pattern)
  - [get-component-template](#get-component-template)
  - [create-design-guideline](#create-design-guideline)
  - [create-style-guide](#create-style-guide)
  - [add-design-tag](#add-design-tag)
  - [update-design-guideline](#update-design-guideline)
  - [delete-design-guideline](#delete-design-guideline)
  - [delete-style-guide](#delete-style-guide)
  - [list-design-resources](#list-design-resources)
  - [export-design-system](#export-design-system)
  - [import-design-system](#import-design-system)
  - [generate-design-docs](#generate-design-docs)
- [Utility Tools](#utility-tools)
  - [link-to-node-id](#link-to-node-id)
- [Read Tools](#read-tools)
  - [get-selection](#get-selection)
  - [get-node-info](#get-node-info)
  - [get-pages](#get-pages)
  - [get-all-components](#get-all-components)
  - [list-nodes](#list-nodes)
  - [get-node-children](#get-node-children)
  - [search-nodes](#search-nodes)
  - [get-node-tree](#get-node-tree)
- [Screenshot Tools](#screenshot-tools)
  - [screenshot-node](#screenshot-node)
- [Create Tools](#create-tools)
- [Update Tools](#update-tools)
- [Delete Tools](#delete-tools)

---

## 🎨 Design System Tools

**⭐ NEW!** Comprehensive design system integrated with the good-fullstack skill. Includes 13+ built-in design guidelines, 20+ curated style guides, 50+ design tags, and tools to create your own custom resources.

📖 **[View Complete Design System Guide](./DESIGN_SYSTEM_GUIDE.md)**  
🔧 **[View Recommended Design Tools](./DESIGN_TOOLS_RECOMMENDATIONS.md)**

### get-design-guidelines

Get comprehensive design guidelines for specific project types.

**Parameters:**
- `topic` (enum, required): Design topic
  - Available: `landing-page`, `dashboard`, `design-system`, `mobile-app`, `web-app`, `ecommerce`, `saas`, `portfolio`, `blog`, `tailwind`, `code`, `accessibility`, `responsive`
- `format` (enum, optional): Output format
  - `detailed` - Full guidelines with all details (default)
  - `summary` - Key points only
  - `checklist` - Actionable checklist

**Returns:** Design principles, spacing systems, typography scales, color strategies, and best practices.

**Example:**
```typescript
// Get detailed dashboard guidelines
await mcp.callTool("get-design-guidelines", {
  topic: "dashboard",
  format: "detailed"
});

// Get accessibility checklist
await mcp.callTool("get-design-guidelines", {
  topic: "accessibility",
  format: "checklist"
});
```

---

### get-style-guide-tags

Get available style guide tags for filtering design inspiration.

**Parameters:**
- `category` (enum, optional): Filter by category
  - `all` - All tags (default)
  - `aesthetic` - Visual style (minimal, brutalist, etc.)
  - `industry` - Business sector (saas, fintech, etc.)
  - `platform` - Target platform (web, mobile, etc.)
  - `color` - Color scheme (dark, light, etc.)
  - `layout` - Layout style (grid, asymmetric, etc.)
  - `vibe` - Overall feeling (professional, playful, etc.)

**Returns:** Available tags organized by category.

**Example:**
```typescript
// Get all tags
await mcp.callTool("get-style-guide-tags", {});

// Get only aesthetic tags
await mcp.callTool("get-style-guide-tags", {
  category: "aesthetic"
});
```

---

### get-style-guide

Get curated style guides with colors, typography, and design examples.

**Parameters:**
- `tags` (array, optional): Filter by tags (e.g., `["minimal", "dark", "saas"]`)
- `name` (string, optional): Get specific style guide by name
- `includeExamples` (boolean, optional): Include code examples (default: true)

**Returns:** Matching style guides with complete design specifications.

**Example:**
```typescript
// Find minimal dark SaaS designs
await mcp.callTool("get-style-guide", {
  tags: ["minimal", "dark", "saas"],
  includeExamples: true
});

// Get specific style guide
await mcp.callTool("get-style-guide", {
  name: "Dark Minimal SaaS"
});
```

---

### get-ui-pattern

Get reusable UI patterns for common components with Figma-specific properties.

**Parameters:**
- `pattern` (enum, required): Pattern type
  - Available: `navigation`, `hero`, `card`, `form`, `modal`, `table`, `sidebar`, `footer`, `cta`, `pricing`, `testimonial`, `feature-grid`, `stats`, `timeline`
- `variant` (string, optional): Specific variant (e.g., `horizontal`, `vertical`)

**Returns:** UI pattern structure with Figma properties.

**Example:**
```typescript
// Get navigation pattern
await mcp.callTool("get-ui-pattern", {
  pattern: "navigation",
  variant: "horizontal"
});

// Get card pattern
await mcp.callTool("get-ui-pattern", {
  pattern: "card",
  variant: "with-image"
});
```

---

### get-component-template

Get ready-to-use component templates with Figma properties and variants.

**Parameters:**
- `component` (enum, required): Component type
  - Available: `button`, `input`, `card`, `badge`, `avatar`, `checkbox`, `radio`, `switch`, `select`, `slider`, `progress`, `tooltip`, `dropdown`
- `includeVariants` (boolean, optional): Include all variants (default: true)

**Returns:** Component template with base properties and all variants.

**Example:**
```typescript
// Get button template with all variants
await mcp.callTool("get-component-template", {
  component: "button",
  includeVariants: true
});
```

---

### create-design-guideline

Create a custom design guideline for your project.

**Parameters:**
- `name` (string, required): Unique name for guideline
- `overview` (string, required): Brief description
- `principles` (array, optional): Design principles
- `spacing` (object, optional): Spacing system
- `typography` (object, optional): Typography scale and fonts
- `colors` (object, optional): Color strategy and palette
- `bestPractices` (array, optional): Best practices list

**Returns:** Confirmation message with guideline name.

**Example:**
```typescript
await mcp.callTool("create-design-guideline", {
  name: "my-saas-app",
  overview: "Design system for my SaaS dashboard",
  spacing: {
    base: "4px",
    scale: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px"
    }
  },
  colors: {
    strategy: "Dark theme with electric accent",
    palette: {
      primary: "#6366f1",
      background: "#0a0a0a"
    }
  },
  bestPractices: [
    "Use consistent spacing throughout",
    "Maintain 4.5:1 contrast ratio"
  ]
});
```

---

### create-style-guide

Create a custom style guide with complete design specifications.

**Parameters:**
- `name` (string, required): Style guide name
- `tags` (array, required): Categorization tags
- `description` (string, required): Description
- `colors` (object, optional): Color palette
- `typography` (object, optional): Typography settings
- `spacing` (object, optional): Spacing scale
- `borderRadius` (object, optional): Border radius values
- `shadows` (object, optional): Shadow definitions
- `examples` (string, optional): Usage examples

**Returns:** Confirmation with style guide details.

**Example:**
```typescript
await mcp.callTool("create-style-guide", {
  name: "Brand X Design",
  tags: ["modern", "colorful", "saas"],
  description: "Official design system for Brand X",
  colors: {
    primary: "#FF6B6B",
    secondary: "#4ECDC4",
    background: "#FFFFFF"
  },
  typography: {
    display: "Montserrat",
    body: "Open Sans"
  }
});
```

---

### add-design-tag

Add new tags to the design tag system for better categorization.

**Parameters:**
- `category` (enum, required): Tag category
  - `aesthetic`, `industry`, `platform`, `color`, `layout`, `vibe`
- `tags` (array, required): New tags to add

**Returns:** Confirmation with added tags.

**Example:**
```typescript
await mcp.callTool("add-design-tag", {
  category: "industry",
  tags: ["legal-tech", "hr-tech", "prop-tech"]
});
```

---

### update-design-guideline

Update an existing design guideline.

**Parameters:**
- `name` (string, required): Guideline name to update
- `updates` (object, required): Fields to update

**Returns:** Confirmation with updated fields.

**Example:**
```typescript
await mcp.callTool("update-design-guideline", {
  name: "my-saas-app",
  updates: {
    colors: {
      strategy: "Updated dark mode support",
      palette: {
        primary: "#6366f1",
        primaryDark: "#4f46e5"
      }
    }
  }
});
```

---

### delete-design-guideline

Delete a custom design guideline. Built-in guidelines cannot be deleted.

**Parameters:**
- `name` (string, required): Guideline name to delete

**Returns:** Success or error message.

**Example:**
```typescript
await mcp.callTool("delete-design-guideline", {
  name: "old-project"
});
```

---

### delete-style-guide

Delete a custom style guide. Built-in style guides cannot be deleted.

**Parameters:**
- `name` (string, required): Style guide name to delete

**Returns:** Success or error message.

**Example:**
```typescript
await mcp.callTool("delete-style-guide", {
  name: "deprecated-brand"
});
```

---

### list-design-resources

List all available design guidelines and style guides.

**Parameters:**
- `type` (enum, optional): Resource type to list
  - `all` - Everything (default)
  - `guidelines` - Only guidelines
  - `style-guides` - Only style guides

**Returns:** Comprehensive list of available design resources.

**Example:**
```typescript
// List everything
await mcp.callTool("list-design-resources", {
  type: "all"
});

// List only style guides
await mcp.callTool("list-design-resources", {
  type: "style-guides"
});
```

---

### export-design-system

Export all custom design resources as JSON for backup or sharing.

**Parameters:**
- `includeBuiltIn` (boolean, optional): Include built-in resources (default: false)

**Returns:** JSON with all custom guidelines, style guides, and tags.

**Example:**
```typescript
// Export custom resources only
await mcp.callTool("export-design-system", {});

// Export everything including built-ins
await mcp.callTool("export-design-system", {
  includeBuiltIn: true
});
```

---

### import-design-system

Import design resources from JSON.

**Parameters:**
- `data` (object, required): Design system data
  - `guidelines` (object, optional): Guidelines to import
  - `styleGuides` (array, optional): Style guides to import
  - `tags` (object, optional): Tags to import
- `merge` (boolean, optional): Merge with existing (true) or replace (false). Default: true

**Returns:** Confirmation with import summary.

**Example:**
```typescript
await mcp.callTool("import-design-system", {
  data: {
    guidelines: { "project-x": { ... } },
    styleGuides: [ { name: "Brand Y", ... } ]
  },
  merge: true
});
```

---

### generate-design-docs

Generate comprehensive markdown documentation for your design system.

**Parameters:**
- `includeExamples` (boolean, optional): Include code examples (default: true)
- `format` (enum, optional): Output format - `markdown` or `html` (default: `markdown`)

**Returns:** Complete design system documentation in markdown format.

**Example:**
```typescript
await mcp.callTool("generate-design-docs", {
  includeExamples: true,
  format: "markdown"
});
```

---

## Utility Tools

### link-to-node-id

Convert a Figma element/layer link to a node ID. This tool extracts the node ID from Figma share links, making it easy to work with elements shared via URL.

**Parameters:**
- `link` (string, required): Figma link containing a node-id parameter

**Supported Link Formats:**
- `https://www.figma.com/file/FILE_KEY/FILE_NAME?node-id=123-456`
- `https://www.figma.com/design/FILE_KEY/FILE_NAME?node-id=123-456`
- `https://www.figma.com/proto/FILE_KEY/FILE_NAME?node-id=123-456`

**Returns:**
```json
{
  "nodeId": "123:456",
  "originalLink": "https://www.figma.com/file/...",
  "success": true
}
```

**Example:**
```typescript
// Convert a Figma link to node ID
await mcp.callTool("link-to-node-id", {
  link: "https://www.figma.com/file/abc123/MyFile?node-id=123-456"
});
// Returns: { "nodeId": "123:456", "originalLink": "...", "success": true }

// Then use the nodeId with other tools
await mcp.callTool("get-node-info", {
  id: "123:456"
});
```

**Common Use Cases:**
- Converting shared Figma links from team members
- Extracting node IDs from design handoff URLs
- Automating workflows with Figma links from external sources

**Notes:**
- The tool automatically converts URL format (dash-separated) to API format (colon-separated)
- Returns an error if the link doesn't contain a valid node-id parameter

---

## Read Tools

### get-selection

Get the currently selected nodes in Figma.

**Parameters:** None

**Returns:**
```json
{
  "selection": [
    {
      "id": "node-id",
      "name": "Node Name",
      "type": "FRAME",
      "visible": true,
      "locked": false
      // ... additional node properties
    }
  ]
}
```

**Example:**
```typescript
// Get current selection
await mcp.callTool("get-selection", {});
```

---

### get-node-info

Get detailed information about a specific node by its ID.

**Parameters:**
- `id` (string, required): The node ID

**Returns:**
```json
{
  "id": "node-id",
  "name": "Node Name",
  "type": "FRAME",
  "visible": true,
  "locked": false,
  "x": 0,
  "y": 0,
  "width": 100,
  "height": 100
  // ... additional node properties
}
```

**Example:**
```typescript
await mcp.callTool("get-node-info", {
  id: "123:456"
});
```

---

### get-pages

Get all pages in the current Figma document.

**Parameters:** None

**Returns:**
```json
[
  {
    "id": "page-id",
    "name": "Page 1",
    "type": "PAGE"
  }
]
```

**Example:**
```typescript
await mcp.callTool("get-pages", {});
```

---

### get-all-components

Get all components in the current Figma document.

**Parameters:** None

**Returns:**
```json
[
  {
    "id": "component-id",
    "name": "Button",
    "type": "COMPONENT",
    "key": "component-key"
    // ... additional component properties
  }
]
```

**Example:**
```typescript
await mcp.callTool("get-all-components", {});
```

---

### list-nodes

**NEW!** List all nodes in the current page or within a specific parent node. Supports filtering by type and depth traversal.

**Parameters:**
- `parentId` (string, optional): Parent node ID. If not provided, lists nodes in the current page
- `types` (array of strings, optional): Filter by node types (e.g., `['FRAME', 'TEXT', 'RECTANGLE']`)
- `maxDepth` (number, optional, default: 1): Maximum depth to traverse (1 = direct children only)

**Returns:**
```json
{
  "parentId": "parent-node-id",
  "parentName": "Parent Name",
  "count": 5,
  "nodes": [
    {
      "id": "node-id",
      "name": "Node Name",
      "type": "FRAME",
      "visible": true,
      "locked": false
      // ... additional node properties
    }
  ]
}
```

**Examples:**

```typescript
// List all nodes in current page (direct children only)
await mcp.callTool("list-nodes", {});

// List all FRAME nodes up to 2 levels deep
await mcp.callTool("list-nodes", {
  types: ["FRAME"],
  maxDepth: 2
});

// List all children of a specific frame
await mcp.callTool("list-nodes", {
  parentId: "123:456",
  maxDepth: 1
});

// List all TEXT and RECTANGLE nodes recursively (up to 3 levels)
await mcp.callTool("list-nodes", {
  types: ["TEXT", "RECTANGLE"],
  maxDepth: 3
});
```

**Use Cases:**
- Quickly browse the structure of a page
- Find all instances of specific node types
- Analyze document hierarchy
- Audit design elements

---

### get-node-children

**NEW!** Get all children of a specific node. Supports recursive traversal to get all descendants.

**Parameters:**
- `id` (string, required): Node ID to get children from
- `recursive` (boolean, optional, default: false): Include all descendants recursively

**Returns:**
```json
{
  "nodeId": "parent-id",
  "nodeName": "Parent Name",
  "nodeType": "FRAME",
  "count": 3,
  "recursive": false,
  "children": [
    {
      "id": "child-id",
      "name": "Child Name",
      "type": "TEXT",
      "visible": true,
      "locked": false,
      "parent": "parent-id"
      // ... additional node properties
    }
  ]
}
```

**Examples:**

```typescript
// Get direct children only
await mcp.callTool("get-node-children", {
  id: "123:456",
  recursive: false
});

// Get all descendants recursively
await mcp.callTool("get-node-children", {
  id: "123:456",
  recursive: true
});
```

**Use Cases:**
- Extract all elements from a frame
- Copy entire component hierarchies
- Analyze component structure
- Batch operations on child elements

---

### search-nodes

**NEW!** Search for nodes by name across the document or within a specific page. Supports type filtering and exact/fuzzy matching.

**Parameters:**
- `query` (string, required): Search query (matches node names)
- `types` (array of strings, optional): Filter by node types
- `pageId` (string, optional): Limit search to specific page
- `exactMatch` (boolean, optional, default: false): Require exact name match

**Returns:**
```json
{
  "query": "Button",
  "exactMatch": false,
  "types": ["FRAME"],
  "count": 3,
  "results": [
    {
      "id": "node-id",
      "name": "Primary Button",
      "type": "FRAME",
      "visible": true,
      "locked": false,
      "parent": "parent-id",
      "parentName": "Components"
      // ... additional node properties
    }
  ]
}
```

**Examples:**

```typescript
// Fuzzy search for nodes containing "button"
await mcp.callTool("search-nodes", {
  query: "button"
});

// Exact match search
await mcp.callTool("search-nodes", {
  query: "Primary Button",
  exactMatch: true
});

// Search only for FRAME types containing "card"
await mcp.callTool("search-nodes", {
  query: "card",
  types: ["FRAME"]
});

// Search within a specific page
await mcp.callTool("search-nodes", {
  query: "icon",
  pageId: "page-123",
  types: ["COMPONENT"]
});
```

**Use Cases:**
- Find components by name
- Locate specific design elements
- Audit naming conventions
- Find all variants of a component

---

### get-node-tree

**NEW!** Get the complete hierarchical tree structure of a node and its descendants. Supports depth control and visibility filtering.

**Parameters:**
- `id` (string, required): Root node ID to build tree from
- `maxDepth` (number, optional, default: 3): Maximum depth to traverse
- `includeHidden` (boolean, optional, default: false): Include hidden nodes

**Returns:**
```json
{
  "maxDepth": 3,
  "includeHidden": false,
  "tree": {
    "id": "root-id",
    "name": "Root Frame",
    "type": "FRAME",
    "visible": true,
    "locked": false,
    "depth": 0,
    "children": [
      {
        "id": "child-id",
        "name": "Child",
        "type": "TEXT",
        "visible": true,
        "locked": false,
        "depth": 1,
        "children": []
      }
    ]
  }
}
```

**Examples:**

```typescript
// Get tree structure with default depth (3 levels)
await mcp.callTool("get-node-tree", {
  id: "123:456"
});

// Get shallow tree (2 levels)
await mcp.callTool("get-node-tree", {
  id: "123:456",
  maxDepth: 2
});

// Get deep tree including hidden nodes
await mcp.callTool("get-node-tree", {
  id: "123:456",
  maxDepth: 5,
  includeHidden: true
});
```

**Use Cases:**
- Visualize component structure
- Export design hierarchy
- Analyze layout nesting
- Document component architecture
- Generate design system documentation

---

## Comparison: When to Use Which Read Tool

| Tool | Use When | Depth | Filter by Type | Filter by Name | Output Format |
|------|----------|-------|----------------|----------------|---------------|
| `get-node-info` | You know the exact node ID | Single node | ❌ | ❌ | Flat object |
| `list-nodes` | Browse nodes at specific depth | Configurable | ✅ | ❌ | Flat array |
| `get-node-children` | Get all descendants of a node | All or 1 level | ❌ | ❌ | Flat array |
| `search-nodes` | Find nodes by name | All levels | ✅ | ✅ (fuzzy/exact) | Flat array |
| `get-node-tree` | Understand hierarchy | Configurable | ❌ | ❌ | Nested tree |

---

## Screenshot Tools

### screenshot-node

Take a screenshot of a specific layer/node and return the image directly to the AI for visual inspection. This tool captures the visual appearance of any Figma node and returns it as an image that the AI can analyze.

**Parameters:**
- `nodeId` (string, required): The ID of the node to screenshot
- `scale` (number, optional): Scale factor for the screenshot (0.01-4, default: 2)
  - `1` = 1x resolution (standard)
  - `2` = 2x resolution (retina, recommended)
  - `4` = 4x resolution (ultra high quality)
- `format` (string, optional): Image format - "png" or "jpg" (default: "png")

**Returns:**
- An image of the node (sent directly to AI for visual analysis)
- JSON metadata about the screenshot

**Example:**
```typescript
// Take a screenshot of a frame at 2x resolution
await mcp.callTool("screenshot-node", {
  nodeId: "123:456",
  scale: 2,
  format: "png"
});
// Returns: PNG image + { success: true, nodeId: "123:456", format: "png", scale: 2 }

// High quality screenshot at 4x
await mcp.callTool("screenshot-node", {
  nodeId: "789:012",
  scale: 4
});

// Lower quality for faster processing
await mcp.callTool("screenshot-node", {
  nodeId: "345:678",
  scale: 1,
  format: "jpg"
});
```

**Common Use Cases:**
- Visually inspecting a design layout before implementing
- Validating design changes after modifications
- Analyzing visual hierarchy and spacing
- Checking color consistency across components
- Generating design previews for documentation
- Visual regression testing
- Design QA and review workflows

**Requirements:**
- Figma API token must be configured (use `request-api-token` first)
- A Figma file must be currently open

**Notes:**
- The image is returned directly to the AI - no need to handle URLs or downloads
- Higher scale values produce better quality but larger file sizes
- PNG format preserves transparency, JPG is smaller but no transparency
- Screenshots capture the node exactly as it appears in Figma
- The tool uses Figma's official REST API for reliable image generation

**Tips:**
- Use scale `2` for most cases (retina quality, good balance)
- Use scale `4` for detailed design work or when zooming in is needed
- Use scale `1` for quick previews or when file size matters
- Use JPG format for photos or complex graphics to reduce file size
- Use PNG format for UI elements, icons, or anything requiring transparency

---

## Create Tools

(Documentation for create tools...)

## Update Tools

(Documentation for update tools...)

## Delete Tools

(Documentation for delete tools...)

---

## Common Patterns

### Pattern 1: Find and Update

```typescript
// 1. Search for nodes
const searchResult = await mcp.callTool("search-nodes", {
  query: "button",
  types: ["FRAME"]
});

// 2. Update each found node
for (const node of searchResult.results) {
  await mcp.callTool("set-fill-color", {
    id: node.id,
    color: { r: 0, g: 0, b: 1 }
  });
}
```

### Pattern 2: Duplicate Structure

```typescript
// 1. Get node tree
const tree = await mcp.callTool("get-node-tree", {
  id: "source-frame-id",
  maxDepth: 5
});

// 2. Recreate structure
// (Implementation depends on specific needs)
```

### Pattern 3: Audit and Report

```typescript
// 1. List all nodes
const nodes = await mcp.callTool("list-nodes", {
  maxDepth: 5
});

// 2. Group by type
const byType = nodes.nodes.reduce((acc, node) => {
  acc[node.type] = (acc[node.type] || 0) + 1;
  return acc;
}, {});

// 3. Generate report
console.log("Node Type Distribution:", byType);
```

---

## Error Handling

All tools return results in the following format:

**Success:**
```json
{
  "content": [{ "type": "text", "text": "..." }],
  "isError": false
}
```

**Error:**
```json
{
  "content": [{ "type": "text", "text": "Error message" }],
  "isError": true
}
```

Always check the `isError` field before processing results.

---

## Performance Tips

1. **Use appropriate depth limits**: Higher `maxDepth` values increase processing time
2. **Filter early**: Use `types` parameter to reduce result set
3. **Exact matching**: Use `exactMatch: true` for faster searches when you know the exact name
4. **Recursive sparingly**: Only use `recursive: true` when you need all descendants
5. **Page-specific searches**: Limit searches to specific pages with `pageId` when possible

---

## Version History

- **v0.2.0** (2026-01-31)
  - Added `list-nodes` tool
  - Added `get-node-children` tool
  - Added `search-nodes` tool
  - Added `get-node-tree` tool
  
- **v0.1.1** (2025-01)
  - Initial release with basic read/create/update/delete tools
