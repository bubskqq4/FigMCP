#!/usr/bin/env node
import { envStartSchema, type EnvStartConfig } from "./config.js";
import { startSTDIO, cleanup as stdioCleanup } from "./stdio.js";
import { startStreamableHTTP, cleanup as httpCleanup } from "./streamable-http.js";
import dotenv from "dotenv";

dotenv.config();

const ENV: EnvStartConfig = envStartSchema.parse(process.env);

// Track which server type is running for cleanup
let serverType: 'stdio' | 'streamable-http' | null = null;

/**
 * Global cleanup function that calls the appropriate cleanup based on server type
 */
async function globalCleanup(): Promise<void> {
    console.error('[MCP] Global cleanup initiated...');
    try {
        if (serverType === 'stdio') {
            await stdioCleanup();
        } else if (serverType === 'streamable-http') {
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
        console.error(`[MCP] Starting server with transport: ${ENV.TRANSPORT}`);
        
        if (ENV.TRANSPORT === "streamable-http") {
            serverType = 'streamable-http';
            await startStreamableHTTP();
        } else {
            serverType = 'stdio';
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
