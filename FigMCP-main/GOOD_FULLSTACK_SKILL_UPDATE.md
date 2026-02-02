# good-fullstack Skill Update

## Integration with Figma MCP Design System

The good-fullstack skill can now use the **Figma MCP Design System** as an enhanced alternative to Pencil MCP for design-first workflows.

---

## What Changed

### Enhanced Design Tools

The good-fullstack skill previously relied on Pencil MCP for:
- `get_guidelines()` - Design guidelines
- `get_style_guide_tags()` - Style tag discovery
- `get_style_guide()` - Style inspiration

**Now available in Figma MCP:**
- `get-design-guidelines()` - 13 comprehensive topics vs Pencil's limited set
- `get-style-guide-tags()` - 50+ tags in 6 categories
- `get-style-guide()` - 20+ curated real-world examples
- **Plus 12 additional tools** for creating custom resources

---

## Recommended Usage in good-fullstack Skill

### Update to Step 2 of Design-First Workflow

**Original (Pencil MCP):**
```javascript
// Get relevant guidelines for your task
get_guidelines({ topic: "landing-page" })     // For websites
get_guidelines({ topic: "design-system" })    // For apps/dashboards

// Get style inspiration
get_style_guide_tags()
get_style_guide({ tags: ["modern", "minimal", "webapp", "dark", "saas"] })
```

**Enhanced (Figma MCP):**
```typescript
// Get comprehensive guidelines with multiple format options
await mcp.callTool("get-design-guidelines", { 
  topic: "landing-page",
  format: "detailed"  // or "summary" or "checklist"
});

// Explore 50+ tags across 6 categories
await mcp.callTool("get-style-guide-tags", {
  category: "aesthetic"  // or "industry", "platform", etc.
});

// Get from 20+ curated style guides
await mcp.callTool("get-style-guide", { 
  tags: ["modern", "minimal", "webapp", "dark", "saas"],
  includeExamples: true
});

// NEW: Get UI patterns
await mcp.callTool("get-ui-pattern", {
  pattern: "hero"
});

// NEW: Get component templates
await mcp.callTool("get-component-template", {
  component: "button",
  includeVariants: true
});
```

---

## New Capabilities for good-fullstack

### 1. Document Design Decisions

**NEW:** Create project-specific guidelines

```typescript
// After designing in Figma, document your decisions
await mcp.callTool("create-design-guideline", {
  name: "project-name",
  overview: "Design system for [Project Name]",
  
  // Extract from your Figma design
  spacing: {
    base: "4px",
    scale: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px"
    }
  },
  
  colors: {
    strategy: "Dark theme with accent",
    palette: {
      background: "#0a0a0a",  // From Figma
      primary: "#6366f1"       // From Figma
    }
  },
  
  bestPractices: [
    "Sidebar: 260px wide",
    "Cards: 16px padding, 12px radius",
    "Use skeleton loaders"
  ]
});
```

### 2. Team Collaboration

**NEW:** Share design systems

```typescript
// Designer exports
const exported = await mcp.callTool("export-design-system", {});
// Commit JSON to git

// Developer imports
await mcp.callTool("import-design-system", {
  data: exportedData,
  merge: true
});
```

### 3. Auto-Generated Documentation

**NEW:** Generate comprehensive docs

```typescript
// Generate before client review or developer handoff
await mcp.callTool("generate-design-docs", {
  includeExamples: true,
  format: "markdown"
});
```

---

## Updated Design-First Checklist

Add these steps to the existing good-fullstack design-first checklist:

**Before implementing ANY UI code:**

- [ ] Opened/created Figma file
- [ ] Retrieved appropriate guidelines with `get-design-guidelines`
- [ ] Got style inspiration with `get-style-guide`
- [ ] **NEW:** Got UI patterns with `get-ui-pattern`
- [ ] **NEW:** Got component templates with `get-component-template`
- [ ] Created design using Figma MCP tools with realistic dimensions
- [ ] Validated design visually with `screenshot-node`
- [ ] Extracted exact design tokens (colors, spacing, fonts, radii)
- [ ] **NEW:** Created custom guideline to document decisions
- [ ] Implemented code matching EXACT design values
- [ ] **NEW:** Exported design system for version control
- [ ] Updated Figma file to reflect current app state

---

## Recommended Workflow Update

### Phase 1: Research (Enhanced)

```typescript
// 1. Get comprehensive guidelines
const guidelines = await mcp.callTool("get-design-guidelines", {
  topic: "saas",  // or dashboard, mobile-app, etc.
  format: "detailed"
});

// 2. Explore style options with more tags
const tags = await mcp.callTool("get-style-guide-tags", {
  category: "all"
});

// 3. Get curated inspiration (20+ guides)
const styleGuide = await mcp.callTool("get-style-guide", {
  tags: ["minimal", "dark", "saas", "professional"],
  includeExamples: true
});

// 4. Get UI patterns (NEW!)
const heroPattern = await mcp.callTool("get-ui-pattern", {
  pattern: "hero",
  variant: "centered"
});

const cardPattern = await mcp.callTool("get-ui-pattern", {
  pattern: "card",
  variant: "with-image"
});
```

### Phase 2: Document (NEW!)

```typescript
// Create project-specific guideline
await mcp.callTool("create-design-guideline", {
  name: "my-project-2024",
  overview: "Design system for [Project Name]",
  // ... extracted from research
});

// Create custom style guide if needed
await mcp.callTool("create-style-guide", {
  name: "Custom Brand",
  tags: ["custom", "brand"],
  // ... brand specifications
});
```

### Phase 3: Design (Same)

Use Figma MCP tools to create the design (200+ tools available)

### Phase 4: Validate (Same)

```typescript
await mcp.callTool("screenshot-node", {
  nodeId: designId
});
```

### Phase 5: Implement (Enhanced)

Extract exact values from your custom guideline:

```typescript
// Get your custom guideline
const myGuideline = await mcp.callTool("get-design-guidelines", {
  topic: "my-project-2024"
});

// Use EXACT values in code
// colors.palette.primary → Tailwind config
// spacing.scale.md → className="p-4"
// typography.scale.h1 → className="text-[28px]"
```

### Phase 6: Share (NEW!)

```typescript
// Export for team/backup
await mcp.callTool("export-design-system", {});

// Generate documentation
await mcp.callTool("generate-design-docs", {
  includeExamples: true
});

// Commit to version control
```

---

## Benefits Over Pencil MCP

| Aspect | Pencil MCP | Figma MCP |
|--------|------------|-----------|
| **Guidelines** | Basic | 13 comprehensive topics |
| **Style Guides** | ~10 examples | 20+ real-world examples |
| **Tags** | ~20 tags | 50+ in 6 categories |
| **Customization** | ❌ No | ✅ Unlimited custom resources |
| **Persistence** | ❌ In-memory | ✅ Saved to disk |
| **Export** | ❌ No | ✅ Full export/import |
| **Documentation** | Manual | ✅ Auto-generated |
| **UI Patterns** | ❌ No | ✅ 14 patterns |
| **Component Templates** | ❌ No | ✅ 13 templates |
| **Team Sharing** | Difficult | ✅ JSON export/import |
| **Real Tool** | .pen files | ✅ Real Figma files |
| **Production Use** | Limited | ✅ Professional workflows |

---

## Recommendation

### For good-fullstack Users

**Use Figma MCP Design System when:**
- ✅ Working on professional projects
- ✅ Need team collaboration
- ✅ Want persistent custom resources
- ✅ Require comprehensive guidelines
- ✅ Need real Figma file output
- ✅ Want auto-generated documentation

**Use Pencil MCP when:**
- Quick prototypes or experiments
- Already have .pen workflow established
- Don't need advanced features

**Best Practice:**
Use **Figma MCP** as the primary design tool for all good-fullstack projects. It provides everything Pencil MCP offers plus extensive additional features.

---

## Migration Steps

### 1. Replace Tool Calls

Find and replace in your workflow:

```typescript
// OLD
get_guidelines({ topic: "saas" })
↓
// NEW
await mcp.callTool("get-design-guidelines", { topic: "saas" })

// OLD
get_style_guide({ tags: ["minimal", "dark"] })
↓
// NEW
await mcp.callTool("get-style-guide", { tags: ["minimal", "dark"] })
```

### 2. Enhance with New Features

```typescript
// Add pattern discovery
await mcp.callTool("get-ui-pattern", { pattern: "hero" });

// Add component templates
await mcp.callTool("get-component-template", { component: "button" });

// Document decisions
await mcp.callTool("create-design-guideline", { ... });
```

### 3. Update Design-First Checklist

Use the updated checklist from this document.

---

## Example: Complete Project

```typescript
// ========================================
// FULL WORKFLOW EXAMPLE
// ========================================

// 1. Research
await mcp.callTool("get-design-guidelines", { 
  topic: "saas", 
  format: "detailed" 
});

await mcp.callTool("get-style-guide", { 
  tags: ["minimal", "dark", "saas"] 
});

await mcp.callTool("get-ui-pattern", { pattern: "dashboard" });

// 2. Document
await mcp.callTool("create-design-guideline", {
  name: "acme-saas",
  overview: "SaaS dashboard for Acme Corp",
  spacing: { base: "4px", scale: { md: "16px", lg: "24px" } },
  colors: {
    strategy: "Dark with blue accent",
    palette: {
      background: "#0a0a0a",
      primary: "#6366f1"
    }
  }
});

// 3. Design in Figma
const dashboard = await mcp.callTool("create-frame", {
  name: "Dashboard",
  width: 1440,
  height: 900,
  fill: "#0a0a0a"
});

// 4. Validate
await mcp.callTool("screenshot-node", { nodeId: dashboard.id });

// 5. Implement in Code
// ... React/Next.js with exact values from guideline

// 6. Share
await mcp.callTool("export-design-system", {});
await mcp.callTool("generate-design-docs", {});
// Commit to git
```

---

## Summary

The Figma MCP Design System **enhances** the good-fullstack skill with:

- More comprehensive guidelines (13 vs basic)
- Real-world style guides (20+ vs limited)
- Better organization (50+ tags)
- Custom resource creation (new)
- Team collaboration (new)
- Auto-documentation (new)
- Persistent storage (new)

**Result:** A more professional, scalable, and collaborative design-first workflow.

---

**Start using today with `list-design-resources({ type: "all" })`**
