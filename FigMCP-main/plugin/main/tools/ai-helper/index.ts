import { ToolResult } from "../tool-result";
import * as AI from "@shared/types/params/ai-helper/index";

function countNodesByType(node: SceneNode, counts: Record<string, number> = {}): Record<string, number> {
  counts[node.type] = (counts[node.type] || 0) + 1;
  if ("children" in node) {
    for (const child of (node as FrameNode).children) {
      countNodesByType(child, counts);
    }
  }
  return counts;
}

function getTotalNodeCount(node: SceneNode): number {
  let count = 1;
  if ("children" in node) {
    for (const child of (node as FrameNode).children) {
      count += getTotalNodeCount(child);
    }
  }
  return count;
}

function getMaxDepth(node: SceneNode, depth: number = 0): number {
  if (!("children" in node) || (node as FrameNode).children.length === 0) {
    return depth;
  }
  let maxChildDepth = depth;
  for (const child of (node as FrameNode).children) {
    maxChildDepth = Math.max(maxChildDepth, getMaxDepth(child, depth + 1));
  }
  return maxChildDepth;
}

export async function analyzeDesignComplexity(args: AI.AnalyzeDesignComplexityParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const sceneNode = node as SceneNode;
  const totalNodes = getTotalNodeCount(sceneNode);
  const maxDepth = getMaxDepth(sceneNode);
  const nodeTypes = countNodesByType(sceneNode);
  
  // Calculate complexity score
  let complexity: "low" | "medium" | "high" | "very-high" = "low";
  if (totalNodes > 100 || maxDepth > 8) complexity = "very-high";
  else if (totalNodes > 50 || maxDepth > 5) complexity = "high";
  else if (totalNodes > 20 || maxDepth > 3) complexity = "medium";

  const analysis = {
    nodeId: args.nodeId,
    totalNodes,
    maxDepth,
    nodeTypes,
    complexity,
    estimatedComponents: Math.ceil(totalNodes / 10),
    challenges: [] as string[],
  };

  if (nodeTypes["TEXT"] > 10) analysis.challenges.push("Many text elements - consider text components");
  if (maxDepth > 5) analysis.challenges.push("Deep nesting - may need to flatten structure");
  if (nodeTypes["INSTANCE"] > 5) analysis.challenges.push("Uses components - ensure proper component mapping");

  return { isError: false, content: JSON.stringify(analysis) };
}

export async function generateImplementationPlan(args: AI.GenerateImplementationPlanParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const sceneNode = node as SceneNode;
  const totalNodes = getTotalNodeCount(sceneNode);
  const nodeTypes = countNodesByType(sceneNode);
  
  const plan = {
    nodeId: args.nodeId,
    techStack: args.techStack || "React + Tailwind CSS",
    steps: [
      { step: 1, task: "Set up project structure and dependencies", details: `Create ${args.techStack || "React"} project with Tailwind CSS` },
      { step: 2, task: "Extract design tokens", details: "Colors, typography, spacing from Figma" },
      { step: 3, task: "Create base components", details: `~${Math.ceil(totalNodes / 10)} reusable components` },
    ] as Array<{ step: number; task: string; details: string }>,
    estimatedEffort: totalNodes > 50 ? "large" : totalNodes > 20 ? "medium" : "small",
  };

  // Add specific steps based on node types
  if (nodeTypes["TEXT"] > 5) {
    plan.steps.push({ step: plan.steps.length + 1, task: "Implement typography system", details: `${nodeTypes["TEXT"]} text elements to style` });
  }
  if (nodeTypes["FRAME"] > 3) {
    plan.steps.push({ step: plan.steps.length + 1, task: "Build layout components", details: `${nodeTypes["FRAME"]} frame structures` });
  }
  if (nodeTypes["INSTANCE"] > 0) {
    plan.steps.push({ step: plan.steps.length + 1, task: "Map Figma components to code components", details: `${nodeTypes["INSTANCE"]} component instances` });
  }
  plan.steps.push({ step: plan.steps.length + 1, task: "Add interactivity and state", details: "Event handlers, forms, navigation" });
  plan.steps.push({ step: plan.steps.length + 1, task: "Responsive adjustments", details: "Mobile and tablet breakpoints" });
  plan.steps.push({ step: plan.steps.length + 1, task: "Accessibility audit", details: "ARIA labels, keyboard navigation, contrast" });

  return { isError: false, content: JSON.stringify(plan) };
}

export async function validateDesignAccessibility(args: AI.ValidateDesignAccessibilityParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const issues: Array<{ type: string; severity: string; message: string; nodeId?: string }> = [];
  const warnings: string[] = [];
  
  async function checkNode(n: SceneNode) {
    // Check for small touch targets
    if (n.width < 44 || n.height < 44) {
      if (n.type === "RECTANGLE" || n.type === "FRAME" || n.type === "INSTANCE") {
        issues.push({
          type: "touch-target",
          severity: "warning",
          message: `Small touch target (${Math.round(n.width)}x${Math.round(n.height)}px). Minimum recommended: 44x44px`,
          nodeId: n.id
        });
      }
    }

    // Check text for potential contrast issues (simplified - actual contrast check would need fill colors)
    if (n.type === "TEXT") {
      const textNode = n as TextNode;
      const fontSize = typeof textNode.fontSize === "number" ? textNode.fontSize : 12;
      if (fontSize < 12) {
        issues.push({
          type: "text-size",
          severity: "warning", 
          message: `Small text size (${fontSize}px). Minimum recommended: 12px`,
          nodeId: n.id
        });
      }
      if (textNode.characters.length === 0) {
        issues.push({
          type: "empty-text",
          severity: "info",
          message: "Empty text element",
          nodeId: n.id
        });
      }
    }

    // Check for missing names (helpful for screen readers)
    if (n.name.startsWith("Rectangle") || n.name.startsWith("Frame") || n.name.startsWith("Group")) {
      warnings.push(`Node "${n.name}" has a generic name - consider renaming for accessibility`);
    }

    // Recurse into children
    if ("children" in n) {
      for (const child of (n as FrameNode).children) {
        await checkNode(child);
      }
    }
  }

  await checkNode(node as SceneNode);

  const result = {
    nodeId: args.nodeId,
    issueCount: issues.length,
    warningCount: warnings.length,
    issues,
    warnings: warnings.slice(0, 10), // Limit warnings
    passed: issues.filter(i => i.severity === "error").length === 0,
    recommendations: [
      "Ensure all interactive elements have 44x44px minimum touch targets",
      "Use semantic naming for elements",
      "Verify color contrast meets WCAG AA (4.5:1 for text)",
      "Add alt text for images",
      "Ensure keyboard navigation is possible"
    ]
  };

  return { isError: false, content: JSON.stringify(result) };
}
