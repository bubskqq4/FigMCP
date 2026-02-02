#!/usr/bin/env node
/**
 * Entry point wrapper that sets up stdout protection BEFORE loading the main bundle.
 * 
 * CRITICAL: This file MUST be the entry point for STDIO mode.
 * It ensures console.log and process.stdout.write are intercepted BEFORE
 * any ES module imports in the main bundle are resolved.
 * 
 * The problem: ES module imports are hoisted and execute before any other code
 * in the module. This means any imports in bundle.js execute before our 
 * console.log override, potentially polluting stdout.
 * 
 * The solution: This wrapper has NO static imports except the dynamic import
 * of the bundle, ensuring our override is in place first.
 */

// ============================================
// STEP 1: Store originals IMMEDIATELY
// ============================================
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleInfo = console.info;
const originalStdoutWrite = process.stdout.write.bind(process.stdout);

// ============================================
// STEP 2: Override console.log/warn/info to stderr
// ============================================
console.log = (...args: any[]) => {
    console.error('[LOG→STDERR]', ...args);
};

console.warn = (...args: any[]) => {
    console.error('[WARN→STDERR]', ...args);
};

console.info = (...args: any[]) => {
    console.error('[INFO→STDERR]', ...args);
};

// ============================================
// STEP 3: Override process.stdout.write
// ============================================
let stdoutProtectionEnabled = true;

(process.stdout.write as any) = function(chunk: any, encodingOrCallback?: any, callback?: any): boolean {
    if (stdoutProtectionEnabled) {
        const message = typeof chunk === 'string' ? chunk : chunk.toString();
        const trimmed = message.trim();
        
        // Only allow valid JSON-RPC messages (start with {)
        // Also allow empty strings/newlines (they're harmless)
        if (trimmed && !trimmed.startsWith('{')) {
            // Redirect non-JSON to stderr
            console.error('[STDOUT→STDERR]', trimmed);
            // Return true to indicate "write was handled"
            if (typeof encodingOrCallback === 'function') {
                encodingOrCallback();
            } else if (typeof callback === 'function') {
                callback();
            }
            return true;
        }
    }
    
    // Pass through valid JSON-RPC messages
    if (typeof encodingOrCallback === 'function') {
        return originalStdoutWrite(chunk, encodingOrCallback);
    }
    return originalStdoutWrite(chunk, encodingOrCallback, callback);
};

// ============================================
// STEP 4: Set DOTENV_CONFIG_QUIET before anything loads dotenv
// ============================================
process.env.DOTENV_CONFIG_QUIET = 'true';

// ============================================
// STEP 5: Load dotenv with quiet mode BEFORE the main bundle
// ============================================
async function main() {
    try {
        // Load dotenv first with quiet mode
        const dotenv = await import('dotenv');
        dotenv.config({ quiet: true });
    } catch (e: any) {
        // dotenv might not be installed, that's okay
        console.error('[entry] dotenv load skipped:', e.message);
    }
    
    // Now dynamically import the main bundle
    // All its static imports will resolve AFTER our overrides are in place
    try {
        // Use index.js during development, will be bundle.js in production
        // @ts-ignore - bundle.js is created by rollup after TypeScript compilation
        await import('./bundle.js');
    } catch (e) {
        console.error('[entry] Failed to load bundle:', e);
        process.exit(1);
    }
}

// ============================================
// STEP 6: Export function to disable protection (for STDIO mode)
// ============================================
(globalThis as any).__disableStdoutProtection = () => {
    stdoutProtectionEnabled = false;
};

(globalThis as any).__restoreConsole = () => {
    console.log = originalConsoleLog;
    console.warn = originalConsoleWarn;
    console.info = originalConsoleInfo;
};

// Start
main();
