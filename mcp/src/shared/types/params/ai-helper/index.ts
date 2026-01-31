import z from "zod";

// Design Guidance Tools
export const SuggestGuidelinesParamsSchema = z.object({
  topic: z.enum(["landing-page", "dashboard", "form", "mobile-app", "e-commerce", "blog", "portfolio", "admin-panel", "settings", "onboarding"]).describe("UI topic to get guidelines for"),
});
export type SuggestGuidelinesParams = z.infer<typeof SuggestGuidelinesParamsSchema>;

export const SuggestStyleTagsParamsSchema = z.object({
  category: z.enum(["modern", "minimal", "bold", "playful", "corporate", "luxury", "tech", "organic"]).optional().describe("Optional category filter"),
});
export type SuggestStyleTagsParams = z.infer<typeof SuggestStyleTagsParamsSchema>;

export const GetStyleGuideParamsSchema = z.object({
  tags: z.array(z.string()).describe("Style tags to get guide for"),
  name: z.string().optional().describe("Specific style guide name"),
});
export type GetStyleGuideParams = z.infer<typeof GetStyleGuideParamsSchema>;

export const SuggestComponentStructureParamsSchema = z.object({
  uiType: z.string().describe("Type of UI (e.g., 'user profile card', 'pricing table', 'navigation menu')"),
  complexity: z.enum(["simple", "medium", "complex"]).default("medium").describe("Complexity level"),
});
export type SuggestComponentStructureParams = z.infer<typeof SuggestComponentStructureParamsSchema>;

export const SuggestLayoutPatternParamsSchema = z.object({
  useCase: z.string().describe("Use case (e.g., 'blog listing', 'product grid', 'chat interface')"),
  screenSize: z.enum(["mobile", "tablet", "desktop", "responsive"]).default("responsive").describe("Target screen size"),
});
export type SuggestLayoutPatternParams = z.infer<typeof SuggestLayoutPatternParamsSchema>;

export const SuggestColorPaletteParamsSchema = z.object({
  mood: z.enum(["professional", "playful", "calm", "energetic", "luxurious", "natural", "tech", "warm", "cool"]).describe("Mood/feeling"),
  primaryColor: z.string().optional().describe("Optional primary color hex to build around"),
});
export type SuggestColorPaletteParams = z.infer<typeof SuggestColorPaletteParamsSchema>;

export const SuggestTypographyScaleParamsSchema = z.object({
  baseSize: z.number().default(16).describe("Base font size in pixels"),
  style: z.enum(["modern", "classic", "minimal", "bold"]).default("modern").describe("Typography style"),
});
export type SuggestTypographyScaleParams = z.infer<typeof SuggestTypographyScaleParamsSchema>;

export const SuggestSpacingSystemParamsSchema = z.object({
  baseUnit: z.number().default(8).describe("Base spacing unit in pixels"),
  scale: z.enum(["compact", "normal", "spacious"]).default("normal").describe("Spacing density"),
});
export type SuggestSpacingSystemParams = z.infer<typeof SuggestSpacingSystemParamsSchema>;

// Tech Stack Suggestions
export const SuggestTechStackParamsSchema = z.object({
  projectType: z.enum(["spa", "ssr", "static", "mobile", "desktop", "fullstack"]).describe("Project type"),
  requirements: z.array(z.string()).optional().describe("Special requirements (e.g., 'real-time', 'offline', 'seo')"),
});
export type SuggestTechStackParams = z.infer<typeof SuggestTechStackParamsSchema>;

export const SuggestCssFrameworkParamsSchema = z.object({
  projectType: z.string().describe("Project type or use case"),
  preferences: z.array(z.enum(["utility-first", "component-based", "css-in-js", "traditional"])).optional().describe("Styling preferences"),
});
export type SuggestCssFrameworkParams = z.infer<typeof SuggestCssFrameworkParamsSchema>;

export const SuggestComponentLibraryParamsSchema = z.object({
  framework: z.enum(["react", "vue", "angular", "svelte"]).describe("Framework"),
  needs: z.array(z.string()).optional().describe("Specific component needs"),
});
export type SuggestComponentLibraryParams = z.infer<typeof SuggestComponentLibraryParamsSchema>;

export const SuggestAnimationApproachParamsSchema = z.object({
  complexity: z.enum(["simple", "moderate", "complex"]).describe("Animation complexity"),
  performance: z.enum(["critical", "important", "flexible"]).default("important").describe("Performance priority"),
});
export type SuggestAnimationApproachParams = z.infer<typeof SuggestAnimationApproachParamsSchema>;

// Planning Assistance
export const AnalyzeDesignComplexityParamsSchema = z.object({
  nodeId: z.string().describe("ID of the design node/frame to analyze"),
});
export type AnalyzeDesignComplexityParams = z.infer<typeof AnalyzeDesignComplexityParamsSchema>;

export const GenerateImplementationPlanParamsSchema = z.object({
  nodeId: z.string().describe("ID of the design node/frame to plan for"),
  techStack: z.string().optional().describe("Target tech stack (e.g., 'React + Tailwind')"),
});
export type GenerateImplementationPlanParams = z.infer<typeof GenerateImplementationPlanParamsSchema>;

export const ValidateDesignAccessibilityParamsSchema = z.object({
  nodeId: z.string().describe("ID of the design node/frame to validate"),
});
export type ValidateDesignAccessibilityParams = z.infer<typeof ValidateDesignAccessibilityParamsSchema>;
