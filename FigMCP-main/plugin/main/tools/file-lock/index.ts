import { ToolResult } from "../tool-result";

// ============================================
// INTERFACES
// ============================================

export interface AcquireFileLockParams {
  agentId: string;
  agentName?: string;
  sessionId?: string;
  force?: boolean;
}

export interface ReleaseFileLockParams {
  agentId: string;
  force?: boolean;
}

export interface AcquireContextLockParams {
  agentId: string;
  agentName?: string;
  contextType: string;
  contextId: string;
  contextName?: string;
  force?: boolean;
}

export interface ReleaseContextLockParams {
  agentId: string;
  contextId: string;
  force?: boolean;
}

export interface ReleaseAllLocksParams {
  agentId: string;
}

export interface GetLockStatusParams {}

interface StoredFileLock {
  lockType: "file";
  agentId: string;
  agentName?: string;
  sessionId?: string;
  lockedAt: string;
}

interface StoredContextLock {
  lockType: string;
  agentId: string;
  agentName?: string;
  contextId: string;
  contextName?: string;
  lockedAt: string;
}

// ============================================
// STORAGE KEYS
// ============================================

const FILE_LOCK_KEY = "mcp_file_lock";
const CONTEXT_LOCKS_KEY = "mcp_context_locks";

// ============================================
// HELPER FUNCTIONS
// ============================================

function getFileLock(): StoredFileLock | null {
  const data = figma.root.getPluginData(FILE_LOCK_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data) as StoredFileLock;
  } catch {
    return null;
  }
}

function setFileLock(lock: StoredFileLock): void {
  figma.root.setPluginData(FILE_LOCK_KEY, JSON.stringify(lock));
}

function clearFileLock(): void {
  figma.root.setPluginData(FILE_LOCK_KEY, "");
}

function getContextLocks(): StoredContextLock[] {
  const data = figma.root.getPluginData(CONTEXT_LOCKS_KEY);
  if (!data) return [];
  try {
    const parsed = JSON.parse(data);
    return parsed.locks || [];
  } catch {
    return [];
  }
}

function setContextLocks(locks: StoredContextLock[]): void {
  figma.root.setPluginData(CONTEXT_LOCKS_KEY, JSON.stringify({ locks }));
}

function getLockDuration(lockedAt: string): number {
  return Date.now() - new Date(lockedAt).getTime();
}

// ============================================
// ACQUIRE FILE LOCK
// ============================================

export async function acquireFileLock(args: AcquireFileLockParams): Promise<ToolResult> {
  try {
    const existingFileLock = getFileLock();
    const existingContextLocks = getContextLocks();

    // Check if file is already locked by another agent
    if (existingFileLock && existingFileLock.agentId !== args.agentId) {
      if (!args.force) {
        return {
          isError: true,
          content: JSON.stringify({
            success: false,
            error: "FILE_LOCKED_BY_ANOTHER_AGENT",
            message: `File is locked by agent: ${existingFileLock.agentName || existingFileLock.agentId}`,
            lockInfo: {
              ...existingFileLock,
              lockDuration: getLockDuration(existingFileLock.lockedAt),
            },
          }),
        };
      }
    }

    // Check if there are context locks by other agents (file lock blocks all)
    if (!args.force) {
      const otherContextLocks = existingContextLocks.filter(l => l.agentId !== args.agentId);
      if (otherContextLocks.length > 0) {
        return {
          isError: true,
          content: JSON.stringify({
            success: false,
            error: "CONTEXT_LOCKS_EXIST",
            message: `Cannot acquire file lock: ${otherContextLocks.length} context lock(s) held by other agents`,
            contextLocks: otherContextLocks,
          }),
        };
      }
    }

    // Create file lock
    const lock: StoredFileLock = {
      lockType: "file",
      agentId: args.agentId,
      agentName: args.agentName,
      sessionId: args.sessionId,
      lockedAt: new Date().toISOString(),
    };

    setFileLock(lock);

    // If force, also clear context locks by this agent
    if (args.force) {
      setContextLocks([]);
    }

    return {
      isError: false,
      content: JSON.stringify({
        success: true,
        message: existingFileLock?.agentId === args.agentId
          ? "File lock refreshed"
          : args.force && existingFileLock
            ? "File lock forcefully acquired"
            : "File lock acquired successfully",
        lockInfo: lock,
        fileKey: figma.fileKey || "unknown",
        fileName: figma.root.name,
      }),
    };
  } catch (error) {
    return {
      isError: true,
      content: JSON.stringify({
        success: false,
        error: "LOCK_ACQUISITION_FAILED",
        message: `Failed to acquire file lock: ${error}`,
      }),
    };
  }
}

// ============================================
// RELEASE FILE LOCK
// ============================================

export async function releaseFileLock(args: ReleaseFileLockParams): Promise<ToolResult> {
  try {
    const existingLock = getFileLock();

    if (!existingLock) {
      return {
        isError: false,
        content: JSON.stringify({
          success: true,
          message: "No file lock to release",
          wasLocked: false,
        }),
      };
    }

    // Verify ownership
    if (existingLock.agentId !== args.agentId && !args.force) {
      return {
        isError: true,
        content: JSON.stringify({
          success: false,
          error: "NOT_LOCK_OWNER",
          message: `Cannot release lock held by: ${existingLock.agentName || existingLock.agentId}`,
          lockInfo: existingLock,
        }),
      };
    }

    const lockDuration = getLockDuration(existingLock.lockedAt);
    clearFileLock();

    return {
      isError: false,
      content: JSON.stringify({
        success: true,
        message: "File lock released successfully",
        wasLocked: true,
        releasedLock: {
          ...existingLock,
          lockDuration,
          lockDurationMinutes: Math.floor(lockDuration / 60000),
        },
        forcedRelease: args.force && existingLock.agentId !== args.agentId,
      }),
    };
  } catch (error) {
    return {
      isError: true,
      content: JSON.stringify({
        success: false,
        error: "LOCK_RELEASE_FAILED",
        message: `Failed to release file lock: ${error}`,
      }),
    };
  }
}

// ============================================
// ACQUIRE CONTEXT LOCK
// ============================================

export async function acquireContextLock(args: AcquireContextLockParams): Promise<ToolResult> {
  try {
    const fileLock = getFileLock();
    const contextLocks = getContextLocks();

    // Check if there's a file-level lock by another agent
    if (fileLock && fileLock.agentId !== args.agentId) {
      if (!args.force) {
        return {
          isError: true,
          content: JSON.stringify({
            success: false,
            error: "FILE_LOCKED_BY_ANOTHER_AGENT",
            message: `File is exclusively locked by: ${fileLock.agentName || fileLock.agentId}`,
            lockInfo: fileLock,
          }),
        };
      }
    }

    // Check if this specific context is already locked by another agent
    const existingContextLock = contextLocks.find(l => l.contextId === args.contextId);
    if (existingContextLock && existingContextLock.agentId !== args.agentId) {
      if (!args.force) {
        return {
          isError: true,
          content: JSON.stringify({
            success: false,
            error: "CONTEXT_LOCKED_BY_ANOTHER_AGENT",
            message: `Context is locked by: ${existingContextLock.agentName || existingContextLock.agentId}`,
            lockInfo: existingContextLock,
          }),
        };
      }
    }

    // Validate context exists
    const contextNode = await figma.getNodeByIdAsync(args.contextId);
    if (!contextNode) {
      return {
        isError: true,
        content: JSON.stringify({
          success: false,
          error: "CONTEXT_NOT_FOUND",
          message: `Context with ID ${args.contextId} not found`,
        }),
      };
    }

    // Create or update context lock
    const newLock: StoredContextLock = {
      lockType: args.contextType,
      agentId: args.agentId,
      agentName: args.agentName,
      contextId: args.contextId,
      contextName: args.contextName || contextNode.name,
      lockedAt: new Date().toISOString(),
    };

    // Update locks array
    const updatedLocks = contextLocks.filter(l => l.contextId !== args.contextId);
    updatedLocks.push(newLock);
    setContextLocks(updatedLocks);

    // If force and there was a file lock by another agent, clear it
    if (args.force && fileLock && fileLock.agentId !== args.agentId) {
      clearFileLock();
    }

    return {
      isError: false,
      content: JSON.stringify({
        success: true,
        message: existingContextLock?.agentId === args.agentId
          ? "Context lock refreshed"
          : args.force && existingContextLock
            ? "Context lock forcefully acquired"
            : "Context lock acquired successfully",
        lockInfo: newLock,
        fileKey: figma.fileKey || "unknown",
        fileName: figma.root.name,
      }),
    };
  } catch (error) {
    return {
      isError: true,
      content: JSON.stringify({
        success: false,
        error: "LOCK_ACQUISITION_FAILED",
        message: `Failed to acquire context lock: ${error}`,
      }),
    };
  }
}

// ============================================
// RELEASE CONTEXT LOCK
// ============================================

export async function releaseContextLock(args: ReleaseContextLockParams): Promise<ToolResult> {
  try {
    const contextLocks = getContextLocks();
    const existingLock = contextLocks.find(l => l.contextId === args.contextId);

    if (!existingLock) {
      return {
        isError: false,
        content: JSON.stringify({
          success: true,
          message: "No context lock to release for this context",
          wasLocked: false,
        }),
      };
    }

    // Verify ownership
    if (existingLock.agentId !== args.agentId && !args.force) {
      return {
        isError: true,
        content: JSON.stringify({
          success: false,
          error: "NOT_LOCK_OWNER",
          message: `Cannot release lock held by: ${existingLock.agentName || existingLock.agentId}`,
          lockInfo: existingLock,
        }),
      };
    }

    const lockDuration = getLockDuration(existingLock.lockedAt);
    
    // Remove this lock
    const updatedLocks = contextLocks.filter(l => l.contextId !== args.contextId);
    setContextLocks(updatedLocks);

    return {
      isError: false,
      content: JSON.stringify({
        success: true,
        message: "Context lock released successfully",
        wasLocked: true,
        releasedLock: {
          ...existingLock,
          lockDuration,
          lockDurationMinutes: Math.floor(lockDuration / 60000),
        },
        remainingLocks: updatedLocks.length,
        forcedRelease: args.force && existingLock.agentId !== args.agentId,
      }),
    };
  } catch (error) {
    return {
      isError: true,
      content: JSON.stringify({
        success: false,
        error: "LOCK_RELEASE_FAILED",
        message: `Failed to release context lock: ${error}`,
      }),
    };
  }
}

// ============================================
// RELEASE ALL LOCKS
// ============================================

export async function releaseAllLocks(args: ReleaseAllLocksParams): Promise<ToolResult> {
  try {
    const fileLock = getFileLock();
    const contextLocks = getContextLocks();

    let releasedFileLock = false;
    let releasedContextCount = 0;

    // Release file lock if owned by this agent
    if (fileLock && fileLock.agentId === args.agentId) {
      clearFileLock();
      releasedFileLock = true;
    }

    // Release all context locks owned by this agent
    const agentContextLocks = contextLocks.filter(l => l.agentId === args.agentId);
    const remainingLocks = contextLocks.filter(l => l.agentId !== args.agentId);
    
    if (agentContextLocks.length > 0) {
      releasedContextCount = agentContextLocks.length;
      setContextLocks(remainingLocks);
    }

    return {
      isError: false,
      content: JSON.stringify({
        success: true,
        message: `Released ${(releasedFileLock ? 1 : 0) + releasedContextCount} lock(s)`,
        releasedFileLock,
        releasedContextLocks: releasedContextCount,
        releasedContexts: agentContextLocks.map(l => ({
          contextId: l.contextId,
          contextName: l.contextName,
        })),
      }),
    };
  } catch (error) {
    return {
      isError: true,
      content: JSON.stringify({
        success: false,
        error: "RELEASE_ALL_FAILED",
        message: `Failed to release all locks: ${error}`,
      }),
    };
  }
}

// ============================================
// GET LOCK STATUS
// ============================================

export async function getLockStatus(_args: GetLockStatusParams): Promise<ToolResult> {
  try {
    const fileLock = getFileLock();
    const contextLocks = getContextLocks();

    const fileLockInfo = fileLock ? {
      ...fileLock,
      lockDuration: getLockDuration(fileLock.lockedAt),
      lockDurationMinutes: Math.floor(getLockDuration(fileLock.lockedAt) / 60000),
    } : null;

    const contextLocksInfo = contextLocks.map(l => ({
      ...l,
      lockDuration: getLockDuration(l.lockedAt),
      lockDurationMinutes: Math.floor(getLockDuration(l.lockedAt) / 60000),
    }));

    return {
      isError: false,
      content: JSON.stringify({
        fileKey: figma.fileKey || "unknown",
        fileName: figma.root.name,
        fileLock: fileLockInfo,
        contextLocks: contextLocksInfo,
        totalLocks: (fileLock ? 1 : 0) + contextLocks.length,
        isLocked: !!(fileLock || contextLocks.length > 0),
      }),
    };
  } catch (error) {
    return {
      isError: true,
      content: JSON.stringify({
        error: "GET_STATUS_FAILED",
        message: `Failed to get lock status: ${error}`,
      }),
    };
  }
}
