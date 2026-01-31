import { ToolResult } from "../tool-result";

function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  } : { r: 1, g: 1, b: 1 };
}

// Token Management Tools
export interface CreateColorTokensParams { name: string; colors: Record<string, string>; }
export async function createColorTokens(args: CreateColorTokensParams): Promise<ToolResult> {
  const styles: any[] = [];
  
  for (const [name, hex] of Object.entries(args.colors)) {
    try {
      const style = figma.createPaintStyle();
      style.name = `${args.name}/${name}`;
      style.paints = [{ type: "SOLID", color: hexToRgb(hex) }];
      styles.push({ name: style.name, id: style.id });
    } catch (e) {
      // Style may already exist
    }
  }
  
  return { isError: false, content: JSON.stringify({ created: styles.length, styles }) };
}

export interface CreateSpacingTokensParams { baseUnit?: number; scale?: number[]; }
export async function createSpacingTokens(args: CreateSpacingTokensParams): Promise<ToolResult> {
  const base = args.baseUnit || 4;
  const scale = args.scale || [1, 2, 3, 4, 6, 8, 12, 16];
  
  const tokens = scale.map(multiplier => ({
    name: `spacing-${multiplier}`,
    value: base * multiplier,
  }));
  
  return { isError: false, content: JSON.stringify({ tokens, baseUnit: base }) };
}

export interface CreateTypographyTokensParams { fontFamily: string; scale?: number[]; }
export async function createTypographyTokens(args: CreateTypographyTokensParams): Promise<ToolResult> {
  const scale = args.scale || [12, 14, 16, 18, 20, 24, 32, 48];
  const styles: any[] = [];
  
  await figma.loadFontAsync({ family: args.fontFamily, style: "Regular" });
  
  const names = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"];
  
  for (let i = 0; i < scale.length; i++) {
    const style = figma.createTextStyle();
    style.name = `text-${names[i] || scale[i]}`;
    style.fontName = { family: args.fontFamily, style: "Regular" };
    style.fontSize = scale[i];
    styles.push({ name: style.name, size: scale[i], id: style.id });
  }
  
  return { isError: false, content: JSON.stringify({ created: styles.length, styles }) };
}

export interface CreateShadowTokensParams { name: string; }
export async function createShadowTokens(args: CreateShadowTokensParams): Promise<ToolResult> {
  const shadows = [
    { name: "sm", blur: 2, y: 1, opacity: 0.05 },
    { name: "md", blur: 6, y: 3, opacity: 0.1 },
    { name: "lg", blur: 15, y: 8, opacity: 0.1 },
    { name: "xl", blur: 25, y: 15, opacity: 0.15 },
  ];
  
  const styles: any[] = [];
  
  for (const shadow of shadows) {
    const style = figma.createEffectStyle();
    style.name = `${args.name}/${shadow.name}`;
    style.effects = [{
      type: "DROP_SHADOW",
      color: { r: 0, g: 0, b: 0, a: shadow.opacity },
      offset: { x: 0, y: shadow.y },
      radius: shadow.blur,
      visible: true,
      blendMode: "NORMAL",
    }];
    styles.push({ name: style.name, id: style.id });
  }
  
  return { isError: false, content: JSON.stringify({ created: styles.length, styles }) };
}

export interface CreateRadiusTokensParams { scale?: number[]; }
export async function createRadiusTokens(args: CreateRadiusTokensParams): Promise<ToolResult> {
  const scale = args.scale || [0, 2, 4, 8, 12, 16, 9999];
  const names = ["none", "sm", "md", "lg", "xl", "2xl", "full"];
  
  const tokens = scale.map((value, i) => ({
    name: `radius-${names[i] || value}`,
    value,
  }));
  
  return { isError: false, content: JSON.stringify({ tokens }) };
}

export interface CreateAnimationTokensParams { }
export async function createAnimationTokens(args: CreateAnimationTokensParams): Promise<ToolResult> {
  const tokens = [
    { name: "duration-fast", value: "150ms" },
    { name: "duration-normal", value: "250ms" },
    { name: "duration-slow", value: "400ms" },
    { name: "ease-default", value: "ease-in-out" },
    { name: "ease-spring", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
  ];
  
  return { isError: false, content: JSON.stringify({ tokens }) };
}

export interface CreateBreakpointTokensParams { }
export async function createBreakpointTokens(args: CreateBreakpointTokensParams): Promise<ToolResult> {
  const tokens = [
    { name: "mobile", value: 375 },
    { name: "tablet", value: 768 },
    { name: "desktop", value: 1024 },
    { name: "wide", value: 1280 },
    { name: "ultrawide", value: 1536 },
  ];
  
  return { isError: false, content: JSON.stringify({ tokens }) };
}

export interface CreateZIndexTokensParams { }
export async function createZIndexTokens(args: CreateZIndexTokensParams): Promise<ToolResult> {
  const tokens = [
    { name: "base", value: 0 },
    { name: "dropdown", value: 1000 },
    { name: "sticky", value: 1020 },
    { name: "modal", value: 1050 },
    { name: "popover", value: 1070 },
    { name: "tooltip", value: 1080 },
  ];
  
  return { isError: false, content: JSON.stringify({ tokens }) };
}

export interface ExportTokensParams { format?: string; }
export async function exportTokens(args: ExportTokensParams): Promise<ToolResult> {
  const colorStyles = figma.getLocalPaintStyles();
  const textStyles = figma.getLocalTextStyles();
  const effectStyles = figma.getLocalEffectStyles();
  
  const tokens = {
    colors: colorStyles.map(s => ({ name: s.name, id: s.id })),
    typography: textStyles.map(s => ({ name: s.name, fontSize: s.fontSize })),
    effects: effectStyles.map(s => ({ name: s.name, id: s.id })),
  };
  
  return { isError: false, content: JSON.stringify({ format: args.format || "json", tokens }) };
}

export interface ImportTokensParams { tokens: any; }
export async function importTokens(args: ImportTokensParams): Promise<ToolResult> {
  let imported = 0;
  
  if (args.tokens.colors) {
    for (const [name, value] of Object.entries(args.tokens.colors)) {
      const style = figma.createPaintStyle();
      style.name = name;
      style.paints = [{ type: "SOLID", color: hexToRgb(value as string) }];
      imported++;
    }
  }
  
  return { isError: false, content: JSON.stringify({ imported }) };
}

// Component Library Tools
export interface CreateButtonComponentParams { variants?: string[]; sizes?: string[]; }
export async function createButtonComponent(args: CreateButtonComponentParams): Promise<ToolResult> {
  const frame = figma.createFrame();
  frame.name = "Button Component";
  frame.resize(120, 44);
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.cornerRadius = 8;
  frame.fills = [{ type: "SOLID", color: { r: 0.15, g: 0.39, b: 0.92 } }];
  
  const component = figma.createComponentFromNode(frame);
  
  figma.currentPage.appendChild(component);
  return { isError: false, content: JSON.stringify({ id: component.id, name: component.name }) };
}

export interface CreateInputComponentParams { variants?: string[]; }
export async function createInputComponent(args: CreateInputComponentParams): Promise<ToolResult> {
  const frame = figma.createFrame();
  frame.name = "Input Component";
  frame.resize(280, 44);
  frame.cornerRadius = 8;
  frame.strokes = [{ type: "SOLID", color: { r: 0.85, g: 0.85, b: 0.85 } }];
  frame.strokeWeight = 1;
  frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  
  const component = figma.createComponentFromNode(frame);
  
  figma.currentPage.appendChild(component);
  return { isError: false, content: JSON.stringify({ id: component.id, name: component.name }) };
}

export interface CreateCardComponentParams { }
export async function createCardComponent(args: CreateCardComponentParams): Promise<ToolResult> {
  const frame = figma.createFrame();
  frame.name = "Card Component";
  frame.resize(320, 200);
  frame.cornerRadius = 12;
  frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  frame.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: 0, y: 4 }, radius: 12, visible: true, blendMode: "NORMAL" }];
  
  const component = figma.createComponentFromNode(frame);
  
  figma.currentPage.appendChild(component);
  return { isError: false, content: JSON.stringify({ id: component.id, name: component.name }) };
}

export interface CreateAvatarComponentParams { sizes?: number[]; }
export async function createAvatarComponent(args: CreateAvatarComponentParams): Promise<ToolResult> {
  const frame = figma.createFrame();
  frame.name = "Avatar Component";
  frame.resize(40, 40);
  frame.cornerRadius = 20;
  frame.fills = [{ type: "SOLID", color: { r: 0.39, g: 0.4, b: 0.95 } }];
  
  const component = figma.createComponentFromNode(frame);
  
  figma.currentPage.appendChild(component);
  return { isError: false, content: JSON.stringify({ id: component.id, name: component.name }) };
}

export interface CreateBadgeComponentParams { }
export async function createBadgeComponent(args: CreateBadgeComponentParams): Promise<ToolResult> {
  const frame = figma.createFrame();
  frame.name = "Badge Component";
  frame.resize(60, 24);
  frame.cornerRadius = 12;
  frame.fills = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
  
  const component = figma.createComponentFromNode(frame);
  
  figma.currentPage.appendChild(component);
  return { isError: false, content: JSON.stringify({ id: component.id, name: component.name }) };
}

export interface CreateIconComponentParams { name: string; size?: number; }
export async function createIconComponent(args: CreateIconComponentParams): Promise<ToolResult> {
  const size = args.size || 24;
  const frame = figma.createFrame();
  frame.name = `Icon - ${args.name}`;
  frame.resize(size, size);
  frame.fills = [];
  
  const component = figma.createComponentFromNode(frame);
  
  figma.currentPage.appendChild(component);
  return { isError: false, content: JSON.stringify({ id: component.id, name: component.name }) };
}

export interface CreateDividerComponentParams { }
export async function createDividerComponent(args: CreateDividerComponentParams): Promise<ToolResult> {
  const rect = figma.createRectangle();
  rect.name = "Divider Component";
  rect.resize(200, 1);
  rect.fills = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
  
  const component = figma.createComponentFromNode(rect);
  
  figma.currentPage.appendChild(component);
  return { isError: false, content: JSON.stringify({ id: component.id, name: component.name }) };
}

export interface CreateTooltipComponentParams { }
export async function createTooltipComponent(args: CreateTooltipComponentParams): Promise<ToolResult> {
  const frame = figma.createFrame();
  frame.name = "Tooltip Component";
  frame.resize(120, 32);
  frame.cornerRadius = 6;
  frame.fills = [{ type: "SOLID", color: { r: 0.12, g: 0.16, b: 0.22 } }];
  
  const component = figma.createComponentFromNode(frame);
  
  figma.currentPage.appendChild(component);
  return { isError: false, content: JSON.stringify({ id: component.id, name: component.name }) };
}

export interface CreateModalComponentParams { }
export async function createModalComponent(args: CreateModalComponentParams): Promise<ToolResult> {
  const frame = figma.createFrame();
  frame.name = "Modal Component";
  frame.resize(480, 300);
  frame.cornerRadius = 12;
  frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  frame.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.25 }, offset: { x: 0, y: 8 }, radius: 24, visible: true, blendMode: "NORMAL" }];
  
  const component = figma.createComponentFromNode(frame);
  
  figma.currentPage.appendChild(component);
  return { isError: false, content: JSON.stringify({ id: component.id, name: component.name }) };
}

export interface CreateAlertComponentParams { }
export async function createAlertComponent(args: CreateAlertComponentParams): Promise<ToolResult> {
  const frame = figma.createFrame();
  frame.name = "Alert Component";
  frame.resize(400, 64);
  frame.cornerRadius = 8;
  frame.fills = [{ type: "SOLID", color: { r: 0.94, g: 0.97, b: 1 } }];
  
  const component = figma.createComponentFromNode(frame);
  
  figma.currentPage.appendChild(component);
  return { isError: false, content: JSON.stringify({ id: component.id, name: component.name }) };
}

// Documentation Tools
export interface DocumentComponentParams { componentId: string; description?: string; }
export async function documentComponent(args: DocumentComponentParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.componentId);
  if (!node) return { isError: true, content: "Component not found" };
  
  if (args.description) {
    node.setPluginData("description", args.description);
  }
  
  return { isError: false, content: JSON.stringify({ documented: true, name: node.name }) };
}

export interface GenerateComponentDocsParams { }
export async function generateComponentDocs(args: GenerateComponentDocsParams): Promise<ToolResult> {
  const components = figma.currentPage.findAll(n => n.type === "COMPONENT");
  
  const docs = components.map(c => ({
    name: c.name,
    id: c.id,
    description: c.getPluginData("description") || "No description",
  }));
  
  return { isError: false, content: JSON.stringify({ components: docs }) };
}

export interface CreateStyleGuidePageParams { }
export async function createStyleGuidePage(args: CreateStyleGuidePageParams): Promise<ToolResult> {
  const page = figma.createPage();
  page.name = "Style Guide";
  
  return { isError: false, content: JSON.stringify({ pageId: page.id, name: page.name }) };
}

export interface CreateColorSwatchPageParams { }
export async function createColorSwatchPage(args: CreateColorSwatchPageParams): Promise<ToolResult> {
  const colorStyles = figma.getLocalPaintStyles();
  
  const frame = figma.createFrame();
  frame.name = "Color Swatches";
  frame.layoutMode = "HORIZONTAL";
  frame.layoutWrap = "WRAP";
  frame.itemSpacing = 16;
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 24;
  frame.resize(800, 400);
  frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  
  for (const style of colorStyles.slice(0, 20)) {
    const swatch = figma.createRectangle();
    swatch.name = style.name;
    swatch.resize(80, 80);
    swatch.cornerRadius = 8;
    swatch.fillStyleId = style.id;
    frame.appendChild(swatch);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, swatchCount: colorStyles.length }) };
}

export interface CreateTypographyShowcaseParams { }
export async function createTypographyShowcase(args: CreateTypographyShowcaseParams): Promise<ToolResult> {
  const textStyles = figma.getLocalTextStyles();
  
  const frame = figma.createFrame();
  frame.name = "Typography Showcase";
  frame.layoutMode = "VERTICAL";
  frame.itemSpacing = 24;
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 32;
  frame.resize(600, 400);
  frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  
  for (const style of textStyles.slice(0, 10)) {
    const text = figma.createText();
    text.characters = `${style.name} - The quick brown fox`;
    text.textStyleId = style.id;
    frame.appendChild(text);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, styleCount: textStyles.length }) };
}

export interface CreateComponentShowcaseParams { }
export async function createComponentShowcase(args: CreateComponentShowcaseParams): Promise<ToolResult> {
  const components = figma.currentPage.findAll(n => n.type === "COMPONENT") as ComponentNode[];
  
  const frame = figma.createFrame();
  frame.name = "Component Showcase";
  frame.layoutMode = "HORIZONTAL";
  frame.layoutWrap = "WRAP";
  frame.itemSpacing = 32;
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 32;
  frame.resize(1000, 600);
  frame.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
  
  for (const component of components.slice(0, 12)) {
    const instance = component.createInstance();
    frame.appendChild(instance);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, componentCount: components.length }) };
}

export interface CreateUsageGuidelinesParams { componentId: string; dos?: string[]; donts?: string[]; }
export async function createUsageGuidelines(args: CreateUsageGuidelinesParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.componentId);
  if (!node) return { isError: true, content: "Component not found" };
  
  if (args.dos) node.setPluginData("dos", JSON.stringify(args.dos));
  if (args.donts) node.setPluginData("donts", JSON.stringify(args.donts));
  
  return { isError: false, content: JSON.stringify({ created: true }) };
}

export interface CreateSpacingGuideParams { }
export async function createSpacingGuide(args: CreateSpacingGuideParams): Promise<ToolResult> {
  const frame = figma.createFrame();
  frame.name = "Spacing Guide";
  frame.resize(600, 300);
  frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateIconGuideParams { }
export async function createIconGuide(args: CreateIconGuideParams): Promise<ToolResult> {
  const frame = figma.createFrame();
  frame.name = "Icon Guide";
  frame.resize(800, 400);
  frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateMotionGuideParams { }
export async function createMotionGuide(args: CreateMotionGuideParams): Promise<ToolResult> {
  const frame = figma.createFrame();
  frame.name = "Motion Guide";
  frame.resize(600, 400);
  frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}
