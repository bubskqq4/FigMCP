import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../utils.js";
import * as DT from "../../shared/types/params/design-thinking/index.js";

/**
 * Design Thinking Tools (40 tools)
 * Tools for UX research, ideation, and design process artifacts
 */
export function registerDesignThinkingTools(server: McpServer, taskManager: TaskManager) {
    // 1. Create Persona
    server.tool(
        "create-persona",
        "Create a user persona with demographics, goals, pain points, and behaviors. Generates a visual persona card for UX research.",
        DT.CreatePersonaParamsSchema.shape,
        async (params: DT.CreatePersonaParams) => {
            return await safeToolProcessor(taskManager.runTask("create-persona", params));
        }
    );

    // 2. Create Journey Map
    server.tool(
        "create-journey-map",
        "Generate a customer journey map visualization showing stages, actions, thoughts, emotions, and opportunities.",
        DT.CreateJourneyMapParamsSchema.shape,
        async (params: DT.CreateJourneyMapParams) => {
            return await safeToolProcessor(taskManager.runTask("create-journey-map", params));
        }
    );

    // 3. Create Empathy Map
    server.tool(
        "create-empathy-map",
        "Create an empathy map with Says, Thinks, Does, Feels quadrants plus Pains and Gains sections.",
        DT.CreateEmpathyMapParamsSchema.shape,
        async (params: DT.CreateEmpathyMapParams) => {
            return await safeToolProcessor(taskManager.runTask("create-empathy-map", params));
        }
    );

    // 4. Create User Story
    server.tool(
        "create-user-story",
        "Generate user story cards with As a/I want/So that format, acceptance criteria, and priority.",
        DT.CreateUserStoryParamsSchema.shape,
        async (params: DT.CreateUserStoryParams) => {
            return await safeToolProcessor(taskManager.runTask("create-user-story", params));
        }
    );

    // 5. Create Storyboard
    server.tool(
        "create-storyboard",
        "Create a storyboard with sequential frames showing user scenarios and interactions.",
        DT.CreateStoryboardParamsSchema.shape,
        async (params: DT.CreateStoryboardParams) => {
            return await safeToolProcessor(taskManager.runTask("create-storyboard", params));
        }
    );

    // 6. Create Wireframe
    server.tool(
        "create-wireframe",
        "Generate a low or medium fidelity wireframe for desktop, tablet, or mobile with common layout sections.",
        DT.CreateWireframeParamsSchema.shape,
        async (params: DT.CreateWireframeParams) => {
            return await safeToolProcessor(taskManager.runTask("create-wireframe", params));
        }
    );

    // 7. Create Sitemap
    server.tool(
        "create-sitemap",
        "Generate a visual sitemap showing site/app structure and page hierarchy.",
        DT.CreateSitemapParamsSchema.shape,
        async (params: DT.CreateSitemapParams) => {
            return await safeToolProcessor(taskManager.runTask("create-sitemap", params));
        }
    );

    // 8. Create User Flow
    server.tool(
        "create-user-flow",
        "Create a user flow diagram showing the path users take to complete a goal, including decision points.",
        DT.CreateUserFlowParamsSchema.shape,
        async (params: DT.CreateUserFlowParams) => {
            return await safeToolProcessor(taskManager.runTask("create-user-flow", params));
        }
    );

    // 9. Create Task Flow
    server.tool(
        "create-task-flow",
        "Generate a task flow visualization showing sequential steps to complete a specific task.",
        DT.CreateTaskFlowParamsSchema.shape,
        async (params: DT.CreateTaskFlowParams) => {
            return await safeToolProcessor(taskManager.runTask("create-task-flow", params));
        }
    );

    // 10. Create Information Architecture
    server.tool(
        "create-information-architecture",
        "Create an information architecture diagram showing content organization and hierarchy.",
        DT.CreateInformationArchitectureParamsSchema.shape,
        async (params: DT.CreateInformationArchitectureParams) => {
            return await safeToolProcessor(taskManager.runTask("create-information-architecture", params));
        }
    );

    // 11. Create Affinity Diagram
    server.tool(
        "create-affinity-diagram",
        "Generate an affinity diagram for organizing ideas and insights into groups.",
        DT.CreateAffinityDiagramParamsSchema.shape,
        async (params: DT.CreateAffinityDiagramParams) => {
            return await safeToolProcessor(taskManager.runTask("create-affinity-diagram", params));
        }
    );

    // 12. Create Feature Matrix
    server.tool(
        "create-feature-matrix",
        "Create a feature comparison matrix showing features across competitors or versions.",
        DT.CreateFeatureMatrixParamsSchema.shape,
        async (params: DT.CreateFeatureMatrixParams) => {
            return await safeToolProcessor(taskManager.runTask("create-feature-matrix", params));
        }
    );

    // 13. Create Priority Matrix
    server.tool(
        "create-priority-matrix",
        "Generate a priority matrix (impact/effort) for prioritizing features or tasks.",
        DT.CreatePriorityMatrixParamsSchema.shape,
        async (params: DT.CreatePriorityMatrixParams) => {
            return await safeToolProcessor(taskManager.runTask("create-priority-matrix", params));
        }
    );

    // 14. Create Stakeholder Map
    server.tool(
        "create-stakeholder-map",
        "Create a stakeholder map showing influence and interest levels for project stakeholders.",
        DT.CreateStakeholderMapParamsSchema.shape,
        async (params: DT.CreateStakeholderMapParams) => {
            return await safeToolProcessor(taskManager.runTask("create-stakeholder-map", params));
        }
    );

    // 15. Create Competitive Analysis
    server.tool(
        "create-competitive-analysis",
        "Generate a competitive analysis grid comparing strengths, weaknesses, and positioning.",
        DT.CreateCompetitiveAnalysisParamsSchema.shape,
        async (params: DT.CreateCompetitiveAnalysisParams) => {
            return await safeToolProcessor(taskManager.runTask("create-competitive-analysis", params));
        }
    );

    // 16. Create SWOT Analysis
    server.tool(
        "create-swot-analysis",
        "Create a SWOT analysis diagram with Strengths, Weaknesses, Opportunities, and Threats.",
        DT.CreateSwotAnalysisParamsSchema.shape,
        async (params: DT.CreateSwotAnalysisParams) => {
            return await safeToolProcessor(taskManager.runTask("create-swot-analysis", params));
        }
    );

    // 17. Create Value Proposition
    server.tool(
        "create-value-proposition",
        "Generate a value proposition canvas showing customer segment and value map alignment.",
        DT.CreateValuePropositionParamsSchema.shape,
        async (params: DT.CreateValuePropositionParams) => {
            return await safeToolProcessor(taskManager.runTask("create-value-proposition", params));
        }
    );

    // 18. Create Business Model Canvas
    server.tool(
        "create-business-model-canvas",
        "Create a Business Model Canvas with all nine building blocks.",
        DT.CreateBusinessModelCanvasParamsSchema.shape,
        async (params: DT.CreateBusinessModelCanvasParams) => {
            return await safeToolProcessor(taskManager.runTask("create-business-model-canvas", params));
        }
    );

    // 19. Create Lean Canvas
    server.tool(
        "create-lean-canvas",
        "Generate a Lean Canvas for startup and product planning.",
        DT.CreateLeanCanvasParamsSchema.shape,
        async (params: DT.CreateLeanCanvasParams) => {
            return await safeToolProcessor(taskManager.runTask("create-lean-canvas", params));
        }
    );

    // 20. Create Design Brief
    server.tool(
        "create-design-brief",
        "Create a design brief template with project overview, objectives, constraints, and success criteria.",
        DT.CreateDesignBriefParamsSchema.shape,
        async (params: DT.CreateDesignBriefParams) => {
            return await safeToolProcessor(taskManager.runTask("create-design-brief", params));
        }
    );

    // 21. Create Moodboard
    server.tool(
        "create-moodboard",
        "Generate a moodboard layout with colors, keywords, and visual inspiration.",
        DT.CreateMoodboardParamsSchema.shape,
        async (params: DT.CreateMoodboardParams) => {
            return await safeToolProcessor(taskManager.runTask("create-moodboard", params));
        }
    );

    // 22. Create Style Tile
    server.tool(
        "create-style-tile",
        "Create a style tile showing colors, typography, and visual direction.",
        DT.CreateStyleTileParamsSchema.shape,
        async (params: DT.CreateStyleTileParams) => {
            return await safeToolProcessor(taskManager.runTask("create-style-tile", params));
        }
    );

    // 23. Create Brand Identity
    server.tool(
        "create-brand-identity",
        "Generate a brand identity board with logo, colors, tagline, and values.",
        DT.CreateBrandIdentityParamsSchema.shape,
        async (params: DT.CreateBrandIdentityParams) => {
            return await safeToolProcessor(taskManager.runTask("create-brand-identity", params));
        }
    );

    // 24. Create Color Exploration
    server.tool(
        "create-color-exploration",
        "Create a color exploration board with palettes and harmony analysis.",
        DT.CreateColorExplorationParamsSchema.shape,
        async (params: DT.CreateColorExplorationParams) => {
            return await safeToolProcessor(taskManager.runTask("create-color-exploration", params));
        }
    );

    // 25. Create Typography Exploration
    server.tool(
        "create-typography-exploration",
        "Generate a typography exploration with font pairings and type scale.",
        DT.CreateTypographyExplorationParamsSchema.shape,
        async (params: DT.CreateTypographyExplorationParams) => {
            return await safeToolProcessor(taskManager.runTask("create-typography-exploration", params));
        }
    );

    // 26. Create Icon Grid
    server.tool(
        "create-icon-grid",
        "Create an icon grid for designing consistent icon sets.",
        DT.CreateIconGridParamsSchema.shape,
        async (params: DT.CreateIconGridParams) => {
            return await safeToolProcessor(taskManager.runTask("create-icon-grid", params));
        }
    );

    // 27. Create Illustration Style
    server.tool(
        "create-illustration-style",
        "Generate an illustration style guide with examples and guidelines.",
        DT.CreateIllustrationStyleParamsSchema.shape,
        async (params: DT.CreateIllustrationStyleParams) => {
            return await safeToolProcessor(taskManager.runTask("create-illustration-style", params));
        }
    );

    // 28. Create Motion Spec
    server.tool(
        "create-motion-spec",
        "Create a motion specification document with animation definitions and principles.",
        DT.CreateMotionSpecParamsSchema.shape,
        async (params: DT.CreateMotionSpecParams) => {
            return await safeToolProcessor(taskManager.runTask("create-motion-spec", params));
        }
    );

    // 29. Create Interaction Spec
    server.tool(
        "create-interaction-spec",
        "Generate an interaction specification showing triggers, actions, and feedback.",
        DT.CreateInteractionSpecParamsSchema.shape,
        async (params: DT.CreateInteractionSpecParams) => {
            return await safeToolProcessor(taskManager.runTask("create-interaction-spec", params));
        }
    );

    // 30. Create Gesture Guide
    server.tool(
        "create-gesture-guide",
        "Create a gesture guide documenting touch and gesture interactions.",
        DT.CreateGestureGuideParamsSchema.shape,
        async (params: DT.CreateGestureGuideParams) => {
            return await safeToolProcessor(taskManager.runTask("create-gesture-guide", params));
        }
    );

    // 31. Create Responsive Spec
    server.tool(
        "create-responsive-spec",
        "Generate a responsive specification with breakpoints and behavior changes.",
        DT.CreateResponsiveSpecParamsSchema.shape,
        async (params: DT.CreateResponsiveSpecParams) => {
            return await safeToolProcessor(taskManager.runTask("create-responsive-spec", params));
        }
    );

    // 32. Create Accessibility Spec
    server.tool(
        "create-accessibility-spec",
        "Create an accessibility specification with WCAG requirements and implementation notes.",
        DT.CreateAccessibilitySpecParamsSchema.shape,
        async (params: DT.CreateAccessibilitySpecParams) => {
            return await safeToolProcessor(taskManager.runTask("create-accessibility-spec", params));
        }
    );

    // 33. Create Content Strategy
    server.tool(
        "create-content-strategy",
        "Generate a content strategy document with goals, content types, and channels.",
        DT.CreateContentStrategyParamsSchema.shape,
        async (params: DT.CreateContentStrategyParams) => {
            return await safeToolProcessor(taskManager.runTask("create-content-strategy", params));
        }
    );

    // 34. Create Microcopy Guide
    server.tool(
        "create-microcopy-guide",
        "Create a microcopy guide with writing patterns and examples for UI text.",
        DT.CreateMicrocopyGuideParamsSchema.shape,
        async (params: DT.CreateMicrocopyGuideParams) => {
            return await safeToolProcessor(taskManager.runTask("create-microcopy-guide", params));
        }
    );

    // 35. Create Voice and Tone Guide
    server.tool(
        "create-voice-tone-guide",
        "Generate a voice and tone guide with brand personality and contextual variations.",
        DT.CreateVoiceToneGuideParamsSchema.shape,
        async (params: DT.CreateVoiceToneGuideParams) => {
            return await safeToolProcessor(taskManager.runTask("create-voice-tone-guide", params));
        }
    );

    // 36. Create Usability Test Plan
    server.tool(
        "create-usability-test-plan",
        "Create a usability test plan with objectives, methodology, tasks, and metrics.",
        DT.CreateUsabilityTestPlanParamsSchema.shape,
        async (params: DT.CreateUsabilityTestPlanParams) => {
            return await safeToolProcessor(taskManager.runTask("create-usability-test-plan", params));
        }
    );

    // 37. Create A/B Test Spec
    server.tool(
        "create-ab-test-spec",
        "Generate an A/B test specification with hypothesis, variants, and success metrics.",
        DT.CreateABTestSpecParamsSchema.shape,
        async (params: DT.CreateABTestSpecParams) => {
            return await safeToolProcessor(taskManager.runTask("create-ab-test-spec", params));
        }
    );

    // 38. Create Metrics Dashboard
    server.tool(
        "create-metrics-dashboard",
        "Create a metrics dashboard layout showing KPIs and performance indicators.",
        DT.CreateMetricsDashboardParamsSchema.shape,
        async (params: DT.CreateMetricsDashboardParams) => {
            return await safeToolProcessor(taskManager.runTask("create-metrics-dashboard", params));
        }
    );

    // 39. Create Design Critique
    server.tool(
        "create-design-critique",
        "Generate a design critique template with categorized feedback and recommendations.",
        DT.CreateDesignCritiqueParamsSchema.shape,
        async (params: DT.CreateDesignCritiqueParams) => {
            return await safeToolProcessor(taskManager.runTask("create-design-critique", params));
        }
    );

    // 40. Create Retrospective
    server.tool(
        "create-retrospective",
        "Create a design retrospective with what went well, improvements, and action items.",
        DT.CreateRetrospectiveParamsSchema.shape,
        async (params: DT.CreateRetrospectiveParams) => {
            return await safeToolProcessor(taskManager.runTask("create-retrospective", params));
        }
    );
}
