import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { TaskResult } from "src/task-manager";

/**
 * Normalize arguments that may have arrays incorrectly converted to objects.
 * This can happen during JSON serialization in some edge cases.
 * 
 * Example: { "0": 1, "1": 2, "2": 3 } -> [1, 2, 3]
 */
export function normalizeArguments(args: Record<string, any>): Record<string, any> {
    if (!args || typeof args !== 'object') {
        return args;
    }
    
    const normalized: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(args)) {
        if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
            // Check if this object should be an array (has numeric keys 0, 1, 2, ...)
            const keys = Object.keys(value);
            const isNumericKeyed = keys.length > 0 && keys.every((k, i) => k === String(i));
            
            if (isNumericKeyed) {
                // Convert object with numeric keys back to array
                normalized[key] = keys.map(k => {
                    const item = value[k];
                    // Recursively normalize nested objects
                    if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
                        return normalizeArguments(item);
                    }
                    return item;
                });
                console.error(`[normalizeArguments] Converted object to array for key "${key}"`);
            } else {
                // Recursively normalize nested objects
                normalized[key] = normalizeArguments(value);
            }
        } else if (Array.isArray(value)) {
            // Recursively normalize array items
            normalized[key] = value.map(item => {
                if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
                    return normalizeArguments(item);
                }
                return item;
            });
        } else {
            normalized[key] = value;
        }
    }
    
    return normalized;
}

export async function safeToolProcessor<T>(task: Promise<TaskResult>): Promise<CallToolResult> {
    try {
        const result = await task;
        return {
            content: [{
                type: "text",
                text: JSON.stringify(result.content)
            }],
            isError: result.isError
        } as CallToolResult;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
        return {
            content: [{
                type: "text",
                text: errorMessage
            }],
            isError: true
        } as CallToolResult;
    }

}