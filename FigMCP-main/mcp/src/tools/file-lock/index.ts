import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../safe-tool-processor.js";
import * as FL from "../../shared/types/params/file-lock/index.js";

export function registerFileLockTools(server: McpServer, taskManager: TaskManager) {
  // ============================================
  // FILE-LEVEL LOCKING
  // ============================================
  
  server.tool(
    "acquire-file-lock",
    `Acquire an EXCLUSIVE lock on the entire Figma file for this agent.
    
Only ONE agent can hold a file lock at a time. While file-locked:
- No other agent can acquire file or context locks
- Use for major refactoring or file-wide operations

Returns error if file is already locked by another agent (use force: true to steal lock).
Call 'release-file-lock' when work is complete.`,
    FL.AcquireFileLockParamsSchema.shape,
    async (p) => await safeToolProcessor(taskManager.runTask("acquire-file-lock", p))
  );

  server.tool(
    "release-file-lock",
    `Release the file lock held by this agent.
    
MUST be called when agent finishes work to allow other agents to access the file.
Returns error if trying to release a lock held by another agent (unless force: true).`,
    FL.ReleaseFileLockParamsSchema.shape,
    async (p) => await safeToolProcessor(taskManager.runTask("release-file-lock", p))
  );

  // ============================================
  // CONTEXT-LEVEL LOCKING (Parallel Work)
  // ============================================

  server.tool(
    "acquire-context-lock",
    `Acquire a lock on a specific page, frame, or component within the Figma file.
    
ENABLES PARALLEL WORK: Multiple agents can work on the SAME file simultaneously
if they lock DIFFERENT contexts (e.g., Agent 1 locks Page 1, Agent 2 locks Page 2).

Lock will fail if:
- File is exclusively locked by another agent
- Same context is already locked by another agent

Use force: true to steal locks (use with caution).`,
    FL.AcquireContextLockParamsSchema.shape,
    async (p) => await safeToolProcessor(taskManager.runTask("acquire-context-lock", p))
  );

  server.tool(
    "release-context-lock",
    `Release a specific context lock held by this agent.
    
Call when done working on a specific page/frame/component.
Other locks held by this agent remain active.`,
    FL.ReleaseContextLockParamsSchema.shape,
    async (p) => await safeToolProcessor(taskManager.runTask("release-context-lock", p))
  );

  // ============================================
  // UTILITY OPERATIONS
  // ============================================

  server.tool(
    "release-all-locks",
    `Release ALL locks (file and context) held by this agent.
    
Use when:
- Agent is done with all work
- Agent needs to clean up before switching tasks
- Error recovery / cleanup scenarios`,
    FL.ReleaseAllLocksParamsSchema.shape,
    async (p) => await safeToolProcessor(taskManager.runTask("release-all-locks", p))
  );

  server.tool(
    "get-lock-status",
    `Get the current lock status of the Figma file.
    
Returns:
- fileLock: Details of file-level lock if exists (agentId, lockedAt, duration)
- contextLocks: Array of all context locks with their owners
- totalLocks: Total number of active locks

Use to:
- Check if file is available before starting work
- See which agents are currently working on the file
- Debug lock conflicts`,
    FL.GetLockStatusParamsSchema.shape,
    async (p) => await safeToolProcessor(taskManager.runTask("get-lock-status", p))
  );
}
