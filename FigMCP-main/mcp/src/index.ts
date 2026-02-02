#!/usr/bin/env node
/**
 * MCP Server Entry Point
 * 
 * CRITICAL: The preload import MUST be first to:
 * 1. Suppress stdout pollution before STDIO transport is ready
 * 2. Load dotenv before any modules that depend on env vars
 */

// CRITICAL: This must be the FIRST import - sets up stdout suppression immediately
import { waitForPreload, enableStdout } from './preload.js';

import type { EnvStartConfig } from "./config.js";

// Track which server type is running for cleanup
let serverType: 'stdio' | 'streamable-http' | null = null;

// Cleanup functions - will be populated after dynamic imports
let stdioCleanup: (() => Promise<void>) | null = null;
let httpCleanup: (() => Promise<void>) | null = null;

/**
 * Global cleanup function that calls the appropriate cleanup based on server type
 */
async function globalCleanup(): Promise<void> {
    console.error('[MCP] Global cleanup initiated...');
    try {
        if (serverType === 'stdio' && stdioCleanup) {
            await stdioCleanup();
        } else if (serverType === 'streamable-http' && httpCleanup) {
            await httpCleanup();
        }
    } catch (error) {
        console.error('[MCP] Error during global cleanup:', error);
    }
}

// Register global error handlers at the entry point level
process.on('uncaughtException', async (error: Error) => {
    console.error('[MCP] Fatal uncaught exception:', error.message);
    console.error(error.stack);
    await globalCleanup();
    process.exit(1);
});

process.on('unhandledRejection', async (reason: unknown, promise: Promise<unknown>) => {
    console.error('[MCP] Fatal unhandled rejection:', reason);
    await globalCleanup();
    process.exit(1);
});

// Main startup
async function main(): Promise<void> {
    try {
        // CRITICAL: Wait for preload to complete (dotenv loaded) before importing other modules
        await waitForPreload();
        
        // Dynamic imports to ensure they load AFTER preload has configured dotenv
        const { envStartSchema } = await import('./config.js');
        const { startSTDIO, cleanup: importedStdioCleanup } = await import('./stdio.js');
        const { startStreamableHTTP, cleanup: importedHttpCleanup } = await import('./streamable-http.js');
        
        // Store cleanup functions for global cleanup handler
        stdioCleanup = importedStdioCleanup;
        httpCleanup = importedHttpCleanup;
        
        // Parse environment config
        const ENV: EnvStartConfig = envStartSchema.parse(process.env);
        
        console.error(`[MCP] Starting server with transport: ${ENV.TRANSPORT}`);
        
        if (ENV.TRANSPORT === "streamable-http") {
            serverType = 'streamable-http';
            await startStreamableHTTP();
        } else {
            serverType = 'stdio';
            // Enable stdout just before starting STDIO transport
            // The STDIO transport needs stdout for JSON-RPC messages
            enableStdout();
            
            // Also disable protection from entry.js wrapper if running through it
            if (typeof (globalThis as any).__disableStdoutProtection === 'function') {
                (globalThis as any).__disableStdoutProtection();
            }
            
            await startSTDIO();
        }
    } catch (error) {
        console.error("[MCP] Failed to start server:", error);
        await globalCleanup();
        process.exit(1);
    }
}

// Start the server
main();
