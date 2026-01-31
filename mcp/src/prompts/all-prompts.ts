import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";

export function registerAllPrompts(server: McpServer) {
  // ========== Generation Prompts (8) ==========
  
  server.prompt("design-landing-page", "Generate a landing page design", {
    industry: z.string().describe("Industry or niche"),
    features: z.string().optional().describe("Key features to highlight"),
    style: z.string().optional().describe("Design style preference"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Create a landing page design for a ${args.industry} business. ${args.features ? `Key features: ${args.features}.` : ""} ${args.style ? `Style: ${args.style}.` : "Modern, clean style."}

Please create:
1. A hero section with headline, subheadline, and CTA
2. A features section (3-4 key features)
3. A social proof section
4. A final CTA section

Use the Figma MCP tools to create frames, text, and shapes. Start with a 1440x900 desktop frame.` }
    }]
  }));

  server.prompt("design-dashboard", "Generate a dashboard design", {
    type: z.string().describe("Dashboard type (analytics, admin, sales, etc.)"),
    metrics: z.string().optional().describe("Key metrics to display"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Create a ${args.type} dashboard design. ${args.metrics ? `Key metrics: ${args.metrics}.` : ""}

Include:
1. A sidebar navigation
2. A header with user info
3. Stat cards for key metrics
4. A main chart area
5. A recent activity section

Use auto-layout for structure. Create in a 1440x900 frame.` }
    }]
  }));

  server.prompt("design-mobile-screen", "Generate a mobile app screen", {
    screenType: z.string().describe("Screen type (home, profile, feed, etc.)"),
    platform: z.string().optional().describe("iOS or Android"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Create a mobile ${args.screenType} screen. ${args.platform ? `Platform: ${args.platform}.` : "Cross-platform design."}

Use a 375x812 frame (iPhone size). Include:
1. Status bar area
2. Navigation header
3. Main content
4. Bottom navigation if applicable

Follow mobile design best practices: large touch targets (44px min), clear hierarchy, thumb-friendly zones.` }
    }]
  }));

  server.prompt("design-component", "Generate a reusable component", {
    componentType: z.string().describe("Component type (button, card, input, etc.)"),
    variants: z.string().optional().describe("Variants to create"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Create a ${args.componentType} component. ${args.variants ? `Include variants: ${args.variants}.` : "Include primary, secondary, and disabled variants."}

Requirements:
1. Create as a Figma component
2. Include all interactive states (default, hover, active, disabled)
3. Use auto-layout for flexibility
4. Set up proper constraints
5. Add component properties for customization` }
    }]
  }));

  server.prompt("design-form", "Generate a form design", {
    formType: z.string().describe("Form type (login, signup, contact, checkout)"),
    fields: z.string().optional().describe("Fields to include"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Create a ${args.formType} form design. ${args.fields ? `Fields: ${args.fields}.` : ""}

Include:
1. Form title
2. Input fields with labels
3. Validation states (error messages)
4. Submit button
5. Helper links if applicable

Use single-column layout with proper spacing. Make it accessible.` }
    }]
  }));

  server.prompt("design-card", "Generate a card component", {
    cardType: z.string().describe("Card type (product, user, article, etc.)"),
    size: z.string().optional().describe("Card size (small, medium, large)"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Create a ${args.cardType} card component. ${args.size ? `Size: ${args.size}.` : "Medium size."}

Include:
1. Optional image/media area
2. Title and description
3. Metadata (date, author, tags)
4. Action buttons

Use auto-layout and make it a reusable component.` }
    }]
  }));

  server.prompt("design-navigation", "Generate a navigation component", {
    navType: z.string().describe("Navigation type (navbar, sidebar, tabs)"),
    items: z.string().optional().describe("Navigation items"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Create a ${args.navType} navigation. ${args.items ? `Items: ${args.items}.` : "Include typical navigation items."}

Include:
1. Logo/brand area
2. Navigation links with hover states
3. Active state indicator
4. User menu or actions

Make it responsive-ready with proper constraints.` }
    }]
  }));

  server.prompt("design-empty-state", "Generate an empty state design", {
    context: z.string().describe("Context (no results, no data, error, etc.)"),
    action: z.string().optional().describe("Primary action to offer"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Create an empty state for: ${args.context}. ${args.action ? `Primary action: ${args.action}.` : ""}

Include:
1. Illustration or icon (use a rectangle placeholder)
2. Title explaining the state
3. Helpful description
4. Call-to-action button

Center the content and keep it friendly and helpful.` }
    }]
  }));

  // ========== Analysis Prompts (5) ==========

  server.prompt("analyze-design", "Analyze a design for best practices", {
    nodeId: z.string().describe("ID of the node to analyze"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Analyze the design at node ${args.nodeId} for best practices.

Check for:
1. Visual hierarchy and layout
2. Spacing consistency
3. Typography usage
4. Color usage and contrast
5. Component reusability
6. Responsiveness considerations

Use get-node-info and get-node-tree to examine the design, then provide specific feedback.` }
    }]
  }));

  server.prompt("analyze-accessibility", "Analyze design for accessibility", {
    nodeId: z.string().describe("ID of the node to analyze"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Analyze the design at node ${args.nodeId} for accessibility issues.

Check for:
1. Color contrast (WCAG AA: 4.5:1 for text)
2. Touch target sizes (minimum 44x44px)
3. Text readability (minimum 12px)
4. Semantic structure
5. Missing labels or descriptions

Use validate-design-accessibility tool, then provide recommendations.` }
    }]
  }));

  server.prompt("analyze-consistency", "Check design for consistency issues", {
    nodeId: z.string().describe("ID of the node to analyze"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Check the design at node ${args.nodeId} for consistency issues.

Look for:
1. Inconsistent spacing values
2. Different font sizes for similar elements
3. Color variations that should match
4. Inconsistent corner radii
5. Similar components that should be unified

Examine the node tree and properties, then suggest improvements.` }
    }]
  }));

  server.prompt("analyze-spacing", "Analyze spacing in a design", {
    nodeId: z.string().describe("ID of the node to analyze"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Analyze the spacing in the design at node ${args.nodeId}.

Check:
1. Consistency of margins and padding
2. Whether spacing follows a scale (4px, 8px, 16px, etc.)
3. Visual rhythm and balance
4. White space utilization

Use get-node-tree to examine the structure and spacing values.` }
    }]
  }));

  server.prompt("analyze-typography", "Analyze typography in a design", {
    nodeId: z.string().describe("ID of the node to analyze"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Analyze the typography in the design at node ${args.nodeId}.

Check:
1. Font families used
2. Font size scale and hierarchy
3. Line height appropriateness
4. Letter spacing
5. Text alignment patterns

Search for all text nodes and analyze their properties.` }
    }]
  }));

  // ========== Improvement Prompts (5) ==========

  server.prompt("improve-layout", "Suggest layout improvements", {
    nodeId: z.string().describe("ID of the node to improve"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Suggest layout improvements for the design at node ${args.nodeId}.

Consider:
1. Adding auto-layout for flexibility
2. Improving visual hierarchy
3. Better use of space
4. Responsive-ready structure
5. Alignment and distribution

Analyze the current layout, then make specific improvement suggestions with tool calls.` }
    }]
  }));

  server.prompt("improve-hierarchy", "Improve visual hierarchy", {
    nodeId: z.string().describe("ID of the node to improve"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Improve the visual hierarchy of the design at node ${args.nodeId}.

Techniques to apply:
1. Size: Make important elements larger
2. Color: Use emphasis colors for key elements
3. Contrast: Increase contrast for primary content
4. Spacing: Add more space around important elements
5. Typography: Use bolder weights for headlines

Make specific changes to improve hierarchy.` }
    }]
  }));

  server.prompt("improve-contrast", "Improve color contrast", {
    nodeId: z.string().describe("ID of the node to improve"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Improve the color contrast in the design at node ${args.nodeId}.

Goals:
1. Meet WCAG AA standards (4.5:1 for text)
2. Ensure readability
3. Maintain visual appeal

Analyze current colors and suggest/apply improvements.` }
    }]
  }));

  server.prompt("improve-responsiveness", "Make design more responsive-ready", {
    nodeId: z.string().describe("ID of the node to improve"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Make the design at node ${args.nodeId} more responsive-ready.

Apply:
1. Auto-layout where possible
2. Proper constraints
3. Flexible sizing
4. Max-width constraints
5. Responsive-friendly spacing

Make changes to improve responsiveness.` }
    }]
  }));

  server.prompt("improve-usability", "Improve usability of a design", {
    nodeId: z.string().describe("ID of the node to improve"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Improve the usability of the design at node ${args.nodeId}.

Consider:
1. Touch target sizes
2. Clear affordances for interactive elements
3. Visual feedback for states
4. Clear labeling
5. Logical tab order

Make specific usability improvements.` }
    }]
  }));

  // ========== Code Generation Prompts (4) ==========

  server.prompt("generate-react-code", "Generate React code from design", {
    nodeId: z.string().describe("ID of the node to convert"),
    styling: z.string().optional().describe("Styling approach (tailwind, css-modules, styled-components)"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Generate React code from the design at node ${args.nodeId}. ${args.styling ? `Use ${args.styling} for styling.` : "Use Tailwind CSS."}

Steps:
1. Analyze the design structure
2. Extract colors, spacing, typography
3. Generate component code
4. Add proper TypeScript types

Output clean, well-structured React code.` }
    }]
  }));

  server.prompt("generate-tailwind", "Generate Tailwind classes from design", {
    nodeId: z.string().describe("ID of the node to convert"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Extract Tailwind CSS classes from the design at node ${args.nodeId}.

Include:
1. Layout classes (flex, grid, spacing)
2. Typography classes
3. Color classes
4. Border and shadow classes
5. Responsive modifiers if applicable

Map Figma properties to Tailwind classes.` }
    }]
  }));

  server.prompt("generate-css", "Generate CSS from design", {
    nodeId: z.string().describe("ID of the node to convert"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Generate CSS from the design at node ${args.nodeId}.

Include:
1. Layout properties
2. Typography styles
3. Colors and backgrounds
4. Borders and shadows
5. CSS custom properties for tokens

Output clean, organized CSS.` }
    }]
  }));

  server.prompt("generate-design-tokens", "Extract design tokens from design", {
    nodeId: z.string().describe("ID of the node to extract from"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Extract design tokens from the design at node ${args.nodeId}.

Extract:
1. Color palette
2. Typography scale
3. Spacing values
4. Border radii
5. Shadow definitions

Output in a structured JSON format suitable for design systems.` }
    }]
  }));

  // ========== Documentation Prompts (3) ==========

  server.prompt("document-component", "Document a component", {
    nodeId: z.string().describe("ID of the component to document"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Create documentation for the component at node ${args.nodeId}.

Include:
1. Component name and description
2. Props/variants available
3. Usage examples
4. Accessibility notes
5. Design tokens used

Format as markdown documentation.` }
    }]
  }));

  server.prompt("document-design-system", "Document a design system", {}, async () => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Create documentation for the design system in this Figma file.

Include:
1. Overview of the design system
2. Color palette documentation
3. Typography scale
4. Spacing system
5. Component library overview

Use the document resources to gather information.` }
    }]
  }));

  server.prompt("create-handoff-notes", "Create developer handoff notes", {
    nodeId: z.string().describe("ID of the design to document"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Create developer handoff notes for the design at node ${args.nodeId}.

Include:
1. Design specifications (sizes, spacing, colors)
2. Interactive states and behaviors
3. Responsive breakpoints
4. Animation notes
5. Edge cases and error states

Format for easy developer consumption.` }
    }]
  }));

  // ============================================
  // ADDITIONAL GENERATION PROMPTS (7 more = 15 total)
  // ============================================

  server.prompt("design-saas-app", "Generate a SaaS application interface", {
    appType: z.string().describe("Type of SaaS app (CRM, project management, analytics, etc.)"),
    targetUser: z.string().optional().describe("Target user type"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Create a ${args.appType} SaaS application interface. ${args.targetUser ? `Target user: ${args.targetUser}.` : ""}

Include:
1. Sidebar navigation with collapsible sections
2. Header with search, notifications, and user menu
3. Main content area with dashboard widgets
4. Quick actions and keyboard shortcuts hint
5. Settings panel concept

Use a modern, clean aesthetic. Create at 1440x900.` }
    }]
  }));

  server.prompt("design-ecommerce", "Generate an e-commerce interface", {
    productType: z.string().describe("Type of products (fashion, electronics, food, etc.)"),
    page: z.string().optional().describe("Page type (home, product, cart, checkout)"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Create an e-commerce ${args.page || "product listing"} page for ${args.productType}.

Include:
1. Product grid with filters
2. Product cards with image, title, price, rating
3. Add to cart functionality
4. Wishlist button
5. Sort and view options

Focus on conversion optimization and visual appeal.` }
    }]
  }));

  server.prompt("design-social-app", "Generate a social media interface", {
    appType: z.string().describe("Type of social app (feed, chat, stories, etc.)"),
    platform: z.string().optional().describe("Platform (mobile, web)"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Create a ${args.appType} social app interface. ${args.platform ? `Platform: ${args.platform}.` : "Mobile-first design."}

Include:
1. Feed/content area
2. Engagement actions (like, comment, share)
3. User profiles
4. Navigation between sections
5. Content creation button

Focus on engagement and ease of use.` }
    }]
  }));

  server.prompt("design-fintech", "Generate a fintech/banking interface", {
    type: z.string().describe("Interface type (banking, trading, payments, etc.)"),
    features: z.string().optional().describe("Key features to include"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Create a ${args.type} fintech interface. ${args.features ? `Features: ${args.features}.` : ""}

Include:
1. Account balance overview
2. Transaction list
3. Quick actions (send, request, pay)
4. Charts and analytics
5. Security indicators

Prioritize trust, clarity, and professionalism.` }
    }]
  }));

  server.prompt("design-healthcare", "Generate a healthcare interface", {
    type: z.string().describe("Interface type (patient portal, telehealth, records, etc.)"),
    audience: z.string().optional().describe("Primary audience (patients, providers)"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Create a ${args.type} healthcare interface. ${args.audience ? `Audience: ${args.audience}.` : ""}

Include:
1. Appointment scheduling
2. Health records summary
3. Medication reminders
4. Provider communication
5. Emergency information

Prioritize accessibility, clarity, and trust.` }
    }]
  }));

  server.prompt("design-education", "Generate an education/learning interface", {
    type: z.string().describe("Interface type (LMS, course, quiz, etc.)"),
    learnerType: z.string().optional().describe("Learner type (students, professionals)"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Create a ${args.type} education interface. ${args.learnerType ? `For: ${args.learnerType}.` : ""}

Include:
1. Course/content navigation
2. Progress tracking
3. Video/content player area
4. Notes and bookmarks
5. Quiz/assessment components

Focus on learning engagement and progress visibility.` }
    }]
  }));

  server.prompt("design-productivity", "Generate a productivity tool interface", {
    tool: z.string().describe("Tool type (notes, todo, calendar, etc.)"),
    features: z.string().optional().describe("Key features"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Create a ${args.tool} productivity interface. ${args.features ? `Features: ${args.features}.` : ""}

Include:
1. Main workspace area
2. Organization (folders, tags, projects)
3. Quick capture
4. Search and filter
5. Keyboard shortcut hints

Prioritize efficiency and minimal distraction.` }
    }]
  }));

  // ============================================
  // ADDITIONAL ANALYSIS PROMPTS (10 more = 15 total)
  // ============================================

  server.prompt("audit-heuristics", "Perform heuristic evaluation", {
    nodeId: z.string().describe("ID of the design to audit"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Perform a Nielsen's heuristic evaluation on the design at node ${args.nodeId}.

Evaluate against all 10 heuristics:
1. Visibility of system status
2. Match between system and real world
3. User control and freedom
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency of use
8. Aesthetic and minimalist design
9. Help users recognize/recover from errors
10. Help and documentation

Provide severity ratings (0-4) and specific recommendations.` }
    }]
  }));

  server.prompt("audit-wcag", "Perform WCAG accessibility audit", {
    nodeId: z.string().describe("ID of the design to audit"),
    level: z.string().optional().describe("WCAG level (A, AA, AAA)"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Perform a WCAG ${args.level || "AA"} accessibility audit on the design at node ${args.nodeId}.

Check all POUR principles:
- Perceivable: Text alternatives, captions, contrast, resize
- Operable: Keyboard, time, seizures, navigation
- Understandable: Readable, predictable, input assistance
- Robust: Compatible with assistive technology

Provide pass/fail status and remediation steps.` }
    }]
  }));

  server.prompt("audit-performance", "Audit design for performance", {
    nodeId: z.string().describe("ID of the design to audit"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Audit the design at node ${args.nodeId} for performance impact.

Check:
1. Number of layers and depth
2. Complex effects (blurs, shadows)
3. Image optimization opportunities
4. Vector complexity
5. Component reuse vs duplication

Provide optimization recommendations prioritized by impact.` }
    }]
  }));

  server.prompt("audit-ux-laws", "Analyze against UX laws", {
    nodeId: z.string().describe("ID of the design to analyze"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Analyze the design at node ${args.nodeId} against key UX laws.

Check application of:
1. Fitts's Law (target sizes and distances)
2. Hick's Law (number of choices)
3. Miller's Law (chunking information)
4. Jakob's Law (familiar patterns)
5. Gestalt Principles (proximity, similarity, etc.)
6. Serial Position Effect (primacy/recency)

Identify violations and suggest improvements.` }
    }]
  }));

  server.prompt("audit-brand-consistency", "Audit brand consistency", {
    nodeId: z.string().describe("ID of the design to audit"),
    brandGuidelines: z.string().optional().describe("Brand guidelines reference"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Audit the design at node ${args.nodeId} for brand consistency. ${args.brandGuidelines ? `Reference: ${args.brandGuidelines}.` : ""}

Check:
1. Color usage and palette adherence
2. Typography consistency
3. Spacing and layout patterns
4. Iconography style
5. Voice and tone in copy
6. Logo usage and clear space

Identify deviations and recommend corrections.` }
    }]
  }));

  server.prompt("audit-mobile-usability", "Audit mobile usability", {
    nodeId: z.string().describe("ID of the mobile design to audit"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Audit the mobile design at node ${args.nodeId} for usability.

Check:
1. Touch target sizes (44px minimum)
2. Thumb zone placement
3. One-handed operability
4. Text readability on small screens
5. Loading and response times
6. Gesture intuitiveness

Provide platform-specific recommendations.` }
    }]
  }));

  server.prompt("audit-content-hierarchy", "Audit content hierarchy", {
    nodeId: z.string().describe("ID of the design to audit"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Audit the content hierarchy in the design at node ${args.nodeId}.

Check:
1. Visual weight distribution
2. F-pattern or Z-pattern alignment
3. Headline/subhead progression
4. Call-to-action prominence
5. Secondary content placement
6. Reading flow

Suggest hierarchy improvements for scannability.` }
    }]
  }));

  server.prompt("audit-interaction-design", "Audit interaction design", {
    nodeId: z.string().describe("ID of the design to audit"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Audit the interaction design at node ${args.nodeId}.

Check:
1. Interactive element affordances
2. State changes (hover, active, disabled)
3. Feedback mechanisms
4. Error handling
5. Micro-interactions
6. Animation appropriateness

Recommend interaction improvements.` }
    }]
  }));

  server.prompt("audit-form-ux", "Audit form user experience", {
    nodeId: z.string().describe("ID of the form to audit"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Audit the form UX at node ${args.nodeId}.

Check:
1. Form length and complexity
2. Label placement and clarity
3. Input types appropriateness
4. Validation timing and messaging
5. Error recovery
6. Progress indication (multi-step)
7. Submit button placement

Provide form optimization recommendations.` }
    }]
  }));

  server.prompt("audit-dark-mode", "Audit dark mode implementation", {
    nodeId: z.string().describe("ID of the dark mode design to audit"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Audit the dark mode implementation at node ${args.nodeId}.

Check:
1. Surface color hierarchy
2. Text contrast and readability
3. Color saturation adjustments
4. Image and illustration adaptation
5. Shadow depth perception
6. Focus indicator visibility

Identify issues and suggest dark mode improvements.` }
    }]
  }));

  // ============================================
  // ADDITIONAL CONVERSION PROMPTS (6 more = 10 total)
  // ============================================

  server.prompt("convert-to-vue", "Convert design to Vue code", {
    nodeId: z.string().describe("ID of the design to convert"),
    api: z.string().optional().describe("API style: 'options' or 'composition' (default)"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Convert the design at node ${args.nodeId} to Vue 3 code. ${args.api === "options" ? "Use Options API." : "Use Composition API with script setup."}

Generate:
1. Component template
2. Script with reactive state
3. Scoped styles
4. Props definition with TypeScript

Use modern Vue patterns and best practices.` }
    }]
  }));

  server.prompt("convert-to-svelte", "Convert design to Svelte code", {
    nodeId: z.string().describe("ID of the design to convert"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Convert the design at node ${args.nodeId} to Svelte 5 code.

Generate:
1. Component markup
2. Runes ($state, $derived, $effect)
3. Props with TypeScript
4. Scoped styles

Use modern Svelte patterns.` }
    }]
  }));

  server.prompt("convert-to-flutter", "Convert design to Flutter code", {
    nodeId: z.string().describe("ID of the design to convert"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Convert the design at node ${args.nodeId} to Flutter/Dart code.

Generate:
1. Widget tree structure
2. Custom theme data
3. Proper constraints and sizing
4. Material or Cupertino widgets as appropriate

Follow Flutter best practices for layout and state.` }
    }]
  }));

  server.prompt("convert-to-react-native", "Convert design to React Native code", {
    nodeId: z.string().describe("ID of the design to convert"),
    styling: z.string().optional().describe("Styling approach (StyleSheet, NativeWind, Tamagui)"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Convert the design at node ${args.nodeId} to React Native. ${args.styling ? `Use ${args.styling} for styling.` : "Use StyleSheet."}

Generate:
1. Component with TypeScript
2. Proper styling
3. Platform-specific adjustments
4. Accessibility props

Follow React Native best practices.` }
    }]
  }));

  server.prompt("convert-to-styled-components", "Convert to styled-components", {
    nodeId: z.string().describe("ID of the design to convert"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Convert the design at node ${args.nodeId} to React with styled-components.

Generate:
1. Styled components with template literals
2. Theme-aware styles
3. Dynamic props styling
4. Component composition

Use modern styled-components patterns.` }
    }]
  }));

  server.prompt("extract-style-dictionary", "Extract Style Dictionary tokens", {
    nodeId: z.string().describe("ID to extract tokens from"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Extract design tokens from node ${args.nodeId} in Style Dictionary format.

Generate:
1. Color tokens with semantic naming
2. Typography tokens
3. Spacing scale
4. Shadow tokens
5. Border radius tokens

Output in Style Dictionary JSON format ready for build.` }
    }]
  }));

  // ============================================
  // ADDITIONAL DOCUMENTATION PROMPTS (12 more = 15 total)
  // ============================================

  server.prompt("document-design-specs", "Generate design specifications", {
    nodeId: z.string().describe("ID of the design to document"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Generate detailed design specifications for node ${args.nodeId}.

Include:
1. Dimensions and spacing values
2. Colors with hex codes
3. Typography details
4. Border and shadow values
5. Interactive states
6. Responsive behavior notes

Format as a comprehensive spec sheet.` }
    }]
  }));

  server.prompt("document-changelog", "Generate design changelog", {
    changes: z.string().describe("Summary of changes made"),
    version: z.string().optional().describe("Version number"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Generate a design changelog entry. ${args.version ? `Version: ${args.version}.` : ""} Changes: ${args.changes}

Format as:
## [Version] - Date
### Added
- New features

### Changed
- Modifications

### Fixed
- Bug fixes

### Deprecated
- Soon to be removed

Use clear, concise descriptions.` }
    }]
  }));

  server.prompt("document-component-api", "Document component API", {
    nodeId: z.string().describe("ID of the component to document"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Generate API documentation for the component at node ${args.nodeId}.

Include:
1. Component name and description
2. Props table with types, defaults, descriptions
3. Variants and their usage
4. Events/callbacks
5. Slots/children
6. Accessibility considerations
7. Usage examples

Format as developer-friendly documentation.` }
    }]
  }));

  server.prompt("document-storybook", "Generate Storybook stories", {
    nodeId: z.string().describe("ID of the component"),
    framework: z.string().optional().describe("Framework (React, Vue, Svelte)"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Generate Storybook stories for the component at node ${args.nodeId}. ${args.framework ? `Framework: ${args.framework}.` : "Use React."}

Generate:
1. Default story
2. Stories for each variant
3. Stories for each state
4. Args table with controls
5. Documentation with MDX

Use CSF 3.0 format.` }
    }]
  }));

  server.prompt("document-motion", "Document motion/animation specs", {
    nodeId: z.string().describe("ID of the animated design"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Document the motion and animation specifications for node ${args.nodeId}.

Include:
1. Animation name and purpose
2. Duration in milliseconds
3. Easing function
4. Delay if any
5. Properties animated
6. Trigger conditions
7. Code implementation notes

Format for developer handoff.` }
    }]
  }));

  server.prompt("document-responsive", "Document responsive behavior", {
    nodeId: z.string().describe("ID of the design to document"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Document the responsive behavior for the design at node ${args.nodeId}.

Include:
1. Breakpoint definitions
2. Layout changes per breakpoint
3. Component behavior changes
4. Typography scaling
5. Spacing adjustments
6. Show/hide elements

Create a clear responsive specification table.` }
    }]
  }));

  server.prompt("document-accessibility", "Generate accessibility documentation", {
    nodeId: z.string().describe("ID of the design to document"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Generate accessibility documentation for the design at node ${args.nodeId}.

Include:
1. ARIA labels and roles needed
2. Keyboard navigation flow
3. Focus management requirements
4. Color contrast results
5. Screen reader announcements
6. Alternative text requirements

Format as implementation checklist.` }
    }]
  }));

  server.prompt("document-qa-checklist", "Generate QA checklist", {
    nodeId: z.string().describe("ID of the design to create checklist for"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Generate a QA checklist for the design at node ${args.nodeId}.

Include checks for:
1. Visual accuracy
2. Interactive behavior
3. Responsive behavior
4. Accessibility
5. Performance
6. Edge cases
7. Error states
8. Browser/device compatibility

Format as checkable items with acceptance criteria.` }
    }]
  }));

  server.prompt("document-design-tokens-usage", "Document design tokens usage", {
    nodeId: z.string().describe("ID of the design to analyze"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Document the design tokens used in the design at node ${args.nodeId}.

Create a table showing:
1. Token name
2. Token value
3. Where it's used
4. CSS variable name
5. Tailwind class equivalent

Help developers map design to code.` }
    }]
  }));

  server.prompt("document-user-flows", "Document user flows", {
    feature: z.string().describe("Feature or task to document"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Document the user flow for: ${args.feature}

Include:
1. Entry points
2. Step-by-step flow
3. Decision points
4. Success path
5. Error paths
6. Exit points
7. Edge cases

Format as a flow diagram description and table.` }
    }]
  }));

  server.prompt("document-edge-cases", "Document edge cases", {
    nodeId: z.string().describe("ID of the design to analyze"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Document edge cases for the design at node ${args.nodeId}.

Consider:
1. Empty states
2. Loading states
3. Error states
4. Maximum content length
5. Minimum content
6. Slow network
7. Offline behavior
8. Permission denied
9. First-time use

Describe expected behavior for each case.` }
    }]
  }));

  server.prompt("document-release-notes", "Generate release notes", {
    changes: z.string().describe("Summary of changes"),
    version: z.string().optional().describe("Version number"),
  }, async (args) => ({
    messages: [{
      role: "user",
      content: { type: "text", text: `Generate user-facing release notes. ${args.version ? `Version: ${args.version}.` : ""} Changes: ${args.changes}

Include:
1. Overview paragraph
2. New features with benefits
3. Improvements
4. Bug fixes
5. Known issues
6. Upgrade notes if needed

Write in user-friendly language.` }
    }]
  }));
}
