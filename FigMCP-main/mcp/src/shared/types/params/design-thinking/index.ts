import { z } from "zod";

// ============================================
// DESIGN THINKING TOOL SCHEMAS (40 tools)
// ============================================

// Base schemas for common parameters
const BaseDesignThinkingParams = z.object({
    parentId: z.string().optional().describe("Parent frame ID to place the artifact in"),
    name: z.string().optional().describe("Name for the created artifact"),
    width: z.number().optional().describe("Width of the artifact"),
    height: z.number().optional().describe("Height of the artifact"),
});

// 1. Create Persona
export const CreatePersonaParamsSchema = z.object({
    name: z.string().describe("Persona name"),
    age: z.string().optional().describe("Age or age range"),
    occupation: z.string().optional().describe("Job title or occupation"),
    demographics: z.string().optional().describe("Demographic information"),
    goals: z.array(z.string()).optional().describe("List of user goals"),
    painPoints: z.array(z.string()).optional().describe("List of pain points"),
    behaviors: z.array(z.string()).optional().describe("List of behaviors"),
    motivations: z.array(z.string()).optional().describe("List of motivations"),
    quote: z.string().optional().describe("Representative quote"),
    bio: z.string().optional().describe("Short biography"),
    imageUrl: z.string().optional().describe("URL for persona avatar"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreatePersonaParams = z.infer<typeof CreatePersonaParamsSchema>;

// 2. Create Journey Map
export const CreateJourneyMapParamsSchema = z.object({
    personaName: z.string().optional().describe("Name of the persona"),
    scenario: z.string().describe("The scenario or goal being mapped"),
    stages: z.array(z.object({
        name: z.string().describe("Stage name"),
        actions: z.array(z.string()).optional().describe("User actions"),
        thoughts: z.array(z.string()).optional().describe("User thoughts"),
        emotions: z.string().optional().describe("Emotional state (positive/neutral/negative)"),
        touchpoints: z.array(z.string()).optional().describe("Touchpoints"),
        opportunities: z.array(z.string()).optional().describe("Improvement opportunities"),
    })).describe("Journey stages"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateJourneyMapParams = z.infer<typeof CreateJourneyMapParamsSchema>;

// 3. Create Empathy Map
export const CreateEmpathyMapParamsSchema = z.object({
    personaName: z.string().optional().describe("Name of the persona"),
    says: z.array(z.string()).describe("What the user says"),
    thinks: z.array(z.string()).describe("What the user thinks"),
    does: z.array(z.string()).describe("What the user does"),
    feels: z.array(z.string()).describe("What the user feels"),
    pains: z.array(z.string()).optional().describe("User pains"),
    gains: z.array(z.string()).optional().describe("User gains"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateEmpathyMapParams = z.infer<typeof CreateEmpathyMapParamsSchema>;

// 4. Create User Story
export const CreateUserStoryParamsSchema = z.object({
    asA: z.string().describe("As a [type of user]"),
    iWant: z.string().describe("I want [goal]"),
    soThat: z.string().describe("So that [benefit]"),
    acceptanceCriteria: z.array(z.string()).optional().describe("Acceptance criteria"),
    priority: z.enum(["high", "medium", "low"]).optional().describe("Priority level"),
    estimate: z.string().optional().describe("Story points or estimate"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateUserStoryParams = z.infer<typeof CreateUserStoryParamsSchema>;

// 5. Create Storyboard
export const CreateStoryboardParamsSchema = z.object({
    title: z.string().describe("Storyboard title"),
    scenario: z.string().optional().describe("Scenario description"),
    frames: z.array(z.object({
        title: z.string().optional().describe("Frame title"),
        description: z.string().describe("Frame description"),
        notes: z.string().optional().describe("Additional notes"),
    })).describe("Storyboard frames"),
    columns: z.number().optional().default(4).describe("Number of columns"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateStoryboardParams = z.infer<typeof CreateStoryboardParamsSchema>;

// 6. Create Wireframe
export const CreateWireframeParamsSchema = z.object({
    type: z.enum(["desktop", "tablet", "mobile"]).describe("Device type"),
    layout: z.enum(["single-column", "two-column", "sidebar", "dashboard", "landing"]).describe("Layout type"),
    sections: z.array(z.object({
        type: z.enum(["header", "hero", "content", "sidebar", "footer", "navigation", "form", "cards", "table", "cta"]),
        height: z.number().optional().describe("Section height"),
        notes: z.string().optional().describe("Section notes"),
    })).optional().describe("Sections to include"),
    fidelity: z.enum(["low", "medium"]).optional().default("low").describe("Wireframe fidelity"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateWireframeParams = z.infer<typeof CreateWireframeParamsSchema>;

// 7. Create Sitemap
export const CreateSitemapParamsSchema = z.object({
    title: z.string().describe("Site/app name"),
    pages: z.array(z.object({
        name: z.string().describe("Page name"),
        path: z.string().optional().describe("URL path"),
        children: z.array(z.object({
            name: z.string(),
            path: z.string().optional(),
            children: z.array(z.object({
                name: z.string(),
                path: z.string().optional(),
            })).optional(),
        })).optional().describe("Child pages"),
    })).describe("Top-level pages"),
    style: z.enum(["tree", "flowchart", "cards"]).optional().default("tree").describe("Visual style"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateSitemapParams = z.infer<typeof CreateSitemapParamsSchema>;

// 8. Create User Flow
export const CreateUserFlowParamsSchema = z.object({
    title: z.string().describe("Flow title"),
    startPoint: z.string().describe("Starting point"),
    endPoint: z.string().describe("End goal"),
    steps: z.array(z.object({
        type: z.enum(["action", "decision", "page", "system"]).describe("Step type"),
        label: z.string().describe("Step label"),
        options: z.array(z.object({
            label: z.string(),
            nextStep: z.number().optional(),
        })).optional().describe("Decision options"),
    })).describe("Flow steps"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateUserFlowParams = z.infer<typeof CreateUserFlowParamsSchema>;

// 9. Create Task Flow
export const CreateTaskFlowParamsSchema = z.object({
    taskName: z.string().describe("Task name"),
    steps: z.array(z.object({
        action: z.string().describe("User action"),
        screen: z.string().optional().describe("Screen/page name"),
        notes: z.string().optional().describe("Additional notes"),
    })).describe("Task steps"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateTaskFlowParams = z.infer<typeof CreateTaskFlowParamsSchema>;

// 10. Create Information Architecture
export const CreateInformationArchitectureParamsSchema = z.object({
    title: z.string().describe("IA title"),
    categories: z.array(z.object({
        name: z.string().describe("Category name"),
        items: z.array(z.object({
            name: z.string(),
            subitems: z.array(z.string()).optional(),
        })).describe("Category items"),
    })).describe("IA categories"),
    style: z.enum(["hierarchy", "matrix", "cards"]).optional().default("hierarchy"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateInformationArchitectureParams = z.infer<typeof CreateInformationArchitectureParamsSchema>;

// 11. Create Affinity Diagram
export const CreateAffinityDiagramParamsSchema = z.object({
    title: z.string().describe("Diagram title"),
    groups: z.array(z.object({
        name: z.string().describe("Group name"),
        items: z.array(z.string()).describe("Items in group"),
        color: z.string().optional().describe("Group color"),
    })).describe("Affinity groups"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateAffinityDiagramParams = z.infer<typeof CreateAffinityDiagramParamsSchema>;

// 12. Create Feature Matrix
export const CreateFeatureMatrixParamsSchema = z.object({
    title: z.string().describe("Matrix title"),
    features: z.array(z.string()).describe("Feature names"),
    competitors: z.array(z.object({
        name: z.string().describe("Competitor name"),
        features: z.array(z.boolean()).describe("Feature availability"),
    })).describe("Competitors and their features"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateFeatureMatrixParams = z.infer<typeof CreateFeatureMatrixParamsSchema>;

// 13. Create Priority Matrix
export const CreatePriorityMatrixParamsSchema = z.object({
    title: z.string().optional().default("Priority Matrix").describe("Matrix title"),
    items: z.array(z.object({
        name: z.string().describe("Item name"),
        impact: z.enum(["low", "medium", "high"]).describe("Impact level"),
        effort: z.enum(["low", "medium", "high"]).describe("Effort level"),
    })).describe("Items to prioritize"),
    axisLabels: z.object({
        x: z.string().optional().default("Effort"),
        y: z.string().optional().default("Impact"),
    }).optional(),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreatePriorityMatrixParams = z.infer<typeof CreatePriorityMatrixParamsSchema>;

// 14. Create Stakeholder Map
export const CreateStakeholderMapParamsSchema = z.object({
    title: z.string().optional().default("Stakeholder Map").describe("Map title"),
    stakeholders: z.array(z.object({
        name: z.string().describe("Stakeholder name"),
        role: z.string().optional().describe("Role or title"),
        influence: z.enum(["low", "medium", "high"]).describe("Level of influence"),
        interest: z.enum(["low", "medium", "high"]).describe("Level of interest"),
    })).describe("Stakeholders"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateStakeholderMapParams = z.infer<typeof CreateStakeholderMapParamsSchema>;

// 15. Create Competitive Analysis
export const CreateCompetitiveAnalysisParamsSchema = z.object({
    title: z.string().optional().default("Competitive Analysis").describe("Analysis title"),
    ourProduct: z.string().describe("Our product name"),
    competitors: z.array(z.object({
        name: z.string().describe("Competitor name"),
        strengths: z.array(z.string()).describe("Strengths"),
        weaknesses: z.array(z.string()).describe("Weaknesses"),
        positioning: z.string().optional().describe("Market positioning"),
        priceRange: z.string().optional().describe("Price range"),
    })).describe("Competitors"),
    criteria: z.array(z.string()).optional().describe("Comparison criteria"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateCompetitiveAnalysisParams = z.infer<typeof CreateCompetitiveAnalysisParamsSchema>;

// 16. Create SWOT Analysis
export const CreateSwotAnalysisParamsSchema = z.object({
    title: z.string().optional().default("SWOT Analysis").describe("Analysis title"),
    subject: z.string().optional().describe("Subject of analysis"),
    strengths: z.array(z.string()).describe("Strengths"),
    weaknesses: z.array(z.string()).describe("Weaknesses"),
    opportunities: z.array(z.string()).describe("Opportunities"),
    threats: z.array(z.string()).describe("Threats"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateSwotAnalysisParams = z.infer<typeof CreateSwotAnalysisParamsSchema>;

// 17. Create Value Proposition
export const CreateValuePropositionParamsSchema = z.object({
    customerSegment: z.object({
        jobs: z.array(z.string()).describe("Customer jobs"),
        pains: z.array(z.string()).describe("Customer pains"),
        gains: z.array(z.string()).describe("Customer gains"),
    }),
    valueMap: z.object({
        products: z.array(z.string()).describe("Products/services"),
        painRelievers: z.array(z.string()).describe("Pain relievers"),
        gainCreators: z.array(z.string()).describe("Gain creators"),
    }),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateValuePropositionParams = z.infer<typeof CreateValuePropositionParamsSchema>;

// 18. Create Business Model Canvas
export const CreateBusinessModelCanvasParamsSchema = z.object({
    title: z.string().optional().default("Business Model Canvas"),
    keyPartners: z.array(z.string()).optional(),
    keyActivities: z.array(z.string()).optional(),
    keyResources: z.array(z.string()).optional(),
    valuePropositions: z.array(z.string()).optional(),
    customerRelationships: z.array(z.string()).optional(),
    channels: z.array(z.string()).optional(),
    customerSegments: z.array(z.string()).optional(),
    costStructure: z.array(z.string()).optional(),
    revenueStreams: z.array(z.string()).optional(),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateBusinessModelCanvasParams = z.infer<typeof CreateBusinessModelCanvasParamsSchema>;

// 19. Create Lean Canvas
export const CreateLeanCanvasParamsSchema = z.object({
    title: z.string().optional().default("Lean Canvas"),
    problem: z.array(z.string()).optional(),
    solution: z.array(z.string()).optional(),
    keyMetrics: z.array(z.string()).optional(),
    uniqueValueProposition: z.string().optional(),
    unfairAdvantage: z.string().optional(),
    channels: z.array(z.string()).optional(),
    customerSegments: z.array(z.string()).optional(),
    costStructure: z.array(z.string()).optional(),
    revenueStreams: z.array(z.string()).optional(),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateLeanCanvasParams = z.infer<typeof CreateLeanCanvasParamsSchema>;

// 20. Create Design Brief
export const CreateDesignBriefParamsSchema = z.object({
    projectName: z.string().describe("Project name"),
    overview: z.string().describe("Project overview"),
    objectives: z.array(z.string()).describe("Design objectives"),
    targetAudience: z.string().describe("Target audience"),
    scope: z.array(z.string()).optional().describe("Project scope"),
    constraints: z.array(z.string()).optional().describe("Constraints"),
    timeline: z.string().optional().describe("Timeline"),
    budget: z.string().optional().describe("Budget"),
    successCriteria: z.array(z.string()).optional().describe("Success criteria"),
    references: z.array(z.string()).optional().describe("Reference links or inspiration"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateDesignBriefParams = z.infer<typeof CreateDesignBriefParamsSchema>;

// 21. Create Moodboard
export const CreateMoodboardParamsSchema = z.object({
    title: z.string().optional().default("Moodboard"),
    theme: z.string().optional().describe("Visual theme"),
    colors: z.array(z.string()).optional().describe("Color hex values"),
    keywords: z.array(z.string()).optional().describe("Keywords/adjectives"),
    imageUrls: z.array(z.string()).optional().describe("Inspiration image URLs"),
    fonts: z.array(z.string()).optional().describe("Font names"),
    textures: z.array(z.string()).optional().describe("Texture descriptions"),
    layout: z.enum(["grid", "collage", "pinterest"]).optional().default("collage"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateMoodboardParams = z.infer<typeof CreateMoodboardParamsSchema>;

// 22. Create Style Tile
export const CreateStyleTileParamsSchema = z.object({
    title: z.string().optional().default("Style Tile"),
    colors: z.object({
        primary: z.string().describe("Primary color"),
        secondary: z.string().optional().describe("Secondary color"),
        accent: z.string().optional().describe("Accent color"),
        background: z.string().optional().describe("Background color"),
        text: z.string().optional().describe("Text color"),
    }),
    typography: z.object({
        headingFont: z.string().describe("Heading font"),
        bodyFont: z.string().describe("Body font"),
    }).optional(),
    adjectives: z.array(z.string()).optional().describe("Design adjectives"),
    patterns: z.array(z.string()).optional().describe("Pattern descriptions"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateStyleTileParams = z.infer<typeof CreateStyleTileParamsSchema>;

// 23. Create Brand Identity
export const CreateBrandIdentityParamsSchema = z.object({
    brandName: z.string().describe("Brand name"),
    tagline: z.string().optional().describe("Brand tagline"),
    mission: z.string().optional().describe("Mission statement"),
    values: z.array(z.string()).optional().describe("Brand values"),
    personality: z.array(z.string()).optional().describe("Brand personality traits"),
    colors: z.object({
        primary: z.string(),
        secondary: z.string().optional(),
        accent: z.string().optional(),
    }).optional(),
    logoUrl: z.string().optional().describe("Logo URL"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateBrandIdentityParams = z.infer<typeof CreateBrandIdentityParamsSchema>;

// 24. Create Color Exploration
export const CreateColorExplorationParamsSchema = z.object({
    title: z.string().optional().default("Color Exploration"),
    baseColor: z.string().optional().describe("Base color to explore from"),
    palettes: z.array(z.object({
        name: z.string().describe("Palette name"),
        colors: z.array(z.string()).describe("Color hex values"),
        description: z.string().optional(),
    })).optional().describe("Color palettes to show"),
    colorCount: z.number().optional().default(5).describe("Colors per palette"),
    harmony: z.enum(["complementary", "analogous", "triadic", "split-complementary", "tetradic", "monochromatic"]).optional(),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateColorExplorationParams = z.infer<typeof CreateColorExplorationParamsSchema>;

// 25. Create Typography Exploration
export const CreateTypographyExplorationParamsSchema = z.object({
    title: z.string().optional().default("Typography Exploration"),
    fontPairings: z.array(z.object({
        heading: z.string().describe("Heading font"),
        body: z.string().describe("Body font"),
        name: z.string().optional().describe("Pairing name"),
    })).optional().describe("Font pairings to show"),
    sampleText: z.string().optional().describe("Sample text to display"),
    showScale: z.boolean().optional().default(true).describe("Show type scale"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateTypographyExplorationParams = z.infer<typeof CreateTypographyExplorationParamsSchema>;

// 26. Create Icon Grid
export const CreateIconGridParamsSchema = z.object({
    title: z.string().optional().default("Icon Grid"),
    iconSize: z.number().optional().default(24).describe("Icon size in pixels"),
    gridSize: z.number().optional().default(48).describe("Grid cell size"),
    style: z.enum(["outline", "filled", "duotone", "custom"]).optional(),
    icons: z.array(z.object({
        name: z.string().describe("Icon name"),
        category: z.string().optional().describe("Icon category"),
    })).optional().describe("Icons to include"),
    columns: z.number().optional().default(8),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateIconGridParams = z.infer<typeof CreateIconGridParamsSchema>;

// 27. Create Illustration Style
export const CreateIllustrationStyleParamsSchema = z.object({
    title: z.string().optional().default("Illustration Style Guide"),
    style: z.enum(["flat", "isometric", "3d", "hand-drawn", "line-art", "abstract"]).describe("Illustration style"),
    colors: z.array(z.string()).optional().describe("Color palette"),
    examples: z.array(z.object({
        name: z.string(),
        description: z.string().optional(),
    })).optional().describe("Example illustrations"),
    guidelines: z.array(z.string()).optional().describe("Style guidelines"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateIllustrationStyleParams = z.infer<typeof CreateIllustrationStyleParamsSchema>;

// 28. Create Motion Spec
export const CreateMotionSpecParamsSchema = z.object({
    title: z.string().optional().default("Motion Specification"),
    animations: z.array(z.object({
        name: z.string().describe("Animation name"),
        type: z.enum(["entrance", "exit", "emphasis", "transition", "loading"]),
        duration: z.number().describe("Duration in ms"),
        easing: z.string().describe("Easing function"),
        delay: z.number().optional().describe("Delay in ms"),
        description: z.string().optional(),
    })).describe("Animation specifications"),
    principles: z.array(z.string()).optional().describe("Motion principles"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateMotionSpecParams = z.infer<typeof CreateMotionSpecParamsSchema>;

// 29. Create Interaction Spec
export const CreateInteractionSpecParamsSchema = z.object({
    title: z.string().optional().default("Interaction Specification"),
    component: z.string().describe("Component name"),
    interactions: z.array(z.object({
        trigger: z.enum(["click", "hover", "focus", "drag", "scroll", "key", "gesture"]),
        action: z.string().describe("What happens"),
        feedback: z.string().optional().describe("Visual/audio feedback"),
        notes: z.string().optional(),
    })).describe("Interaction specifications"),
    states: z.array(z.enum(["default", "hover", "active", "focus", "disabled", "loading", "error", "success"])).optional(),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateInteractionSpecParams = z.infer<typeof CreateInteractionSpecParamsSchema>;

// 30. Create Gesture Guide
export const CreateGestureGuideParamsSchema = z.object({
    title: z.string().optional().default("Gesture Guide"),
    platform: z.enum(["ios", "android", "web", "universal"]).optional(),
    gestures: z.array(z.object({
        name: z.string().describe("Gesture name"),
        type: z.enum(["tap", "double-tap", "long-press", "swipe", "pinch", "rotate", "drag", "scroll"]),
        action: z.string().describe("Resulting action"),
        context: z.string().optional().describe("Where this gesture is used"),
    })).describe("Gesture definitions"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateGestureGuideParams = z.infer<typeof CreateGestureGuideParamsSchema>;

// 31. Create Responsive Spec
export const CreateResponsiveSpecParamsSchema = z.object({
    title: z.string().optional().default("Responsive Specification"),
    breakpoints: z.array(z.object({
        name: z.string().describe("Breakpoint name (e.g., mobile, tablet, desktop)"),
        minWidth: z.number().describe("Minimum width in px"),
        maxWidth: z.number().optional().describe("Maximum width in px"),
        columns: z.number().optional().describe("Grid columns"),
        gutter: z.number().optional().describe("Gutter width"),
        margin: z.number().optional().describe("Container margin"),
    })).describe("Breakpoint definitions"),
    behaviors: z.array(z.object({
        component: z.string().describe("Component name"),
        changes: z.record(z.string()).describe("Changes per breakpoint"),
    })).optional().describe("Component behavior changes"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateResponsiveSpecParams = z.infer<typeof CreateResponsiveSpecParamsSchema>;

// 32. Create Accessibility Spec
export const CreateAccessibilitySpecParamsSchema = z.object({
    title: z.string().optional().default("Accessibility Specification"),
    wcagLevel: z.enum(["A", "AA", "AAA"]).optional().default("AA"),
    requirements: z.array(z.object({
        category: z.enum(["perceivable", "operable", "understandable", "robust"]),
        requirement: z.string().describe("Requirement description"),
        implementation: z.string().optional().describe("How to implement"),
        priority: z.enum(["must", "should", "may"]).optional(),
    })).describe("Accessibility requirements"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateAccessibilitySpecParams = z.infer<typeof CreateAccessibilitySpecParamsSchema>;

// 33. Create Content Strategy
export const CreateContentStrategyParamsSchema = z.object({
    title: z.string().optional().default("Content Strategy"),
    audience: z.string().describe("Target audience"),
    goals: z.array(z.string()).describe("Content goals"),
    contentTypes: z.array(z.object({
        type: z.string().describe("Content type"),
        purpose: z.string().describe("Purpose"),
        frequency: z.string().optional().describe("Publishing frequency"),
        owner: z.string().optional().describe("Content owner"),
    })).describe("Content types"),
    channels: z.array(z.string()).optional().describe("Distribution channels"),
    metrics: z.array(z.string()).optional().describe("Success metrics"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateContentStrategyParams = z.infer<typeof CreateContentStrategyParamsSchema>;

// 34. Create Microcopy Guide
export const CreateMicrocopyGuideParamsSchema = z.object({
    title: z.string().optional().default("Microcopy Guidelines"),
    patterns: z.array(z.object({
        context: z.string().describe("UI context (e.g., buttons, errors, empty states)"),
        guidelines: z.array(z.string()).describe("Writing guidelines"),
        examples: z.array(z.object({
            good: z.string().describe("Good example"),
            bad: z.string().optional().describe("Bad example"),
        })).optional(),
    })).describe("Microcopy patterns"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateMicrocopyGuideParams = z.infer<typeof CreateMicrocopyGuideParamsSchema>;

// 35. Create Voice and Tone Guide
export const CreateVoiceToneGuideParamsSchema = z.object({
    title: z.string().optional().default("Voice and Tone Guide"),
    brandVoice: z.object({
        personality: z.array(z.string()).describe("Voice personality traits"),
        principles: z.array(z.string()).describe("Voice principles"),
    }),
    toneVariations: z.array(z.object({
        context: z.string().describe("Context (e.g., success, error, onboarding)"),
        tone: z.string().describe("Tone description"),
        example: z.string().optional().describe("Example text"),
    })).optional().describe("Tone variations by context"),
    dosDonts: z.array(z.object({
        do: z.string(),
        dont: z.string(),
    })).optional(),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateVoiceToneGuideParams = z.infer<typeof CreateVoiceToneGuideParamsSchema>;

// 36. Create Usability Test Plan
export const CreateUsabilityTestPlanParamsSchema = z.object({
    title: z.string().describe("Test plan title"),
    objectives: z.array(z.string()).describe("Test objectives"),
    methodology: z.enum(["moderated", "unmoderated", "remote", "in-person"]).describe("Test methodology"),
    participants: z.object({
        count: z.number().describe("Number of participants"),
        criteria: z.array(z.string()).describe("Participant criteria"),
    }),
    tasks: z.array(z.object({
        name: z.string().describe("Task name"),
        scenario: z.string().describe("Task scenario"),
        successCriteria: z.string().describe("Success criteria"),
        metrics: z.array(z.string()).optional().describe("Metrics to collect"),
    })).describe("Test tasks"),
    questions: z.array(z.string()).optional().describe("Follow-up questions"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateUsabilityTestPlanParams = z.infer<typeof CreateUsabilityTestPlanParamsSchema>;

// 37. Create A/B Test Spec
export const CreateABTestSpecParamsSchema = z.object({
    title: z.string().describe("Test name"),
    hypothesis: z.string().describe("Test hypothesis"),
    variants: z.array(z.object({
        name: z.string().describe("Variant name (A, B, C...)"),
        description: z.string().describe("Variant description"),
        changes: z.array(z.string()).describe("What's different"),
    })).describe("Test variants"),
    primaryMetric: z.string().describe("Primary success metric"),
    secondaryMetrics: z.array(z.string()).optional().describe("Secondary metrics"),
    sampleSize: z.number().optional().describe("Required sample size"),
    duration: z.string().optional().describe("Test duration"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateABTestSpecParams = z.infer<typeof CreateABTestSpecParamsSchema>;

// 38. Create Metrics Dashboard
export const CreateMetricsDashboardParamsSchema = z.object({
    title: z.string().optional().default("Metrics Dashboard"),
    metrics: z.array(z.object({
        name: z.string().describe("Metric name"),
        value: z.string().describe("Current value"),
        change: z.string().optional().describe("Change indicator (+5%, -2%)"),
        trend: z.enum(["up", "down", "stable"]).optional(),
        target: z.string().optional().describe("Target value"),
    })).describe("Metrics to display"),
    timeframe: z.string().optional().describe("Time period"),
    layout: z.enum(["cards", "table", "mixed"]).optional().default("cards"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateMetricsDashboardParams = z.infer<typeof CreateMetricsDashboardParamsSchema>;

// 39. Create Design Critique
export const CreateDesignCritiqueParamsSchema = z.object({
    title: z.string().optional().default("Design Critique"),
    designUrl: z.string().optional().describe("Link to design"),
    aspects: z.array(z.object({
        category: z.enum(["visual", "usability", "accessibility", "content", "interaction", "technical"]),
        feedback: z.string().describe("Feedback"),
        type: z.enum(["positive", "constructive", "question"]),
        priority: z.enum(["high", "medium", "low"]).optional(),
    })).describe("Critique points"),
    summary: z.string().optional().describe("Overall summary"),
    nextSteps: z.array(z.string()).optional().describe("Recommended next steps"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateDesignCritiqueParams = z.infer<typeof CreateDesignCritiqueParamsSchema>;

// 40. Create Retrospective
export const CreateRetrospectiveParamsSchema = z.object({
    title: z.string().optional().default("Design Retrospective"),
    sprintOrProject: z.string().optional().describe("Sprint or project name"),
    wentWell: z.array(z.string()).describe("What went well"),
    improvements: z.array(z.string()).describe("What could be improved"),
    actionItems: z.array(z.object({
        action: z.string().describe("Action item"),
        owner: z.string().optional().describe("Owner"),
        dueDate: z.string().optional().describe("Due date"),
    })).optional().describe("Action items"),
    kudos: z.array(z.string()).optional().describe("Shoutouts and kudos"),
    parentId: z.string().optional().describe("Parent frame ID"),
});
export type CreateRetrospectiveParams = z.infer<typeof CreateRetrospectiveParamsSchema>;
