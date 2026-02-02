import { z } from "zod";

// ============================================
// ANALYSIS TOOL SCHEMAS (50 tools)
// ============================================

// Base schema for analysis parameters
const BaseAnalysisParams = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze (uses selection if not provided)"),
    includeChildren: z.boolean().optional().default(true).describe("Include child nodes in analysis"),
    outputFormat: z.enum(["summary", "detailed", "json"]).optional().default("detailed"),
});

// ============================================
// VISUAL ANALYSIS (15 tools)
// ============================================

// 1. Analyze Color Harmony
export const AnalyzeColorHarmonyParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    harmonyType: z.enum(["complementary", "analogous", "triadic", "split-complementary", "tetradic", "monochromatic", "all"]).optional().default("all"),
    suggestImprovements: z.boolean().optional().default(true),
});
export type AnalyzeColorHarmonyParams = z.infer<typeof AnalyzeColorHarmonyParamsSchema>;

// 2. Analyze Contrast Ratio
export const AnalyzeContrastRatioParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    wcagLevel: z.enum(["A", "AA", "AAA"]).optional().default("AA"),
    includeAllPairs: z.boolean().optional().default(false).describe("Include all color pairs"),
    minContrastThreshold: z.number().optional().default(4.5),
});
export type AnalyzeContrastRatioParams = z.infer<typeof AnalyzeContrastRatioParamsSchema>;

// 3. Analyze Color Blindness
export const AnalyzeColorBlindnessParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    types: z.array(z.enum(["protanopia", "deuteranopia", "tritanopia", "achromatopsia"])).optional().default(["protanopia", "deuteranopia"]),
    generateSimulation: z.boolean().optional().default(true),
    checkDistinguishability: z.boolean().optional().default(true),
});
export type AnalyzeColorBlindnessParams = z.infer<typeof AnalyzeColorBlindnessParamsSchema>;

// 4. Analyze Visual Hierarchy
export const AnalyzeVisualHierarchyParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    factors: z.array(z.enum(["size", "color", "contrast", "position", "spacing", "typography"])).optional(),
    suggestImprovements: z.boolean().optional().default(true),
});
export type AnalyzeVisualHierarchyParams = z.infer<typeof AnalyzeVisualHierarchyParamsSchema>;

// 5. Analyze Whitespace
export const AnalyzeWhitespaceParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    gridBase: z.number().optional().default(8).describe("Base grid unit (e.g., 4px, 8px)"),
    checkConsistency: z.boolean().optional().default(true),
    checkBalance: z.boolean().optional().default(true),
});
export type AnalyzeWhitespaceParams = z.infer<typeof AnalyzeWhitespaceParamsSchema>;

// 6. Analyze Alignment
export const AnalyzeAlignmentParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    tolerance: z.number().optional().default(1).describe("Alignment tolerance in pixels"),
    checkGrid: z.boolean().optional().default(true),
    checkCentering: z.boolean().optional().default(true),
});
export type AnalyzeAlignmentParams = z.infer<typeof AnalyzeAlignmentParamsSchema>;

// 7. Analyze Balance
export const AnalyzeBalanceParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    type: z.enum(["symmetrical", "asymmetrical", "radial", "all"]).optional().default("all"),
    includeVisualWeight: z.boolean().optional().default(true),
    suggestImprovements: z.boolean().optional().default(true),
});
export type AnalyzeBalanceParams = z.infer<typeof AnalyzeBalanceParamsSchema>;

// 8. Analyze Proximity
export const AnalyzeProximityParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    groupingThreshold: z.number().optional().default(24).describe("Distance threshold for grouping"),
    checkRelationships: z.boolean().optional().default(true),
});
export type AnalyzeProximityParams = z.infer<typeof AnalyzeProximityParamsSchema>;

// 9. Analyze Repetition
export const AnalyzeRepetitionParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    checkColors: z.boolean().optional().default(true),
    checkTypography: z.boolean().optional().default(true),
    checkSpacing: z.boolean().optional().default(true),
    checkComponents: z.boolean().optional().default(true),
});
export type AnalyzeRepetitionParams = z.infer<typeof AnalyzeRepetitionParamsSchema>;

// 10. Analyze Typography Scale
export const AnalyzeTypographyScaleParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    baseSize: z.number().optional().default(16),
    expectedRatio: z.number().optional().default(1.25).describe("Expected scale ratio"),
    checkConsistency: z.boolean().optional().default(true),
});
export type AnalyzeTypographyScaleParams = z.infer<typeof AnalyzeTypographyScaleParamsSchema>;

// 11. Analyze Font Pairing
export const AnalyzeFontPairingParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    maxFonts: z.number().optional().default(3).describe("Maximum recommended fonts"),
    suggestPairings: z.boolean().optional().default(true),
});
export type AnalyzeFontPairingParams = z.infer<typeof AnalyzeFontPairingParamsSchema>;

// 12. Analyze Icon Consistency
export const AnalyzeIconConsistencyParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    checkSize: z.boolean().optional().default(true),
    checkStroke: z.boolean().optional().default(true),
    checkStyle: z.boolean().optional().default(true),
    checkAlignment: z.boolean().optional().default(true),
});
export type AnalyzeIconConsistencyParams = z.infer<typeof AnalyzeIconConsistencyParamsSchema>;

// 13. Analyze Image Quality
export const AnalyzeImageQualityParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    checkResolution: z.boolean().optional().default(true),
    checkCompression: z.boolean().optional().default(true),
    minDpi: z.number().optional().default(72),
    targetDpi: z.number().optional().default(144).describe("Target DPI for retina"),
});
export type AnalyzeImageQualityParams = z.infer<typeof AnalyzeImageQualityParamsSchema>;

// 14. Analyze Aspect Ratios
export const AnalyzeAspectRatiosParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    standardRatios: z.array(z.string()).optional().default(["1:1", "4:3", "16:9", "21:9"]),
    tolerance: z.number().optional().default(0.05).describe("Tolerance for matching"),
});
export type AnalyzeAspectRatiosParams = z.infer<typeof AnalyzeAspectRatiosParamsSchema>;

// 15. Analyze Golden Ratio
export const AnalyzeGoldenRatioParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    tolerance: z.number().optional().default(0.05),
    checkDimensions: z.boolean().optional().default(true),
    checkSpacing: z.boolean().optional().default(true),
    checkPositioning: z.boolean().optional().default(true),
});
export type AnalyzeGoldenRatioParams = z.infer<typeof AnalyzeGoldenRatioParamsSchema>;

// ============================================
// UX ANALYSIS (15 tools)
// ============================================

// 16. Analyze Cognitive Load
export const AnalyzeCognitiveLoadParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    factors: z.array(z.enum(["elementCount", "colorVariety", "textDensity", "interactionComplexity", "visualNoise"])).optional(),
    threshold: z.enum(["low", "medium", "high"]).optional().default("medium"),
});
export type AnalyzeCognitiveLoadParams = z.infer<typeof AnalyzeCognitiveLoadParamsSchema>;

// 17. Analyze Information Scent
export const AnalyzeInformationScentParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    userGoal: z.string().optional().describe("User's goal or task"),
    checkLabels: z.boolean().optional().default(true),
    checkIcons: z.boolean().optional().default(true),
    checkVisualCues: z.boolean().optional().default(true),
});
export type AnalyzeInformationScentParams = z.infer<typeof AnalyzeInformationScentParamsSchema>;

// 18. Analyze Affordances
export const AnalyzeAffordancesParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    checkButtons: z.boolean().optional().default(true),
    checkLinks: z.boolean().optional().default(true),
    checkInputs: z.boolean().optional().default(true),
    checkInteractive: z.boolean().optional().default(true),
});
export type AnalyzeAffordancesParams = z.infer<typeof AnalyzeAffordancesParamsSchema>;

// 19. Analyze Signifiers
export const AnalyzeSignifiersParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    checkVisualCues: z.boolean().optional().default(true),
    checkLabels: z.boolean().optional().default(true),
    checkPlaceholders: z.boolean().optional().default(true),
});
export type AnalyzeSignifiersParams = z.infer<typeof AnalyzeSignifiersParamsSchema>;

// 20. Analyze Feedback Loops
export const AnalyzeFeedbackLoopsParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    checkStates: z.array(z.enum(["hover", "active", "focus", "loading", "success", "error", "disabled"])).optional(),
    checkTransitions: z.boolean().optional().default(true),
    checkMicrointeractions: z.boolean().optional().default(true),
});
export type AnalyzeFeedbackLoopsParams = z.infer<typeof AnalyzeFeedbackLoopsParamsSchema>;

// 21. Analyze Error Prevention
export const AnalyzeErrorPreventionParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    checkFormValidation: z.boolean().optional().default(true),
    checkConfirmations: z.boolean().optional().default(true),
    checkUndoOptions: z.boolean().optional().default(true),
    checkConstraints: z.boolean().optional().default(true),
});
export type AnalyzeErrorPreventionParams = z.infer<typeof AnalyzeErrorPreventionParamsSchema>;

// 22. Analyze Recognition vs Recall
export const AnalyzeRecognitionRecallParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    checkLabels: z.boolean().optional().default(true),
    checkPlaceholders: z.boolean().optional().default(true),
    checkExamples: z.boolean().optional().default(true),
    checkTooltips: z.boolean().optional().default(true),
    checkAutoComplete: z.boolean().optional().default(true),
});
export type AnalyzeRecognitionRecallParams = z.infer<typeof AnalyzeRecognitionRecallParamsSchema>;

// 23. Analyze Flexibility
export const AnalyzeFlexibilityParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    checkShortcuts: z.boolean().optional().default(true),
    checkCustomization: z.boolean().optional().default(true),
    checkAccessibility: z.boolean().optional().default(true),
    checkMultiplePaths: z.boolean().optional().default(true),
});
export type AnalyzeFlexibilityParams = z.infer<typeof AnalyzeFlexibilityParamsSchema>;

// 24. Analyze Aesthetic Usability
export const AnalyzeAestheticUsabilityParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    checkVisualAppeal: z.boolean().optional().default(true),
    checkConsistency: z.boolean().optional().default(true),
    checkPolish: z.boolean().optional().default(true),
    checkModernness: z.boolean().optional().default(true),
});
export type AnalyzeAestheticUsabilityParams = z.infer<typeof AnalyzeAestheticUsabilityParamsSchema>;

// 25. Analyze Serial Position
export const AnalyzeSerialPositionParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    checkPrimacy: z.boolean().optional().default(true).describe("First items remembered better"),
    checkRecency: z.boolean().optional().default(true).describe("Last items remembered better"),
    checkImportantItems: z.boolean().optional().default(true),
});
export type AnalyzeSerialPositionParams = z.infer<typeof AnalyzeSerialPositionParamsSchema>;

// 26. Analyze Hicks Law
export const AnalyzeHicksLawParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    maxChoices: z.number().optional().default(7).describe("Max recommended choices"),
    checkNavigation: z.boolean().optional().default(true),
    checkDropdowns: z.boolean().optional().default(true),
    checkForms: z.boolean().optional().default(true),
});
export type AnalyzeHicksLawParams = z.infer<typeof AnalyzeHicksLawParamsSchema>;

// 27. Analyze Fitts Law
export const AnalyzeFittsLawParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    minTargetSize: z.number().optional().default(44).describe("Min touch target size in px"),
    checkButtonSize: z.boolean().optional().default(true),
    checkClickableAreas: z.boolean().optional().default(true),
    checkTargetProximity: z.boolean().optional().default(true),
});
export type AnalyzeFittsLawParams = z.infer<typeof AnalyzeFittsLawParamsSchema>;

// 28. Analyze Millers Law
export const AnalyzeMillersLawParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    maxItems: z.number().optional().default(7).describe("Max items to chunk"),
    checkLists: z.boolean().optional().default(true),
    checkNavigation: z.boolean().optional().default(true),
    checkForms: z.boolean().optional().default(true),
});
export type AnalyzeMillersLawParams = z.infer<typeof AnalyzeMillersLawParamsSchema>;

// 29. Analyze Jakobs Law
export const AnalyzeJakobsLawParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    industryPatterns: z.array(z.string()).optional().describe("Expected industry patterns"),
    checkNavigation: z.boolean().optional().default(true),
    checkFormPatterns: z.boolean().optional().default(true),
    checkIconUsage: z.boolean().optional().default(true),
    checkInteractionPatterns: z.boolean().optional().default(true),
});
export type AnalyzeJakobsLawParams = z.infer<typeof AnalyzeJakobsLawParamsSchema>;

// 30. Analyze Gestalt Principles
export const AnalyzeGestaltPrinciplesParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    principles: z.array(z.enum(["proximity", "similarity", "continuity", "closure", "figure-ground", "common-region"])).optional(),
    suggestImprovements: z.boolean().optional().default(true),
});
export type AnalyzeGestaltPrinciplesParams = z.infer<typeof AnalyzeGestaltPrinciplesParamsSchema>;

// ============================================
// ACCESSIBILITY ANALYSIS (10 tools)
// ============================================

// 31. Analyze WCAG AA
export const AnalyzeWcagAAParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    categories: z.array(z.enum(["perceivable", "operable", "understandable", "robust"])).optional(),
    generateReport: z.boolean().optional().default(true),
});
export type AnalyzeWcagAAParams = z.infer<typeof AnalyzeWcagAAParamsSchema>;

// 32. Analyze WCAG AAA
export const AnalyzeWcagAAAParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    categories: z.array(z.enum(["perceivable", "operable", "understandable", "robust"])).optional(),
    generateReport: z.boolean().optional().default(true),
});
export type AnalyzeWcagAAAParams = z.infer<typeof AnalyzeWcagAAAParamsSchema>;

// 33. Analyze Screen Reader
export const AnalyzeScreenReaderParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    checkHeadings: z.boolean().optional().default(true),
    checkLandmarks: z.boolean().optional().default(true),
    checkLabels: z.boolean().optional().default(true),
    checkAltText: z.boolean().optional().default(true),
    checkReadingOrder: z.boolean().optional().default(true),
});
export type AnalyzeScreenReaderParams = z.infer<typeof AnalyzeScreenReaderParamsSchema>;

// 34. Analyze Keyboard Nav
export const AnalyzeKeyboardNavParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    checkFocusOrder: z.boolean().optional().default(true),
    checkFocusVisible: z.boolean().optional().default(true),
    checkSkipLinks: z.boolean().optional().default(true),
    checkKeyboardTraps: z.boolean().optional().default(true),
});
export type AnalyzeKeyboardNavParams = z.infer<typeof AnalyzeKeyboardNavParamsSchema>;

// 35. Analyze Focus Order
export const AnalyzeFocusOrderParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    checkLogicalOrder: z.boolean().optional().default(true),
    checkTabIndex: z.boolean().optional().default(true),
    suggestOrder: z.boolean().optional().default(true),
});
export type AnalyzeFocusOrderParams = z.infer<typeof AnalyzeFocusOrderParamsSchema>;

// 36. Analyze Color Contrast
export const AnalyzeColorContrastParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    level: z.enum(["AA", "AAA"]).optional().default("AA"),
    checkText: z.boolean().optional().default(true),
    checkGraphics: z.boolean().optional().default(true),
    checkUIComponents: z.boolean().optional().default(true),
});
export type AnalyzeColorContrastParams = z.infer<typeof AnalyzeColorContrastParamsSchema>;

// 37. Analyze Text Size
export const AnalyzeTextSizeParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    minBodySize: z.number().optional().default(16).describe("Min body text size"),
    checkScalability: z.boolean().optional().default(true),
    checkLineHeight: z.boolean().optional().default(true),
    checkLetterSpacing: z.boolean().optional().default(true),
});
export type AnalyzeTextSizeParams = z.infer<typeof AnalyzeTextSizeParamsSchema>;

// 38. Analyze Touch Targets
export const AnalyzeTouchTargetsParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    minSize: z.number().optional().default(44).describe("Min touch target size"),
    minSpacing: z.number().optional().default(8).describe("Min spacing between targets"),
    platform: z.enum(["ios", "android", "web"]).optional().default("web"),
});
export type AnalyzeTouchTargetsParams = z.infer<typeof AnalyzeTouchTargetsParamsSchema>;

// 39. Analyze Alt Text
export const AnalyzeAltTextParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    checkImages: z.boolean().optional().default(true),
    checkIcons: z.boolean().optional().default(true),
    checkDecorative: z.boolean().optional().default(true),
    suggestAltText: z.boolean().optional().default(true),
});
export type AnalyzeAltTextParams = z.infer<typeof AnalyzeAltTextParamsSchema>;

// 40. Analyze ARIA Labels
export const AnalyzeAriaLabelsParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    checkButtons: z.boolean().optional().default(true),
    checkLinks: z.boolean().optional().default(true),
    checkForms: z.boolean().optional().default(true),
    checkModals: z.boolean().optional().default(true),
    suggestLabels: z.boolean().optional().default(true),
});
export type AnalyzeAriaLabelsParams = z.infer<typeof AnalyzeAriaLabelsParamsSchema>;

// ============================================
// PERFORMANCE ANALYSIS (10 tools)
// ============================================

// 41. Analyze Component Count
export const AnalyzeComponentCountParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    maxComponents: z.number().optional().default(100),
    groupByType: z.boolean().optional().default(true),
    checkDuplicates: z.boolean().optional().default(true),
});
export type AnalyzeComponentCountParams = z.infer<typeof AnalyzeComponentCountParamsSchema>;

// 42. Analyze Layer Depth
export const AnalyzeLayerDepthParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    maxDepth: z.number().optional().default(10).describe("Max recommended depth"),
    flagDeepNesting: z.boolean().optional().default(true),
    suggestFlattening: z.boolean().optional().default(true),
});
export type AnalyzeLayerDepthParams = z.infer<typeof AnalyzeLayerDepthParamsSchema>;

// 43. Analyze Image Optimization
export const AnalyzeImageOptimizationParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    checkFormat: z.boolean().optional().default(true),
    checkDimensions: z.boolean().optional().default(true),
    checkCompression: z.boolean().optional().default(true),
    maxFileSize: z.number().optional().describe("Max file size in KB"),
});
export type AnalyzeImageOptimizationParams = z.infer<typeof AnalyzeImageOptimizationParamsSchema>;

// 44. Analyze Animation Performance
export const AnalyzeAnimationPerformanceParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    checkComplexity: z.boolean().optional().default(true),
    checkDuration: z.boolean().optional().default(true),
    checkEasing: z.boolean().optional().default(true),
    maxDuration: z.number().optional().default(300).describe("Max animation duration in ms"),
});
export type AnalyzeAnimationPerformanceParams = z.infer<typeof AnalyzeAnimationPerformanceParamsSchema>;

// 45. Analyze Responsive Breakpoints
export const AnalyzeResponsiveBreakpointsParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    breakpoints: z.array(z.object({
        name: z.string(),
        width: z.number(),
    })).optional(),
    checkAdaptability: z.boolean().optional().default(true),
    checkTextScaling: z.boolean().optional().default(true),
    checkLayoutShifts: z.boolean().optional().default(true),
});
export type AnalyzeResponsiveBreakpointsParams = z.infer<typeof AnalyzeResponsiveBreakpointsParamsSchema>;

// 46. Analyze Design Tokens
export const AnalyzeDesignTokensParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    checkColors: z.boolean().optional().default(true),
    checkTypography: z.boolean().optional().default(true),
    checkSpacing: z.boolean().optional().default(true),
    checkElevation: z.boolean().optional().default(true),
    suggestTokens: z.boolean().optional().default(true),
});
export type AnalyzeDesignTokensParams = z.infer<typeof AnalyzeDesignTokensParamsSchema>;

// 47. Analyze Component Reuse
export const AnalyzeComponentReuseParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    minSimilarity: z.number().optional().default(0.8).describe("Similarity threshold"),
    suggestComponents: z.boolean().optional().default(true),
    checkNamingConsistency: z.boolean().optional().default(true),
});
export type AnalyzeComponentReuseParams = z.infer<typeof AnalyzeComponentReuseParamsSchema>;

// 48. Analyze Style Consistency
export const AnalyzeStyleConsistencyParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    checkColors: z.boolean().optional().default(true),
    checkTypography: z.boolean().optional().default(true),
    checkSpacing: z.boolean().optional().default(true),
    checkBorderRadius: z.boolean().optional().default(true),
    checkShadows: z.boolean().optional().default(true),
});
export type AnalyzeStyleConsistencyParams = z.infer<typeof AnalyzeStyleConsistencyParamsSchema>;

// 49. Analyze Naming Conventions
export const AnalyzeNamingConventionsParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    convention: z.enum(["kebab-case", "camelCase", "PascalCase", "snake_case", "BEM"]).optional(),
    checkLayers: z.boolean().optional().default(true),
    checkComponents: z.boolean().optional().default(true),
    checkStyles: z.boolean().optional().default(true),
    suggestRenames: z.boolean().optional().default(true),
});
export type AnalyzeNamingConventionsParams = z.infer<typeof AnalyzeNamingConventionsParamsSchema>;

// 50. Analyze File Size
export const AnalyzeFileSizeParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    checkImages: z.boolean().optional().default(true),
    checkVectors: z.boolean().optional().default(true),
    checkFonts: z.boolean().optional().default(true),
    maxTotalSize: z.number().optional().describe("Max total size in MB"),
    suggestOptimizations: z.boolean().optional().default(true),
});
export type AnalyzeFileSizeParams = z.infer<typeof AnalyzeFileSizeParamsSchema>;
