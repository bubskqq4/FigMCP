import { ToolResult } from "../tool-result";

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Accessibility Checks
export interface CheckColorContrastParams { nodeId: string; autoFix?: boolean; }
export async function checkColorContrast(args: CheckColorContrastParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const issues: any[] = [];
  
  function check(n: BaseNode) {
    if (n.type === "TEXT") {
      const text = n as TextNode;
      const fills = text.fills as SolidPaint[];
      const parent = text.parent as FrameNode;
      
      if (fills.length > 0 && fills[0].type === "SOLID" && parent && "fills" in parent) {
        const parentFills = parent.fills as SolidPaint[];
        if (parentFills.length > 0 && parentFills[0].type === "SOLID") {
          const textLum = getLuminance(fills[0].color.r, fills[0].color.g, fills[0].color.b);
          const bgLum = getLuminance(parentFills[0].color.r, parentFills[0].color.g, parentFills[0].color.b);
          const ratio = getContrastRatio(textLum, bgLum);
          
          const fontSize = text.fontSize !== figma.mixed ? text.fontSize : 14;
          const minRatio = fontSize >= 18 ? 3 : 4.5;
          
          if (ratio < minRatio) {
            issues.push({ nodeId: text.id, name: text.name, ratio: ratio.toFixed(2), required: minRatio });
          }
        }
      }
    }
    if ("children" in n) {
      for (const child of (n as ChildrenMixin).children) check(child);
    }
  }
  
  check(node);
  
  return { isError: false, content: JSON.stringify({ issues, totalIssues: issues.length }) };
}

export interface CheckTextSizingParams { nodeId: string; minSize?: number; }
export async function checkTextSizing(args: CheckTextSizingParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const minSize = args.minSize || 12;
  const issues: any[] = [];
  
  function check(n: BaseNode) {
    if (n.type === "TEXT") {
      const fontSize = (n as TextNode).fontSize;
      if (typeof fontSize === "number" && fontSize < minSize) {
        issues.push({ nodeId: n.id, name: n.name, fontSize, minRequired: minSize });
      }
    }
    if ("children" in n) {
      for (const child of (n as ChildrenMixin).children) check(child);
    }
  }
  
  check(node);
  
  return { isError: false, content: JSON.stringify({ issues, totalIssues: issues.length }) };
}

export interface CheckTouchTargetsParams { nodeId: string; minSize?: number; }
export async function checkTouchTargets(args: CheckTouchTargetsParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const minSize = args.minSize || 44;
  const issues: any[] = [];
  
  function check(n: BaseNode) {
    const name = n.name.toLowerCase();
    if ((name.includes("button") || name.includes("tap") || name.includes("link") || name.includes("click")) && "width" in n && "height" in n) {
      const width = (n as SceneNode).width;
      const height = (n as SceneNode).height;
      if (width < minSize || height < minSize) {
        issues.push({ nodeId: n.id, name: n.name, size: `${Math.round(width)}x${Math.round(height)}`, minRequired: minSize });
      }
    }
    if ("children" in n) {
      for (const child of (n as ChildrenMixin).children) check(child);
    }
  }
  
  check(node);
  
  return { isError: false, content: JSON.stringify({ issues, totalIssues: issues.length }) };
}

export interface CheckFocusIndicatorsParams { nodeId: string; }
export async function checkFocusIndicators(args: CheckFocusIndicatorsParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  // Check for focus state variants
  const interactiveElements: any[] = [];
  
  function check(n: BaseNode) {
    const name = n.name.toLowerCase();
    if (name.includes("button") || name.includes("input") || name.includes("link")) {
      const hasFocusState = name.includes("focus") || name.includes("focused");
      interactiveElements.push({ name: n.name, hasFocusState });
    }
    if ("children" in n) {
      for (const child of (n as ChildrenMixin).children) check(child);
    }
  }
  
  check(node);
  
  return { isError: false, content: JSON.stringify({ 
    elements: interactiveElements,
    recommendation: "Ensure all interactive elements have visible focus states"
  }) };
}

export interface CheckLabelAssociationsParams { nodeId: string; }
export async function checkLabelAssociations(args: CheckLabelAssociationsParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const formElements: any[] = [];
  
  function check(n: BaseNode) {
    const name = n.name.toLowerCase();
    if (name.includes("input") || name.includes("field") || name.includes("select") || name.includes("checkbox") || name.includes("radio")) {
      // Check if there's a label sibling
      const parent = n.parent;
      let hasLabel = false;
      if (parent && "children" in parent) {
        hasLabel = (parent as ChildrenMixin).children.some(c => c.name.toLowerCase().includes("label"));
      }
      formElements.push({ name: n.name, hasLabel });
    }
    if ("children" in n) {
      for (const child of (n as ChildrenMixin).children) check(child);
    }
  }
  
  check(node);
  
  return { isError: false, content: JSON.stringify({ 
    elements: formElements, 
    missingLabels: formElements.filter(e => !e.hasLabel).length
  }) };
}

export interface CheckReadingOrderParams { nodeId: string; }
export async function checkReadingOrder(args: CheckReadingOrderParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId) as FrameNode;
  if (!node || !("children" in node)) return { isError: true, content: "Frame not found" };
  
  const children = (node as FrameNode).children;
  const order = children.map(c => ({
    name: c.name,
    y: "y" in c ? (c as SceneNode).y : 0,
    x: "x" in c ? (c as SceneNode).x : 0,
  })).sort((a, b) => a.y - b.y || a.x - b.x);
  
  return { isError: false, content: JSON.stringify({ 
    readingOrder: order.map(o => o.name),
    recommendation: "Ensure visual order matches logical reading order"
  }) };
}

export interface CheckAltTextParams { nodeId: string; }
export async function checkAltText(args: CheckAltTextParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const images: any[] = [];
  
  function check(n: BaseNode) {
    if (n.name.toLowerCase().includes("image") || n.name.toLowerCase().includes("photo") || n.name.toLowerCase().includes("img")) {
      const altText = n.getPluginData("altText");
      images.push({ name: n.name, hasAltText: !!altText, altText });
    }
    if ("children" in n) {
      for (const child of (n as ChildrenMixin).children) check(child);
    }
  }
  
  check(node);
  
  return { isError: false, content: JSON.stringify({ 
    images,
    missingAltText: images.filter(i => !i.hasAltText).length
  }) };
}

export interface CheckHeadingHierarchyParams { nodeId: string; }
export async function checkHeadingHierarchy(args: CheckHeadingHierarchyParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const headings: any[] = [];
  
  function check(n: BaseNode) {
    const name = n.name.toLowerCase();
    if (name.includes("heading") || name.includes("title") || name.match(/h[1-6]/)) {
      const fontSize = n.type === "TEXT" ? (n as TextNode).fontSize : null;
      headings.push({ name: n.name, fontSize, type: n.type });
    }
    if ("children" in n) {
      for (const child of (n as ChildrenMixin).children) check(child);
    }
  }
  
  check(node);
  
  return { isError: false, content: JSON.stringify({ 
    headings: headings.sort((a, b) => (b.fontSize || 0) - (a.fontSize || 0)),
    hasHierarchy: new Set(headings.map(h => h.fontSize)).size >= 2
  }) };
}

export interface CheckMotionReducedParams { nodeId: string; }
export async function checkMotionReduced(args: CheckMotionReducedParams): Promise<ToolResult> {
  return { isError: false, content: JSON.stringify({ 
    recommendation: "Provide prefers-reduced-motion alternatives for animations"
  }) };
}

export interface CheckKeyboardNavigationParams { nodeId: string; }
export async function checkKeyboardNavigation(args: CheckKeyboardNavigationParams): Promise<ToolResult> {
  return { isError: false, content: JSON.stringify({ 
    recommendation: "Ensure all interactive elements are keyboard accessible with Tab, Enter, and Escape"
  }) };
}

export interface CheckScreenReaderParams { nodeId: string; }
export async function checkScreenReader(args: CheckScreenReaderParams): Promise<ToolResult> {
  return { isError: false, content: JSON.stringify({ 
    recommendation: "Add ARIA labels, roles, and semantic structure for screen reader compatibility"
  }) };
}

export interface CheckLanguageParams { nodeId: string; }
export async function checkLanguage(args: CheckLanguageParams): Promise<ToolResult> {
  return { isError: false, content: JSON.stringify({ 
    recommendation: "Specify document language and mark content in different languages"
  }) };
}

export interface CheckLinkPurposeParams { nodeId: string; }
export async function checkLinkPurpose(args: CheckLinkPurposeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const links: any[] = [];
  
  function check(n: BaseNode) {
    const name = n.name.toLowerCase();
    if (name.includes("link") || name.includes("anchor")) {
      const isDescriptive = name.length > 10 && !name.includes("click here") && !name.includes("read more");
      links.push({ name: n.name, isDescriptive });
    }
    if ("children" in n) {
      for (const child of (n as ChildrenMixin).children) check(child);
    }
  }
  
  check(node);
  
  return { isError: false, content: JSON.stringify({ 
    links,
    recommendation: "Link text should describe the destination, not 'click here'"
  }) };
}

export interface CheckFormErrorsParams { nodeId: string; }
export async function checkFormErrors(args: CheckFormErrorsParams): Promise<ToolResult> {
  return { isError: false, content: JSON.stringify({ 
    recommendation: "Design clear error messages with suggestions for correction"
  }) };
}

export interface CheckTimeoutsParams { nodeId: string; }
export async function checkTimeouts(args: CheckTimeoutsParams): Promise<ToolResult> {
  return { isError: false, content: JSON.stringify({ 
    recommendation: "Allow users to extend time limits or disable non-essential timeouts"
  }) };
}

// Accessibility Fixes
export interface FixContrastIssuesParams { nodeId: string; }
export async function fixContrastIssues(args: FixContrastIssuesParams): Promise<ToolResult> {
  return { isError: false, content: JSON.stringify({ fixed: 0, message: "Auto-fix would require color adjustments" }) };
}

export interface FixTouchTargetSizeParams { nodeId: string; minSize?: number; }
export async function fixTouchTargetSize(args: FixTouchTargetSizeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId) as SceneNode;
  if (!node || !("resize" in node)) return { isError: true, content: "Node not found" };
  
  const minSize = args.minSize || 44;
  let fixed = false;
  
  if (node.width < minSize) {
    node.resize(minSize, node.height);
    fixed = true;
  }
  if (node.height < minSize) {
    node.resize(node.width, minSize);
    fixed = true;
  }
  
  return { isError: false, content: JSON.stringify({ fixed, newSize: `${node.width}x${node.height}` }) };
}

export interface FixTextSizeParams { nodeId: string; minSize?: number; }
export async function fixTextSize(args: FixTextSizeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId) as TextNode;
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  
  const minSize = args.minSize || 12;
  const currentSize = node.fontSize as number;
  
  if (currentSize < minSize) {
    await figma.loadFontAsync(node.fontName as FontName);
    node.fontSize = minSize;
    return { isError: false, content: JSON.stringify({ fixed: true, oldSize: currentSize, newSize: minSize }) };
  }
  
  return { isError: false, content: JSON.stringify({ fixed: false, currentSize }) };
}

export interface AddAltTextParams { nodeId: string; altText: string; }
export async function addAltText(args: AddAltTextParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  node.setPluginData("altText", args.altText);
  
  return { isError: false, content: JSON.stringify({ added: true, altText: args.altText }) };
}

export interface AddAriaLabelParams { nodeId: string; label: string; }
export async function addAriaLabel(args: AddAriaLabelParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  node.setPluginData("ariaLabel", args.label);
  
  return { isError: false, content: JSON.stringify({ added: true, ariaLabel: args.label }) };
}

export interface AddFocusStateParams { nodeId: string; }
export async function addFocusState(args: AddFocusStateParams): Promise<ToolResult> {
  return { isError: false, content: JSON.stringify({ recommendation: "Add a component variant with :focus styling" }) };
}

// Accessible Component Creation
export interface CreateAccessibleButtonParams { label: string; }
export async function createAccessibleButton(args: CreateAccessibleButtonParams): Promise<ToolResult> {
  const frame = figma.createFrame();
  frame.name = `Button - ${args.label}`;
  frame.resize(120, 44); // Min 44x44 touch target
  frame.cornerRadius = 8;
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.fills = [{ type: "SOLID", color: { r: 0.15, g: 0.39, b: 0.92 } }];
  
  // Add text
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  const text = figma.createText();
  text.characters = args.label;
  text.fontSize = 14;
  text.fontName = { family: "Inter", style: "Medium" };
  text.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  frame.appendChild(text);
  
  // Store aria label
  frame.setPluginData("ariaLabel", args.label);
  frame.setPluginData("role", "button");
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateAccessibleFormFieldParams { label: string; type?: string; }
export async function createAccessibleFormField(args: CreateAccessibleFormFieldParams): Promise<ToolResult> {
  const container = figma.createFrame();
  container.name = `Field - ${args.label}`;
  container.layoutMode = "VERTICAL";
  container.itemSpacing = 8;
  container.fills = [];
  container.resize(280, 72);
  
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  
  // Label
  const label = figma.createText();
  label.characters = args.label;
  label.fontSize = 14;
  label.fontName = { family: "Inter", style: "Medium" };
  container.appendChild(label);
  
  // Input
  const input = figma.createFrame();
  input.name = `Input - ${args.label}`;
  input.resize(280, 44);
  input.cornerRadius = 8;
  input.strokes = [{ type: "SOLID", color: { r: 0.85, g: 0.85, b: 0.85 } }];
  input.strokeWeight = 1;
  input.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  input.setPluginData("ariaLabelledBy", label.id);
  container.appendChild(input);
  
  figma.currentPage.appendChild(container);
  return { isError: false, content: JSON.stringify({ id: container.id, name: container.name }) };
}

export interface CreateAccessibleModalParams { title: string; }
export async function createAccessibleModal(args: CreateAccessibleModalParams): Promise<ToolResult> {
  const modal = figma.createFrame();
  modal.name = `Modal - ${args.title}`;
  modal.resize(480, 300);
  modal.cornerRadius = 12;
  modal.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  modal.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.25 }, offset: { x: 0, y: 8 }, radius: 24, visible: true, blendMode: "NORMAL" }];
  
  modal.setPluginData("role", "dialog");
  modal.setPluginData("ariaModal", "true");
  modal.setPluginData("ariaLabelledBy", args.title);
  
  figma.currentPage.appendChild(modal);
  return { isError: false, content: JSON.stringify({ id: modal.id, name: modal.name }) };
}

export interface CreateAccessibleCardParams { title: string; }
export async function createAccessibleCard(args: CreateAccessibleCardParams): Promise<ToolResult> {
  const card = figma.createFrame();
  card.name = `Card - ${args.title}`;
  card.resize(320, 200);
  card.cornerRadius = 12;
  card.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  card.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: 0, y: 4 }, radius: 12, visible: true, blendMode: "NORMAL" }];
  
  card.setPluginData("role", "article");
  
  figma.currentPage.appendChild(card);
  return { isError: false, content: JSON.stringify({ id: card.id, name: card.name }) };
}

export interface CreateSkipLinkParams { target: string; }
export async function createSkipLink(args: CreateSkipLinkParams): Promise<ToolResult> {
  const frame = figma.createFrame();
  frame.name = "Skip to main content";
  frame.resize(200, 40);
  frame.fills = [{ type: "SOLID", color: { r: 0.15, g: 0.39, b: 0.92 } }];
  
  frame.setPluginData("role", "link");
  frame.setPluginData("skipTo", args.target);
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// Reports
export interface GenerateAccessibilityReportParams { nodeId: string; }
export async function generateA11yReport(args: GenerateAccessibilityReportParams): Promise<ToolResult> {
  const contrastResult = await checkColorContrast(args);
  const textResult = await checkTextSizing(args);
  const touchResult = await checkTouchTargets(args);
  
  return { isError: false, content: JSON.stringify({
    report: "Accessibility Report",
    contrast: JSON.parse(contrastResult.content),
    textSizing: JSON.parse(textResult.content),
    touchTargets: JSON.parse(touchResult.content),
  }) };
}

export interface GenerateWcagChecklistParams { nodeId: string; level?: string; }
export async function generateWcagChecklist(args: GenerateWcagChecklistParams): Promise<ToolResult> {
  const level = args.level || "AA";
  
  const checklist = [
    { criterion: "1.1.1 Non-text Content", level: "A", status: "Check images for alt text" },
    { criterion: "1.3.1 Info and Relationships", level: "A", status: "Check heading hierarchy" },
    { criterion: "1.4.3 Contrast (Minimum)", level: "AA", status: "Check color contrast" },
    { criterion: "1.4.11 Non-text Contrast", level: "AA", status: "Check UI element contrast" },
    { criterion: "2.1.1 Keyboard", level: "A", status: "Ensure keyboard access" },
    { criterion: "2.4.3 Focus Order", level: "A", status: "Check tab order" },
    { criterion: "2.4.7 Focus Visible", level: "AA", status: "Check focus indicators" },
    { criterion: "2.5.5 Target Size", level: "AAA", status: "Check touch targets" },
  ];
  
  return { isError: false, content: JSON.stringify({ level, checklist: checklist.filter(c => c.level <= level) }) };
}
