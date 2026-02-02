import z from "zod";

// Lock types for context-level locking
export const LockType = z.enum(["file", "page", "frame", "component"]);
export type LockTypeValue = z.infer<typeof LockType>;

// ============================================
// FILE-LEVEL LOCK SCHEMAS
// ============================================

export const AcquireFileLockParamsSchema = z.object({
  agentId: z.string().describe("Unique identifier for the agent"),
  agentName: z.string().optional().describe("Human-readable agent name for display"),
  sessionId: z.string().optional().describe("Session identifier for grouping operations"),
  force: z.boolean().default(false).describe("Force acquire lock even if held by another agent"),
});
export type AcquireFileLockParams = z.infer<typeof AcquireFileLockParamsSchema>;

export const ReleaseFileLockParamsSchema = z.object({
  agentId: z.string().describe("Agent ID that currently holds the lock"),
  force: z.boolean().default(false).describe("Force release even if agent ID doesn't match"),
});
export type ReleaseFileLockParams = z.infer<typeof ReleaseFileLockParamsSchema>;

// ============================================
// CONTEXT-LEVEL LOCK SCHEMAS
// ============================================

export const AcquireContextLockParamsSchema = z.object({
  agentId: z.string().describe("Unique identifier for the agent"),
  agentName: z.string().optional().describe("Human-readable agent name for display"),
  contextType: LockType.describe("Type of context to lock: page, frame, or component"),
  contextId: z.string().describe("ID of the page, frame, or component to lock"),
  contextName: z.string().optional().describe("Human-readable name of the context"),
  force: z.boolean().default(false).describe("Force acquire lock even if held by another agent"),
});
export type AcquireContextLockParams = z.infer<typeof AcquireContextLockParamsSchema>;

export const ReleaseContextLockParamsSchema = z.object({
  agentId: z.string().describe("Agent ID that currently holds the lock"),
  contextId: z.string().describe("ID of the context to release"),
  force: z.boolean().default(false).describe("Force release even if agent ID doesn't match"),
});
export type ReleaseContextLockParams = z.infer<typeof ReleaseContextLockParamsSchema>;

// ============================================
// UTILITY LOCK SCHEMAS
// ============================================

export const ReleaseAllLocksParamsSchema = z.object({
  agentId: z.string().describe("Agent ID to release all locks for"),
});
export type ReleaseAllLocksParams = z.infer<typeof ReleaseAllLocksParamsSchema>;

export const GetLockStatusParamsSchema = z.object({});
export type GetLockStatusParams = z.infer<typeof GetLockStatusParamsSchema>;

// ============================================
// LOCK INFO INTERFACES
// ============================================

export interface LockInfo {
  lockType: LockTypeValue;
  agentId: string;
  agentName?: string;
  sessionId?: string;
  lockedAt: string;
  contextId?: string;
  contextName?: string;
}

export interface FileLockStatus {
  fileKey: string;
  fileName: string;
  fileLock: LockInfo | null;
  contextLocks: LockInfo[];
  totalLocks: number;
}

// ============================================
// INTERNAL STORAGE INTERFACES
// ============================================

export interface StoredFileLock {
  lockType: "file";
  agentId: string;
  agentName?: string;
  sessionId?: string;
  lockedAt: string;
}

export interface StoredContextLock {
  lockType: LockTypeValue;
  agentId: string;
  agentName?: string;
  contextId: string;
  contextName?: string;
  lockedAt: string;
}

export interface StoredContextLocks {
  locks: StoredContextLock[];
}
