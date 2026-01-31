import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TaskManager } from "../../task-manager.js";
import { safeToolProcessor } from "../utils.js";
import * as UI from "../../shared/types/params/ui-patterns/index.js";

/**
 * UI Pattern Tools (60 tools)
 * Tools for creating common UI patterns and components
 */
export function registerUIPatternTools(server: McpServer, taskManager: TaskManager) {
    // ============================================
    // NAVIGATION PATTERNS (10 tools)
    // ============================================

    // 1. Create Navbar
    server.tool(
        "create-navbar",
        "Create a navigation bar with logo, menu items, search, and CTA options.",
        UI.CreateNavbarParamsSchema.shape,
        async (params: UI.CreateNavbarParams) => {
            return await safeToolProcessor(taskManager.runTask("create-navbar", params));
        }
    );

    // 2. Create Sidebar
    server.tool(
        "create-sidebar",
        "Generate a sidebar navigation with sections, icons, and optional user profile.",
        UI.CreateSidebarParamsSchema.shape,
        async (params: UI.CreateSidebarParams) => {
            return await safeToolProcessor(taskManager.runTask("create-sidebar", params));
        }
    );

    // 3. Create Tabs
    server.tool(
        "create-tabs",
        "Create tab navigation with various styles: underline, pills, boxed, or vertical.",
        UI.CreateTabsParamsSchema.shape,
        async (params: UI.CreateTabsParams) => {
            return await safeToolProcessor(taskManager.runTask("create-tabs", params));
        }
    );

    // 4. Create Breadcrumbs
    server.tool(
        "create-breadcrumbs",
        "Generate breadcrumb navigation showing the user's location in the hierarchy.",
        UI.CreateBreadcrumbsParamsSchema.shape,
        async (params: UI.CreateBreadcrumbsParams) => {
            return await safeToolProcessor(taskManager.runTask("create-breadcrumbs", params));
        }
    );

    // 5. Create Pagination
    server.tool(
        "create-pagination",
        "Create pagination controls for navigating through content pages.",
        UI.CreatePaginationParamsSchema.shape,
        async (params: UI.CreatePaginationParams) => {
            return await safeToolProcessor(taskManager.runTask("create-pagination", params));
        }
    );

    // 6. Create Stepper
    server.tool(
        "create-stepper",
        "Generate a step indicator for multi-step processes and wizards.",
        UI.CreateStepperParamsSchema.shape,
        async (params: UI.CreateStepperParams) => {
            return await safeToolProcessor(taskManager.runTask("create-stepper", params));
        }
    );

    // 7. Create Bottom Nav
    server.tool(
        "create-bottom-nav",
        "Create a mobile bottom navigation bar with icons and labels.",
        UI.CreateBottomNavParamsSchema.shape,
        async (params: UI.CreateBottomNavParams) => {
            return await safeToolProcessor(taskManager.runTask("create-bottom-nav", params));
        }
    );

    // 8. Create Mega Menu
    server.tool(
        "create-mega-menu",
        "Generate a mega menu with columns of links and optional featured section.",
        UI.CreateMegaMenuParamsSchema.shape,
        async (params: UI.CreateMegaMenuParams) => {
            return await safeToolProcessor(taskManager.runTask("create-mega-menu", params));
        }
    );

    // 9. Create Command Palette
    server.tool(
        "create-command-palette",
        "Create a command palette (cmd+k style) with search and command groups.",
        UI.CreateCommandPaletteParamsSchema.shape,
        async (params: UI.CreateCommandPaletteParams) => {
            return await safeToolProcessor(taskManager.runTask("create-command-palette", params));
        }
    );

    // 10. Create Search Bar
    server.tool(
        "create-search-bar",
        "Generate a search bar with optional filters, suggestions, and voice input.",
        UI.CreateSearchBarParamsSchema.shape,
        async (params: UI.CreateSearchBarParams) => {
            return await safeToolProcessor(taskManager.runTask("create-search-bar", params));
        }
    );

    // ============================================
    // CONTENT PATTERNS (10 tools)
    // ============================================

    // 11. Create Hero Section
    server.tool(
        "create-hero-section",
        "Create a hero section with headline, subheadline, CTAs, and optional image.",
        UI.CreateHeroSectionParamsSchema.shape,
        async (params: UI.CreateHeroSectionParams) => {
            return await safeToolProcessor(taskManager.runTask("create-hero-section", params));
        }
    );

    // 12. Create Feature Grid
    server.tool(
        "create-feature-grid",
        "Generate a feature grid showcasing product features with icons or images.",
        UI.CreateFeatureGridParamsSchema.shape,
        async (params: UI.CreateFeatureGridParams) => {
            return await safeToolProcessor(taskManager.runTask("create-feature-grid", params));
        }
    );

    // 13. Create Testimonial
    server.tool(
        "create-testimonial",
        "Create testimonial displays: single, carousel, grid, or featured layout.",
        UI.CreateTestimonialParamsSchema.shape,
        async (params: UI.CreateTestimonialParams) => {
            return await safeToolProcessor(taskManager.runTask("create-testimonial", params));
        }
    );

    // 14. Create Pricing Table
    server.tool(
        "create-pricing-table",
        "Generate a pricing table with plans, features, and CTAs.",
        UI.CreatePricingTableParamsSchema.shape,
        async (params: UI.CreatePricingTableParams) => {
            return await safeToolProcessor(taskManager.runTask("create-pricing-table", params));
        }
    );

    // 15. Create Comparison Table
    server.tool(
        "create-comparison-table",
        "Create a comparison table for features or products side by side.",
        UI.CreateComparisonTableParamsSchema.shape,
        async (params: UI.CreateComparisonTableParams) => {
            return await safeToolProcessor(taskManager.runTask("create-comparison-table", params));
        }
    );

    // 16. Create FAQ Accordion
    server.tool(
        "create-faq-accordion",
        "Generate an FAQ accordion with expandable question/answer items.",
        UI.CreateFAQAccordionParamsSchema.shape,
        async (params: UI.CreateFAQAccordionParams) => {
            return await safeToolProcessor(taskManager.runTask("create-faq-accordion", params));
        }
    );

    // 17. Create Timeline
    server.tool(
        "create-timeline",
        "Create a timeline visualization for events, history, or processes.",
        UI.CreateTimelineParamsSchema.shape,
        async (params: UI.CreateTimelineParams) => {
            return await safeToolProcessor(taskManager.runTask("create-timeline", params));
        }
    );

    // 18. Create Stats Grid
    server.tool(
        "create-stats-grid",
        "Generate a statistics grid showing key metrics and numbers.",
        UI.CreateStatsGridParamsSchema.shape,
        async (params: UI.CreateStatsGridParams) => {
            return await safeToolProcessor(taskManager.runTask("create-stats-grid", params));
        }
    );

    // 19. Create Team Grid
    server.tool(
        "create-team-grid",
        "Create a team member grid with photos, names, roles, and social links.",
        UI.CreateTeamGridParamsSchema.shape,
        async (params: UI.CreateTeamGridParams) => {
            return await safeToolProcessor(taskManager.runTask("create-team-grid", params));
        }
    );

    // 20. Create Gallery
    server.tool(
        "create-gallery",
        "Generate an image gallery in grid, masonry, carousel, or lightbox layout.",
        UI.CreateGalleryParamsSchema.shape,
        async (params: UI.CreateGalleryParams) => {
            return await safeToolProcessor(taskManager.runTask("create-gallery", params));
        }
    );

    // ============================================
    // FORM PATTERNS (10 tools)
    // ============================================

    // 21. Create Login Form
    server.tool(
        "create-login-form",
        "Create a login form with email/password, social login, and remember me options.",
        UI.CreateLoginFormParamsSchema.shape,
        async (params: UI.CreateLoginFormParams) => {
            return await safeToolProcessor(taskManager.runTask("create-login-form", params));
        }
    );

    // 22. Create Signup Form
    server.tool(
        "create-signup-form",
        "Generate a signup/registration form with customizable fields and social signup.",
        UI.CreateSignupFormParamsSchema.shape,
        async (params: UI.CreateSignupFormParams) => {
            return await safeToolProcessor(taskManager.runTask("create-signup-form", params));
        }
    );

    // 23. Create Checkout Form
    server.tool(
        "create-checkout-form",
        "Create a checkout form with contact, shipping, billing, and payment sections.",
        UI.CreateCheckoutFormParamsSchema.shape,
        async (params: UI.CreateCheckoutFormParams) => {
            return await safeToolProcessor(taskManager.runTask("create-checkout-form", params));
        }
    );

    // 24. Create Search Filters
    server.tool(
        "create-search-filters",
        "Generate search filter UI with checkboxes, ranges, selects, and active filters.",
        UI.CreateSearchFiltersParamsSchema.shape,
        async (params: UI.CreateSearchFiltersParams) => {
            return await safeToolProcessor(taskManager.runTask("create-search-filters", params));
        }
    );

    // 25. Create Date Picker
    server.tool(
        "create-date-picker",
        "Create a date picker: single date, range, multiple, or with presets.",
        UI.CreateDatePickerParamsSchema.shape,
        async (params: UI.CreateDatePickerParams) => {
            return await safeToolProcessor(taskManager.runTask("create-date-picker", params));
        }
    );

    // 26. Create File Upload
    server.tool(
        "create-file-upload",
        "Generate a file upload component: dropzone, button, avatar, or gallery style.",
        UI.CreateFileUploadParamsSchema.shape,
        async (params: UI.CreateFileUploadParams) => {
            return await safeToolProcessor(taskManager.runTask("create-file-upload", params));
        }
    );

    // 27. Create Multi-Step Form
    server.tool(
        "create-multi-step-form",
        "Create a multi-step form wizard with progress indicator and navigation.",
        UI.CreateMultiStepFormParamsSchema.shape,
        async (params: UI.CreateMultiStepFormParams) => {
            return await safeToolProcessor(taskManager.runTask("create-multi-step-form", params));
        }
    );

    // 28. Create Inline Edit
    server.tool(
        "create-inline-edit",
        "Generate an inline edit component for text, textarea, or select inputs.",
        UI.CreateInlineEditParamsSchema.shape,
        async (params: UI.CreateInlineEditParams) => {
            return await safeToolProcessor(taskManager.runTask("create-inline-edit", params));
        }
    );

    // 29. Create Autocomplete
    server.tool(
        "create-autocomplete",
        "Create an autocomplete input with suggestions, icons, and multi-select options.",
        UI.CreateAutocompleteParamsSchema.shape,
        async (params: UI.CreateAutocompleteParams) => {
            return await safeToolProcessor(taskManager.runTask("create-autocomplete", params));
        }
    );

    // 30. Create Tag Input
    server.tool(
        "create-tag-input",
        "Generate a tag input with add/remove functionality and suggestions.",
        UI.CreateTagInputParamsSchema.shape,
        async (params: UI.CreateTagInputParams) => {
            return await safeToolProcessor(taskManager.runTask("create-tag-input", params));
        }
    );

    // ============================================
    // DATA DISPLAY PATTERNS (10 tools)
    // ============================================

    // 31. Create Data Table
    server.tool(
        "create-data-table",
        "Create a data table with sorting, selection, pagination, and search.",
        UI.CreateDataTableParamsSchema.shape,
        async (params: UI.CreateDataTableParams) => {
            return await safeToolProcessor(taskManager.runTask("create-data-table", params));
        }
    );

    // 32. Create Kanban Board
    server.tool(
        "create-kanban-board",
        "Generate a kanban board with columns, cards, and drag-drop capability.",
        UI.CreateKanbanBoardParamsSchema.shape,
        async (params: UI.CreateKanbanBoardParams) => {
            return await safeToolProcessor(taskManager.runTask("create-kanban-board", params));
        }
    );

    // 33. Create Calendar View
    server.tool(
        "create-calendar-view",
        "Create a calendar view: month, week, day, agenda, or year layout.",
        UI.CreateCalendarViewParamsSchema.shape,
        async (params: UI.CreateCalendarViewParams) => {
            return await safeToolProcessor(taskManager.runTask("create-calendar-view", params));
        }
    );

    // 34. Create List View
    server.tool(
        "create-list-view",
        "Generate a list view with items, avatars, actions, and dividers.",
        UI.CreateListViewParamsSchema.shape,
        async (params: UI.CreateListViewParams) => {
            return await safeToolProcessor(taskManager.runTask("create-list-view", params));
        }
    );

    // 35. Create Grid View
    server.tool(
        "create-grid-view",
        "Create a grid view for cards, images, products, or files.",
        UI.CreateGridViewParamsSchema.shape,
        async (params: UI.CreateGridViewParams) => {
            return await safeToolProcessor(taskManager.runTask("create-grid-view", params));
        }
    );

    // 36. Create Tree View
    server.tool(
        "create-tree-view",
        "Generate a tree view for hierarchical data like file explorers.",
        UI.CreateTreeViewParamsSchema.shape,
        async (params: UI.CreateTreeViewParams) => {
            return await safeToolProcessor(taskManager.runTask("create-tree-view", params));
        }
    );

    // 37. Create Chart Area
    server.tool(
        "create-chart-area",
        "Create a chart placeholder: line, bar, area, pie, donut, or scatter.",
        UI.CreateChartAreaParamsSchema.shape,
        async (params: UI.CreateChartAreaParams) => {
            return await safeToolProcessor(taskManager.runTask("create-chart-area", params));
        }
    );

    // 38. Create Dashboard Widget
    server.tool(
        "create-dashboard-widget",
        "Generate a dashboard widget: stat, chart, list, table, or activity.",
        UI.CreateDashboardWidgetParamsSchema.shape,
        async (params: UI.CreateDashboardWidgetParams) => {
            return await safeToolProcessor(taskManager.runTask("create-dashboard-widget", params));
        }
    );

    // 39. Create Activity Feed
    server.tool(
        "create-activity-feed",
        "Create an activity feed showing user actions and timestamps.",
        UI.CreateActivityFeedParamsSchema.shape,
        async (params: UI.CreateActivityFeedParams) => {
            return await safeToolProcessor(taskManager.runTask("create-activity-feed", params));
        }
    );

    // 40. Create Notification Center
    server.tool(
        "create-notification-center",
        "Generate a notification center: dropdown, sidebar, or toast stack.",
        UI.CreateNotificationCenterParamsSchema.shape,
        async (params: UI.CreateNotificationCenterParams) => {
            return await safeToolProcessor(taskManager.runTask("create-notification-center", params));
        }
    );

    // ============================================
    // FEEDBACK PATTERNS (10 tools)
    // ============================================

    // 41. Create Toast
    server.tool(
        "create-toast",
        "Create a toast notification with action, icon, and position options.",
        UI.CreateToastParamsSchema.shape,
        async (params: UI.CreateToastParams) => {
            return await safeToolProcessor(taskManager.runTask("create-toast", params));
        }
    );

    // 42. Create Alert Banner
    server.tool(
        "create-alert-banner",
        "Generate an alert banner: inline, floating, or full-width.",
        UI.CreateAlertBannerParamsSchema.shape,
        async (params: UI.CreateAlertBannerParams) => {
            return await safeToolProcessor(taskManager.runTask("create-alert-banner", params));
        }
    );

    // 43. Create Progress Bar
    server.tool(
        "create-progress-bar",
        "Create a progress bar: linear, circular, segmented, or indeterminate.",
        UI.CreateProgressBarParamsSchema.shape,
        async (params: UI.CreateProgressBarParams) => {
            return await safeToolProcessor(taskManager.runTask("create-progress-bar", params));
        }
    );

    // 44. Create Skeleton Loader
    server.tool(
        "create-skeleton-loader",
        "Generate a skeleton loader for cards, lists, tables, or custom layouts.",
        UI.CreateSkeletonLoaderParamsSchema.shape,
        async (params: UI.CreateSkeletonLoaderParams) => {
            return await safeToolProcessor(taskManager.runTask("create-skeleton-loader", params));
        }
    );

    // 45. Create Empty State
    server.tool(
        "create-empty-state",
        "Create an empty state with illustration, message, and action buttons.",
        UI.CreateEmptyStateParamsSchema.shape,
        async (params: UI.CreateEmptyStateParams) => {
            return await safeToolProcessor(taskManager.runTask("create-empty-state", params));
        }
    );

    // 46. Create Error State
    server.tool(
        "create-error-state",
        "Generate an error state for inline, page, or modal contexts.",
        UI.CreateErrorStateParamsSchema.shape,
        async (params: UI.CreateErrorStateParams) => {
            return await safeToolProcessor(taskManager.runTask("create-error-state", params));
        }
    );

    // 47. Create Success State
    server.tool(
        "create-success-state",
        "Create a success state with animation and next action options.",
        UI.CreateSuccessStateParamsSchema.shape,
        async (params: UI.CreateSuccessStateParams) => {
            return await safeToolProcessor(taskManager.runTask("create-success-state", params));
        }
    );

    // 48. Create Loading Spinner
    server.tool(
        "create-loading-spinner",
        "Generate a loading indicator: spinner, dots, bars, or pulse.",
        UI.CreateLoadingSpinnerParamsSchema.shape,
        async (params: UI.CreateLoadingSpinnerParams) => {
            return await safeToolProcessor(taskManager.runTask("create-loading-spinner", params));
        }
    );

    // 49. Create Confirmation Modal
    server.tool(
        "create-confirmation-modal",
        "Create a confirmation modal for destructive or important actions.",
        UI.CreateConfirmationModalParamsSchema.shape,
        async (params: UI.CreateConfirmationModalParams) => {
            return await safeToolProcessor(taskManager.runTask("create-confirmation-modal", params));
        }
    );

    // 50. Create Tooltip
    server.tool(
        "create-tooltip",
        "Generate a tooltip: simple text, rich content, or interactive.",
        UI.CreateTooltipParamsSchema.shape,
        async (params: UI.CreateTooltipParams) => {
            return await safeToolProcessor(taskManager.runTask("create-tooltip", params));
        }
    );

    // ============================================
    // LAYOUT PATTERNS (10 tools)
    // ============================================

    // 51. Create Split View
    server.tool(
        "create-split-view",
        "Create a split view layout: horizontal, vertical, or resizable.",
        UI.CreateSplitViewParamsSchema.shape,
        async (params: UI.CreateSplitViewParams) => {
            return await safeToolProcessor(taskManager.runTask("create-split-view", params));
        }
    );

    // 52. Create Master Detail
    server.tool(
        "create-master-detail",
        "Generate a master-detail layout with list and detail panels.",
        UI.CreateMasterDetailParamsSchema.shape,
        async (params: UI.CreateMasterDetailParams) => {
            return await safeToolProcessor(taskManager.runTask("create-master-detail", params));
        }
    );

    // 53. Create Holy Grail Layout
    server.tool(
        "create-holy-grail-layout",
        "Create a holy grail layout with header, footer, and sidebars.",
        UI.CreateHolyGrailLayoutParamsSchema.shape,
        async (params: UI.CreateHolyGrailLayoutParams) => {
            return await safeToolProcessor(taskManager.runTask("create-holy-grail-layout", params));
        }
    );

    // 54. Create Card Grid
    server.tool(
        "create-card-grid",
        "Generate a card grid layout with customizable columns and gaps.",
        UI.CreateCardGridParamsSchema.shape,
        async (params: UI.CreateCardGridParams) => {
            return await safeToolProcessor(taskManager.runTask("create-card-grid", params));
        }
    );

    // 55. Create Masonry Grid
    server.tool(
        "create-masonry-grid",
        "Create a masonry grid layout for variable height content.",
        UI.CreateMasonryGridParamsSchema.shape,
        async (params: UI.CreateMasonryGridParams) => {
            return await safeToolProcessor(taskManager.runTask("create-masonry-grid", params));
        }
    );

    // 56. Create Sticky Header
    server.tool(
        "create-sticky-header",
        "Generate a sticky header: simple, shrinking, or with progress.",
        UI.CreateStickyHeaderParamsSchema.shape,
        async (params: UI.CreateStickyHeaderParams) => {
            return await safeToolProcessor(taskManager.runTask("create-sticky-header", params));
        }
    );

    // 57. Create Floating Action
    server.tool(
        "create-floating-action",
        "Create a floating action button: single, speed dial, or extended.",
        UI.CreateFloatingActionParamsSchema.shape,
        async (params: UI.CreateFloatingActionParams) => {
            return await safeToolProcessor(taskManager.runTask("create-floating-action", params));
        }
    );

    // 58. Create Slide Over
    server.tool(
        "create-slide-over",
        "Generate a slide-over panel from any edge of the screen.",
        UI.CreateSlideOverParamsSchema.shape,
        async (params: UI.CreateSlideOverParams) => {
            return await safeToolProcessor(taskManager.runTask("create-slide-over", params));
        }
    );

    // 59. Create Drawer
    server.tool(
        "create-drawer",
        "Create a drawer: persistent, temporary, mini, or responsive.",
        UI.CreateDrawerParamsSchema.shape,
        async (params: UI.CreateDrawerParams) => {
            return await safeToolProcessor(taskManager.runTask("create-drawer", params));
        }
    );

    // 60. Create Fullscreen Modal
    server.tool(
        "create-fullscreen-modal",
        "Generate a fullscreen modal: simple, with sidebar, or gallery.",
        UI.CreateFullscreenModalParamsSchema.shape,
        async (params: UI.CreateFullscreenModalParams) => {
            return await safeToolProcessor(taskManager.runTask("create-fullscreen-modal", params));
        }
    );
}
