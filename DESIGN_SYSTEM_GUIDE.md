# Design System Guide

Comprehensive guide for using the Figma MCP Server's integrated design system tools with the good-fullstack skill.

## Overview

The Figma MCP Server now includes a powerful design system that helps you:
- Access 13+ built-in design guidelines (landing pages, dashboards, SaaS, mobile apps, etc.)
- Create and manage custom design guidelines for your projects
- Use 12+ curated style guides with real-world examples
- Create custom style guides for your brand or clients
- Organize designs with tags across 6 categories (aesthetic, industry, platform, color, layout, vibe)
- Generate comprehensive design documentation
- Export/import design systems for team collaboration

## Table of Contents

1. [Quick Start](#quick-start)
2. [Design Guidelines](#design-guidelines)
3. [Style Guides](#style-guides)
4. [Design Tags](#design-tags)
5. [UI Patterns](#ui-patterns)
6. [Component Templates](#component-templates)
7. [Custom Resources](#custom-resources)
8. [Export & Import](#export--import)
9. [Integration with Figma](#integration-with-figma)

---

## Quick Start

### 1. Get Available Resources

```javascript
// List all design resources
list-design-resources({ type: "all" })

// List only guidelines
list-design-resources({ type: "guidelines" })

// List only style guides
list-design-resources({ type: "style-guides" })
```

### 2. Get Design Inspiration

```javascript
// Get guidelines for your project type
get-design-guidelines({ topic: "saas" })
get-design-guidelines({ topic: "dashboard" })
get-design-guidelines({ topic: "mobile-app" })

// Get style guide inspiration
get-style-guide-tags()  // See all available tags
get-style-guide({ tags: ["minimal", "dark", "saas"] })
```

### 3. Create Your Custom Design System

```javascript
// Create custom guideline
create-design-guideline({
  name: "my-app",
  overview: "Design system for my SaaS application",
  spacing: {
    base: "4px",
    scale: { xs: "4px", sm: "8px", md: "16px", lg: "24px" }
  },
  colors: {
    strategy: "Dark theme with accent colors",
    palette: {
      primary: "#6366f1",
      background: "#0a0a0a"
    }
  }
})

// Create custom style guide
create-style-guide({
  name: "Brand X Design",
  tags: ["modern", "colorful", "saas"],
  description: "Official design system for Brand X",
  colors: {
    primary: "#FF6B6B",
    secondary: "#4ECDC4"
  }
})
```

---

## Design Guidelines

### Built-in Guidelines

The system includes 13 comprehensive design guidelines:

1. **landing-page** - Landing pages and marketing sites
2. **dashboard** - Dashboards and admin panels
3. **design-system** - Creating design systems
4. **mobile-app** - Mobile application design
5. **web-app** - Web application design
6. **ecommerce** - E-commerce sites
7. **saas** - SaaS applications
8. **portfolio** - Portfolio and showcase sites
9. **blog** - Blog and content sites
10. **tailwind** - Tailwind CSS integration
11. **code** - Design-to-code best practices
12. **accessibility** - WCAG accessibility
13. **responsive** - Responsive design

### Getting Guidelines

```javascript
// Get detailed guidelines
get-design-guidelines({ 
  topic: "saas",
  format: "detailed"  // Options: "detailed", "summary", "checklist"
})

// Get summary version
get-design-guidelines({ 
  topic: "dashboard",
  format: "summary"
})

// Get as actionable checklist
get-design-guidelines({ 
  topic: "accessibility",
  format: "checklist"
})
```

### Creating Custom Guidelines

```javascript
create-design-guideline({
  name: "client-project-2024",
  overview: "Design system for Client XYZ healthcare app",
  
  principles: [
    {
      name: "Clarity First",
      description: "Medical information must be crystal clear"
    },
    {
      name: "Trust & Safety",
      description: "Design communicates security and professionalism"
    }
  ],
  
  spacing: {
    base: "8px",
    scale: {
      xs: "8px",
      sm: "16px",
      md: "24px",
      lg: "32px",
      xl: "48px"
    }
  },
  
  typography: {
    scale: {
      h1: "32px",
      h2: "24px",
      body: "16px"
    },
    fonts: ["Inter Variable", "system-ui"]
  },
  
  colors: {
    strategy: "Calm, trustworthy palette with medical blue primary",
    palette: {
      primary: "#0066CC",
      background: "#F8FAFC",
      success: "#22C55E",
      warning: "#F59E0B",
      error: "#EF4444"
    }
  },
  
  bestPractices: [
    "Use high-contrast text for medical information",
    "Include clear labels on all interactive elements",
    "Provide multiple ways to access critical features",
    "Test with users 65+ for accessibility"
  ]
})
```

### Updating Guidelines

```javascript
update-design-guideline({
  name: "client-project-2024",
  updates: {
    colors: {
      strategy: "Updated to include dark mode",
      palette: {
        primary: "#0066CC",
        primaryDark: "#0052A3",
        background: "#F8FAFC",
        backgroundDark: "#0F172A"
      }
    },
    bestPractices: [
      "Use high-contrast text for medical information",
      "Include dark mode toggle in settings",
      "Test in both light and dark modes"
    ]
  }
})
```

---

## Style Guides

### Built-in Style Guides

12 curated style guides covering:
- **Dark Minimal SaaS** - Linear, Raycast style
- **Warm Editorial** - Medium, Substack style
- **Vibrant Gradient SaaS** - Stripe, Framer style
- **Brutalist Monochrome** - Experimental portfolios
- **Soft Pastel Mobile** - Calm, Headspace style
- **High-Contrast Fintech** - Stripe, Plaid style
- **Playful E-commerce** - Gumroad, Glossier style
- **Enterprise Dashboard** - Salesforce, Atlassian style
- **Glassmorphism Portfolio** - Apple-inspired
- **Material Design 3** - Google's latest
- **iOS Native** - Apple HIG
- **Retro-Futuristic Gaming** - Cyberpunk style

### Getting Style Guides

```javascript
// By tags
get-style-guide({ 
  tags: ["minimal", "dark", "saas"],
  includeExamples: true
})

// By specific name
get-style-guide({ 
  name: "Dark Minimal SaaS",
  includeExamples: true
})

// Get all in a category
get-style-guide({ 
  tags: ["saas"]
})
```

### Creating Custom Style Guides

```javascript
create-style-guide({
  name: "Acme Corp Design System",
  tags: ["corporate", "professional", "web", "blue", "trustworthy"],
  description: "Official design system for Acme Corporation",
  
  colors: {
    primary: "#003DA5",
    primaryHover: "#002C7A",
    secondary: "#E8F1FF",
    background: "#FFFFFF",
    surface: "#F5F8FA",
    text: "#1A2332",
    textMuted: "#6B7280",
    border: "#D1D5DB",
    success: "#059669",
    warning: "#D97706",
    error: "#DC2626"
  },
  
  typography: {
    display: "Montserrat, sans-serif",
    body: "Open Sans, sans-serif",
    mono: "Roboto Mono, monospace",
    displaySize: "48px",
    h1Size: "36px",
    h2Size: "28px",
    bodySize: "16px"
  },
  
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px"
  },
  
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    full: "9999px"
  },
  
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 6px rgba(0,0,0,0.1)",
    lg: "0 10px 15px rgba(0,0,0,0.1)"
  },
  
  examples: `
  Used in:
  - Main website (acmecorp.com)
  - Customer portal
  - Internal dashboard
  
  Reference designs:
  - Figma: [link]
  - Storybook: [link]
  `
})
```

---

## Design Tags

### Tag Categories

6 categories to organize your designs:

1. **aesthetic** - Visual style (minimal, maximalist, brutalist, etc.)
2. **industry** - Business sector (saas, fintech, healthcare, etc.)
3. **platform** - Target platform (web, mobile, desktop, etc.)
4. **color** - Color scheme (dark, light, colorful, monochrome, etc.)
5. **layout** - Layout style (grid, asymmetric, sidebar, etc.)
6. **vibe** - Overall feeling (professional, casual, luxury, etc.)

### Getting Tags

```javascript
// Get all tags
get-style-guide-tags()

// Get tags by category
get-style-guide-tags({ category: "aesthetic" })
get-style-guide-tags({ category: "industry" })
```

### Adding Custom Tags

```javascript
// Add to aesthetic category
add-design-tag({
  category: "aesthetic",
  tags: ["cyberpunk", "art-nouveau", "Memphis"]
})

// Add to industry category
add-design-tag({
  category: "industry",
  tags: ["legal-tech", "hr-tech", "prop-tech"]
})

// Add to vibe category
add-design-tag({
  category: "vibe",
  tags: ["rebellious", "sophisticated", "whimsical"]
})
```

---

## UI Patterns

Pre-built UI pattern templates for common components:

### Available Patterns

- **navigation** - Horizontal nav, sidebar nav
- **hero** - Hero sections (split, centered, video background)
- **card** - Card layouts (with image, horizontal, hoverable)
- **form** - Form layouts and patterns
- **modal** - Modal dialogs
- **table** - Data tables
- **sidebar** - Application sidebars
- **footer** - Page footers
- **cta** - Call-to-action sections
- **pricing** - Pricing tables
- **testimonial** - Testimonial sections
- **feature-grid** - Feature showcases
- **stats** - Statistics displays
- **timeline** - Timeline components

### Using Patterns

```javascript
// Get a pattern
get-ui-pattern({ 
  pattern: "navigation",
  variant: "horizontal"
})

// Get card pattern
get-ui-pattern({ 
  pattern: "card",
  variant: "with-image"
})
```

---

## Component Templates

Ready-to-use Figma component templates:

### Available Components

- **button** - Button with variants (primary, secondary, ghost, sizes)
- **input** - Input field with states
- **card** - Card container with variants
- **badge** - Badge/pill components
- **avatar** - User avatar component
- **checkbox** - Checkbox input
- **radio** - Radio button
- **switch** - Toggle switch
- **select** - Dropdown select
- **slider** - Range slider
- **progress** - Progress bar
- **tooltip** - Tooltip component
- **dropdown** - Dropdown menu

### Using Templates

```javascript
// Get button template with variants
get-component-template({ 
  component: "button",
  includeVariants: true
})

// Get input template
get-component-template({ 
  component: "input",
  includeVariants: true
})
```

---

## Custom Resources

### Managing Guidelines

```javascript
// Create
create-design-guideline({ ... })

// Update
update-design-guideline({ 
  name: "my-guideline",
  updates: { ... }
})

// Delete
delete-design-guideline({ name: "my-guideline" })

// List
list-design-resources({ type: "guidelines" })
```

### Managing Style Guides

```javascript
// Create
create-style-guide({ ... })

// Delete
delete-style-guide({ name: "my-style-guide" })

// List
list-design-resources({ type: "style-guides" })
```

---

## Export & Import

### Exporting Your Design System

```javascript
// Export custom resources only (default)
export-design-system()

// Export with built-in resources
export-design-system({ includeBuiltIn: true })
```

This generates a JSON structure:

```json
{
  "guidelines": {
    "my-app": { ... },
    "client-project": { ... }
  },
  "styleGuides": [
    { "name": "Brand X", ... },
    { "name": "Client Y", ... }
  ],
  "tags": {
    "aesthetic": ["custom-tag-1"],
    "industry": ["custom-industry"]
  }
}
```

### Importing a Design System

```javascript
// Merge with existing resources
import-design-system({
  data: {
    guidelines: { ... },
    styleGuides: [ ... ],
    tags: { ... }
  },
  merge: true
})

// Replace existing resources
import-design-system({
  data: { ... },
  merge: false
})
```

### Generating Documentation

```javascript
// Generate markdown documentation
generate-design-docs({
  includeExamples: true,
  format: "markdown"
})
```

---

## Integration with Figma

### Design-First Workflow

1. **Get Design Guidelines**
   ```javascript
   get-design-guidelines({ topic: "saas", format: "detailed" })
   ```

2. **Get Style Inspiration**
   ```javascript
   get-style-guide({ tags: ["minimal", "dark", "saas"] })
   ```

3. **Create in Figma** using the MCP tools with extracted values

4. **Save as Custom Guideline** for your project
   ```javascript
   create-design-guideline({
     name: "my-project",
     // ... design decisions from Figma
   })
   ```

### Example: Complete Workflow

```javascript
// 1. Get guidelines for a dashboard
get-design-guidelines({ topic: "dashboard" })

// 2. Get style inspiration
get-style-guide({ tags: ["dark", "minimal", "saas"] })

// 3. Create custom guideline for your project
create-design-guideline({
  name: "acme-dashboard",
  overview: "Dashboard design system for Acme Analytics",
  spacing: { base: "4px", scale: { sm: "8px", md: "16px", lg: "24px" } },
  colors: {
    strategy: "Dark theme with electric accent",
    palette: {
      background: "#0a0a0a",
      surface: "#1a1a1a",
      primary: "#6366f1",
      accent: "#00fff0"
    }
  }
})

// 4. Use Figma MCP tools to create the design
// ... (Figma creation steps)

// 5. Export your complete design system
export-design-system()
```

---

## Best Practices

1. **Start with Built-in Resources**
   - Explore built-in guidelines and style guides first
   - They contain battle-tested patterns and best practices

2. **Create Project-Specific Guidelines**
   - Each project should have its own guideline
   - Document decisions as you make them

3. **Use Tags Extensively**
   - Tag style guides with multiple relevant tags
   - Makes them easier to discover later

4. **Keep Style Guides Updated**
   - Update style guides as your brand evolves
   - Version control your exports

5. **Export Regularly**
   - Back up your custom resources
   - Share with team members via import

6. **Generate Documentation**
   - Use `generate-design-docs` before major milestones
   - Keep stakeholders informed with comprehensive docs

---

## Tips & Tricks

### Finding Inspiration

```javascript
// Explore different aesthetics
get-style-guide({ tags: ["brutalist"] })
get-style-guide({ tags: ["glassmorphism"] })
get-style-guide({ tags: ["retro"] })

// Explore by industry
get-style-guide({ tags: ["fintech"] })
get-style-guide({ tags: ["healthcare"] })
get-style-guide({ tags: ["ecommerce"] })
```

### Quick Design Decisions

```javascript
// Need spacing quickly?
get-design-guidelines({ topic: "design-system", format: "summary" })

// Need accessibility checklist?
get-design-guidelines({ topic: "accessibility", format: "checklist" })

// Need Tailwind-specific guidance?
get-design-guidelines({ topic: "tailwind" })
```

### Team Collaboration

```javascript
// Designer exports their work
export-design-system()  // Copy JSON

// Developer imports and uses
import-design-system({ data: /* pasted JSON */, merge: true })
```

---

## Storage

Custom resources are automatically saved to:
```
.design-system-storage/
├── custom-guidelines.json
├── custom-style-guides.json
└── custom-tags.json
```

These files persist across server restarts and can be:
- Committed to version control
- Backed up regularly
- Shared with team members

---

## Summary

The Figma MCP Design System provides:

✅ **13+ built-in design guidelines** for common project types  
✅ **12+ curated style guides** with real-world examples  
✅ **50+ design tags** across 6 categories  
✅ **Create unlimited custom guidelines and style guides**  
✅ **Export/import** for team collaboration  
✅ **Auto-generated documentation**  
✅ **Persistent storage** for all custom resources  
✅ **Seamless integration** with Figma MCP tools  
✅ **Full integration** with good-fullstack skill workflow

Start building better, faster, and more consistent designs today!
