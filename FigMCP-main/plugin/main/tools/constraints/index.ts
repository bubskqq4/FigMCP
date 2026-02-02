import { ToolResult } from "../tool-result";

export interface SetHorizontalConstraintParams { nodeId: string; constraint: "MIN" | "MAX" | "CENTER" | "STRETCH" | "SCALE"; }
export interface SetVerticalConstraintParams { nodeId: string; constraint: "MIN" | "MAX" | "CENTER" | "STRETCH" | "SCALE"; }
export interface SetConstraintsParams { nodeId: string; horizontal: "MIN" | "MAX" | "CENTER" | "STRETCH" | "SCALE"; vertical: "MIN" | "MAX" | "CENTER" | "STRETCH" | "SCALE"; }
export interface ResetConstraintsParams { nodeId: string; }
export interface SetConstraintProportionsParams { nodeId: string; locked: boolean; }
export interface GetConstraintsParams { nodeId: string; }

export async function setHorizontalConstraint(args: SetHorizontalConstraintParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("constraints" in node)) return { isError: true, content: "Node not found or has no constraints" };
  const sceneNode = node as SceneNode & ConstraintMixin;
  sceneNode.constraints = { horizontal: args.constraint, vertical: sceneNode.constraints.vertical };
  return { isError: false, content: JSON.stringify({ id: (node as any).id, constraints: sceneNode.constraints }) };
}

export async function setVerticalConstraint(args: SetVerticalConstraintParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("constraints" in node)) return { isError: true, content: "Node not found or has no constraints" };
  const sceneNode = node as SceneNode & ConstraintMixin;
  sceneNode.constraints = { horizontal: sceneNode.constraints.horizontal, vertical: args.constraint };
  return { isError: false, content: JSON.stringify({ id: (node as any).id, constraints: sceneNode.constraints }) };
}

export async function setConstraints(args: SetConstraintsParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("constraints" in node)) return { isError: true, content: "Node not found or has no constraints" };
  const sceneNode = node as SceneNode & ConstraintMixin;
  sceneNode.constraints = { horizontal: args.horizontal, vertical: args.vertical };
  return { isError: false, content: JSON.stringify({ id: (node as any).id, constraints: sceneNode.constraints }) };
}

export async function resetConstraints(args: ResetConstraintsParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("constraints" in node)) return { isError: true, content: "Node not found or has no constraints" };
  const sceneNode = node as SceneNode & ConstraintMixin;
  sceneNode.constraints = { horizontal: "MIN", vertical: "MIN" };
  return { isError: false, content: JSON.stringify({ id: (node as any).id, constraints: sceneNode.constraints }) };
}

export async function setConstraintProportions(args: SetConstraintProportionsParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("constrainProportions" in node)) return { isError: true, content: "Node not found" };
  (node as any).constrainProportions = args.locked;
  return { isError: false, content: JSON.stringify({ id: (node as any).id, constrainProportions: args.locked }) };
}

export async function getConstraints(args: GetConstraintsParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node || !("constraints" in node)) return { isError: true, content: "Node not found or has no constraints" };
  const sceneNode = node as SceneNode & ConstraintMixin;
  const constrainProportions = "constrainProportions" in node ? (node as any).constrainProportions : false;
  return { isError: false, content: JSON.stringify({ 
    id: (node as any).id, 
    constraints: sceneNode.constraints,
    constrainProportions,
  }) };
}
