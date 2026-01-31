# Figma MCP Server - Setup Guide

## ✅ Completed Setup Steps

1. ✅ Plugin dependencies installed
2. ✅ Plugin built successfully
3. ✅ MCP server dependencies installed
4. ✅ MCP server added to Cursor settings

## 🚀 How to Use

### Step 1: Start the MCP Server

Open a terminal and run:

```powershell
cd c:\Users\EthFR\Downloads\figma-mcp-server-main\figma-mcp-server-main\mcp
npm run start
```

**Expected output:**
```
Server listening on http://localhost:38450
a user connected: .............
```

**Keep this terminal window open** - the server must be running for the plugin to work.

### Step 2: Add Plugin to Figma

1. **Open Figma Desktop App** (not browser)
   - The plugin works best with the desktop app

2. **Open any Figma document** you want to work with

3. **Import the Plugin:**
   - Go to: **Plugins** → **Development** → **Import Plugin from manifest...**
   - Navigate to: `c:\Users\EthFR\Downloads\figma-mcp-server-main\figma-mcp-server-main\plugin\manifest.json`
   - Click **Open**

4. **Start the Plugin:**
   - Go to: **Plugins** → **Development** → **Figma MCP Server**
   - Or use the plugin menu: **Plugins** → **Figma MCP Server**

5. **Check Connection Status:**
   - The plugin window will show:
     - **"Not connected to MCP server"** - if the server isn't running
     - **"Connected to MCP server"** ✅ - when connected successfully

6. **Keep the Plugin Window Open:**
   - Don't close the plugin window - it needs to stay open to communicate with the MCP server

### Step 3: Use with Cursor AI

Once both the MCP server and Figma plugin are running:

1. **In Cursor**, you can now ask the AI to:
   - Create frames, rectangles, text, components in Figma
   - Modify existing designs
   - Get information about your Figma document
   - Manipulate nodes and properties

2. **Example prompts:**
   - "Create a red rectangle in Figma"
   - "Add text 'Hello World' to the current page"
   - "Get information about the selected nodes"
   - "Create a frame with specific dimensions"

## 📋 Configuration Details

### Cursor MCP Configuration

The MCP server has been added to your Cursor settings in two ways:

1. **Local Command** (starts server automatically):
   ```json
   "Figma Local": {
       "command": "node",
       "args": ["C:\\Users\\EthFR\\Downloads\\figma-mcp-server-main\\figma-mcp-server-main\\mcp\\dist\\index.js"],
       "env": {
           "TRANSPORT": "streamable-http"
       }
   }
   ```

2. **HTTP URL** (when server is already running):
   ```json
   "Figma HTTP": {
       "url": "http://127.0.0.1:38450/mcp"
   }
   ```

### Project MCP Configuration

The project also has a `.cursor/mcp.json` file with additional configurations:
- `Figma` - HTTP URL method
- `Figma NPM` - Uses npm package
- `Figma Local` - Local server command

## 🔧 Troubleshooting

### Plugin shows "Not connected to MCP server"
- ✅ Make sure the MCP server is running (`npm run start` in the `mcp` directory)
- ✅ Check that the server shows: `Server listening on http://localhost:38450`
- ✅ Restart the plugin in Figma

### Cursor can't connect to MCP server
- ✅ Verify the server is running on port 38450
- ✅ Check firewall settings (should allow localhost connections)
- ✅ Try restarting Cursor after adding the MCP configuration

### Plugin not appearing in Figma
- ✅ Make sure you're using **Figma Desktop App** (not browser)
- ✅ Check that `manifest.json` exists at the plugin path
- ✅ Try re-importing the plugin manifest

## 🛠️ Development Mode

For development with auto-reload:

**Plugin Development:**
```powershell
cd c:\Users\EthFR\Downloads\figma-mcp-server-main\figma-mcp-server-main\plugin
npm run dev
```

**MCP Server Development:**
```powershell
cd c:\Users\EthFR\Downloads\figma-mcp-server-main\figma-mcp-server-main\mcp
npm run dev
```

## 📝 Notes

- The MCP server runs on **port 38450** by default
- The plugin communicates via **WebSocket** on the same port
- Both server and plugin must be running simultaneously
- The plugin window must stay open in Figma
- Works with **Streaming HTTP transport** for MCP communication

## 🎯 Quick Start Checklist

- [ ] Start MCP server: `cd mcp && npm run start`
- [ ] Open Figma Desktop App
- [ ] Import plugin from `plugin/manifest.json`
- [ ] Start plugin in Figma
- [ ] Verify "Connected to MCP server" message
- [ ] Keep both server terminal and plugin window open
- [ ] Start using AI commands in Cursor!

---

**Ready to use!** 🚀
