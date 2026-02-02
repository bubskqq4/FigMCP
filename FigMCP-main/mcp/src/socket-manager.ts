import type { FromPluginMessage } from "@shared/types";
import type { Server, Socket } from "socket.io";

type SocketMessage = "start-task" | "task-finished" | "task-failed" | "heartbeat" | "keep-alive";

// Socket manager is the abstraction layer on the top of the socket.io library.
// It receives messages from the Figma plugin and raises events for the orchestrator to handle.
// It also send messages to the Figma plugin.
export class SocketManager {
    // Track connected clients
    private connectedSockets: Set<Socket> = new Set();
    private _isConnected: boolean = false;
    private _connectionCallbacks: Array<() => void> = [];
    private _lastActivityTime: Date = new Date();
    private _keepAliveInterval: ReturnType<typeof setInterval> | null = null;

    constructor(server: Server) {
        this.server = server;

        // Start server-side keep-alive ping every 5 seconds for instant responsiveness
        this._keepAliveInterval = setInterval(() => {
            this.sendKeepAlive();
        }, 5000);

        this.server.on('connection', (socket) => {
            // CRITICAL: Use console.error (stderr) not console.log (stdout)
            // MCP stdio protocol requires stdout to contain ONLY valid JSON-RPC messages
            console.error(`[SocketManager] Figma plugin connected (socket: ${socket.id})`);
            this.connectedSockets.add(socket);
            this._isConnected = true;
            this._lastActivityTime = new Date();
            
            // Notify any waiting tasks that connection is established
            this._connectionCallbacks.forEach(cb => cb());
            this._connectionCallbacks = [];

            socket.on('disconnect', (reason) => {
                // CRITICAL: Use console.error (stderr) not console.log (stdout)
                console.error(`[SocketManager] Figma plugin disconnected (socket: ${socket.id}, reason: ${reason})`);
                this.connectedSockets.delete(socket);
                this._isConnected = this.connectedSockets.size > 0;
            });

            socket.on('task-finished', (data: FromPluginMessage) => {
                try {
                    this._lastActivityTime = new Date();
                    if (this._onTaskFinishedCallback) {
                        this._onTaskFinishedCallback(data);
                    }
                } catch (error) {
                    console.error('Error in task-finished handler:', error);
                }
            });
    
            socket.on('task-failed', (data: FromPluginMessage) => {
                try {
                    this._lastActivityTime = new Date();
                    if (this._onTaskErrorCallback) {
                        this._onTaskErrorCallback(data);
                    }
                } catch (error) {
                    console.error('Error in task-failed handler:', error);
                }
            });
            
            // Handle heartbeat for connection health monitoring
            socket.on('heartbeat', () => {
                this._lastActivityTime = new Date();
                socket.emit('heartbeat-ack');
            });

            // Handle keep-alive ping from client
            socket.on('keep-alive-ping', () => {
                this._lastActivityTime = new Date();
                socket.emit('keep-alive-pong', { timestamp: Date.now() });
            });

            // Handle keep-alive pong response from client
            socket.on('keep-alive-pong', () => {
                this._lastActivityTime = new Date();
            });
        });
    }

    /**
     * Send keep-alive ping to all connected clients
     */
    private sendKeepAlive(): void {
        if (this._isConnected) {
            this.server.emit('keep-alive-ping', { timestamp: Date.now() });
        }
    }

    /**
     * Stop the keep-alive interval (for cleanup)
     */
    public stopKeepAlive(): void {
        if (this._keepAliveInterval) {
            clearInterval(this._keepAliveInterval);
            this._keepAliveInterval = null;
        }
    }

    /**
     * Check if Figma plugin is connected
     */
    public get isConnected(): boolean {
        return this._isConnected;
    }

    /**
     * Get number of connected clients
     */
    public get connectionCount(): number {
        return this.connectedSockets.size;
    }

    /**
     * Wait for connection with timeout
     */
    public waitForConnection(timeoutMs: number = 5000): Promise<boolean> {
        if (this._isConnected) {
            return Promise.resolve(true);
        }

        return new Promise((resolve) => {
            const timeout = setTimeout(() => {
                resolve(false);
            }, timeoutMs);

            this._connectionCallbacks.push(() => {
                clearTimeout(timeout);
                resolve(true);
            });
        });
    }

    public sendMessage(message: SocketMessage, data: any): boolean {
        if (!this._isConnected) {
            // CRITICAL: Use console.error (stderr) not console.warn
            // MCP stdio protocol requires stdout to contain ONLY valid JSON-RPC messages
            console.error(`[SocketManager] Cannot send message '${message}': No Figma plugin connected`);
            return false;
        }
        this._lastActivityTime = new Date();
        this.server.emit(message, data);
        return true;
    }
    
    /**
     * Get time since last activity (in ms)
     */
    public get timeSinceLastActivity(): number {
        return Date.now() - this._lastActivityTime.getTime();
    }
    
    /**
     * Get connection health status
     */
    public getHealthStatus(): { connected: boolean; connectionCount: number; lastActivityMs: number; healthy: boolean } {
        const lastActivityMs = this.timeSinceLastActivity;
        // Consider unhealthy if no activity for 2 minutes
        const healthy = this._isConnected && lastActivityMs < 120000;
        
        return {
            connected: this._isConnected,
            connectionCount: this.connectedSockets.size,
            lastActivityMs,
            healthy,
        };
    }

    private server: Server;

    // Events

    private _onTaskFinishedCallback?: (task: FromPluginMessage) => void;

    public onTaskFinished(callback: (task: FromPluginMessage) => void) {
        this._onTaskFinishedCallback = callback;
    }

    private _onTaskErrorCallback?: (task: FromPluginMessage) => void;
    public onTaskError(callback: (task: FromPluginMessage) => void) {
        this._onTaskErrorCallback = callback;
    }

}
