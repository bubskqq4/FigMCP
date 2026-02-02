import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../utils.js";
import * as AN from "../../shared/types/params/analysis/index.js";

/**
 * Analysis Tools (50 tools)
 * Tools for analyzing designs for visual, UX, accessibility, and performance issues
 */
export function registerAnalysisTools(server: McpServer, taskManager: TaskManager) {
    // ============================================
    // VISUAL ANALYSIS (15 tools)
    // ============================================

    // 1. Analyze Color Harmony
    server.tool(
        "analyze-color-harmony",
        "Analyze color harmony in the design and suggest improvements based on color theory.",
        AN.AnalyzeColorHarmonyParamsSchema.shape,
        async (params: AN.AnalyzeColorHarmonyParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-color-harmony", params));
        }
    );

    // 2. Analyze Contrast Ratio
    server.tool(
        "analyze-contrast-ratio",
        "Check color contrast ratios against WCAG guidelines for accessibility.",
        AN.AnalyzeContrastRatioParamsSchema.shape,
        async (params: AN.AnalyzeContrastRatioParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-contrast-ratio", params));
        }
    );

    // 3. Analyze Color Blindness
    server.tool(
        "analyze-color-blindness",
        "Simulate and analyze the design for various types of color blindness.",
        AN.AnalyzeColorBlindnessParamsSchema.shape,
        async (params: AN.AnalyzeColorBlindnessParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-color-blindness", params));
        }
    );

    // 4. Analyze Visual Hierarchy
    server.tool(
        "analyze-visual-hierarchy",
        "Analyze visual hierarchy and suggest improvements for element prominence.",
        AN.AnalyzeVisualHierarchyParamsSchema.shape,
        async (params: AN.AnalyzeVisualHierarchyParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-visual-hierarchy", params));
        }
    );

    // 5. Analyze Whitespace
    server.tool(
        "analyze-whitespace",
        "Analyze whitespace usage, consistency, and balance in the design.",
        AN.AnalyzeWhitespaceParamsSchema.shape,
        async (params: AN.AnalyzeWhitespaceParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-whitespace", params));
        }
    );

    // 6. Analyze Alignment
    server.tool(
        "analyze-alignment",
        "Check element alignment and grid adherence for visual consistency.",
        AN.AnalyzeAlignmentParamsSchema.shape,
        async (params: AN.AnalyzeAlignmentParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-alignment", params));
        }
    );

    // 7. Analyze Balance
    server.tool(
        "analyze-balance",
        "Analyze visual balance including symmetrical, asymmetrical, and radial balance.",
        AN.AnalyzeBalanceParamsSchema.shape,
        async (params: AN.AnalyzeBalanceParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-balance", params));
        }
    );

    // 8. Analyze Proximity
    server.tool(
        "analyze-proximity",
        "Analyze proximity relationships between elements for proper grouping.",
        AN.AnalyzeProximityParamsSchema.shape,
        async (params: AN.AnalyzeProximityParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-proximity", params));
        }
    );

    // 9. Analyze Repetition
    server.tool(
        "analyze-repetition",
        "Check for consistent repetition of visual elements, colors, and patterns.",
        AN.AnalyzeRepetitionParamsSchema.shape,
        async (params: AN.AnalyzeRepetitionParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-repetition", params));
        }
    );

    // 10. Analyze Typography Scale
    server.tool(
        "analyze-typography-scale",
        "Analyze typography scale consistency and suggest improvements.",
        AN.AnalyzeTypographyScaleParamsSchema.shape,
        async (params: AN.AnalyzeTypographyScaleParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-typography-scale", params));
        }
    );

    // 11. Analyze Font Pairing
    server.tool(
        "analyze-font-pairing",
        "Analyze font usage and suggest better font pairing combinations.",
        AN.AnalyzeFontPairingParamsSchema.shape,
        async (params: AN.AnalyzeFontPairingParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-font-pairing", params));
        }
    );

    // 12. Analyze Icon Consistency
    server.tool(
        "analyze-icon-consistency",
        "Check icon consistency in size, stroke, style, and alignment.",
        AN.AnalyzeIconConsistencyParamsSchema.shape,
        async (params: AN.AnalyzeIconConsistencyParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-icon-consistency", params));
        }
    );

    // 13. Analyze Image Quality
    server.tool(
        "analyze-image-quality",
        "Analyze image quality, resolution, and compression for optimal display.",
        AN.AnalyzeImageQualityParamsSchema.shape,
        async (params: AN.AnalyzeImageQualityParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-image-quality", params));
        }
    );

    // 14. Analyze Aspect Ratios
    server.tool(
        "analyze-aspect-ratios",
        "Check aspect ratios of images and containers against standards.",
        AN.AnalyzeAspectRatiosParamsSchema.shape,
        async (params: AN.AnalyzeAspectRatiosParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-aspect-ratios", params));
        }
    );

    // 15. Analyze Golden Ratio
    server.tool(
        "analyze-golden-ratio",
        "Analyze use of golden ratio in dimensions, spacing, and positioning.",
        AN.AnalyzeGoldenRatioParamsSchema.shape,
        async (params: AN.AnalyzeGoldenRatioParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-golden-ratio", params));
        }
    );

    // ============================================
    // UX ANALYSIS (15 tools)
    // ============================================

    // 16. Analyze Cognitive Load
    server.tool(
        "analyze-cognitive-load",
        "Analyze cognitive load and complexity of the interface.",
        AN.AnalyzeCognitiveLoadParamsSchema.shape,
        async (params: AN.AnalyzeCognitiveLoadParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-cognitive-load", params));
        }
    );

    // 17. Analyze Information Scent
    server.tool(
        "analyze-information-scent",
        "Analyze information scent - how well elements indicate their destination.",
        AN.AnalyzeInformationScentParamsSchema.shape,
        async (params: AN.AnalyzeInformationScentParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-information-scent", params));
        }
    );

    // 18. Analyze Affordances
    server.tool(
        "analyze-affordances",
        "Check if interactive elements clearly communicate their affordances.",
        AN.AnalyzeAffordancesParamsSchema.shape,
        async (params: AN.AnalyzeAffordancesParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-affordances", params));
        }
    );

    // 19. Analyze Signifiers
    server.tool(
        "analyze-signifiers",
        "Analyze signifiers that indicate how to interact with elements.",
        AN.AnalyzeSignifiersParamsSchema.shape,
        async (params: AN.AnalyzeSignifiersParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-signifiers", params));
        }
    );

    // 20. Analyze Feedback Loops
    server.tool(
        "analyze-feedback-loops",
        "Check feedback mechanisms for user actions and state changes.",
        AN.AnalyzeFeedbackLoopsParamsSchema.shape,
        async (params: AN.AnalyzeFeedbackLoopsParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-feedback-loops", params));
        }
    );

    // 21. Analyze Error Prevention
    server.tool(
        "analyze-error-prevention",
        "Analyze error prevention measures in forms and interactions.",
        AN.AnalyzeErrorPreventionParamsSchema.shape,
        async (params: AN.AnalyzeErrorPreventionParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-error-prevention", params));
        }
    );

    // 22. Analyze Recognition vs Recall
    server.tool(
        "analyze-recognition-recall",
        "Check if interface supports recognition over recall.",
        AN.AnalyzeRecognitionRecallParamsSchema.shape,
        async (params: AN.AnalyzeRecognitionRecallParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-recognition-recall", params));
        }
    );

    // 23. Analyze Flexibility
    server.tool(
        "analyze-flexibility",
        "Analyze interface flexibility for different user expertise levels.",
        AN.AnalyzeFlexibilityParamsSchema.shape,
        async (params: AN.AnalyzeFlexibilityParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-flexibility", params));
        }
    );

    // 24. Analyze Aesthetic Usability
    server.tool(
        "analyze-aesthetic-usability",
        "Analyze visual appeal and polish that affects perceived usability.",
        AN.AnalyzeAestheticUsabilityParamsSchema.shape,
        async (params: AN.AnalyzeAestheticUsabilityParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-aesthetic-usability", params));
        }
    );

    // 25. Analyze Serial Position
    server.tool(
        "analyze-serial-position",
        "Analyze placement of important items per serial position effect.",
        AN.AnalyzeSerialPositionParamsSchema.shape,
        async (params: AN.AnalyzeSerialPositionParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-serial-position", params));
        }
    );

    // 26. Analyze Hicks Law
    server.tool(
        "analyze-hicks-law",
        "Analyze decision time based on number of choices (Hick's Law).",
        AN.AnalyzeHicksLawParamsSchema.shape,
        async (params: AN.AnalyzeHicksLawParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-hicks-law", params));
        }
    );

    // 27. Analyze Fitts Law
    server.tool(
        "analyze-fitts-law",
        "Analyze target sizes and distances per Fitts's Law for usability.",
        AN.AnalyzeFittsLawParamsSchema.shape,
        async (params: AN.AnalyzeFittsLawParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-fitts-law", params));
        }
    );

    // 28. Analyze Millers Law
    server.tool(
        "analyze-millers-law",
        "Check information chunking against Miller's Law (7±2 items).",
        AN.AnalyzeMillersLawParamsSchema.shape,
        async (params: AN.AnalyzeMillersLawParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-millers-law", params));
        }
    );

    // 29. Analyze Jakobs Law
    server.tool(
        "analyze-jakobs-law",
        "Check if design follows common UI patterns users expect.",
        AN.AnalyzeJakobsLawParamsSchema.shape,
        async (params: AN.AnalyzeJakobsLawParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-jakobs-law", params));
        }
    );

    // 30. Analyze Gestalt Principles
    server.tool(
        "analyze-gestalt-principles",
        "Analyze application of Gestalt principles: proximity, similarity, etc.",
        AN.AnalyzeGestaltPrinciplesParamsSchema.shape,
        async (params: AN.AnalyzeGestaltPrinciplesParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-gestalt-principles", params));
        }
    );

    // ============================================
    // ACCESSIBILITY ANALYSIS (10 tools)
    // ============================================

    // 31. Analyze WCAG AA
    server.tool(
        "analyze-wcag-aa",
        "Comprehensive WCAG 2.1 Level AA compliance analysis.",
        AN.AnalyzeWcagAAParamsSchema.shape,
        async (params: AN.AnalyzeWcagAAParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-wcag-aa", params));
        }
    );

    // 32. Analyze WCAG AAA
    server.tool(
        "analyze-wcag-aaa",
        "Enhanced WCAG 2.1 Level AAA compliance analysis.",
        AN.AnalyzeWcagAAAParamsSchema.shape,
        async (params: AN.AnalyzeWcagAAAParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-wcag-aaa", params));
        }
    );

    // 33. Analyze Screen Reader
    server.tool(
        "analyze-screen-reader",
        "Analyze screen reader compatibility: headings, landmarks, labels.",
        AN.AnalyzeScreenReaderParamsSchema.shape,
        async (params: AN.AnalyzeScreenReaderParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-screen-reader", params));
        }
    );

    // 34. Analyze Keyboard Nav
    server.tool(
        "analyze-keyboard-nav",
        "Analyze keyboard navigation: focus order, visibility, traps.",
        AN.AnalyzeKeyboardNavParamsSchema.shape,
        async (params: AN.AnalyzeKeyboardNavParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-keyboard-nav", params));
        }
    );

    // 35. Analyze Focus Order
    server.tool(
        "analyze-focus-order",
        "Analyze and suggest logical focus order for interactive elements.",
        AN.AnalyzeFocusOrderParamsSchema.shape,
        async (params: AN.AnalyzeFocusOrderParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-focus-order", params));
        }
    );

    // 36. Analyze Color Contrast
    server.tool(
        "analyze-color-contrast",
        "Deep color contrast analysis for text, graphics, and UI components.",
        AN.AnalyzeColorContrastParamsSchema.shape,
        async (params: AN.AnalyzeColorContrastParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-color-contrast", params));
        }
    );

    // 37. Analyze Text Size
    server.tool(
        "analyze-text-size",
        "Analyze text size, scalability, line height, and letter spacing.",
        AN.AnalyzeTextSizeParamsSchema.shape,
        async (params: AN.AnalyzeTextSizeParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-text-size", params));
        }
    );

    // 38. Analyze Touch Targets
    server.tool(
        "analyze-touch-targets",
        "Analyze touch target sizes and spacing for mobile accessibility.",
        AN.AnalyzeTouchTargetsParamsSchema.shape,
        async (params: AN.AnalyzeTouchTargetsParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-touch-targets", params));
        }
    );

    // 39. Analyze Alt Text
    server.tool(
        "analyze-alt-text",
        "Check and suggest alt text for images and icons.",
        AN.AnalyzeAltTextParamsSchema.shape,
        async (params: AN.AnalyzeAltTextParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-alt-text", params));
        }
    );

    // 40. Analyze ARIA Labels
    server.tool(
        "analyze-aria-labels",
        "Analyze and suggest ARIA labels for interactive elements.",
        AN.AnalyzeAriaLabelsParamsSchema.shape,
        async (params: AN.AnalyzeAriaLabelsParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-aria-labels", params));
        }
    );

    // ============================================
    // PERFORMANCE ANALYSIS (10 tools)
    // ============================================

    // 41. Analyze Component Count
    server.tool(
        "analyze-component-count",
        "Analyze component count, distribution, and potential duplicates.",
        AN.AnalyzeComponentCountParamsSchema.shape,
        async (params: AN.AnalyzeComponentCountParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-component-count", params));
        }
    );

    // 42. Analyze Layer Depth
    server.tool(
        "analyze-layer-depth",
        "Analyze layer nesting depth and suggest flattening opportunities.",
        AN.AnalyzeLayerDepthParamsSchema.shape,
        async (params: AN.AnalyzeLayerDepthParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-layer-depth", params));
        }
    );

    // 43. Analyze Image Optimization
    server.tool(
        "analyze-image-optimization",
        "Analyze image optimization: format, dimensions, compression.",
        AN.AnalyzeImageOptimizationParamsSchema.shape,
        async (params: AN.AnalyzeImageOptimizationParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-image-optimization", params));
        }
    );

    // 44. Analyze Animation Performance
    server.tool(
        "analyze-animation-performance",
        "Analyze animation complexity and performance implications.",
        AN.AnalyzeAnimationPerformanceParamsSchema.shape,
        async (params: AN.AnalyzeAnimationPerformanceParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-animation-performance", params));
        }
    );

    // 45. Analyze Responsive Breakpoints
    server.tool(
        "analyze-responsive-breakpoints",
        "Analyze responsive behavior across breakpoints.",
        AN.AnalyzeResponsiveBreakpointsParamsSchema.shape,
        async (params: AN.AnalyzeResponsiveBreakpointsParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-responsive-breakpoints", params));
        }
    );

    // 46. Analyze Design Tokens
    server.tool(
        "analyze-design-tokens",
        "Analyze design token usage and suggest tokenization opportunities.",
        AN.AnalyzeDesignTokensParamsSchema.shape,
        async (params: AN.AnalyzeDesignTokensParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-design-tokens", params));
        }
    );

    // 47. Analyze Component Reuse
    server.tool(
        "analyze-component-reuse",
        "Analyze component reuse opportunities and detect similar elements.",
        AN.AnalyzeComponentReuseParamsSchema.shape,
        async (params: AN.AnalyzeComponentReuseParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-component-reuse", params));
        }
    );

    // 48. Analyze Style Consistency
    server.tool(
        "analyze-style-consistency",
        "Check style consistency across colors, typography, spacing, etc.",
        AN.AnalyzeStyleConsistencyParamsSchema.shape,
        async (params: AN.AnalyzeStyleConsistencyParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-style-consistency", params));
        }
    );

    // 49. Analyze Naming Conventions
    server.tool(
        "analyze-naming-conventions",
        "Analyze layer, component, and style naming for consistency.",
        AN.AnalyzeNamingConventionsParamsSchema.shape,
        async (params: AN.AnalyzeNamingConventionsParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-naming-conventions", params));
        }
    );

    // 50. Analyze File Size
    server.tool(
        "analyze-file-size",
        "Analyze file size contributors and suggest optimizations.",
        AN.AnalyzeFileSizeParamsSchema.shape,
        async (params: AN.AnalyzeFileSizeParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-file-size", params));
        }
    );
}
