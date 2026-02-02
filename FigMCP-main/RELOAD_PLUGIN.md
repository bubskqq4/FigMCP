# 🔄 How to Reload the Plugin (Clear Figma Cache)

Figma caches plugin code aggressively. When you make changes, you **MUST** completely remove and re-import the plugin.

## ⚠️ Why You Need This

Figma caches:
- Compiled JavaScript code (`main.js`, `index.html`)
- The `manifest.json` configuration
- Network access permissions

Simply closing and reopening the plugin **DOES NOT** reload the code. You must remove and re-import.

---

## 🔄 Complete Reload Steps

### Step 1: Remove Old Plugin

1. **In Figma**, go to **Plugins** menu
2. Right-click on **"Figma MCP Server"** in the Development section
3. Select **"Remove plugin"**
4. Confirm removal

### Step 2: Re-Import Fresh Plugin

1. Go to **Plugins** > **Development** > **Import plugin from manifest...**
2. Navigate to: `C:\Users\EthFR\Downloads\figma-mcp-server-main\figma-mcp-server-main\plugin\`
3. Select **`manifest.json`**
4. Click **Open**

### Step 3: Start the Plugin

1. Go to **Plugins** > **Development** > **Figma MCP Server**
2. The plugin window should open
3. You should see **✅ "Connected to MCP server"**

---

## ✅ Verify It Worked

**Check the console** (Plugins > Development > Open Console):

### ❌ OLD (Cached) - You'll see:
```
Error: listen EADDRINUSE: address already in use :::38450
Syntax error on line 857: Unexpected token ?
Failed to load resource from ws://localhost:38451
```

### ✅ NEW (Fresh) - You should see:
```
connected to MCP server
start-task Object
🎨 Visual feedback activated
✨ Highlighted node: [NodeName] (FRAME)
```

---

## 🐛 Still Seeing Errors?

### CSP Error for 38450 instead of 38451

**Symptom:**
```
Connecting to 'ws://localhost:38451' violates CSP directive: 
"default-src ... http://localhost:38450/ ws://localhost:38450/ ..."
```

**Cause:** Figma is using the old cached manifest.json

**Solution:**
1. **Close Figma completely** (quit the app)
2. **Reopen Figma**
3. **Remove and re-import the plugin** (follow steps above)

### Syntax Error on line 857

**Symptom:**
```
Syntax error on line 857: Unexpected token ?
const maxDepth = args.maxDepth ?? 1;
```

**Cause:** Figma is using old cached main.js

**Solution:**
1. **Remove the plugin completely** (don't just close it)
2. **Re-import from manifest.json**
3. This forces Figma to reload all files

---

## 🚀 After Successful Reload

### Test Visual Feedback

Create something in Figma:
```
Ask AI: "Create a blue rectangle"
```

You should see:
- 🎯 Blue border appears around the rectangle
- 💫 Popup animation plays
- 🔍 Viewport zooms to show it
- ⏱️ Border disappears after 3 seconds

### Check Console Logs

Open console: **Plugins > Development > Open Console**

You should see:
```
connected to MCP server
start-task { command: 'create-rectangle', ... }
🎨 Visual feedback activated
✨ Highlighted node: Rectangle (RECTANGLE)
⏱️ Scheduling cleanup in 3000ms...
🧹 Cleaning up visual feedback...
✅ Cleaned up 1 highlighted nodes
```

---

## 💡 Development Workflow

Whenever you make changes to the plugin:

```bash
# 1. Build the plugin
cd plugin
npm run build

# 2. In Figma: Remove plugin
# 3. In Figma: Re-import from manifest.json
# 4. In Figma: Start the plugin
```

**Pro tip:** Keep the development console open to catch errors immediately.

---

## 🔍 Quick Debug Checklist

- [ ] MCP server is running (`npm start` in mcp folder)
- [ ] Port 38451 is accessible (check with `netstat -ano | findstr :38451`)
- [ ] Plugin removed from Figma
- [ ] Plugin re-imported from manifest.json
- [ ] Console shows "connected to MCP server"
- [ ] No syntax errors in console
- [ ] Visual feedback logs appear when creating elements

---

## ⚡ Quick Test Commands

After reload, test these in the console:

```javascript
// Should show your Figma username
console.log(figma.currentUser)

// Should show "Connected to MCP server" in plugin UI
// Should show connection logs in console
```

---

**Remember:** Figma caches aggressively. Always **remove and re-import** after building! 🔄
