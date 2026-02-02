# Design System Quick Start

Get started with the Figma MCP Design System in 5 minutes.

## Scenario 1: Building a SaaS Dashboard

### Step 1: Get Design Inspiration

```typescript
// Get dashboard guidelines
const guidelines = await mcp.callTool("get-design-guidelines", {
  topic: "dashboard",
  format: "detailed"
});

// Get style inspiration
const styleGuide = await mcp.callTool("get-style-guide", {
  tags: ["minimal", "dark", "saas"]
});
```

**Output:** You'll get:
- Spacing system (4px base grid)
- Typography scale (14px body, 24-28px headings)
- Color palette (neutral with semantic colors)
- Best practices for dashboards

### Step 2: Create Your Custom Guideline

```typescript
await mcp.callTool("create-design-guideline", {
  name: "acme-dashboard",
  overview: "Design system for Acme Analytics Dashboard",
  
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
    strategy: "Dark theme with electric blue accent",
    palette: {
      background: "#0a0a0a",
      surface: "#1a1a1a",
      border: "#2a2a2a",
      foreground: "#ffffff",
      primary: "#6366f1",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444"
    }
  },
  
  typography: {
    scale: {
      stat: "40px",
      h1: "28px",
      h2: "20px",
      body: "14px",
      small: "12px"
    },
    fonts: ["Inter Variable", "JetBrains Mono"]
  },
  
  bestPractices: [
    "Sidebar: 260px wide, sticky",
    "Cards: 16-24px padding, 12px corner radius",
    "Use skeleton loaders for async data",
    "Include empty states with CTAs"
  ]
});
```

### Step 3: Get UI Patterns

```typescript
// Get sidebar pattern
const sidebar = await mcp.callTool("get-ui-pattern", {
  pattern: "sidebar",
  variant: "with-sections"
});

// Get card pattern
const card = await mcp.callTool("get-ui-pattern", {
  pattern: "card"
});

// Get stats pattern
const stats = await mcp.callTool("get-ui-pattern", {
  pattern: "stats",
  variant: "cards"
});
```

### Step 4: Build in Figma

Now use the Figma MCP tools with your design tokens:

```typescript
// Create dashboard frame
const dashboard = await mcp.callTool("create-frame", {
  name: "Dashboard",
  width: 1440,
  height: 900,
  fill: "#0a0a0a"  // From your palette
});

// Create sidebar (260px from best practices)
const sidebar = await mcp.callTool("create-frame", {
  parentId: dashboard.id,
  name: "Sidebar",
  width: 260,
  fill: "#1a1a1a"  // From your palette
});

// Create stat cards
const statsCard = await mcp.callTool("create-frame", {
  parentId: dashboard.id,
  name: "Stats Card",
  width: 320,
  height: 120,
  fill: "#1a1a1a",
  cornerRadius: 12,  // From your best practices
  padding: 20
});
```

### Step 5: Export Your Design System

```typescript
// Export for backup or team sharing
const exported = await mcp.callTool("export-design-system", {});

// Save the JSON output to share with team
```

---

## Scenario 2: Creating a Landing Page

### Complete Workflow

```typescript
// 1. Get landing page guidelines
await mcp.callTool("get-design-guidelines", {
  topic: "landing-page",
  format: "detailed"
});

// 2. Explore style options
await mcp.callTool("get-style-guide-tags", {
  category: "aesthetic"
});

// 3. Get specific style inspiration
await mcp.callTool("get-style-guide", {
  tags: ["vibrant", "startup", "colorful"]
});
// Returns: "Startup Energy" style guide with gradient aesthetics

// 4. Create custom style guide
await mcp.callTool("create-style-guide", {
  name: "My Startup Landing",
  tags: ["vibrant", "startup", "web"],
  description: "Landing page for my AI startup",
  colors: {
    background: "oklch(0.99 0.01 240)",
    primary: "#667eea",
    accent: "#f093fb",
    gradient: "linear-gradient(135deg, #667eea 0%, #f093fb 100%)"
  },
  typography: {
    display: "Cal Sans, sans-serif",
    body: "Inter Variable, sans-serif",
    displaySize: "72px",
    bodySize: "18px"
  }
});

// 5. Get UI patterns for landing sections
await mcp.callTool("get-ui-pattern", { pattern: "hero" });
await mcp.callTool("get-ui-pattern", { pattern: "feature-grid" });
await mcp.callTool("get-ui-pattern", { pattern: "cta" });

// 6. Build in Figma using the patterns
// ... (use Figma MCP create tools)

// 7. Generate documentation
await mcp.callTool("generate-design-docs", {
  includeExamples: true
});
```

---

## Scenario 3: Team Collaboration

### Designer Creates Design System

```typescript
// 1. Create comprehensive guideline
await mcp.callTool("create-design-guideline", {
  name: "team-project",
  overview: "Shared design system for Team Project",
  // ... complete definition
});

// 2. Add custom tags
await mcp.callTool("add-design-tag", {
  category: "industry",
  tags: ["our-industry"]
});

// 3. Create multiple style guides
await mcp.callTool("create-style-guide", {
  name: "Light Theme",
  // ...
});

await mcp.callTool("create-style-guide", {
  name: "Dark Theme",
  // ...
});

// 4. Export for team
const exported = await mcp.callTool("export-design-system", {});
// Share the JSON with developers
```

### Developer Imports Design System

```typescript
// 1. Import the design system
await mcp.callTool("import-design-system", {
  data: {
    // Paste JSON from designer
    guidelines: { ... },
    styleGuides: [ ... ]
  },
  merge: true  // Keep existing custom resources
});

// 2. Verify import
await mcp.callTool("list-design-resources", {
  type: "all"
});

// 3. Use in development
await mcp.callTool("get-design-guidelines", {
  topic: "team-project"
});
```

---

## Scenario 4: Client Project Workflow

### Initial Setup

```typescript
// 1. Explore client's industry
await mcp.callTool("get-style-guide", {
  tags: ["ecommerce", "luxury"]
});

// 2. Create client-specific guideline
await mcp.callTool("create-design-guideline", {
  name: "client-luxury-shop",
  overview: "High-end e-commerce design for luxury goods",
  
  colors: {
    strategy: "Minimal palette with gold accents for luxury feel",
    palette: {
      background: "#FFFFFF",
      surface: "#F8F8F8",
      text: "#1A1A1A",
      accent: "#D4AF37",  // Gold
      border: "#E5E5E5"
    }
  },
  
  typography: {
    scale: {
      hero: "64px",
      h1: "48px",
      h2: "32px",
      body: "16px"
    },
    fonts: ["Canela, serif", "Nib Pro, sans-serif"]
  },
  
  bestPractices: [
    "Generous white space (80-120px section padding)",
    "High-quality product images at 2x resolution",
    "Subtle animations (300-400ms duration)",
    "Gold accent used sparingly (5% of design)"
  ]
});

// 3. Generate client presentation docs
await mcp.callTool("generate-design-docs", {
  includeExamples: true,
  format: "markdown"
});
```

---

## Scenario 5: Multi-Brand Management

### Managing Multiple Brands

```typescript
// Brand A - Tech Startup
await mcp.callTool("create-style-guide", {
  name: "Brand A - Tech",
  tags: ["modern", "tech", "vibrant"],
  colors: {
    primary: "#6366f1",
    accent: "#ec4899"
  }
});

// Brand B - Finance
await mcp.callTool("create-style-guide", {
  name: "Brand B - Finance",
  tags: ["professional", "trustworthy", "conservative"],
  colors: {
    primary: "#003DA5",
    accent: "#D4AF37"
  }
});

// Brand C - Wellness
await mcp.callTool("create-style-guide", {
  name: "Brand C - Wellness",
  tags: ["organic", "calm", "natural"],
  colors: {
    primary: "#4CAF50",
    accent: "#FF9800"
  }
});

// List all brands
await mcp.callTool("list-design-resources", {
  type: "style-guides"
});

// Switch between brands
await mcp.callTool("get-style-guide", {
  name: "Brand A - Tech"
});
```

---

## Common Patterns

### Quick Design Token Export

```typescript
// 1. Get your guideline
const guideline = await mcp.callTool("get-design-guidelines", {
  topic: "my-app"
});

// 2. Convert to Tailwind config
// Use the spacing, colors, typography from guideline
// Create tailwind.config.js with exact values
```

### Design Consistency Check

```typescript
// 1. List all your resources
await mcp.callTool("list-design-resources", {
  type: "all"
});

// 2. Generate documentation
await mcp.callTool("generate-design-docs", {});

// 3. Review for inconsistencies
// Ensure all colors/spacing match across guidelines
```

### Client Handoff

```typescript
// 1. Create complete guideline
await mcp.callTool("create-design-guideline", {
  name: "client-final",
  // ... complete definition
});

// 2. Generate docs
const docs = await mcp.callTool("generate-design-docs", {
  includeExamples: true
});

// 3. Export system
const exported = await mcp.callTool("export-design-system", {});

// 4. Deliver:
// - Documentation (markdown)
// - Design tokens (JSON)
// - Figma file
```

---

## Tips & Best Practices

### 1. Start with Built-in Resources

```typescript
// Explore what's available
await mcp.callTool("list-design-resources", { type: "all" });

// Get inspiration before creating custom
await mcp.callTool("get-style-guide", { tags: ["your-industry"] });
```

### 2. Use Tags Extensively

```typescript
// Add project-specific tags
await mcp.callTool("add-design-tag", {
  category: "industry",
  tags: ["your-niche"]
});

// Makes future filtering easier
await mcp.callTool("get-style-guide", {
  tags: ["your-niche", "minimal"]
});
```

### 3. Document Decisions

```typescript
// Create guideline early in project
await mcp.callTool("create-design-guideline", {
  name: "project-name",
  overview: "Document why you made certain choices",
  bestPractices: [
    "Specific decisions for this project",
    "Edge cases to watch for",
    "Client preferences"
  ]
});
```

### 4. Version Control

```typescript
// Export before major changes
await mcp.callTool("export-design-system", {});
// Save JSON to version control

// Update guideline
await mcp.callTool("update-design-guideline", {
  name: "project",
  updates: { ... }
});

// Export new version
await mcp.callTool("export-design-system", {});
```

### 5. Generate Docs Regularly

```typescript
// Before client reviews
await mcp.callTool("generate-design-docs", {});

// Before developer handoff
await mcp.callTool("generate-design-docs", {
  includeExamples: true
});
```

---

## Integration with good-fullstack Skill

The design system is fully integrated with the good-fullstack skill workflow:

### Design-First Workflow

1. **Get Guidelines** → Understand best practices
2. **Get Style Guide** → Choose aesthetic direction
3. **Create in Figma** → Build visual design
4. **Create Custom Guideline** → Document decisions
5. **Implement in Code** → Match design exactly
6. **Update main.pen** → Keep design file in sync

### Example: Complete Flow

```typescript
// 1. Research
await mcp.callTool("get-design-guidelines", { 
  topic: "web-app" 
});

await mcp.callTool("get-style-guide", { 
  tags: ["productivity", "minimal", "dark"] 
});

// 2. Document your decisions
await mcp.callTool("create-design-guideline", {
  name: "my-productivity-app",
  overview: "Keyboard-first productivity app",
  colors: {
    strategy: "Dark neutral with teal accents",
    palette: {
      background: "#0f0f0f",
      surface: "#1a1a1a",
      primary: "#14b8a6"
    }
  }
});

// 3. Build in Figma (using Figma MCP tools)
// ... create frames, components, etc.

// 4. Export and generate docs
await mcp.callTool("export-design-system", {});
await mcp.callTool("generate-design-docs", {});
```

---

## Cheat Sheet

### Most Used Commands

```typescript
// Explore
list-design-resources({ type: "all" })
get-style-guide-tags()

// Get inspiration
get-design-guidelines({ topic: "saas" })
get-style-guide({ tags: ["minimal", "dark"] })

// Create custom
create-design-guideline({ name: "project", ... })
create-style-guide({ name: "Brand", ... })

// Manage
update-design-guideline({ name: "project", updates: { ... } })
delete-design-guideline({ name: "old-project" })

// Share
export-design-system({})
import-design-system({ data: { ... }, merge: true })
generate-design-docs({ includeExamples: true })
```

### Common Tag Combinations

| Project Type | Recommended Tags |
|--------------|------------------|
| **SaaS Dashboard** | `["saas", "minimal", "dark", "professional"]` |
| **E-commerce** | `["ecommerce", "clean", "trustworthy", "light"]` |
| **Portfolio** | `["portfolio", "bold", "creative", "unique"]` |
| **Mobile App** | `["mobile", "native", "accessible", "modern"]` |
| **Landing Page** | `["marketing", "bold", "converting", "vibrant"]` |
| **Finance App** | `["fintech", "professional", "trustworthy", "dark"]` |

---

## Troubleshooting

### "Guideline not found"

```typescript
// List available guidelines
await mcp.callTool("list-design-resources", {
  type: "guidelines"
});

// Check spelling and try again
```

### "No style guides match tags"

```typescript
// Get all available tags first
await mcp.callTool("get-style-guide-tags", {});

// Use tags that exist
await mcp.callTool("get-style-guide", {
  tags: ["minimal"]  // Start with one tag
});
```

### "Cannot delete guideline"

Built-in guidelines cannot be deleted, only custom ones:

```typescript
// This works (custom guideline)
await mcp.callTool("delete-design-guideline", {
  name: "my-custom-guideline"
});

// This fails (built-in)
await mcp.callTool("delete-design-guideline", {
  name: "dashboard"  // ❌ Built-in, cannot delete
});
```

---

## Next Steps

1. **Explore Built-in Resources**
   - Read through all guidelines
   - Review style guides
   - Understand tag system

2. **Create Your First Guideline**
   - Start with a real project
   - Document as you design
   - Export when complete

3. **Build Component Library**
   - Use component templates
   - Create reusable Figma components
   - Map to code components

4. **Share with Team**
   - Export design system
   - Generate documentation
   - Import on team machines

5. **Integrate with Code**
   - Extract design tokens to Tailwind
   - Use exact values from guidelines
   - Keep design and code in sync

---

## Resources

- 📖 [Complete Design System Guide](./DESIGN_SYSTEM_GUIDE.md)
- 🔧 [Recommended Design Tools](./DESIGN_TOOLS_RECOMMENDATIONS.md)
- 📚 [Full Tools Documentation](./TOOLS.md)
- 🎨 [good-fullstack Skill](https://cursor.directory) - Integration details

---

**Ready to build? Start with `list-design-resources()` and explore what's available!**
