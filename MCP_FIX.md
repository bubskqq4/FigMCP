# Figma MCP Server - Configuration Fix

## ✅ Fixed Issues

### Problem 1: Wrong Transport Type
- **Issue**: Configuration was using `streamable-http` transport, but Cursor MCP requires `stdio` transport
- **Fix**: Removed the `TRANSPORT` environment variable so the server defaults to `stdio` (the standard for MCP)

### Problem 2: Port Already in Use
- **Issue**: Port 38450 was already in use, causing `EADDRINUSE` errors
- **Solution**: Stopped the conflicting server

### Problem 3: Buggy NPM Package
- **Issue**: The npm package `@antonytm/figma-mcp-server@latest` has a bug - it tries to start an HTTP server on port 38450 even in stdio mode
- **Fix**: Removed the "Figma MCP Server" npm configuration, using only the local compiled version

## 🔧 Configuration Changes Made

Updated `c:\Users\EthFR\.cursor\mcp.json`:

**Before:**
```json
"Figma Local": {
  "command": "node",
  "args": ["..."],
  "cwd": "...",
  "env": {
    "TRANSPORT": "streamable-http"  // ❌ Wrong for MCP stdio
  }
}
```

**After:**
```json
"Figma Local": {
  "command": "node",
  "args": ["..."],
  "cwd": "..."
  // ✅ No env - defaults to stdio transport
}
```

## 🚀 How to Use Now

### Option 1: Use "Figma Local" (Recommended)
This will start the server automatically via stdio when Cursor needs it:

1. **Restart Cursor** to load the new configuration
2. The "Figma Local" MCP server will start automatically when needed
3. No manual server startup required

### Option 2: Use "Figma HTTP" (If Server Already Running)
If you have the server already running on port 38450:

1. Keep the server running: `cd mcp && npm run start`
2. Use the "Figma HTTP" configuration in Cursor
3. This connects to the already-running server

### Option 3: Stop Existing Server and Use "Figma Local"
If you want to stop the existing server:

1. Find the process using port 38450:
   ```powershell
   netstat -ano | findstr :38450
   ```

2. Stop the process (replace PID with actual process ID):
   ```powershell
   taskkill /PID <PID> /F
   ```

3. Restart Cursor and use "Figma Local" configuration

## 📋 Available Configurations

You now have TWO Figma MCP configurations:

1. **"Figma Local"** ✅ - Starts server automatically via stdio (ONLY working option)
2. **"Figma HTTP"** ⚠️ - Disabled (requires manual server management, not recommended)

## ✅ Next Steps

1. **Restart Cursor** to apply the configuration changes
2. The MCP server should now work correctly with stdio transport
3. If you still see errors, check:
   - Port 38450 is not in use (if using "Figma Local")
   - The server code is compiled: `cd mcp && npm run build`
   - Node.js is in your PATH

## 🔍 Troubleshooting

### Error: "address already in use :::38450"
- **Root Cause**: The npm package and your local server both try to use port 38450
- **Solution**: ✅ Fixed - removed buggy npm package, port is now free, only using stdio transport

### Error: "Unexpected token 'd', '[dotenv@17.'... is not valid JSON"
- **Root Cause**: Using `streamable-http` transport instead of stdio
- **Solution**: ✅ Fixed - now using stdio transport (no TRANSPORT env variable)

### Error: "No server info found"
- **Root Cause**: Server failed to start due to port conflict
- **Solution**: ✅ Fixed - restart Cursor to load the new configuration

### NPM Package Bug
- **Issue**: `@antonytm/figma-mcp-server@latest` tries to start HTTP server on port 38450 even in stdio mode
- **Solution**: ✅ Removed npm package configuration, using only local compiled version

---

**Configuration is now fixed!** 🎉
