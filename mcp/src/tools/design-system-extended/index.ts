import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../utils.js";
import * as DS from "../../shared/types/params/design-system-extended/index.js";

/**
 * Design System Extended Tools (30 tools)
 * Tools for design token management, component libraries, and documentation
 */
export function registerDesignSystemExtendedTools(server: McpServer, taskManager: TaskManager) {
    // ============================================
    // TOKEN MANAGEMENT (10 tools)
    // ============================================

    // 1. Create Color Tokens
    server.tool(
        "create-color-tokens",
        "Create a comprehensive color token system with primary, secondary, neutral, and semantic colors.",
        DS.CreateColorTokensParamsSchema.shape,
        async (params: DS.CreateColorTokensParams) => {
            return await safeToolProcessor(taskManager.runTask("create-color-tokens", params));
        }
    );

    // 2. Create Spacing Tokens
    server.tool(
        "create-spacing-tokens",
        "Generate a spacing token system based on a base unit scale.",
        DS.CreateSpacingTokensParamsSchema.shape,
        async (params: DS.CreateSpacingTokensParams) => {
            return await safeToolProcessor(taskManager.runTask("create-spacing-tokens", params));
        }
    );

    // 3. Create Typography Tokens
    server.tool(
        "create-typography-tokens",
        "Create typography tokens with font families, scale, weights, and line heights.",
        DS.CreateTypographyTokensParamsSchema.shape,
        async (params: DS.CreateTypographyTokensParams) => {
            return await safeToolProcessor(taskManager.runTask("create-typography-tokens", params));
        }
    );

    // 4. Create Shadow Tokens
    server.tool(
        "create-shadow-tokens",
        "Generate shadow/elevation tokens for depth hierarchy.",
        DS.CreateShadowTokensParamsSchema.shape,
        async (params: DS.CreateShadowTokensParams) => {
            return await safeToolProcessor(taskManager.runTask("create-shadow-tokens", params));
        }
    );

    // 5. Create Radius Tokens
    server.tool(
        "create-radius-tokens",
        "Create border radius tokens for consistent corner rounding.",
        DS.CreateRadiusTokensParamsSchema.shape,
        async (params: DS.CreateRadiusTokensParams) => {
            return await safeToolProcessor(taskManager.runTask("create-radius-tokens", params));
        }
    );

    // 6. Create Border Tokens
    server.tool(
        "create-border-tokens",
        "Generate border tokens with widths, styles, and colors.",
        DS.CreateBorderTokensParamsSchema.shape,
        async (params: DS.CreateBorderTokensParams) => {
            return await safeToolProcessor(taskManager.runTask("create-border-tokens", params));
        }
    );

    // 7. Create Animation Tokens
    server.tool(
        "create-animation-tokens",
        "Create animation tokens with durations and easing functions.",
        DS.CreateAnimationTokensParamsSchema.shape,
        async (params: DS.CreateAnimationTokensParams) => {
            return await safeToolProcessor(taskManager.runTask("create-animation-tokens", params));
        }
    );

    // 8. Create Breakpoint Tokens
    server.tool(
        "create-breakpoint-tokens",
        "Generate responsive breakpoint tokens for adaptive layouts.",
        DS.CreateBreakpointTokensParamsSchema.shape,
        async (params: DS.CreateBreakpointTokensParams) => {
            return await safeToolProcessor(taskManager.runTask("create-breakpoint-tokens", params));
        }
    );

    // 9. Create Z-Index Tokens
    server.tool(
        "create-zindex-tokens",
        "Create z-index tokens for layer management.",
        DS.CreateZIndexTokensParamsSchema.shape,
        async (params: DS.CreateZIndexTokensParams) => {
            return await safeToolProcessor(taskManager.runTask("create-zindex-tokens", params));
        }
    );

    // 10. Sync Tokens to Figma
    server.tool(
        "sync-tokens-to-figma",
        "Sync design tokens from JSON, CSS, Tailwind, or Style Dictionary to Figma variables.",
        DS.SyncTokensToFigmaParamsSchema.shape,
        async (params: DS.SyncTokensToFigmaParams) => {
            return await safeToolProcessor(taskManager.runTask("sync-tokens-to-figma", params));
        }
    );

    // ============================================
    // COMPONENT LIBRARY (10 tools)
    // ============================================

    // 11. Create Component Doc
    server.tool(
        "create-component-doc",
        "Create comprehensive documentation for a component.",
        DS.CreateComponentDocParamsSchema.shape,
        async (params: DS.CreateComponentDocParams) => {
            return await safeToolProcessor(taskManager.runTask("create-component-doc", params));
        }
    );

    // 12. Create Component Variants
    server.tool(
        "create-component-variants",
        "Generate component variants from a base component.",
        DS.CreateComponentVariantsParamsSchema.shape,
        async (params: DS.CreateComponentVariantsParams) => {
            return await safeToolProcessor(taskManager.runTask("create-component-variants", params));
        }
    );

    // 13. Create Component States
    server.tool(
        "create-component-states",
        "Display all interactive states of a component.",
        DS.CreateComponentStatesParamsSchema.shape,
        async (params: DS.CreateComponentStatesParams) => {
            return await safeToolProcessor(taskManager.runTask("create-component-states", params));
        }
    );

    // 14. Create Component Anatomy
    server.tool(
        "create-component-anatomy",
        "Generate an anatomy diagram showing component parts and dimensions.",
        DS.CreateComponentAnatomyParamsSchema.shape,
        async (params: DS.CreateComponentAnatomyParams) => {
            return await safeToolProcessor(taskManager.runTask("create-component-anatomy", params));
        }
    );

    // 15. Create Component Specs
    server.tool(
        "create-component-specs",
        "Extract and display component specifications: colors, typography, spacing.",
        DS.CreateComponentSpecsParamsSchema.shape,
        async (params: DS.CreateComponentSpecsParams) => {
            return await safeToolProcessor(taskManager.runTask("create-component-specs", params));
        }
    );

    // 16. Create Component Usage
    server.tool(
        "create-component-usage",
        "Document component usage examples and best practices.",
        DS.CreateComponentUsageParamsSchema.shape,
        async (params: DS.CreateComponentUsageParams) => {
            return await safeToolProcessor(taskManager.runTask("create-component-usage", params));
        }
    );

    // 17. Create Component Dos Donts
    server.tool(
        "create-component-dos-donts",
        "Generate do's and don'ts documentation for component usage.",
        DS.CreateComponentDosDontsParamsSchema.shape,
        async (params: DS.CreateComponentDosDontsParams) => {
            return await safeToolProcessor(taskManager.runTask("create-component-dos-donts", params));
        }
    );

    // 18. Create Component Changelog
    server.tool(
        "create-component-changelog",
        "Create a visual changelog for component version history.",
        DS.CreateComponentChangelogParamsSchema.shape,
        async (params: DS.CreateComponentChangelogParams) => {
            return await safeToolProcessor(taskManager.runTask("create-component-changelog", params));
        }
    );

    // 19. Create Component Playground
    server.tool(
        "create-component-playground",
        "Generate an interactive playground for component exploration.",
        DS.CreateComponentPlaygroundParamsSchema.shape,
        async (params: DS.CreateComponentPlaygroundParams) => {
            return await safeToolProcessor(taskManager.runTask("create-component-playground", params));
        }
    );

    // 20. Validate Component Structure
    server.tool(
        "validate-component-structure",
        "Validate component structure against design system rules.",
        DS.ValidateComponentStructureParamsSchema.shape,
        async (params: DS.ValidateComponentStructureParams) => {
            return await safeToolProcessor(taskManager.runTask("validate-component-structure", params));
        }
    );

    // ============================================
    // DOCUMENTATION (10 tools)
    // ============================================

    // 21. Generate Design Principles
    server.tool(
        "generate-design-principles",
        "Generate a visual design principles document.",
        DS.GenerateDesignPrinciplesParamsSchema.shape,
        async (params: DS.GenerateDesignPrinciplesParams) => {
            return await safeToolProcessor(taskManager.runTask("generate-design-principles", params));
        }
    );

    // 22. Generate Brand Guidelines
    server.tool(
        "generate-brand-guidelines",
        "Create comprehensive brand guidelines documentation.",
        DS.GenerateBrandGuidelinesParamsSchema.shape,
        async (params: DS.GenerateBrandGuidelinesParams) => {
            return await safeToolProcessor(taskManager.runTask("generate-brand-guidelines", params));
        }
    );

    // 23. Generate Icon Guidelines
    server.tool(
        "generate-icon-guidelines",
        "Generate icon design guidelines and specifications.",
        DS.GenerateIconGuidelinesParamsSchema.shape,
        async (params: DS.GenerateIconGuidelinesParams) => {
            return await safeToolProcessor(taskManager.runTask("generate-icon-guidelines", params));
        }
    );

    // 24. Generate Illustration Guidelines
    server.tool(
        "generate-illustration-guidelines",
        "Create illustration style guidelines and examples.",
        DS.GenerateIllustrationGuidelinesParamsSchema.shape,
        async (params: DS.GenerateIllustrationGuidelinesParams) => {
            return await safeToolProcessor(taskManager.runTask("generate-illustration-guidelines", params));
        }
    );

    // 25. Generate Motion Guidelines
    server.tool(
        "generate-motion-guidelines",
        "Generate motion design guidelines with timings and easings.",
        DS.GenerateMotionGuidelinesParamsSchema.shape,
        async (params: DS.GenerateMotionGuidelinesParams) => {
            return await safeToolProcessor(taskManager.runTask("generate-motion-guidelines", params));
        }
    );

    // 26. Generate Writing Guidelines
    server.tool(
        "generate-writing-guidelines",
        "Create content and writing guidelines for UI copy.",
        DS.GenerateWritingGuidelinesParamsSchema.shape,
        async (params: DS.GenerateWritingGuidelinesParams) => {
            return await safeToolProcessor(taskManager.runTask("generate-writing-guidelines", params));
        }
    );

    // 27. Generate Accessibility Guidelines
    server.tool(
        "generate-accessibility-guidelines",
        "Generate accessibility guidelines and checklists.",
        DS.GenerateAccessibilityGuidelinesParamsSchema.shape,
        async (params: DS.GenerateAccessibilityGuidelinesParams) => {
            return await safeToolProcessor(taskManager.runTask("generate-accessibility-guidelines", params));
        }
    );

    // 28. Generate Contribution Guide
    server.tool(
        "generate-contribution-guide",
        "Create a contribution guide for design system contributors.",
        DS.GenerateContributionGuideParamsSchema.shape,
        async (params: DS.GenerateContributionGuideParams) => {
            return await safeToolProcessor(taskManager.runTask("generate-contribution-guide", params));
        }
    );

    // 29. Generate Changelog
    server.tool(
        "generate-changelog",
        "Generate a visual changelog for design system releases.",
        DS.GenerateChangelogParamsSchema.shape,
        async (params: DS.GenerateChangelogParams) => {
            return await safeToolProcessor(taskManager.runTask("generate-changelog", params));
        }
    );

    // 30. Generate Migration Guide
    server.tool(
        "generate-migration-guide",
        "Create a migration guide for design system version updates.",
        DS.GenerateMigrationGuideParamsSchema.shape,
        async (params: DS.GenerateMigrationGuideParams) => {
            return await safeToolProcessor(taskManager.runTask("generate-migration-guide", params));
        }
    );
}
