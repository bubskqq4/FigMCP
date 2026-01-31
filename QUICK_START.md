# 🚀 Quick Start Guide

## What's New

### ✨ Visual Feedback System
- **Real-time borders** around elements being created by AI
- **Popup animations** with smooth fade-in effects
- **Auto-zoom** to show new elements
- **Auto-cleanup** after 3 seconds

### 📖 New Read Tools
- `list-nodes` - List nodes with filtering and depth control
- `get-node-children` - Get all children (recursive support)
- `search-nodes` - Search by name (fuzzy/exact)
- `get-node-tree` - Get hierarchical tree structure

---

## Current Status

✅ **Plugin**: Built successfully  
✅ **MCP Server**: Running on port **38451**  
✅ **Port conflict**: Fixed (changed from 38450 to 38451)  
✅ **Syntax errors**: Fixed (removed `??` operators)  
✅ **Network access**: Updated in manifest.json  

---

## Next Steps

### 1. ⚠️ IMPORTANT: Completely Reload the Plugin

**Figma caches plugin code!** Simply closing and reopening won't work.

**YOU MUST:**

1. **Remove the plugin completely:**
   - In Figma: **Plugins** > **Development** 
   - Right-click **"Figma MCP Server"**
   - Select **"Remove plugin"**

2. **Re-import the plugin:**
   - **Plugins** > **Development** > **Import plugin from manifest...**
   - Navigate to: `C:\Users\EthFR\Downloads\figma-mcp-server-main\figma-mcp-server-main\plugin\`
   - Select `manifest.json`
   - Click **Open**

3. **Start the plugin:**
   - **Plugins** > **Development** > **Figma MCP Server**
   - Should show **"Connected to MCP server"** ✅

📖 **[Detailed Reload Instructions](./RELOAD_PLUGIN.md)**

### 2. Verify Connection

You should see in the plugin UI:
- ✅ Green checkmark icon
- **"Connected to MCP server"** message

### 3. Test the New Features

#### Try the Visual Feedback:

Ask AI to create something:
```
"Create a button frame with text inside"
```

You should see:
- 🎯 Blue border appears around the new frame
- 💫 Smooth popup animation
- 🔍 Viewport zooms to show the element
- ⏱️ Border disappears after 3 seconds

#### Try the New Read Tools:

```typescript
// List all frames in current page
await callTool("list-nodes", { types: ["FRAME"], maxDepth: 1 })

// Search for nodes named "button"
await callTool("search-nodes", { query: "button" })

// Get tree structure of a frame
await callTool("get-node-tree", { id: "5:10", maxDepth: 3 })
```

---

## Troubleshooting

### Plugin Shows "Not connected"

**Solution**: Restart the MCP server
```bash
cd mcp
npm start
```

### Port Already in Use

**Solution**: Kill the process and restart
```bash
# Windows
netstat -ano | findstr :38451
taskkill /F /PID [PID_NUMBER]

# Then restart
npm start
```

### Syntax Errors in Console

**Problem**: Figma plugin environment doesn't support ES2020+ syntax

**Fixed**: All `??` operators replaced with ternary operators

---

## Server Info

- **Port**: 38451
- **WebSocket URL**: `ws://localhost:38451`
- **HTTP URL**: `http://localhost:38451`
- **MCP Endpoint**: `http://localhost:38451/mcp`

---

## Documentation

- 📖 [Full Tool Documentation](./TOOLS.md)
- ✨ [Visual Feedback Details](./VISUAL_FEEDBACK.md)
- 📝 [Changelog](./CHANGELOG.md)
- 📘 [Setup Guide](./SETUP_GUIDE.md)

---

## Architecture

```
AI Agent (Cursor/Claude)
        ↓
   MCP Protocol
        ↓
  MCP Server (Node.js)
  Port: 38451
        ↓
   WebSocket (Socket.IO)
        ↓
  Figma Plugin
        ↓
   Figma API
        ↓
  Your Design
```

---

## Tips

1. **Keep the plugin window open** - The plugin must be running to receive commands
2. **Check console logs** - Open **Plugins > Development > Open Console** for debugging
3. **Visual feedback timing** - Borders stay for 3 seconds, configurable in code
4. **Multiple operations** - Visual feedback accumulates, shows all created elements

---

## What's Working

✅ All original create/update/delete tools  
✅ 4 new read tools (list, children, search, tree)  
✅ Visual feedback with borders and animations  
✅ Auto-zoom to created elements  
✅ Auto-cleanup after 3 seconds  
✅ Error handling and recovery  
✅ Port 38451 (no conflicts)  
✅ Figma-compatible syntax (no `??`)  

---

**Ready to use!** The plugin should now work perfectly with visual feedback. 🎉
