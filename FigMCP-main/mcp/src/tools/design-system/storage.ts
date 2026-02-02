/**
 * Storage system for custom design guidelines and style guides
 * Persists user-created design resources to JSON files
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Storage paths
const STORAGE_DIR = path.join(__dirname, '../../..', '.design-system-storage');
const GUIDELINES_FILE = path.join(STORAGE_DIR, 'custom-guidelines.json');
const STYLE_GUIDES_FILE = path.join(STORAGE_DIR, 'custom-style-guides.json');
const TAGS_FILE = path.join(STORAGE_DIR, 'custom-tags.json');

// Ensure storage directory exists
function ensureStorageDir() {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }
}

/**
 * Save custom guidelines to file
 */
export function saveCustomGuidelines(guidelines: Record<string, any>): void {
  try {
    ensureStorageDir();
    fs.writeFileSync(GUIDELINES_FILE, JSON.stringify(guidelines, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to save custom guidelines:', error);
  }
}

/**
 * Load custom guidelines from file
 */
export function loadCustomGuidelines(): Record<string, any> {
  try {
    if (fs.existsSync(GUIDELINES_FILE)) {
      const data = fs.readFileSync(GUIDELINES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load custom guidelines:', error);
  }
  return {};
}

/**
 * Save custom style guides to file
 */
export function saveCustomStyleGuides(styleGuides: any[]): void {
  try {
    ensureStorageDir();
    fs.writeFileSync(STYLE_GUIDES_FILE, JSON.stringify(styleGuides, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to save custom style guides:', error);
  }
}

/**
 * Load custom style guides from file
 */
export function loadCustomStyleGuides(): any[] {
  try {
    if (fs.existsSync(STYLE_GUIDES_FILE)) {
      const data = fs.readFileSync(STYLE_GUIDES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load custom style guides:', error);
  }
  return [];
}

/**
 * Save custom tags to file
 */
export function saveCustomTags(tags: Record<string, string[]>): void {
  try {
    ensureStorageDir();
    fs.writeFileSync(TAGS_FILE, JSON.stringify(tags, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to save custom tags:', error);
  }
}

/**
 * Load custom tags from file
 */
export function loadCustomTags(): Record<string, string[]> {
  try {
    if (fs.existsSync(TAGS_FILE)) {
      const data = fs.readFileSync(TAGS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load custom tags:', error);
  }
  return {};
}

/**
 * Delete a custom guideline
 */
export function deleteCustomGuideline(name: string): boolean {
  try {
    const guidelines = loadCustomGuidelines();
    if (guidelines[name]) {
      delete guidelines[name];
      saveCustomGuidelines(guidelines);
      return true;
    }
  } catch (error) {
    console.error('Failed to delete custom guideline:', error);
  }
  return false;
}

/**
 * Delete a custom style guide
 */
export function deleteCustomStyleGuide(name: string): boolean {
  try {
    const styleGuides = loadCustomStyleGuides();
    const index = styleGuides.findIndex(sg => sg.name === name);
    if (index !== -1) {
      styleGuides.splice(index, 1);
      saveCustomStyleGuides(styleGuides);
      return true;
    }
  } catch (error) {
    console.error('Failed to delete custom style guide:', error);
  }
  return false;
}

/**
 * Export all custom design resources
 */
export function exportDesignResources(): {
  guidelines: Record<string, any>;
  styleGuides: any[];
  tags: Record<string, string[]>;
} {
  return {
    guidelines: loadCustomGuidelines(),
    styleGuides: loadCustomStyleGuides(),
    tags: loadCustomTags()
  };
}

/**
 * Import design resources from JSON
 */
export function importDesignResources(data: {
  guidelines?: Record<string, any>;
  styleGuides?: any[];
  tags?: Record<string, string[]>;
}): void {
  if (data.guidelines) {
    saveCustomGuidelines(data.guidelines);
  }
  if (data.styleGuides) {
    saveCustomStyleGuides(data.styleGuides);
  }
  if (data.tags) {
    saveCustomTags(data.tags);
  }
}

/**
 * Initialize storage on module load
 */
export function initializeStorage(): void {
  ensureStorageDir();
  // Use console.error because stdout is reserved for MCP JSON-RPC protocol in STDIO mode
  console.error('✅ Design system storage initialized at:', STORAGE_DIR);
}
