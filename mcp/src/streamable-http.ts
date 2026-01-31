import express from "express";
import { generateUUID } from "./utils.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js"
import { getServer } from "./server.js";
import { PORT } from "./config.js";
import { Server } from "socket.io";
import http from "http";
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Track server instances for cleanup
let httpServer: http.Server | null = null;
let socketServer: Server | null = null;
let isShuttingDown = false;
let statusInterval: ReturnType<typeof setInterval> | null = null;

/**
 * Gracefully shutdown all server components
 */
async function cleanup(): Promise<void> {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.error('[MCP-HTTP] Shutting down gracefully...');

    try {
        // Clear status interval
        if (statusInterval) {
            clearInterval(statusInterval);
            statusInterval = null;
        }

        // Close Socket.IO server first
        if (socketServer) {
            console.error('[MCP-HTTP] Closing Socket.IO connections...');
            socketServer.close();
            socketServer = null;
        }

        // Close HTTP server
        if (httpServer) {
            console.error('[MCP-HTTP] Closing HTTP server...');
            await new Promise<void>((resolve) => {
                const timeout = setTimeout(() => {
                    console.error('[MCP-HTTP] HTTP server close timeout, forcing...');
                    resolve();
                }, 3000);

                httpServer!.close((err) => {
                    clearTimeout(timeout);
                    if (err && (err as NodeJS.ErrnoException).code !== 'ERR_SERVER_NOT_RUNNING') {
                        console.error('[MCP-HTTP] Error closing HTTP server:', err);
                    }
                    resolve();
                });
            });
            httpServer = null;
        }

        console.error('[MCP-HTTP] Cleanup complete');
    } catch (error) {
        console.error('[MCP-HTTP] Error during cleanup:', error);
    }
}

/**
 * Find and kill process using a specific port (Windows-compatible)
 */
async function killProcessOnPort(port: number): Promise<boolean> {
    const isWindows = process.platform === 'win32';

    try {
        if (isWindows) {
            const { stdout } = await execAsync(`netstat -ano | findstr :${port} | findstr LISTENING`);
            const lines = stdout.trim().split('\n');
            
            for (const line of lines) {
                const parts = line.trim().split(/\s+/);
                const pid = parts[parts.length - 1];
                
                if (pid && !isNaN(parseInt(pid))) {
                    console.error(`[MCP-HTTP] Found process ${pid} using port ${port}, attempting to kill...`);
                    try {
                        await execAsync(`taskkill /F /PID ${pid}`);
                        console.error(`[MCP-HTTP] Successfully killed process ${pid}`);
                    } catch (killError) {
                        console.error(`[MCP-HTTP] Could not kill process ${pid}: ${killError}`);
                    }
                }
            }
            return true;
        } else {
            const { stdout } = await execAsync(`lsof -ti:${port}`);
            const pids = stdout.trim().split('\n').filter(Boolean);
            
            for (const pid of pids) {
                console.error(`[MCP-HTTP] Found process ${pid} using port ${port}, attempting to kill...`);
                try {
                    await execAsync(`kill -9 ${pid}`);
                    console.error(`[MCP-HTTP] Successfully killed process ${pid}`);
                } catch (killError) {
                    console.error(`[MCP-HTTP] Could not kill process ${pid}: ${killError}`);
                }
            }
            return true;
        }
    } catch (error) {
        return false;
    }
}

/**
 * Check if a port is available
 */
async function isPortAvailable(port: number): Promise<boolean> {
    return new Promise((resolve) => {
        const testServer = http.createServer();
        
        testServer.once('error', () => {
            resolve(false);
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
        console.error(`[MCP-HTTP] Port ${port} still in use, waiting... (attempt ${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
    }
    return false;
}

/**
 * Start the HTTP server with error handling and retry logic
 */
async function startHttpServerWithRetry(server: http.Server, port: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
        const portAvailable = await isPortAvailable(port);
        
        if (!portAvailable) {
            console.error(`[MCP-HTTP] Port ${port} is in use. Attempting to clean up stale process...`);
            await killProcessOnPort(port);
            
            const portFreed = await waitForPort(port, 5, 500);
            
            if (!portFreed) {
                reject(new Error(`Port ${port} is still in use after cleanup attempts.`));
                return;
            }
        }

        server.on('error', async (err: NodeJS.ErrnoException) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`[MCP-HTTP] Port ${port} became unavailable. Attempting recovery...`);
                
                await killProcessOnPort(port);
                const portFreed = await waitForPort(port, 3, 300);
                
                if (portFreed) {
                    console.error(`[MCP-HTTP] Retrying server start on port ${port}...`);
                    server.listen(port);
                } else {
                    reject(new Error(`Failed to start server: Port ${port} is in use.`));
                }
            } else {
                reject(err);
            }
        });

        server.on('listening', () => {
            console.error(`[MCP-HTTP] Server listening on http://localhost:${port}`);
            resolve();
        });

        server.listen(port);
    });
}

/**
 * Register signal handlers for graceful shutdown
 */
function registerSignalHandlers(): void {
    process.on('SIGTERM', async () => {
        console.error('[MCP-HTTP] Received SIGTERM signal');
        await cleanup();
        process.exit(0);
    });

    process.on('SIGINT', async () => {
        console.error('[MCP-HTTP] Received SIGINT signal');
        await cleanup();
        process.exit(0);
    });

    if (process.platform === 'win32') {
        process.on('SIGHUP', async () => {
            console.error('[MCP-HTTP] Received SIGHUP signal');
            await cleanup();
            process.exit(0);
        });
    }

    process.on('uncaughtException', async (error) => {
        console.error('[MCP-HTTP] Uncaught exception:', error);
        await cleanup();
        process.exit(1);
    });

    process.on('unhandledRejection', async (reason) => {
        console.error('[MCP-HTTP] Unhandled rejection:', reason);
        await cleanup();
        process.exit(1);
    });

    process.on('beforeExit', async (code) => {
        if (!isShuttingDown) {
            console.error(`[MCP-HTTP] Before exit with code ${code}`);
            await cleanup();
        }
    });
}

export async function startStreamableHTTP() {
    // Register signal handlers first
    registerSignalHandlers();

    console.error('[MCP-HTTP] Starting Streamable HTTP server...');

    const app = express();
    app.use(express.json());

    // Add CORS middleware for Express routes
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, mcp-session-id');
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        } else {
            next();
        }
    });

    // Create HTTP server
    httpServer = http.createServer(app);
    
    // Create Socket.IO server attached to HTTP server
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
    
    socketServer.on('connection', (socket) => {
        try {
            console.error('[MCP-HTTP] Client connected:', socket.id);
            socket.on('disconnect', (reason) => {
                try {
                    console.error('[MCP-HTTP] Client disconnected:', socket.id, reason);
                } catch (error) {
                    console.error('[MCP-HTTP] Error in disconnect handler:', error);
                }
            });
            socket.on('error', (error) => {
                console.error('[MCP-HTTP] Socket error:', error);
            });
        } catch (error) {
            console.error('[MCP-HTTP] Error in connection handler:', error);
        }
    });
    
    socketServer.engine.on('connection_error', (err) => {
        console.error('[MCP-HTTP] Socket.IO connection error:', err);
    });

    // Map to store transports by session ID
    const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

    const server = await getServer(socketServer);

    app.post('/mcp', async (req: express.Request, res: express.Response) => {
        try {
            const sessionId = req.headers['mcp-session-id'] as string | undefined;
            let transport: StreamableHTTPServerTransport;

            if (sessionId && transports[sessionId]) {
                transport = transports[sessionId];
            } else if (!sessionId && isInitializeRequest(req.body)) {
                transport = new StreamableHTTPServerTransport({
                    sessionIdGenerator: () => generateUUID(),
                    onsessioninitialized: (sessionId) => {
                        transports[sessionId] = transport;
                    }
                });

                transport.onclose = () => {
                    if (transport.sessionId) {
                        delete transports[transport.sessionId];
                    }
                };

                await server.connect(transport);
            } else {
                res.status(400).json({
                    jsonrpc: '2.0',
                    error: {
                        code: -32000,
                        message: 'Bad Request: No valid session ID provided',
                    },
                    id: null,
                });
                return;
            }

            await transport.handleRequest(req, res, req.body);
        } catch (error) {
            console.error('[MCP-HTTP] Error handling MCP POST request:', error);
            if (!res.headersSent) {
                res.status(500).json({
                    jsonrpc: '2.0',
                    error: {
                        code: -32603,
                        message: 'Internal server error',
                    },
                    id: null,
                });
            }
        }
    });

    const handleSessionRequest = async (req: express.Request, res: express.Response) => {
        try {
            const sessionId = req.headers['mcp-session-id'] as string | undefined;
            if (!sessionId || !transports[sessionId]) {
                res.status(400).send('Invalid or missing session ID');
                return;
            }

            const transport = transports[sessionId];
            await transport.handleRequest(req, res);
        } catch (error) {
            console.error('[MCP-HTTP] Error handling session request:', error);
            if (!res.headersSent) {
                res.status(500).send('Internal server error');
            }
        }
    };

    app.get('/mcp', handleSessionRequest);
    app.delete('/mcp', handleSessionRequest);

    // Start the HTTP server with retry logic
    await startHttpServerWithRetry(httpServer, PORT);

    // Log connected clients periodically (for debugging)
    statusInterval = setInterval(() => {
        if (socketServer) {
            const clients = Array.from(socketServer.sockets.sockets.keys());
            if (clients.length > 0) {
                console.error('[MCP-HTTP] Connected clients:', clients);
            }
        }
    }, 10000);

    console.error('[MCP-HTTP] Streamable HTTP server started successfully');
}

// Export cleanup for external use
export { cleanup };
