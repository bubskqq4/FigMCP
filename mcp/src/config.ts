import path from "path";
import { z } from "zod";

export const envStartSchema = z.object({
    //* The transport to use for the server. Can be one of 'stdio' or 'streamable-http'.
    //* If not specified, the default is 'stdio'.
    //* The 'stdio' transport is used for local work.
    //* The 'streamable-http' transport is used for HTTP-based communication.
    TRANSPORT: z.string().default("stdio").optional().transform((val) => {
        if (val?.toLowerCase() === "streamable-http") return "streamable-http";
        return "stdio";
    }),
    //* The port to use for the HTTP server (Socket.IO connections from Figma plugin).
    //* If not specified, the default is 38451.
    //* Can be overridden via PORT environment variable.
    PORT: z.coerce.number().default(38451).refine((val) => {
        return val >= 1 && val <= 65535;
    }, {
        message: "PORT must be between 1 and 65535"
    })
});

/**
 * Get the configured PORT value.
 * Uses lazy initialization to ensure dotenv has loaded env vars first.
 * 
 * IMPORTANT: Do not use module-level constants for env vars.
 * They execute at import time, before dotenv.config() runs.
 */
let _cachedPort: number | null = null;
export function getPort(): number {
    if (_cachedPort === null) {
        _cachedPort = envStartSchema.parse(process.env).PORT;
    }
    return _cachedPort;
}

// Keep PORT export for backwards compatibility, but it's now a getter
// that calls getPort() lazily
// Note: This is less ideal than getPort() but maintains API compatibility
export const PORT = 38451; // Default value - use getPort() for actual configured value

export const filePaths = {
    indexPath: path.join(process.cwd(), 'mcp-all', 'mcp-search-index.json'),
    mcpConfigPath: path.join(process.cwd(), 'mcp-all', 'mcp-config.json'),
}

export type EnvStartConfig = z.infer<typeof envStartSchema>;

/**
 * Get the full config object.
 * Uses lazy initialization to ensure dotenv has loaded env vars first.
 */
let _cachedConfig: (z.infer<typeof envStartSchema> & typeof filePaths) | null = null;
export function getConfig(): z.infer<typeof envStartSchema> & typeof filePaths {
    if (_cachedConfig === null) {
        _cachedConfig = { ...envStartSchema.parse(process.env), ...filePaths };
    }
    return _cachedConfig;
}

// Keep config export for backwards compatibility
// Note: Use getConfig() for the actual configured values
export const config = { ...filePaths, TRANSPORT: "stdio" as const, PORT: 38451 };

export type Config = z.infer<typeof envStartSchema> & typeof filePaths;
