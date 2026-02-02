/**
 * Utility functions for tool processing
 */

/**
 * Safely process tool results, handling errors and formatting responses
 * @param promise - The promise from the task manager
 * @returns Formatted tool response
 */
export async function safeToolProcessor(promise: Promise<any>): Promise<{ content: Array<{ type: "text"; text: string }> }> {
    try {
        const result = await promise;
        return {
            content: [{
                type: "text" as const,
                text: typeof result === "string" ? result : JSON.stringify(result, null, 2)
            }]
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
            content: [{
                type: "text" as const,
                text: `Error: ${errorMessage}`
            }]
        };
    }
}

/**
 * Validate that required parameters are present
 * @param params - Parameters object to validate
 * @param required - Array of required parameter names
 * @throws Error if a required parameter is missing
 */
export function validateRequiredParams(params: Record<string, any>, required: string[]): void {
    for (const param of required) {
        if (params[param] === undefined || params[param] === null) {
            throw new Error(`Missing required parameter: ${param}`);
        }
    }
}

/**
 * Format a success response
 * @param message - Success message or data
 * @returns Formatted success response
 */
export function successResponse(message: string | object): { content: Array<{ type: "text"; text: string }> } {
    return {
        content: [{
            type: "text" as const,
            text: typeof message === "string" ? message : JSON.stringify(message, null, 2)
        }]
    };
}

/**
 * Format an error response
 * @param error - Error message or Error object
 * @returns Formatted error response
 */
export function errorResponse(error: string | Error): { content: Array<{ type: "text"; text: string }> } {
    return {
        content: [{
            type: "text" as const,
            text: `Error: ${error instanceof Error ? error.message : error}`
        }]
    };
}
