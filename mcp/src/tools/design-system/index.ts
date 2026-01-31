import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { TaskManager } from "../../task-manager.js";
import { z } from "zod";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { 
  DESIGN_GUIDELINES, 
  STYLE_GUIDE_TAGS,
  STYLE_GUIDES,
  UI_PATTERNS,
  COMPONENT_TEMPLATES
} from "./design-guidelines.js";
import {
  saveCustomGuidelines,
  loadCustomGuidelines,
  saveCustomStyleGuides,
  loadCustomStyleGuides,
  saveCustomTags,
  loadCustomTags,
  deleteCustomGuideline,
  deleteCustomStyleGuide,
  exportDesignResources,
  importDesignResources,
  initializeStorage
} from "./storage.js";

// Initialize storage and load custom resources
initializeStorage();
const customGuidelines = loadCustomGuidelines();
const customStyleGuides = loadCustomStyleGuides();
const customTags = loadCustomTags();

// Merge custom resources with built-in ones
Object.assign(DESIGN_GUIDELINES, customGuidelines);
STYLE_GUIDES.push(...customStyleGuides);
Object.keys(customTags).forEach(category => {
  if (STYLE_GUIDE_TAGS[category as keyof typeof STYLE_GUIDE_TAGS]) {
    const existingTags = STYLE_GUIDE_TAGS[category as keyof typeof STYLE_GUIDE_TAGS] as string[];
    existingTags.push(...(customTags[category] || []));
  }
});

/**
 * Register all design system tools with the MCP server
 */
export function registerDesignSystemTools(server: McpServer, taskManager: TaskManager) {
  
  // Get Design Guidelines Tool
  server.tool(
    "get-design-guidelines",
    `Get comprehensive design guidelines for specific topics. Available topics: landing-page, dashboard, design-system, mobile-app, web-app, ecommerce, saas, portfolio, blog, tailwind, code, accessibility, responsive. Returns design principles, spacing systems, typography scales, color strategies, and best practices.`,
    {
      topic: z.enum([
        "landing-page",
        "dashboard", 
        "design-system",
        "mobile-app",
        "web-app",
        "ecommerce",
        "saas",
        "portfolio",
        "blog",
        "tailwind",
        "code",
        "accessibility",
        "responsive"
      ]).describe("The design topic to get guidelines for"),
      format: z.enum(["detailed", "summary", "checklist"]).optional()
        .describe("Output format: detailed (full guidelines), summary (key points), or checklist (actionable items)")
    },
    async (params: any) => {
      const { topic, format = "detailed" } = params;
      const guidelines = DESIGN_GUIDELINES[topic];
      
      if (!guidelines) {
        return {
          content: [{
            type: "text" as const,
            text: `Guidelines for topic "${topic}" not found. Available topics: ${Object.keys(DESIGN_GUIDELINES).join(", ")}`
          }]
        } as CallToolResult;
      }

      let output = "";
      
      if (format === "detailed") {
        output = formatDetailedGuidelines(topic, guidelines);
      } else if (format === "summary") {
        output = formatSummaryGuidelines(topic, guidelines);
      } else {
        output = formatChecklistGuidelines(topic, guidelines);
      }

      return {
        content: [{
          type: "text" as const,
          text: output
        }]
      } as CallToolResult;
    }
  );

  // Get Style Guide Tags Tool
  server.tool(
    "get-style-guide-tags",
    `Get available style guide tags for filtering design inspiration. Returns categories like aesthetic, industry, platform, color schemes, and more.`,
    {
      category: z.enum(["all", "aesthetic", "industry", "platform", "color", "layout", "vibe"]).optional()
        .describe("Filter tags by category")
    },
    async (params: any) => {
      const { category = "all" } = params;
      
      let tags: any = STYLE_GUIDE_TAGS;
      
      if (category !== "all") {
        tags = {
          [category]: STYLE_GUIDE_TAGS[category as keyof typeof STYLE_GUIDE_TAGS]
        };
      }

      const output = formatStyleGuideTags(tags);

      return {
        content: [{
          type: "text" as const,
          text: output
        }]
      } as CallToolResult;
    }
  );

  // Get Style Guide Tool
  server.tool(
    "get-style-guide",
    `Get a curated style guide based on tags or specific name. Style guides include color palettes, typography, spacing, components, and design patterns.`,
    {
      tags: z.array(z.string()).optional()
        .describe("Tags to filter style guides (e.g., ['minimal', 'dark', 'saas'])"),
      name: z.string().optional()
        .describe("Specific style guide name to retrieve"),
      includeExamples: z.boolean().optional()
        .describe("Include code examples and implementation details")
    },
    async (params: any) => {
      const { tags, name, includeExamples = true } = params;

      let matchedGuides = [...STYLE_GUIDES];

      // Filter by name
      if (name) {
        matchedGuides = matchedGuides.filter(guide => 
          guide.name.toLowerCase().includes(name.toLowerCase())
        );
      }

      // Filter by tags
      if (tags && tags.length > 0) {
        matchedGuides = matchedGuides.filter(guide =>
          tags.some((tag: string) => guide.tags.includes(tag))
        );
      }

      if (matchedGuides.length === 0) {
        return {
          content: [{
            type: "text" as const,
            text: "No style guides found matching your criteria. Use get-style-guide-tags to see available tags."
          }]
        } as CallToolResult;
      }

      const output = formatStyleGuides(matchedGuides, includeExamples);

      return {
        content: [{
          type: "text" as const,
          text: output
        }]
      } as CallToolResult;
    }
  );

  // Get UI Pattern Tool
  server.tool(
    "get-ui-pattern",
    `Get reusable UI patterns for common components. Includes navigation, cards, forms, modals, tables, and more with Figma-specific properties.`,
    {
      pattern: z.enum([
        "navigation",
        "hero",
        "card",
        "form",
        "modal",
        "table",
        "sidebar",
        "footer",
        "cta",
        "pricing",
        "testimonial",
        "feature-grid",
        "stats",
        "timeline"
      ]).describe("The UI pattern to retrieve"),
      variant: z.string().optional()
        .describe("Specific variant of the pattern (e.g., 'horizontal', 'vertical', 'minimal')")
    },
    async (params: any) => {
      const { pattern, variant } = params;
      const patternData = UI_PATTERNS[pattern as keyof typeof UI_PATTERNS];

      if (!patternData) {
        return {
          content: [{
            type: "text" as const,
            text: `Pattern "${pattern}" not found. Available patterns: ${Object.keys(UI_PATTERNS).join(", ")}`
          }]
        } as CallToolResult;
      }

      const output = formatUIPattern(pattern, patternData, variant);

      return {
        content: [{
          type: "text" as const,
          text: output
        }]
      } as CallToolResult;
    }
  );

  // Get Component Template Tool
  server.tool(
    "get-component-template",
    `Get ready-to-use component templates with Figma properties. Templates include buttons, inputs, cards, and other common components with variants.`,
    {
      component: z.enum([
        "button",
        "input",
        "card",
        "badge",
        "avatar",
        "checkbox",
        "radio",
        "switch",
        "select",
        "slider",
        "progress",
        "tooltip",
        "dropdown"
      ]).describe("The component template to retrieve"),
      includeVariants: z.boolean().optional()
        .describe("Include all component variants")
    },
    async (params: any) => {
      const { component, includeVariants = true } = params;
      const template = COMPONENT_TEMPLATES[component as keyof typeof COMPONENT_TEMPLATES];

      if (!template) {
        return {
          content: [{
            type: "text" as const,
            text: `Component template "${component}" not found.`
          }]
        } as CallToolResult;
      }

      const output = formatComponentTemplate(component, template, includeVariants);

      return {
        content: [{
          type: "text" as const,
          text: output
        }]
      } as CallToolResult;
    }
  );

  // Create Design Guideline Tool
  server.tool(
    "create-design-guideline",
    `Create a new custom design guideline for your project. Define design principles, spacing systems, typography, colors, and best practices.`,
    {
      name: z.string().describe("Unique name for this guideline"),
      overview: z.string().describe("Brief overview"),
      principles: z.array(z.object({
        name: z.string(),
        description: z.string()
      })).optional(),
      spacing: z.object({
        base: z.string(),
        scale: z.record(z.string())
      }).optional(),
      typography: z.object({
        scale: z.record(z.string()),
        fonts: z.array(z.string())
      }).optional(),
      colors: z.object({
        strategy: z.string(),
        palette: z.record(z.string())
      }).optional(),
      bestPractices: z.array(z.string()).optional()
    },
    async (params: any) => {
      const guideline = params;
      
      // Add to in-memory
      (DESIGN_GUIDELINES as any)[guideline.name] = guideline;
      
      // Save to persistent storage
      const allCustomGuidelines = loadCustomGuidelines();
      allCustomGuidelines[guideline.name] = guideline;
      saveCustomGuidelines(allCustomGuidelines);

      const output = `✅ Design guideline "${guideline.name}" created successfully!

You can now retrieve it using:
get-design-guidelines({ topic: "${guideline.name}" })

Summary:
- Overview: ${guideline.overview}
- Principles: ${guideline.principles?.length || 0}
- Best Practices: ${guideline.bestPractices?.length || 0}

The guideline is now available for use in your design workflow.`;

      return {
        content: [{
          type: "text" as const,
          text: output
        }]
      } as CallToolResult;
    }
  );

  // Create Style Guide Tool
  server.tool(
    "create-style-guide",
    `Create a custom style guide with colors, typography, and design examples.`,
    {
      name: z.string().describe("Name of the style guide"),
      tags: z.array(z.string()).describe("Tags for categorization"),
      description: z.string().describe("Description"),
      colors: z.record(z.string()).optional(),
      typography: z.record(z.string()).optional(),
      spacing: z.record(z.string()).optional(),
      borderRadius: z.record(z.string()).optional(),
      shadows: z.record(z.string()).optional(),
      examples: z.string().optional()
    },
    async (params: any) => {
      const styleGuide = params;
      
      // Add to in-memory
      STYLE_GUIDES.push(styleGuide);
      
      // Save to persistent storage
      const allCustomStyleGuides = loadCustomStyleGuides();
      allCustomStyleGuides.push(styleGuide);
      saveCustomStyleGuides(allCustomStyleGuides);

      const output = `✅ Style guide "${styleGuide.name}" created successfully!

Tags: ${styleGuide.tags.join(", ")}
Description: ${styleGuide.description}

You can now retrieve it using:
get-style-guide({ name: "${styleGuide.name}" })

The style guide is now available in your library.`;

      return {
        content: [{
          type: "text" as const,
          text: output
        }]
      } as CallToolResult;
    }
  );

  // Add Design Tag Tool
  server.tool(
    "add-design-tag",
    `Add new tags to the design tag system for better categorization.`,
    {
      category: z.enum(["aesthetic", "industry", "platform", "color", "layout", "vibe"]),
      tags: z.array(z.string()).describe("New tags to add")
    },
    async (params: any) => {
      const { category, tags } = params;
      
      const existingTags = STYLE_GUIDE_TAGS[category as keyof typeof STYLE_GUIDE_TAGS] as string[];
      const newTags = tags.filter((tag: string) => !existingTags.includes(tag));
      
      if (newTags.length > 0) {
        existingTags.push(...newTags);
        
        // Save to persistent storage
        const allCustomTags = loadCustomTags();
        if (!allCustomTags[category]) {
          allCustomTags[category] = [];
        }
        allCustomTags[category].push(...newTags);
        saveCustomTags(allCustomTags);
      }

      const output = `✅ Added ${newTags.length} new tag(s) to "${category}" category:

${newTags.join(", ")}

Total tags in "${category}": ${existingTags.length}`;

      return {
        content: [{
          type: "text" as const,
          text: output
        }]
      } as CallToolResult;
    }
  );

  // Update Design Guideline Tool
  server.tool(
    "update-design-guideline",
    `Update an existing design guideline with new information.`,
    {
      name: z.string(),
      updates: z.object({
        overview: z.string().optional(),
        principles: z.array(z.object({
          name: z.string(),
          description: z.string()
        })).optional(),
        spacing: z.object({
          base: z.string(),
          scale: z.record(z.string())
        }).optional(),
        typography: z.object({
          scale: z.record(z.string()),
          fonts: z.array(z.string())
        }).optional(),
        colors: z.object({
          strategy: z.string(),
          palette: z.record(z.string())
        }).optional(),
        bestPractices: z.array(z.string()).optional()
      })
    },
    async (params: any) => {
      const { name, updates } = params;
      
      const guideline = (DESIGN_GUIDELINES as any)[name];
      
      if (!guideline) {
        return {
          content: [{
            type: "text" as const,
            text: `❌ Guideline "${name}" not found. Available guidelines: ${Object.keys(DESIGN_GUIDELINES).join(", ")}`
          }]
        } as CallToolResult;
      }

      // Merge updates
      Object.assign(guideline, updates);
      
      // Save to persistent storage
      const allCustomGuidelines = loadCustomGuidelines();
      if (allCustomGuidelines[name]) {
        Object.assign(allCustomGuidelines[name], updates);
        saveCustomGuidelines(allCustomGuidelines);
      }

      const output = `✅ Design guideline "${name}" updated successfully!

Updated fields:
${Object.keys(updates).map(key => `- ${key}`).join("\n")}`;

      return {
        content: [{
          type: "text" as const,
          text: output
        }]
      } as CallToolResult;
    }
  );

  // List All Guidelines and Style Guides Tool
  server.tool(
    "list-design-resources",
    `List all available design guidelines and style guides.`,
    {
      type: z.enum(["guidelines", "style-guides", "all"]).optional()
    },
    async (params: any) => {
      const { type = "all" } = params;
      
      let output = "# DESIGN RESOURCES\n\n";
      
      if (type === "guidelines" || type === "all") {
        output += `## Design Guidelines (${Object.keys(DESIGN_GUIDELINES).length})\n\n`;
        Object.keys(DESIGN_GUIDELINES).forEach(key => {
          const guide = (DESIGN_GUIDELINES as any)[key];
          output += `- **${key}**: ${guide.overview}\n`;
        });
        output += "\n";
      }
      
      if (type === "style-guides" || type === "all") {
        output += `## Style Guides (${STYLE_GUIDES.length})\n\n`;
        STYLE_GUIDES.forEach(guide => {
          output += `- **${guide.name}**: ${guide.description}\n`;
          output += `  Tags: ${guide.tags.join(", ")}\n\n`;
        });
      }

      return {
        content: [{
          type: "text" as const,
          text: output
        }]
      } as CallToolResult;
    }
  );

  // Delete Design Guideline Tool
  server.tool(
    "delete-design-guideline",
    `Delete a custom design guideline from the system.`,
    {
      name: z.string()
    },
    async (params: any) => {
      const { name } = params;
      
      const customGuidelines = loadCustomGuidelines();
      
      if (!customGuidelines[name]) {
        return {
          content: [{
            type: "text" as const,
            text: `❌ Cannot delete "${name}" - it's either a built-in guideline or doesn't exist.`
          }]
        } as CallToolResult;
      }
      
      const success = deleteCustomGuideline(name);
      
      if (success) {
        delete (DESIGN_GUIDELINES as any)[name];
        
        return {
          content: [{
            type: "text" as const,
            text: `✅ Design guideline "${name}" deleted successfully!`
          }]
        } as CallToolResult;
      }
      
      return {
        content: [{
          type: "text" as const,
          text: `❌ Failed to delete guideline "${name}".`
        }]
      } as CallToolResult;
    }
  );

  // Delete Style Guide Tool
  server.tool(
    "delete-style-guide",
    `Delete a custom style guide from the system.`,
    {
      name: z.string()
    },
    async (params: any) => {
      const { name } = params;
      
      const success = deleteCustomStyleGuide(name);
      
      if (success) {
        const index = STYLE_GUIDES.findIndex(sg => sg.name === name);
        if (index !== -1) {
          STYLE_GUIDES.splice(index, 1);
        }
        
        return {
          content: [{
            type: "text" as const,
            text: `✅ Style guide "${name}" deleted successfully!`
          }]
        } as CallToolResult;
      }
      
      return {
        content: [{
          type: "text" as const,
          text: `❌ Failed to delete style guide "${name}".`
        }]
      } as CallToolResult;
    }
  );

  // Export Design System Tool
  server.tool(
    "export-design-system",
    `Export all custom design resources (guidelines, style guides, tags) as JSON.`,
    {
      includeBuiltIn: z.boolean().optional()
    },
    async (params: any) => {
      const { includeBuiltIn = false } = params;
      
      const exported = exportDesignResources();
      
      const output = `# DESIGN SYSTEM EXPORT

## Summary
- Custom Guidelines: ${Object.keys(exported.guidelines).length}
- Custom Style Guides: ${exported.styleGuides.length}
- Custom Tags: ${Object.keys(exported.tags).length}

## JSON Export

\`\`\`json
${JSON.stringify(exported, null, 2)}
\`\`\`

💾 Your custom design resources are saved to .design-system-storage/`;

      return {
        content: [{
          type: "text" as const,
          text: output
        }]
      } as CallToolResult;
    }
  );

  // Import Design System Tool
  server.tool(
    "import-design-system",
    `Import design resources from JSON.`,
    {
      data: z.object({
        guidelines: z.record(z.any()).optional(),
        styleGuides: z.array(z.any()).optional(),
        tags: z.record(z.array(z.string())).optional()
      }),
      merge: z.boolean().optional()
    },
    async (params: any) => {
      const { data, merge = true } = params;
      
      let imported = {
        guidelines: 0,
        styleGuides: 0,
        tags: 0
      };
      
      if (merge) {
        if (data.guidelines) {
          const existing = loadCustomGuidelines();
          Object.assign(existing, data.guidelines);
          saveCustomGuidelines(existing);
          Object.assign(DESIGN_GUIDELINES, data.guidelines);
          imported.guidelines = Object.keys(data.guidelines).length;
        }
        
        if (data.styleGuides) {
          const existing = loadCustomStyleGuides();
          existing.push(...data.styleGuides);
          saveCustomStyleGuides(existing);
          STYLE_GUIDES.push(...data.styleGuides);
          imported.styleGuides = data.styleGuides.length;
        }
        
        if (data.tags) {
          const existing = loadCustomTags();
          Object.keys(data.tags).forEach(category => {
            if (!existing[category]) existing[category] = [];
            existing[category].push(...data.tags[category]);
            
            const tagArray = STYLE_GUIDE_TAGS[category as keyof typeof STYLE_GUIDE_TAGS] as string[];
            if (tagArray) {
              tagArray.push(...data.tags[category]);
            }
          });
          saveCustomTags(existing);
          imported.tags = Object.keys(data.tags).length;
        }
      } else {
        importDesignResources(data);
        imported.guidelines = data.guidelines ? Object.keys(data.guidelines).length : 0;
        imported.styleGuides = data.styleGuides ? data.styleGuides.length : 0;
        imported.tags = data.tags ? Object.keys(data.tags).length : 0;
      }

      const output = `✅ Design system imported successfully!

Imported:
- ${imported.guidelines} guideline(s)
- ${imported.styleGuides} style guide(s)
- ${imported.tags} tag category/categories

Mode: ${merge ? 'Merged with existing' : 'Replaced existing'}`;

      return {
        content: [{
          type: "text" as const,
          text: output
        }]
      } as CallToolResult;
    }
  );

  // Generate Design Documentation Tool
  server.tool(
    "generate-design-docs",
    `Generate comprehensive documentation for your design system.`,
    {
      includeExamples: z.boolean().optional(),
      format: z.enum(["markdown", "html"]).optional()
    },
    async (params: any) => {
      const { includeExamples = true, format = "markdown" } = params;
      
      let output = `# Design System Documentation

Generated on ${new Date().toLocaleDateString()}

---

## Design Guidelines

`;

      Object.keys(DESIGN_GUIDELINES).forEach(key => {
        const guide = (DESIGN_GUIDELINES as any)[key];
        output += `### ${key}\n\n`;
        output += `${guide.overview}\n\n`;
      });

      output += `\n---\n\n## Style Guides\n\n`;

      STYLE_GUIDES.forEach(guide => {
        output += `### ${guide.name}\n\n`;
        output += `${guide.description}\n\n`;
        output += `**Tags:** ${guide.tags.join(", ")}\n\n`;
      });

      return {
        content: [{
          type: "text" as const,
          text: output
        }]
      } as CallToolResult;
    }
  );
}

// Helper formatting functions

function formatDetailedGuidelines(topic: string, guidelines: any): string {
  let output = `# ${topic.toUpperCase()} DESIGN GUIDELINES\n\n`;
  
  output += `## Overview\n${guidelines.overview}\n\n`;
  
  if (guidelines.principles) {
    output += `## Design Principles\n`;
    guidelines.principles.forEach((principle: any) => {
      output += `\n### ${principle.name}\n${principle.description}\n`;
    });
    output += "\n";
  }

  if (guidelines.spacing) {
    output += `## Spacing System\n`;
    output += `Base: ${guidelines.spacing.base}\n`;
    output += `Scale: ${Object.entries(guidelines.spacing.scale).map(([k, v]) => `${k}: ${v}`).join(", ")}\n\n`;
  }

  if (guidelines.typography) {
    output += `## Typography\n`;
    output += `Scale: ${Object.entries(guidelines.typography.scale).map(([k, v]) => `${k}: ${v}`).join(", ")}\n`;
    if (guidelines.typography.fonts) {
      output += `Fonts: ${guidelines.typography.fonts.join(", ")}\n\n`;
    }
  }

  if (guidelines.colors) {
    output += `## Color Strategy\n${guidelines.colors.strategy}\n`;
    output += `Palette: ${Object.entries(guidelines.colors.palette).map(([k, v]) => `${k}: ${v}`).join(", ")}\n\n`;
  }

  if (guidelines.bestPractices) {
    output += `## Best Practices\n`;
    guidelines.bestPractices.forEach((practice: string, i: number) => {
      output += `${i + 1}. ${practice}\n`;
    });
  }

  return output;
}

function formatSummaryGuidelines(topic: string, guidelines: any): string {
  let output = `# ${topic.toUpperCase()} - KEY POINTS\n\n`;
  output += `${guidelines.overview}\n\n`;
  
  if (guidelines.principles) {
    output += `**Key Principles:** ${guidelines.principles.map((p: any) => p.name).join(", ")}\n`;
  }
  
  return output;
}

function formatChecklistGuidelines(topic: string, guidelines: any): string {
  let output = `# ${topic.toUpperCase()} CHECKLIST\n\n`;
  
  if (guidelines.bestPractices) {
    guidelines.bestPractices.forEach((practice: string) => {
      output += `- [ ] ${practice}\n`;
    });
  }
  
  return output;
}

function formatStyleGuideTags(tags: any): string {
  let output = "# STYLE GUIDE TAGS\n\n";
  
  Object.entries(tags).forEach(([category, tagList]) => {
    output += `## ${category.toUpperCase()}\n`;
    output += `${(tagList as string[]).join(", ")}\n\n`;
  });
  
  return output;
}

function formatStyleGuides(guides: any[], includeExamples: boolean): string {
  let output = `# STYLE GUIDES (${guides.length} found)\n\n`;
  
  guides.forEach(guide => {
    output += `## ${guide.name}\n`;
    output += `**Tags:** ${guide.tags.join(", ")}\n`;
    output += `**Description:** ${guide.description}\n\n`;
    
    if (guide.colors) {
      output += `**Colors:**\n`;
      Object.entries(guide.colors).forEach(([key, value]) => {
        output += `- ${key}: ${value}\n`;
      });
      output += "\n";
    }
    
    if (guide.typography) {
      output += `**Typography:**\n`;
      Object.entries(guide.typography).forEach(([key, value]) => {
        output += `- ${key}: ${value}\n`;
      });
      output += "\n";
    }
    
    if (includeExamples && guide.examples) {
      output += `**Examples:**\n${guide.examples}\n\n`;
    }
    
    output += "---\n\n";
  });
  
  return output;
}

function formatUIPattern(pattern: string, patternData: any, variant?: string): string {
  let output = `# ${pattern.toUpperCase()} PATTERN\n\n`;
  output += `${patternData.description}\n\n`;
  
  if (variant && patternData.variants && patternData.variants[variant]) {
    output += `## ${variant.toUpperCase()} VARIANT\n\n`;
    output += JSON.stringify(patternData.variants[variant], null, 2);
  } else {
    output += `## STRUCTURE\n\n`;
    output += JSON.stringify(patternData.structure, null, 2);
    
    if (patternData.variants) {
      output += `\n\n## AVAILABLE VARIANTS\n`;
      output += Object.keys(patternData.variants).join(", ");
    }
  }
  
  return output;
}

function formatComponentTemplate(component: string, template: any, includeVariants: boolean): string {
  let output = `# ${component.toUpperCase()} COMPONENT\n\n`;
  output += `${template.description}\n\n`;
  
  output += `## BASE PROPERTIES\n\n`;
  output += JSON.stringify(template.base, null, 2);
  
  if (includeVariants && template.variants) {
    output += `\n\n## VARIANTS\n\n`;
    Object.entries(template.variants).forEach(([name, props]) => {
      output += `### ${name}\n`;
      output += JSON.stringify(props, null, 2);
      output += "\n\n";
    });
  }
  
  return output;
}
