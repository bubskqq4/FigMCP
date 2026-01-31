import { z } from "zod";

// ============================================
// PERFORMANCE TOOL SCHEMAS (15 tools)
// ============================================

// 1. Optimize Layer Structure
export const OptimizeLayerStructureParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to optimize"),
    includeChildren: z.boolean().optional().default(true),
    flattenGroups: z.boolean().optional().default(true),
    removeEmptyLayers: z.boolean().optional().default(true),
    mergeAdjacentLayers: z.boolean().optional().default(false),
    maxDepth: z.number().optional().default(5),
    dryRun: z.boolean().optional().default(false).describe("Preview changes without applying"),
});
export type OptimizeLayerStructureParams = z.infer<typeof OptimizeLayerStructureParamsSchema>;

// 2. Flatten Unnecessary Groups
export const FlattenUnnecessaryGroupsParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to process"),
    includeChildren: z.boolean().optional().default(true),
    preserveNamed: z.boolean().optional().default(true).describe("Keep groups with meaningful names"),
    preserveWithEffects: z.boolean().optional().default(true),
    preserveWithConstraints: z.boolean().optional().default(true),
    dryRun: z.boolean().optional().default(false),
});
export type FlattenUnnecessaryGroupsParams = z.infer<typeof FlattenUnnecessaryGroupsParamsSchema>;

// 3. Reduce Effects Count
export const ReduceEffectsCountParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to process"),
    includeChildren: z.boolean().optional().default(true),
    maxEffectsPerNode: z.number().optional().default(3),
    removeDuplicates: z.boolean().optional().default(true),
    mergeSimliarShadows: z.boolean().optional().default(true),
    removeInvisible: z.boolean().optional().default(true),
    dryRun: z.boolean().optional().default(false),
});
export type ReduceEffectsCountParams = z.infer<typeof ReduceEffectsCountParamsSchema>;

// 4. Optimize Images
export const OptimizeImagesParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to process"),
    includeChildren: z.boolean().optional().default(true),
    maxDimension: z.number().optional().describe("Max width/height in px"),
    targetDpi: z.number().optional().default(72),
    removeUnused: z.boolean().optional().default(true),
    suggestVectorAlternatives: z.boolean().optional().default(true),
    dryRun: z.boolean().optional().default(false),
});
export type OptimizeImagesParams = z.infer<typeof OptimizeImagesParamsSchema>;

// 5. Simplify Vectors
export const SimplifyVectorsParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to process"),
    includeChildren: z.boolean().optional().default(true),
    reducePoints: z.boolean().optional().default(true),
    pointReductionTolerance: z.number().optional().default(0.5),
    flattenBooleans: z.boolean().optional().default(true),
    outlineStrokes: z.boolean().optional().default(false),
    dryRun: z.boolean().optional().default(false),
});
export type SimplifyVectorsParams = z.infer<typeof SimplifyVectorsParamsSchema>;

// 6. Merge Similar Styles
export const MergeSimilarStylesParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to process"),
    includeChildren: z.boolean().optional().default(true),
    colorTolerance: z.number().optional().default(5).describe("Color difference tolerance (0-255)"),
    mergeTextStyles: z.boolean().optional().default(true),
    mergeColorStyles: z.boolean().optional().default(true),
    mergeEffectStyles: z.boolean().optional().default(true),
    dryRun: z.boolean().optional().default(false),
});
export type MergeSimilarStylesParams = z.infer<typeof MergeSimilarStylesParamsSchema>;

// 7. Deduplicate Components
export const DeduplicateComponentsParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to process"),
    includeChildren: z.boolean().optional().default(true),
    similarityThreshold: z.number().optional().default(0.95),
    checkStructure: z.boolean().optional().default(true),
    checkStyles: z.boolean().optional().default(true),
    checkContent: z.boolean().optional().default(false),
    dryRun: z.boolean().optional().default(false),
});
export type DeduplicateComponentsParams = z.infer<typeof DeduplicateComponentsParamsSchema>;

// 8. Analyze Render Performance
export const AnalyzeRenderPerformanceParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    checkBlurs: z.boolean().optional().default(true),
    checkShadows: z.boolean().optional().default(true),
    checkMasks: z.boolean().optional().default(true),
    checkBlending: z.boolean().optional().default(true),
    checkComplexVectors: z.boolean().optional().default(true),
    suggestOptimizations: z.boolean().optional().default(true),
});
export type AnalyzeRenderPerformanceParams = z.infer<typeof AnalyzeRenderPerformanceParamsSchema>;

// 9. Create Loading Sequence
export const CreateLoadingSequenceParamsSchema = z.object({
    nodeId: z.string().describe("Node ID to create sequence for"),
    stages: z.array(z.enum(["skeleton", "placeholder", "progressive", "loaded"])).optional().default(["skeleton", "loaded"]),
    showTransitions: z.boolean().optional().default(true),
    transitionDuration: z.number().optional().default(300),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateLoadingSequenceParams = z.infer<typeof CreateLoadingSequenceParamsSchema>;

// 10. Create Skeleton Screens
export const CreateSkeletonScreensParamsSchema = z.object({
    nodeId: z.string().describe("Node ID to create skeleton for"),
    style: z.enum(["pulse", "wave", "static"]).optional().default("pulse"),
    preserveLayout: z.boolean().optional().default(true),
    simplifyContent: z.boolean().optional().default(true),
    baseColor: z.string().optional(),
    highlightColor: z.string().optional(),
    parentId: z.string().optional(),
});
export type CreateSkeletonScreensParams = z.infer<typeof CreateSkeletonScreensParamsSchema>;

// 11. Optimize for Handoff
export const OptimizeForHandoffParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to optimize"),
    includeChildren: z.boolean().optional().default(true),
    cleanupNames: z.boolean().optional().default(true),
    addAnnotations: z.boolean().optional().default(false),
    exportAssets: z.boolean().optional().default(false),
    generateSpecs: z.boolean().optional().default(true),
    outputFormat: z.enum(["css", "tailwind", "styled-components"]).optional().default("css"),
});
export type OptimizeForHandoffParams = z.infer<typeof OptimizeForHandoffParamsSchema>;

// 12. Reduce File Size
export const ReduceFileSizeParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to process"),
    includeChildren: z.boolean().optional().default(true),
    removeHiddenLayers: z.boolean().optional().default(true),
    removeUnusedStyles: z.boolean().optional().default(true),
    removeUnusedComponents: z.boolean().optional().default(true),
    optimizeImages: z.boolean().optional().default(true),
    flattenGroups: z.boolean().optional().default(false),
    targetSizeKb: z.number().optional().describe("Target file size in KB"),
    dryRun: z.boolean().optional().default(false),
});
export type ReduceFileSizeParams = z.infer<typeof ReduceFileSizeParamsSchema>;

// 13. Create Lazy Load Spec
export const CreateLazyLoadSpecParamsSchema = z.object({
    nodeId: z.string().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    viewportHeight: z.number().optional().default(900),
    aboveFold: z.array(z.string()).optional().describe("Elements to prioritize"),
    lazyLoadThreshold: z.number().optional().default(200).describe("Pixels before viewport to start loading"),
    parentId: z.string().optional(),
});
export type CreateLazyLoadSpecParams = z.infer<typeof CreateLazyLoadSpecParamsSchema>;

// 14. Optimize Animations
export const OptimizeAnimationsParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to process"),
    includeChildren: z.boolean().optional().default(true),
    maxDuration: z.number().optional().default(300),
    preferTransform: z.boolean().optional().default(true),
    avoidLayoutTriggers: z.boolean().optional().default(true),
    reduceComplexity: z.boolean().optional().default(true),
    suggestOptimizations: z.boolean().optional().default(true),
});
export type OptimizeAnimationsParams = z.infer<typeof OptimizeAnimationsParamsSchema>;

// 15. Generate Performance Report
export const GeneratePerformanceReportParamsSchema = z.object({
    nodeId: z.string().optional().describe("Node ID to analyze"),
    includeChildren: z.boolean().optional().default(true),
    sections: z.array(z.enum(["layers", "effects", "images", "vectors", "components", "styles"])).optional(),
    format: z.enum(["visual", "table", "json"]).optional().default("visual"),
    includeRecommendations: z.boolean().optional().default(true),
    parentId: z.string().optional(),
});
export type GeneratePerformanceReportParams = z.infer<typeof GeneratePerformanceReportParamsSchema>;
