# Notion-Like App Design Specification

This document contains the complete design specification for a Notion-like application. Once the Figma plugin is running, use Cursor with the MCP tools to execute this design.

## Design Overview

**Application Name**: NotionFlow
**Canvas Size**: 1440 x 900 px
**Design System**: Modern, clean, productivity-focused
**Color Scheme**: Light theme with subtle grays and accent colors

## Structure

```
NotionFlow App (1440x900)
├── Sidebar (260x900)
│   ├── Workspace Header
│   ├── Navigation Sections
│   │   ├── Favorites
│   │   ├── Private
│   │   └── Shared
│   └── User Profile (bottom)
│
└── Main Content Area (1180x900)
    ├── Top Bar (1180x60)
    │   ├── Breadcrumbs
    │   ├── Share Button
    │   └── Actions
    └── Page Content (1180x840)
        ├── Page Icon & Title
        ├── Properties Section
        └── Content Blocks
            ├── Text Block
            ├── Heading Block
            ├── To-Do Block
            ├── Quote Block
            └── Code Block
```

## Color Palette

```
Background: #FFFFFF
Sidebar BG: #F7F6F3
Border: #E5E5E5
Text Primary: #37352F
Text Secondary: #787774
Accent Blue: #2383E2
Accent Purple: #9B51E0
Hover: #F1F1EF
```

## Components to Create

### 1. Sidebar Navigation
- Width: 260px
- Sections:
  - **Favorites**: Quick links, Recently viewed
  - **Private**: My pages, Templates
  - **Shared**: Team workspace, Projects
- Collapsible sections
- Nested page hierarchy
- User profile at bottom

### 2. Top Navigation Bar
- Height: 60px
- Elements:
  - Breadcrumb navigation
  - "Share" button
  - "•••" more options
  - Search icon

### 3. Page Header
- Large emoji icon (📄)
- Editable page title "Untitled"
- "Add description..." placeholder

### 4. Content Blocks

**Text Block**:
- Font: Inter, 16px, Regular
- Line height: 1.5
- Placeholder: "Type / for commands"

**Heading 1**:
- Font: Inter, 32px, Bold
- Example: "Project Overview"

**Heading 2**:
- Font: Inter, 24px, Semibold
- Example: "Key Objectives"

**To-Do Item**:
- Checkbox (18x18px)
- Text: Inter, 16px
- Strikethrough when completed

**Quote Block**:
- Left border: 3px, #E5E5E5
- Background: #F7F6F3
- Padding: 12px 16px
- Italic text

**Code Block**:
- Background: #F7F6F3
- Font: JetBrains Mono, 14px
- Border radius: 4px
- Syntax highlighting colors

**Callout Block**:
- Icon: 💡
- Background: #FFF7E6
- Border: 1px #FFE4A3
- Padding: 16px

### 5. Interactive Elements

**Button States**:
- Default: #FFFFFF, border #E5E5E5
- Hover: #F1F1EF
- Active: #E5E5E5

**Sidebar Item States**:
- Default: transparent
- Hover: #F1F1EF
- Active/Selected: #E5E5E5

## Layout Grid

- Sidebar: Fixed 260px width
- Content area: 680px max width, centered
- Gutter: 24px on each side
- Block spacing: 4px between blocks
- Section spacing: 24px between sections

## Typography

```
Headings:
- H1: Inter Bold, 32px, 1.2 line-height
- H2: Inter Semibold, 24px, 1.3 line-height
- H3: Inter Semibold, 20px, 1.4 line-height

Body:
- Paragraph: Inter Regular, 16px, 1.5 line-height
- Small: Inter Regular, 14px, 1.5 line-height
- Caption: Inter Regular, 12px, 1.4 line-height

Code:
- Code: JetBrains Mono Regular, 14px, 1.5 line-height
```

## Icons

Use simple icon placeholders or Unicode:
- 📄 Document
- ⭐ Favorites
- 🔒 Private
- 👥 Shared
- ➕ Add
- 🔍 Search
- ⚙️ Settings
- ☰ Menu

## Execution Steps (Once Plugin is Running)

1. Create main container frame (1440x900)
2. Create sidebar using `create-sidebar` tool
3. Create main content frame
4. Add top navigation bar
5. Create page header with icon and title
6. Add content blocks:
   - Heading blocks
   - Text blocks
   - To-do blocks
   - Quote blocks
   - Code blocks
   - Callout blocks
7. Style all elements with proper colors
8. Add hover states to interactive elements
9. Create component variants for blocks
10. Add auto-layout to responsive sections

## Sample Content

**Page Title**: "Product Roadmap Q1 2024"

**Content**:
```
# Vision
Build the most intuitive productivity platform

## Key Objectives
- [ ] Launch mobile app beta
- [ ] Integrate AI assistant
- [x] Improve collaboration features

> "The best way to predict the future is to create it" - Alan Kay

💡 Remember: Focus on user feedback during beta testing

```code
function createTask(title, due) {
  return {
    title,
    dueDate: due,
    status: 'pending'
  };
}
```
```

## Advanced Features to Implement

1. **Drag handles**: 6-dot icon on left of each block
2. **Slash command menu**: Appears when typing "/"
3. **@ mention popup**: For linking pages/people
4. **Property pills**: Tags, dates, status indicators
5. **Table view**: Spreadsheet-like layout option
6. **Calendar view**: Events and deadlines
7. **Board view**: Kanban-style organization

## Responsive Behavior

- Sidebar: Collapsible to icons-only (60px)
- Content: Max width 680px, centered
- Blocks: Full width within content container
- Mobile: Sidebar becomes overlay menu

## Accessibility

- All interactive elements: 44x44px minimum
- Color contrast: WCAG AA compliant
- Keyboard navigation: Tab, Enter, Arrow keys
- Screen reader labels on all icons
- Focus indicators on all focusable elements

---

**Ready to Build?** 

Once your Figma plugin is running, say:
*"Create the NotionFlow app design following the NOTION_APP_DESIGN.md specification"*

And I'll use the MCP tools to build this entire design automatically in Figma!
