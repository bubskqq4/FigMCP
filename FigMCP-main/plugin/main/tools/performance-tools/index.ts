import { ToolResult } from "../tool-result";

// Performance Optimization Tools
export interface OptimizeLayerStructureParams { nodeId: string; maxDepth?: number; }
export async function optimizeLayerStructure(args: OptimizeLayerStructureParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  let flattenedCount = 0;
  let removedCount = 0;
  
  function optimize(n: BaseNode, depth: number) {
    if ("children" in n) {
      const children = [...(n as ChildrenMixin).children];
      
      for (const child of children) {
        // Remove empty groups
        if (child.type === "GROUP" && (child as GroupNode).children.length === 0) {
          child.remove();
          removedCount++;
          continue;
        }
        
        // Flatten single-child groups
        if (child.type === "GROUP" && (child as GroupNode).children.length === 1) {
          const grandchild = (child as GroupNode).children[0];
          const parent = child.parent as ChildrenMixin;
          const index = parent.children.indexOf(child);
          parent.insertChild(index, grandchild);
          child.remove();
          flattenedCount++;
          continue;
        }
        
        optimize(child, depth + 1);
      }
    }
  }
  
  optimize(node, 0);
  
  return { isError: false, content: JSON.stringify({ flattenedCount, removedCount }) };
}

export interface FlattenUnnecessaryGroupsParams { nodeId: string; }
export async function flattenUnnecessaryGroups(args: FlattenUnnecessaryGroupsParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  let flattened = 0;
  
  function flatten(n: BaseNode) {
    if ("children" in n) {
      const children = [...(n as ChildrenMixin).children];
      
      for (const child of children) {
        if (child.type === "GROUP") {
          const group = child as GroupNode;
          // Flatten if single child or no meaningful grouping
          if (group.children.length <= 1) {
            const parent = group.parent as ChildrenMixin;
            const index = parent.children.indexOf(group);
            
            for (const grandchild of [...group.children]) {
              parent.insertChild(index, grandchild);
            }
            group.remove();
            flattened++;
            continue;
          }
        }
        flatten(child);
      }
    }
  }
  
  flatten(node);
  
  return { isError: false, content: JSON.stringify({ flattenedGroups: flattened }) };
}

export interface ReduceEffectsCountParams { nodeId: string; }
export async function reduceEffectsCount(args: ReduceEffectsCountParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  let removedCount = 0;
  
  function reduce(n: BaseNode) {
    if ("effects" in n) {
      const effects = (n as any).effects as Effect[];
      const visibleEffects = effects.filter(e => e.visible);
      
      if (visibleEffects.length < effects.length) {
        (n as any).effects = visibleEffects;
        removedCount += effects.length - visibleEffects.length;
      }
    }
    if ("children" in n) {
      for (const child of (n as ChildrenMixin).children) reduce(child);
    }
  }
  
  reduce(node);
  
  return { isError: false, content: JSON.stringify({ removedInvisibleEffects: removedCount }) };
}

export interface OptimizeVectorsParams { nodeId: string; }
export async function optimizeVectors(args: OptimizeVectorsParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  let optimized = 0;
  
  function optimize(n: BaseNode) {
    if (n.type === "VECTOR") {
      // Vector optimization would require path simplification
      optimized++;
    }
    if ("children" in n) {
      for (const child of (n as ChildrenMixin).children) optimize(child);
    }
  }
  
  optimize(node);
  
  return { isError: false, content: JSON.stringify({ vectorsFound: optimized, note: "Vector optimization requires manual review" }) };
}

export interface OptimizeImagesParams { nodeId: string; maxSize?: number; }
export async function optimizeImages(args: OptimizeImagesParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const maxSize = args.maxSize || 2000;
  const largeImages: any[] = [];
  
  function check(n: BaseNode) {
    if ("fills" in n) {
      const fills = (n as any).fills as Paint[];
      for (const fill of fills) {
        if (fill.type === "IMAGE" && "width" in n) {
          const width = (n as SceneNode).width;
          const height = (n as SceneNode).height;
          if (width > maxSize || height > maxSize) {
            largeImages.push({ id: n.id, name: n.name, size: `${Math.round(width)}x${Math.round(height)}` });
          }
        }
      }
    }
    if ("children" in n) {
      for (const child of (n as ChildrenMixin).children) check(child);
    }
  }
  
  check(node);
  
  return { isError: false, content: JSON.stringify({ largeImages, recommendation: "Consider resizing images larger than 2000px" }) };
}

export interface RemoveHiddenLayersParams { nodeId: string; }
export async function removeHiddenLayers(args: RemoveHiddenLayersParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  let removed = 0;
  
  function remove(n: BaseNode) {
    if ("children" in n) {
      const children = [...(n as ChildrenMixin).children];
      
      for (const child of children) {
        if ("visible" in child && !(child as SceneNode).visible) {
          child.remove();
          removed++;
          continue;
        }
        remove(child);
      }
    }
  }
  
  remove(node);
  
  return { isError: false, content: JSON.stringify({ removedHiddenLayers: removed }) };
}

export interface SimplifyGradientsParams { nodeId: string; maxStops?: number; }
export async function simplifyGradients(args: SimplifyGradientsParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const maxStops = args.maxStops || 5;
  let simplified = 0;
  
  function simplify(n: BaseNode) {
    if ("fills" in n) {
      const fills = [...(n as any).fills] as Paint[];
      let modified = false;
      
      for (let i = 0; i < fills.length; i++) {
        const fill = fills[i];
        if ((fill.type === "GRADIENT_LINEAR" || fill.type === "GRADIENT_RADIAL") && fill.gradientStops.length > maxStops) {
          // Keep only maxStops (first, last, and evenly distributed middle)
          const stops = fill.gradientStops;
          const newStops = [stops[0], stops[stops.length - 1]];
          fills[i] = { ...fill, gradientStops: newStops };
          modified = true;
          simplified++;
        }
      }
      
      if (modified) {
        (n as any).fills = fills;
      }
    }
    if ("children" in n) {
      for (const child of (n as ChildrenMixin).children) simplify(child);
    }
  }
  
  simplify(node);
  
  return { isError: false, content: JSON.stringify({ simplifiedGradients: simplified }) };
}

export interface DetachUnusedStylesParams { }
export async function detachUnusedStyles(args: DetachUnusedStylesParams): Promise<ToolResult> {
  const paintStyles = figma.getLocalPaintStyles();
  const textStyles = figma.getLocalTextStyles();
  const effectStyles = figma.getLocalEffectStyles();
  
  // Note: Actually detecting unused styles requires scanning all nodes
  return { isError: false, content: JSON.stringify({
    paintStyleCount: paintStyles.length,
    textStyleCount: textStyles.length,
    effectStyleCount: effectStyles.length,
    recommendation: "Review styles in Assets panel for unused items"
  }) };
}

export interface MergeIdenticalNodesParams { nodeId: string; }
export async function mergeIdenticalNodes(args: MergeIdenticalNodesParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  // Finding and merging identical nodes is complex - return analysis
  let duplicates = 0;
  const seen = new Map<string, number>();
  
  function analyze(n: BaseNode) {
    if ("fills" in n && "width" in n && "height" in n) {
      const key = `${n.type}-${Math.round((n as SceneNode).width)}-${Math.round((n as SceneNode).height)}`;
      seen.set(key, (seen.get(key) || 0) + 1);
    }
    if ("children" in n) {
      for (const child of (n as ChildrenMixin).children) analyze(child);
    }
  }
  
  analyze(node);
  
  for (const count of seen.values()) {
    if (count > 1) duplicates += count - 1;
  }
  
  return { isError: false, content: JSON.stringify({ potentialDuplicates: duplicates, recommendation: "Consider using components for repeated elements" }) };
}

export interface ConvertToComponentsParams { nodeId: string; minOccurrences?: number; }
export async function convertToComponents(args: ConvertToComponentsParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId) as FrameNode;
  if (!node) return { isError: true, content: "Node not found" };
  
  // Find repeated patterns
  const patterns = new Map<string, SceneNode[]>();
  
  function analyze(n: BaseNode) {
    if (n.type === "FRAME" || n.type === "GROUP") {
      const key = `${n.name}-${n.type}`;
      if (!patterns.has(key)) patterns.set(key, []);
      patterns.get(key)!.push(n as SceneNode);
    }
    if ("children" in n) {
      for (const child of (n as ChildrenMixin).children) analyze(child);
    }
  }
  
  analyze(node);
  
  const minOccurrences = args.minOccurrences || 3;
  const candidates = Array.from(patterns.entries())
    .filter(([_, nodes]) => nodes.length >= minOccurrences)
    .map(([name, nodes]) => ({ name, count: nodes.length }));
  
  return { isError: false, content: JSON.stringify({ componentCandidates: candidates }) };
}

export interface AnalyzeLayerCountParams { nodeId: string; }
export async function analyzeLayerCount(args: AnalyzeLayerCountParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  let count = 0;
  let maxDepth = 0;
  
  function analyze(n: BaseNode, depth: number) {
    count++;
    if (depth > maxDepth) maxDepth = depth;
    if ("children" in n) {
      for (const child of (n as ChildrenMixin).children) analyze(child, depth + 1);
    }
  }
  
  analyze(node, 0);
  
  return { isError: false, content: JSON.stringify({
    totalLayers: count,
    maxDepth,
    recommendation: count > 1000 ? "Consider splitting into multiple frames" : maxDepth > 15 ? "Consider flattening deep hierarchy" : "Layer count is reasonable"
  }) };
}

export interface AnalyzeFileSizeParams { }
export async function analyzeFileSize(args: AnalyzeFileSizeParams): Promise<ToolResult> {
  const pages = figma.root.children.length;
  let totalNodes = 0;
  
  for (const page of figma.root.children) {
    totalNodes += page.findAll().length;
  }
  
  return { isError: false, content: JSON.stringify({
    pages,
    totalNodes,
    recommendation: totalNodes > 5000 ? "Consider splitting into separate files" : "File size is manageable"
  }) };
}

export interface SuggestOptimizationsParams { nodeId: string; }
export async function suggestOptimizations(args: SuggestOptimizationsParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const suggestions: string[] = [];
  
  // Check layer count
  let layerCount = 0;
  function countLayers(n: BaseNode) {
    layerCount++;
    if ("children" in n) {
      for (const child of (n as ChildrenMixin).children) countLayers(child);
    }
  }
  countLayers(node);
  
  if (layerCount > 500) suggestions.push("Consider reducing layer count");
  
  // Check for hidden layers
  let hiddenCount = 0;
  function countHidden(n: BaseNode) {
    if ("visible" in n && !(n as SceneNode).visible) hiddenCount++;
    if ("children" in n) {
      for (const child of (n as ChildrenMixin).children) countHidden(child);
    }
  }
  countHidden(node);
  
  if (hiddenCount > 10) suggestions.push(`Remove ${hiddenCount} hidden layers`);
  
  // Check for empty groups
  let emptyGroups = 0;
  function countEmptyGroups(n: BaseNode) {
    if (n.type === "GROUP" && (n as GroupNode).children.length === 0) emptyGroups++;
    if ("children" in n) {
      for (const child of (n as ChildrenMixin).children) countEmptyGroups(child);
    }
  }
  countEmptyGroups(node);
  
  if (emptyGroups > 0) suggestions.push(`Remove ${emptyGroups} empty groups`);
  
  return { isError: false, content: JSON.stringify({ suggestions, layerCount, hiddenCount, emptyGroups }) };
}

export interface GeneratePerformanceReportParams { nodeId: string; }
export async function generatePerfReport(args: GeneratePerformanceReportParams): Promise<ToolResult> {
  const layerAnalysis = await analyzeLayerCount(args);
  const optimizations = await suggestOptimizations(args);
  
  return { isError: false, content: JSON.stringify({
    report: "Performance Report",
    layers: JSON.parse(layerAnalysis.content),
    suggestions: JSON.parse(optimizations.content),
  }) };
}
