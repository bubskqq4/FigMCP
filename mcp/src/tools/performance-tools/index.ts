import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../utils.js";
import * as PF from "../../shared/types/params/performance-tools/index.js";

/**
 * Performance Tools (15 tools)
 * Tools for optimizing design files and preparing for development handoff
 */
export function registerPerformanceTools(server: McpServer, taskManager: TaskManager) {
    // 1. Optimize Layer Structure
    server.tool(
        "optimize-layer-structure",
        "Optimize layer structure by flattening, removing empty layers, and reducing depth.",
        PF.OptimizeLayerStructureParamsSchema.shape,
        async (params: PF.OptimizeLayerStructureParams) => {
            return await safeToolProcessor(taskManager.runTask("optimize-layer-structure", params));
        }
    );

    // 2. Flatten Unnecessary Groups
    server.tool(
        "flatten-unnecessary-groups",
        "Flatten groups that don't serve a structural purpose.",
        PF.FlattenUnnecessaryGroupsParamsSchema.shape,
        async (params: PF.FlattenUnnecessaryGroupsParams) => {
            return await safeToolProcessor(taskManager.runTask("flatten-unnecessary-groups", params));
        }
    );

    // 3. Reduce Effects Count
    server.tool(
        "reduce-effects-count",
        "Reduce effect count by removing duplicates and invisible effects.",
        PF.ReduceEffectsCountParamsSchema.shape,
        async (params: PF.ReduceEffectsCountParams) => {
            return await safeToolProcessor(taskManager.runTask("reduce-effects-count", params));
        }
    );

    // 4. Optimize Images
    server.tool(
        "optimize-images",
        "Optimize images for size, dimensions, and format.",
        PF.OptimizeImagesParamsSchema.shape,
        async (params: PF.OptimizeImagesParams) => {
            return await safeToolProcessor(taskManager.runTask("optimize-images", params));
        }
    );

    // 5. Simplify Vectors
    server.tool(
        "simplify-vectors",
        "Simplify vector paths by reducing points and flattening booleans.",
        PF.SimplifyVectorsParamsSchema.shape,
        async (params: PF.SimplifyVectorsParams) => {
            return await safeToolProcessor(taskManager.runTask("simplify-vectors", params));
        }
    );

    // 6. Merge Similar Styles
    server.tool(
        "merge-similar-styles",
        "Merge similar styles to reduce style count and improve consistency.",
        PF.MergeSimilarStylesParamsSchema.shape,
        async (params: PF.MergeSimilarStylesParams) => {
            return await safeToolProcessor(taskManager.runTask("merge-similar-styles", params));
        }
    );

    // 7. Deduplicate Components
    server.tool(
        "deduplicate-components",
        "Find and deduplicate similar components.",
        PF.DeduplicateComponentsParamsSchema.shape,
        async (params: PF.DeduplicateComponentsParams) => {
            return await safeToolProcessor(taskManager.runTask("deduplicate-components", params));
        }
    );

    // 8. Analyze Render Performance
    server.tool(
        "analyze-render-performance",
        "Analyze render performance issues from effects, masks, and complex vectors.",
        PF.AnalyzeRenderPerformanceParamsSchema.shape,
        async (params: PF.AnalyzeRenderPerformanceParams) => {
            return await safeToolProcessor(taskManager.runTask("analyze-render-performance", params));
        }
    );

    // 9. Create Loading Sequence
    server.tool(
        "create-loading-sequence",
        "Create a loading sequence showing skeleton to loaded states.",
        PF.CreateLoadingSequenceParamsSchema.shape,
        async (params: PF.CreateLoadingSequenceParams) => {
            return await safeToolProcessor(taskManager.runTask("create-loading-sequence", params));
        }
    );

    // 10. Create Skeleton Screens
    server.tool(
        "create-skeleton-screens",
        "Generate skeleton screens from existing designs.",
        PF.CreateSkeletonScreensParamsSchema.shape,
        async (params: PF.CreateSkeletonScreensParams) => {
            return await safeToolProcessor(taskManager.runTask("create-skeleton-screens", params));
        }
    );

    // 11. Optimize for Handoff
    server.tool(
        "optimize-for-handoff",
        "Optimize design for developer handoff with clean names and specs.",
        PF.OptimizeForHandoffParamsSchema.shape,
        async (params: PF.OptimizeForHandoffParams) => {
            return await safeToolProcessor(taskManager.runTask("optimize-for-handoff", params));
        }
    );

    // 12. Reduce File Size
    server.tool(
        "reduce-file-size",
        "Reduce file size by removing unused elements and optimizing assets.",
        PF.ReduceFileSizeParamsSchema.shape,
        async (params: PF.ReduceFileSizeParams) => {
            return await safeToolProcessor(taskManager.runTask("reduce-file-size", params));
        }
    );

    // 13. Create Lazy Load Spec
    server.tool(
        "create-lazy-load-spec",
        "Create lazy loading specifications for above/below fold content.",
        PF.CreateLazyLoadSpecParamsSchema.shape,
        async (params: PF.CreateLazyLoadSpecParams) => {
            return await safeToolProcessor(taskManager.runTask("create-lazy-load-spec", params));
        }
    );

    // 14. Optimize Animations
    server.tool(
        "optimize-animations",
        "Optimize animations for performance: duration, complexity, and properties.",
        PF.OptimizeAnimationsParamsSchema.shape,
        async (params: PF.OptimizeAnimationsParams) => {
            return await safeToolProcessor(taskManager.runTask("optimize-animations", params));
        }
    );

    // 15. Generate Performance Report
    server.tool(
        "generate-performance-report",
        "Generate a comprehensive performance analysis report.",
        PF.GeneratePerformanceReportParamsSchema.shape,
        async (params: PF.GeneratePerformanceReportParams) => {
            return await safeToolProcessor(taskManager.runTask("generate-performance-report", params));
        }
    );
}
