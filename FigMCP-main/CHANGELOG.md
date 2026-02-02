# Changelog

All notable changes to the Figma MCP Server will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **🎨 Design System Integration** ⭐ MAJOR FEATURE
  - **15 New MCP Tools** for comprehensive design system management
  - **13 Built-in Design Guidelines** covering landing pages, dashboards, SaaS, mobile apps, e-commerce, portfolios, blogs, accessibility, responsive design, and more
  - **20+ Curated Style Guides** with real-world examples (Linear, Stripe, Material Design, iOS, etc.)
  - **50+ Design Tags** organized in 6 categories (aesthetic, industry, platform, color, layout, vibe)
  - **14 UI Patterns** with Figma-specific properties (navigation, hero, cards, forms, modals, etc.)
  - **13 Component Templates** with variants (buttons, inputs, cards, badges, avatars, etc.)
  - **Custom Resource Creation** - Create unlimited custom guidelines and style guides
  - **Export/Import System** - Share design systems as JSON with team members
  - **Auto-Generated Documentation** - Generate comprehensive markdown docs
  - **Persistent Storage** - All custom resources saved to `.design-system-storage/`
  - **Full CRUD Operations** - Create, read, update, delete design resources
  - **good-fullstack Skill Integration** - Seamless workflow with design-first development
  - Comprehensive documentation:
    - `DESIGN_SYSTEM_GUIDE.md` - Complete reference guide
    - `DESIGN_SYSTEM_QUICKSTART.md` - 5-minute quick start
    - `DESIGN_TOOLS_RECOMMENDATIONS.md` - Recommended Figma plugins and tools
    - `GOOD_FULLSTACK_INTEGRATION.md` - Integration workflow guide
    - `DESIGN_SYSTEM_SUMMARY.md` - Feature summary and overview

- **Visual Feedback System** ✨
  - Real-time border highlighting around elements being created/modified by AI
  - Popup animation effects (fade-in) for newly created elements
  - Automatic viewport zooming to show elements being worked on
  - Auto-cleanup of visual indicators after 3 seconds
  - Comprehensive documentation in `VISUAL_FEEDBACK.md`
  - Supports all create and modify operations (create-rectangle, create-frame, move-node, etc.)

- **New Read Tools** 📖
  - `list-nodes` - List all nodes with type filtering and depth control
  - `get-node-children` - Get all children of a node (supports recursive traversal)
  - `search-nodes` - Search nodes by name with fuzzy/exact matching
  - `get-node-tree` - Get hierarchical tree structure of nodes
  - Comprehensive tool documentation in `TOOLS.md`

### New Design System Tools

**Read/Get (5 tools):**
1. `get-design-guidelines` - Access 13 design guideline topics with detailed/summary/checklist formats
2. `get-style-guide-tags` - Browse tags across 6 categories
3. `get-style-guide` - Filter 20+ style guides by tags or name
4. `get-ui-pattern` - Get 14 UI patterns with Figma properties
5. `get-component-template` - Get 13 component templates with variants

**Create (3 tools):**
6. `create-design-guideline` - Create custom design guidelines for projects
7. `create-style-guide` - Create custom style guides with complete specs
8. `add-design-tag` - Add custom tags to the tag system

**Update (1 tool):**
9. `update-design-guideline` - Update existing design guidelines

**Delete (2 tools):**
10. `delete-design-guideline` - Remove custom guidelines
11. `delete-style-guide` - Remove custom style guides

**Management (4 tools):**
12. `list-design-resources` - List all guidelines and style guides
13. `export-design-system` - Export custom resources as JSON
14. `import-design-system` - Import design systems from JSON
15. `generate-design-docs` - Auto-generate comprehensive documentation

### Changed
- Enhanced plugin task handling to integrate visual feedback
- Improved error handling to clean up visual feedback on failures
- Updated README with design system and visual feedback feature highlights
- Expanded TOOLS.md with comprehensive design system documentation

### Technical Details
- Added `VisualFeedbackManager` singleton class
- Integrated visual feedback hooks into main task handler
- Implemented helper functions for command detection and node ID extraction
- Added automatic cleanup timers with configurable delays
- Created `design-system/` directory with modular architecture
- Implemented persistent storage system for custom design resources
- Added `design-guidelines.ts` with 13 guidelines and 20+ style guides
- Integrated storage layer with JSON file persistence

## [0.1.1] - 2025-01

### Added
- Initial MCP server implementation
- Basic CRUD tools (create, read, update, delete)
- WebSocket communication between plugin and server
- Support for rectangles, frames, text, instances, components
- Component property management
- Layout and styling tools

### Documentation
- Setup guide
- Architecture documentation
- README with usage instructions

## [0.1.0] - 2025-01

### Added
- Initial project setup
- Basic Figma plugin structure
- MCP server foundation
- Socket.io integration

---

## Release Types

- **Major** (X.0.0): Breaking changes, major new features
- **Minor** (0.X.0): New features, backwards compatible
- **Patch** (0.0.X): Bug fixes, small improvements

## Legend

- ✨ New feature
- 🐛 Bug fix
- 📖 Documentation
- ⚡ Performance improvement
- 🔒 Security update
- 🎨 UI/UX improvement
- ♻️ Refactoring
- 🧪 Testing
