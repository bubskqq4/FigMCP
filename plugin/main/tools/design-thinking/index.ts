import { ToolResult } from "../tool-result";

// Helper to create a frame with consistent styling
async function createStyledFrame(name: string, width: number, height: number, fill: string = "#FFFFFF"): Promise<FrameNode> {
  const frame = figma.createFrame();
  frame.name = name;
  frame.resize(width, height);
  frame.fills = [{ type: "SOLID", color: hexToRgb(fill) }];
  return frame;
}

function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  } : { r: 1, g: 1, b: 1 };
}

async function createTextNode(content: string, fontSize: number = 14, fontWeight: string = "Regular"): Promise<TextNode> {
  const text = figma.createText();
  await figma.loadFontAsync({ family: "Inter", style: fontWeight });
  text.fontName = { family: "Inter", style: fontWeight };
  text.fontSize = fontSize;
  text.characters = content;
  return text;
}

// Persona creation
export interface CreatePersonaParams { name: string; role: string; demographics?: any; goals?: string[]; painPoints?: string[]; behaviors?: string[]; }
export async function createPersona(args: CreatePersonaParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Persona - ${args.name}`, 400, 500, "#F8F9FA");
  frame.cornerRadius = 12;
  frame.layoutMode = "VERTICAL";
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 24;
  frame.itemSpacing = 16;
  
  const title = await createTextNode(args.name, 24, "Bold");
  const role = await createTextNode(args.role, 14, "Regular");
  role.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
  
  frame.appendChild(title);
  frame.appendChild(role);
  
  if (args.goals?.length) {
    const goalsTitle = await createTextNode("Goals", 16, "Bold");
    frame.appendChild(goalsTitle);
    for (const goal of args.goals) {
      const goalText = await createTextNode(`• ${goal}`, 12);
      frame.appendChild(goalText);
    }
  }
  
  if (args.painPoints?.length) {
    const painTitle = await createTextNode("Pain Points", 16, "Bold");
    frame.appendChild(painTitle);
    for (const pain of args.painPoints) {
      const painText = await createTextNode(`• ${pain}`, 12);
      painText.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.2, b: 0.2 } }];
      frame.appendChild(painText);
    }
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// Journey Map
export interface CreateJourneyMapParams { title: string; stages: Array<{ name: string; actions?: string[]; thoughts?: string[]; emotions?: string }>; }
export async function createJourneyMap(args: CreateJourneyMapParams): Promise<ToolResult> {
  const stageWidth = 200;
  const frame = await createStyledFrame(`Journey Map - ${args.title}`, stageWidth * args.stages.length + 48, 400, "#FFFFFF");
  frame.layoutMode = "HORIZONTAL";
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 24;
  frame.itemSpacing = 0;
  
  for (const stage of args.stages) {
    const stageFrame = await createStyledFrame(stage.name, stageWidth, 352, "#F8F9FA");
    stageFrame.layoutMode = "VERTICAL";
    stageFrame.paddingTop = stageFrame.paddingBottom = stageFrame.paddingLeft = stageFrame.paddingRight = 16;
    stageFrame.itemSpacing = 12;
    
    const stageTitle = await createTextNode(stage.name, 16, "Bold");
    stageFrame.appendChild(stageTitle);
    
    if (stage.actions?.length) {
      for (const action of stage.actions) {
        const actionText = await createTextNode(action, 11);
        stageFrame.appendChild(actionText);
      }
    }
    
    frame.appendChild(stageFrame);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// Empathy Map
export interface CreateEmpathyMapParams { persona: string; says?: string[]; thinks?: string[]; does?: string[]; feels?: string[]; }
export async function createEmpathyMap(args: CreateEmpathyMapParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Empathy Map - ${args.persona}`, 600, 600, "#FFFFFF");
  frame.layoutMode = "VERTICAL";
  frame.layoutWrap = "WRAP";
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 24;
  
  const title = await createTextNode(`Empathy Map: ${args.persona}`, 20, "Bold");
  frame.appendChild(title);
  
  // Create 4 quadrants
  const quadrants = [
    { title: "Says", items: args.says || [], color: "#E3F2FD" },
    { title: "Thinks", items: args.thinks || [], color: "#FFF3E0" },
    { title: "Does", items: args.does || [], color: "#E8F5E9" },
    { title: "Feels", items: args.feels || [], color: "#FCE4EC" },
  ];
  
  const gridFrame = figma.createFrame();
  gridFrame.name = "Grid";
  gridFrame.resize(552, 500);
  gridFrame.layoutMode = "HORIZONTAL";
  gridFrame.layoutWrap = "WRAP";
  gridFrame.itemSpacing = 12;
  gridFrame.fills = [];
  
  for (const q of quadrants) {
    const qFrame = await createStyledFrame(q.title, 268, 240, q.color);
    qFrame.layoutMode = "VERTICAL";
    qFrame.paddingTop = qFrame.paddingBottom = qFrame.paddingLeft = qFrame.paddingRight = 16;
    qFrame.itemSpacing = 8;
    qFrame.cornerRadius = 8;
    
    const qTitle = await createTextNode(q.title, 14, "Bold");
    qFrame.appendChild(qTitle);
    
    for (const item of q.items.slice(0, 4)) {
      const itemText = await createTextNode(`• ${item}`, 11);
      qFrame.appendChild(itemText);
    }
    
    gridFrame.appendChild(qFrame);
  }
  
  frame.appendChild(gridFrame);
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// User Story
export interface CreateUserStoryParams { role: string; want: string; reason: string; acceptanceCriteria?: string[]; priority?: string; }
export async function createUserStory(args: CreateUserStoryParams): Promise<ToolResult> {
  const frame = await createStyledFrame("User Story", 320, 200, "#FFF8E1");
  frame.cornerRadius = 8;
  frame.layoutMode = "VERTICAL";
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 20;
  frame.itemSpacing = 12;
  
  const story = await createTextNode(`As a ${args.role}, I want ${args.want}, so that ${args.reason}`, 14);
  story.textAutoResize = "HEIGHT";
  story.resize(280, story.height);
  frame.appendChild(story);
  
  if (args.acceptanceCriteria?.length) {
    const acTitle = await createTextNode("Acceptance Criteria:", 12, "Bold");
    frame.appendChild(acTitle);
    for (const ac of args.acceptanceCriteria.slice(0, 3)) {
      const acText = await createTextNode(`✓ ${ac}`, 11);
      frame.appendChild(acText);
    }
  }
  
  if (args.priority) {
    const priority = await createTextNode(`Priority: ${args.priority}`, 10, "Bold");
    priority.fills = [{ type: "SOLID", color: args.priority === "High" ? { r: 0.8, g: 0.2, b: 0.2 } : { r: 0.4, g: 0.4, b: 0.4 } }];
    frame.appendChild(priority);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// Wireframe
export interface CreateWireframeParams { type: string; width?: number; height?: number; sections?: string[]; }
export async function createWireframe(args: CreateWireframeParams): Promise<ToolResult> {
  const width = args.width || 375;
  const height = args.height || 812;
  const frame = await createStyledFrame(`Wireframe - ${args.type}`, width, height, "#FAFAFA");
  frame.cornerRadius = 8;
  frame.layoutMode = "VERTICAL";
  frame.itemSpacing = 0;
  frame.strokes = [{ type: "SOLID", color: { r: 0.8, g: 0.8, b: 0.8 } }];
  frame.strokeWeight = 1;
  
  // Add header
  const header = await createStyledFrame("Header", width, 60, "#E0E0E0");
  header.layoutMode = "HORIZONTAL";
  header.counterAxisAlignItems = "CENTER";
  header.paddingLeft = header.paddingRight = 16;
  const headerText = await createTextNode("Header", 14, "Bold");
  header.appendChild(headerText);
  frame.appendChild(header);
  
  // Add content sections
  const sections = args.sections || ["Content Area"];
  for (const section of sections) {
    const sectionFrame = await createStyledFrame(section, width, 120, "#F5F5F5");
    sectionFrame.layoutMode = "VERTICAL";
    sectionFrame.counterAxisAlignItems = "CENTER";
    sectionFrame.primaryAxisAlignItems = "CENTER";
    const sectionText = await createTextNode(section, 12);
    sectionText.fills = [{ type: "SOLID", color: { r: 0.6, g: 0.6, b: 0.6 } }];
    sectionFrame.appendChild(sectionText);
    frame.appendChild(sectionFrame);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// Sitemap
export interface CreateSitemapParams { title: string; pages: Array<{ name: string; children?: string[] }>; }
export async function createSitemap(args: CreateSitemapParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Sitemap - ${args.title}`, 800, 600, "#FFFFFF");
  frame.layoutMode = "VERTICAL";
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 32;
  frame.itemSpacing = 24;
  
  const title = await createTextNode(args.title, 24, "Bold");
  frame.appendChild(title);
  
  const pagesFrame = figma.createFrame();
  pagesFrame.name = "Pages";
  pagesFrame.layoutMode = "HORIZONTAL";
  pagesFrame.itemSpacing = 24;
  pagesFrame.fills = [];
  
  for (const page of args.pages) {
    const pageFrame = await createStyledFrame(page.name, 150, 100, "#E3F2FD");
    pageFrame.cornerRadius = 8;
    pageFrame.layoutMode = "VERTICAL";
    pageFrame.primaryAxisAlignItems = "CENTER";
    pageFrame.counterAxisAlignItems = "CENTER";
    
    const pageText = await createTextNode(page.name, 14, "Bold");
    pageFrame.appendChild(pageText);
    
    if (page.children?.length) {
      const childCount = await createTextNode(`${page.children.length} subpages`, 10);
      childCount.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
      pageFrame.appendChild(childCount);
    }
    
    pagesFrame.appendChild(pageFrame);
  }
  
  frame.appendChild(pagesFrame);
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// Flow Diagram
export interface CreateFlowDiagramParams { title: string; steps: Array<{ name: string; type?: string }>; }
export async function createFlowDiagram(args: CreateFlowDiagramParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Flow - ${args.title}`, 120 * args.steps.length + 100, 200, "#FFFFFF");
  frame.layoutMode = "HORIZONTAL";
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 32;
  frame.itemSpacing = 24;
  frame.counterAxisAlignItems = "CENTER";
  
  for (let i = 0; i < args.steps.length; i++) {
    const step = args.steps[i];
    const color = step.type === "decision" ? "#FFF3E0" : step.type === "end" ? "#FFEBEE" : "#E3F2FD";
    
    const stepFrame = await createStyledFrame(step.name, 100, 60, color);
    stepFrame.cornerRadius = step.type === "decision" ? 0 : 8;
    if (step.type === "decision") stepFrame.rotation = 45;
    stepFrame.layoutMode = "VERTICAL";
    stepFrame.primaryAxisAlignItems = "CENTER";
    stepFrame.counterAxisAlignItems = "CENTER";
    
    const stepText = await createTextNode(step.name, 12, "Bold");
    stepFrame.appendChild(stepText);
    
    frame.appendChild(stepFrame);
    
    // Add arrow if not last
    if (i < args.steps.length - 1) {
      const arrow = await createTextNode("→", 20);
      frame.appendChild(arrow);
    }
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// Affinity Diagram
export interface CreateAffinityDiagramParams { title: string; groups: Array<{ name: string; items: string[] }>; }
export async function createAffinityDiagram(args: CreateAffinityDiagramParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Affinity - ${args.title}`, 200 * args.groups.length + 48, 400, "#FAFAFA");
  frame.layoutMode = "HORIZONTAL";
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 24;
  frame.itemSpacing = 16;
  
  const colors = ["#E3F2FD", "#FFF3E0", "#E8F5E9", "#FCE4EC", "#F3E5F5", "#FFFDE7"];
  
  for (let i = 0; i < args.groups.length; i++) {
    const group = args.groups[i];
    const groupFrame = await createStyledFrame(group.name, 180, 352, colors[i % colors.length]);
    groupFrame.cornerRadius = 12;
    groupFrame.layoutMode = "VERTICAL";
    groupFrame.paddingTop = groupFrame.paddingBottom = groupFrame.paddingLeft = groupFrame.paddingRight = 16;
    groupFrame.itemSpacing = 8;
    
    const groupTitle = await createTextNode(group.name, 14, "Bold");
    groupFrame.appendChild(groupTitle);
    
    for (const item of group.items.slice(0, 6)) {
      const itemFrame = await createStyledFrame(item, 148, 40, "#FFFFFF");
      itemFrame.cornerRadius = 4;
      itemFrame.layoutMode = "VERTICAL";
      itemFrame.paddingLeft = itemFrame.paddingRight = 8;
      itemFrame.primaryAxisAlignItems = "CENTER";
      
      const itemText = await createTextNode(item, 10);
      itemFrame.appendChild(itemText);
      groupFrame.appendChild(itemFrame);
    }
    
    frame.appendChild(groupFrame);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// Mood Board
export interface CreateMoodBoardParams { title: string; colors?: string[]; keywords?: string[]; }
export async function createMoodBoard(args: CreateMoodBoardParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Mood Board - ${args.title}`, 600, 400, "#FFFFFF");
  frame.layoutMode = "VERTICAL";
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 24;
  frame.itemSpacing = 20;
  
  const title = await createTextNode(args.title, 24, "Bold");
  frame.appendChild(title);
  
  if (args.colors?.length) {
    const colorsFrame = figma.createFrame();
    colorsFrame.name = "Colors";
    colorsFrame.layoutMode = "HORIZONTAL";
    colorsFrame.itemSpacing = 8;
    colorsFrame.fills = [];
    
    for (const color of args.colors.slice(0, 6)) {
      const swatch = figma.createRectangle();
      swatch.resize(60, 60);
      swatch.cornerRadius = 8;
      swatch.fills = [{ type: "SOLID", color: hexToRgb(color) }];
      colorsFrame.appendChild(swatch);
    }
    
    frame.appendChild(colorsFrame);
  }
  
  if (args.keywords?.length) {
    const keywordsFrame = figma.createFrame();
    keywordsFrame.name = "Keywords";
    keywordsFrame.layoutMode = "HORIZONTAL";
    keywordsFrame.layoutWrap = "WRAP";
    keywordsFrame.itemSpacing = 8;
    keywordsFrame.fills = [];
    
    for (const keyword of args.keywords.slice(0, 10)) {
      const tag = await createStyledFrame(keyword, 80, 32, "#F0F0F0");
      tag.cornerRadius = 16;
      tag.layoutMode = "VERTICAL";
      tag.primaryAxisAlignItems = "CENTER";
      tag.counterAxisAlignItems = "CENTER";
      const tagText = await createTextNode(keyword, 11);
      tag.appendChild(tagText);
      keywordsFrame.appendChild(tag);
    }
    
    frame.appendChild(keywordsFrame);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// Style Tile
export interface CreateStyleTileParams { projectName: string; colors?: string[]; fonts?: string[]; }
export async function createStyleTile(args: CreateStyleTileParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Style Tile - ${args.projectName}`, 800, 600, "#FFFFFF");
  frame.layoutMode = "VERTICAL";
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 32;
  frame.itemSpacing = 32;
  
  const title = await createTextNode(args.projectName, 32, "Bold");
  frame.appendChild(title);
  
  // Color palette section
  if (args.colors?.length) {
    const colorSection = figma.createFrame();
    colorSection.name = "Color Palette";
    colorSection.layoutMode = "VERTICAL";
    colorSection.itemSpacing = 12;
    colorSection.fills = [];
    
    const colorTitle = await createTextNode("Color Palette", 16, "Bold");
    colorSection.appendChild(colorTitle);
    
    const swatches = figma.createFrame();
    swatches.name = "Swatches";
    swatches.layoutMode = "HORIZONTAL";
    swatches.itemSpacing = 16;
    swatches.fills = [];
    
    for (const color of args.colors) {
      const swatch = figma.createRectangle();
      swatch.resize(80, 80);
      swatch.cornerRadius = 8;
      swatch.fills = [{ type: "SOLID", color: hexToRgb(color) }];
      swatches.appendChild(swatch);
    }
    
    colorSection.appendChild(swatches);
    frame.appendChild(colorSection);
  }
  
  // Typography section
  const typographySection = figma.createFrame();
  typographySection.name = "Typography";
  typographySection.layoutMode = "VERTICAL";
  typographySection.itemSpacing = 12;
  typographySection.fills = [];
  
  const typoTitle = await createTextNode("Typography", 16, "Bold");
  typographySection.appendChild(typoTitle);
  
  const heading = await createTextNode("Heading Style", 24, "Bold");
  typographySection.appendChild(heading);
  const body = await createTextNode("Body text style - The quick brown fox jumps over the lazy dog.", 14);
  typographySection.appendChild(body);
  
  frame.appendChild(typographySection);
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// Storyboard
export interface CreateStoryboardParams { title: string; scenes: Array<{ title: string; description?: string }>; }
export async function createStoryboard(args: CreateStoryboardParams): Promise<ToolResult> {
  const sceneWidth = 200;
  const frame = await createStyledFrame(`Storyboard - ${args.title}`, sceneWidth * Math.min(args.scenes.length, 4) + 48, 300, "#FFFFFF");
  frame.layoutMode = "HORIZONTAL";
  frame.layoutWrap = "WRAP";
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 24;
  frame.itemSpacing = 16;
  
  for (let i = 0; i < args.scenes.length; i++) {
    const scene = args.scenes[i];
    const sceneFrame = await createStyledFrame(`Scene ${i + 1}`, sceneWidth - 16, 240, "#F5F5F5");
    sceneFrame.cornerRadius = 8;
    sceneFrame.layoutMode = "VERTICAL";
    sceneFrame.paddingTop = sceneFrame.paddingBottom = sceneFrame.paddingLeft = sceneFrame.paddingRight = 12;
    sceneFrame.itemSpacing = 8;
    
    const sceneNum = await createTextNode(`Scene ${i + 1}`, 10);
    sceneNum.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }];
    sceneFrame.appendChild(sceneNum);
    
    const sceneTitle = await createTextNode(scene.title, 14, "Bold");
    sceneFrame.appendChild(sceneTitle);
    
    if (scene.description) {
      const desc = await createTextNode(scene.description, 11);
      desc.textAutoResize = "HEIGHT";
      sceneFrame.appendChild(desc);
    }
    
    frame.appendChild(sceneFrame);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// Competitive Analysis
export interface CreateCompetitiveAnalysisParams { title: string; competitors: Array<{ name: string; strengths?: string[]; weaknesses?: string[] }>; }
export async function createCompetitiveAnalysis(args: CreateCompetitiveAnalysisParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Competitive Analysis - ${args.title}`, 250 * args.competitors.length + 48, 400, "#FFFFFF");
  frame.layoutMode = "HORIZONTAL";
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 24;
  frame.itemSpacing = 16;
  
  for (const competitor of args.competitors) {
    const compFrame = await createStyledFrame(competitor.name, 230, 352, "#FAFAFA");
    compFrame.cornerRadius = 12;
    compFrame.layoutMode = "VERTICAL";
    compFrame.paddingTop = compFrame.paddingBottom = compFrame.paddingLeft = compFrame.paddingRight = 16;
    compFrame.itemSpacing = 12;
    
    const name = await createTextNode(competitor.name, 16, "Bold");
    compFrame.appendChild(name);
    
    if (competitor.strengths?.length) {
      const strengthsTitle = await createTextNode("Strengths", 12, "Bold");
      strengthsTitle.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.6, b: 0.2 } }];
      compFrame.appendChild(strengthsTitle);
      for (const s of competitor.strengths.slice(0, 3)) {
        const sText = await createTextNode(`+ ${s}`, 10);
        compFrame.appendChild(sText);
      }
    }
    
    if (competitor.weaknesses?.length) {
      const weakTitle = await createTextNode("Weaknesses", 12, "Bold");
      weakTitle.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.2, b: 0.2 } }];
      compFrame.appendChild(weakTitle);
      for (const w of competitor.weaknesses.slice(0, 3)) {
        const wText = await createTextNode(`- ${w}`, 10);
        compFrame.appendChild(wText);
      }
    }
    
    frame.appendChild(compFrame);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// Export placeholder functions for remaining design thinking tools
export interface CreateValuePropositionParams { product: string; customerSegment: string; benefits?: string[]; }
export async function createValueProposition(args: CreateValuePropositionParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Value Proposition - ${args.product}`, 500, 300, "#E8F5E9");
  frame.cornerRadius = 12;
  frame.layoutMode = "VERTICAL";
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 24;
  frame.itemSpacing = 16;
  
  const title = await createTextNode("Value Proposition", 20, "Bold");
  frame.appendChild(title);
  
  const forText = await createTextNode(`For: ${args.customerSegment}`, 14);
  frame.appendChild(forText);
  
  const productText = await createTextNode(`${args.product} provides:`, 14, "Bold");
  frame.appendChild(productText);
  
  if (args.benefits?.length) {
    for (const benefit of args.benefits.slice(0, 4)) {
      const b = await createTextNode(`✓ ${benefit}`, 12);
      frame.appendChild(b);
    }
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

// Additional stubs for remaining tools
export interface CreateFeaturePrioritizationParams { title: string; features: Array<{ name: string; impact?: number; effort?: number }>; }
export async function createFeaturePrioritization(args: CreateFeaturePrioritizationParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Feature Prioritization - ${args.title}`, 600, 400, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateUsabilityTestPlanParams { title: string; objectives?: string[]; tasks?: string[]; }
export async function createUsabilityTestPlan(args: CreateUsabilityTestPlanParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Usability Test - ${args.title}`, 500, 400, "#FFF3E0");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateDesignSprintParams { title: string; days?: Array<{ name: string; activities?: string[] }>; }
export async function createDesignSprint(args: CreateDesignSprintParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Design Sprint - ${args.title}`, 800, 300, "#E3F2FD");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateHowMightWeParams { statements: string[]; }
export async function createHowMightWe(args: CreateHowMightWeParams): Promise<ToolResult> {
  const frame = await createStyledFrame("How Might We", 400, 300, "#FCE4EC");
  frame.layoutMode = "VERTICAL";
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 24;
  frame.itemSpacing = 12;
  
  const title = await createTextNode("How Might We...", 18, "Bold");
  frame.appendChild(title);
  
  for (const stmt of args.statements.slice(0, 5)) {
    const s = await createTextNode(`• ${stmt}`, 14);
    frame.appendChild(s);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateCrazyEightsParams { topic: string; ideas?: string[]; }
export async function createCrazyEights(args: CreateCrazyEightsParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Crazy 8s - ${args.topic}`, 400, 400, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateStakeholderMapParams { title: string; stakeholders?: Array<{ name: string; influence?: string; interest?: string }>; }
export async function createStakeholderMap(args: CreateStakeholderMapParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Stakeholder Map - ${args.title}`, 500, 500, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateServiceBlueprintParams { title: string; stages?: Array<{ name: string }>; }
export async function createServiceBlueprint(args: CreateServiceBlueprintParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Service Blueprint - ${args.title}`, 800, 500, "#F3E5F5");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateJobsToBeDoneParams { job: string; outcomes?: string[]; }
export async function createJobsToBeDone(args: CreateJobsToBeDoneParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`JTBD - ${args.job}`, 400, 300, "#E8EAF6");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateTaskAnalysisParams { task: string; steps?: string[]; }
export async function createTaskAnalysis(args: CreateTaskAnalysisParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Task Analysis - ${args.task}`, 600, 300, "#E0F7FA");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateFiveWhysParams { problem: string; whys?: string[]; }
export async function createFiveWhys(args: CreateFiveWhysParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`5 Whys - ${args.problem}`, 400, 400, "#FFEBEE");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateAssumptionMappingParams { title: string; assumptions?: Array<{ text: string; certainty?: string }>; }
export async function createAssumptionMapping(args: CreateAssumptionMappingParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Assumptions - ${args.title}`, 600, 400, "#FFF8E1");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateInterviewGuideParams { title: string; questions?: string[]; }
export async function createInterviewGuide(args: CreateInterviewGuideParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Interview Guide - ${args.title}`, 400, 500, "#F1F8E9");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateSurveyParams { title: string; questions?: string[]; }
export async function createSurvey(args: CreateSurveyParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Survey - ${args.title}`, 400, 500, "#E0F2F1");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateCardSortResultsParams { title: string; categories?: Array<{ name: string; cards?: string[] }>; }
export async function createCardSortResults(args: CreateCardSortResultsParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Card Sort - ${args.title}`, 600, 400, "#FBE9E7");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateTreeTestResultsParams { title: string; tasks?: string[]; }
export async function createTreeTestResults(args: CreateTreeTestResultsParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Tree Test - ${args.title}`, 600, 400, "#E8F5E9");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateA11yAnnotationsParams { nodeId: string; annotations?: string[]; }
export async function createA11yAnnotations(args: CreateA11yAnnotationsParams): Promise<ToolResult> {
  const frame = await createStyledFrame("A11y Annotations", 300, 200, "#E3F2FD");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateDesignTokensParams { tokens: Record<string, any>; }
export async function createDesignTokens(args: CreateDesignTokensParams): Promise<ToolResult> {
  const frame = await createStyledFrame("Design Tokens", 400, 500, "#FAFAFA");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateComponentDocParams { componentId: string; description?: string; }
export async function createComponentDoc(args: CreateComponentDocParams): Promise<ToolResult> {
  const frame = await createStyledFrame("Component Documentation", 500, 400, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateUseCaseDiagramParams { title: string; actors?: string[]; useCases?: string[]; }
export async function createUseCaseDiagram(args: CreateUseCaseDiagramParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Use Case - ${args.title}`, 600, 500, "#FFFDE7");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateTimelineParams { title: string; events?: Array<{ date: string; title: string }>; }
export async function createTimeline(args: CreateTimelineParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Timeline - ${args.title}`, 800, 200, "#F5F5F5");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateProgressTrackerParams { title: string; phases?: Array<{ name: string; status?: string }>; }
export async function createProgressTracker(args: CreateProgressTrackerParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Progress - ${args.title}`, 600, 150, "#E8F5E9");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateKanbanBoardParams { title: string; columns?: Array<{ name: string; items?: string[] }>; }
export async function createKanbanBoard(args: CreateKanbanBoardParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Kanban - ${args.title}`, 800, 500, "#FFFFFF");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateRetroParams { title: string; whatWentWell?: string[]; whatToImprove?: string[]; }
export async function createRetro(args: CreateRetroParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Retro - ${args.title}`, 600, 400, "#F3E5F5");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateSwotAnalysisParams { title: string; strengths?: string[]; weaknesses?: string[]; opportunities?: string[]; threats?: string[]; }
export async function createSwotAnalysis(args: CreateSwotAnalysisParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`SWOT - ${args.title}`, 600, 600, "#FFFFFF");
  frame.layoutMode = "HORIZONTAL";
  frame.layoutWrap = "WRAP";
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 24;
  frame.itemSpacing = 12;
  
  const sections = [
    { title: "Strengths", items: args.strengths || [], color: "#C8E6C9" },
    { title: "Weaknesses", items: args.weaknesses || [], color: "#FFCDD2" },
    { title: "Opportunities", items: args.opportunities || [], color: "#BBDEFB" },
    { title: "Threats", items: args.threats || [], color: "#FFE0B2" },
  ];
  
  for (const section of sections) {
    const sFrame = await createStyledFrame(section.title, 276, 276, section.color);
    sFrame.cornerRadius = 8;
    sFrame.layoutMode = "VERTICAL";
    sFrame.paddingTop = sFrame.paddingBottom = sFrame.paddingLeft = sFrame.paddingRight = 16;
    sFrame.itemSpacing = 8;
    
    const sTitle = await createTextNode(section.title, 14, "Bold");
    sFrame.appendChild(sTitle);
    
    for (const item of section.items.slice(0, 4)) {
      const iText = await createTextNode(`• ${item}`, 11);
      sFrame.appendChild(iText);
    }
    
    frame.appendChild(sFrame);
  }
  
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateBrainstormParams { topic: string; ideas?: string[]; }
export async function createBrainstorm(args: CreateBrainstormParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Brainstorm - ${args.topic}`, 500, 400, "#FFFDE7");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateDecisionMatrixParams { title: string; options?: string[]; criteria?: string[]; }
export async function createDecisionMatrix(args: CreateDecisionMatrixParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Decision Matrix - ${args.title}`, 600, 400, "#F5F5F5");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateMvpDefinitionParams { product: string; mustHave?: string[]; shouldHave?: string[]; couldHave?: string[]; }
export async function createMvpDefinition(args: CreateMvpDefinitionParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`MVP - ${args.product}`, 500, 400, "#E8F5E9");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateRoadmapParams { title: string; quarters?: Array<{ name: string; items?: string[] }>; }
export async function createRoadmap(args: CreateRoadmapParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Roadmap - ${args.title}`, 800, 300, "#E3F2FD");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}

export interface CreateReleasePlanParams { version: string; features?: string[]; }
export async function createReleasePlan(args: CreateReleasePlanParams): Promise<ToolResult> {
  const frame = await createStyledFrame(`Release ${args.version}`, 400, 300, "#F3E5F5");
  figma.currentPage.appendChild(frame);
  return { isError: false, content: JSON.stringify({ id: frame.id, name: frame.name }) };
}
