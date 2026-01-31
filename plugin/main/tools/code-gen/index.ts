import { ToolResult } from "../tool-result";

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
}

export interface GenerateCssParams { nodeId: string; }
export async function generateCss(args: GenerateCssParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId) as SceneNode;
  if (!node) return { isError: true, content: "Node not found" };
  
  const css: string[] = [];
  
  if ("width" in node) css.push(`width: ${Math.round(node.width)}px;`);
  if ("height" in node) css.push(`height: ${Math.round(node.height)}px;`);
  if ("cornerRadius" in node && typeof node.cornerRadius === "number") {
    css.push(`border-radius: ${node.cornerRadius}px;`);
  }
  if ("fills" in node && Array.isArray(node.fills) && node.fills.length > 0) {
    const fill = node.fills[0] as SolidPaint;
    if (fill.type === "SOLID") {
      css.push(`background-color: ${rgbToHex(fill.color.r, fill.color.g, fill.color.b)};`);
    }
  }
  if ("opacity" in node && node.opacity < 1) {
    css.push(`opacity: ${node.opacity.toFixed(2)};`);
  }
  if ("layoutMode" in node && node.layoutMode !== "NONE") {
    css.push(`display: flex;`);
    css.push(`flex-direction: ${node.layoutMode === "HORIZONTAL" ? "row" : "column"};`);
    if (node.itemSpacing) css.push(`gap: ${node.itemSpacing}px;`);
    if (node.paddingTop) css.push(`padding-top: ${node.paddingTop}px;`);
    if (node.paddingRight) css.push(`padding-right: ${node.paddingRight}px;`);
    if (node.paddingBottom) css.push(`padding-bottom: ${node.paddingBottom}px;`);
    if (node.paddingLeft) css.push(`padding-left: ${node.paddingLeft}px;`);
  }
  
  return { isError: false, content: JSON.stringify({ css: css.join("\n") }) };
}

export interface GenerateTailwindParams { nodeId: string; }
export async function generateTailwind(args: GenerateTailwindParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId) as SceneNode;
  if (!node) return { isError: true, content: "Node not found" };
  
  const classes: string[] = [];
  
  if ("width" in node) classes.push(`w-[${Math.round(node.width)}px]`);
  if ("height" in node) classes.push(`h-[${Math.round(node.height)}px]`);
  if ("cornerRadius" in node && typeof node.cornerRadius === "number") {
    if (node.cornerRadius === 9999) classes.push("rounded-full");
    else if (node.cornerRadius > 0) classes.push(`rounded-[${node.cornerRadius}px]`);
  }
  if ("fills" in node && Array.isArray(node.fills) && node.fills.length > 0) {
    const fill = node.fills[0] as SolidPaint;
    if (fill.type === "SOLID") {
      classes.push(`bg-[${rgbToHex(fill.color.r, fill.color.g, fill.color.b)}]`);
    }
  }
  if ("layoutMode" in node && node.layoutMode !== "NONE") {
    classes.push("flex");
    classes.push(node.layoutMode === "HORIZONTAL" ? "flex-row" : "flex-col");
    if (node.itemSpacing) classes.push(`gap-[${node.itemSpacing}px]`);
    if (node.paddingTop) classes.push(`pt-[${node.paddingTop}px]`);
    if (node.paddingRight) classes.push(`pr-[${node.paddingRight}px]`);
    if (node.paddingBottom) classes.push(`pb-[${node.paddingBottom}px]`);
    if (node.paddingLeft) classes.push(`pl-[${node.paddingLeft}px]`);
  }
  
  return { isError: false, content: JSON.stringify({ tailwind: classes.join(" ") }) };
}

export interface GenerateReactParams { nodeId: string; componentName?: string; }
export async function generateReact(args: GenerateReactParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId) as SceneNode;
  if (!node) return { isError: true, content: "Node not found" };
  
  const name = args.componentName || node.name.replace(/[^a-zA-Z0-9]/g, '');
  
  const code = `function ${name}() {
  return (
    <div style={{
      width: ${Math.round((node as any).width || 100)},
      height: ${Math.round((node as any).height || 100)},
    }}>
      {/* ${node.name} content */}
    </div>
  );
}

export default ${name};`;
  
  return { isError: false, content: JSON.stringify({ component: code }) };
}

export interface ExtractLayoutCssParams { nodeId: string; }
export async function extractLayoutCss(args: ExtractLayoutCssParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId) as FrameNode;
  if (!node) return { isError: true, content: "Node not found" };
  
  const css: string[] = [];
  
  if ("layoutMode" in node) {
    if (node.layoutMode !== "NONE") {
      css.push(`display: flex;`);
      css.push(`flex-direction: ${node.layoutMode === "HORIZONTAL" ? "row" : "column"};`);
      if (node.layoutWrap === "WRAP") css.push("flex-wrap: wrap;");
      if (node.itemSpacing) css.push(`gap: ${node.itemSpacing}px;`);
      css.push(`align-items: ${node.counterAxisAlignItems === "CENTER" ? "center" : node.counterAxisAlignItems === "MAX" ? "flex-end" : "flex-start"};`);
      css.push(`justify-content: ${node.primaryAxisAlignItems === "CENTER" ? "center" : node.primaryAxisAlignItems === "MAX" ? "flex-end" : node.primaryAxisAlignItems === "SPACE_BETWEEN" ? "space-between" : "flex-start"};`);
    }
    
    css.push(`padding: ${node.paddingTop}px ${node.paddingRight}px ${node.paddingBottom}px ${node.paddingLeft}px;`);
  }
  
  return { isError: false, content: JSON.stringify({ layoutCss: css.join("\n") }) };
}

export interface ExtractTypographyCssParams { nodeId: string; }
export async function extractTypographyCss(args: ExtractTypographyCssParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId) as TextNode;
  if (!node || node.type !== "TEXT") return { isError: true, content: "Text node not found" };
  
  const css: string[] = [];
  
  if (node.fontName !== figma.mixed) {
    css.push(`font-family: "${node.fontName.family}";`);
    css.push(`font-weight: ${node.fontName.style.includes("Bold") ? "bold" : "normal"};`);
  }
  if (node.fontSize !== figma.mixed) css.push(`font-size: ${node.fontSize}px;`);
  if (node.lineHeight !== figma.mixed && node.lineHeight.unit === "PIXELS") {
    css.push(`line-height: ${node.lineHeight.value}px;`);
  }
  if (node.letterSpacing !== figma.mixed && node.letterSpacing.unit === "PIXELS") {
    css.push(`letter-spacing: ${node.letterSpacing.value}px;`);
  }
  css.push(`text-align: ${node.textAlignHorizontal.toLowerCase()};`);
  
  return { isError: false, content: JSON.stringify({ typographyCss: css.join("\n") }) };
}

export interface ExtractColorPaletteParams { nodeId?: string; }
export async function extractColorPalette(args: ExtractColorPaletteParams): Promise<ToolResult> {
  const colors = new Set<string>();
  const nodes = args.nodeId ? [await figma.getNodeByIdAsync(args.nodeId)] : figma.currentPage.children;
  
  function extractColors(node: BaseNode | null) {
    if (!node) return;
    if ("fills" in node && Array.isArray(node.fills)) {
      for (const fill of node.fills) {
        if (fill.type === "SOLID") {
          colors.add(rgbToHex(fill.color.r, fill.color.g, fill.color.b));
        }
      }
    }
    if ("children" in node) {
      for (const child of (node as ChildrenMixin).children) {
        extractColors(child);
      }
    }
  }
  
  for (const node of nodes) extractColors(node);
  
  return { isError: false, content: JSON.stringify({ colors: Array.from(colors) }) };
}

export interface GenerateDesignTokensParams { nodeId?: string; }
export async function generateDesignTokens(args: GenerateDesignTokensParams): Promise<ToolResult> {
  const tokens: any = { colors: [], spacing: [], typography: [] };
  
  // Extract colors
  const colorPaletteResult = await extractColorPalette({ nodeId: args.nodeId });
  tokens.colors = JSON.parse(colorPaletteResult.content).colors;
  
  // Extract typography from text styles
  const textStyles = figma.getLocalTextStyles();
  tokens.typography = textStyles.map(style => ({
    name: style.name,
    fontSize: style.fontSize,
    fontFamily: style.fontName.family,
    fontWeight: style.fontName.style,
  }));
  
  return { isError: false, content: JSON.stringify({ tokens }) };
}

export interface GenerateHtmlStructureParams { nodeId: string; }
export async function generateHtmlStructure(args: GenerateHtmlStructureParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  function nodeToHtml(n: BaseNode, indent: number = 0): string {
    const spaces = "  ".repeat(indent);
    const tag = n.type === "TEXT" ? "p" : "div";
    const className = n.name.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();
    
    if (n.type === "TEXT") {
      return `${spaces}<${tag} class="${className}">${(n as TextNode).characters}</${tag}>`;
    }
    
    if ("children" in n && (n as ChildrenMixin).children.length > 0) {
      const childrenHtml = (n as ChildrenMixin).children.map(c => nodeToHtml(c, indent + 1)).join("\n");
      return `${spaces}<${tag} class="${className}">\n${childrenHtml}\n${spaces}</${tag}>`;
    }
    
    return `${spaces}<${tag} class="${className}"></${tag}>`;
  }
  
  return { isError: false, content: JSON.stringify({ html: nodeToHtml(node) }) };
}

export interface LayoutToFlexboxParams { nodeId: string; }
export async function layoutToFlexbox(args: LayoutToFlexboxParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId) as FrameNode;
  if (!node) return { isError: true, content: "Node not found" };
  if (!("layoutMode" in node)) return { isError: true, content: "Node is not a frame with layout" };
  
  const css: string[] = ["display: flex;"];
  
  css.push(`flex-direction: ${node.layoutMode === "HORIZONTAL" ? "row" : "column"};`);
  if (node.layoutWrap === "WRAP") css.push("flex-wrap: wrap;");
  if (node.itemSpacing) css.push(`gap: ${node.itemSpacing}px;`);
  
  const alignMap = { MIN: "flex-start", CENTER: "center", MAX: "flex-end", BASELINE: "baseline" };
  css.push(`align-items: ${alignMap[node.counterAxisAlignItems] || "stretch"};`);
  
  const justifyMap = { MIN: "flex-start", CENTER: "center", MAX: "flex-end", SPACE_BETWEEN: "space-between" };
  css.push(`justify-content: ${justifyMap[node.primaryAxisAlignItems] || "flex-start"};`);
  
  css.push(`padding: ${node.paddingTop}px ${node.paddingRight}px ${node.paddingBottom}px ${node.paddingLeft}px;`);
  
  return { isError: false, content: JSON.stringify({ flexbox: css.join("\n") }) };
}

export interface LayoutToGridParams { nodeId: string; columns?: number; }
export async function layoutToGrid(args: LayoutToGridParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId) as FrameNode;
  if (!node) return { isError: true, content: "Node not found" };
  
  const cols = args.columns || 12;
  const css: string[] = [
    "display: grid;",
    `grid-template-columns: repeat(${cols}, 1fr);`,
  ];
  
  if ("itemSpacing" in node && node.itemSpacing) {
    css.push(`gap: ${node.itemSpacing}px;`);
  }
  
  css.push(`padding: ${node.paddingTop || 0}px ${node.paddingRight || 0}px ${node.paddingBottom || 0}px ${node.paddingLeft || 0}px;`);
  
  return { isError: false, content: JSON.stringify({ grid: css.join("\n") }) };
}
