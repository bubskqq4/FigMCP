import { ToolResult } from "../tool-result";

export interface GetAllVariablesParams { }
export interface GetVariableByIdParams { variableId: string; }
export interface GetVariableCollectionsParams { }
export interface CreateVariableParams { collectionId: string; name: string; resolvedType: "BOOLEAN" | "FLOAT" | "STRING" | "COLOR"; }
export interface SetVariableValueParams { variableId: string; modeId: string; value: any; }
export interface BindVariableToNodeParams { nodeId: string; variableId: string; field: string; }
export interface UnbindVariableFromNodeParams { nodeId: string; field: string; }
export interface GetBoundVariablesParams { nodeId: string; }
export interface CreateVariableCollectionParams { name: string; }
export interface DeleteVariableParams { variableId: string; }

export async function getAllVariables(_args: GetAllVariablesParams): Promise<ToolResult> {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const allVariables: any[] = [];
  
  for (const collection of collections) {
    for (const variableId of collection.variableIds) {
      const variable = await figma.variables.getVariableByIdAsync(variableId);
      if (variable) {
        allVariables.push({
          id: variable.id,
          name: variable.name,
          resolvedType: variable.resolvedType,
          collectionId: collection.id,
        });
      }
    }
  }
  
  return { isError: false, content: JSON.stringify({ variables: allVariables.slice(0, 100), total: allVariables.length }) };
}

export async function getVariableById(args: GetVariableByIdParams): Promise<ToolResult> {
  const variable = await figma.variables.getVariableByIdAsync(args.variableId);
  if (!variable) return { isError: true, content: "Variable not found" };
  
  return { isError: false, content: JSON.stringify({
    id: variable.id,
    name: variable.name,
    resolvedType: variable.resolvedType,
    valuesByMode: variable.valuesByMode,
  }) };
}

export async function getVariableCollections(_args: GetVariableCollectionsParams): Promise<ToolResult> {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const list = collections.map(c => ({
    id: c.id,
    name: c.name,
    modes: c.modes,
    variableIds: c.variableIds,
  }));
  return { isError: false, content: JSON.stringify({ collections: list }) };
}

export async function createVariable(args: CreateVariableParams): Promise<ToolResult> {
  const collection = await figma.variables.getVariableCollectionByIdAsync(args.collectionId);
  if (!collection) return { isError: true, content: "Collection not found" };
  
  const variable = figma.variables.createVariable(args.name, args.collectionId, args.resolvedType);
  return { isError: false, content: JSON.stringify({ id: variable.id, name: variable.name }) };
}

export async function setVariableValue(args: SetVariableValueParams): Promise<ToolResult> {
  const variable = await figma.variables.getVariableByIdAsync(args.variableId);
  if (!variable) return { isError: true, content: "Variable not found" };
  
  variable.setValueForMode(args.modeId, args.value);
  return { isError: false, content: JSON.stringify({ id: variable.id, modeId: args.modeId, value: args.value }) };
}

export async function bindVariableToNode(args: BindVariableToNodeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const variable = await figma.variables.getVariableByIdAsync(args.variableId);
  if (!variable) return { isError: true, content: "Variable not found" };
  
  try {
    (node as SceneNode).setBoundVariable(args.field as VariableBindableNodeField, variable);
    return { isError: false, content: JSON.stringify({ id: (node as any).id, field: args.field, variableId: args.variableId }) };
  } catch (e) {
    return { isError: true, content: "Failed to bind variable" };
  }
}

export async function unbindVariableFromNode(args: UnbindVariableFromNodeParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  try {
    (node as SceneNode).setBoundVariable(args.field as VariableBindableNodeField, null);
    return { isError: false, content: JSON.stringify({ id: (node as any).id, field: args.field, unbound: true }) };
  } catch (e) {
    return { isError: true, content: "Failed to unbind variable" };
  }
}

export async function getBoundVariables(args: GetBoundVariablesParams): Promise<ToolResult> {
  const node = await figma.getNodeByIdAsync(args.nodeId);
  if (!node) return { isError: true, content: "Node not found" };
  
  const boundVariables = (node as SceneNode).boundVariables || {};
  return { isError: false, content: JSON.stringify({ id: (node as any).id, boundVariables }) };
}

export async function createVariableCollection(args: CreateVariableCollectionParams): Promise<ToolResult> {
  const collection = figma.variables.createVariableCollection(args.name);
  return { isError: false, content: JSON.stringify({ id: collection.id, name: collection.name }) };
}

export async function deleteVariable(args: DeleteVariableParams): Promise<ToolResult> {
  const variable = await figma.variables.getVariableByIdAsync(args.variableId);
  if (!variable) return { isError: true, content: "Variable not found" };
  
  variable.remove();
  return { isError: false, content: JSON.stringify({ deleted: args.variableId }) };
}
