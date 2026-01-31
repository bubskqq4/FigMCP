# Figma Model Context protocol server

[![Community Figma MCP server - Allow AI Agents to help you with Figma designs! | Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=1056256&amp;theme=light&amp;period=daily&amp;t=1767540612947)](https://www.producthunt.com/products/community-figma-mcp-server?embed=true&amp;utm_source=badge-top-post-badge&amp;utm_medium=badge&amp;utm_campaign=badge-community-figma-mcp-server)

## Problem

The official Figma MCP server has only read-only tools. **You can not change anything in the Figma document using the official Figma MCP server.**
You can use AI Agent in Figma Make. But, it is not convenient to chat in Figma Make and then move result to Figma to continue.

**The goal is to enable AI Agents to work with your Figma documents.**

You are able to ask you AI agent to implement the design in Figma that you want with this MCP server!

## Usage

### Prerequisites
1. Install `Node.js` if you don't have it
2. Clone this repository

### Start Figma Plugin

1. Switch to plugin directory: `cd plugin`
2. Install dependencies: `npm i`
3. Build Figma Plugin `npm run build`
4. Open Figma, open document you want to work with
5. Add Figma Plugin *Plugins* > *Development* > *Imprort Plugin from manifest*, select `/plugin/manifest.json`
6. Start the *Figma MCP Server* plugin
7. Expected result: Message *Not connected to MCP server* should be shown
8. Do not close Plugin window. It will show message *Connected to MCP server* when it is started.

Next time you can start plugin from: *Plugins* > *Development* > *Figma MCP Server*. And do 1-3 steps only when you want to get latest changes.

### Start MCP server 

1. Switch to MCP directory: `cd mcp`
2. Install dependencies: `npm i`
3. Start the server: `npm run start`
4. Expected result: Messages `Server listening on http://localhost:38450` and `a user connected: .............` in the console

### Configure MCP server in your client

1. Use Streaming HTTP transport and `http://localhost:38450/mcp` URL
2. Turn off tools that you don't need

Now you should be able to ask your AI Agent to do something in Figma. For example:

![Claude](doc/Claude.png)
![Figma](doc/Figma.png)


**We are working on publishing it as Figma plugin. Figma reviewers haven't accepted it so far.**
Once Figma accept it as plugin, the configuration and start will be simplified a lot!

## Tools

### 🎨 Design System Tools ⭐ NEW!
- **Comprehensive Design System** - Integrated design guidelines and style management
  - **13+ Built-in Guidelines** - Landing pages, dashboards, SaaS, mobile apps, and more
  - **20+ Curated Style Guides** - Real-world examples from Linear, Stripe, Material Design, etc.
  - **50+ Design Tags** - Organize by aesthetic, industry, platform, color, layout, and vibe
  - **Create Custom Resources** - Build your own guidelines and style guides
  - **Export/Import** - Share design systems with your team
  - **Auto Documentation** - Generate comprehensive design docs
  - **Persistent Storage** - All custom resources saved automatically
  - 📖 **[View Complete Design System Guide](./DESIGN_SYSTEM_GUIDE.md)**
  - 🔧 **[View Recommended Design Tools](./DESIGN_TOOLS_RECOMMENDATIONS.md)**

**Quick Start:**
```typescript
// Get design guidelines for your project
get-design-guidelines({ topic: "saas" })

// Get style inspiration
get-style-guide({ tags: ["minimal", "dark", "saas"] })

// Create your custom guideline
create-design-guideline({ name: "my-app", ... })
```

### Utility Tools
- **link-to-node-id** ⭐ NEW - Convert Figma element/layer links to node IDs
  - Supports file, design, and prototype links
  - Automatically converts URL format to API format
  - Essential for working with shared Figma links
  - 📖 **[View Link Utils Guide](./LINK_UTILS_USAGE.md)**

### Read Tools
- **get-selection** - Get currently selected nodes
- **get-node-info** - Get detailed information about a specific node
- **get-pages** - Get all pages in the document
- **get-all-components** - Get all components in the document
- **list-nodes** ⭐ NEW - List nodes with type filtering and depth control
- **get-node-children** ⭐ NEW - Get all children of a node (recursive support)
- **search-nodes** ⭐ NEW - Search nodes by name with fuzzy/exact matching
- **get-node-tree** ⭐ NEW - Get hierarchical tree structure of nodes

### Create Tools
- **create-rectangle** - Create a rectangle node
- **create-frame** - Create a frame node
- **create-text** - Create a text node
- **create-instance** - Create a component instance
- **create-component** - Create a component
- **clone-node** - Clone an existing node
- **add-component-property** - Add property to component

### Update Tools
- **move-node** - Move a node to new position
- **resize-node** - Resize a node
- **set-fill-color** - Set fill color of a node
- **set-stroke-color** - Set stroke color of a node
- **set-corner-radius** - Set corner radius
- **set-layout** - Set layout properties (auto-layout)
- **set-parent-id** - Change parent of a node
- **edit-component-property** - Edit component property
- **set-instance-properties** - Set instance properties
- **set-node-component-property-references** - Set component property references

### Delete Tools
- **delete-node** - Delete a node
- **delete-component-property** - Delete component property

📖 **[View Detailed Tool Documentation](./TOOLS.md)**

## Visual Feedback

⭐ **NEW!** The plugin now includes a visual feedback system that shows borders around elements as AI creates them:

- **🎯 Real-time highlighting** - Blue borders appear around elements being created
- **💫 Popup animations** - Smooth fade-in effects for newly created elements
- **🔍 Auto-zoom** - Viewport automatically scrolls to show new elements
- **🧹 Auto-cleanup** - Visual indicators clear automatically after 3 seconds

When AI creates or modifies elements, you'll see exactly what's being changed in real-time with smooth visual feedback.

📖 **[View Visual Feedback Documentation](./VISUAL_FEEDBACK.md)**

## Development

Contributions to the project are welcome!

### MCP server
1. `cd mcp`
2. `npm i`
3. `npm run dev`

### Plugin
1. `cd plugin`
2. `npm i`
3. `npm run dev`
4. Open Figma
5. Plugins > Development > Import plugin from manifest ...
6. Select `manifest.json` from `plugin\manifest.json`
7. Start plugin
8. You should see *Connected to MCP server* message

### Add Plugin to Figma
1. Open Figma
2. Add Figma Plugin *Plugins* > *Development* > *Imprort Plugin from manifest*, select `/plugin/manifest.json`

### Inspector
1. `cd mcp`
2. `npm run inspector`
3. Use `http://127.0.0.1:38450/mcp` to connect

## Architecture

WebSockets server is used as a medium to transfer messages between MCP Server and Figma Plugin.

MCP server starts *Express.js* server with MCP endpoints and WebSockets *socket.io* server for communication with Plugin.
MCP server save tool calls into the queue and send message to WebSockets server.

Figma Plugin listen to the WebSocket server. And if there are any tasks to do, it takes them, do required actions, and return the result.

MCP server listen to the WebSockets server. If there are any messages from Figma plugin then it processes them. It found the apropriacte tool call in the queue. And executes the promise with the result from Figma plugin. If any of tool calls are executed for too long then it returns timeout wihtout waiting for the response.

![Architecture](doc/figma-mcp-architecture.png)
![Sequence](doc/figma-mcp-sequence.svg)


## Security

Plugin gives access to your design document for external systems: AI Agents that you will connect. It acts as a bridge in the similar way as the official Figma MCP server. And, similar to the official MCP server it works on local machine and do not expose any information to the networks.

If you want to use it in the network, please do it on your own risk.

If you found any security issue, please report it via GitHub issue. 

## Alternatives

If your tasks could be done by [official Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server), please use it.

Before starting this project, I made a search for my idea to implement Figma MCP server using Figma plugin and sockets as protocol for communication. And I found [this one](https://github.com/grab/cursor-talk-to-figma-mcp). Initially, I thought to fork it and change for my needs. But, there are few things that I don't like: requirement to run separate server for socket, everything located in one file, very hard to maintain, JavaScript(not TypeScript or Python). But, you always can consider that server as an alternative.