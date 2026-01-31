import { z } from "zod";

// ============================================
// DESIGN SYSTEM EXTENDED TOOL SCHEMAS (30 tools)
// ============================================

// ============================================
// TOKEN MANAGEMENT (10 tools)
// ============================================

// 1. Create Color Tokens
export const CreateColorTokensParamsSchema = z.object({
    name: z.string().optional().default("Color Tokens"),
    colors: z.object({
        primary: z.object({
            50: z.string().optional(),
            100: z.string().optional(),
            200: z.string().optional(),
            300: z.string().optional(),
            400: z.string().optional(),
            500: z.string().describe("Main primary color"),
            600: z.string().optional(),
            700: z.string().optional(),
            800: z.string().optional(),
            900: z.string().optional(),
        }).optional(),
        secondary: z.object({
            50: z.string().optional(),
            100: z.string().optional(),
            200: z.string().optional(),
            300: z.string().optional(),
            400: z.string().optional(),
            500: z.string().optional(),
            600: z.string().optional(),
            700: z.string().optional(),
            800: z.string().optional(),
            900: z.string().optional(),
        }).optional(),
        neutral: z.object({
            50: z.string().optional(),
            100: z.string().optional(),
            200: z.string().optional(),
            300: z.string().optional(),
            400: z.string().optional(),
            500: z.string().optional(),
            600: z.string().optional(),
            700: z.string().optional(),
            800: z.string().optional(),
            900: z.string().optional(),
        }).optional(),
        semantic: z.object({
            success: z.string().optional(),
            warning: z.string().optional(),
            error: z.string().optional(),
            info: z.string().optional(),
        }).optional(),
    }).optional(),
    generateFromBase: z.string().optional().describe("Generate palette from base color"),
    createFigmaVariables: z.boolean().optional().default(true),
    parentId: z.string().optional(),
});
export type CreateColorTokensParams = z.infer<typeof CreateColorTokensParamsSchema>;

// 2. Create Spacing Tokens
export const CreateSpacingTokensParamsSchema = z.object({
    name: z.string().optional().default("Spacing Tokens"),
    baseUnit: z.number().optional().default(4).describe("Base spacing unit in px"),
    scale: z.array(z.number()).optional().default([1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64]),
    naming: z.enum(["numeric", "t-shirt", "semantic"]).optional().default("numeric"),
    createFigmaVariables: z.boolean().optional().default(true),
    parentId: z.string().optional(),
});
export type CreateSpacingTokensParams = z.infer<typeof CreateSpacingTokensParamsSchema>;

// 3. Create Typography Tokens
export const CreateTypographyTokensParamsSchema = z.object({
    name: z.string().optional().default("Typography Tokens"),
    fontFamily: z.object({
        heading: z.string().optional().default("Inter"),
        body: z.string().optional().default("Inter"),
        mono: z.string().optional().default("JetBrains Mono"),
    }).optional(),
    scale: z.object({
        ratio: z.number().optional().default(1.25).describe("Type scale ratio"),
        baseSize: z.number().optional().default(16),
        levels: z.number().optional().default(6),
    }).optional(),
    weights: z.array(z.number()).optional().default([400, 500, 600, 700]),
    lineHeights: z.object({
        tight: z.number().optional().default(1.1),
        normal: z.number().optional().default(1.5),
        relaxed: z.number().optional().default(1.75),
    }).optional(),
    createFigmaStyles: z.boolean().optional().default(true),
    parentId: z.string().optional(),
});
export type CreateTypographyTokensParams = z.infer<typeof CreateTypographyTokensParamsSchema>;

// 4. Create Shadow Tokens
export const CreateShadowTokensParamsSchema = z.object({
    name: z.string().optional().default("Shadow Tokens"),
    elevations: z.array(z.object({
        name: z.string().describe("Elevation name (e.g., sm, md, lg)"),
        layers: z.array(z.object({
            offsetX: z.number(),
            offsetY: z.number(),
            blur: z.number(),
            spread: z.number().optional(),
            color: z.string(),
            opacity: z.number().optional(),
        })),
    })).optional(),
    generateFromBase: z.boolean().optional().default(true),
    baseColor: z.string().optional().default("#000000"),
    createFigmaStyles: z.boolean().optional().default(true),
    parentId: z.string().optional(),
});
export type CreateShadowTokensParams = z.infer<typeof CreateShadowTokensParamsSchema>;

// 5. Create Radius Tokens
export const CreateRadiusTokensParamsSchema = z.object({
    name: z.string().optional().default("Radius Tokens"),
    values: z.record(z.number()).optional().describe("Named radius values"),
    scale: z.array(z.number()).optional().default([0, 2, 4, 6, 8, 12, 16, 24, 9999]),
    naming: z.enum(["numeric", "t-shirt", "semantic"]).optional().default("t-shirt"),
    createFigmaVariables: z.boolean().optional().default(true),
    parentId: z.string().optional(),
});
export type CreateRadiusTokensParams = z.infer<typeof CreateRadiusTokensParamsSchema>;

// 6. Create Border Tokens
export const CreateBorderTokensParamsSchema = z.object({
    name: z.string().optional().default("Border Tokens"),
    widths: z.array(z.number()).optional().default([1, 2, 4]),
    styles: z.array(z.enum(["solid", "dashed", "dotted"])).optional().default(["solid"]),
    colors: z.record(z.string()).optional(),
    createFigmaVariables: z.boolean().optional().default(true),
    parentId: z.string().optional(),
});
export type CreateBorderTokensParams = z.infer<typeof CreateBorderTokensParamsSchema>;

// 7. Create Animation Tokens
export const CreateAnimationTokensParamsSchema = z.object({
    name: z.string().optional().default("Animation Tokens"),
    durations: z.object({
        instant: z.number().optional().default(100),
        fast: z.number().optional().default(150),
        normal: z.number().optional().default(250),
        slow: z.number().optional().default(350),
        slower: z.number().optional().default(500),
    }).optional(),
    easings: z.object({
        linear: z.string().optional().default("linear"),
        easeIn: z.string().optional().default("cubic-bezier(0.4, 0, 1, 1)"),
        easeOut: z.string().optional().default("cubic-bezier(0, 0, 0.2, 1)"),
        easeInOut: z.string().optional().default("cubic-bezier(0.4, 0, 0.2, 1)"),
        spring: z.string().optional().default("cubic-bezier(0.34, 1.56, 0.64, 1)"),
    }).optional(),
    parentId: z.string().optional(),
});
export type CreateAnimationTokensParams = z.infer<typeof CreateAnimationTokensParamsSchema>;

// 8. Create Breakpoint Tokens
export const CreateBreakpointTokensParamsSchema = z.object({
    name: z.string().optional().default("Breakpoint Tokens"),
    breakpoints: z.object({
        xs: z.number().optional().default(320),
        sm: z.number().optional().default(640),
        md: z.number().optional().default(768),
        lg: z.number().optional().default(1024),
        xl: z.number().optional().default(1280),
        xxl: z.number().optional().default(1536),
    }).optional(),
    approach: z.enum(["mobile-first", "desktop-first"]).optional().default("mobile-first"),
    parentId: z.string().optional(),
});
export type CreateBreakpointTokensParams = z.infer<typeof CreateBreakpointTokensParamsSchema>;

// 9. Create Z-Index Tokens
export const CreateZIndexTokensParamsSchema = z.object({
    name: z.string().optional().default("Z-Index Tokens"),
    layers: z.object({
        base: z.number().optional().default(0),
        dropdown: z.number().optional().default(1000),
        sticky: z.number().optional().default(1020),
        fixed: z.number().optional().default(1030),
        modalBackdrop: z.number().optional().default(1040),
        modal: z.number().optional().default(1050),
        popover: z.number().optional().default(1060),
        tooltip: z.number().optional().default(1070),
        toast: z.number().optional().default(1080),
    }).optional(),
    parentId: z.string().optional(),
});
export type CreateZIndexTokensParams = z.infer<typeof CreateZIndexTokensParamsSchema>;

// 10. Sync Tokens to Figma
export const SyncTokensToFigmaParamsSchema = z.object({
    source: z.enum(["json", "css", "tailwind", "style-dictionary"]).describe("Token source format"),
    tokensJson: z.string().optional().describe("JSON string of tokens"),
    tokensUrl: z.string().optional().describe("URL to fetch tokens from"),
    createVariables: z.boolean().optional().default(true),
    createStyles: z.boolean().optional().default(true),
    overwriteExisting: z.boolean().optional().default(false),
    collection: z.string().optional().describe("Variable collection name"),
});
export type SyncTokensToFigmaParams = z.infer<typeof SyncTokensToFigmaParamsSchema>;

// ============================================
// COMPONENT LIBRARY (10 tools)
// ============================================

// 11. Create Component Doc
export const CreateComponentDocParamsSchema = z.object({
    componentId: z.string().describe("Component to document"),
    name: z.string().optional(),
    description: z.string().optional(),
    usage: z.string().optional().describe("When to use this component"),
    anatomy: z.array(z.object({
        part: z.string(),
        description: z.string(),
        required: z.boolean().optional(),
    })).optional(),
    accessibility: z.array(z.string()).optional(),
    parentId: z.string().optional(),
});
export type CreateComponentDocParams = z.infer<typeof CreateComponentDocParamsSchema>;

// 12. Create Component Variants
export const CreateComponentVariantsParamsSchema = z.object({
    componentId: z.string().describe("Base component ID"),
    variants: z.array(z.object({
        name: z.string().describe("Variant name"),
        properties: z.record(z.any()).describe("Variant properties"),
    })),
    combineAllProperties: z.boolean().optional().default(false),
    parentId: z.string().optional(),
});
export type CreateComponentVariantsParams = z.infer<typeof CreateComponentVariantsParamsSchema>;

// 13. Create Component States
export const CreateComponentStatesParamsSchema = z.object({
    componentId: z.string().describe("Component ID"),
    states: z.array(z.enum(["default", "hover", "active", "focus", "disabled", "loading", "error", "success"])),
    showLabels: z.boolean().optional().default(true),
    layout: z.enum(["horizontal", "vertical", "grid"]).optional().default("horizontal"),
    parentId: z.string().optional(),
});
export type CreateComponentStatesParams = z.infer<typeof CreateComponentStatesParamsSchema>;

// 14. Create Component Anatomy
export const CreateComponentAnatomyParamsSchema = z.object({
    componentId: z.string().describe("Component ID"),
    showLabels: z.boolean().optional().default(true),
    showDimensions: z.boolean().optional().default(true),
    showSpacing: z.boolean().optional().default(true),
    labelStyle: z.enum(["callout", "inline", "numbered"]).optional().default("callout"),
    parentId: z.string().optional(),
});
export type CreateComponentAnatomyParams = z.infer<typeof CreateComponentAnatomyParamsSchema>;

// 15. Create Component Specs
export const CreateComponentSpecsParamsSchema = z.object({
    componentId: z.string().describe("Component ID"),
    includeColors: z.boolean().optional().default(true),
    includeTypography: z.boolean().optional().default(true),
    includeSpacing: z.boolean().optional().default(true),
    includeBorders: z.boolean().optional().default(true),
    includeEffects: z.boolean().optional().default(true),
    format: z.enum(["visual", "table", "json"]).optional().default("visual"),
    parentId: z.string().optional(),
});
export type CreateComponentSpecsParams = z.infer<typeof CreateComponentSpecsParamsSchema>;

// 16. Create Component Usage
export const CreateComponentUsageParamsSchema = z.object({
    componentId: z.string().describe("Component ID"),
    examples: z.array(z.object({
        title: z.string(),
        description: z.string().optional(),
        context: z.string().optional().describe("Usage context"),
    })).optional(),
    bestPractices: z.array(z.string()).optional(),
    commonMistakes: z.array(z.string()).optional(),
    parentId: z.string().optional(),
});
export type CreateComponentUsageParams = z.infer<typeof CreateComponentUsageParamsSchema>;

// 17. Create Component Dos Donts
export const CreateComponentDosDontsParamsSchema = z.object({
    componentId: z.string().describe("Component ID"),
    items: z.array(z.object({
        do: z.object({
            description: z.string(),
            example: z.string().optional(),
        }),
        dont: z.object({
            description: z.string(),
            example: z.string().optional(),
        }),
    })),
    layout: z.enum(["side-by-side", "stacked"]).optional().default("side-by-side"),
    parentId: z.string().optional(),
});
export type CreateComponentDosDontsParams = z.infer<typeof CreateComponentDosDontsParamsSchema>;

// 18. Create Component Changelog
export const CreateComponentChangelogParamsSchema = z.object({
    componentId: z.string().describe("Component ID"),
    entries: z.array(z.object({
        version: z.string(),
        date: z.string(),
        changes: z.array(z.object({
            type: z.enum(["added", "changed", "deprecated", "removed", "fixed", "security"]),
            description: z.string(),
        })),
    })),
    parentId: z.string().optional(),
});
export type CreateComponentChangelogParams = z.infer<typeof CreateComponentChangelogParamsSchema>;

// 19. Create Component Playground
export const CreateComponentPlaygroundParamsSchema = z.object({
    componentId: z.string().describe("Component ID"),
    controls: z.array(z.object({
        property: z.string(),
        type: z.enum(["boolean", "select", "text", "number", "color"]),
        options: z.array(z.string()).optional(),
        defaultValue: z.any().optional(),
    })).optional(),
    showCode: z.boolean().optional().default(true),
    parentId: z.string().optional(),
});
export type CreateComponentPlaygroundParams = z.infer<typeof CreateComponentPlaygroundParamsSchema>;

// 20. Validate Component Structure
export const ValidateComponentStructureParamsSchema = z.object({
    componentId: z.string().describe("Component ID to validate"),
    rules: z.object({
        hasAutoLayout: z.boolean().optional().default(true),
        hasVariants: z.boolean().optional(),
        maxDepth: z.number().optional().default(5),
        hasDescription: z.boolean().optional().default(true),
        namingPattern: z.string().optional(),
    }).optional(),
    autoFix: z.boolean().optional().default(false),
});
export type ValidateComponentStructureParams = z.infer<typeof ValidateComponentStructureParamsSchema>;

// ============================================
// DOCUMENTATION (10 tools)
// ============================================

// 21. Generate Design Principles
export const GenerateDesignPrinciplesParamsSchema = z.object({
    brandName: z.string().optional(),
    principles: z.array(z.object({
        title: z.string(),
        description: z.string(),
        example: z.string().optional(),
        icon: z.string().optional(),
    })).optional(),
    count: z.number().optional().default(5).describe("Number of principles to generate"),
    style: z.enum(["cards", "list", "detailed"]).optional().default("cards"),
    parentId: z.string().optional(),
});
export type GenerateDesignPrinciplesParams = z.infer<typeof GenerateDesignPrinciplesParamsSchema>;

// 22. Generate Brand Guidelines
export const GenerateBrandGuidelinesParamsSchema = z.object({
    brandName: z.string(),
    sections: z.array(z.enum(["logo", "colors", "typography", "imagery", "voice", "applications"])).optional(),
    logoUrl: z.string().optional(),
    primaryColor: z.string().optional(),
    tagline: z.string().optional(),
    parentId: z.string().optional(),
});
export type GenerateBrandGuidelinesParams = z.infer<typeof GenerateBrandGuidelinesParamsSchema>;

// 23. Generate Icon Guidelines
export const GenerateIconGuidelinesParamsSchema = z.object({
    gridSize: z.number().optional().default(24),
    strokeWidth: z.number().optional().default(2),
    cornerRadius: z.number().optional().default(2),
    style: z.enum(["outline", "filled", "duotone"]).optional().default("outline"),
    principles: z.array(z.string()).optional(),
    examples: z.array(z.object({
        name: z.string(),
        category: z.string().optional(),
    })).optional(),
    parentId: z.string().optional(),
});
export type GenerateIconGuidelinesParams = z.infer<typeof GenerateIconGuidelinesParamsSchema>;

// 24. Generate Illustration Guidelines
export const GenerateIllustrationGuidelinesParamsSchema = z.object({
    style: z.enum(["flat", "isometric", "3d", "hand-drawn", "line-art"]).optional(),
    colors: z.array(z.string()).optional(),
    characters: z.object({
        style: z.string().optional(),
        proportions: z.string().optional(),
        expressions: z.array(z.string()).optional(),
    }).optional(),
    dosAndDonts: z.array(z.object({
        do: z.string(),
        dont: z.string(),
    })).optional(),
    parentId: z.string().optional(),
});
export type GenerateIllustrationGuidelinesParams = z.infer<typeof GenerateIllustrationGuidelinesParamsSchema>;

// 25. Generate Motion Guidelines
export const GenerateMotionGuidelinesParamsSchema = z.object({
    principles: z.array(z.string()).optional(),
    timings: z.object({
        micro: z.number().optional().default(100),
        short: z.number().optional().default(200),
        medium: z.number().optional().default(300),
        long: z.number().optional().default(500),
    }).optional(),
    easings: z.record(z.string()).optional(),
    examples: z.array(z.object({
        name: z.string(),
        type: z.enum(["entrance", "exit", "emphasis", "transition"]),
        description: z.string().optional(),
    })).optional(),
    parentId: z.string().optional(),
});
export type GenerateMotionGuidelinesParams = z.infer<typeof GenerateMotionGuidelinesParamsSchema>;

// 26. Generate Writing Guidelines
export const GenerateWritingGuidelinesParamsSchema = z.object({
    voiceAttributes: z.array(z.string()).optional(),
    toneByContext: z.record(z.string()).optional(),
    grammarRules: z.array(z.string()).optional(),
    terminology: z.array(z.object({
        term: z.string(),
        use: z.string(),
        avoid: z.string().optional(),
    })).optional(),
    examples: z.array(z.object({
        context: z.string(),
        good: z.string(),
        bad: z.string(),
    })).optional(),
    parentId: z.string().optional(),
});
export type GenerateWritingGuidelinesParams = z.infer<typeof GenerateWritingGuidelinesParamsSchema>;

// 27. Generate Accessibility Guidelines
export const GenerateAccessibilityGuidelinesParamsSchema = z.object({
    level: z.enum(["A", "AA", "AAA"]).optional().default("AA"),
    categories: z.array(z.enum(["color", "typography", "interaction", "navigation", "forms", "media"])).optional(),
    includeChecklist: z.boolean().optional().default(true),
    includeExamples: z.boolean().optional().default(true),
    parentId: z.string().optional(),
});
export type GenerateAccessibilityGuidelinesParams = z.infer<typeof GenerateAccessibilityGuidelinesParamsSchema>;

// 28. Generate Contribution Guide
export const GenerateContributionGuideParamsSchema = z.object({
    sections: z.array(z.enum(["getting-started", "naming", "structure", "review", "versioning"])).optional(),
    namingConvention: z.string().optional(),
    reviewProcess: z.array(z.string()).optional(),
    tools: z.array(z.string()).optional(),
    parentId: z.string().optional(),
});
export type GenerateContributionGuideParams = z.infer<typeof GenerateContributionGuideParamsSchema>;

// 29. Generate Changelog
export const GenerateChangelogParamsSchema = z.object({
    entries: z.array(z.object({
        version: z.string(),
        date: z.string(),
        sections: z.object({
            added: z.array(z.string()).optional(),
            changed: z.array(z.string()).optional(),
            deprecated: z.array(z.string()).optional(),
            removed: z.array(z.string()).optional(),
            fixed: z.array(z.string()).optional(),
            security: z.array(z.string()).optional(),
        }),
    })),
    format: z.enum(["visual", "markdown", "timeline"]).optional().default("visual"),
    parentId: z.string().optional(),
});
export type GenerateChangelogParams = z.infer<typeof GenerateChangelogParamsSchema>;

// 30. Generate Migration Guide
export const GenerateMigrationGuideParamsSchema = z.object({
    fromVersion: z.string(),
    toVersion: z.string(),
    breakingChanges: z.array(z.object({
        component: z.string(),
        change: z.string(),
        migration: z.string(),
        codeExample: z.object({
            before: z.string(),
            after: z.string(),
        }).optional(),
    })),
    deprecations: z.array(z.object({
        item: z.string(),
        replacement: z.string().optional(),
        removeInVersion: z.string().optional(),
    })).optional(),
    parentId: z.string().optional(),
});
export type GenerateMigrationGuideParams = z.infer<typeof GenerateMigrationGuideParamsSchema>;
