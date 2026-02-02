/**
 * Visual Feedback System for AI-Created Elements
 * 
 * Provides visual feedback when AI creates or modifies nodes:
 * - Highlights nodes with borders
 * - Popup animation effects
 * - Automatic cleanup after operations
 */

interface FeedbackNode {
    node: SceneNode;
    createdAt: number;
}

class VisualFeedbackManager {
    private highlightedNodes: FeedbackNode[] = [];
    private cleanupTimer: NodeJS.Timeout | null = null;
    private isActive = false;

    /**
     * Start visual feedback mode
     */
    start() {
        this.isActive = true;
        this.highlightedNodes = [];
        this.clearCleanupTimer();
        console.log('🎨 Visual feedback activated');
    }

    /**
     * Highlight a newly created or modified node
     */
    async highlightNode(nodeId: string): Promise<void> {
        if (!this.isActive) return;

        try {
            const node = await figma.getNodeByIdAsync(nodeId);
            if (!node || !('visible' in node)) return;

            const sceneNode = node as SceneNode;

            // Add to highlighted nodes list
            this.highlightedNodes.push({
                node: sceneNode,
                createdAt: Date.now()
            });

            // Select the node (shows blue border in Figma)
            const currentSelection = figma.currentPage.selection;
            figma.currentPage.selection = [...currentSelection, sceneNode];

            // Zoom to show the node with animation
            figma.viewport.scrollAndZoomIntoView([sceneNode]);

            // Add popup animation effect
            await this.addPopupEffect(sceneNode);

            console.log(`✨ Highlighted node: ${sceneNode.name} (${sceneNode.type})`);
        } catch (error) {
            console.error('Failed to highlight node:', error);
        }
    }

    /**
     * Add a popup/zoom animation effect to a node
     */
    private async addPopupEffect(node: SceneNode): Promise<void> {
        if (!('opacity' in node)) return;

        try {
            const originalOpacity = node.opacity;

            // Animate: fade in with scale effect
            // Note: Figma doesn't support scale animations directly,
            // so we'll use opacity for visual feedback
            
            // Start at low opacity
            node.opacity = 0.3;
            await this.sleep(50);
            
            // Quick fade to full
            node.opacity = 1.0;
            await this.sleep(100);
            
            // Slight flash effect
            node.opacity = 0.8;
            await this.sleep(50);
            
            // Back to normal
            node.opacity = originalOpacity;

        } catch (error) {
            console.error('Popup effect failed:', error);
        }
    }

    /**
     * Stop visual feedback and clean up
     */
    async stop(delayMs: number = 2000): Promise<void> {
        if (!this.isActive) return;

        console.log(`⏱️ Scheduling cleanup in ${delayMs}ms...`);

        // Clear any existing timer
        this.clearCleanupTimer();

        // Schedule cleanup
        this.cleanupTimer = setTimeout(async () => {
            await this.cleanup();
        }, delayMs);
    }

    /**
     * Clean up visual feedback immediately
     */
    private async cleanup(): Promise<void> {
        console.log('🧹 Cleaning up visual feedback...');

        try {
            // Clear selection (removes borders)
            figma.currentPage.selection = [];

            // Log summary
            console.log(`✅ Cleaned up ${this.highlightedNodes.length} highlighted nodes`);

            // Reset state
            this.highlightedNodes = [];
            this.isActive = false;
            this.clearCleanupTimer();

        } catch (error) {
            console.error('Cleanup failed:', error);
        }
    }

    /**
     * Force immediate cleanup
     */
    async forceCleanup(): Promise<void> {
        this.clearCleanupTimer();
        await this.cleanup();
    }

    /**
     * Check if visual feedback is active
     */
    isActiveFeedback(): boolean {
        return this.isActive;
    }

    /**
     * Get highlighted nodes count
     */
    getHighlightedCount(): number {
        return this.highlightedNodes.length;
    }

    /**
     * Clear cleanup timer
     */
    private clearCleanupTimer(): void {
        if (this.cleanupTimer) {
            clearTimeout(this.cleanupTimer);
            this.cleanupTimer = null;
        }
    }

    /**
     * Sleep utility for animations
     */
    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Singleton instance
export const visualFeedback = new VisualFeedbackManager();

/**
 * Detect if a command is a "create" or "modify" operation
 */
export function isCreateOrModifyCommand(command: string): boolean {
    const createCommands = [
        'create-rectangle',
        'create-frame',
        'create-text',
        'create-instance',
        'create-component',
        'clone-node',
    ];

    const modifyCommands = [
        'move-node',
        'resize-node',
        'set-fill-color',
        'set-stroke-color',
        'set-corner-radius',
        'set-layout',
        'set-parent-id',
    ];

    return createCommands.includes(command) || modifyCommands.includes(command);
}

/**
 * Extract node ID from operation result
 */
export function extractNodeIdFromResult(result: any, command: string): string | null {
    if (!result || typeof result !== 'object') return null;

    // Most create operations return { id: "..." }
    if (result.id && typeof result.id === 'string') {
        return result.id;
    }

    // Some operations might return { nodeId: "..." }
    if (result.nodeId && typeof result.nodeId === 'string') {
        return result.nodeId;
    }

    // Clone operation returns the cloned node details
    if (command === 'clone-node' && result.clonedNode?.id) {
        return result.clonedNode.id;
    }

    return null;
}
