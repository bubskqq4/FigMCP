import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getServer } from './server.js';
import { PORT } from './config.js';
import { Server } from 'socket.io';
import http from 'http';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Track server instances for cleanup
let httpServer: http.Server | null = null;
let socketServer: Server | null = null;
let isShuttingDown = false;

/**
 * Gracefully shutdown all server components
 */
async function cleanup(): Promise<void> {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.error('[MCP] Shutting down gracefully...');

    try {
        // Close Socket.IO server first
        if (socketServer) {
            console.error('[MCP] Closing Socket.IO connections...');
            socketServer.close();
            socketServer = null;
        }

        // Close HTTP server
        if (httpServer) {
            console.error('[MCP] Closing HTTP server...');
            await new Promise<void>((resolve, reject) => {
                const timeout = setTimeout(() => {
                    console.error('[MCP] HTTP server close timeout, forcing...');
                    resolve();
                }, 3000);

                httpServer!.close((err) => {
                    clearTimeout(timeout);
                    if (err && (err as NodeJS.ErrnoException).code !== 'ERR_SERVER_NOT_RUNNING') {
                        console.error('[MCP] Error closing HTTP server:', err);
                    }
                    resolve();
                });
            });
            httpServer = null;
        }

        console.error('[MCP] Cleanup complete');
    } catch (error) {
        console.error('[MCP] Error during cleanup:', error);
    }
}

/**
 * Find and kill process using a specific port (Windows-compatible)
 */
async function killProcessOnPort(port: number): Promise<boolean> {
    const isWindows = process.platform === 'win32';

    try {
        if (isWindows) {
            // Windows: Use netstat to find PID, then taskkill
            const { stdout } = await execAsync(`netstat -ano | findstr :${port} | findstr LISTENING`);
            const lines = stdout.trim().split('\n');
            
            for (const line of lines) {
                const parts = line.trim().split(/\s+/);
                const pid = parts[parts.length - 1];
                
                if (pid && !isNaN(parseInt(pid))) {
                    console.error(`[MCP] Found process ${pid} using port ${port}, attempting to kill...`);
                    try {
                        await execAsync(`taskkill /F /PID ${pid}`);
                        console.error(`[MCP] Successfully killed process ${pid}`);
                    } catch (killError) {
                        // Process might have already exited
                        console.error(`[MCP] Could not kill process ${pid}: ${killError}`);
                    }
                }
            }
            return true;
        } else {
            // Unix: Use lsof and kill
            const { stdout } = await execAsync(`lsof -ti:${port}`);
            const pids = stdout.trim().split('\n').filter(Boolean);
            
            for (const pid of pids) {
                console.error(`[MCP] Found process ${pid} using port ${port}, attempting to kill...`);
                try {
                    await execAsync(`kill -9 ${pid}`);
                    console.error(`[MCP] Successfully killed process ${pid}`);
                } catch (killError) {
                    console.error(`[MCP] Could not kill process ${pid}: ${killError}`);
                }
            }
            return true;
        }
    } catch (error) {
        // No process found on port (expected if port is free)
        return false;
    }
}

/**
 * Check if a port is available
 */
async function isPortAvailable(port: number): Promise<boolean> {
    return new Promise((resolve) => {
        const testServer = http.createServer();
        
        testServer.once('error', (err: NodeJS.ErrnoException) => {
            if (err.code === 'EADDRINUSE') {
                resolve(false);
            } else {
                resolve(false);
            }
        });

        testServer.once('listening', () => {
            testServer.close(() => resolve(true));
        });

        testServer.listen(port);
    });
}

/**
 * Wait for a port to become available with retries
 */
async function waitForPort(port: number, maxRetries: number = 5, delayMs: number = 500): Promise<boolean> {
    for (let i = 0; i < maxRetries; i++) {
        if (await isPortAvailable(port)) {
            return true;
        }
        console.error(`[MCP] Port ${port} still in use, waiting... (attempt ${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
    }
    return false;
}

/**
 * Start the HTTP server with error handling and retry logic
 */
async function startHttpServer(server: http.Server, port: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
        // First, check if port is available
        const portAvailable = await isPortAvailable(port);
        
        if (!portAvailable) {
            console.error(`[MCP] Port ${port} is in use. Attempting to clean up stale process...`);
            
            // Try to kill the process using the port
            await killProcessOnPort(port);
            
            // Wait for port to become available
            const portFreed = await waitForPort(port, 5, 500);
            
            if (!portFreed) {
                reject(new Error(`Port ${port} is still in use after cleanup attempts. Please manually kill the process or use a different port.`));
                return;
            }
        }

        // Set up error handler for EADDRINUSE
        server.on('error', async (err: NodeJS.ErrnoException) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`[MCP] Port ${port} became unavailable. Attempting recovery...`);
                
                // Try cleanup and retry once
                await killProcessOnPort(port);
                const portFreed = await waitForPort(port, 3, 300);
                
                if (portFreed) {
                    console.error(`[MCP] Retrying server start on port ${port}...`);
                    server.listen(port);
                } else {
                    reject(new Error(`Failed to start server: Port ${port} is in use and could not be freed.`));
                }
            } else {
                reject(err);
            }
        });

        server.on('listening', () => {
            console.error(`[MCP] Socket.IO server listening on http://localhost:${port}`);
            resolve();
        });

        // Start listening
        server.listen(port);
    });
}

/**
 * Register signal handlers for graceful shutdown
 */
function registerSignalHandlers(): void {
    // Handle process termination signals
    process.on('SIGTERM', async () => {
        console.error('[MCP] Received SIGTERM signal');
        await cleanup();
        process.exit(0);
    });

    process.on('SIGINT', async () => {
        console.error('[MCP] Received SIGINT signal');
        await cleanup();
        process.exit(0);
    });

    // Handle Windows-specific events
    if (process.platform === 'win32') {
        // Windows doesn't have SIGTERM/SIGINT in the same way
        // Handle readline close for graceful shutdown
        process.on('SIGHUP', async () => {
            console.error('[MCP] Received SIGHUP signal');
            await cleanup();
            process.exit(0);
        });
    }

    // Handle uncaught exceptions
    process.on('uncaughtException', async (error) => {
        console.error('[MCP] Uncaught exception:', error);
        await cleanup();
        process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', async (reason, promise) => {
        console.error('[MCP] Unhandled rejection at:', promise, 'reason:', reason);
        await cleanup();
        process.exit(1);
    });

    // Handle process exit
    process.on('exit', (code) => {
        console.error(`[MCP] Process exiting with code ${code}`);
        // Note: Async operations won't complete in 'exit' handler
        // Cleanup should be done before reaching this point
    });

    // Handle beforeExit for async cleanup
    process.on('beforeExit', async (code) => {
        if (!isShuttingDown) {
            console.error(`[MCP] Before exit with code ${code}`);
            await cleanup();
        }
    });
}

export async function startSTDIO() {
    // Register signal handlers first
    registerSignalHandlers();

    try {
        console.error('[MCP] Starting STDIO server...');

        // Create HTTP server
        httpServer = http.createServer();
        
        // Create Socket.IO server
        socketServer = new Server(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "OPTIONS"],
                allowedHeaders: ["*"],
                credentials: false
            },
            transports: ['polling', 'websocket'],
            allowUpgrades: true,
            cookie: false,
            serveClient: false,
            pingTimeout: 60000,
            pingInterval: 25000
        });
        
        // Get MCP server with tools registered
        const server = await getServer(socketServer);
        
        // Create and connect STDIO transport
        const transport = new StdioServerTransport();
        await server.connect(transport);
        
        // Start HTTP server for Socket.IO connections from Figma plugin
        await startHttpServer(httpServer, PORT);
        
        console.error('[MCP] STDIO server started successfully');
    } catch (error) {
        console.error('[MCP] Error starting STDIO server:', error);
        await cleanup();
        throw error;
    }
}

// Export cleanup for external use
export { cleanup };
