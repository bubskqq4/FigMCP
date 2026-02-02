import { ToolResult } from "../tool-result";

function hexToRgba(hex: string, alpha: number = 1): RGBA {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
    a: alpha,
  } : { r: 0, g: 0, b: 0, a: alpha };
}

export interface AddDropShadowParams { nodeId: string; color?: string; offsetX?: number; offsetY?: number; radius?: number; spread?: number; opacity?: number; }
export interface AddInnerShadowParams { nodeId: string; color?: string; offsetX?: number; offsetY?: number; radius?: number; spread?: number; opacity?: number; }
export interface AddLayerBlurParams { nodeId: string; radius?: number; }
export interface AddBackgroundBlurParams { nodeId: string; radius?: number; }
export interface RemoveEffectParams { nodeId: string; index?: number; }
export interface RemoveAllEffectsParams { nodeId: string; }
export interface SetEffectRadiusParams { nodeId: string; radius: number; index?: number; }
export interface SetEffectOffsetParams { nodeId: string; offsetX: number; offsetY: number; index?: number; }
export interface SetEffectSpreadParams { nodeId: string; spread: number; index?: number; }
export interface SetEffectColorParams { nodeId: string; color: string; opacity?: number; index?: number; }
export interface CopyEffectsParams { sourceNodeId: string; targetNodeIds: string[]; }
export interface PasteEffectsParams { sourceNodeId: string; targetNodeId: string; }

export async function addDropShadow(args: AddDropShadowParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("effects" in node)) return { isError: true, content: "Node not found or has no effects" };
  const effects = [...((node as BlendMixin).effects)];
  const shadow: DropShadowEffect = {
    type: "DROP_SHADOW",
    color: hexToRgba(args.color || "#000000", args.opacity ?? 0.25),
    offset: { x: args.offsetX ?? 0, y: args.offsetY ?? 4 },
    radius: args.radius ?? 4,
    spread: args.spread ?? 0,
    visible: true,
    blendMode: "NORMAL",
  };
  effects.push(shadow);
  (node as BlendMixin).effects = effects;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, effectCount: effects.length }) };
}

export async function addInnerShadow(args: AddInnerShadowParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("effects" in node)) return { isError: true, content: "Node not found" };
  const effects = [...((node as BlendMixin).effects)];
  const shadow: InnerShadowEffect = {
    type: "INNER_SHADOW",
    color: hexToRgba(args.color || "#000000", args.opacity ?? 0.25),
    offset: { x: args.offsetX ?? 0, y: args.offsetY ?? 2 },
    radius: args.radius ?? 4,
    spread: args.spread ?? 0,
    visible: true,
    blendMode: "NORMAL",
  };
  effects.push(shadow);
  (node as BlendMixin).effects = effects;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, effectCount: effects.length }) };
}

export async function addLayerBlur(args: AddLayerBlurParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("effects" in node)) return { isError: true, content: "Node not found" };
  const effects = [...((node as BlendMixin).effects)];
  const blur = {
    type: "LAYER_BLUR" as const,
    radius: args.radius ?? 4,
    visible: true,
  };
  effects.push(blur as Effect);
  (node as BlendMixin).effects = effects;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, effectCount: effects.length }) };
}

export async function addBackgroundBlur(args: AddBackgroundBlurParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("effects" in node)) return { isError: true, content: "Node not found" };
  const effects = [...((node as BlendMixin).effects)];
  const blur = {
    type: "BACKGROUND_BLUR" as const,
    radius: args.radius ?? 4,
    visible: true,
  };
  effects.push(blur as Effect);
  (node as BlendMixin).effects = effects;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, effectCount: effects.length }) };
}

export async function removeEffect(args: RemoveEffectParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("effects" in node)) return { isError: true, content: "Node not found" };
  const effects = [...((node as BlendMixin).effects)];
  const index = args.index ?? 0;
  if (index >= effects.length) return { isError: true, content: "Invalid effect index" };
  effects.splice(index, 1);
  (node as BlendMixin).effects = effects;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, removed: index }) };
}

export async function removeAllEffects(args: RemoveAllEffectsParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("effects" in node)) return { isError: true, content: "Node not found" };
  (node as BlendMixin).effects = [];
  return { isError: false, content: JSON.stringify({ id: (node as any).id, effects: 0 }) };
}

export async function setEffectRadius(args: SetEffectRadiusParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("effects" in node)) return { isError: true, content: "Node not found" };
  const effects = [...((node as BlendMixin).effects)];
  const index = args.index ?? 0;
  if (index >= effects.length) return { isError: true, content: "Invalid effect index" };
  effects[index] = { ...effects[index], radius: args.radius } as Effect;
  (node as BlendMixin).effects = effects;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, radius: args.radius }) };
}

export async function setEffectOffset(args: SetEffectOffsetParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("effects" in node)) return { isError: true, content: "Node not found" };
  const effects = [...((node as BlendMixin).effects)];
  const index = args.index ?? 0;
  if (index >= effects.length) return { isError: true, content: "Invalid effect index" };
  const effect = effects[index];
  if (effect.type !== "DROP_SHADOW" && effect.type !== "INNER_SHADOW") {
    return { isError: true, content: "Effect does not have offset" };
  }
  effects[index] = { ...effect, offset: { x: args.offsetX, y: args.offsetY } };
  (node as BlendMixin).effects = effects;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, offset: { x: args.offsetX, y: args.offsetY } }) };
}

export async function setEffectSpread(args: SetEffectSpreadParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("effects" in node)) return { isError: true, content: "Node not found" };
  const effects = [...((node as BlendMixin).effects)];
  const index = args.index ?? 0;
  if (index >= effects.length) return { isError: true, content: "Invalid effect index" };
  const effect = effects[index];
  if (effect.type !== "DROP_SHADOW" && effect.type !== "INNER_SHADOW") {
    return { isError: true, content: "Effect does not have spread" };
  }
  effects[index] = { ...effect, spread: args.spread };
  (node as BlendMixin).effects = effects;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, spread: args.spread }) };
}

export async function setEffectColor(args: SetEffectColorParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("effects" in node)) return { isError: true, content: "Node not found" };
  const effects = [...((node as BlendMixin).effects)];
  const index = args.index ?? 0;
  if (index >= effects.length) return { isError: true, content: "Invalid effect index" };
  const effect = effects[index];
  if (effect.type !== "DROP_SHADOW" && effect.type !== "INNER_SHADOW") {
    return { isError: true, content: "Effect does not have color" };
  }
  effects[index] = { ...effect, color: hexToRgba(args.color, args.opacity ?? effect.color.a) };
  (node as BlendMixin).effects = effects;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, color: args.color }) };
}

export async function copyEffects(args: CopyEffectsParams): Promise<ToolResult> {
  const source = await figma.getNodeByIdAsync(args.sourceNodeId);
  if (!source || !("effects" in source)) return { isError: true, content: "Source not found" };
  const effects = (source as BlendMixin).effects;
  for (const id of args.targetNodeIds) {
    const target = await figma.getNodeByIdAsync(id);
    if (target && "effects" in target) (target as BlendMixin).effects = effects;
  }
  return { isError: false, content: JSON.stringify({ copied: args.targetNodeIds.length }) };
}

export async function pasteEffects(args: PasteEffectsParams): Promise<ToolResult> {
  const source = await figma.getNodeByIdAsync(args.sourceNodeId);
  const target = await figma.getNodeByIdAsync(args.targetNodeId);
  if (!source || !("effects" in source)) return { isError: true, content: "Source not found" };
  if (!target || !("effects" in target)) return { isError: true, content: "Target not found" };
  (target as BlendMixin).effects = (source as BlendMixin).effects;
  return { isError: false, content: JSON.stringify({ pasted: true }) };
}
