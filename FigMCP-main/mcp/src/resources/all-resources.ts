import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../task-manager.js";

// ============================================
// FRAMEWORK RESOURCES (12)
// ============================================
const FRAMEWORK_RESOURCES = {
  react: {
    name: "React Patterns",
    version: "18+",
    patterns: {
      components: ["Functional components with hooks", "Server Components", "Client Components"],
      stateManagement: ["useState", "useReducer", "Context API", "Zustand", "Jotai"],
      dataFetching: ["React Query", "SWR", "Server Actions", "use()"],
      forms: ["React Hook Form", "Formik", "useActionState"],
      styling: ["CSS Modules", "Tailwind CSS", "styled-components", "emotion"],
    },
    bestPractices: [
      "Prefer Server Components for data fetching",
      "Use 'use client' only when needed",
      "Colocate related code",
      "Use composition over inheritance",
    ],
  },
  nextjs: {
    name: "Next.js Patterns",
    version: "14+",
    features: {
      routing: ["App Router", "Route Groups", "Parallel Routes", "Intercepting Routes"],
      rendering: ["SSR", "SSG", "ISR", "Streaming"],
      dataFetching: ["Server Components", "Server Actions", "Route Handlers"],
      caching: ["fetch cache", "Data Cache", "Full Route Cache", "Router Cache"],
    },
    fileConventions: {
      "page.tsx": "Route UI",
      "layout.tsx": "Shared layout",
      "loading.tsx": "Loading UI",
      "error.tsx": "Error boundary",
      "not-found.tsx": "404 page",
    },
  },
  vue: {
    name: "Vue 3 Patterns",
    version: "3.4+",
    features: {
      composition: ["Composition API", "script setup", "defineProps", "defineEmits"],
      reactivity: ["ref", "reactive", "computed", "watch", "watchEffect"],
      components: ["SFCs", "Async Components", "Teleport", "Suspense"],
    },
    stateManagement: ["Pinia", "Composables"],
  },
  angular: {
    name: "Angular Patterns",
    version: "17+",
    features: {
      signals: ["signal()", "computed()", "effect()"],
      components: ["Standalone components", "Control flow", "Deferred loading"],
      routing: ["Lazy loading", "Guards", "Resolvers"],
    },
  },
  svelte: {
    name: "Svelte/SvelteKit",
    version: "5+",
    features: {
      runes: ["$state", "$derived", "$effect", "$props"],
      rendering: ["SSR", "Prerendering", "Streaming"],
      routing: ["File-based routing", "+page.svelte", "+layout.svelte"],
    },
  },
  reactNative: {
    name: "React Native Patterns",
    features: {
      navigation: ["React Navigation", "Expo Router"],
      styling: ["StyleSheet", "NativeWind", "Tamagui"],
      state: ["React Query", "Zustand", "MMKV"],
    },
  },
  flutter: {
    name: "Flutter Patterns",
    features: {
      architecture: ["BLoC", "Provider", "Riverpod", "GetX"],
      widgets: ["Stateless", "Stateful", "Inherited"],
      navigation: ["Navigator 2.0", "go_router"],
    },
  },
  tailwind: {
    name: "Tailwind CSS",
    version: "4.0",
    features: {
      configuration: ["CSS-first config", "@theme directive", "Design tokens"],
      utilities: ["Container queries", "Cascade layers", "Modern colors"],
      components: ["@apply", "Components layer", "Utilities layer"],
    },
    classPatterns: {
      spacing: "p-{n}, m-{n}, gap-{n}",
      colors: "bg-{color}-{shade}, text-{color}-{shade}",
      layout: "flex, grid, container",
      responsive: "sm:, md:, lg:, xl:, 2xl:",
    },
  },
  cssModules: {
    name: "CSS Modules",
    patterns: {
      naming: "camelCase for classes",
      composition: "composes: className",
      variables: "CSS custom properties",
    },
  },
  styledComponents: {
    name: "Styled Components",
    patterns: {
      basic: "styled.div``",
      extending: "styled(Component)``",
      theming: "ThemeProvider, useTheme",
      dynamic: "${props => props.variant}",
    },
  },
  motionReact: {
    name: "Motion (Framer Motion)",
    patterns: {
      basic: ["motion.div", "initial", "animate", "exit"],
      gestures: ["whileHover", "whileTap", "whileDrag"],
      layout: ["layout", "layoutId", "AnimatePresence"],
      scroll: ["useScroll", "useInView", "useSpring"],
    },
  },
  radix: {
    name: "Radix Primitives",
    components: [
      "Dialog", "Dropdown", "Popover", "Tooltip", "Tabs",
      "Accordion", "Select", "Slider", "Switch", "Checkbox",
    ],
    patterns: {
      composition: "Root, Trigger, Content pattern",
      styling: "Unstyled, bring your own styles",
      accessibility: "ARIA patterns built-in",
    },
  },
};

// ============================================
// DESIGN REFERENCE RESOURCES (15)
// ============================================
const DESIGN_REFERENCES = {
  colorPalettesModern: {
    name: "Modern Color Palettes",
    palettes: [
      { name: "Ocean Depth", colors: ["#0D1B2A", "#1B263B", "#415A77", "#778DA9", "#E0E1DD"] },
      { name: "Sunset Gradient", colors: ["#FF6B6B", "#FEC89A", "#FFD93D", "#6BCB77", "#4D96FF"] },
      { name: "Neutral Pro", colors: ["#09090B", "#18181B", "#27272A", "#3F3F46", "#71717A", "#A1A1AA", "#D4D4D8", "#F4F4F5"] },
      { name: "Purple Haze", colors: ["#1A1A2E", "#16213E", "#0F3460", "#533483", "#E94560"] },
      { name: "Forest", colors: ["#1B4332", "#2D6A4F", "#40916C", "#52B788", "#74C69D", "#95D5B2"] },
    ],
  },
  colorPalettesMinimal: {
    name: "Minimal Palettes",
    palettes: [
      { name: "Monochrome", colors: ["#000000", "#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF"] },
      { name: "Warm Gray", colors: ["#1C1917", "#292524", "#44403C", "#78716C", "#A8A29E", "#D6D3D1"] },
      { name: "Cool Gray", colors: ["#111827", "#1F2937", "#374151", "#6B7280", "#9CA3AF", "#E5E7EB"] },
    ],
  },
  colorPalettesVibrant: {
    name: "Vibrant Palettes",
    palettes: [
      { name: "Neon", colors: ["#FF00FF", "#00FFFF", "#FF00AA", "#AAFF00", "#00FF00"] },
      { name: "Candy", colors: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#F38181"] },
      { name: "Electric", colors: ["#7400B8", "#6930C3", "#5E60CE", "#5390D9", "#4EA8DE", "#48BFE3"] },
    ],
  },
  typographyScales: {
    name: "Typography Scales",
    scales: {
      minor_second: { ratio: 1.067, values: [12, 12.8, 13.7, 14.6, 15.6, 16.6, 17.7] },
      major_second: { ratio: 1.125, values: [12, 13.5, 15.2, 17.1, 19.2, 21.6, 24.3] },
      minor_third: { ratio: 1.2, values: [12, 14.4, 17.3, 20.7, 24.9, 29.9, 35.8] },
      major_third: { ratio: 1.25, values: [12, 15, 18.75, 23.4, 29.3, 36.6, 45.8] },
      perfect_fourth: { ratio: 1.333, values: [12, 16, 21.3, 28.4, 37.9, 50.5, 67.3] },
      golden_ratio: { ratio: 1.618, values: [12, 19.4, 31.4, 50.8, 82.2, 133] },
    },
  },
  typographyPairings: {
    name: "Font Pairings",
    pairings: [
      { heading: "Playfair Display", body: "Source Sans Pro", style: "Classic Elegance" },
      { heading: "Montserrat", body: "Merriweather", style: "Modern Professional" },
      { heading: "Oswald", body: "Lato", style: "Bold & Clean" },
      { heading: "Poppins", body: "Roboto", style: "Friendly Modern" },
      { heading: "DM Serif Display", body: "DM Sans", style: "Contemporary" },
      { heading: "Inter", body: "Inter", style: "Unified System" },
      { heading: "Clash Display", body: "Satoshi", style: "Geometric Modern" },
      { heading: "Cabinet Grotesk", body: "General Sans", style: "Tech Startup" },
    ],
  },
  spacingSystems: {
    name: "Spacing Systems",
    systems: {
      "4pt-grid": { base: 4, scale: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96] },
      "8pt-grid": { base: 8, scale: [8, 16, 24, 32, 48, 64, 96, 128] },
      tailwind: { base: 4, scale: { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64, 20: 80, 24: 96 } },
    },
  },
  shadowSystems: {
    name: "Shadow/Elevation Systems",
    systems: {
      material: [
        { level: 0, shadow: "none" },
        { level: 1, shadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)" },
        { level: 2, shadow: "0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)" },
        { level: 3, shadow: "0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)" },
        { level: 4, shadow: "0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)" },
        { level: 5, shadow: "0 20px 40px rgba(0,0,0,0.2)" },
      ],
      soft: [
        { name: "sm", shadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
        { name: "md", shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" },
        { name: "lg", shadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" },
        { name: "xl", shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" },
      ],
    },
  },
  radiusSystems: {
    name: "Border Radius Systems",
    systems: {
      sharp: { none: 0, sm: 2, md: 4, lg: 6, xl: 8 },
      rounded: { none: 0, sm: 4, md: 8, lg: 12, xl: 16, "2xl": 24 },
      pill: { none: 0, sm: 6, md: 12, lg: 16, xl: 24, full: 9999 },
    },
  },
  iconLibraries: {
    name: "Icon Libraries",
    libraries: [
      { name: "Lucide", style: "outline", count: "1400+", url: "https://lucide.dev" },
      { name: "Heroicons", style: "outline/solid", count: "450+", url: "https://heroicons.com" },
      { name: "Phosphor", style: "6 weights", count: "9000+", url: "https://phosphoricons.com" },
      { name: "Tabler Icons", style: "outline", count: "4500+", url: "https://tabler-icons.io" },
      { name: "Radix Icons", style: "outline", count: "300+", url: "https://icons.radix-ui.com" },
    ],
  },
  illustrationStyles: {
    name: "Illustration Styles",
    styles: [
      { name: "Flat", characteristics: ["No shadows", "Bold colors", "Simple shapes"] },
      { name: "Isometric", characteristics: ["30-degree angles", "3D perspective", "Technical feel"] },
      { name: "Hand-drawn", characteristics: ["Organic lines", "Imperfect shapes", "Warm feel"] },
      { name: "3D", characteristics: ["Depth", "Lighting", "Materials"] },
      { name: "Line Art", characteristics: ["Minimal", "Single weight", "Clean"] },
      { name: "Duotone", characteristics: ["Two colors", "High contrast", "Modern"] },
    ],
  },
  animationCurves: {
    name: "Animation Easing Curves",
    easings: {
      linear: "cubic-bezier(0, 0, 1, 1)",
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      easeIn: "cubic-bezier(0.42, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.58, 1)",
      easeInOut: "cubic-bezier(0.42, 0, 0.58, 1)",
      spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
    durations: {
      instant: "100ms",
      fast: "150ms",
      normal: "250ms",
      slow: "350ms",
      slower: "500ms",
    },
  },
  gridSystems: {
    name: "Grid Systems",
    systems: {
      "12-column": { columns: 12, gutter: 24, margin: 24 },
      "16-column": { columns: 16, gutter: 16, margin: 16 },
      modular: { columns: "variable", rows: "baseline grid" },
    },
  },
  breakpointSystems: {
    name: "Responsive Breakpoints",
    systems: {
      tailwind: { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 },
      bootstrap: { sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 },
      material: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 },
    },
  },
  aspectRatios: {
    name: "Common Aspect Ratios",
    ratios: {
      "1:1": { width: 1, height: 1, use: "Square, avatars, icons" },
      "4:3": { width: 4, height: 3, use: "Classic photos, presentations" },
      "16:9": { width: 16, height: 9, use: "Video, widescreen" },
      "21:9": { width: 21, height: 9, use: "Ultra-wide, cinematic" },
      "3:2": { width: 3, height: 2, use: "Photography" },
      "2:3": { width: 2, height: 3, use: "Portrait photos, cards" },
      "9:16": { width: 9, height: 16, use: "Mobile, stories" },
    },
  },
  goldenRatioGuides: {
    name: "Golden Ratio",
    ratio: 1.618,
    applications: {
      layout: "Divide sections in 1:1.618 ratio",
      typography: "Use 1.618 as type scale multiplier",
      spacing: "Golden ratio for margin/padding relationships",
      composition: "Place focal points at golden ratio intersections",
    },
    fibonacci: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
  },
};

// ============================================
// CODE SNIPPET RESOURCES (12)
// ============================================
const CODE_SNIPPETS = {
  componentButton: {
    name: "Button Component",
    react: `interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? <Spinner /> : children}
      </button>
    );
  }
);`,
    tailwind: "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  },
  componentInput: {
    name: "Input Component",
    react: `interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    const id = useId();
    return (
      <div className="space-y-1.5">
        {label && <label htmlFor={id} className="text-sm font-medium">{label}</label>}
        <input
          ref={ref}
          id={id}
          className={cn("w-full rounded-md border px-3 py-2", error && "border-red-500", className)}
          aria-invalid={!!error}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);`,
  },
  componentModal: {
    name: "Modal Component",
    pattern: "Dialog with overlay, focus trap, and keyboard handling",
    react: `function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
      const handleEscape = (e) => e.key === 'Escape' && onClose();
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div ref={modalRef} role="dialog" aria-modal tabIndex={-1} className="relative z-50 bg-white rounded-lg p-6">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}`,
  },
  componentDropdown: {
    name: "Dropdown Component",
    pattern: "Trigger + floating content with outside click handling",
  },
  componentTabs: {
    name: "Tabs Component",
    pattern: "TabList + TabPanels with ARIA support",
    ariaPattern: "role=tablist, role=tab, aria-selected, role=tabpanel",
  },
  componentTable: {
    name: "Data Table",
    features: ["Sorting", "Filtering", "Pagination", "Row selection"],
    pattern: "Composable table with header, body, and footer",
  },
  hooksCommon: {
    name: "Common React Hooks",
    hooks: {
      useLocalStorage: "Persist state to localStorage",
      useDebounce: "Debounce value updates",
      useMediaQuery: "Responsive breakpoint detection",
      useOnClickOutside: "Detect clicks outside element",
      useIntersectionObserver: "Lazy loading and animations",
      useCopyToClipboard: "Copy text to clipboard",
    },
  },
  utilitiesCommon: {
    name: "Utility Functions",
    utilities: {
      cn: "Merge class names (clsx + tailwind-merge)",
      formatDate: "Date formatting with Intl.DateTimeFormat",
      formatCurrency: "Currency formatting with Intl.NumberFormat",
      debounce: "Debounce function calls",
      throttle: "Throttle function calls",
      deepClone: "Deep clone objects",
    },
  },
  animationsCss: {
    name: "CSS Animations",
    animations: {
      fadeIn: "@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }",
      slideUp: "@keyframes slideUp { from { transform: translateY(10px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }",
      scaleIn: "@keyframes scaleIn { from { transform: scale(0.95); opacity: 0 } to { transform: scale(1); opacity: 1 } }",
      spin: "@keyframes spin { to { transform: rotate(360deg) } }",
      pulse: "@keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.5 } }",
    },
  },
  animationsMotion: {
    name: "Motion Animations",
    variants: {
      fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
      slideUp: { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } },
      staggerChildren: { animate: { transition: { staggerChildren: 0.1 } } },
    },
  },
  layoutsCommon: {
    name: "Layout Patterns",
    layouts: {
      container: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
      stack: "flex flex-col gap-{n}",
      cluster: "flex flex-wrap gap-{n}",
      sidebar: "grid grid-cols-[240px_1fr]",
      holyGrail: "grid grid-rows-[auto_1fr_auto] min-h-screen",
    },
  },
  formsValidation: {
    name: "Form Validation",
    zod: {
      email: "z.string().email()",
      password: "z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/)",
      required: "z.string().min(1, 'Required')",
      optional: "z.string().optional()",
      array: "z.array(z.string())",
    },
    reactHookForm: "useForm({ resolver: zodResolver(schema) })",
  },
};

// ============================================
// GUIDELINE RESOURCES (15)
// ============================================
const GUIDELINES = {
  uxWriting: {
    name: "UX Writing Guidelines",
    principles: [
      "Be concise - every word should earn its place",
      "Be clear - avoid jargon and ambiguity",
      "Be helpful - guide users to success",
      "Be human - write like you speak",
    ],
    patterns: {
      buttons: "Use action verbs: 'Save', 'Delete', 'Send'",
      errors: "Explain what happened and how to fix it",
      emptyStates: "Guide users to take action",
      confirmations: "Be specific about what will happen",
      loading: "Set expectations with progress indicators",
    },
    avoid: ["Click here", "Submit", "Invalid input", "Error occurred", "Please wait"],
  },
  accessibility: {
    name: "Accessibility Best Practices",
    wcag: {
      perceivable: ["Text alternatives", "Captions", "Color contrast", "Resize text"],
      operable: ["Keyboard accessible", "No time limits", "No seizures", "Navigable"],
      understandable: ["Readable", "Predictable", "Input assistance"],
      robust: ["Compatible with assistive technologies"],
    },
    quickWins: [
      "Minimum contrast ratio: 4.5:1 for text",
      "Touch targets: 44x44px minimum",
      "Focus indicators on all interactive elements",
      "Alt text for all meaningful images",
      "Form labels for all inputs",
      "Heading hierarchy (h1 → h2 → h3)",
    ],
  },
  performance: {
    name: "Performance Guidelines",
    coreWebVitals: {
      LCP: { good: "≤2.5s", poor: ">4s", tip: "Optimize largest image/text block" },
      INP: { good: "≤200ms", poor: ">500ms", tip: "Break up long tasks" },
      CLS: { good: "≤0.1", poor: ">0.25", tip: "Reserve space for dynamic content" },
    },
    optimizations: [
      "Lazy load below-fold images",
      "Use appropriate image formats (WebP, AVIF)",
      "Minimize JavaScript bundle size",
      "Use skeleton loading states",
      "Implement proper caching",
    ],
  },
  responsive: {
    name: "Responsive Design Guide",
    approach: "Mobile-first",
    breakpoints: {
      mobile: "320-639px",
      tablet: "640-1023px",
      desktop: "1024px+",
    },
    patterns: [
      "Stack on mobile, grid on desktop",
      "Hide secondary navigation on mobile",
      "Use bottom sheet instead of modal on mobile",
      "Increase touch targets on mobile",
      "Adjust typography scale for device",
    ],
  },
  darkMode: {
    name: "Dark Mode Implementation",
    principles: [
      "Don't just invert colors",
      "Reduce contrast for large surfaces",
      "Use semantic color tokens",
      "Test with real content",
    ],
    colors: {
      background: "Use dark grays, not pure black",
      surface: "Lighter than background for elevation",
      text: "Slightly off-white for reduced eye strain",
      accent: "May need brightness adjustment",
    },
  },
  i18n: {
    name: "Internationalization Guide",
    considerations: [
      "Text expansion (German can be 30% longer)",
      "RTL language support",
      "Date/time/number formatting",
      "Currency display",
      "Avoid text in images",
      "Use pluralization properly",
    ],
  },
  errorHandling: {
    name: "Error State Design",
    levels: {
      field: "Inline validation next to input",
      form: "Summary at top of form",
      page: "Full page error state",
      toast: "Non-blocking notification",
    },
    content: {
      what: "What went wrong",
      why: "Why it happened (if helpful)",
      how: "How to fix it",
      action: "Clear next step",
    },
  },
  emptyStates: {
    name: "Empty State Design",
    types: {
      noData: "No content yet - encourage creation",
      noResults: "Search/filter returned nothing - suggest alternatives",
      error: "Something went wrong - offer recovery",
      success: "Task completed - suggest next action",
    },
    components: ["Illustration (optional)", "Headline", "Description", "Primary action", "Secondary action (optional)"],
  },
  loadingStates: {
    name: "Loading State Design",
    patterns: {
      spinner: "Quick operations (<1s)",
      skeleton: "Content loading (>1s)",
      progressBar: "Determinate progress",
      shimmer: "Content placeholder with animation",
    },
    principles: [
      "Show loading state after 200ms delay",
      "Use skeleton over spinners when possible",
      "Match skeleton to expected content shape",
      "Provide progress for long operations",
    ],
  },
  formDesign: {
    name: "Form Design Best Practices",
    layout: [
      "One column for most forms",
      "Group related fields",
      "Place labels above inputs",
      "Show required indicator",
    ],
    validation: [
      "Validate on blur for better UX",
      "Show success states, not just errors",
      "Use inline validation",
      "Provide clear error messages",
    ],
    accessibility: [
      "Always use labels",
      "Associate error messages with inputs",
      "Announce errors to screen readers",
      "Support autocomplete",
    ],
  },
  navigation: {
    name: "Navigation Patterns",
    types: {
      global: "Main site/app navigation",
      local: "Section-specific navigation",
      contextual: "Related content links",
      utility: "Settings, profile, help",
    },
    mobile: {
      hamburger: "Hidden menu behind icon",
      tabBar: "Bottom navigation (5 items max)",
      drawer: "Slide-in navigation panel",
    },
  },
  mobileFirst: {
    name: "Mobile-First Design",
    principles: [
      "Design for smallest screen first",
      "Progressive enhancement for larger screens",
      "Touch-friendly interactions",
      "Performance is critical on mobile",
    ],
    touchTargets: {
      minimum: "44x44px",
      recommended: "48x48px",
      spacing: "8px between targets",
    },
  },
  microInteractions: {
    name: "Micro-interaction Guide",
    purposes: [
      "Provide feedback on actions",
      "Guide user attention",
      "Indicate state changes",
      "Add delight and personality",
    ],
    principles: [
      "Keep them subtle and quick",
      "Ensure they don't block user flow",
      "Make them consistent",
      "Respect reduced motion preferences",
    ],
  },
  designHandoff: {
    name: "Design Handoff Best Practices",
    preparation: [
      "Clean up layers and naming",
      "Document all states and variants",
      "Specify responsive behavior",
      "Note interactions and animations",
      "Include edge cases",
    ],
    specifications: [
      "Colors with tokens/variables",
      "Typography with styles",
      "Spacing measurements",
      "Component behavior notes",
      "Accessibility requirements",
    ],
  },
  designCritique: {
    name: "Design Critique Framework",
    structure: {
      context: "What problem is this solving?",
      feedback: "What works well? What could improve?",
      questions: "What needs clarification?",
      suggestions: "Specific improvements to consider",
    },
    principles: [
      "Focus on the work, not the designer",
      "Be specific and actionable",
      "Ask questions before making assumptions",
      "Balance positive and constructive feedback",
    ],
  },
};

// Design Tokens Resources
const DESIGN_TOKENS = {
  colors: {
    primary: { 50: "#eff6ff", 100: "#dbeafe", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 900: "#1e3a8a" },
    secondary: { 50: "#f8fafc", 100: "#f1f5f9", 500: "#64748b", 600: "#475569", 700: "#334155", 900: "#0f172a" },
    success: { 500: "#22c55e", 600: "#16a34a" },
    warning: { 500: "#f59e0b", 600: "#d97706" },
    error: { 500: "#ef4444", 600: "#dc2626" },
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, "2xl": 48, "3xl": 64 },
  typography: {
    fontFamily: { sans: "Inter, system-ui, sans-serif", serif: "Merriweather, Georgia, serif", mono: "JetBrains Mono, monospace" },
    fontSize: { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, "2xl": 24, "3xl": 30, "4xl": 36, "5xl": 48 },
    fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
    lineHeight: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
  },
  radii: { none: 0, sm: 4, md: 8, lg: 12, xl: 16, full: 9999 },
  breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 },
  zIndex: { dropdown: 1000, sticky: 1020, fixed: 1030, modal: 1040, popover: 1050, tooltip: 1060 },
  animations: {
    durations: { fast: "150ms", normal: "300ms", slow: "500ms" },
    easings: { ease: "ease", easeIn: "ease-in", easeOut: "ease-out", easeInOut: "ease-in-out" },
  },
  borders: { thin: "1px", normal: "2px", thick: "4px" },
  opacity: { 0: 0, 25: 0.25, 50: 0.5, 75: 0.75, 100: 1 },
};

// Design Systems
const DESIGN_SYSTEMS = {
  "material-3": {
    name: "Material Design 3",
    url: "https://m3.material.io",
    colors: { primary: "#6750A4", secondary: "#958DA5", tertiary: "#B58392" },
    cornerRadius: { extraSmall: 4, small: 8, medium: 12, large: 16, extraLarge: 28 },
    elevation: { level0: 0, level1: 1, level2: 3, level3: 6, level4: 8, level5: 12 },
  },
  "ios-hig": {
    name: "iOS Human Interface Guidelines",
    url: "https://developer.apple.com/design/human-interface-guidelines",
    colors: { systemBlue: "#007AFF", systemGreen: "#34C759", systemRed: "#FF3B30" },
    cornerRadius: { small: 6, medium: 10, large: 14, continuous: "continuous" },
    spacing: { compact: 8, regular: 12, spacious: 16 },
  },
  tailwind: {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com",
    colors: "Full color palette with shades 50-950",
    utilities: "Utility-first CSS framework",
  },
  shadcn: {
    name: "shadcn/ui",
    url: "https://ui.shadcn.com",
    philosophy: "Copy-paste components built on Radix",
    styling: "Tailwind CSS",
  },
  radix: {
    name: "Radix UI",
    url: "https://www.radix-ui.com",
    type: "Headless component library",
    accessibility: "WCAG compliant primitives",
  },
  "ant-design": {
    name: "Ant Design",
    url: "https://ant.design",
    colors: { primary: "#1890ff" },
    type: "Enterprise UI library",
  },
  chakra: {
    name: "Chakra UI",
    url: "https://chakra-ui.com",
    philosophy: "Simple, modular, accessible",
  },
  bootstrap: {
    name: "Bootstrap",
    url: "https://getbootstrap.com",
    type: "Popular CSS framework",
    grid: "12-column responsive grid",
  },
};

// UI Patterns
const UI_PATTERNS = {
  buttons: {
    variants: ["primary", "secondary", "ghost", "outline", "destructive"],
    sizes: ["sm", "md", "lg"],
    states: ["default", "hover", "active", "disabled", "loading"],
  },
  inputs: {
    types: ["text", "email", "password", "number", "search", "textarea"],
    states: ["default", "focus", "error", "disabled", "readonly"],
    components: ["label", "input", "helper-text", "error-message"],
  },
  cards: {
    parts: ["header", "body", "footer", "media", "actions"],
    variants: ["elevated", "outlined", "filled"],
  },
  navigation: {
    types: ["navbar", "sidebar", "tabs", "breadcrumbs", "pagination"],
    patterns: ["sticky header", "collapsible sidebar", "bottom nav (mobile)"],
  },
  modals: {
    parts: ["overlay", "container", "header", "body", "footer"],
    variants: ["dialog", "drawer", "sheet", "alert"],
  },
  tables: {
    features: ["sorting", "filtering", "pagination", "row-selection", "column-resize"],
    parts: ["header", "body", "row", "cell", "footer"],
  },
  lists: {
    types: ["simple", "with-icons", "with-avatars", "with-actions", "nested"],
  },
  forms: {
    patterns: ["single-column", "two-column", "inline", "multi-step"],
    validation: ["inline", "on-submit", "on-blur"],
  },
  "empty-states": {
    components: ["illustration", "title", "description", "action"],
  },
  loading: {
    types: ["spinner", "skeleton", "progress-bar", "shimmer"],
  },
  errors: {
    types: ["inline", "toast", "banner", "page-level"],
  },
  avatars: {
    variants: ["image", "initials", "icon"],
    sizes: ["xs", "sm", "md", "lg", "xl"],
  },
};

// Templates
const TEMPLATES = {
  "landing-hero": {
    sections: ["headline", "subheadline", "cta-buttons", "hero-image", "social-proof"],
    layout: "centered or split",
  },
  "landing-features": {
    layout: "3-column grid or alternating",
    components: ["icon", "title", "description"],
  },
  "landing-pricing": {
    cards: ["free", "pro", "enterprise"],
    components: ["price", "features-list", "cta"],
  },
  "dashboard-sidebar": {
    sections: ["logo", "nav-items", "user-menu"],
    width: "240-280px",
  },
  "dashboard-cards": {
    types: ["stats", "charts", "recent-activity", "quick-actions"],
  },
  "mobile-auth": {
    screens: ["login", "signup", "forgot-password", "verification"],
  },
  "mobile-list": {
    variants: ["simple", "with-thumbnails", "swipe-actions"],
  },
  "form-simple": {
    fields: ["text", "email", "password"],
    layout: "single-column",
  },
  "form-multi-step": {
    steps: ["personal-info", "account-details", "preferences", "review"],
    progress: "stepper or progress-bar",
  },
  "settings-page": {
    sections: ["profile", "account", "notifications", "privacy", "billing"],
  },
};

export function registerAllResources(server: McpServer, taskManager: TaskManager) {
  // Design Tokens (10 resources)
  server.resource("design-tokens-colors", "figma://resources/tokens/colors", async () => ({
    contents: [{ uri: "figma://resources/tokens/colors", mimeType: "application/json", text: JSON.stringify(DESIGN_TOKENS.colors) }]
  }));
  
  server.resource("design-tokens-spacing", "figma://resources/tokens/spacing", async () => ({
    contents: [{ uri: "figma://resources/tokens/spacing", mimeType: "application/json", text: JSON.stringify(DESIGN_TOKENS.spacing) }]
  }));
  
  server.resource("design-tokens-typography", "figma://resources/tokens/typography", async () => ({
    contents: [{ uri: "figma://resources/tokens/typography", mimeType: "application/json", text: JSON.stringify(DESIGN_TOKENS.typography) }]
  }));
  
  server.resource("design-tokens-shadows", "figma://resources/tokens/shadows", async () => ({
    contents: [{ uri: "figma://resources/tokens/shadows", mimeType: "application/json", text: JSON.stringify(DESIGN_TOKENS.shadows) }]
  }));
  
  server.resource("design-tokens-radii", "figma://resources/tokens/radii", async () => ({
    contents: [{ uri: "figma://resources/tokens/radii", mimeType: "application/json", text: JSON.stringify(DESIGN_TOKENS.radii) }]
  }));
  
  server.resource("design-tokens-breakpoints", "figma://resources/tokens/breakpoints", async () => ({
    contents: [{ uri: "figma://resources/tokens/breakpoints", mimeType: "application/json", text: JSON.stringify(DESIGN_TOKENS.breakpoints) }]
  }));
  
  server.resource("design-tokens-zindex", "figma://resources/tokens/zindex", async () => ({
    contents: [{ uri: "figma://resources/tokens/zindex", mimeType: "application/json", text: JSON.stringify(DESIGN_TOKENS.zIndex) }]
  }));
  
  server.resource("design-tokens-animations", "figma://resources/tokens/animations", async () => ({
    contents: [{ uri: "figma://resources/tokens/animations", mimeType: "application/json", text: JSON.stringify(DESIGN_TOKENS.animations) }]
  }));
  
  server.resource("design-tokens-borders", "figma://resources/tokens/borders", async () => ({
    contents: [{ uri: "figma://resources/tokens/borders", mimeType: "application/json", text: JSON.stringify(DESIGN_TOKENS.borders) }]
  }));
  
  server.resource("design-tokens-opacity", "figma://resources/tokens/opacity", async () => ({
    contents: [{ uri: "figma://resources/tokens/opacity", mimeType: "application/json", text: JSON.stringify(DESIGN_TOKENS.opacity) }]
  }));

  // Design Systems (8 resources)
  Object.entries(DESIGN_SYSTEMS).forEach(([key, system]) => {
    server.resource(`design-system-${key}`, `figma://resources/systems/${key}`, async () => ({
      contents: [{ uri: `figma://resources/systems/${key}`, mimeType: "application/json", text: JSON.stringify(system) }]
    }));
  });

  // UI Patterns (12 resources)
  Object.entries(UI_PATTERNS).forEach(([key, pattern]) => {
    server.resource(`ui-pattern-${key}`, `figma://resources/patterns/${key}`, async () => ({
      contents: [{ uri: `figma://resources/patterns/${key}`, mimeType: "application/json", text: JSON.stringify(pattern) }]
    }));
  });

  // Templates (10 resources)
  Object.entries(TEMPLATES).forEach(([key, template]) => {
    server.resource(`template-${key}`, `figma://resources/templates/${key}`, async () => ({
      contents: [{ uri: `figma://resources/templates/${key}`, mimeType: "application/json", text: JSON.stringify(template) }]
    }));
  });

  // Document State (10 resources) - Dynamic, fetched from plugin
  server.resource("document-selection", "figma://document/selection", async () => {
    const result = await taskManager.runTask("get-selection", {});
    return { contents: [{ uri: "figma://document/selection", mimeType: "application/json", text: String(result) }] };
  });

  server.resource("document-current-page", "figma://document/current-page", async () => {
    const result = await taskManager.runTask("get-pages", { currentOnly: true });
    return { contents: [{ uri: "figma://document/current-page", mimeType: "application/json", text: String(result) }] };
  });

  server.resource("document-all-pages", "figma://document/pages", async () => {
    const result = await taskManager.runTask("get-pages", {});
    return { contents: [{ uri: "figma://document/pages", mimeType: "application/json", text: String(result) }] };
  });

  server.resource("document-components", "figma://document/components", async () => {
    const result = await taskManager.runTask("get-all-components", {});
    return { contents: [{ uri: "figma://document/components", mimeType: "application/json", text: String(result) }] };
  });

  server.resource("document-styles", "figma://document/styles", async () => {
    const result = await taskManager.runTask("get-all-styles", {});
    return { contents: [{ uri: "figma://document/styles", mimeType: "application/json", text: String(result) }] };
  });

  server.resource("document-variables", "figma://document/variables", async () => {
    const result = await taskManager.runTask("get-all-variables", {});
    return { contents: [{ uri: "figma://document/variables", mimeType: "application/json", text: String(result) }] };
  });

  server.resource("document-fonts", "figma://document/fonts", async () => {
    const result = await taskManager.runTask("get-available-fonts", {});
    return { contents: [{ uri: "figma://document/fonts", mimeType: "application/json", text: String(result) }] };
  });

  server.resource("document-colors", "figma://document/colors", async () => {
    const result = await taskManager.runTask("get-document-colors", {});
    return { contents: [{ uri: "figma://document/colors", mimeType: "application/json", text: String(result) }] };
  });

  server.resource("document-structure", "figma://document/structure", async () => {
    const result = await taskManager.runTask("get-node-tree", { maxDepth: 2 });
    return { contents: [{ uri: "figma://document/structure", mimeType: "application/json", text: String(result) }] };
  });

  server.resource("document-stats", "figma://document/stats", async () => {
    const result = await taskManager.runTask("get-document-info", {});
    return { contents: [{ uri: "figma://document/stats", mimeType: "application/json", text: String(result) }] };
  });

  // ============================================
  // FRAMEWORK RESOURCES (12)
  // ============================================
  Object.entries(FRAMEWORK_RESOURCES).forEach(([key, framework]) => {
    server.resource(`framework-${key}`, `figma://frameworks/${key}`, async () => ({
      contents: [{ uri: `figma://frameworks/${key}`, mimeType: "application/json", text: JSON.stringify(framework) }]
    }));
  });

  // ============================================
  // DESIGN REFERENCE RESOURCES (15)
  // ============================================
  Object.entries(DESIGN_REFERENCES).forEach(([key, reference]) => {
    server.resource(`design-ref-${key}`, `figma://design-refs/${key}`, async () => ({
      contents: [{ uri: `figma://design-refs/${key}`, mimeType: "application/json", text: JSON.stringify(reference) }]
    }));
  });

  // ============================================
  // CODE SNIPPET RESOURCES (12)
  // ============================================
  Object.entries(CODE_SNIPPETS).forEach(([key, snippet]) => {
    server.resource(`code-${key}`, `figma://code/${key}`, async () => ({
      contents: [{ uri: `figma://code/${key}`, mimeType: "application/json", text: JSON.stringify(snippet) }]
    }));
  });

  // ============================================
  // GUIDELINE RESOURCES (15)
  // ============================================
  Object.entries(GUIDELINES).forEach(([key, guideline]) => {
    server.resource(`guideline-${key}`, `figma://guidelines/${key}`, async () => ({
      contents: [{ uri: `figma://guidelines/${key}`, mimeType: "application/json", text: JSON.stringify(guideline) }]
    }));
  });
}
