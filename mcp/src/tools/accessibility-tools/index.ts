import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../utils.js";
import * as AX from "../../shared/types/params/accessibility-tools/index.js";

/**
 * Accessibility Tools (25 tools)
 * Tools for checking, fixing, and creating accessible designs
 */
export function registerAccessibilityTools(server: McpServer, taskManager: TaskManager) {
    // ============================================
    // ACCESSIBILITY CHECKS (15 tools)
    // ============================================

    // 1. Check Color Contrast
    server.tool(
        "check-color-contrast",
        "Check color contrast ratios and optionally auto-fix issues.",
        AX.CheckColorContrastParamsSchema.shape,
        async (params: AX.CheckColorContrastParams) => {
            return await safeToolProcessor(taskManager.runTask("check-color-contrast", params));
        }
    );

    // 2. Check Text Sizing
    server.tool(
        "check-text-sizing",
        "Check text sizes meet accessibility minimums.",
        AX.CheckTextSizingParamsSchema.shape,
        async (params: AX.CheckTextSizingParams) => {
            return await safeToolProcessor(taskManager.runTask("check-text-sizing", params));
        }
    );

    // 3. Check Touch Targets
    server.tool(
        "check-touch-targets",
        "Check touch target sizes and spacing for mobile accessibility.",
        AX.CheckTouchTargetsParamsSchema.shape,
        async (params: AX.CheckTouchTargetsParams) => {
            return await safeToolProcessor(taskManager.runTask("check-touch-targets", params));
        }
    );

    // 4. Check Focus Indicators
    server.tool(
        "check-focus-indicators",
        "Check focus indicator visibility and styling.",
        AX.CheckFocusIndicatorsParamsSchema.shape,
        async (params: AX.CheckFocusIndicatorsParams) => {
            return await safeToolProcessor(taskManager.runTask("check-focus-indicators", params));
        }
    );

    // 5. Check Heading Structure
    server.tool(
        "check-heading-structure",
        "Check heading hierarchy and structure.",
        AX.CheckHeadingStructureParamsSchema.shape,
        async (params: AX.CheckHeadingStructureParams) => {
            return await safeToolProcessor(taskManager.runTask("check-heading-structure", params));
        }
    );

    // 6. Check Link Text
    server.tool(
        "check-link-text",
        "Check link text for descriptiveness and avoid banned phrases.",
        AX.CheckLinkTextParamsSchema.shape,
        async (params: AX.CheckLinkTextParams) => {
            return await safeToolProcessor(taskManager.runTask("check-link-text", params));
        }
    );

    // 7. Check Alt Text
    server.tool(
        "check-alt-text",
        "Check and suggest alt text for images and icons.",
        AX.CheckAltTextParamsSchema.shape,
        async (params: AX.CheckAltTextParams) => {
            return await safeToolProcessor(taskManager.runTask("check-alt-text", params));
        }
    );

    // 8. Check Form Labels
    server.tool(
        "check-form-labels",
        "Check form field labels, placeholders, and error messages.",
        AX.CheckFormLabelsParamsSchema.shape,
        async (params: AX.CheckFormLabelsParams) => {
            return await safeToolProcessor(taskManager.runTask("check-form-labels", params));
        }
    );

    // 9. Check Error Messages
    server.tool(
        "check-error-messages",
        "Check error message clarity, actionability, and visibility.",
        AX.CheckErrorMessagesParamsSchema.shape,
        async (params: AX.CheckErrorMessagesParams) => {
            return await safeToolProcessor(taskManager.runTask("check-error-messages", params));
        }
    );

    // 10. Check Keyboard Access
    server.tool(
        "check-keyboard-access",
        "Check keyboard accessibility: focusable elements, tab order, traps.",
        AX.CheckKeyboardAccessParamsSchema.shape,
        async (params: AX.CheckKeyboardAccessParams) => {
            return await safeToolProcessor(taskManager.runTask("check-keyboard-access", params));
        }
    );

    // 11. Check Skip Links
    server.tool(
        "check-skip-links",
        "Check for skip links and their proper implementation.",
        AX.CheckSkipLinksParamsSchema.shape,
        async (params: AX.CheckSkipLinksParams) => {
            return await safeToolProcessor(taskManager.runTask("check-skip-links", params));
        }
    );

    // 12. Check Landmark Regions
    server.tool(
        "check-landmark-regions",
        "Check for proper ARIA landmark regions.",
        AX.CheckLandmarkRegionsParamsSchema.shape,
        async (params: AX.CheckLandmarkRegionsParams) => {
            return await safeToolProcessor(taskManager.runTask("check-landmark-regions", params));
        }
    );

    // 13. Check Live Regions
    server.tool(
        "check-live-regions",
        "Check for proper ARIA live region implementation.",
        AX.CheckLiveRegionsParamsSchema.shape,
        async (params: AX.CheckLiveRegionsParams) => {
            return await safeToolProcessor(taskManager.runTask("check-live-regions", params));
        }
    );

    // 14. Check Motion Preference
    server.tool(
        "check-motion-preference",
        "Check animation handling for reduced motion preferences.",
        AX.CheckMotionPreferenceParamsSchema.shape,
        async (params: AX.CheckMotionPreferenceParams) => {
            return await safeToolProcessor(taskManager.runTask("check-motion-preference", params));
        }
    );

    // 15. Check High Contrast
    server.tool(
        "check-high-contrast",
        "Check high contrast mode compatibility.",
        AX.CheckHighContrastParamsSchema.shape,
        async (params: AX.CheckHighContrastParams) => {
            return await safeToolProcessor(taskManager.runTask("check-high-contrast", params));
        }
    );

    // ============================================
    // ACCESSIBILITY FIXES & GENERATORS (10 tools)
    // ============================================

    // 16. Generate Accessibility Report
    server.tool(
        "generate-accessibility-report",
        "Generate a comprehensive accessibility audit report.",
        AX.GenerateAccessibilityReportParamsSchema.shape,
        async (params: AX.GenerateAccessibilityReportParams) => {
            return await safeToolProcessor(taskManager.runTask("generate-accessibility-report", params));
        }
    );

    // 17. Fix Contrast Issues
    server.tool(
        "fix-contrast-issues",
        "Automatically fix color contrast issues while preserving design intent.",
        AX.FixContrastIssuesParamsSchema.shape,
        async (params: AX.FixContrastIssuesParams) => {
            return await safeToolProcessor(taskManager.runTask("fix-contrast-issues", params));
        }
    );

    // 18. Fix Touch Target Size
    server.tool(
        "fix-touch-target-size",
        "Fix touch target sizes to meet accessibility guidelines.",
        AX.FixTouchTargetSizeParamsSchema.shape,
        async (params: AX.FixTouchTargetSizeParams) => {
            return await safeToolProcessor(taskManager.runTask("fix-touch-target-size", params));
        }
    );

    // 19. Add ARIA Labels
    server.tool(
        "add-aria-labels",
        "Add or suggest ARIA labels for interactive elements.",
        AX.AddAriaLabelsParamsSchema.shape,
        async (params: AX.AddAriaLabelsParams) => {
            return await safeToolProcessor(taskManager.runTask("add-aria-labels", params));
        }
    );

    // 20. Add Focus Styles
    server.tool(
        "add-focus-styles",
        "Add visible focus styles to interactive elements.",
        AX.AddFocusStylesParamsSchema.shape,
        async (params: AX.AddFocusStylesParams) => {
            return await safeToolProcessor(taskManager.runTask("add-focus-styles", params));
        }
    );

    // 21. Create Accessible Form
    server.tool(
        "create-accessible-form",
        "Create a fully accessible form with proper labels and error handling.",
        AX.CreateAccessibleFormParamsSchema.shape,
        async (params: AX.CreateAccessibleFormParams) => {
            return await safeToolProcessor(taskManager.runTask("create-accessible-form", params));
        }
    );

    // 22. Create Accessible Modal
    server.tool(
        "create-accessible-modal",
        "Create an accessible modal with focus trap and keyboard support.",
        AX.CreateAccessibleModalParamsSchema.shape,
        async (params: AX.CreateAccessibleModalParams) => {
            return await safeToolProcessor(taskManager.runTask("create-accessible-modal", params));
        }
    );

    // 23. Create Accessible Tabs
    server.tool(
        "create-accessible-tabs",
        "Create accessible tab navigation with ARIA support.",
        AX.CreateAccessibleTabsParamsSchema.shape,
        async (params: AX.CreateAccessibleTabsParams) => {
            return await safeToolProcessor(taskManager.runTask("create-accessible-tabs", params));
        }
    );

    // 24. Create Accessible Carousel
    server.tool(
        "create-accessible-carousel",
        "Create an accessible carousel with proper controls and announcements.",
        AX.CreateAccessibleCarouselParamsSchema.shape,
        async (params: AX.CreateAccessibleCarouselParams) => {
            return await safeToolProcessor(taskManager.runTask("create-accessible-carousel", params));
        }
    );

    // 25. Create Screen Reader Text
    server.tool(
        "create-screen-reader-text",
        "Add screen reader only text for additional context.",
        AX.CreateScreenReaderTextParamsSchema.shape,
        async (params: AX.CreateScreenReaderTextParams) => {
            return await safeToolProcessor(taskManager.runTask("create-screen-reader-text", params));
        }
    );
}
