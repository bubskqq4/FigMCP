import type { SocketManager } from "./socket-manager.js";
import type { TaskManager } from "./task-manager.js";

export class Orchestrator {

    constructor(socketManager: SocketManager, taskManager: TaskManager) {
        this.socketManager = socketManager;
        this.taskManager = taskManager;

        // Subscribe to task added events
        // Check connection before sending, fail fast if not connected
        this.taskManager.onTaskAdded((task) => {
            if (!this.socketManager.isConnected) {
                console.error(`[Orchestrator] Cannot execute task '${task.command}': Figma plugin is not connected.`);
                console.error(`[Orchestrator] Please ensure:`);
                console.error(`  1. Figma desktop app is open`);
                console.error(`  2. The FigMCP plugin is running in Figma`);
                console.error(`  3. The plugin is connected to this MCP server (port ${process.env.PORT || 38451})`);
                
                // Immediately fail the task with a helpful error message
                this.taskManager.updateTask(
                    task.id, 
                    { 
                        error: "Figma plugin not connected",
                        help: "Please open Figma and run the FigMCP plugin. Make sure the plugin shows 'Connected' status.",
                        connectionStatus: {
                            connected: false,
                            expectedPort: process.env.PORT || 38451
                        }
                    }, 
                    'failed'
                );
                return;
            }
            
            // IMPORTANT: Only send serializable task data to the plugin
            // The full task object contains non-serializable properties (resolve, reject functions)
            // which Socket.IO cannot handle properly
            const taskPayload = {
                id: task.id,
                command: task.command,
                args: task.args
            };
            
            const sent = this.socketManager.sendMessage('start-task', taskPayload);
            if (!sent) {
                this.taskManager.updateTask(
                    task.id,
                    { error: "Failed to send task to Figma plugin" },
                    'failed'
                );
            }
        });


        // Subscribe to task finished events
        // Raise task completed event in the task manager
        this.socketManager.onTaskFinished((task) => {
            this.taskManager.updateTask(task.taskId, task.content, 'completed');
        });

        // Subscribe to task failed events
        // Raise task failed event in the task manager on message received
        this.socketManager.onTaskError((task) => {
            this.taskManager.updateTask(task.taskId, task.content, 'failed');
        });
    }

    private socketManager: SocketManager;
    private taskManager: TaskManager;

}