import { z } from "zod";

// ============================================
// UI PATTERN TOOL SCHEMAS (60 tools)
// ============================================

// Base schema for common UI pattern parameters
const BaseUIPatternParams = z.object({
    parentId: z.string().optional().describe("Parent frame ID to place the pattern in"),
    theme: z.enum(["light", "dark", "auto"]).optional().default("light").describe("Color theme"),
    style: z.enum(["minimal", "modern", "bold", "elegant", "playful"]).optional().describe("Visual style"),
    width: z.number().optional().describe("Width in pixels"),
    primaryColor: z.string().optional().describe("Primary color hex"),
    borderRadius: z.number().optional().describe("Border radius in pixels"),
});

// ============================================
// NAVIGATION PATTERNS (10 tools)
// ============================================

// 1. Create Navbar
export const CreateNavbarParamsSchema = z.object({
    variant: z.enum(["simple", "with-search", "with-cta", "mega-menu", "transparent"]).optional().default("simple"),
    logoText: z.string().optional().default("Logo"),
    items: z.array(z.object({
        label: z.string(),
        href: z.string().optional(),
        isActive: z.boolean().optional(),
        children: z.array(z.object({
            label: z.string(),
            href: z.string().optional(),
        })).optional(),
    })).optional(),
    ctaText: z.string().optional().describe("CTA button text"),
    showSearch: z.boolean().optional().default(false),
    sticky: z.boolean().optional().default(false),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateNavbarParams = z.infer<typeof CreateNavbarParamsSchema>;

// 2. Create Sidebar
export const CreateSidebarParamsSchema = z.object({
    variant: z.enum(["icons-only", "expanded", "collapsible", "with-header", "with-footer"]).optional().default("expanded"),
    width: z.number().optional().default(260),
    sections: z.array(z.object({
        title: z.string().optional(),
        items: z.array(z.object({
            label: z.string(),
            icon: z.string().optional(),
            isActive: z.boolean().optional(),
            badge: z.string().optional(),
            children: z.array(z.object({
                label: z.string(),
                isActive: z.boolean().optional(),
            })).optional(),
        })),
    })).optional(),
    showUserProfile: z.boolean().optional().default(false),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateSidebarParams = z.infer<typeof CreateSidebarParamsSchema>;

// 3. Create Tabs
export const CreateTabsParamsSchema = z.object({
    variant: z.enum(["underline", "pills", "boxed", "vertical", "with-icons"]).optional().default("underline"),
    tabs: z.array(z.object({
        label: z.string(),
        icon: z.string().optional(),
        isActive: z.boolean().optional(),
        isDisabled: z.boolean().optional(),
        badge: z.string().optional(),
    })),
    size: z.enum(["sm", "md", "lg"]).optional().default("md"),
    fullWidth: z.boolean().optional().default(false),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateTabsParams = z.infer<typeof CreateTabsParamsSchema>;

// 4. Create Breadcrumbs
export const CreateBreadcrumbsParamsSchema = z.object({
    items: z.array(z.object({
        label: z.string(),
        href: z.string().optional(),
        isCurrent: z.boolean().optional(),
    })),
    separator: z.enum(["/", ">", "arrow", "chevron"]).optional().default("chevron"),
    showHomeIcon: z.boolean().optional().default(true),
    maxItems: z.number().optional().describe("Max items before truncation"),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateBreadcrumbsParams = z.infer<typeof CreateBreadcrumbsParamsSchema>;

// 5. Create Pagination
export const CreatePaginationParamsSchema = z.object({
    variant: z.enum(["simple", "with-numbers", "with-info", "load-more", "infinite"]).optional().default("with-numbers"),
    currentPage: z.number().optional().default(1),
    totalPages: z.number().optional().default(10),
    showFirstLast: z.boolean().optional().default(true),
    showPageNumbers: z.number().optional().default(5),
    size: z.enum(["sm", "md", "lg"]).optional().default("md"),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreatePaginationParams = z.infer<typeof CreatePaginationParamsSchema>;

// 6. Create Stepper
export const CreateStepperParamsSchema = z.object({
    variant: z.enum(["horizontal", "vertical", "dots", "numbered", "with-icons"]).optional().default("horizontal"),
    steps: z.array(z.object({
        label: z.string(),
        description: z.string().optional(),
        status: z.enum(["completed", "current", "upcoming", "error"]).optional(),
        icon: z.string().optional(),
    })),
    showConnectors: z.boolean().optional().default(true),
    size: z.enum(["sm", "md", "lg"]).optional().default("md"),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateStepperParams = z.infer<typeof CreateStepperParamsSchema>;

// 7. Create Bottom Nav
export const CreateBottomNavParamsSchema = z.object({
    items: z.array(z.object({
        label: z.string(),
        icon: z.string().optional(),
        isActive: z.boolean().optional(),
        badge: z.string().optional(),
    })),
    variant: z.enum(["simple", "with-labels", "floating", "notched"]).optional().default("with-labels"),
    showLabels: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateBottomNavParams = z.infer<typeof CreateBottomNavParamsSchema>;

// 8. Create Mega Menu
export const CreateMegaMenuParamsSchema = z.object({
    columns: z.array(z.object({
        title: z.string().optional(),
        items: z.array(z.object({
            label: z.string(),
            description: z.string().optional(),
            icon: z.string().optional(),
            href: z.string().optional(),
        })),
    })),
    featuredSection: z.object({
        title: z.string(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        ctaText: z.string().optional(),
    }).optional(),
    width: z.number().optional().describe("Menu width"),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateMegaMenuParams = z.infer<typeof CreateMegaMenuParamsSchema>;

// 9. Create Command Palette
export const CreateCommandPaletteParamsSchema = z.object({
    placeholder: z.string().optional().default("Type a command or search..."),
    groups: z.array(z.object({
        title: z.string(),
        items: z.array(z.object({
            label: z.string(),
            shortcut: z.string().optional(),
            icon: z.string().optional(),
            description: z.string().optional(),
        })),
    })).optional(),
    recentItems: z.array(z.string()).optional(),
    width: z.number().optional().default(560),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateCommandPaletteParams = z.infer<typeof CreateCommandPaletteParamsSchema>;

// 10. Create Search Bar
export const CreateSearchBarParamsSchema = z.object({
    variant: z.enum(["simple", "with-filters", "with-suggestions", "expandable", "voice"]).optional().default("simple"),
    placeholder: z.string().optional().default("Search..."),
    showIcon: z.boolean().optional().default(true),
    showClearButton: z.boolean().optional().default(true),
    filters: z.array(z.object({
        label: z.string(),
        value: z.string(),
    })).optional(),
    suggestions: z.array(z.string()).optional(),
    size: z.enum(["sm", "md", "lg"]).optional().default("md"),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateSearchBarParams = z.infer<typeof CreateSearchBarParamsSchema>;

// ============================================
// CONTENT PATTERNS (10 tools)
// ============================================

// 11. Create Hero Section
export const CreateHeroSectionParamsSchema = z.object({
    variant: z.enum(["centered", "split", "with-image", "video-background", "gradient", "minimal"]).optional().default("centered"),
    headline: z.string().describe("Main headline"),
    subheadline: z.string().optional().describe("Supporting text"),
    primaryCta: z.object({
        text: z.string(),
        variant: z.enum(["solid", "outline", "ghost"]).optional(),
    }).optional(),
    secondaryCta: z.object({
        text: z.string(),
        variant: z.enum(["solid", "outline", "ghost"]).optional(),
    }).optional(),
    imageUrl: z.string().optional(),
    alignment: z.enum(["left", "center", "right"]).optional().default("center"),
    height: z.enum(["viewport", "large", "medium", "small"]).optional().default("large"),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateHeroSectionParams = z.infer<typeof CreateHeroSectionParamsSchema>;

// 12. Create Feature Grid
export const CreateFeatureGridParamsSchema = z.object({
    variant: z.enum(["cards", "icons", "numbered", "with-images", "alternating"]).optional().default("cards"),
    columns: z.number().optional().default(3),
    features: z.array(z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
        imageUrl: z.string().optional(),
    })),
    showIcons: z.boolean().optional().default(true),
    cardStyle: z.enum(["elevated", "bordered", "flat"]).optional().default("elevated"),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateFeatureGridParams = z.infer<typeof CreateFeatureGridParamsSchema>;

// 13. Create Testimonial
export const CreateTestimonialParamsSchema = z.object({
    variant: z.enum(["single", "carousel", "grid", "masonry", "featured"]).optional().default("single"),
    testimonials: z.array(z.object({
        quote: z.string(),
        author: z.string(),
        role: z.string().optional(),
        company: z.string().optional(),
        avatarUrl: z.string().optional(),
        rating: z.number().optional(),
    })),
    showRating: z.boolean().optional().default(false),
    showAvatar: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateTestimonialParams = z.infer<typeof CreateTestimonialParamsSchema>;

// 14. Create Pricing Table
export const CreatePricingTableParamsSchema = z.object({
    variant: z.enum(["cards", "comparison", "toggle", "tiered"]).optional().default("cards"),
    plans: z.array(z.object({
        name: z.string(),
        price: z.string(),
        period: z.string().optional().default("/month"),
        description: z.string().optional(),
        features: z.array(z.object({
            text: z.string(),
            included: z.boolean().optional().default(true),
        })),
        ctaText: z.string().optional().default("Get Started"),
        isPopular: z.boolean().optional(),
        isFeatured: z.boolean().optional(),
    })),
    showToggle: z.boolean().optional().default(false).describe("Monthly/Annual toggle"),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreatePricingTableParams = z.infer<typeof CreatePricingTableParamsSchema>;

// 15. Create Comparison Table
export const CreateComparisonTableParamsSchema = z.object({
    features: z.array(z.object({
        category: z.string().optional(),
        name: z.string(),
    })),
    items: z.array(z.object({
        name: z.string(),
        values: z.array(z.union([z.boolean(), z.string()])),
        isHighlighted: z.boolean().optional(),
    })),
    showCategory: z.boolean().optional().default(true),
    stickyHeader: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateComparisonTableParams = z.infer<typeof CreateComparisonTableParamsSchema>;

// 16. Create FAQ Accordion
export const CreateFAQAccordionParamsSchema = z.object({
    variant: z.enum(["simple", "bordered", "separated", "with-icons"]).optional().default("simple"),
    items: z.array(z.object({
        question: z.string(),
        answer: z.string(),
        isOpen: z.boolean().optional().default(false),
    })),
    allowMultiple: z.boolean().optional().default(false),
    showIcons: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateFAQAccordionParams = z.infer<typeof CreateFAQAccordionParamsSchema>;

// 17. Create Timeline
export const CreateTimelineParamsSchema = z.object({
    variant: z.enum(["vertical", "horizontal", "alternating", "compact"]).optional().default("vertical"),
    events: z.array(z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string().optional(),
        icon: z.string().optional(),
        status: z.enum(["completed", "current", "upcoming"]).optional(),
    })),
    showDates: z.boolean().optional().default(true),
    showIcons: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateTimelineParams = z.infer<typeof CreateTimelineParamsSchema>;

// 18. Create Stats Grid
export const CreateStatsGridParamsSchema = z.object({
    variant: z.enum(["simple", "with-icons", "with-charts", "with-comparison"]).optional().default("simple"),
    stats: z.array(z.object({
        label: z.string(),
        value: z.string(),
        change: z.string().optional(),
        trend: z.enum(["up", "down", "stable"]).optional(),
        icon: z.string().optional(),
        description: z.string().optional(),
    })),
    columns: z.number().optional().default(4),
    cardStyle: z.enum(["elevated", "bordered", "flat"]).optional().default("elevated"),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateStatsGridParams = z.infer<typeof CreateStatsGridParamsSchema>;

// 19. Create Team Grid
export const CreateTeamGridParamsSchema = z.object({
    variant: z.enum(["cards", "list", "compact", "with-social"]).optional().default("cards"),
    members: z.array(z.object({
        name: z.string(),
        role: z.string(),
        imageUrl: z.string().optional(),
        bio: z.string().optional(),
        social: z.object({
            twitter: z.string().optional(),
            linkedin: z.string().optional(),
            github: z.string().optional(),
        }).optional(),
    })),
    columns: z.number().optional().default(4),
    showBio: z.boolean().optional().default(false),
    showSocial: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateTeamGridParams = z.infer<typeof CreateTeamGridParamsSchema>;

// 20. Create Gallery
export const CreateGalleryParamsSchema = z.object({
    variant: z.enum(["grid", "masonry", "carousel", "lightbox", "filmstrip"]).optional().default("grid"),
    images: z.array(z.object({
        url: z.string(),
        alt: z.string().optional(),
        caption: z.string().optional(),
        aspectRatio: z.string().optional(),
    })),
    columns: z.number().optional().default(3),
    gap: z.number().optional().default(16),
    showCaptions: z.boolean().optional().default(false),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateGalleryParams = z.infer<typeof CreateGalleryParamsSchema>;

// ============================================
// FORM PATTERNS (10 tools)
// ============================================

// 21. Create Login Form
export const CreateLoginFormParamsSchema = z.object({
    variant: z.enum(["simple", "with-social", "split-screen", "modal", "magic-link"]).optional().default("simple"),
    showSocialLogin: z.boolean().optional().default(true),
    socialProviders: z.array(z.enum(["google", "github", "twitter", "facebook", "apple"])).optional(),
    showRememberMe: z.boolean().optional().default(true),
    showForgotPassword: z.boolean().optional().default(true),
    showSignupLink: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateLoginFormParams = z.infer<typeof CreateLoginFormParamsSchema>;

// 22. Create Signup Form
export const CreateSignupFormParamsSchema = z.object({
    variant: z.enum(["simple", "with-social", "split-screen", "stepped", "minimal"]).optional().default("simple"),
    fields: z.array(z.enum(["name", "email", "password", "confirmPassword", "phone", "company", "role"])).optional(),
    showSocialSignup: z.boolean().optional().default(true),
    socialProviders: z.array(z.enum(["google", "github", "twitter", "facebook", "apple"])).optional(),
    showTerms: z.boolean().optional().default(true),
    showLoginLink: z.boolean().optional().default(true),
    passwordRequirements: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateSignupFormParams = z.infer<typeof CreateSignupFormParamsSchema>;

// 23. Create Checkout Form
export const CreateCheckoutFormParamsSchema = z.object({
    variant: z.enum(["single-page", "multi-step", "accordion", "split"]).optional().default("single-page"),
    sections: z.array(z.enum(["contact", "shipping", "billing", "payment", "review"])).optional(),
    showOrderSummary: z.boolean().optional().default(true),
    showCouponField: z.boolean().optional().default(true),
    paymentMethods: z.array(z.enum(["card", "paypal", "apple-pay", "google-pay", "bank"])).optional(),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateCheckoutFormParams = z.infer<typeof CreateCheckoutFormParamsSchema>;

// 24. Create Search Filters
export const CreateSearchFiltersParamsSchema = z.object({
    variant: z.enum(["sidebar", "horizontal", "modal", "dropdown", "chips"]).optional().default("sidebar"),
    filters: z.array(z.object({
        label: z.string(),
        type: z.enum(["checkbox", "radio", "range", "select", "date", "toggle"]),
        options: z.array(z.object({
            label: z.string(),
            value: z.string(),
            count: z.number().optional(),
        })).optional(),
    })),
    showClearAll: z.boolean().optional().default(true),
    showActiveFilters: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateSearchFiltersParams = z.infer<typeof CreateSearchFiltersParamsSchema>;

// 25. Create Date Picker
export const CreateDatePickerParamsSchema = z.object({
    variant: z.enum(["single", "range", "multiple", "inline", "with-presets"]).optional().default("single"),
    showTime: z.boolean().optional().default(false),
    showPresets: z.boolean().optional().default(false),
    presets: z.array(z.string()).optional().describe("Preset options like 'Today', 'Last 7 days'"),
    minDate: z.string().optional(),
    maxDate: z.string().optional(),
    format: z.string().optional().default("MM/DD/YYYY"),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateDatePickerParams = z.infer<typeof CreateDatePickerParamsSchema>;

// 26. Create File Upload
export const CreateFileUploadParamsSchema = z.object({
    variant: z.enum(["dropzone", "button", "avatar", "gallery", "document"]).optional().default("dropzone"),
    allowMultiple: z.boolean().optional().default(false),
    acceptedTypes: z.array(z.string()).optional().describe("Accepted file types"),
    maxFileSize: z.string().optional().describe("Max file size (e.g., '10MB')"),
    showPreview: z.boolean().optional().default(true),
    showProgress: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateFileUploadParams = z.infer<typeof CreateFileUploadParamsSchema>;

// 27. Create Multi-Step Form
export const CreateMultiStepFormParamsSchema = z.object({
    steps: z.array(z.object({
        title: z.string(),
        description: z.string().optional(),
        fields: z.array(z.object({
            type: z.enum(["text", "email", "password", "select", "textarea", "checkbox", "radio", "file"]),
            label: z.string(),
            placeholder: z.string().optional(),
            required: z.boolean().optional(),
            options: z.array(z.string()).optional(),
        })),
    })),
    showStepIndicator: z.boolean().optional().default(true),
    showStepNumbers: z.boolean().optional().default(true),
    allowSkip: z.boolean().optional().default(false),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateMultiStepFormParams = z.infer<typeof CreateMultiStepFormParamsSchema>;

// 28. Create Inline Edit
export const CreateInlineEditParamsSchema = z.object({
    variant: z.enum(["text", "textarea", "select", "date", "number"]).optional().default("text"),
    value: z.string().describe("Current value"),
    placeholder: z.string().optional(),
    showEditIcon: z.boolean().optional().default(true),
    showSaveCancel: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateInlineEditParams = z.infer<typeof CreateInlineEditParamsSchema>;

// 29. Create Autocomplete
export const CreateAutocompleteParamsSchema = z.object({
    variant: z.enum(["simple", "with-icons", "grouped", "multi-select", "creatable"]).optional().default("simple"),
    placeholder: z.string().optional().default("Search..."),
    options: z.array(z.object({
        label: z.string(),
        value: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
        group: z.string().optional(),
    })).optional(),
    allowCreate: z.boolean().optional().default(false),
    showClearButton: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateAutocompleteParams = z.infer<typeof CreateAutocompleteParamsSchema>;

// 30. Create Tag Input
export const CreateTagInputParamsSchema = z.object({
    variant: z.enum(["simple", "with-suggestions", "colored", "removable"]).optional().default("simple"),
    placeholder: z.string().optional().default("Add tag..."),
    tags: z.array(z.object({
        label: z.string(),
        color: z.string().optional(),
    })).optional(),
    suggestions: z.array(z.string()).optional(),
    maxTags: z.number().optional(),
    allowDuplicates: z.boolean().optional().default(false),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateTagInputParams = z.infer<typeof CreateTagInputParamsSchema>;

// ============================================
// DATA DISPLAY PATTERNS (10 tools)
// ============================================

// 31. Create Data Table
export const CreateDataTableParamsSchema = z.object({
    variant: z.enum(["simple", "sortable", "selectable", "expandable", "virtualized"]).optional().default("simple"),
    columns: z.array(z.object({
        key: z.string(),
        header: z.string(),
        width: z.number().optional(),
        sortable: z.boolean().optional(),
        align: z.enum(["left", "center", "right"]).optional(),
    })),
    data: z.array(z.record(z.any())).optional().describe("Sample data rows"),
    showPagination: z.boolean().optional().default(true),
    showSearch: z.boolean().optional().default(true),
    showFilters: z.boolean().optional().default(false),
    selectable: z.boolean().optional().default(false),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateDataTableParams = z.infer<typeof CreateDataTableParamsSchema>;

// 32. Create Kanban Board
export const CreateKanbanBoardParamsSchema = z.object({
    columns: z.array(z.object({
        title: z.string(),
        color: z.string().optional(),
        cards: z.array(z.object({
            title: z.string(),
            description: z.string().optional(),
            labels: z.array(z.object({
                text: z.string(),
                color: z.string(),
            })).optional(),
            assignee: z.string().optional(),
            dueDate: z.string().optional(),
        })).optional(),
    })),
    showAddCard: z.boolean().optional().default(true),
    showAddColumn: z.boolean().optional().default(true),
    cardWidth: z.number().optional().default(280),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateKanbanBoardParams = z.infer<typeof CreateKanbanBoardParamsSchema>;

// 33. Create Calendar View
export const CreateCalendarViewParamsSchema = z.object({
    variant: z.enum(["month", "week", "day", "agenda", "year"]).optional().default("month"),
    events: z.array(z.object({
        title: z.string(),
        start: z.string(),
        end: z.string().optional(),
        color: z.string().optional(),
        allDay: z.boolean().optional(),
    })).optional(),
    showWeekNumbers: z.boolean().optional().default(false),
    showNavigation: z.boolean().optional().default(true),
    showToday: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateCalendarViewParams = z.infer<typeof CreateCalendarViewParamsSchema>;

// 34. Create List View
export const CreateListViewParamsSchema = z.object({
    variant: z.enum(["simple", "with-avatars", "with-actions", "with-dividers", "compact"]).optional().default("simple"),
    items: z.array(z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        meta: z.string().optional(),
        actions: z.array(z.string()).optional(),
    })),
    showDividers: z.boolean().optional().default(true),
    showActions: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateListViewParams = z.infer<typeof CreateListViewParamsSchema>;

// 35. Create Grid View
export const CreateGridViewParamsSchema = z.object({
    variant: z.enum(["cards", "images", "products", "files", "mixed"]).optional().default("cards"),
    columns: z.number().optional().default(3),
    gap: z.number().optional().default(24),
    items: z.array(z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        imageUrl: z.string().optional(),
        meta: z.string().optional(),
        badge: z.string().optional(),
    })).optional(),
    aspectRatio: z.string().optional().default("1:1"),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateGridViewParams = z.infer<typeof CreateGridViewParamsSchema>;

// 36. Create Tree View
export const CreateTreeViewParamsSchema = z.object({
    variant: z.enum(["simple", "with-icons", "with-checkboxes", "file-explorer"]).optional().default("simple"),
    data: z.array(z.object({
        label: z.string(),
        icon: z.string().optional(),
        isExpanded: z.boolean().optional(),
        children: z.array(z.any()).optional(),
    })),
    showIcons: z.boolean().optional().default(true),
    showLines: z.boolean().optional().default(true),
    selectable: z.boolean().optional().default(false),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateTreeViewParams = z.infer<typeof CreateTreeViewParamsSchema>;

// 37. Create Chart Area
export const CreateChartAreaParamsSchema = z.object({
    chartType: z.enum(["line", "bar", "area", "pie", "donut", "scatter", "radar"]).describe("Chart type"),
    title: z.string().optional(),
    data: z.array(z.object({
        label: z.string(),
        value: z.number(),
        color: z.string().optional(),
    })).optional(),
    showLegend: z.boolean().optional().default(true),
    showGrid: z.boolean().optional().default(true),
    showTooltip: z.boolean().optional().default(true),
    width: z.number().optional().default(400),
    height: z.number().optional().default(300),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateChartAreaParams = z.infer<typeof CreateChartAreaParamsSchema>;

// 38. Create Dashboard Widget
export const CreateDashboardWidgetParamsSchema = z.object({
    variant: z.enum(["stat", "chart", "list", "table", "progress", "activity"]).describe("Widget type"),
    title: z.string(),
    value: z.string().optional(),
    change: z.string().optional(),
    trend: z.enum(["up", "down", "stable"]).optional(),
    icon: z.string().optional(),
    chartType: z.enum(["line", "bar", "sparkline"]).optional(),
    width: z.enum(["1", "2", "3", "4"]).optional().describe("Grid columns"),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateDashboardWidgetParams = z.infer<typeof CreateDashboardWidgetParamsSchema>;

// 39. Create Activity Feed
export const CreateActivityFeedParamsSchema = z.object({
    variant: z.enum(["simple", "with-avatars", "grouped", "with-actions"]).optional().default("with-avatars"),
    activities: z.array(z.object({
        user: z.string(),
        action: z.string(),
        target: z.string().optional(),
        timestamp: z.string(),
        avatarUrl: z.string().optional(),
        icon: z.string().optional(),
    })),
    showTimestamp: z.boolean().optional().default(true),
    showAvatars: z.boolean().optional().default(true),
    groupByDate: z.boolean().optional().default(false),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateActivityFeedParams = z.infer<typeof CreateActivityFeedParamsSchema>;

// 40. Create Notification Center
export const CreateNotificationCenterParamsSchema = z.object({
    variant: z.enum(["dropdown", "sidebar", "modal", "toast-stack"]).optional().default("dropdown"),
    notifications: z.array(z.object({
        title: z.string(),
        message: z.string(),
        type: z.enum(["info", "success", "warning", "error"]).optional(),
        timestamp: z.string().optional(),
        isRead: z.boolean().optional(),
        action: z.string().optional(),
    })).optional(),
    showUnreadCount: z.boolean().optional().default(true),
    showMarkAllRead: z.boolean().optional().default(true),
    showClearAll: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateNotificationCenterParams = z.infer<typeof CreateNotificationCenterParamsSchema>;

// ============================================
// FEEDBACK PATTERNS (10 tools)
// ============================================

// 41. Create Toast
export const CreateToastParamsSchema = z.object({
    variant: z.enum(["simple", "with-action", "with-icon", "with-progress", "promise"]).optional().default("simple"),
    type: z.enum(["info", "success", "warning", "error", "loading"]).optional().default("info"),
    title: z.string(),
    description: z.string().optional(),
    action: z.object({
        label: z.string(),
        onClick: z.string().optional(),
    }).optional(),
    position: z.enum(["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"]).optional().default("bottom-right"),
    duration: z.number().optional().default(5000),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateToastParams = z.infer<typeof CreateToastParamsSchema>;

// 42. Create Alert Banner
export const CreateAlertBannerParamsSchema = z.object({
    variant: z.enum(["inline", "floating", "full-width", "dismissible"]).optional().default("inline"),
    type: z.enum(["info", "success", "warning", "error"]).optional().default("info"),
    title: z.string().optional(),
    message: z.string(),
    action: z.object({
        label: z.string(),
        href: z.string().optional(),
    }).optional(),
    dismissible: z.boolean().optional().default(true),
    showIcon: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateAlertBannerParams = z.infer<typeof CreateAlertBannerParamsSchema>;

// 43. Create Progress Bar
export const CreateProgressBarParamsSchema = z.object({
    variant: z.enum(["linear", "circular", "segmented", "stepped", "indeterminate"]).optional().default("linear"),
    value: z.number().optional().default(50),
    max: z.number().optional().default(100),
    showLabel: z.boolean().optional().default(true),
    showPercentage: z.boolean().optional().default(true),
    size: z.enum(["sm", "md", "lg"]).optional().default("md"),
    color: z.string().optional(),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateProgressBarParams = z.infer<typeof CreateProgressBarParamsSchema>;

// 44. Create Skeleton Loader
export const CreateSkeletonLoaderParamsSchema = z.object({
    variant: z.enum(["card", "list", "table", "profile", "article", "dashboard", "custom"]).optional().default("card"),
    lines: z.number().optional().default(3),
    showAvatar: z.boolean().optional().default(false),
    showImage: z.boolean().optional().default(false),
    animation: z.enum(["pulse", "wave", "none"]).optional().default("pulse"),
    width: z.number().optional(),
    height: z.number().optional(),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateSkeletonLoaderParams = z.infer<typeof CreateSkeletonLoaderParamsSchema>;

// 45. Create Empty State
export const CreateEmptyStateParamsSchema = z.object({
    variant: z.enum(["simple", "with-illustration", "with-action", "error", "search"]).optional().default("simple"),
    title: z.string(),
    description: z.string().optional(),
    illustrationType: z.enum(["no-data", "no-results", "error", "success", "custom"]).optional(),
    primaryAction: z.object({
        label: z.string(),
        variant: z.enum(["solid", "outline"]).optional(),
    }).optional(),
    secondaryAction: z.object({
        label: z.string(),
    }).optional(),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateEmptyStateParams = z.infer<typeof CreateEmptyStateParamsSchema>;

// 46. Create Error State
export const CreateErrorStateParamsSchema = z.object({
    variant: z.enum(["inline", "page", "modal", "banner"]).optional().default("page"),
    errorCode: z.string().optional().describe("Error code like 404, 500"),
    title: z.string(),
    description: z.string().optional(),
    showRetry: z.boolean().optional().default(true),
    showHome: z.boolean().optional().default(true),
    showContact: z.boolean().optional().default(false),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateErrorStateParams = z.infer<typeof CreateErrorStateParamsSchema>;

// 47. Create Success State
export const CreateSuccessStateParamsSchema = z.object({
    variant: z.enum(["inline", "page", "modal", "confetti"]).optional().default("page"),
    title: z.string(),
    description: z.string().optional(),
    showAnimation: z.boolean().optional().default(true),
    primaryAction: z.object({
        label: z.string(),
    }).optional(),
    secondaryAction: z.object({
        label: z.string(),
    }).optional(),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateSuccessStateParams = z.infer<typeof CreateSuccessStateParamsSchema>;

// 48. Create Loading Spinner
export const CreateLoadingSpinnerParamsSchema = z.object({
    variant: z.enum(["spinner", "dots", "bars", "pulse", "skeleton", "progress"]).optional().default("spinner"),
    size: z.enum(["xs", "sm", "md", "lg", "xl"]).optional().default("md"),
    color: z.string().optional(),
    label: z.string().optional().describe("Loading text"),
    overlay: z.boolean().optional().default(false),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateLoadingSpinnerParams = z.infer<typeof CreateLoadingSpinnerParamsSchema>;

// 49. Create Confirmation Modal
export const CreateConfirmationModalParamsSchema = z.object({
    variant: z.enum(["default", "destructive", "warning", "success"]).optional().default("default"),
    title: z.string(),
    description: z.string(),
    confirmText: z.string().optional().default("Confirm"),
    cancelText: z.string().optional().default("Cancel"),
    showIcon: z.boolean().optional().default(true),
    requireInput: z.string().optional().describe("Text user must type to confirm"),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateConfirmationModalParams = z.infer<typeof CreateConfirmationModalParamsSchema>;

// 50. Create Tooltip
export const CreateTooltipParamsSchema = z.object({
    variant: z.enum(["simple", "rich", "with-arrow", "interactive"]).optional().default("simple"),
    content: z.string(),
    position: z.enum(["top", "right", "bottom", "left"]).optional().default("top"),
    trigger: z.enum(["hover", "click", "focus"]).optional().default("hover"),
    delay: z.number().optional().default(200),
    maxWidth: z.number().optional().default(200),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateTooltipParams = z.infer<typeof CreateTooltipParamsSchema>;

// ============================================
// LAYOUT PATTERNS (10 tools)
// ============================================

// 51. Create Split View
export const CreateSplitViewParamsSchema = z.object({
    variant: z.enum(["horizontal", "vertical", "resizable", "collapsible"]).optional().default("horizontal"),
    ratio: z.string().optional().default("50:50").describe("Split ratio like 30:70"),
    minSize: z.number().optional().describe("Minimum panel size"),
    showDivider: z.boolean().optional().default(true),
    collapsible: z.enum(["left", "right", "both", "none"]).optional().default("none"),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateSplitViewParams = z.infer<typeof CreateSplitViewParamsSchema>;

// 52. Create Master Detail
export const CreateMasterDetailParamsSchema = z.object({
    variant: z.enum(["sidebar", "list-detail", "table-detail", "responsive"]).optional().default("sidebar"),
    masterWidth: z.number().optional().default(320),
    items: z.array(z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        isSelected: z.boolean().optional(),
    })).optional(),
    showSearch: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateMasterDetailParams = z.infer<typeof CreateMasterDetailParamsSchema>;

// 53. Create Holy Grail Layout
export const CreateHolyGrailLayoutParamsSchema = z.object({
    headerHeight: z.number().optional().default(64),
    footerHeight: z.number().optional().default(48),
    leftSidebarWidth: z.number().optional().default(240),
    rightSidebarWidth: z.number().optional().default(240),
    showHeader: z.boolean().optional().default(true),
    showFooter: z.boolean().optional().default(true),
    showLeftSidebar: z.boolean().optional().default(true),
    showRightSidebar: z.boolean().optional().default(false),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateHolyGrailLayoutParams = z.infer<typeof CreateHolyGrailLayoutParamsSchema>;

// 54. Create Card Grid
export const CreateCardGridParamsSchema = z.object({
    columns: z.number().optional().default(3),
    gap: z.number().optional().default(24),
    cards: z.array(z.object({
        title: z.string(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        footer: z.string().optional(),
    })).optional(),
    cardVariant: z.enum(["elevated", "outlined", "filled"]).optional().default("elevated"),
    aspectRatio: z.string().optional(),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateCardGridParams = z.infer<typeof CreateCardGridParamsSchema>;

// 55. Create Masonry Grid
export const CreateMasonryGridParamsSchema = z.object({
    columns: z.number().optional().default(3),
    gap: z.number().optional().default(16),
    items: z.array(z.object({
        content: z.string(),
        height: z.number().optional(),
        imageUrl: z.string().optional(),
    })).optional(),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateMasonryGridParams = z.infer<typeof CreateMasonryGridParamsSchema>;

// 56. Create Sticky Header
export const CreateStickyHeaderParamsSchema = z.object({
    variant: z.enum(["simple", "shrinking", "revealing", "with-progress"]).optional().default("simple"),
    height: z.number().optional().default(64),
    showShadowOnScroll: z.boolean().optional().default(true),
    showProgress: z.boolean().optional().default(false),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateStickyHeaderParams = z.infer<typeof CreateStickyHeaderParamsSchema>;

// 57. Create Floating Action
export const CreateFloatingActionParamsSchema = z.object({
    variant: z.enum(["single", "speed-dial", "extended", "mini"]).optional().default("single"),
    icon: z.string().optional().default("plus"),
    label: z.string().optional(),
    position: z.enum(["bottom-right", "bottom-left", "bottom-center"]).optional().default("bottom-right"),
    actions: z.array(z.object({
        icon: z.string(),
        label: z.string(),
    })).optional().describe("Speed dial actions"),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateFloatingActionParams = z.infer<typeof CreateFloatingActionParamsSchema>;

// 58. Create Slide Over
export const CreateSlideOverParamsSchema = z.object({
    position: z.enum(["right", "left", "bottom", "top"]).optional().default("right"),
    width: z.number().optional().default(400),
    title: z.string().optional(),
    showOverlay: z.boolean().optional().default(true),
    showClose: z.boolean().optional().default(true),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateSlideOverParams = z.infer<typeof CreateSlideOverParamsSchema>;

// 59. Create Drawer
export const CreateDrawerParamsSchema = z.object({
    variant: z.enum(["persistent", "temporary", "mini", "responsive"]).optional().default("temporary"),
    position: z.enum(["left", "right"]).optional().default("left"),
    width: z.number().optional().default(280),
    showOverlay: z.boolean().optional().default(true),
    collapsible: z.boolean().optional().default(false),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateDrawerParams = z.infer<typeof CreateDrawerParamsSchema>;

// 60. Create Fullscreen Modal
export const CreateFullscreenModalParamsSchema = z.object({
    variant: z.enum(["simple", "with-sidebar", "with-steps", "gallery"]).optional().default("simple"),
    title: z.string().optional(),
    showClose: z.boolean().optional().default(true),
    showNavigation: z.boolean().optional().default(false),
    animation: z.enum(["fade", "slide-up", "scale", "none"]).optional().default("fade"),
    parentId: z.string().optional(),
    theme: z.enum(["light", "dark"]).optional().default("light"),
});
export type CreateFullscreenModalParams = z.infer<typeof CreateFullscreenModalParamsSchema>;
