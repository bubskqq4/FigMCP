import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { generateUUID } from "./utils.js";

type TaskStatus = "pending" | "in_progress" | "completed" | "failed" | "timed_out";

export interface TaskResult {
    isError: boolean;
    content?: any;
}

interface Task {
    id: string;
    command: string;
    args: any;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
    resolve: (result: TaskResult) => void;
    reject: (result: TaskResult) => void;
    result: any;
    timeoutHandle?: ReturnType<typeof setTimeout>;
}

// Task manager is responsible for managing the tasks.
// Task could be added, updated and removed.
// Events are raised when a task is added or updated
export class TaskManager {
    private tasks: Map<string, Task> = new Map();
    
    // Maximum number of completed tasks to keep in history (for debugging)
    private static readonly MAX_COMPLETED_HISTORY = 50;
    private completedTaskIds: string[] = [];

    // Default timeout: 30 seconds (was 5 seconds - way too short for complex operations)
    private static readonly DEFAULT_TIMEOUT_MS = 30000;
    
    // Timeout overrides for specific commands (some operations need more time)
    private static readonly COMMAND_TIMEOUTS: Record<string, number> = {
        // Tree/traversal operations
        'get-layer-tree': 60000,      // 60s for full document traversal
        'get-node-tree': 60000,       // 60s for tree operations
        
        // Complex UI pattern generation
        'create-landing-page': 45000, // 45s for complex page generation
        'create-dashboard-layout': 45000,
        'create-ecommerce-layout': 45000,
        
        // Design system token operations
        'create-color-tokens': 45000,
        'create-spacing-tokens': 45000,
        'create-typography-tokens': 45000,
        'create-shadow-tokens': 45000,
        'create-radius-tokens': 45000,
        'create-border-tokens': 45000,
        'create-animation-tokens': 45000,
        'create-breakpoint-tokens': 45000,
        'create-zindex-tokens': 45000,
        'sync-tokens-to-figma': 60000,
        
        // Component documentation (can be slow for large components)
        'create-component-doc': 45000,
        'create-component-variants': 45000,
        'create-component-states': 45000,
        'create-component-anatomy': 45000,
        'create-component-specs': 45000,
        
        // Documentation generation
        'generate-design-principles': 45000,
        'generate-brand-guidelines': 45000,
        'generate-accessibility-guidelines': 45000,
    };

    public runTask<TResult, TArgs>(
        command: string,
        args: TArgs,
        timeoutMs?: number): Promise<TResult> {
        const id = generateUUID();
        
        // Determine timeout: explicit > command-specific > default
        const timeout = timeoutMs 
            ?? TaskManager.COMMAND_TIMEOUTS[command] 
            ?? TaskManager.DEFAULT_TIMEOUT_MS;
        
        const promise = new Promise((resolve, reject) => {
            const timeoutHandle = setTimeout(() => {
                this.updateTask(id, { error: `Task timed out after ${timeout}ms` }, "timed_out");
            }, timeout);
            
            this.addTask(id, command, args, resolve, reject, timeoutHandle);
        });
        return promise as Promise<any>;
    }

    public addTask<TArgs>(id: string,
        command: string,
        args: TArgs,
        resolve: (result: any) => void,
        reject: (result: any) => void,
        timeoutHandle?: ReturnType<typeof setTimeout>) {
        const task: Task = {
            id: id,
            command: command,
            args: args,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date(),
            resolve: resolve,
            reject: reject,
            result: null,
        };
        // Only set timeoutHandle if provided (exactOptionalPropertyTypes compliance)
        if (timeoutHandle !== undefined) {
            task.timeoutHandle = timeoutHandle;
        }
        this.tasks.set(id, task);
        
        // Log active task count for monitoring
        console.error(`[TaskManager] Task added: ${command} (${id}). Active tasks: ${this.tasks.size}`);
        
        // Call the onTaskAdded event if subscriber(s) exist
        if (typeof this._onTaskAddedCallback === "function") {
            this._onTaskAddedCallback(task);
        }
    }
    
    /**
     * Clean up a completed task to prevent memory leaks
     */
    private cleanupTask(taskId: string) {
        const task = this.tasks.get(taskId);
        if (task) {
            // Clear timeout if still pending
            if (task.timeoutHandle) {
                clearTimeout(task.timeoutHandle);
            }
            
            // Remove from active tasks
            this.tasks.delete(taskId);
            
            // Track in history (limited)
            this.completedTaskIds.push(taskId);
            if (this.completedTaskIds.length > TaskManager.MAX_COMPLETED_HISTORY) {
                this.completedTaskIds.shift();
            }
            
            console.error(`[TaskManager] Task cleaned up: ${task.command} (${taskId}). Active tasks: ${this.tasks.size}`);
        }
    }
    
    /**
     * Get current active task count for monitoring
     */
    public get activeTaskCount(): number {
        return this.tasks.size;
    }
    
    /**
     * Get status of active tasks for debugging
     */
    public getActiveTasksStatus(): Array<{ id: string; command: string; age: number; status: TaskStatus }> {
        const now = new Date();
        const status: Array<{ id: string; command: string; age: number; status: TaskStatus }> = [];
        
        for (const [id, task] of this.tasks) {
            const ageMs = now.getTime() - task.createdAt.getTime();
            status.push({
                id,
                command: task.command,
                age: ageMs,
                status: task.status,
            });
        }
        
        return status;
    }
    
    /**
     * Log active task status periodically for debugging
     */
    public logActiveTasksStatus(): void {
        const activeTasks = this.getActiveTasksStatus();
        
        if (activeTasks.length === 0) {
            console.error('[TaskManager] No active tasks');
            return;
        }
        
        console.error(`[TaskManager] Active tasks (${activeTasks.length}):`);
        for (const task of activeTasks) {
            const ageSeconds = Math.round(task.age / 1000);
            console.error(`  - ${task.command} (${task.id}): ${task.status}, age: ${ageSeconds}s`);
        }
    }

    private _onTaskAddedCallback?: (task: Task) => void;

    // Register a callback for when a task is added
    public onTaskAdded(callback: (task: Task) => void) {
        this._onTaskAddedCallback = callback;
    }

    public updateTask(id: string, result: any, status: TaskStatus) {
        const task = this.tasks.get(id);
        
        // Check if task was already cleaned up (from completed history)
        if (!task) {
            // Check if it was recently completed - this is normal for late responses
            if (this.completedTaskIds.includes(id)) {
                console.error(`[TaskManager] Late response for completed task ${id} - ignoring`);
            } else {
                console.error(`[TaskManager] Attempt to update unknown task ${id}`);
            }
            return;
        }
        
        // Prevent double-updates
        if (task.status === 'completed' || task.status === 'failed' || task.status === 'timed_out') {
            if (task.status !== 'completed') {
                console.error(`[TaskManager] Attempt to update task after ${task.status}: ${id}`);
            }
            return;
        }

        task.status = status;
        task.updatedAt = new Date();
        task.result = result;

        if (status === 'completed') {
            task.resolve({
                isError: false,
                content: result,
            });
            // Cleanup after successful completion
            this.cleanupTask(id);
        } else if (status === 'failed' || status === 'timed_out') {
            task.resolve({
                isError: true,
                content: result,
            });
            // Cleanup after failure/timeout
            this.cleanupTask(id);
        }
    }
}