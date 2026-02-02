import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as AI from "../../shared/types/params/ai-helper/index.js";

// Design guidance data
const GUIDELINES: Record<string, string> = {
  "landing-page": "1. Hero section with clear value prop. 2. Social proof early. 3. CTA above fold. 4. Benefits > Features. 5. Single focused goal.",
  "dashboard": "1. Key metrics visible immediately. 2. Clear hierarchy. 3. Consistent data viz. 4. Quick actions accessible. 5. Filter/search prominent.",
  "form": "1. One column layout. 2. Clear labels. 3. Inline validation. 4. Progress indicator for multi-step. 5. Clear submit button.",
  "mobile-app": "1. Thumb-friendly zones. 2. Bottom navigation. 3. Large touch targets (44px min). 4. Progressive disclosure. 5. Swipe gestures.",
  "e-commerce": "1. High-quality imagery. 2. Clear pricing. 3. Trust signals. 4. Easy cart access. 5. Streamlined checkout.",
  "blog": "1. Readable typography. 2. Scannable headings. 3. Share buttons. 4. Related content. 5. Author info.",
  "portfolio": "1. Strong visual hierarchy. 2. Case studies > screenshots. 3. Contact accessible. 4. Fast loading media. 5. Clear navigation.",
  "admin-panel": "1. Sidebar navigation. 2. Breadcrumbs. 3. Data tables with actions. 4. Bulk operations. 5. Role-based UI.",
  "settings": "1. Grouped by category. 2. Toggles for on/off. 3. Save confirmation. 4. Reset option. 5. Search settings.",
  "onboarding": "1. Progressive disclosure. 2. Skip option. 3. Progress indicator. 4. Value demonstration. 5. Quick wins early.",
};

const STYLE_TAGS = {
  modern: ["clean", "minimal", "geometric", "bold-typography", "white-space", "flat"],
  minimal: ["monochrome", "subtle", "typography-focused", "grid-based", "restrained"],
  bold: ["high-contrast", "saturated", "large-type", "dramatic", "impactful"],
  playful: ["colorful", "rounded", "illustrated", "animated", "friendly"],
  corporate: ["professional", "structured", "blue-tones", "formal", "trustworthy"],
  luxury: ["dark-mode", "gold-accents", "serif-typography", "elegant", "spacious"],
  tech: ["dark-ui", "neon-accents", "monospace", "futuristic", "data-rich"],
  organic: ["earth-tones", "natural-shapes", "textures", "warm", "approachable"],
};

const TECH_STACKS: Record<string, any> = {
  spa: { framework: "React/Vue/Svelte", styling: "Tailwind CSS", state: "Zustand/Jotai", build: "Vite" },
  ssr: { framework: "Next.js/Nuxt/SvelteKit", styling: "Tailwind CSS", db: "Prisma + PostgreSQL" },
  static: { generator: "Astro/11ty", hosting: "Vercel/Netlify", cms: "Contentful/Sanity" },
  mobile: { framework: "React Native/Flutter", state: "Redux/Riverpod", backend: "Supabase/Firebase" },
  desktop: { framework: "Electron/Tauri", ui: "React + Tailwind", storage: "SQLite" },
  fullstack: { frontend: "Next.js", backend: "tRPC/API Routes", db: "Prisma + PostgreSQL", auth: "NextAuth" },
};

export function registerAIHelperTools(server: McpServer, taskManager: TaskManager) {
  // Suggest guidelines - returns static data
  server.tool("suggest-guidelines", "Get design guidelines for a UI topic.", AI.SuggestGuidelinesParamsSchema.shape,
    async (params: AI.SuggestGuidelinesParams) => {
      const guidelines = GUIDELINES[params.topic] || "No specific guidelines available.";
      return { content: [{ type: "text", text: JSON.stringify({ topic: params.topic, guidelines }) }] };
    });

  server.tool("suggest-style-tags", "Get available style tags for design.", AI.SuggestStyleTagsParamsSchema.shape,
    async (params: AI.SuggestStyleTagsParams) => {
      const tags = params.category ? STYLE_TAGS[params.category] : STYLE_TAGS;
      return { content: [{ type: "text", text: JSON.stringify({ tags }) }] };
    });

  // NOTE: get-style-guide is registered in design-system/index.ts with more comprehensive implementation

  server.tool("suggest-component-structure", "Suggest component hierarchy for a UI.", AI.SuggestComponentStructureParamsSchema.shape,
    async (params: AI.SuggestComponentStructureParams) => {
      const structure = {
        uiType: params.uiType,
        complexity: params.complexity,
        recommendation: {
          root: "Container",
          children: ["Header", "Content", "Footer"],
          notes: "Break down into atomic components for reusability",
        },
      };
      return { content: [{ type: "text", text: JSON.stringify(structure) }] };
    });

  server.tool("suggest-layout-pattern", "Recommend layout for use case.", AI.SuggestLayoutPatternParamsSchema.shape,
    async (params: AI.SuggestLayoutPatternParams) => {
      const patterns: Record<string, any> = {
        default: { type: "flex", direction: "column", gap: 16 },
        grid: { type: "grid", columns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 },
      };
      return { content: [{ type: "text", text: JSON.stringify({ useCase: params.useCase, screenSize: params.screenSize, pattern: patterns.default }) }] };
    });

  server.tool("suggest-color-palette", "Generate color palette for mood/brand.", AI.SuggestColorPaletteParamsSchema.shape,
    async (params: AI.SuggestColorPaletteParams) => {
      const palettes: Record<string, any> = {
        professional: { primary: "#1e40af", secondary: "#475569", accent: "#0ea5e9", success: "#22c55e", warning: "#f59e0b", error: "#ef4444" },
        playful: { primary: "#8b5cf6", secondary: "#f472b6", accent: "#fbbf24", success: "#34d399", warning: "#fb923c", error: "#f87171" },
        calm: { primary: "#0d9488", secondary: "#64748b", accent: "#a3e635", success: "#22d3ee", warning: "#fcd34d", error: "#fb7185" },
      };
      return { content: [{ type: "text", text: JSON.stringify({ mood: params.mood, palette: palettes[params.mood] || palettes.professional }) }] };
    });

  server.tool("suggest-typography-scale", "Recommend font sizes/weights.", AI.SuggestTypographyScaleParamsSchema.shape,
    async (params: AI.SuggestTypographyScaleParams) => {
      const base = params.baseSize || 16;
      const scale = { xs: base * 0.75, sm: base * 0.875, base, lg: base * 1.125, xl: base * 1.25, "2xl": base * 1.5, "3xl": base * 1.875, "4xl": base * 2.25 };
      return { content: [{ type: "text", text: JSON.stringify({ style: params.style, baseSize: base, scale }) }] };
    });

  server.tool("suggest-spacing-system", "Recommend spacing values.", AI.SuggestSpacingSystemParamsSchema.shape,
    async (params: AI.SuggestSpacingSystemParams) => {
      const base = params.baseUnit || 8;
      const spacing = { "0.5": base * 0.5, "1": base, "1.5": base * 1.5, "2": base * 2, "3": base * 3, "4": base * 4, "6": base * 6, "8": base * 8, "12": base * 12, "16": base * 16 };
      return { content: [{ type: "text", text: JSON.stringify({ scale: params.scale, baseUnit: base, spacing }) }] };
    });

  // Tech Stack Suggestions
  server.tool("suggest-tech-stack", "Recommend tech stack for project type.", AI.SuggestTechStackParamsSchema.shape,
    async (params: AI.SuggestTechStackParams) => {
      const stack = TECH_STACKS[params.projectType] || TECH_STACKS.spa;
      return { content: [{ type: "text", text: JSON.stringify({ projectType: params.projectType, requirements: params.requirements, recommendation: stack }) }] };
    });

  server.tool("suggest-css-framework", "Recommend CSS approach.", AI.SuggestCssFrameworkParamsSchema.shape,
    async (params: AI.SuggestCssFrameworkParams) => {
      const recommendations = { "utility-first": "Tailwind CSS", "component-based": "shadcn/ui + Tailwind", "css-in-js": "styled-components / Emotion", "traditional": "CSS Modules / Sass" };
      return { content: [{ type: "text", text: JSON.stringify({ projectType: params.projectType, recommendations }) }] };
    });

  server.tool("suggest-component-library", "Recommend UI library.", AI.SuggestComponentLibraryParamsSchema.shape,
    async (params: AI.SuggestComponentLibraryParams) => {
      const libs: Record<string, string[]> = {
        react: ["shadcn/ui", "Radix UI", "Headless UI", "Chakra UI", "MUI"],
        vue: ["Vuetify", "PrimeVue", "Naive UI", "Headless UI"],
        angular: ["Angular Material", "PrimeNG", "Taiga UI"],
        svelte: ["Skeleton", "DaisyUI", "Flowbite Svelte"],
      };
      return { content: [{ type: "text", text: JSON.stringify({ framework: params.framework, recommendations: libs[params.framework] || [] }) }] };
    });

  server.tool("suggest-animation-approach", "Recommend animation library.", AI.SuggestAnimationApproachParamsSchema.shape,
    async (params: AI.SuggestAnimationApproachParams) => {
      const approaches: Record<string, string> = { simple: "CSS Transitions + Keyframes", moderate: "Framer Motion / Motion One", complex: "GSAP / Lottie" };
      return { content: [{ type: "text", text: JSON.stringify({ complexity: params.complexity, performance: params.performance, recommendation: approaches[params.complexity] }) }] };
    });

  // Planning Assistance - these need plugin access
  server.tool("analyze-design-complexity", "Analyze design complexity.", AI.AnalyzeDesignComplexityParamsSchema.shape,
    async (params: AI.AnalyzeDesignComplexityParams) => await safeToolProcessor(taskManager.runTask("analyze-design-complexity", params)));

  server.tool("generate-implementation-plan", "Create step-by-step implementation plan.", AI.GenerateImplementationPlanParamsSchema.shape,
    async (params: AI.GenerateImplementationPlanParams) => await safeToolProcessor(taskManager.runTask("generate-implementation-plan", params)));

  server.tool("validate-design-accessibility", "Check design for a11y issues.", AI.ValidateDesignAccessibilityParamsSchema.shape,
    async (params: AI.ValidateDesignAccessibilityParams) => await safeToolProcessor(taskManager.runTask("validate-design-accessibility", params)));
}
