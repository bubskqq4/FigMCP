import { z } from "zod";

// ============================================
// ACCESSIBILITY TOOL SCHEMAS (25 tools)
// ============================================

// ============================================
// ACCESSIBILITY CHECKS (15 tools)
// ============================================

// 1. Check Color Contrast
export const CheckColorContrastParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to check"),
    level: z.enum(["AA", "AAA"]).optional().default("AA"),
    includeChildren: z.boolean().optional().default(true),
    autoFix: z.boolean().optional().default(false),
    suggestAlternatives: z.boolean().optional().default(true),
});
export type CheckColorContrastParams = z.infer<typeof CheckColorContrastParamsSchema>;

// 2. Check Text Sizing
export const CheckTextSizingParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to check"),
    minBodySize: z.number().optional().default(16),
    minSmallTextSize: z.number().optional().default(12),
    includeChildren: z.boolean().optional().default(true),
    checkLineHeight: z.boolean().optional().default(true),
    autoFix: z.boolean().optional().default(false),
});
export type CheckTextSizingParams = z.infer<typeof CheckTextSizingParamsSchema>;

// 3. Check Touch Targets
export const CheckTouchTargetsParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to check"),
    minSize: z.number().optional().default(44),
    minSpacing: z.number().optional().default(8),
    platform: z.enum(["ios", "android", "web"]).optional().default("web"),
    includeChildren: z.boolean().optional().default(true),
    autoFix: z.boolean().optional().default(false),
});
export type CheckTouchTargetsParams = z.infer<typeof CheckTouchTargetsParamsSchema>;

// 4. Check Focus Indicators
export const CheckFocusIndicatorsParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to check"),
    includeChildren: z.boolean().optional().default(true),
    minOffset: z.number().optional().default(2),
    minWidth: z.number().optional().default(2),
    checkVisibility: z.boolean().optional().default(true),
    autoFix: z.boolean().optional().default(false),
});
export type CheckFocusIndicatorsParams = z.infer<typeof CheckFocusIndicatorsParamsSchema>;

// 5. Check Heading Structure
export const CheckHeadingStructureParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to check"),
    includeChildren: z.boolean().optional().default(true),
    checkHierarchy: z.boolean().optional().default(true),
    checkSkippedLevels: z.boolean().optional().default(true),
    suggestFixes: z.boolean().optional().default(true),
});
export type CheckHeadingStructureParams = z.infer<typeof CheckHeadingStructureParamsSchema>;

// 6. Check Link Text
export const CheckLinkTextParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to check"),
    includeChildren: z.boolean().optional().default(true),
    bannedPhrases: z.array(z.string()).optional().default(["click here", "read more", "learn more"]),
    minLength: z.number().optional().default(4),
    suggestAlternatives: z.boolean().optional().default(true),
});
export type CheckLinkTextParams = z.infer<typeof CheckLinkTextParamsSchema>;

// 7. Check Alt Text
export const CheckAltTextParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to check"),
    includeChildren: z.boolean().optional().default(true),
    checkImages: z.boolean().optional().default(true),
    checkIcons: z.boolean().optional().default(true),
    flagMissing: z.boolean().optional().default(true),
    suggestAltText: z.boolean().optional().default(true),
});
export type CheckAltTextParams = z.infer<typeof CheckAltTextParamsSchema>;

// 8. Check Form Labels
export const CheckFormLabelsParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to check"),
    includeChildren: z.boolean().optional().default(true),
    checkAssociation: z.boolean().optional().default(true),
    checkPlaceholder: z.boolean().optional().default(true),
    checkRequired: z.boolean().optional().default(true),
    checkErrorMessages: z.boolean().optional().default(true),
});
export type CheckFormLabelsParams = z.infer<typeof CheckFormLabelsParamsSchema>;

// 9. Check Error Messages
export const CheckErrorMessagesParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to check"),
    includeChildren: z.boolean().optional().default(true),
    checkClarity: z.boolean().optional().default(true),
    checkActionable: z.boolean().optional().default(true),
    checkColor: z.boolean().optional().default(true),
    checkIcon: z.boolean().optional().default(true),
});
export type CheckErrorMessagesParams = z.infer<typeof CheckErrorMessagesParamsSchema>;

// 10. Check Keyboard Access
export const CheckKeyboardAccessParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to check"),
    includeChildren: z.boolean().optional().default(true),
    checkFocusable: z.boolean().optional().default(true),
    checkTabOrder: z.boolean().optional().default(true),
    checkKeyboardTraps: z.boolean().optional().default(true),
    checkShortcuts: z.boolean().optional().default(true),
});
export type CheckKeyboardAccessParams = z.infer<typeof CheckKeyboardAccessParamsSchema>;

// 11. Check Skip Links
export const CheckSkipLinksParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to check"),
    includeChildren: z.boolean().optional().default(true),
    checkPresence: z.boolean().optional().default(true),
    checkVisibility: z.boolean().optional().default(true),
    checkTargets: z.boolean().optional().default(true),
});
export type CheckSkipLinksParams = z.infer<typeof CheckSkipLinksParamsSchema>;

// 12. Check Landmark Regions
export const CheckLandmarkRegionsParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to check"),
    includeChildren: z.boolean().optional().default(true),
    requiredLandmarks: z.array(z.enum(["banner", "navigation", "main", "contentinfo", "complementary", "search", "form"])).optional(),
    checkLabels: z.boolean().optional().default(true),
});
export type CheckLandmarkRegionsParams = z.infer<typeof CheckLandmarkRegionsParamsSchema>;

// 13. Check Live Regions
export const CheckLiveRegionsParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to check"),
    includeChildren: z.boolean().optional().default(true),
    checkToasts: z.boolean().optional().default(true),
    checkAlerts: z.boolean().optional().default(true),
    checkUpdates: z.boolean().optional().default(true),
    checkPoliteness: z.boolean().optional().default(true),
});
export type CheckLiveRegionsParams = z.infer<typeof CheckLiveRegionsParamsSchema>;

// 14. Check Motion Preference
export const CheckMotionPreferenceParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to check"),
    includeChildren: z.boolean().optional().default(true),
    checkAnimations: z.boolean().optional().default(true),
    checkAutoPlay: z.boolean().optional().default(true),
    checkDuration: z.boolean().optional().default(true),
    maxDuration: z.number().optional().default(5000),
});
export type CheckMotionPreferenceParams = z.infer<typeof CheckMotionPreferenceParamsSchema>;

// 15. Check High Contrast
export const CheckHighContrastParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to check"),
    includeChildren: z.boolean().optional().default(true),
    mode: z.enum(["light", "dark", "both"]).optional().default("both"),
    checkBorders: z.boolean().optional().default(true),
    checkIcons: z.boolean().optional().default(true),
    suggestFixes: z.boolean().optional().default(true),
});
export type CheckHighContrastParams = z.infer<typeof CheckHighContrastParamsSchema>;

// ============================================
// ACCESSIBILITY FIXES & GENERATORS (10 tools)
// ============================================

// 16. Generate Accessibility Report
export const GenerateAccessibilityReportParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    level: z.enum(["A", "AA", "AAA"]).optional().default("AA"),
    format: z.enum(["visual", "table", "json"]).optional().default("visual"),
    includeRecommendations: z.boolean().optional().default(true),
    parentId: z.string().optional(),
});
export type GenerateAccessibilityReportParams = z.infer<typeof GenerateAccessibilityReportParamsSchema>;

// 17. Fix Contrast Issues
export const FixContrastIssuesParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to fix"),
    includeChildren: z.boolean().optional().default(true),
    level: z.enum(["AA", "AAA"]).optional().default("AA"),
    preserveHue: z.boolean().optional().default(true),
    adjustBackground: z.boolean().optional().default(false),
    adjustForeground: z.boolean().optional().default(true),
});
export type FixContrastIssuesParams = z.infer<typeof FixContrastIssuesParamsSchema>;

// 18. Fix Touch Target Size
export const FixTouchTargetSizeParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to fix"),
    includeChildren: z.boolean().optional().default(true),
    minSize: z.number().optional().default(44),
    minSpacing: z.number().optional().default(8),
    addPadding: z.boolean().optional().default(true),
    resizeElement: z.boolean().optional().default(false),
});
export type FixTouchTargetSizeParams = z.infer<typeof FixTouchTargetSizeParamsSchema>;

// 19. Add ARIA Labels
export const AddAriaLabelsParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to enhance"),
    includeChildren: z.boolean().optional().default(true),
    targetElements: z.array(z.enum(["buttons", "links", "inputs", "images", "icons"])).optional(),
    useAI: z.boolean().optional().default(true).describe("Use AI to suggest labels"),
    language: z.string().optional().default("en"),
});
export type AddAriaLabelsParams = z.infer<typeof AddAriaLabelsParamsSchema>;

// 20. Add Focus Styles
export const AddFocusStylesParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to enhance"),
    includeChildren: z.boolean().optional().default(true),
    style: z.enum(["outline", "ring", "underline", "background"]).optional().default("ring"),
    color: z.string().optional(),
    offset: z.number().optional().default(2),
    width: z.number().optional().default(2),
});
export type AddFocusStylesParams = z.infer<typeof AddFocusStylesParamsSchema>;

// 21. Create Accessible Form
export const CreateAccessibleFormParamsSchema = z.object({
    fields: z.array(z.object({
        type: z.enum(["text", "email", "password", "tel", "number", "date", "select", "textarea", "checkbox", "radio"]),
        label: z.string(),
        name: z.string(),
        required: z.boolean().optional(),
        helpText: z.string().optional(),
        errorMessage: z.string().optional(),
        options: z.array(z.string()).optional(),
    })),
    showLabels: z.boolean().optional().default(true),
    showRequiredIndicator: z.boolean().optional().default(true),
    showHelpText: z.boolean().optional().default(true),
    groupRelatedFields: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateAccessibleFormParams = z.infer<typeof CreateAccessibleFormParamsSchema>;

// 22. Create Accessible Modal
export const CreateAccessibleModalParamsSchema = z.object({
    title: z.string(),
    content: z.string().optional(),
    primaryAction: z.string().optional(),
    secondaryAction: z.string().optional(),
    showCloseButton: z.boolean().optional().default(true),
    trapFocus: z.boolean().optional().default(true),
    returnFocus: z.boolean().optional().default(true),
    closeOnEscape: z.boolean().optional().default(true),
    closeOnOverlay: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateAccessibleModalParams = z.infer<typeof CreateAccessibleModalParamsSchema>;

// 23. Create Accessible Tabs
export const CreateAccessibleTabsParamsSchema = z.object({
    tabs: z.array(z.object({
        label: z.string(),
        content: z.string().optional(),
        icon: z.string().optional(),
    })),
    orientation: z.enum(["horizontal", "vertical"]).optional().default("horizontal"),
    activationMode: z.enum(["automatic", "manual"]).optional().default("automatic"),
    showIcons: z.boolean().optional().default(false),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateAccessibleTabsParams = z.infer<typeof CreateAccessibleTabsParamsSchema>;

// 24. Create Accessible Carousel
export const CreateAccessibleCarouselParamsSchema = z.object({
    slides: z.array(z.object({
        title: z.string().optional(),
        content: z.string().optional(),
        imageUrl: z.string().optional(),
        imageAlt: z.string().optional(),
    })),
    autoPlay: z.boolean().optional().default(false),
    showControls: z.boolean().optional().default(true),
    showIndicators: z.boolean().optional().default(true),
    pauseOnHover: z.boolean().optional().default(true),
    announceSlideChange: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateAccessibleCarouselParams = z.infer<typeof CreateAccessibleCarouselParamsSchema>;

// 25. Create Screen Reader Text
export const CreateScreenReaderTextParamsSchema = z.object({
    nodeId: z.string().describe("Node ID to add screen reader text to"),
    text: z.string().describe("Screen reader only text"),
    position: z.enum(["before", "after", "replace"]).optional().default("after"),
    purpose: z.enum(["label", "description", "instructions", "status"]).optional(),
});
export type CreateScreenReaderTextParams = z.infer<typeof CreateScreenReaderTextParamsSchema>;
