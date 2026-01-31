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

// Export PORT from parsed config (defaults to 38451 if not set)
export const PORT = envStartSchema.parse(process.env).PORT;

export const filePaths = {
    indexPath: path.join(process.cwd(), 'mcp-all', 'mcp-search-index.json'),
    mcpConfigPath: path.join(process.cwd(), 'mcp-all', 'mcp-config.json'),
}

export type EnvStartConfig = z.infer<typeof envStartSchema>;

export const config = { ...envStartSchema.parse(process.env), ...filePaths };

export type Config = z.infer<typeof envStartSchema> & typeof filePaths;