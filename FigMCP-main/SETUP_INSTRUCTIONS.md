# Figma MCP Setup Instructions

## Prerequisites
- Figma Desktop App installed
- Node.js installed
- All builds completed ✅

## Quick Start

### 1. Open Figma Desktop
1. Launch Figma Desktop application
2. Create a new design file or open an existing one

### 2. Load the Plugin
1. In Figma, go to: **Plugins → Development → Import plugin from manifest...**
2. Navigate to: `C:\Users\EthFR\Downloads\FigMCP-main\FigMCP-main\plugin\`
3. Select `manifest.json`
4. Click "Open"

### 3. Run the Plugin
1. Go to: **Plugins → Development → FigMCP** (or your plugin name)
2. The plugin UI should open
3. It will automatically connect to the MCP server at `http://localhost:38451`

### 4. Verify Connection
- The plugin should show "Connected" status
- In Cursor, the MCP tools should now respond (no more timeouts)

## Testing the Connection

Once the plugin is running, try this in Cursor:

```
Use the Figma MCP to create a simple rectangle
```

The MCP tools should work without timeout errors.

## Troubleshooting

### Plugin Not Connecting
- Check if port 38451 is accessible
- Restart Cursor to reload the MCP server
- Check Figma Desktop console (Plugins → Development → Open Console)

### MCP Server Issues
- Restart Cursor
- Check `C:\Users\EthFR\.cursor\mcp.json` configuration
- View MCP logs in Cursor's MCP panel

### Build Issues
If you need to rebuild:
```bash
# MCP Server
cd mcp
npm run build
npm run bundle

# Plugin
cd plugin
npm run build
```

## What's Built

✅ **MCP Server**: `mcp/dist/bundle.js`
- Tools: 559 Figma manipulation tools
- Server: Socket.IO on port 38451
- Protocol: MCP STDIO

✅ **Figma Plugin**: `plugin/dist/`
- main.js: Plugin logic
- index.html: UI interface
- Connects to MCP server via WebSocket

✅ **MCP Configuration**: `C:\Users\EthFR\.cursor\mcp.json`
- Server name: "figma-mcp"
- Ready to use in Cursor

## Next Steps

1. Load the plugin in Figma (steps above)
2. Create a new design
3. Use Cursor to manipulate Figma via MCP tools

Example commands to try:
- "Create a Notion-like app layout"
- "Design a dashboard with sidebar"
- "Build a mobile app mockup"
- "Create a design system"

## Available MCP Tools (559 total)

- **Create**: Frames, text, rectangles, shapes, components
- **Update**: Move, resize, colors, fills, strokes
- **Read**: Selection, node info, layer trees
- **Design System**: Tokens, variables, styles
- **UI Patterns**: Sidebars, cards, forms, modals
- **Accessibility**: ARIA labels, focus states, contrast
- **Performance**: Optimization, lazy loading
- **Analysis**: Design reviews, pattern detection
- And many more...

