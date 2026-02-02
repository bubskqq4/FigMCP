/**
 * Comprehensive Design Guidelines for Figma MCP Server
 * Integrated with good-fullstack skill principles
 */

export const DESIGN_GUIDELINES: Record<string, any> = {
  "landing-page": {
    overview: "Landing pages require bold, distinctive design that captures attention immediately. Focus on clear value proposition, strong visual hierarchy, and compelling CTAs.",
    principles: [
      {
        name: "Hero Impact",
        description: "Above-the-fold hero section must communicate value in <3 seconds. Use large, distinctive typography (48-80px) with high-contrast accent colors."
      },
      {
        name: "Visual Flow",
        description: "Guide eyes down the page with rhythm: hero → features → social proof → CTA. Use whitespace (80-120px sections) to create breathing room."
      },
      {
        name: "Conversion Focus",
        description: "Every section should drive toward a single primary action. Secondary CTAs should be visually subordinate."
      }
    ],
    spacing: {
      base: "8px",
      scale: {
        xs: "8px",
        sm: "16px",
        md: "32px",
        lg: "64px",
        xl: "96px",
        xxl: "128px"
      }
    },
    typography: {
      scale: {
        hero: "64-80px",
        h1: "48-56px",
        h2: "36-40px",
        h3: "28-32px",
        body: "18-20px",
        small: "14-16px"
      },
      fonts: ["Clash Display", "Satoshi", "Inter Variable", "Plus Jakarta Sans"]
    },
    colors: {
      strategy: "Dominant background (95%) + bold accent (5%). Use gradients and atmospheric effects sparingly.",
      palette: {
        background: "oklch(0.98 0.01 240) or oklch(0.08 0.02 280)",
        foreground: "oklch(0.15 0.02 240) or oklch(0.95 0.01 240)",
        accent: "oklch(0.60 0.25 260) or oklch(0.70 0.20 150)",
        muted: "oklch(0.50 0.05 240)"
      }
    },
    bestPractices: [
      "Use asymmetric layouts to create visual interest",
      "Add texture/noise overlays for depth (3-5% opacity)",
      "Include social proof early (logos, testimonials)",
      "Mobile-first: design for 375px width first",
      "Optimize hero image as LCP element (<2.5s)",
      "Use sticky nav only if page >3 screens tall",
      "Add micro-interactions on CTA hover (scale 1.02-1.05)",
      "Test with real content, not Lorem Ipsum"
    ]
  },

  "dashboard": {
    overview: "Dashboards prioritize data density, scannability, and quick decision-making. Use consistent card patterns, clear hierarchy, and functional minimalism.",
    principles: [
      {
        name: "Information Density",
        description: "Balance data richness with whitespace. Cards should show key metrics at a glance without overwhelming."
      },
      {
        name: "Scannable Hierarchy",
        description: "Use size, weight, and color to create clear information hierarchy. Most important metrics largest/boldest."
      },
      {
        name: "Functional Aesthetics",
        description: "Beauty serves function. Every visual element should aid comprehension or navigation."
      }
    ],
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
        stat: "32-40px",
        h1: "24-28px",
        h2: "18-20px",
        body: "14px",
        small: "12px"
      },
      fonts: ["Inter Variable", "Geist Sans", "IBM Plex Sans"]
    },
    colors: {
      strategy: "Neutral background with semantic colors for status. Use color purposefully to convey meaning.",
      palette: {
        background: "oklch(0.98 0 0) or oklch(0.10 0.01 240)",
        surface: "oklch(0.99 0 0) or oklch(0.15 0.01 240)",
        border: "oklch(0.90 0 0) or oklch(0.25 0.01 240)",
        success: "oklch(0.65 0.15 145)",
        warning: "oklch(0.75 0.15 85)",
        error: "oklch(0.60 0.20 25)",
        info: "oklch(0.60 0.15 250)"
      }
    },
    bestPractices: [
      "Sidebar: 240-280px wide, sticky position",
      "Card padding: 16-24px, gap between cards: 16-24px",
      "Use skeleton loaders for async data",
      "Charts: muted colors by default, highlight on hover",
      "Tables: zebra striping or hover highlight, not both",
      "Keep primary nav visible at all times",
      "Use badges for status (pending, active, error)",
      "Include empty states with helpful CTAs"
    ]
  },

  "design-system": {
    overview: "A design system is a single source of truth for design decisions. Define tokens, components, and patterns that scale across products.",
    principles: [
      {
        name: "Token Foundation",
        description: "All design decisions flow from design tokens: colors, spacing, typography, shadows. Components consume tokens."
      },
      {
        name: "Component Composition",
        description: "Build complex components from simple primitives. Button → IconButton → SplitButton."
      },
      {
        name: "Documentation First",
        description: "Every component needs: purpose, variants, props, usage examples, do/don't examples."
      }
    ],
    spacing: {
      base: "4px",
      scale: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
        xxxl: "64px"
      }
    },
    typography: {
      scale: {
        display: "48-56px",
        h1: "36-40px",
        h2: "28-32px",
        h3: "22-24px",
        h4: "18-20px",
        body: "16px",
        small: "14px",
        tiny: "12px"
      },
      fonts: ["System font stack or single brand font"]
    },
    colors: {
      strategy: "Semantic color system with 10-shade scales. Each color has purpose: primary (brand), success, warning, error, neutral.",
      palette: {
        "primary-50": "oklch(0.97 0.02 [hue])",
        "primary-500": "oklch(0.55 0.20 [hue])",
        "primary-900": "oklch(0.25 0.15 [hue])"
      }
    },
    bestPractices: [
      "Define 5-7 color scales max (primary, success, warning, error, neutral)",
      "Use 8-10 shades per color scale",
      "Create component variants with semantic names (primary, secondary, ghost)",
      "Document responsive behavior for all components",
      "Include dark mode tokens from day 1",
      "Version your design system",
      "Create Figma components as reusable instances",
      "Use auto-layout for flexible components"
    ]
  },

  "mobile-app": {
    overview: "Mobile apps demand thumb-friendly interactions, clear navigation, and performance. Design for one-handed use and expect slow networks.",
    principles: [
      {
        name: "Thumb Zone",
        description: "Place primary actions in bottom 1/3 of screen. Top areas for display-only content."
      },
      {
        name: "Touch Targets",
        description: "Minimum 44x44px tap targets with 8px spacing between interactive elements."
      },
      {
        name: "Progressive Disclosure",
        description: "Show essentials first, reveal details on demand. Avoid overwhelming single screens."
      }
    ],
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
        h1: "28-32px",
        h2: "22-24px",
        h3: "18-20px",
        body: "16px",
        small: "14px"
      },
      fonts: ["SF Pro (iOS)", "Roboto (Android)", "System UI"]
    },
    colors: {
      strategy: "Platform-specific color usage. iOS: subtle, Android: bold Material colors.",
      palette: {
        ios: {
          background: "oklch(0.98 0 0) or oklch(0.10 0 0)",
          primary: "oklch(0.50 0.15 250)"
        },
        android: {
          background: "oklch(0.99 0 0) or oklch(0.10 0 0)",
          primary: "Material Dynamic Color"
        }
      }
    },
    bestPractices: [
      "Design for 375x667 (iPhone SE) as minimum",
      "Nav: bottom tab bar (iOS) or nav drawer + top bar (Android)",
      "Use native UI patterns: swipe actions, pull-to-refresh",
      "Safe areas: 44px top (status), 34px bottom (home indicator)",
      "Optimize images: WebP, 2x/3x resolution",
      "Use skeleton screens, not spinners",
      "Show offline states clearly",
      "Test on real devices, not just simulators"
    ]
  },

  "web-app": {
    overview: "Web apps are productivity tools. Prioritize efficiency, keyboard shortcuts, and power-user features while remaining approachable for new users.",
    principles: [
      {
        name: "Keyboard First",
        description: "Every action should have a keyboard shortcut. Display shortcuts in tooltips."
      },
      {
        name: "Persistent Navigation",
        description: "Users should always know where they are. Use breadcrumbs, active states, and clear page titles."
      },
      {
        name: "Undo/Redo",
        description: "Make actions reversible. Show confirmation only for destructive actions."
      }
    ],
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
        h1: "24-28px",
        h2: "20-22px",
        h3: "16-18px",
        body: "14px",
        small: "12px"
      },
      fonts: ["Inter Variable", "System UI", "Roboto"]
    },
    colors: {
      strategy: "Neutral interface with accent colors for actions. Avoid colorful decorations.",
      palette: {
        background: "oklch(0.99 0 0) or oklch(0.12 0.01 240)",
        surface: "oklch(1 0 0) or oklch(0.18 0.01 240)",
        border: "oklch(0.92 0 0) or oklch(0.25 0.01 240)",
        primary: "oklch(0.50 0.20 250)"
      }
    },
    bestPractices: [
      "Responsive: mobile (375px), tablet (768px), desktop (1280px)",
      "Use command palette (Cmd+K) for quick actions",
      "Show keyboard shortcuts in tooltips (hover 1s delay)",
      "Indicate loading states inline, not with overlays",
      "Use optimistic UI for instant feedback",
      "Preserve scroll position on navigation",
      "Auto-save forms, don't rely on explicit save",
      "Show unsaved changes warnings"
    ]
  },

  "ecommerce": {
    overview: "E-commerce sites must build trust, reduce friction, and drive conversions. Clear product presentation and simple checkout are critical.",
    principles: [
      {
        name: "Product Clarity",
        description: "High-quality images, clear pricing, obvious add-to-cart. Remove ambiguity about what customer is buying."
      },
      {
        name: "Trust Signals",
        description: "Security badges, reviews, return policy, customer support. Address purchase anxiety."
      },
      {
        name: "Friction Reduction",
        description: "Minimize steps to purchase. Guest checkout, saved payment methods, autofill."
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
        price: "32-40px",
        h1: "28-32px",
        h2: "22-24px",
        body: "16px",
        small: "14px"
      },
      fonts: ["Plus Jakarta Sans", "Inter", "DM Sans"]
    },
    colors: {
      strategy: "Clean, trustworthy palette. Green for success/add-to-cart, red for urgency/sale.",
      palette: {
        background: "oklch(0.99 0 0)",
        primary: "oklch(0.30 0.05 240)",
        accent: "oklch(0.50 0.20 280)",
        success: "oklch(0.60 0.15 145)",
        sale: "oklch(0.60 0.20 25)"
      }
    },
    bestPractices: [
      "Product images: 1:1 ratio, min 800x800px, multiple angles",
      "Show price prominently, compare-at-price if on sale",
      "Add-to-cart button: 48-56px tall, sticky on mobile",
      "Show estimated delivery date, not just shipping time",
      "Cart: show product thumbnail, easy quantity edit, clear total",
      "Checkout: progress indicator, inline validation, saved addresses",
      "Mobile: sticky header with cart icon + item count",
      "Include size guides, product videos, 360° views"
    ]
  },

  "saas": {
    overview: "SaaS applications balance marketing (landing/pricing) with product (dashboard/features). Design for trial-to-paid conversion.",
    principles: [
      {
        name: "Onboarding Excellence",
        description: "First-time user experience determines retention. Progressive onboarding, not overwhelming tours."
      },
      {
        name: "Value Demonstration",
        description: "Show value quickly. Get users to 'aha moment' within first session."
      },
      {
        name: "Upgrade Prompts",
        description: "Gate premium features visibly. Users should know what they're missing and why to upgrade."
      }
    ],
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
        hero: "56-64px",
        h1: "32-40px",
        h2: "24-28px",
        body: "16px",
        small: "14px"
      },
      fonts: ["Clash Display + Satoshi", "Cal Sans + Inter"]
    },
    colors: {
      strategy: "Bold brand color for landing, neutral product interface. Use color to differentiate plan tiers.",
      palette: {
        brand: "oklch(0.55 0.25 280)",
        app: "oklch(0.98 0 0) or oklch(0.10 0 0)",
        free: "oklch(0.70 0.10 240)",
        pro: "oklch(0.60 0.20 280)",
        enterprise: "oklch(0.40 0.15 260)"
      }
    },
    bestPractices: [
      "Landing: hero with demo/screenshot, social proof, pricing anchor",
      "Signup: social SSO, email-only (no password yet), progressive profiling",
      "Onboarding: checklist with progress, skip option, context tooltips",
      "Free tier: show upgrade prompts in context, not popups",
      "Pricing: 3 tiers max, highlight recommended, annual discount",
      "Dashboard: show usage limits for free users",
      "Empty states: guide users to first action",
      "Include changelog/roadmap to show active development"
    ]
  },

  "portfolio": {
    overview: "Portfolio sites showcase work and personality. Distinctive design is expected, but don't sacrifice usability for creativity.",
    principles: [
      {
        name: "Work First",
        description: "Portfolio pieces should be immediately visible and central. About/contact are secondary."
      },
      {
        name: "Case Studies",
        description: "Show process, not just final deliverables. Context, problem, solution, impact."
      },
      {
        name: "Personal Brand",
        description: "Design should reflect personal aesthetic. This is the place to break conventional rules."
      }
    ],
    spacing: {
      base: "8px",
      scale: {
        xs: "8px",
        sm: "16px",
        md: "32px",
        lg: "64px",
        xl: "96px"
      }
    },
    typography: {
      scale: {
        display: "72-96px",
        h1: "48-56px",
        h2: "32-36px",
        body: "18-20px"
      },
      fonts: ["Distinctive display font + readable body"]
    },
    colors: {
      strategy: "Personal choice. Monochrome + one accent, full color spectrum, or anything in between.",
      palette: "Varies by personal brand"
    },
    bestPractices: [
      "Grid of work: 2-3 columns desktop, 1 column mobile",
      "Case study layout: hero image → context → process → outcome",
      "Include role, timeline, tools used for each project",
      "High-quality images: 2x resolution, optimized WebP",
      "About page: photo, short bio, skills, contact",
      "Optional: blog, side projects, speaking",
      "Ensure fast load times despite large images",
      "Make it personal and memorable"
    ]
  },

  "blog": {
    overview: "Blog design prioritizes readability and content discovery. Typography and spacing are more important than decoration.",
    principles: [
      {
        name: "Reading Experience",
        description: "Optimize for long-form reading: large type (18-22px), generous line-height (1.6-1.8), max-width 65ch."
      },
      {
        name: "Content Discovery",
        description: "Help readers find related content: tags, categories, related posts, search."
      },
      {
        name: "Performance",
        description: "Fast page loads are critical for SEO and reader retention. Optimize images, minimize JS."
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
        h1: "40-48px",
        h2: "32-36px",
        h3: "24-28px",
        body: "18-20px",
        small: "16px"
      },
      fonts: ["Serif for body (Lora, Merriweather)", "Sans for UI (Inter)"]
    },
    colors: {
      strategy: "Neutral, easy on eyes. Dark text on light background for body content.",
      palette: {
        background: "oklch(0.99 0 0) or oklch(0.15 0 0)",
        text: "oklch(0.20 0.02 240) or oklch(0.90 0.01 240)",
        accent: "oklch(0.50 0.15 250)"
      }
    },
    bestPractices: [
      "Article max-width: 640-720px (65-75ch)",
      "Line-height: 1.6-1.8 for body text",
      "Paragraph spacing: 1.5em",
      "Include table of contents for long posts (>2000 words)",
      "Code blocks: syntax highlighting, copy button",
      "Images: full-width or inset, captions, lazy loading",
      "Related posts: 3-6 suggestions at end of article",
      "Newsletter signup: end of post, not popup"
    ]
  },

  "tailwind": {
    overview: "Tailwind CSS best practices for Figma-to-code workflow. Use design tokens in Figma that map directly to Tailwind classes.",
    principles: [
      {
        name: "Design Token Mapping",
        description: "Figma variables should map to Tailwind config. spacing-4 = 1rem = space-4 in Tailwind."
      },
      {
        name: "Component Variants",
        description: "Use Figma component properties that correspond to Tailwind variant classes."
      },
      {
        name: "Responsive Design",
        description: "Design mobile-first in Figma. Add tablet/desktop variants that map to Tailwind breakpoints."
      }
    ],
    spacing: {
      base: "4px (0.25rem = space-1)",
      scale: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        6: "24px",
        8: "32px",
        12: "48px",
        16: "64px"
      }
    },
    typography: {
      scale: {
        xs: "12px / 1rem",
        sm: "14px / 1.25rem",
        base: "16px / 1.5rem",
        lg: "18px / 1.75rem",
        xl: "20px / 1.75rem",
        "2xl": "24px / 2rem",
        "3xl": "30px / 2.25rem",
        "4xl": "36px / 2.5rem"
      },
      fonts: ["Default sans stack or custom font"]
    },
    colors: {
      strategy: "Use Tailwind's semantic color scales or create custom scales with 50-900 shades.",
      palette: {
        slate: "neutral grays",
        blue: "primary brand",
        green: "success",
        red: "error",
        amber: "warning"
      }
    },
    bestPractices: [
      "Figma spacing: use 4px increments to match Tailwind's space scale",
      "Figma colors: create variables with same names as Tailwind colors",
      "Use Tailwind's default breakpoints in Figma: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)",
      "Component variants in Figma → conditional classes in code",
      "Use Figma auto-layout → Tailwind flex/grid",
      "Figma corner radius: 0, 2, 4, 6, 8, 12, 16, 24, 9999 (rounded-none to rounded-full)",
      "Export Figma variables as Tailwind config JSON",
      "Use Tailwind @apply sparingly, prefer utility classes"
    ]
  },

  "code": {
    overview: "Design-to-code best practices. Create Figma designs that translate cleanly to production code.",
    principles: [
      {
        name: "Semantic Naming",
        description: "Name Figma layers semantically: 'ProfileAvatar', not 'Ellipse 23'. Aids code generation."
      },
      {
        name: "Component Structure",
        description: "Figma component structure should mirror React/Vue component hierarchy."
      },
      {
        name: "Consistent Patterns",
        description: "Reuse components and styles. Variations should use component properties, not duplicates."
      }
    ],
    spacing: {
      base: "4px or 8px",
      scale: "Use consistent scale across entire design system"
    },
    typography: {
      scale: "Define once, reference everywhere via text styles",
      fonts: "Limit to 2-3 font families max"
    },
    colors: {
      strategy: "All colors should be Figma variables. No hard-coded hex values in designs.",
      palette: "Define semantic color tokens: primary, secondary, success, error, etc."
    },
    bestPractices: [
      "Use Figma components as single source of truth",
      "Component properties → React props (variant, size, state)",
      "Auto-layout → CSS flexbox/grid (set direction, gap, padding)",
      "Absolute positioning only when necessary",
      "Name layers semantically: 'Button/Primary/Hover', not 'Rectangle 4'",
      "Use constraints (left/right/center) for responsive behavior",
      "Keep design file organized: pages for each feature/flow",
      "Use Figma variants for component states (hover, active, disabled)",
      "Document component usage in Figma descriptions",
      "Version control: commit to GitHub, sync with code versions"
    ]
  },

  "accessibility": {
    overview: "WCAG 2.1 AA compliance guidelines. Accessibility is not optional - it's a design requirement.",
    principles: [
      {
        name: "Perceivable",
        description: "Content must be perceivable by all users. Color is not the only visual means of conveying information."
      },
      {
        name: "Operable",
        description: "All functionality must be keyboard accessible. Touch targets must be 44x44px minimum."
      },
      {
        name: "Understandable",
        description: "Content and operation must be understandable. Use clear language, consistent patterns."
      },
      {
        name: "Robust",
        description: "Content must work with current and future assistive technologies."
      }
    ],
    spacing: {
      base: "N/A",
      scale: "Touch targets: 44x44px min, 8px spacing between interactive elements"
    },
    typography: {
      scale: {
        minimum: "16px for body text",
        heading: "1.5-2x body size for clear hierarchy"
      },
      fonts: "Avoid decorative fonts for body text, use readable sans-serif or serif"
    },
    colors: {
      strategy: "WCAG AA: 4.5:1 contrast for normal text, 3:1 for large text (18px+ or 14px+ bold)",
      palette: "Test all color combinations with contrast checker"
    },
    bestPractices: [
      "Color contrast: 4.5:1 for body text, 3:1 for large text (WCAG AA)",
      "Use semantic HTML: <button>, <nav>, <main>, not <div onClick>",
      "All images need alt text (or alt='' if decorative)",
      "Form labels: visible and associated with inputs",
      "Keyboard navigation: Tab order follows visual order",
      "Focus indicators: visible on all interactive elements (never outline:none)",
      "Don't rely on color alone: use icons, text, patterns",
      "Animations: respect prefers-reduced-motion",
      "Screen reader: test with NVDA (Windows) or VoiceOver (Mac)",
      "Link text: descriptive ('read article', not 'click here')",
      "Heading hierarchy: don't skip levels (h1 → h2, not h1 → h3)"
    ]
  },

  "responsive": {
    overview: "Responsive design ensures usability across all device sizes. Mobile-first approach scales up gracefully.",
    principles: [
      {
        name: "Mobile First",
        description: "Design for smallest screen first (375px), then progressively enhance for larger screens."
      },
      {
        name: "Fluid Typography",
        description: "Use clamp() or viewport units for typography that scales smoothly between breakpoints."
      },
      {
        name: "Flexible Layouts",
        description: "Use flexbox/grid with percentages and auto values, not fixed pixel widths."
      }
    ],
    spacing: {
      base: "Responsive: smaller on mobile (16px), larger on desktop (24-32px)",
      scale: "Use viewport-relative units: 4vw, clamp(16px, 2vw, 32px)"
    },
    typography: {
      scale: {
        mobile: "16px base, 24-32px headings",
        tablet: "16-18px base, 32-40px headings",
        desktop: "18-20px base, 40-56px headings"
      },
      fonts: "Use fluid typography: clamp(16px, 4vw, 20px)"
    },
    colors: {
      strategy: "Colors remain consistent across breakpoints. Adjust only for dark mode.",
      palette: "Same palette, different emphasis on mobile (simpler)"
    },
    bestPractices: [
      "Breakpoints: 375px (mobile), 640px (sm), 768px (md), 1024px (lg), 1280px (xl)",
      "Design mobile, tablet, desktop variants in Figma",
      "Images: use srcset for different resolutions (1x, 2x, 3x)",
      "Navigation: hamburger menu <768px, full nav ≥768px",
      "Grid: 1 column mobile, 2-3 tablet, 3-4+ desktop",
      "Touch targets: 44x44px mobile, can be smaller on desktop",
      "Test on real devices, not just browser resize",
      "Use container queries for component-level responsiveness",
      "Avoid horizontal scrolling on mobile",
      "Font size: never below 16px on mobile (prevents zoom on focus)"
    ]
  }
};

// Style Guide Tags for Filtering
export const STYLE_GUIDE_TAGS: Record<string, string[]> = {
  aesthetic: [
    "minimal",
    "maximalist",
    "brutalist",
    "glassmorphism",
    "neumorphism",
    "flat",
    "material",
    "skeuomorphic",
    "retro",
    "futuristic",
    "organic",
    "geometric",
    "playful",
    "elegant",
    "industrial"
  ],
  industry: [
    "saas",
    "ecommerce",
    "fintech",
    "healthcare",
    "education",
    "crypto",
    "gaming",
    "social",
    "productivity",
    "entertainment",
    "enterprise",
    "startup"
  ],
  platform: [
    "web",
    "mobile",
    "desktop",
    "responsive",
    "pwa",
    "native"
  ],
  color: [
    "dark",
    "light",
    "colorful",
    "monochrome",
    "pastel",
    "vibrant",
    "muted",
    "high-contrast"
  ],
  layout: [
    "grid",
    "asymmetric",
    "centered",
    "sidebar",
    "split-screen",
    "card-based",
    "masonry",
    "bento"
  ],
  vibe: [
    "professional",
    "casual",
    "luxury",
    "friendly",
    "serious",
    "innovative",
    "trustworthy",
    "energetic",
    "calm",
    "bold"
  ]
};

// Curated Style Guides
export const STYLE_GUIDES: any[] = [
  {
    name: "Dark Minimal SaaS",
    tags: ["minimal", "dark", "saas", "web", "professional"],
    description: "Clean, dark interface with subtle gradients and sharp typography. Perfect for developer tools and B2B SaaS.",
    colors: {
      background: "oklch(0.10 0.01 280)",
      surface: "oklch(0.15 0.01 280)",
      border: "oklch(0.25 0.01 280)",
      foreground: "oklch(0.95 0.01 280)",
      accent: "oklch(0.70 0.20 150)", // Electric green
      accentMuted: "oklch(0.70 0.20 150 / 0.15)"
    },
    typography: {
      display: "Clash Display",
      body: "Satoshi",
      mono: "JetBrains Mono"
    },
    examples: "Linear, Raycast, Vercel"
  },
  {
    name: "Warm Editorial",
    tags: ["elegant", "light", "editorial", "web", "luxury"],
    description: "Cream backgrounds with terracotta accents. Large serif headlines. Perfect for content-focused sites.",
    colors: {
      background: "oklch(0.97 0.01 60)",
      surface: "oklch(0.99 0.01 60)",
      foreground: "oklch(0.20 0.02 60)",
      accent: "oklch(0.55 0.15 40)", // Terracotta
      muted: "oklch(0.60 0.05 60)"
    },
    typography: {
      display: "Playfair Display",
      body: "Source Serif 4",
      mono: "IBM Plex Mono"
    },
    examples: "Medium, Substack, NY Times"
  },
  {
    name: "Vibrant Gradient SaaS",
    tags: ["colorful", "vibrant", "saas", "web", "energetic", "modern"],
    description: "Bold gradient backgrounds with glassmorphism cards. High energy, startup-friendly aesthetic.",
    colors: {
      background: "radial-gradient mesh with purple/blue/pink",
      surface: "oklch(1 0 0 / 0.05) with backdrop-blur",
      foreground: "oklch(0.10 0.02 280)",
      accent: "oklch(0.60 0.25 300)", // Purple
      secondary: "oklch(0.70 0.20 200)" // Cyan
    },
    typography: {
      display: "Cal Sans",
      body: "Inter Variable",
      mono: "Fira Code"
    },
    examples: "Linear (gradient version), Stripe, Framer"
  },
  {
    name: "Brutalist Monochrome",
    tags: ["brutalist", "monochrome", "web", "bold", "experimental"],
    description: "Pure black and white, no grays. Exposed grid, monospace font, stark contrasts.",
    colors: {
      background: "oklch(1 0 0)",
      surface: "oklch(0 0 0)",
      foreground: "oklch(0 0 0) or oklch(1 0 0)",
      border: "oklch(0 0 0)",
      accent: "oklch(0 0 0)"
    },
    typography: {
      display: "Monument Extended",
      body: "Space Mono",
      mono: "Space Mono"
    },
    examples: "Brutalist websites, experimental portfolios"
  },
  {
    name: "Soft Pastel Mobile",
    tags: ["pastel", "light", "mobile", "friendly", "calm"],
    description: "Muted pastel colors, gentle shadows, rounded corners. Perfect for wellness, social, lifestyle apps.",
    colors: {
      background: "oklch(0.98 0.02 240)",
      surface: "oklch(0.95 0.05 280)",
      foreground: "oklch(0.30 0.05 280)",
      accent: "oklch(0.75 0.10 300)", // Soft purple
      secondary: "oklch(0.80 0.10 180)" // Mint
    },
    typography: {
      display: "Recoleta",
      body: "Nunito Sans",
      mono: "IBM Plex Mono"
    },
    examples: "Calm, Headspace, Notion (mobile)"
  },
  {
    name: "High-Contrast Fintech",
    tags: ["high-contrast", "professional", "fintech", "web", "trustworthy"],
    description: "Deep navy with sharp whites and gold accents. Serious, trustworthy aesthetic for finance.",
    colors: {
      background: "oklch(0.12 0.05 260)",
      surface: "oklch(0.18 0.05 260)",
      foreground: "oklch(0.98 0.01 260)",
      accent: "oklch(0.75 0.15 80)", // Gold
      success: "oklch(0.65 0.15 145)"
    },
    typography: {
      display: "Sohne",
      body: "Inter Variable",
      mono: "Berkeley Mono"
    },
    examples: "Stripe, Plaid, Coinbase"
  },
  {
    name: "Playful E-commerce",
    tags: ["playful", "colorful", "ecommerce", "web", "friendly"],
    description: "Bright colors, bouncy animations, rounded shapes. Fun shopping experience for consumer brands.",
    colors: {
      background: "oklch(0.99 0.01 240)",
      surface: "oklch(0.97 0.03 240)",
      foreground: "oklch(0.20 0.02 240)",
      accent: "oklch(0.60 0.25 330)", // Hot pink
      secondary: "oklch(0.65 0.20 120)" // Lime green
    },
    typography: {
      display: "Fraunces",
      body: "Cabinet Grotesk",
      mono: "IBM Plex Mono"
    },
    examples: "Gumroad, Shopify stores, Glossier"
  },
  {
    name: "Enterprise Dashboard",
    tags: ["minimal", "professional", "enterprise", "web", "serious"],
    description: "Neutral grays, data-focused, high information density. For internal tools and B2B dashboards.",
    colors: {
      background: "oklch(0.98 0 0)",
      surface: "oklch(1 0 0)",
      border: "oklch(0.90 0 0)",
      foreground: "oklch(0.25 0.01 240)",
      accent: "oklch(0.50 0.15 250)"
    },
    typography: {
      display: "Inter Variable",
      body: "Inter Variable",
      mono: "JetBrains Mono"
    },
    examples: "Salesforce, Atlassian, enterprise tools"
  },
  {
    name: "Glassmorphism Portfolio",
    tags: ["glassmorphism", "colorful", "portfolio", "web", "innovative"],
    description: "Frosted glass cards over gradient mesh backgrounds. Modern, eye-catching for creative portfolios.",
    colors: {
      background: "gradient mesh (multiple colors)",
      surface: "oklch(1 0 0 / 0.08) with backdrop-blur(24px)",
      foreground: "oklch(0.15 0.02 240)",
      accent: "oklch(0.65 0.20 280)",
      border: "oklch(1 0 0 / 0.12)"
    },
    typography: {
      display: "Clash Display",
      body: "Satoshi",
      mono: "Fira Code"
    },
    examples: "Apple (glassmorphism elements), creative portfolios"
  },
  {
    name: "Material Design 3",
    tags: ["material", "colorful", "mobile", "web", "modern"],
    description: "Google's Material Design 3 with dynamic color system. Adaptive, accessible, and flexible.",
    colors: {
      background: "Dynamic color system (user-defined seed)",
      surface: "Surface containers (tonal elevations)",
      foreground: "On-surface variants",
      accent: "Primary color from dynamic palette",
      secondary: "Secondary color from dynamic palette"
    },
    typography: {
      display: "Roboto Flex",
      body: "Roboto",
      mono: "Roboto Mono"
    },
    examples: "Android apps, Google products, Material You"
  },
  {
    name: "iOS Native",
    tags: ["minimal", "light", "mobile", "native", "professional"],
    description: "Apple's Human Interface Guidelines. Clean, subtle, thumb-friendly for iOS apps.",
    colors: {
      background: "System background (oklch(0.98 0 0) or oklch(0.10 0 0))",
      surface: "Secondary system background",
      foreground: "Label color",
      accent: "System blue (oklch(0.50 0.15 250))",
      semantic: "System green, red, yellow, orange"
    },
    typography: {
      display: "SF Pro Display",
      body: "SF Pro Text",
      mono: "SF Mono"
    },
    examples: "iOS apps, Apple platforms, native iOS design"
  },
  {
    name: "Retro-Futuristic Gaming",
    tags: ["retro", "futuristic", "gaming", "dark", "vibrant", "energetic"],
    description: "Neon colors, grid patterns, 80s-inspired sci-fi aesthetic. High energy for gaming and entertainment.",
    colors: {
      background: "oklch(0.08 0.02 280)",
      surface: "oklch(0.12 0.02 280)",
      foreground: "oklch(0.95 0.01 280)",
      accent: "oklch(0.70 0.30 330)", // Neon pink
      secondary: "oklch(0.65 0.25 200)" // Cyan
    },
    typography: {
      display: "Orbitron",
      body: "Rajdhani",
      mono: "Share Tech Mono"
    },
    examples: "Cyberpunk games, retro gaming sites"
  },
  {
    name: "Neumorphic Soft UI",
    tags: ["neumorphism", "soft", "light", "minimal", "modern"],
    description: "Soft shadows and highlights create embossed 3D effect. Subtle and modern for productivity apps.",
    colors: {
      background: "oklch(0.93 0.01 240)",
      surface: "oklch(0.93 0.01 240)",
      foreground: "oklch(0.30 0.02 240)",
      accent: "oklch(0.60 0.15 250)",
      shadowLight: "oklch(1 0 0 / 0.8)",
      shadowDark: "oklch(0.70 0.02 240 / 0.3)"
    },
    typography: {
      display: "Poppins",
      body: "Inter Variable",
      mono: "IBM Plex Mono"
    },
    examples: "Soft UI designs, iOS apps, modern dashboards"
  },
  {
    name: "Y2K Maximalism",
    tags: ["maximalist", "colorful", "playful", "retro", "vibrant"],
    description: "Early 2000s internet aesthetics: gradients, metallic effects, vibrant colors. Bold and nostalgic.",
    colors: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      surface: "oklch(0.98 0.03 280)",
      foreground: "oklch(0.15 0.05 280)",
      accent: "oklch(0.65 0.30 340)", // Hot pink
      secondary: "oklch(0.70 0.25 200)", // Cyber blue
      tertiary: "oklch(0.75 0.28 120)" // Lime
    },
    typography: {
      display: "Fredoka One",
      body: "Rubik",
      mono: "VT323"
    },
    examples: "MySpace throwbacks, nostalgic apps, playful brands"
  },
  {
    name: "Swiss Minimalism",
    tags: ["minimal", "professional", "grid", "precise", "clean"],
    description: "Grid-based layouts, Helvetica-style typography, mathematical precision. Timeless and professional.",
    colors: {
      background: "oklch(1 0 0)",
      surface: "oklch(0.98 0 0)",
      foreground: "oklch(0.10 0 0)",
      accent: "oklch(0.55 0.20 250)", // Swiss blue
      grid: "oklch(0.90 0 0)"
    },
    typography: {
      display: "Helvetica Neue",
      body: "Helvetica Neue",
      mono: "Courier New"
    },
    examples: "Swiss design, corporate sites, minimalist portfolios"
  },
  {
    name: "Organic Nature-Inspired",
    tags: ["organic", "natural", "light", "calm", "sustainable"],
    description: "Earth tones, flowing curves, nature-inspired patterns. Perfect for wellness and eco brands.",
    colors: {
      background: "oklch(0.97 0.02 120)",
      surface: "oklch(0.95 0.03 120)",
      foreground: "oklch(0.25 0.05 120)",
      accent: "oklch(0.55 0.15 140)", // Forest green
      secondary: "oklch(0.65 0.12 80)" // Warm orange
    },
    typography: {
      display: "Recoleta",
      body: "Avenir Next",
      mono: "IBM Plex Mono"
    },
    examples: "Wellness apps, eco brands, organic products"
  },
  {
    name: "Crypto/Web3 Dark",
    tags: ["dark", "futuristic", "crypto", "vibrant", "tech"],
    description: "Deep blacks with electric accents, gradient borders, futuristic feel for crypto and Web3.",
    colors: {
      background: "oklch(0.05 0 0)",
      surface: "oklch(0.10 0.02 280)",
      foreground: "oklch(0.95 0.01 280)",
      accent: "linear-gradient(90deg, #00fff0, #a855f7)", // Gradient accent
      border: "linear-gradient(90deg, #00fff0 0%, #a855f7 100%)"
    },
    typography: {
      display: "Space Grotesk",
      body: "Inter Variable",
      mono: "Fira Code"
    },
    examples: "Crypto wallets, DeFi apps, NFT platforms"
  },
  {
    name: "Luxury E-commerce",
    tags: ["luxury", "elegant", "light", "ecommerce", "refined"],
    description: "Generous white space, elegant serif typography, subtle gold accents. High-end shopping experience.",
    colors: {
      background: "oklch(0.99 0 0)",
      surface: "oklch(0.97 0.01 60)",
      foreground: "oklch(0.15 0.01 60)",
      accent: "oklch(0.50 0.08 80)", // Subtle gold
      border: "oklch(0.92 0.01 60)"
    },
    typography: {
      display: "Canela",
      body: "Nib Pro",
      mono: "IBM Plex Mono"
    },
    examples: "Luxury fashion, jewelry, premium products"
  },
  {
    name: "Startup Energy",
    tags: ["vibrant", "energetic", "colorful", "startup", "modern"],
    description: "Bold gradients, energetic colors, optimistic feel. Perfect for young startups and innovative products.",
    colors: {
      background: "oklch(0.99 0.01 240)",
      surface: "oklch(0.97 0.02 240)",
      foreground: "oklch(0.15 0.02 240)",
      accent: "linear-gradient(135deg, #667eea 0%, #f093fb 100%)",
      secondary: "oklch(0.65 0.25 180)" // Teal
    },
    typography: {
      display: "Cal Sans",
      body: "Manrope",
      mono: "Fira Code"
    },
    examples: "Startup landing pages, innovative products, tech launches"
  },
  {
    name: "News/Editorial Dark",
    tags: ["editorial", "dark", "professional", "content", "serious"],
    description: "Dark mode optimized for long-form reading. Serif headlines, sans body, high readability.",
    colors: {
      background: "oklch(0.12 0.01 240)",
      surface: "oklch(0.18 0.01 240)",
      foreground: "oklch(0.92 0.01 240)",
      accent: "oklch(0.70 0.20 30)", // Accent red
      muted: "oklch(0.60 0.01 240)"
    },
    typography: {
      display: "Freight Display",
      body: "Georgia",
      mono: "Courier Prime"
    },
    examples: "News sites, dark mode blogs, editorial platforms"
  },
  {
    name: "Playful Children's App",
    tags: ["playful", "colorful", "rounded", "friendly", "kids"],
    description: "Bright primary colors, rounded shapes everywhere, fun illustrations. Designed for children.",
    colors: {
      background: "oklch(0.98 0.05 240)",
      surface: "oklch(0.95 0.08 240)",
      foreground: "oklch(0.20 0.05 240)",
      primary: "oklch(0.60 0.25 260)", // Blue
      secondary: "oklch(0.70 0.25 140)", // Green
      tertiary: "oklch(0.75 0.25 60)", // Yellow
      accent: "oklch(0.65 0.28 20)" // Red-orange
    },
    typography: {
      display: "Baloo 2",
      body: "Nunito",
      mono: "Space Mono"
    },
    examples: "Kids' apps, educational games, family apps"
  },
  {
    name: "Developer Tools Dark",
    tags: ["dark", "minimal", "professional", "developer", "code"],
    description: "VS Code inspired dark theme. Syntax highlighting colors, monospace fonts, developer-friendly.",
    colors: {
      background: "oklch(0.10 0.01 240)",
      surface: "oklch(0.14 0.01 240)",
      foreground: "oklch(0.88 0.01 240)",
      accent: "oklch(0.65 0.20 180)", // Teal (like function names)
      secondary: "oklch(0.70 0.20 300)", // Purple (like keywords)
      success: "oklch(0.70 0.18 140)", // Green
      warning: "oklch(0.75 0.20 80)", // Yellow
      error: "oklch(0.65 0.22 25)" // Red
    },
    typography: {
      display: "JetBrains Mono",
      body: "Inter Variable",
      mono: "JetBrains Mono"
    },
    examples: "Developer tools, code editors, technical documentation"
  },
  {
    name: "Social Media Light",
    tags: ["light", "colorful", "social", "friendly", "modern"],
    description: "Clean white interface with pops of color. Designed for social interaction and content sharing.",
    colors: {
      background: "oklch(1 0 0)",
      surface: "oklch(0.98 0 0)",
      foreground: "oklch(0.10 0 0)",
      primary: "oklch(0.50 0.20 250)", // Blue
      like: "oklch(0.60 0.25 20)", // Red/pink for likes
      share: "oklch(0.55 0.18 180)", // Teal for shares
      comment: "oklch(0.60 0.15 260)" // Purple for comments
    },
    typography: {
      display: "SF Pro Display",
      body: "SF Pro Text",
      mono: "SF Mono"
    },
    examples: "Social media apps, community platforms, content sharing"
  },
  {
    name: "Medical/Healthcare Professional",
    tags: ["professional", "trustworthy", "light", "healthcare", "accessible"],
    description: "High contrast, accessible, trustworthy design for medical and healthcare applications.",
    colors: {
      background: "oklch(0.98 0 0)",
      surface: "oklch(1 0 0)",
      foreground: "oklch(0.15 0 0)",
      primary: "oklch(0.45 0.15 240)", // Medical blue
      success: "oklch(0.60 0.18 145)", // Health green
      warning: "oklch(0.75 0.18 85)", // Caution yellow
      error: "oklch(0.60 0.22 25)", // Alert red
      border: "oklch(0.88 0 0)"
    },
    typography: {
      display: "Source Sans 3",
      body: "Source Sans 3",
      mono: "Source Code Pro"
    },
    examples: "Healthcare apps, medical records, telemedicine"
  },
  {
    name: "Banking/Finance Conservative",
    tags: ["professional", "trustworthy", "conservative", "fintech", "serious"],
    description: "Traditional banking aesthetics updated for digital. Deep blues, trust-building design.",
    colors: {
      background: "oklch(0.98 0.01 240)",
      surface: "oklch(1 0 0)",
      foreground: "oklch(0.12 0.02 240)",
      primary: "oklch(0.30 0.12 250)", // Navy blue
      accent: "oklch(0.70 0.15 80)", // Gold
      success: "oklch(0.55 0.15 145)",
      error: "oklch(0.50 0.20 25)",
      border: "oklch(0.88 0.01 240)"
    },
    typography: {
      display: "Merriweather",
      body: "Lato",
      mono: "Roboto Mono"
    },
    examples: "Banks, financial institutions, insurance"
  },
  {
    name: "E-learning Platform",
    tags: ["educational", "friendly", "colorful", "accessible", "modern"],
    description: "Approachable design for learning platforms. Clear hierarchy, motivating colors, progress indicators.",
    colors: {
      background: "oklch(0.98 0.02 240)",
      surface: "oklch(1 0 0)",
      foreground: "oklch(0.18 0.02 240)",
      primary: "oklch(0.55 0.20 260)", // Learning blue
      success: "oklch(0.65 0.18 145)", // Achievement green
      progress: "oklch(0.70 0.22 280)", // Progress purple
      warning: "oklch(0.75 0.20 80)"
    },
    typography: {
      display: "Lexend",
      body: "Lexend Deca",
      mono: "Fira Code"
    },
    examples: "Coursera, Udemy, Khan Academy"
  },
  {
    name: "Travel & Hospitality",
    tags: ["vibrant", "imagery-focused", "inspiring", "colorful", "friendly"],
    description: "Image-first design with vibrant colors. Emphasizes beautiful photography and wanderlust.",
    colors: {
      background: "oklch(0.99 0.01 240)",
      surface: "oklch(0.97 0.02 240)",
      foreground: "oklch(0.15 0.02 240)",
      primary: "oklch(0.50 0.22 200)", // Ocean blue
      accent: "oklch(0.65 0.25 40)", // Sunset orange
      secondary: "oklch(0.70 0.20 160)" // Tropical teal
    },
    typography: {
      display: "Philosopher",
      body: "Nunito Sans",
      mono: "Courier Prime"
    },
    examples: "Airbnb, Booking.com, travel blogs"
  },
  {
    name: "Food & Restaurant",
    tags: ["imagery-focused", "warm", "inviting", "ecommerce", "colorful"],
    description: "Appetizing color palette, beautiful food photography, warm and inviting atmosphere.",
    colors: {
      background: "oklch(0.97 0.02 60)",
      surface: "oklch(0.99 0.01 60)",
      foreground: "oklch(0.20 0.03 60)",
      primary: "oklch(0.55 0.18 40)", // Warm red
      accent: "oklch(0.70 0.22 80)", // Golden
      success: "oklch(0.60 0.15 145)"
    },
    typography: {
      display: "Bebas Neue",
      body: "Lato",
      mono: "Courier Prime"
    },
    examples: "Restaurant sites, food delivery, recipe apps"
  },
  {
    name: "Fitness & Sports",
    tags: ["energetic", "bold", "motivating", "vibrant", "dynamic"],
    description: "High-energy design with bold colors and dynamic layouts. Motivating and action-oriented.",
    colors: {
      background: "oklch(0.08 0.02 240)",
      surface: "oklch(0.12 0.02 240)",
      foreground: "oklch(0.95 0.01 240)",
      primary: "oklch(0.60 0.28 140)", // Energy green
      accent: "oklch(0.70 0.30 30)", // Fire red
      secondary: "oklch(0.65 0.25 200)" // Electric blue
    },
    typography: {
      display: "Bebas Neue",
      body: "Barlow",
      mono: "Roboto Mono"
    },
    examples: "Fitness apps, sports brands, workout trackers"
  },
  {
    name: "Music & Audio Platform",
    tags: ["dark", "vibrant", "entertainment", "immersive", "modern"],
    description: "Album art-focused design with vibrant accent colors. Immersive experience for music platforms.",
    colors: {
      background: "oklch(0.08 0.01 0)",
      surface: "oklch(0.12 0.01 0)",
      foreground: "oklch(0.95 0 0)",
      primary: "oklch(0.65 0.25 145)", // Spotify green
      accent: "oklch(0.70 0.28 330)", // Accent pink
      playing: "oklch(0.70 0.30 200)" // Now playing cyan
    },
    typography: {
      display: "Montserrat",
      body: "Circular Std",
      mono: "Space Mono"
    },
    examples: "Spotify, Apple Music, SoundCloud"
  },
  {
    name: "Productivity Power User",
    tags: ["minimal", "professional", "efficient", "dark", "productivity"],
    description: "Keyboard-first design for power users. Minimal chrome, maximum content, efficient workflows.",
    colors: {
      background: "oklch(0.10 0.01 240)",
      surface: "oklch(0.14 0.01 240)",
      foreground: "oklch(0.90 0.01 240)",
      primary: "oklch(0.55 0.18 260)",
      accent: "oklch(0.65 0.20 180)", // Productivity teal
      muted: "oklch(0.50 0.01 240)"
    },
    typography: {
      display: "Inter Variable",
      body: "Inter Variable",
      mono: "JetBrains Mono"
    },
    examples: "Notion, Obsidian, Linear, Height"
  }
];

// UI Patterns with Figma Properties
export const UI_PATTERNS = {
  navigation: {
    description: "Navigation patterns for different layouts",
    structure: {
      horizontal: {
        type: "frame",
        layout: "horizontal",
        height: 64,
        padding: [0, 24],
        gap: 32,
        verticalAlign: "center",
        children: ["logo", "nav-links", "actions"]
      },
      sidebar: {
        type: "frame",
        layout: "vertical",
        width: 260,
        height: "fill_container",
        padding: 16,
        gap: 8
      }
    },
    variants: {
      "with-search": "Include search bar in center",
      "with-user-menu": "Include avatar dropdown on right",
      "sticky": "Fixed position on scroll"
    }
  },
  hero: {
    description: "Hero section patterns",
    structure: {
      type: "frame",
      layout: "vertical",
      minHeight: 600,
      padding: [80, 24],
      gap: 32,
      verticalAlign: "center",
      children: ["headline", "description", "cta-group"]
    },
    variants: {
      "split": "Image on left/right, content opposite",
      "centered": "All content centered",
      "video-background": "Background video with overlay"
    }
  },
  card: {
    description: "Card component patterns",
    structure: {
      type: "frame",
      layout: "vertical",
      width: 320,
      height: "hug_contents",
      padding: 24,
      gap: 16,
      cornerRadius: 12,
      fill: "surface",
      stroke: "border"
    },
    variants: {
      "with-image": "Image at top, content below",
      "horizontal": "Image left, content right",
      "hoverable": "Elevation increase on hover"
    }
  },
  form: {
    description: "Form layout patterns",
    structure: {
      type: "frame",
      layout: "vertical",
      width: 480,
      padding: 32,
      gap: 24,
      cornerRadius: 12
    },
    variants: {
      "single-column": "Stacked fields, mobile-friendly",
      "two-column": "Side-by-side fields for desktop",
      "wizard": "Multi-step form with progress indicator"
    }
  },
  modal: {
    description: "Modal dialog patterns",
    structure: {
      type: "frame",
      layout: "vertical",
      width: 480,
      padding: 32,
      gap: 24,
      cornerRadius: 16,
      fill: "surface"
    },
    variants: {
      "centered": "Center of screen with backdrop",
      "slide-over": "Slides from right side",
      "full-screen": "Takes full viewport on mobile"
    }
  },
  sidebar: {
    description: "Application sidebar patterns",
    structure: {
      type: "frame",
      layout: "vertical",
      width: 260,
      height: "fill_container",
      padding: 16,
      gap: 8,
      fill: "surface"
    },
    variants: {
      "collapsible": "Can collapse to icon-only",
      "with-sections": "Grouped navigation items",
      "floating": "Elevated with rounded corners"
    }
  },
  footer: {
    description: "Page footer patterns",
    structure: {
      type: "frame",
      layout: "vertical",
      width: "fill_container",
      padding: [64, 24],
      gap: 48
    },
    variants: {
      "minimal": "Logo + links + copyright",
      "multi-column": "4-column layout with sections",
      "newsletter": "Includes email signup form"
    }
  },
  cta: {
    description: "Call-to-action section patterns",
    structure: {
      type: "frame",
      layout: "vertical",
      width: "fill_container",
      padding: [80, 24],
      gap: 32,
      verticalAlign: "center",
      horizontalAlign: "center"
    },
    variants: {
      "centered": "Centered text with button",
      "split": "Text left, image/visual right",
      "banner": "Full-width banner with background"
    }
  },
  pricing: {
    description: "Pricing table patterns",
    structure: {
      type: "frame",
      layout: "horizontal",
      gap: 24,
      padding: [64, 24]
    },
    variants: {
      "three-tier": "Free, Pro, Enterprise columns",
      "comparison": "Feature comparison table",
      "toggle": "Monthly/Annual toggle"
    }
  },
  testimonial: {
    description: "Testimonial section patterns",
    structure: {
      type: "frame",
      layout: "horizontal",
      gap: 32,
      padding: [64, 24]
    },
    variants: {
      "cards": "Individual testimonial cards",
      "carousel": "Rotating testimonials",
      "wall": "Grid of logos + quotes"
    }
  },
  "feature-grid": {
    description: "Feature showcase patterns",
    structure: {
      type: "frame",
      layout: "grid",
      columns: 3,
      gap: 32,
      padding: [64, 24]
    },
    variants: {
      "icon-cards": "Icon + title + description cards",
      "image-cards": "Screenshot + description",
      "list": "Simple vertical list"
    }
  },
  stats: {
    description: "Statistics display patterns",
    structure: {
      type: "frame",
      layout: "horizontal",
      gap: 48,
      padding: [64, 24],
      horizontalAlign: "space-around"
    },
    variants: {
      "large-numbers": "Big numbers with labels",
      "cards": "Stat cards with icons",
      "inline": "Inline stats in sentence"
    }
  },
  timeline: {
    description: "Timeline component patterns",
    structure: {
      type: "frame",
      layout: "vertical",
      gap: 32,
      padding: 24
    },
    variants: {
      "vertical": "Vertical timeline with dots",
      "horizontal": "Horizontal progress steps",
      "zigzag": "Alternating left-right"
    }
  },
  table: {
    description: "Data table patterns",
    structure: {
      type: "frame",
      layout: "vertical",
      width: "fill_container",
      gap: 0
    },
    variants: {
      "striped": "Alternating row colors",
      "bordered": "Bordered cells",
      "hoverable": "Row highlight on hover",
      "sortable": "Sortable columns",
      "with-actions": "Action buttons per row"
    }
  }
};

// Component Templates with Figma Properties
export const COMPONENT_TEMPLATES: Record<string, any> = {
  button: {
    description: "Button component with variants",
    base: {
      type: "frame",
      layout: "horizontal",
      width: "hug_contents",
      height: 44,
      padding: [0, 24],
      gap: 8,
      cornerRadius: 8,
      horizontalAlign: "center",
      verticalAlign: "center"
    },
    variants: {
      primary: {
        fill: "primary",
        textFill: "primary-foreground"
      },
      secondary: {
        fill: "secondary",
        textFill: "secondary-foreground"
      },
      ghost: {
        fill: "transparent",
        stroke: "border",
        textFill: "foreground"
      },
      sm: {
        height: 36,
        padding: [0, 16],
        fontSize: 14
      },
      lg: {
        height: 52,
        padding: [0, 32],
        fontSize: 18
      }
    }
  },
  input: {
    description: "Input field component",
    base: {
      type: "frame",
      layout: "horizontal",
      width: "fill_container",
      height: 44,
      padding: [0, 16],
      cornerRadius: 8,
      fill: "surface",
      stroke: "border",
      verticalAlign: "center"
    },
    variants: {
      error: {
        stroke: "error",
        strokeWidth: 2
      },
      disabled: {
        opacity: 0.5,
        fill: "muted"
      }
    }
  },
  card: {
    description: "Card container component",
    base: {
      type: "frame",
      layout: "vertical",
      width: 320,
      padding: 24,
      gap: 16,
      cornerRadius: 12,
      fill: "surface",
      stroke: "border"
    },
    variants: {
      elevated: {
        shadow: "0 4px 12px oklch(0 0 0 / 0.08)",
        stroke: null
      },
      outlined: {
        strokeWidth: 2
      }
    }
  },
  badge: {
    description: "Badge/pill component for status and labels",
    base: {
      type: "frame",
      layout: "horizontal",
      width: "hug_contents",
      height: 24,
      padding: [0, 12],
      cornerRadius: 12,
      horizontalAlign: "center",
      verticalAlign: "center"
    },
    variants: {
      primary: {
        fill: "primary",
        textFill: "primary-foreground",
        fontSize: 12
      },
      success: {
        fill: "success/10",
        textFill: "success",
        fontSize: 12
      },
      warning: {
        fill: "warning/10",
        textFill: "warning",
        fontSize: 12
      },
      error: {
        fill: "error/10",
        textFill: "error",
        fontSize: 12
      },
      outline: {
        fill: "transparent",
        stroke: "border",
        strokeWidth: 1,
        fontSize: 12
      }
    }
  },
  avatar: {
    description: "User avatar component",
    base: {
      type: "frame",
      width: 40,
      height: 40,
      cornerRadius: 9999,
      fill: "muted",
      horizontalAlign: "center",
      verticalAlign: "center"
    },
    variants: {
      sm: { width: 32, height: 32 },
      md: { width: 40, height: 40 },
      lg: { width: 48, height: 48 },
      xl: { width: 64, height: 64 },
      withBorder: {
        stroke: "border",
        strokeWidth: 2
      }
    }
  },
  checkbox: {
    description: "Checkbox input component",
    base: {
      type: "frame",
      width: 20,
      height: 20,
      cornerRadius: 4,
      fill: "surface",
      stroke: "border",
      strokeWidth: 2
    },
    variants: {
      checked: {
        fill: "primary",
        stroke: "primary"
      },
      disabled: {
        opacity: 0.5,
        fill: "muted"
      }
    }
  },
  radio: {
    description: "Radio button component",
    base: {
      type: "frame",
      width: 20,
      height: 20,
      cornerRadius: 9999,
      fill: "surface",
      stroke: "border",
      strokeWidth: 2
    },
    variants: {
      selected: {
        fill: "primary",
        stroke: "primary",
        innerDot: {
          width: 8,
          height: 8,
          fill: "white"
        }
      }
    }
  },
  switch: {
    description: "Toggle switch component",
    base: {
      type: "frame",
      layout: "horizontal",
      width: 44,
      height: 24,
      cornerRadius: 12,
      fill: "muted",
      padding: 2
    },
    variants: {
      on: {
        fill: "primary",
        thumbPosition: "right"
      },
      off: {
        fill: "muted",
        thumbPosition: "left"
      }
    }
  },
  select: {
    description: "Dropdown select component",
    base: {
      type: "frame",
      layout: "horizontal",
      width: "fill_container",
      height: 44,
      padding: [0, 16],
      cornerRadius: 8,
      fill: "surface",
      stroke: "border",
      horizontalAlign: "space_between",
      verticalAlign: "center"
    },
    variants: {
      open: {
        stroke: "primary",
        strokeWidth: 2
      },
      disabled: {
        opacity: 0.5,
        fill: "muted"
      }
    }
  },
  slider: {
    description: "Range slider component",
    base: {
      type: "frame",
      layout: "horizontal",
      width: "fill_container",
      height: 4,
      cornerRadius: 2,
      fill: "muted"
    },
    variants: {
      withThumb: {
        thumbWidth: 20,
        thumbHeight: 20,
        thumbRadius: 9999,
        thumbFill: "primary"
      },
      withLabels: {
        showMinMax: true,
        showValue: true
      }
    }
  },
  progress: {
    description: "Progress bar component",
    base: {
      type: "frame",
      layout: "horizontal",
      width: "fill_container",
      height: 8,
      cornerRadius: 4,
      fill: "muted"
    },
    variants: {
      determinate: {
        indicatorFill: "primary",
        showPercentage: true
      },
      indeterminate: {
        animated: true,
        indicatorFill: "primary"
      },
      circular: {
        type: "circle",
        width: 40,
        height: 40
      }
    }
  },
  tooltip: {
    description: "Tooltip component",
    base: {
      type: "frame",
      layout: "horizontal",
      width: "hug_contents",
      height: "hug_contents",
      padding: [8, 12],
      cornerRadius: 6,
      fill: "foreground",
      shadow: "0 2px 8px oklch(0 0 0 / 0.15)"
    },
    variants: {
      top: { arrowDirection: "down" },
      bottom: { arrowDirection: "up" },
      left: { arrowDirection: "right" },
      right: { arrowDirection: "left" }
    }
  },
  dropdown: {
    description: "Dropdown menu component",
    base: {
      type: "frame",
      layout: "vertical",
      width: 220,
      padding: 8,
      gap: 2,
      cornerRadius: 8,
      fill: "surface",
      stroke: "border",
      shadow: "0 4px 12px oklch(0 0 0 / 0.1)"
    },
    variants: {
      withIcons: {
        itemLayout: "horizontal",
        iconSize: 16,
        gap: 12
      },
      withSections: {
        hasDividers: true,
        sectionPadding: 8
      }
    }
  }
};
