# 🎨 Figma MCP Design System

**A complete design-to-code platform integrated with good-fullstack skill**

---

## 📋 Quick Links

- **[What's New](./WHATS_NEW.md)** - Feature announcement and highlights
- **[Quick Start](./DESIGN_SYSTEM_QUICKSTART.md)** - Get started in 5 minutes
- **[Complete Guide](./DESIGN_SYSTEM_GUIDE.md)** - Comprehensive reference
- **[Tool Recommendations](./DESIGN_TOOLS_RECOMMENDATIONS.md)** - Recommended Figma plugins and tools
- **[good-fullstack Integration](./GOOD_FULLSTACK_INTEGRATION.md)** - Workflow integration guide
- **[Skill Update](./GOOD_FULLSTACK_SKILL_UPDATE.md)** - How good-fullstack skill uses this

---

## 🚀 What Is This?

The Figma MCP Design System is a **professional design platform** built into your Figma MCP Server. It provides:

### For Designers
- 13 comprehensive design guidelines for different project types
- 20+ curated style guides from real-world products
- 50+ design tags for organization
- 14 pre-built UI patterns
- 13 component templates
- Create unlimited custom resources

### For Developers
- Design-to-code best practices
- Exact design token extraction
- Tailwind CSS integration guidelines
- Component implementation patterns
- Accessibility standards

### For Teams
- Export/import design systems as JSON
- Auto-generated documentation
- Version control friendly
- Shared design language

---

## 📊 By The Numbers

| Metric | Count |
|--------|-------|
| **Design Guidelines** | 13 built-in + unlimited custom |
| **Style Guides** | 20 built-in + unlimited custom |
| **Design Tags** | 50+ across 6 categories |
| **UI Patterns** | 14 with variants |
| **Component Templates** | 13 with variants |
| **MCP Tools** | 15 new tools |
| **Documentation** | 6 comprehensive guides |
| **Total Lines of Code** | 2,500+ |

---

## ⚡ Quick Start

### 1. List Available Resources

```typescript
await mcp.callTool("list-design-resources", { type: "all" });
```

### 2. Get Inspiration

```typescript
// Get guidelines for your project type
await mcp.callTool("get-design-guidelines", { 
  topic: "saas" 
});

// Get style inspiration
await mcp.callTool("get-style-guide", { 
  tags: ["minimal", "dark", "saas"] 
});
```

### 3. Create Your System

```typescript
// Document your design decisions
await mcp.callTool("create-design-guideline", {
  name: "my-app",
  overview: "My application design system",
  colors: {
    strategy: "Dark theme",
    palette: {
      primary: "#6366f1",
      background: "#0a0a0a"
    }
  }
});
```

### 4. Build & Share

```typescript
// Design in Figma using MCP tools
// ... (200+ Figma tools available)

// Export your system
await mcp.callTool("export-design-system", {});

// Generate documentation
await mcp.callTool("generate-design-docs", {});
```

---

## 🎯 Use Cases

### Solo Developer
✅ Quick design decisions  
✅ Style inspiration  
✅ Consistent designs  
✅ Future reference

### Design Agency
✅ Multiple client systems  
✅ Professional deliverables  
✅ Client handoffs  
✅ Version control

### Product Team
✅ Shared design language  
✅ Team alignment  
✅ Easy onboarding  
✅ Design evolution tracking

### Open Source
✅ Public documentation  
✅ Contributor guidelines  
✅ Design standards  
✅ Community involvement

---

## 🔧 All 15 Tools

### Discovery (5 tools)
1. `get-design-guidelines` - Comprehensive guidelines
2. `get-style-guide-tags` - Browse tags
3. `get-style-guide` - Curated examples
4. `get-ui-pattern` - UI patterns
5. `get-component-template` - Component specs

### Creation (3 tools)
6. `create-design-guideline` - Custom guidelines
7. `create-style-guide` - Custom style guides
8. `add-design-tag` - Custom tags

### Management (7 tools)
9. `update-design-guideline` - Update guidelines
10. `delete-design-guideline` - Delete custom guidelines
11. `delete-style-guide` - Delete custom style guides
12. `list-design-resources` - List all resources
13. `export-design-system` - Export as JSON
14. `import-design-system` - Import from JSON
15. `generate-design-docs` - Auto docs

---

## 📖 Documentation

### Beginner
Start here: **[Quick Start Guide](./DESIGN_SYSTEM_QUICKSTART.md)**

### Intermediate
Read next: **[Complete Guide](./DESIGN_SYSTEM_GUIDE.md)**

### Advanced
Reference: **[good-fullstack Integration](./GOOD_FULLSTACK_INTEGRATION.md)**

### Tools
For specific tools: **[Tool Recommendations](./DESIGN_TOOLS_RECOMMENDATIONS.md)**

---

## 🎨 Design Resources Included

### Guidelines Cover

- Landing pages & marketing sites
- Dashboards & admin panels
- Design system creation
- Mobile applications (iOS, Android)
- Web applications
- E-commerce sites
- SaaS platforms
- Portfolios & showcases
- Blogs & content sites
- Tailwind CSS integration
- Design-to-code workflows
- WCAG accessibility
- Responsive design

### Style Guides Include

- Dark Minimal SaaS (Linear, Raycast)
- Warm Editorial (Medium, Substack)
- Vibrant Gradient (Stripe, Framer)
- Material Design 3 (Google)
- iOS Native (Apple HIG)
- Fintech Professional (Stripe, Plaid)
- Glassmorphism (Apple-inspired)
- Brutalist Monochrome
- And 12+ more...

---

## 💾 Storage & Persistence

All custom resources saved to:

```
.design-system-storage/
├── custom-guidelines.json
├── custom-style-guides.json
└── custom-tags.json
```

**Features:**
- Automatic saving
- Survives server restarts
- Git-friendly JSON format
- Easy backup/restore
- Team sharing

---

## 🔗 Integration

### With good-fullstack Skill

Perfect complement to the design-first workflow:
- Enhanced guidelines (13 vs basic)
- More style guides (20+ vs limited)
- Custom resource creation
- Team collaboration features

**[Read Integration Guide](./GOOD_FULLSTACK_INTEGRATION.md)**

### With Figma

Uses all 200+ Figma MCP tools:
- Create/read/update/delete
- Components and instances
- Auto-layout and constraints
- Variables and styles
- Export and screenshots

---

## 🎓 Learning Resources

### 5-Minute Quick Start
**[DESIGN_SYSTEM_QUICKSTART.md](./DESIGN_SYSTEM_QUICKSTART.md)**
- 5 realistic scenarios
- Copy-paste examples
- Common patterns
- Cheat sheet

### Complete Reference
**[DESIGN_SYSTEM_GUIDE.md](./DESIGN_SYSTEM_GUIDE.md)**
- All features explained
- Every tool documented
- Best practices
- Advanced patterns

### Tool Ecosystem
**[DESIGN_TOOLS_RECOMMENDATIONS.md](./DESIGN_TOOLS_RECOMMENDATIONS.md)**
- 19 Figma plugins
- 9 browser extensions
- 13 desktop apps
- 13 VS Code extensions
- Free and paid options

### Workflow Integration
**[GOOD_FULLSTACK_INTEGRATION.md](./GOOD_FULLSTACK_INTEGRATION.md)**
- Complete workflow examples
- Migration from Pencil MCP
- Design token extraction
- Real-world project walkthrough

---

## ✅ Build Status

```bash
✅ TypeScript compilation: SUCCESS
✅ All tools registered: SUCCESS  
✅ Storage initialized: SUCCESS
✅ Documentation: COMPLETE
✅ Ready to use: YES
```

Test the installation:

```typescript
await mcp.callTool("list-design-resources", { type: "all" });
```

---

## 🎯 Getting Started

### Absolute Beginner

1. Read **[Quick Start](./DESIGN_SYSTEM_QUICKSTART.md)** (5 min)
2. Try: `list-design-resources({ type: "all" })`
3. Try: `get-style-guide({ tags: ["minimal"] })`

### Intermediate

1. Read **[Complete Guide](./DESIGN_SYSTEM_GUIDE.md)** (30 min)
2. Create your first custom guideline
3. Export and generate docs

### Advanced

1. Read **[Integration Guide](./GOOD_FULLSTACK_INTEGRATION.md)** (45 min)
2. Set up team workflow with export/import
3. Integrate with your build pipeline

---

## 💡 Example Commands

```typescript
// Explore
list-design-resources({ type: "all" })
get-style-guide-tags({ category: "aesthetic" })

// Get inspiration
get-design-guidelines({ topic: "dashboard" })
get-style-guide({ tags: ["minimal", "dark", "saas"] })
get-ui-pattern({ pattern: "card", variant: "with-image" })

// Create custom
create-design-guideline({ name: "my-app", overview: "...", ... })
create-style-guide({ name: "My Brand", tags: [...], ... })
add-design-tag({ category: "industry", tags: ["my-industry"] })

// Manage
update-design-guideline({ name: "my-app", updates: {...} })
delete-design-guideline({ name: "old-project" })

// Share
export-design-system({})
import-design-system({ data: {...}, merge: true })
generate-design-docs({ includeExamples: true })
```

---

## 🎁 What's Included

### Documentation (6 files)
- ✅ DESIGN_SYSTEM_README.md (this file)
- ✅ WHATS_NEW.md
- ✅ DESIGN_SYSTEM_GUIDE.md
- ✅ DESIGN_SYSTEM_QUICKSTART.md
- ✅ DESIGN_TOOLS_RECOMMENDATIONS.md
- ✅ GOOD_FULLSTACK_INTEGRATION.md

### Source Code (3 files)
- ✅ mcp/src/tools/design-system/index.ts
- ✅ mcp/src/tools/design-system/design-guidelines.ts
- ✅ mcp/src/tools/design-system/storage.ts

### Updated Files
- ✅ README.md (design system section)
- ✅ TOOLS.md (15 tool docs)
- ✅ CHANGELOG.md (complete changelog)
- ✅ mcp/src/server.ts (tool registration)

---

## 🆘 Need Help?

### Common Questions

**Q: How do I see what's available?**
```typescript
await mcp.callTool("list-design-resources", { type: "all" });
```

**Q: How do I create my own guideline?**
```typescript
await mcp.callTool("create-design-guideline", {
  name: "my-project",
  overview: "...",
  colors: { ... },
  spacing: { ... }
});
```

**Q: How do I share with my team?**
```typescript
await mcp.callTool("export-design-system", {});
// Share the JSON output
```

**Q: Where are my custom resources stored?**
`.design-system-storage/` directory (auto-created)

### More Help

- Read the **[Quick Start](./DESIGN_SYSTEM_QUICKSTART.md)**
- Check the **[Complete Guide](./DESIGN_SYSTEM_GUIDE.md)**
- Review **[Examples](./GOOD_FULLSTACK_INTEGRATION.md)**
- Open an issue on GitHub

---

## 🎉 Start Building

```typescript
// Your first command
await mcp.callTool("list-design-resources", { type: "all" });
```

**Welcome to professional design-to-code workflow!** 🚀
