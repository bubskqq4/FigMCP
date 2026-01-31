# good-fullstack Skill Integration

Complete guide for using Figma MCP Design System with the good-fullstack skill for professional design-to-code workflow.

## Overview

The Figma MCP Server now provides the design tools that complement the good-fullstack skill's design-first mandate. Together, they create a seamless workflow from concept to production code.

## Design-First Workflow

### good-fullstack Mandate

From the skill:
> **DESIGN-FIRST MANDATE**: When building UI features, ALWAYS create a visual design in Pencil MCP BEFORE writing code.

### Figma MCP Enhancement

The Figma MCP Design System provides:
- **Design Guidelines** → Replaces/complements Pencil MCP's `get_guidelines()`
- **Style Guides** → Replaces/complements Pencil MCP's `get_style_guide()`
- **Design Tags** → Replaces/complements Pencil MCP's `get_style_guide_tags()`
- **UI Patterns** → Pre-built patterns for common components
- **Component Templates** → Ready-to-use component structures

## Workflow Comparison

### Original Workflow (Pencil MCP)

```javascript
// 1. Get guidelines
get_guidelines({ topic: "landing-page" })

// 2. Get style inspiration
get_style_guide_tags()
get_style_guide({ tags: ["modern", "minimal"] })

// 3. Design in .pen file
batch_design({ operations: `...` })

// 4. Take screenshot
get_screenshot({ nodeId: "..." })

// 5. Implement in code
// ... React/Next.js code matching design
```

### Enhanced Workflow (Figma MCP)

```typescript
// 1. Get comprehensive guidelines
await mcp.callTool("get-design-guidelines", { 
  topic: "landing-page",
  format: "detailed"
});

// 2. Get curated style inspiration (20+ guides vs Pencil's limited set)
await mcp.callTool("get-style-guide-tags", {});
await mcp.callTool("get-style-guide", { 
  tags: ["modern", "minimal", "saas"] 
});

// 3. Get UI patterns (NEW!)
await mcp.callTool("get-ui-pattern", { 
  pattern: "hero" 
});

// 4. Design in Figma (using 200+ MCP tools)
await mcp.callTool("create-frame", { ... });
await mcp.callTool("set-layout", { ... });

// 5. Take screenshot
await mcp.callTool("screenshot-node", { nodeId: "..." });

// 6. Create custom guideline for project (NEW!)
await mcp.callTool("create-design-guideline", {
  name: "my-project",
  // ... document your decisions
});

// 7. Implement in code (exact values from Figma)
// ... React/Next.js code

// 8. Keep in sync
// Update Figma when code changes
// Update code when design changes
```

## Key Advantages Over Pencil MCP

### More Comprehensive Guidelines

| Feature | Pencil MCP | Figma MCP |
|---------|------------|-----------|
| **Guidelines** | Basic topics | 13 comprehensive guidelines |
| **Style Guides** | Limited examples | 20+ real-world style guides |
| **Tags** | ~20 tags | 50+ tags across 6 categories |
| **Customization** | ❌ No custom guidelines | ✅ Create unlimited custom resources |
| **Export/Import** | ❌ Not available | ✅ Full export/import system |
| **Documentation** | Manual | ✅ Auto-generated docs |
| **Persistence** | In-memory only | ✅ Saved to disk |

### Real Figma Integration

- Actually creates designs in Figma (not .pen files)
- Uses real Figma components and instances
- Works with Figma's auto-layout
- Can export to code via Figma plugins
- Team collaboration in Figma

### Production-Ready Patterns

- 14 UI patterns with Figma properties
- 13 component templates with variants
- Real-world examples (Linear, Stripe, Notion)
- Platform-specific guidelines (iOS, Material Design)

---

## Migration Guide: Pencil → Figma MCP

### Step 1: Replace get_guidelines calls

**Before (Pencil):**
```javascript
get_guidelines({ topic: "landing-page" })
```

**After (Figma MCP):**
```typescript
await mcp.callTool("get-design-guidelines", {
  topic: "landing-page",
  format: "detailed"
});
```

### Step 2: Replace get_style_guide calls

**Before (Pencil):**
```javascript
get_style_guide_tags()
get_style_guide({ tags: ["modern", "minimal"] })
```

**After (Figma MCP):**
```typescript
await mcp.callTool("get-style-guide-tags", {});
await mcp.callTool("get-style-guide", {
  tags: ["modern", "minimal", "saas"],
  includeExamples: true
});
```

### Step 3: Design in Figma instead of .pen

**Before (Pencil .pen):**
```javascript
batch_design({
  operations: `
    frame=I(document, {type: "frame", width: 1440, height: 900})
    sidebar=I(frame, {type: "frame", width: 260})
  `
})
```

**After (Figma MCP):**
```typescript
// Create frame
const frame = await mcp.callTool("create-frame", {
  name: "Dashboard",
  width: 1440,
  height: 900,
  fill: "#0a0a0a"
});

// Create sidebar
const sidebar = await mcp.callTool("create-frame", {
  parentId: frame.id,
  name: "Sidebar",
  width: 260,
  fill: "#1a1a1a"
});
```

### Step 4: Document with Custom Guidelines

**New Capability (Figma MCP only):**
```typescript
// Create project-specific guideline
await mcp.callTool("create-design-guideline", {
  name: "my-project",
  overview: "Custom design decisions for this project",
  colors: { /* extracted from Figma */ },
  spacing: { /* defined in design */ }
});

// Export for team
await mcp.callTool("export-design-system", {});
```

---

## Design Token Extraction Workflow

### From Figma MCP to Tailwind CSS

```typescript
// 1. Get your custom guideline
const guideline = await mcp.callTool("get-design-guidelines", {
  topic: "my-app"
});

// 2. Extract values for Tailwind config
```

**Generated Tailwind Config:**
```javascript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // From guideline.colors.palette
        background: "#0a0a0a",
        surface: "#1a1a1a",
        primary: "#6366f1",
        // ...
      },
      spacing: {
        // From guideline.spacing.scale
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        // ...
      },
      fontSize: {
        // From guideline.typography.scale
        stat: ["40px", { lineHeight: "1.1" }],
        h1: ["28px", { lineHeight: "1.2" }],
        body: ["14px", { lineHeight: "1.5" }],
        // ...
      }
    }
  }
};
```

---

## Component Library Workflow

### 1. Get Component Template from Figma MCP

```typescript
const buttonTemplate = await mcp.callTool("get-component-template", {
  component: "button",
  includeVariants: true
});
```

### 2. Create in Figma

```typescript
// Create button component in Figma
const button = await mcp.callTool("create-component", {
  name: "Button/Primary",
  // Use properties from template
  width: "hug_contents",
  height: 44,
  padding: [0, 24],
  cornerRadius: 8,
  fill: "#6366f1"
});

// Add variants
await mcp.callTool("add-component-property", {
  componentId: button.id,
  propertyName: "variant",
  type: "VARIANT",
  values: ["primary", "secondary", "ghost"]
});
```

### 3. Implement in React

```tsx
// From good-fullstack component template
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant = "primary", size = "md", ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2",
          "rounded-lg px-6 py-2 font-medium",  // Exact from Figma
          "transition-all duration-150",
          variant === "primary" && "bg-primary text-white",
          variant === "secondary" && "bg-secondary",
          variant === "ghost" && "hover:bg-accent",
          size === "sm" && "h-9 px-4 text-sm",
          size === "md" && "h-11 px-6",  // 44px from Figma template
          size === "lg" && "h-13 px-8 text-lg"
        )}
        {...props}
      />
    );
  }
);
```

---

## Best Practices for Integration

### 1. Create Guideline Early

```typescript
// At project start, create guideline
await mcp.callTool("create-design-guideline", {
  name: "project-2024",
  overview: "Design system for [Project Name]",
  // ... define from start
});
```

### 2. Use Exact Values

**From Figma MCP guideline:**
```json
{
  "spacing": {
    "base": "4px",
    "scale": {
      "md": "16px"
    }
  }
}
```

**To Code:**
```tsx
// ✅ EXACT: 16px from guideline
<div className="p-4">  {/* 16px */}

// ❌ APPROXIMATE: Don't guess
<div className="p-3">  {/* 12px - wrong! */}
```

### 3. Keep Design File as Source of Truth

```typescript
// When design changes in Figma
// 1. Update custom guideline
await mcp.callTool("update-design-guideline", {
  name: "project",
  updates: {
    colors: {
      palette: { /* new colors */ }
    }
  }
});

// 2. Export updated system
await mcp.callTool("export-design-system", {});

// 3. Update code to match
```

### 4. Generate Docs for Handoffs

```typescript
// Before developer handoff
await mcp.callTool("generate-design-docs", {
  includeExamples: true,
  format: "markdown"
});

// Gives developers everything they need
```

---

## Advanced Patterns

### Multi-Theme Management

```typescript
// Create light theme guideline
await mcp.callTool("create-design-guideline", {
  name: "app-light-theme",
  colors: {
    palette: {
      background: "#ffffff",
      text: "#0f0f0f"
    }
  }
});

// Create dark theme guideline
await mcp.callTool("create-design-guideline", {
  name: "app-dark-theme",
  colors: {
    palette: {
      background: "#0f0f0f",
      text: "#ffffff"
    }
  }
});

// Generate combined docs
await mcp.callTool("generate-design-docs", {});
```

### Design System Versioning

```typescript
// Version 1.0
await mcp.callTool("create-design-guideline", {
  name: "app-v1",
  // ... initial design
});

const v1Export = await mcp.callTool("export-design-system", {});
// Save v1Export.json to git

// Later: Version 2.0
await mcp.callTool("create-design-guideline", {
  name: "app-v2",
  // ... updated design
});

const v2Export = await mcp.callTool("export-design-system", {});
// Save v2Export.json to git

// Can revert if needed
await mcp.callTool("import-design-system", {
  data: v1Export,  // Rollback to v1
  merge: false
});
```

### Brand Kit Management

```typescript
// Client A
await mcp.callTool("create-style-guide", {
  name: "Client A Brand Kit",
  tags: ["client-a", "professional"],
  colors: { /* brand colors */ }
});

// Client B
await mcp.callTool("create-style-guide", {
  name: "Client B Brand Kit",
  tags: ["client-b", "playful"],
  colors: { /* brand colors */ }
});

// Switch between clients
await mcp.callTool("get-style-guide", {
  tags: ["client-a"]
});
```

---

## Complete Example: SaaS Dashboard

### Full Workflow from Concept to Code

```typescript
// ========================================
// PHASE 1: RESEARCH & PLANNING
// ========================================

// 1. Get dashboard guidelines
const guidelines = await mcp.callTool("get-design-guidelines", {
  topic: "dashboard",
  format: "detailed"
});
// Learn: 4px spacing, neutral colors, info density

// 2. Get style inspiration
await mcp.callTool("get-style-guide", {
  tags: ["minimal", "dark", "saas", "professional"]
});
// Found: "Dark Minimal SaaS" - Linear/Raycast style

// ========================================
// PHASE 2: DEFINE CUSTOM SYSTEM
// ========================================

// 3. Create project guideline
await mcp.callTool("create-design-guideline", {
  name: "acme-analytics",
  overview: "Analytics dashboard for Acme Corp",
  
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
  
  typography: {
    scale: {
      stat: "40px",   // Big numbers
      h1: "28px",     // Page titles
      h2: "20px",     // Section titles
      body: "14px",   // Default text
      small: "12px"   // Metadata
    },
    fonts: ["Inter Variable", "JetBrains Mono"]
  },
  
  colors: {
    strategy: "Dark neutral with electric blue accent for data viz",
    palette: {
      background: "#0a0a0a",
      surface: "#141414",
      surfaceHover: "#1a1a1a",
      border: "#262626",
      foreground: "#ffffff",
      muted: "#71717a",
      primary: "#3b82f6",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444"
    }
  },
  
  bestPractices: [
    "Sidebar: 260px wide, always visible",
    "Cards: 16px padding, 8px corner radius, 1px border",
    "Stats: 40px number, 12px label, success/error colors",
    "Charts: muted by default, bright on hover",
    "Empty states: icon + message + CTA",
    "Loading: skeleton screens, not spinners"
  ]
});

// ========================================
// PHASE 3: BUILD IN FIGMA
// ========================================

// 4. Create main dashboard frame (1440px desktop)
const dashboard = await mcp.callTool("create-frame", {
  name: "Dashboard - Desktop",
  width: 1440,
  height: 900,
  fill: "#0a0a0a"  // From palette
});

// 5. Create sidebar (260px from best practices)
const sidebar = await mcp.callTool("create-frame", {
  parentId: dashboard.id,
  name: "Sidebar",
  x: 0,
  y: 0,
  width: 260,
  height: 900,
  fill: "#141414"  // From palette.surface
});

// Set auto-layout
await mcp.callTool("set-layout", {
  id: sidebar.id,
  layoutMode: "VERTICAL",
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 16,
  paddingBottom: 16,
  itemSpacing: 8  // From spacing.sm
});

// 6. Add logo
const logo = await mcp.callTool("create-text", {
  parentId: sidebar.id,
  content: "Acme Analytics",
  fontSize: 20,
  fontWeight: 700,
  fill: "#ffffff"
});

// 7. Create nav items
const navHome = await mcp.callTool("create-text", {
  parentId: sidebar.id,
  content: "Dashboard",
  fontSize: 14,  // From typography.body
  fill: "#ffffff"
});

const navAnalytics = await mcp.callTool("create-text", {
  parentId: sidebar.id,
  content: "Analytics",
  fontSize: 14,
  fill: "#71717a"  // From palette.muted
});

// 8. Create main content area
const mainContent = await mcp.callTool("create-frame", {
  parentId: dashboard.id,
  name: "Main Content",
  x: 260,
  y: 0,
  width: 1180,
  height: 900,
  fill: "#0a0a0a"
});

await mcp.callTool("set-layout", {
  id: mainContent.id,
  layoutMode: "VERTICAL",
  paddingLeft: 32,
  paddingRight: 32,
  paddingTop: 32,
  paddingBottom: 32,
  itemSpacing: 24  // From spacing.lg
});

// 9. Add page title
const pageTitle = await mcp.callTool("create-text", {
  parentId: mainContent.id,
  content: "Dashboard",
  fontSize: 28,  // From typography.h1
  fontWeight: 700,
  fill: "#ffffff"
});

// 10. Create stat cards container
const statsContainer = await mcp.callTool("create-frame", {
  parentId: mainContent.id,
  name: "Stats",
  width: 1116,  // mainContent width - padding
  height: "hug_contents",
  fill: "transparent"
});

await mcp.callTool("set-layout", {
  id: statsContainer.id,
  layoutMode: "HORIZONTAL",
  itemSpacing: 24  // From spacing.lg
});

// 11. Create stat card template
const statCard = await mcp.callTool("create-frame", {
  parentId: statsContainer.id,
  name: "Stat Card",
  width: 356,  // (1116 - 48) / 3
  height: 120,
  fill: "#141414",  // From palette.surface
  cornerRadius: 8,
  stroke: "#262626",  // From palette.border
  strokeWidth: 1
});

await mcp.callTool("set-layout", {
  id: statCard.id,
  layoutMode: "VERTICAL",
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 20,
  paddingBottom: 20,
  itemSpacing: 8
});

// Add stat value
const statValue = await mcp.callTool("create-text", {
  parentId: statCard.id,
  content: "1,234",
  fontSize: 40,  // From typography.stat
  fontWeight: 700,
  fill: "#ffffff"
});

// Add stat label
const statLabel = await mcp.callTool("create-text", {
  parentId: statCard.id,
  content: "Active Users",
  fontSize: 12,  // From typography.small
  fill: "#71717a"  // From palette.muted
});

// ========================================
// PHASE 4: VALIDATE DESIGN
// ========================================

// 12. Take screenshot
const screenshot = await mcp.callTool("screenshot-node", {
  nodeId: dashboard.id,
  format: "PNG"
});

// 13. Review and iterate
// Make adjustments based on visual review

// ========================================
// PHASE 5: IMPLEMENT IN CODE
// ========================================

// 14. Create React components matching EXACT Figma values
```

**React Implementation:**
```tsx
// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="flex h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Sidebar - 260px exact from Figma */}
      <aside 
        className="flex flex-col gap-2 p-4"
        style={{ width: 260, backgroundColor: "#141414" }}
      >
        <h1 className="text-xl font-bold text-white">Acme Analytics</h1>
        <nav className="flex flex-col gap-1">
          <a className="text-sm text-white">Dashboard</a>
          <a className="text-sm" style={{ color: "#71717a" }}>Analytics</a>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6 p-8">
        <h2 className="text-[28px] font-bold text-white">Dashboard</h2>
        
        {/* Stats - 24px gap exact from Figma */}
        <div className="grid grid-cols-3 gap-6">
          <StatCard value="1,234" label="Active Users" />
          <StatCard value="$12.5K" label="Revenue" />
          <StatCard value="98.2%" label="Uptime" />
        </div>
      </main>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div 
      className="flex flex-col gap-2 p-5 rounded-lg border"
      style={{ 
        height: 120,  // Exact from Figma
        backgroundColor: "#141414",
        borderColor: "#262626",
        borderRadius: "8px"  // Exact from Figma
      }}
    >
      <div className="text-[40px] font-bold text-white">{value}</div>
      <div className="text-xs" style={{ color: "#71717a" }}>{label}</div>
    </div>
  );
}
```

// ========================================
// PHASE 6: DOCUMENT & EXPORT
// ========================================

// 15. Generate documentation
await mcp.callTool("generate-design-docs", {
  includeExamples: true
});

// 16. Export design system
await mcp.callTool("export-design-system", {});
// Share JSON with team

// 17. Create FILETREE.md (from good-fullstack)
// Documents all React components created
```

---

## Syncing Design and Code

### When Design Changes

1. **Update Figma** using MCP tools
2. **Update guideline** with new values
3. **Update code** to match
4. **Export system** for version control

```typescript
// Design changed: primary color
await mcp.callTool("set-fill-color", {
  id: buttonId,
  color: "#3b82f6"  // New color
});

// Update guideline
await mcp.callTool("update-design-guideline", {
  name: "acme-analytics",
  updates: {
    colors: {
      palette: {
        primary: "#3b82f6"  // Updated
      }
    }
  }
});

// Update code (tailwind.config.ts)
colors: {
  primary: "#3b82f6"  // Updated to match
}
```

### When Code Changes

If you make UI changes in code:

1. Update Figma to match
2. Update guideline documentation
3. Export updated system

---

## Summary

### What You Get

✅ **13 Built-in Design Guidelines**
- Landing pages, dashboards, mobile apps, SaaS, e-commerce, portfolios, blogs
- Accessibility, responsive design, Tailwind CSS integration
- Code best practices, design-to-code workflows

✅ **20 Curated Style Guides**
- Real-world examples: Linear, Stripe, Material Design, iOS
- Multiple aesthetics: minimal, brutalist, glassmorphism, etc.
- Industry-specific: fintech, healthcare, gaming, etc.

✅ **50+ Design Tags**
- 6 categories: aesthetic, industry, platform, color, layout, vibe
- Easy filtering and discovery
- Add custom tags for your needs

✅ **14 UI Patterns**
- Navigation, hero, cards, forms, modals, tables, etc.
- With Figma properties ready to use
- Multiple variants per pattern

✅ **13 Component Templates**
- Buttons, inputs, badges, avatars, checkboxes, etc.
- Complete with variants and states
- Ready for Figma component creation

✅ **Full CRUD Operations**
- Create custom guidelines and style guides
- Update existing resources
- Delete when no longer needed
- List and search all resources

✅ **Team Collaboration**
- Export/import design systems as JSON
- Version control support
- Auto-generated documentation

✅ **Persistent Storage**
- All custom resources saved automatically
- Survives server restarts
- Located in `.design-system-storage/`

### How It Enhances good-fullstack

| good-fullstack Principle | Figma MCP Enhancement |
|-------------------------|----------------------|
| **Distinctive Design** | 20+ style guides for inspiration |
| **Design-First Workflow** | Real Figma integration, not .pen files |
| **Avoid AI Slop** | Curated examples from real products |
| **Exact Implementation** | Extract exact values from Figma |
| **Documentation** | Auto-generated design docs |
| **Team Workflow** | Export/import for collaboration |

---

## Getting Help

- 📖 [Design System Guide](./DESIGN_SYSTEM_GUIDE.md) - Complete reference
- 🔧 [Tool Recommendations](./DESIGN_TOOLS_RECOMMENDATIONS.md) - Suggested tools
- 🚀 [Quick Start](./DESIGN_SYSTEM_QUICKSTART.md) - Get started in 5 minutes
- 📚 [All Tools](./TOOLS.md) - Complete tool documentation

---

**Start building better designs with `list-design-resources()` today!**
