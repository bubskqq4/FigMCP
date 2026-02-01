/**
 * CRITICAL: This file must be imported FIRST in index.ts
 * 
 * Purpose: Prevent stdout pollution before MCP STDIO transport is ready.
 * The MCP STDIO protocol requires stdout to contain ONLY valid JSON-RPC messages.
 * Any other output (like dotenv logs) breaks the protocol.
 * 
 * IMPORTANT: This file uses DYNAMIC imports to ensure console.log is 
 * suppressed BEFORE dotenv loads. Static ES6 imports are hoisted and 
 * would execute before the suppression code.
 */

// Store original console.log IMMEDIATELY
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;

// Redirect console.log and console.warn to stderr IMMEDIATELY
// This prevents any third-party libraries from polluting stdout
console.log = (...args: unknown[]): void => {
    // Redirect to stderr - don't even show suppression marker to keep logs clean
    console.error('[LOG→STDERR]', ...args);
};

console.warn = (...args: unknown[]): void => {
    // Redirect to stderr
    console.error('[WARN→STDERR]', ...args);
};

// Also suppress process.stdout.write directly for extra safety
const originalStdoutWrite = process.stdout.write.bind(process.stdout);
let stdoutSuppressed = true;

// Override stdout.write with proper type handling
const customStdoutWrite = function(
    chunk: string | Uint8Array,
    encodingOrCallback?: BufferEncoding | ((err?: Error | null) => void),
    callback?: (err?: Error | null) => void
): boolean {
    if (stdoutSuppressed) {
        // During initialization, redirect ALL stdout writes to stderr
        const message = typeof chunk === 'string' ? chunk : chunk.toString();
        const trimmed = message.trim();
        
        // Only allow valid JSON-RPC messages through (they start with { or are empty newlines)
        if (trimmed && !trimmed.startsWith('{')) {
            // This is non-JSON content - redirect to stderr
            console.error('[STDOUT→STDERR]', trimmed);
            return true;
        }
    }
    // Pass through to original for JSON-RPC messages
    if (typeof encodingOrCallback === 'function') {
        return originalStdoutWrite(chunk, encodingOrCallback);
    }
    return originalStdoutWrite(chunk, encodingOrCallback, callback);
};

// Assign with type assertion to handle Node.js write overloads
process.stdout.write = customStdoutWrite as typeof process.stdout.write;

// Now load dotenv using DYNAMIC import to ensure our suppression is active first
async function loadDotenv(): Promise<void> {
    try {
        const dotenv = await import('dotenv');
        // Configure dotenv with quiet mode
        dotenv.config({ quiet: true });
    } catch (e) {
        // If dotenv fails to load, that's okay - env vars may be set externally
        console.error('[preload] dotenv load failed (non-critical):', e);
    }
}

// Execute dotenv loading immediately
const dotenvPromise = loadDotenv();

// Export a function to wait for preload completion
export async function waitForPreload(): Promise<void> {
    await dotenvPromise;
}

// Export a function to restore normal stdout (called after MCP transport is ready)
export function enableStdout(): void {
    stdoutSuppressed = false;
    // Keep console.log redirected to stderr for safety in STDIO mode
    // console.log = originalConsoleLog;
    // console.warn = originalConsoleWarn;
}

// Export the original functions in case they're needed
export const originalLog = originalConsoleLog;
export const originalWarn = originalConsoleWarn;

// Flag to indicate preload module was loaded
export const preloadComplete = true;
