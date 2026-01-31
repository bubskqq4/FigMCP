import { ToolResult } from "../tool-result";

function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  } : { r: 1, g: 1, b: 1 };
}

async function createFrame(name: string, width: number, height: number, fill: string = "#FFFFFF"): Promise<FrameNode> {
  const frame = figma.createFrame();
  frame.name = name;
  frame.resize(width, height);
  frame.fills = [{ type: "SOLID", color: hexToRgb(fill) }];
  return frame;
}

async function createText(content: string, fontSize: number = 14, fontWeight: string = "Regular"): Promise<TextNode> {
  const text = figma.createText();
  await figma.loadFontAsync({ family: "Inter", style: fontWeight });
  text.fontName = { family: "Inter", style: fontWeight };
  text.fontSize = fontSize;
  text.characters = content;
  return text;
}

// NAVIGATION PATTERNS

export interface CreateNavbarParams { logo?: string; items?: string[]; style?: string; }
export async function createNavbar(args: CreateNavbarParams): Promise<ToolResult> {
  const frame = await createFrame("Navbar", 1200, 64, "#FFFFFF");
  frame.layoutMode = "HORIZONTAL";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = frame.paddingRight = 24;
  frame.itemSpacing = 32;
  frame.strokes = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
  frame.strokeWeight = 1;
  frame.strokeAlign = "INSIDE";
  
  const logo = await createText(args.logo || "Logo", 18, "Bold");
  frame.appendChild(logo);
  
  const navItems = figma.createFrame();
  navItems.name = "Nav Items";
  navItems.layoutMode = "HORIZONTAL";
  navItems.itemSpacing = 24;
  navItems.fills = [];
  navItems.layoutGrow = 1;
  
  for (const item of (args.items || ["Home", "Products", "About", "Contact"])) {
    const navItem = await createText(item, 14);
    navItems.appendChild(navItem);
  }
  
  frame.appendChild(navItems);
  
  const cta = await createFrame("CTA", 100, 36, "#2563EB");
  cta.cornerRadius = 6;
  cta.layoutMode = "VERTICAL";
  cta.primaryAxisAlignItems = "CENTER";
  cta.counterAxisAlignItems = "CENTER";
  const ctaText = await createText("Sign Up", 14, "Medium");
  ctaText.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  cta.appendChild(ctaText);
  frame.appendChild(cta);
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateSidebarParams { title?: string; sections?: Array<{ name: string; items?: string[] }>; }
export async function createSidebar(args: CreateSidebarParams): Promise<ToolResult> {
  const frame = await createFrame("Sidebar", 240, 600, "#1F2937");
  frame.layoutMode = "VERTICAL";
  frame.paddingTop = frame.paddingBottom = 24;
  frame.paddingLeft = frame.paddingRight = 16;
  frame.itemSpacing = 24;
  
  if (args.title) {
    const title = await createText(args.title, 16, "Bold");
    title.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    frame.appendChild(title);
  }
  
  for (const section of (args.sections || [{ name: "Menu", items: ["Dashboard", "Analytics", "Settings"] }])) {
    const sectionFrame = figma.createFrame();
    sectionFrame.name = section.name;
    sectionFrame.layoutMode = "VERTICAL";
    sectionFrame.itemSpacing = 8;
    sectionFrame.fills = [];
    
    const sectionTitle = await createText(section.name, 12);
    sectionTitle.fills = [{ type: "SOLID", color: { r: 0.6, g: 0.6, b: 0.6 } }];
    sectionFrame.appendChild(sectionTitle);
    
    for (const item of (section.items || [])) {
      const itemText = await createText(item, 14);
      itemText.fills = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
      sectionFrame.appendChild(itemText);
    }
    
    frame.appendChild(sectionFrame);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateTabsParams { tabs: string[]; style?: string; activeIndex?: number; }
export async function createTabs(args: CreateTabsParams): Promise<ToolResult> {
  const frame = await createFrame("Tabs", 400, 44, "#FFFFFF");
  frame.layoutMode = "HORIZONTAL";
  frame.itemSpacing = 0;
  frame.strokes = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
  frame.strokeWeight = 1;
  frame.strokeAlign = "INSIDE";
  
  const activeIdx = args.activeIndex || 0;
  
  for (let i = 0; i < args.tabs.length; i++) {
    const tab = await createFrame(args.tabs[i], 100, 44, i === activeIdx ? "#F3F4F6" : "#FFFFFF");
    tab.layoutMode = "VERTICAL";
    tab.primaryAxisAlignItems = "CENTER";
    tab.counterAxisAlignItems = "CENTER";
    
    const tabText = await createText(args.tabs[i], 14, i === activeIdx ? "Medium" : "Regular");
    if (i === activeIdx) tabText.fills = [{ type: "SOLID", color: { r: 0.15, g: 0.39, b: 0.92 } }];
    tab.appendChild(tabText);
    
    frame.appendChild(tab);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateBreadcrumbsParams { items: string[]; separator?: string; }
export async function createBreadcrumbs(args: CreateBreadcrumbsParams): Promise<ToolResult> {
  const frame = await createFrame("Breadcrumbs", 400, 32, "transparent");
  frame.fills = [];
  frame.layoutMode = "HORIZONTAL";
  frame.itemSpacing = 8;
  frame.counterAxisAlignItems = "CENTER";
  
  const sep = args.separator || "/";
  
  for (let i = 0; i < args.items.length; i++) {
    const item = await createText(args.items[i], 14);
    if (i < args.items.length - 1) {
      item.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.8 } }];
    }
    frame.appendChild(item);
    
    if (i < args.items.length - 1) {
      const sepText = await createText(sep, 14);
      sepText.fills = [{ type: "SOLID", color: { r: 0.6, g: 0.6, b: 0.6 } }];
      frame.appendChild(sepText);
    }
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreatePaginationParams { currentPage: number; totalPages: number; }
export async function createPagination(args: CreatePaginationParams): Promise<ToolResult> {
  const frame = await createFrame("Pagination", 300, 40, "transparent");
  frame.fills = [];
  frame.layoutMode = "HORIZONTAL";
  frame.itemSpacing = 8;
  frame.counterAxisAlignItems = "CENTER";
  
  const prev = await createFrame("Prev", 32, 32, "#F3F4F6");
  prev.cornerRadius = 6;
  prev.layoutMode = "VERTICAL";
  prev.primaryAxisAlignItems = "CENTER";
  prev.counterAxisAlignItems = "CENTER";
  const prevText = await createText("←", 14);
  prev.appendChild(prevText);
  frame.appendChild(prev);
  
  for (let i = 1; i <= Math.min(args.totalPages, 5); i++) {
    const page = await createFrame(`Page ${i}`, 32, 32, i === args.currentPage ? "#2563EB" : "#F3F4F6");
    page.cornerRadius = 6;
    page.layoutMode = "VERTICAL";
    page.primaryAxisAlignItems = "CENTER";
    page.counterAxisAlignItems = "CENTER";
    const pageText = await createText(String(i), 14);
    if (i === args.currentPage) pageText.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    page.appendChild(pageText);
    frame.appendChild(page);
  }
  
  const next = await createFrame("Next", 32, 32, "#F3F4F6");
  next.cornerRadius = 6;
  next.layoutMode = "VERTICAL";
  next.primaryAxisAlignItems = "CENTER";
  next.counterAxisAlignItems = "CENTER";
  const nextText = await createText("→", 14);
  next.appendChild(nextText);
  frame.appendChild(next);
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateStepperParams { steps: string[]; currentStep?: number; }
export async function createStepper(args: CreateStepperParams): Promise<ToolResult> {
  const frame = await createFrame("Stepper", 600, 80, "#FFFFFF");
  frame.layoutMode = "HORIZONTAL";
  frame.itemSpacing = 16;
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = frame.paddingRight = 24;
  
  const current = args.currentStep || 1;
  
  for (let i = 0; i < args.steps.length; i++) {
    const stepFrame = figma.createFrame();
    stepFrame.name = `Step ${i + 1}`;
    stepFrame.layoutMode = "HORIZONTAL";
    stepFrame.itemSpacing = 8;
    stepFrame.counterAxisAlignItems = "CENTER";
    stepFrame.fills = [];
    
    const circle = await createFrame(`Circle ${i + 1}`, 32, 32, i < current ? "#2563EB" : "#E5E7EB");
    circle.cornerRadius = 16;
    circle.layoutMode = "VERTICAL";
    circle.primaryAxisAlignItems = "CENTER";
    circle.counterAxisAlignItems = "CENTER";
    const num = await createText(String(i + 1), 14, "Medium");
    if (i < current) num.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    circle.appendChild(num);
    stepFrame.appendChild(circle);
    
    const stepText = await createText(args.steps[i], 14);
    stepFrame.appendChild(stepText);
    
    frame.appendChild(stepFrame);
    
    if (i < args.steps.length - 1) {
      const line = figma.createRectangle();
      line.resize(40, 2);
      line.fills = [{ type: "SOLID", color: i < current - 1 ? hexToRgb("#2563EB") : hexToRgb("#E5E7EB") }];
      frame.appendChild(line);
    }
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// CONTENT PATTERNS

export interface CreateCardParams { title: string; description?: string; image?: boolean; actions?: string[]; }
export async function createCard(args: CreateCardParams): Promise<ToolResult> {
  const frame = await createFrame("Card", 320, 280, "#FFFFFF");
  frame.cornerRadius = 12;
  frame.layoutMode = "VERTICAL";
  frame.itemSpacing = 0;
  frame.strokes = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
  frame.strokeWeight = 1;
  frame.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: 0, y: 4 }, radius: 12, visible: true, blendMode: "NORMAL" }];
  
  if (args.image !== false) {
    const img = await createFrame("Image", 320, 160, "#E5E7EB");
    img.layoutMode = "VERTICAL";
    img.primaryAxisAlignItems = "CENTER";
    img.counterAxisAlignItems = "CENTER";
    const placeholder = await createText("Image", 14);
    placeholder.fills = [{ type: "SOLID", color: { r: 0.6, g: 0.6, b: 0.6 } }];
    img.appendChild(placeholder);
    frame.appendChild(img);
  }
  
  const content = figma.createFrame();
  content.name = "Content";
  content.layoutMode = "VERTICAL";
  content.itemSpacing = 8;
  content.paddingTop = content.paddingBottom = content.paddingLeft = content.paddingRight = 16;
  content.fills = [];
  content.layoutGrow = 1;
  
  const title = await createText(args.title, 16, "Bold");
  content.appendChild(title);
  
  if (args.description) {
    const desc = await createText(args.description, 14);
    desc.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
    content.appendChild(desc);
  }
  
  frame.appendChild(content);
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateHeroSectionParams { headline: string; subheadline?: string; ctaText?: string; }
export async function createHeroSection(args: CreateHeroSectionParams): Promise<ToolResult> {
  const frame = await createFrame("Hero", 1200, 500, "#1F2937");
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.itemSpacing = 24;
  
  const headline = await createText(args.headline, 48, "Bold");
  headline.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  headline.textAlignHorizontal = "CENTER";
  frame.appendChild(headline);
  
  if (args.subheadline) {
    const sub = await createText(args.subheadline, 20);
    sub.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.8, b: 0.8 } }];
    sub.textAlignHorizontal = "CENTER";
    frame.appendChild(sub);
  }
  
  if (args.ctaText) {
    const cta = await createFrame("CTA", 160, 48, "#2563EB");
    cta.cornerRadius = 8;
    cta.layoutMode = "VERTICAL";
    cta.primaryAxisAlignItems = "CENTER";
    cta.counterAxisAlignItems = "CENTER";
    const ctaText = await createText(args.ctaText, 16, "Medium");
    ctaText.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    cta.appendChild(ctaText);
    frame.appendChild(cta);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateTestimonialParams { quote: string; author: string; role?: string; }
export async function createTestimonial(args: CreateTestimonialParams): Promise<ToolResult> {
  const frame = await createFrame("Testimonial", 400, 200, "#F9FAFB");
  frame.cornerRadius = 12;
  frame.layoutMode = "VERTICAL";
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 24;
  frame.itemSpacing = 16;
  
  const quote = await createText(`"${args.quote}"`, 16);
  quote.fontName = { family: "Inter", style: "Italic" };
  await figma.loadFontAsync({ family: "Inter", style: "Italic" });
  frame.appendChild(quote);
  
  const authorFrame = figma.createFrame();
  authorFrame.name = "Author";
  authorFrame.layoutMode = "VERTICAL";
  authorFrame.itemSpacing = 4;
  authorFrame.fills = [];
  
  const authorName = await createText(args.author, 14, "Bold");
  authorFrame.appendChild(authorName);
  
  if (args.role) {
    const role = await createText(args.role, 12);
    role.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }];
    authorFrame.appendChild(role);
  }
  
  frame.appendChild(authorFrame);
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateFeatureGridParams { features: Array<{ title: string; description?: string }>; columns?: number; }
export async function createFeatureGrid(args: CreateFeatureGridParams): Promise<ToolResult> {
  const cols = args.columns || 3;
  const frame = await createFrame("Feature Grid", 300 * cols + 48, 400, "#FFFFFF");
  frame.layoutMode = "HORIZONTAL";
  frame.layoutWrap = "WRAP";
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 24;
  frame.itemSpacing = 24;
  
  for (const feature of args.features) {
    const featureCard = await createFrame(feature.title, 280, 150, "#F9FAFB");
    featureCard.cornerRadius = 8;
    featureCard.layoutMode = "VERTICAL";
    featureCard.paddingTop = featureCard.paddingBottom = featureCard.paddingLeft = featureCard.paddingRight = 20;
    featureCard.itemSpacing = 12;
    
    const title = await createText(feature.title, 16, "Bold");
    featureCard.appendChild(title);
    
    if (feature.description) {
      const desc = await createText(feature.description, 14);
      desc.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
      desc.textAutoResize = "HEIGHT";
      desc.resize(240, desc.height);
      featureCard.appendChild(desc);
    }
    
    frame.appendChild(featureCard);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreatePricingCardParams { name: string; price: string; period?: string; features?: string[]; highlighted?: boolean; }
export async function createPricingCard(args: CreatePricingCardParams): Promise<ToolResult> {
  const bg = args.highlighted ? "#2563EB" : "#FFFFFF";
  const fg = args.highlighted ? "#FFFFFF" : "#000000";
  
  const frame = await createFrame(`Pricing - ${args.name}`, 280, 400, bg);
  frame.cornerRadius = 16;
  frame.layoutMode = "VERTICAL";
  frame.paddingTop = frame.paddingBottom = 32;
  frame.paddingLeft = frame.paddingRight = 24;
  frame.itemSpacing = 24;
  frame.counterAxisAlignItems = "CENTER";
  if (!args.highlighted) {
    frame.strokes = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
    frame.strokeWeight = 1;
  }
  
  const name = await createText(args.name, 20, "Bold");
  name.fills = [{ type: "SOLID", color: hexToRgb(fg) }];
  frame.appendChild(name);
  
  const priceFrame = figma.createFrame();
  priceFrame.name = "Price";
  priceFrame.layoutMode = "HORIZONTAL";
  priceFrame.counterAxisAlignItems = "BASELINE";
  priceFrame.itemSpacing = 4;
  priceFrame.fills = [];
  
  const price = await createText(args.price, 40, "Bold");
  price.fills = [{ type: "SOLID", color: hexToRgb(fg) }];
  priceFrame.appendChild(price);
  
  if (args.period) {
    const period = await createText(`/${args.period}`, 16);
    period.fills = [{ type: "SOLID", color: hexToRgb(args.highlighted ? "#FFFFFF80" : "#666666") }];
    priceFrame.appendChild(period);
  }
  
  frame.appendChild(priceFrame);
  
  if (args.features?.length) {
    const featuresFrame = figma.createFrame();
    featuresFrame.name = "Features";
    featuresFrame.layoutMode = "VERTICAL";
    featuresFrame.itemSpacing = 12;
    featuresFrame.fills = [];
    
    for (const feature of args.features) {
      const f = await createText(`✓ ${feature}`, 14);
      f.fills = [{ type: "SOLID", color: hexToRgb(fg) }];
      featuresFrame.appendChild(f);
    }
    
    frame.appendChild(featuresFrame);
  }
  
  const cta = await createFrame("CTA", 200, 44, args.highlighted ? "#FFFFFF" : "#2563EB");
  cta.cornerRadius = 8;
  cta.layoutMode = "VERTICAL";
  cta.primaryAxisAlignItems = "CENTER";
  cta.counterAxisAlignItems = "CENTER";
  const ctaText = await createText("Get Started", 14, "Medium");
  ctaText.fills = [{ type: "SOLID", color: hexToRgb(args.highlighted ? "#2563EB" : "#FFFFFF") }];
  cta.appendChild(ctaText);
  frame.appendChild(cta);
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// FORM PATTERNS

export interface CreateFormFieldParams { label: string; type?: string; placeholder?: string; required?: boolean; }
export async function createFormField(args: CreateFormFieldParams): Promise<ToolResult> {
  const frame = await createFrame(`Field - ${args.label}`, 320, 72, "transparent");
  frame.fills = [];
  frame.layoutMode = "VERTICAL";
  frame.itemSpacing = 8;
  
  const labelText = await createText(args.label + (args.required ? " *" : ""), 14, "Medium");
  frame.appendChild(labelText);
  
  const input = await createFrame("Input", 320, 44, "#FFFFFF");
  input.cornerRadius = 8;
  input.strokes = [{ type: "SOLID", color: { r: 0.85, g: 0.85, b: 0.85 } }];
  input.strokeWeight = 1;
  input.layoutMode = "HORIZONTAL";
  input.counterAxisAlignItems = "CENTER";
  input.paddingLeft = input.paddingRight = 12;
  
  const placeholder = await createText(args.placeholder || `Enter ${args.label.toLowerCase()}`, 14);
  placeholder.fills = [{ type: "SOLID", color: { r: 0.6, g: 0.6, b: 0.6 } }];
  input.appendChild(placeholder);
  
  frame.appendChild(input);
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateButtonParams { text: string; variant?: string; size?: string; }
export async function createButton(args: CreateButtonParams): Promise<ToolResult> {
  const heights = { sm: 32, md: 40, lg: 48 };
  const fontSizes = { sm: 12, md: 14, lg: 16 };
  const size = args.size || "md";
  
  const bgColors: Record<string, string> = { primary: "#2563EB", secondary: "#6B7280", success: "#10B981", danger: "#EF4444", ghost: "transparent" };
  const bg = bgColors[args.variant || "primary"] || "#2563EB";
  
  const h = heights[size as keyof typeof heights] || 40;
  const fs = fontSizes[size as keyof typeof fontSizes] || 14;
  
  const frame = await createFrame(`Button - ${args.text}`, 120, h, bg);
  frame.cornerRadius = 8;
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  
  if (args.variant === "ghost") {
    frame.strokes = [{ type: "SOLID", color: { r: 0.85, g: 0.85, b: 0.85 } }];
    frame.strokeWeight = 1;
  }
  
  const text = await createText(args.text, fs, "Medium");
  text.fills = [{ type: "SOLID", color: args.variant === "ghost" ? { r: 0.2, g: 0.2, b: 0.2 } : { r: 1, g: 1, b: 1 } }];
  frame.appendChild(text);
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateCheckboxParams { label: string; checked?: boolean; }
export async function createCheckbox(args: CreateCheckboxParams): Promise<ToolResult> {
  const frame = await createFrame(`Checkbox - ${args.label}`, 200, 24, "transparent");
  frame.fills = [];
  frame.layoutMode = "HORIZONTAL";
  frame.itemSpacing = 8;
  frame.counterAxisAlignItems = "CENTER";
  
  const box = await createFrame("Box", 20, 20, args.checked ? "#2563EB" : "#FFFFFF");
  box.cornerRadius = 4;
  box.strokes = [{ type: "SOLID", color: args.checked ? hexToRgb("#2563EB") : { r: 0.85, g: 0.85, b: 0.85 } }];
  box.strokeWeight = 2;
  
  if (args.checked) {
    box.layoutMode = "VERTICAL";
    box.primaryAxisAlignItems = "CENTER";
    box.counterAxisAlignItems = "CENTER";
    const check = await createText("✓", 12, "Bold");
    check.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    box.appendChild(check);
  }
  
  frame.appendChild(box);
  
  const label = await createText(args.label, 14);
  frame.appendChild(label);
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateRadioGroupParams { name: string; options: string[]; selected?: number; }
export async function createRadioGroup(args: CreateRadioGroupParams): Promise<ToolResult> {
  const frame = await createFrame(`Radio - ${args.name}`, 200, 32 * args.options.length, "transparent");
  frame.fills = [];
  frame.layoutMode = "VERTICAL";
  frame.itemSpacing = 12;
  
  for (let i = 0; i < args.options.length; i++) {
    const option = figma.createFrame();
    option.name = args.options[i];
    option.layoutMode = "HORIZONTAL";
    option.itemSpacing = 8;
    option.counterAxisAlignItems = "CENTER";
    option.fills = [];
    
    const isSelected = i === (args.selected || 0);
    const circle = await createFrame("Radio", 20, 20, "#FFFFFF");
    circle.cornerRadius = 10;
    circle.strokes = [{ type: "SOLID", color: isSelected ? hexToRgb("#2563EB") : { r: 0.85, g: 0.85, b: 0.85 } }];
    circle.strokeWeight = 2;
    
    if (isSelected) {
      circle.layoutMode = "VERTICAL";
      circle.primaryAxisAlignItems = "CENTER";
      circle.counterAxisAlignItems = "CENTER";
      const dot = figma.createEllipse();
      dot.resize(10, 10);
      dot.fills = [{ type: "SOLID", color: hexToRgb("#2563EB") }];
      circle.appendChild(dot);
    }
    
    option.appendChild(circle);
    
    const label = await createText(args.options[i], 14);
    option.appendChild(label);
    
    frame.appendChild(option);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateToggleParams { label: string; enabled?: boolean; }
export async function createToggle(args: CreateToggleParams): Promise<ToolResult> {
  const frame = await createFrame(`Toggle - ${args.label}`, 200, 24, "transparent");
  frame.fills = [];
  frame.layoutMode = "HORIZONTAL";
  frame.itemSpacing = 12;
  frame.counterAxisAlignItems = "CENTER";
  
  const track = await createFrame("Track", 44, 24, args.enabled ? "#2563EB" : "#E5E7EB");
  track.cornerRadius = 12;
  track.layoutMode = "HORIZONTAL";
  track.primaryAxisAlignItems = args.enabled ? "MAX" : "MIN";
  track.counterAxisAlignItems = "CENTER";
  track.paddingLeft = track.paddingRight = 2;
  
  const knob = await createFrame("Knob", 20, 20, "#FFFFFF");
  knob.cornerRadius = 10;
  knob.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: 0, y: 1 }, radius: 2, visible: true, blendMode: "NORMAL" }];
  track.appendChild(knob);
  
  frame.appendChild(track);
  
  const label = await createText(args.label, 14);
  frame.appendChild(label);
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// DATA DISPLAY PATTERNS

export interface CreateTableParams { headers: string[]; rows?: string[][]; }
export async function createTable(args: CreateTableParams): Promise<ToolResult> {
  const colWidth = 150;
  const rowHeight = 44;
  const width = colWidth * args.headers.length;
  const height = rowHeight * ((args.rows?.length || 0) + 1);
  
  const frame = await createFrame("Table", width, height, "#FFFFFF");
  frame.layoutMode = "VERTICAL";
  frame.strokes = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
  frame.strokeWeight = 1;
  frame.cornerRadius = 8;
  frame.clipsContent = true;
  
  // Header row
  const headerRow = await createFrame("Header", width, rowHeight, "#F9FAFB");
  headerRow.layoutMode = "HORIZONTAL";
  
  for (const header of args.headers) {
    const cell = await createFrame(header, colWidth, rowHeight, "transparent");
    cell.fills = [];
    cell.layoutMode = "HORIZONTAL";
    cell.paddingLeft = 16;
    cell.counterAxisAlignItems = "CENTER";
    const text = await createText(header, 14, "Medium");
    cell.appendChild(text);
    headerRow.appendChild(cell);
  }
  
  frame.appendChild(headerRow);
  
  // Data rows
  if (args.rows) {
    for (const row of args.rows) {
      const dataRow = await createFrame("Row", width, rowHeight, "#FFFFFF");
      dataRow.layoutMode = "HORIZONTAL";
      dataRow.strokes = [{ type: "SOLID", color: { r: 0.95, g: 0.95, b: 0.95 } }];
      dataRow.strokeWeight = 1;
      dataRow.strokeAlign = "INSIDE";
      
      for (const cellData of row) {
        const cell = await createFrame(cellData, colWidth, rowHeight, "transparent");
        cell.fills = [];
        cell.layoutMode = "HORIZONTAL";
        cell.paddingLeft = 16;
        cell.counterAxisAlignItems = "CENTER";
        const text = await createText(cellData, 14);
        cell.appendChild(text);
        dataRow.appendChild(cell);
      }
      
      frame.appendChild(dataRow);
    }
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateListItemParams { title: string; subtitle?: string; avatar?: boolean; }
export async function createListItem(args: CreateListItemParams): Promise<ToolResult> {
  const frame = await createFrame(`List Item - ${args.title}`, 320, 64, "#FFFFFF");
  frame.layoutMode = "HORIZONTAL";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = frame.paddingRight = 16;
  frame.itemSpacing = 12;
  
  if (args.avatar !== false) {
    const avatar = await createFrame("Avatar", 40, 40, "#E5E7EB");
    avatar.cornerRadius = 20;
    frame.appendChild(avatar);
  }
  
  const content = figma.createFrame();
  content.name = "Content";
  content.layoutMode = "VERTICAL";
  content.itemSpacing = 4;
  content.fills = [];
  content.layoutGrow = 1;
  
  const title = await createText(args.title, 14, "Medium");
  content.appendChild(title);
  
  if (args.subtitle) {
    const subtitle = await createText(args.subtitle, 12);
    subtitle.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }];
    content.appendChild(subtitle);
  }
  
  frame.appendChild(content);
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateBadgeParams { text: string; variant?: string; }
export async function createBadge(args: CreateBadgeParams): Promise<ToolResult> {
  const colors: Record<string, { bg: string; fg: string }> = {
    default: { bg: "#E5E7EB", fg: "#374151" },
    success: { bg: "#D1FAE5", fg: "#065F46" },
    warning: { bg: "#FEF3C7", fg: "#92400E" },
    danger: { bg: "#FEE2E2", fg: "#991B1B" },
    info: { bg: "#DBEAFE", fg: "#1E40AF" },
  };
  
  const { bg, fg } = colors[args.variant || "default"] || colors.default;
  
  const frame = await createFrame(`Badge - ${args.text}`, 80, 24, bg);
  frame.cornerRadius = 12;
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  
  const text = await createText(args.text, 12, "Medium");
  text.fills = [{ type: "SOLID", color: hexToRgb(fg) }];
  frame.appendChild(text);
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateAvatarParams { size?: number; initials?: string; }
export async function createAvatar(args: CreateAvatarParams): Promise<ToolResult> {
  const size = args.size || 40;
  const frame = await createFrame("Avatar", size, size, "#6366F1");
  frame.cornerRadius = size / 2;
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  
  if (args.initials) {
    const text = await createText(args.initials.toUpperCase().slice(0, 2), size * 0.4, "Bold");
    text.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    frame.appendChild(text);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateProgressBarParams { progress: number; label?: string; }
export async function createProgressBar(args: CreateProgressBarParams): Promise<ToolResult> {
  const frame = await createFrame("Progress", 200, 32, "transparent");
  frame.fills = [];
  frame.layoutMode = "VERTICAL";
  frame.itemSpacing = 8;
  
  if (args.label) {
    const labelFrame = figma.createFrame();
    labelFrame.name = "Label";
    labelFrame.layoutMode = "HORIZONTAL";
    labelFrame.primaryAxisAlignItems = "SPACE_BETWEEN";
    labelFrame.fills = [];
    labelFrame.resize(200, 16);
    
    const label = await createText(args.label, 12);
    labelFrame.appendChild(label);
    
    const percent = await createText(`${args.progress}%`, 12);
    labelFrame.appendChild(percent);
    
    frame.appendChild(labelFrame);
  }
  
  const track = await createFrame("Track", 200, 8, "#E5E7EB");
  track.cornerRadius = 4;
  
  const fill = await createFrame("Fill", 200 * (args.progress / 100), 8, "#2563EB");
  fill.cornerRadius = 4;
  track.appendChild(fill);
  
  frame.appendChild(track);
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// FEEDBACK PATTERNS

export interface CreateAlertParams { type: string; title: string; message?: string; }
export async function createAlert(args: CreateAlertParams): Promise<ToolResult> {
  const colors: Record<string, { bg: string; border: string; fg: string }> = {
    info: { bg: "#EFF6FF", border: "#3B82F6", fg: "#1E40AF" },
    success: { bg: "#F0FDF4", border: "#22C55E", fg: "#166534" },
    warning: { bg: "#FFFBEB", border: "#F59E0B", fg: "#92400E" },
    error: { bg: "#FEF2F2", border: "#EF4444", fg: "#991B1B" },
  };
  
  const { bg, border, fg } = colors[args.type] || colors.info;
  
  const frame = await createFrame(`Alert - ${args.type}`, 400, 80, bg);
  frame.cornerRadius = 8;
  frame.layoutMode = "VERTICAL";
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 16;
  frame.itemSpacing = 8;
  frame.strokes = [{ type: "SOLID", color: hexToRgb(border) }];
  frame.strokeWeight = 1;
  
  const title = await createText(args.title, 14, "Bold");
  title.fills = [{ type: "SOLID", color: hexToRgb(fg) }];
  frame.appendChild(title);
  
  if (args.message) {
    const message = await createText(args.message, 14);
    message.fills = [{ type: "SOLID", color: hexToRgb(fg) }];
    frame.appendChild(message);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateToastParams { message: string; type?: string; }
export async function createToast(args: CreateToastParams): Promise<ToolResult> {
  const colors: Record<string, string> = { success: "#22C55E", error: "#EF4444", warning: "#F59E0B", info: "#3B82F6" };
  const bg = colors[args.type || "info"] || "#3B82F6";
  
  const frame = await createFrame("Toast", 300, 48, "#1F2937");
  frame.cornerRadius = 8;
  frame.layoutMode = "HORIZONTAL";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = frame.paddingRight = 16;
  frame.itemSpacing = 12;
  frame.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.2 }, offset: { x: 0, y: 4 }, radius: 12, visible: true, blendMode: "NORMAL" }];
  
  const indicator = figma.createRectangle();
  indicator.resize(4, 32);
  indicator.cornerRadius = 2;
  indicator.fills = [{ type: "SOLID", color: hexToRgb(bg) }];
  frame.appendChild(indicator);
  
  const message = await createText(args.message, 14);
  message.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  frame.appendChild(message);
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateModalParams { title: string; content?: string; actions?: string[]; }
export async function createModal(args: CreateModalParams): Promise<ToolResult> {
  // Backdrop
  const backdrop = await createFrame("Modal Backdrop", 800, 600, "#00000080");
  backdrop.layoutMode = "VERTICAL";
  backdrop.primaryAxisAlignItems = "CENTER";
  backdrop.counterAxisAlignItems = "CENTER";
  
  // Modal
  const modal = await createFrame("Modal", 400, 250, "#FFFFFF");
  modal.cornerRadius = 12;
  modal.layoutMode = "VERTICAL";
  modal.itemSpacing = 0;
  modal.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.25 }, offset: { x: 0, y: 8 }, radius: 24, visible: true, blendMode: "NORMAL" }];
  
  // Header
  const header = await createFrame("Header", 400, 56, "transparent");
  header.fills = [];
  header.layoutMode = "HORIZONTAL";
  header.primaryAxisAlignItems = "SPACE_BETWEEN";
  header.counterAxisAlignItems = "CENTER";
  header.paddingLeft = header.paddingRight = 24;
  
  const title = await createText(args.title, 18, "Bold");
  header.appendChild(title);
  
  const close = await createText("×", 24);
  close.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }];
  header.appendChild(close);
  
  modal.appendChild(header);
  
  // Content
  const content = await createFrame("Content", 400, 120, "transparent");
  content.fills = [];
  content.layoutMode = "VERTICAL";
  content.paddingLeft = content.paddingRight = 24;
  content.layoutGrow = 1;
  
  if (args.content) {
    const contentText = await createText(args.content, 14);
    contentText.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
    content.appendChild(contentText);
  }
  
  modal.appendChild(content);
  
  // Footer
  const footer = await createFrame("Footer", 400, 72, "transparent");
  footer.fills = [];
  footer.layoutMode = "HORIZONTAL";
  footer.primaryAxisAlignItems = "MAX";
  footer.counterAxisAlignItems = "CENTER";
  footer.paddingLeft = footer.paddingRight = 24;
  footer.itemSpacing = 12;
  
  for (const action of (args.actions || ["Cancel", "Confirm"])) {
    const isPrimary = action === "Confirm" || action === "Save";
    const btn = await createFrame(action, 100, 40, isPrimary ? "#2563EB" : "#F3F4F6");
    btn.cornerRadius = 8;
    btn.layoutMode = "VERTICAL";
    btn.primaryAxisAlignItems = "CENTER";
    btn.counterAxisAlignItems = "CENTER";
    const btnText = await createText(action, 14, "Medium");
    btnText.fills = [{ type: "SOLID", color: isPrimary ? { r: 1, g: 1, b: 1 } : { r: 0.2, g: 0.2, b: 0.2 } }];
    btn.appendChild(btnText);
    footer.appendChild(btn);
  }
  
  modal.appendChild(footer);
  backdrop.appendChild(modal);
  
  figma.currentPage.appendChild(backdrop);
  return { isError: false, content: JSON.stringify({ id: backdrop.id, name: backdrop.name }) };
}

export interface CreateTooltipParams { text: string; position?: string; }
export async function createTooltip(args: CreateTooltipParams): Promise<ToolResult> {
  const frame = await createFrame("Tooltip", 150, 36, "#1F2937");
  frame.cornerRadius = 6;
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.15 }, offset: { x: 0, y: 2 }, radius: 8, visible: true, blendMode: "NORMAL" }];
  
  const text = await createText(args.text, 12);
  text.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  frame.appendChild(text);
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateSpinnerParams { size?: number; color?: string; }
export async function createSpinner(args: CreateSpinnerParams): Promise<ToolResult> {
  const size = args.size || 24;
  const frame = await createFrame("Spinner", size, size, "transparent");
  frame.fills = [];
  
  const arc = figma.createEllipse();
  arc.resize(size, size);
  arc.fills = [];
  arc.strokes = [{ type: "SOLID", color: hexToRgb(args.color || "#2563EB") }];
  arc.strokeWeight = 2;
  arc.arcData = { startingAngle: 0, endingAngle: 4.7, innerRadius: 0 };
  
  frame.appendChild(arc);
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateSkeletonParams { width?: number; height?: number; type?: string; }
export async function createSkeleton(args: CreateSkeletonParams): Promise<ToolResult> {
  const w = args.width || 200;
  const h = args.height || 20;
  const frame = await createFrame("Skeleton", w, h, "#E5E7EB");
  frame.cornerRadius = args.type === "circle" ? h / 2 : 4;
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateEmptyStateParams { title: string; description?: string; actionText?: string; }
export async function createEmptyState(args: CreateEmptyStateParams): Promise<ToolResult> {
  const frame = await createFrame("Empty State", 400, 300, "#FAFAFA");
  frame.cornerRadius = 12;
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.itemSpacing = 16;
  frame.paddingTop = frame.paddingBottom = 48;
  
  const icon = await createFrame("Icon", 64, 64, "#E5E7EB");
  icon.cornerRadius = 32;
  frame.appendChild(icon);
  
  const title = await createText(args.title, 18, "Bold");
  frame.appendChild(title);
  
  if (args.description) {
    const desc = await createText(args.description, 14);
    desc.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }];
    desc.textAlignHorizontal = "CENTER";
    frame.appendChild(desc);
  }
  
  if (args.actionText) {
    const action = await createFrame("Action", 120, 40, "#2563EB");
    action.cornerRadius = 8;
    action.layoutMode = "VERTICAL";
    action.primaryAxisAlignItems = "CENTER";
    action.counterAxisAlignItems = "CENTER";
    const actionText = await createText(args.actionText, 14, "Medium");
    actionText.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    action.appendChild(actionText);
    frame.appendChild(action);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// Additional UI pattern stubs
export interface CreateDropdownParams { label: string; options: string[]; }
export async function createDropdown(args: CreateDropdownParams): Promise<ToolResult> {
  const frame = await createFrame(`Dropdown - ${args.label}`, 200, 44, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateSearchBarParams { placeholder?: string; }
export async function createSearchBar(args: CreateSearchBarParams): Promise<ToolResult> {
  const frame = await createFrame("Search Bar", 300, 44, "#F3F4F6");
  frame.cornerRadius = 8;
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateDatePickerParams { label?: string; }
export async function createDatePicker(args: CreateDatePickerParams): Promise<ToolResult> {
  const frame = await createFrame("Date Picker", 280, 300, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateSliderParams { min?: number; max?: number; value?: number; }
export async function createSlider(args: CreateSliderParams): Promise<ToolResult> {
  const frame = await createFrame("Slider", 200, 24, "transparent");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateFooterParams { links?: string[][]; copyright?: string; }
export async function createFooter(args: CreateFooterParams): Promise<ToolResult> {
  const frame = await createFrame("Footer", 1200, 200, "#1F2937");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateAccordionParams { items: Array<{ title: string; content?: string }>; }
export async function createAccordion(args: CreateAccordionParams): Promise<ToolResult> {
  const frame = await createFrame("Accordion", 400, 60 * args.items.length, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateCarouselParams { itemCount?: number; }
export async function createCarousel(args: CreateCarouselParams): Promise<ToolResult> {
  const frame = await createFrame("Carousel", 600, 300, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateMasonryGridParams { items?: number; columns?: number; }
export async function createMasonryGrid(args: CreateMasonryGridParams): Promise<ToolResult> {
  const frame = await createFrame("Masonry Grid", 800, 600, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateTimelineParams { events: Array<{ title: string; date?: string }>; }
export async function createTimelineUI(args: CreateTimelineParams): Promise<ToolResult> {
  const frame = await createFrame("Timeline", 400, 100 * args.events.length, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateRatingParams { value?: number; max?: number; }
export async function createRating(args: CreateRatingParams): Promise<ToolResult> {
  const frame = await createFrame("Rating", 120, 24, "transparent");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateTagInputParams { tags?: string[]; }
export async function createTagInput(args: CreateTagInputParams): Promise<ToolResult> {
  const frame = await createFrame("Tag Input", 300, 44, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateFileUploadParams { label?: string; }
export async function createFileUpload(args: CreateFileUploadParams): Promise<ToolResult> {
  const frame = await createFrame("File Upload", 300, 150, "#F9FAFB");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateAvatarGroupParams { count?: number; max?: number; }
export async function createAvatarGroup(args: CreateAvatarGroupParams): Promise<ToolResult> {
  const frame = await createFrame("Avatar Group", 150, 40, "transparent");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateStatsCardParams { label: string; value: string; change?: string; }
export async function createStatsCard(args: CreateStatsCardParams): Promise<ToolResult> {
  const frame = await createFrame(`Stats - ${args.label}`, 200, 120, "#FFFFFF");
  frame.cornerRadius = 12;
  frame.layoutMode = "VERTICAL";
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 20;
  frame.itemSpacing = 8;
  frame.strokes = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
  frame.strokeWeight = 1;
  
  const label = await createText(args.label, 12);
  label.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }];
  frame.appendChild(label);
  
  const value = await createText(args.value, 28, "Bold");
  frame.appendChild(value);
  
  if (args.change) {
    const change = await createText(args.change, 12, "Medium");
    const isPositive = args.change.startsWith("+");
    change.fills = [{ type: "SOLID", color: isPositive ? hexToRgb("#22C55E") : hexToRgb("#EF4444") }];
    frame.appendChild(change);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateChartPlaceholderParams { type: string; width?: number; height?: number; }
export async function createChartPlaceholder(args: CreateChartPlaceholderParams): Promise<ToolResult> {
  const frame = await createFrame(`Chart - ${args.type}`, args.width || 400, args.height || 300, "#F9FAFB");
  frame.cornerRadius = 8;
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  
  const label = await createText(`${args.type} Chart`, 14);
  label.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }];
  frame.appendChild(label);
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateNotificationBadgeParams { count: number; }
export async function createNotificationBadge(args: CreateNotificationBadgeParams): Promise<ToolResult> {
  const frame = await createFrame("Notification Badge", 20, 20, "#EF4444");
  frame.cornerRadius = 10;
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  
  const count = await createText(args.count > 99 ? "99+" : String(args.count), 10, "Bold");
  count.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  frame.appendChild(count);
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateDividerParams { orientation?: string; label?: string; }
export async function createDivider(args: CreateDividerParams): Promise<ToolResult> {
  const isVertical = args.orientation === "vertical";
  const frame = await createFrame("Divider", isVertical ? 1 : 200, isVertical ? 100 : 1, "#E5E7EB");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateCalendarParams { month?: number; year?: number; }
export async function createCalendar(args: CreateCalendarParams): Promise<ToolResult> {
  const frame = await createFrame("Calendar", 280, 320, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateColorPickerParams { color?: string; }
export async function createColorPicker(args: CreateColorPickerParams): Promise<ToolResult> {
  const frame = await createFrame("Color Picker", 220, 260, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateTreeViewParams { items: Array<{ name: string; children?: string[] }>; }
export async function createTreeView(args: CreateTreeViewParams): Promise<ToolResult> {
  const frame = await createFrame("Tree View", 250, 300, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateMenuParams { items: Array<{ label: string; icon?: string }>; }
export async function createMenu(args: CreateMenuParams): Promise<ToolResult> {
  const frame = await createFrame("Menu", 200, 44 * args.items.length, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateTextareaParams { label?: string; placeholder?: string; rows?: number; }
export async function createTextarea(args: CreateTextareaParams): Promise<ToolResult> {
  const frame = await createFrame("Textarea", 320, 120, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateBottomSheetParams { title?: string; }
export async function createBottomSheet(args: CreateBottomSheetParams): Promise<ToolResult> {
  const frame = await createFrame("Bottom Sheet", 375, 400, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateDrawerParams { position?: string; }
export async function createDrawer(args: CreateDrawerParams): Promise<ToolResult> {
  const frame = await createFrame("Drawer", 320, 600, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateTabBarParams { items: Array<{ label: string; icon?: string }>; }
export async function createTabBar(args: CreateTabBarParams): Promise<ToolResult> {
  const frame = await createFrame("Tab Bar", 375, 56, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreatePopoverParams { content?: string; }
export async function createPopover(args: CreatePopoverParams): Promise<ToolResult> {
  const frame = await createFrame("Popover", 250, 150, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateSegmentedControlParams { options: string[]; selected?: number; }
export async function createSegmentedControl(args: CreateSegmentedControlParams): Promise<ToolResult> {
  const frame = await createFrame("Segmented Control", 300, 40, "#E5E7EB");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateChipParams { label: string; removable?: boolean; }
export async function createChip(args: CreateChipParams): Promise<ToolResult> {
  const frame = await createFrame(`Chip - ${args.label}`, 100, 32, "#E5E7EB");
  frame.cornerRadius = 16;
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateFloatingActionButtonParams { icon?: string; }
export async function createFloatingActionButton(args: CreateFloatingActionButtonParams): Promise<ToolResult> {
  const frame = await createFrame("FAB", 56, 56, "#2563EB");
  frame.cornerRadius = 28;
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateSnackbarParams { message: string; action?: string; }
export async function createSnackbar(args: CreateSnackbarParams): Promise<ToolResult> {
  const frame = await createFrame("Snackbar", 350, 48, "#323232");
  frame.cornerRadius = 4;
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateBannerParams { message: string; type?: string; }
export async function createBanner(args: CreateBannerParams): Promise<ToolResult> {
  const frame = await createFrame("Banner", 1200, 48, "#3B82F6");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateImageGalleryParams { columns?: number; images?: number; }
export async function createImageGallery(args: CreateImageGalleryParams): Promise<ToolResult> {
  const frame = await createFrame("Image Gallery", 800, 600, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateLoginFormParams { title?: string; providers?: string[]; }
export async function createLoginForm(args: CreateLoginFormParams): Promise<ToolResult> {
  const frame = await createFrame("Login Form", 400, 450, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateSignupFormParams { title?: string; fields?: string[]; }
export async function createSignupForm(args: CreateSignupFormParams): Promise<ToolResult> {
  const frame = await createFrame("Signup Form", 400, 500, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateProfileCardParams { name: string; role?: string; bio?: string; }
export async function createProfileCard(args: CreateProfileCardParams): Promise<ToolResult> {
  const frame = await createFrame(`Profile - ${args.name}`, 300, 350, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateCTASectionParams { headline: string; description?: string; buttonText?: string; }
export async function createCTASection(args: CreateCTASectionParams): Promise<ToolResult> {
  const frame = await createFrame("CTA Section", 1200, 300, "#2563EB");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateFAQSectionParams { questions: Array<{ q: string; a?: string }>; }
export async function createFAQSection(args: CreateFAQSectionParams): Promise<ToolResult> {
  const frame = await createFrame("FAQ Section", 800, 80 * args.questions.length, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateTeamSectionParams { members: Array<{ name: string; role?: string }>; }
export async function createTeamSection(args: CreateTeamSectionParams): Promise<ToolResult> {
  const frame = await createFrame("Team Section", 1200, 400, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateContactFormParams { fields?: string[]; }
export async function createContactForm(args: CreateContactFormParams): Promise<ToolResult> {
  const frame = await createFrame("Contact Form", 400, 400, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateNewsletterSignupParams { title?: string; }
export async function createNewsletterSignup(args: CreateNewsletterSignupParams): Promise<ToolResult> {
  const frame = await createFrame("Newsletter Signup", 600, 200, "#F9FAFB");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateSocialLinksParams { platforms?: string[]; }
export async function createSocialLinks(args: CreateSocialLinksParams): Promise<ToolResult> {
  const frame = await createFrame("Social Links", 200, 40, "transparent");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateCookieBannerParams { message?: string; }
export async function createCookieBanner(args: CreateCookieBannerParams): Promise<ToolResult> {
  const frame = await createFrame("Cookie Banner", 1200, 80, "#1F2937");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateOnboardingScreenParams { title: string; description?: string; step?: number; totalSteps?: number; }
export async function createOnboardingScreen(args: CreateOnboardingScreenParams): Promise<ToolResult> {
  const frame = await createFrame(`Onboarding ${args.step || 1}`, 375, 667, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateAppShellParams { hasSidebar?: boolean; hasHeader?: boolean; }
export async function createAppShell(args: CreateAppShellParams): Promise<ToolResult> {
  const frame = await createFrame("App Shell", 1440, 900, "#F3F4F6");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateDashboardLayoutParams { widgets?: number; }
export async function createDashboardLayout(args: CreateDashboardLayoutParams): Promise<ToolResult> {
  const frame = await createFrame("Dashboard Layout", 1440, 900, "#F9FAFB");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateLandingPageParams { sections?: string[]; }
export async function createLandingPage(args: CreateLandingPageParams): Promise<ToolResult> {
  const frame = await createFrame("Landing Page", 1440, 3000, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateBlogLayoutParams { type?: string; }
export async function createBlogLayout(args: CreateBlogLayoutParams): Promise<ToolResult> {
  const frame = await createFrame("Blog Layout", 1200, 1500, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateEcommerceLayoutParams { type?: string; }
export async function createEcommerceLayout(args: CreateEcommerceLayoutParams): Promise<ToolResult> {
  const frame = await createFrame("Ecommerce Layout", 1440, 1200, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateSettingsPageParams { sections?: string[]; }
export async function createSettingsPage(args: CreateSettingsPageParams): Promise<ToolResult> {
  const frame = await createFrame("Settings Page", 1200, 800, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateAuthLayoutParams { type?: string; }
export async function createAuthLayout(args: CreateAuthLayoutParams): Promise<ToolResult> {
  const frame = await createFrame("Auth Layout", 1440, 900, "#F9FAFB");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateAdminLayoutParams { }
export async function createAdminLayout(args: CreateAdminLayoutParams): Promise<ToolResult> {
  const frame = await createFrame("Admin Layout", 1440, 900, "#F3F4F6");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}
