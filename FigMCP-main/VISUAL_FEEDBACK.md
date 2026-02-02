# Visual Feedback System

The Figma MCP Server includes a powerful visual feedback system that provides real-time visual indicators when AI creates or modifies elements in your Figma design.

## Features

### 1. **Border Highlighting**
When AI creates or modifies a node, it is automatically:
- **Selected** (shown with a blue border in Figma)
- **Zoomed into view** (viewport automatically scrolls to show the element)
- **Kept in selection** until the operation completes

### 2. **Popup Animation Effect**
Each newly created element gets a subtle popup animation:
- **Fade-in effect**: Element appears with a smooth opacity transition
- **Flash effect**: Brief highlight to draw attention
- **Smooth restoration**: Returns to normal state

### 3. **Automatic Cleanup**
After AI operations complete:
- Visual feedback automatically clears after **3 seconds**
- Selection is cleared (borders removed)
- Canvas returns to normal state

## How It Works

### Detection
The system automatically detects when AI is performing create or modify operations:

**Create Operations:**
- `create-rectangle`
- `create-frame`
- `create-text`
- `create-instance`
- `create-component`
- `clone-node`

**Modify Operations:**
- `move-node`
- `resize-node`
- `set-fill-color`
- `set-stroke-color`
- `set-corner-radius`
- `set-layout`
- `set-parent-id`

### Visual Feedback Flow

```
AI Operation Started
      ↓
✨ Visual Feedback Activated
      ↓
🎯 Node Created/Modified
      ↓
📍 Border Shown (blue selection)
      ↓
🔍 Zoom to Element
      ↓
💫 Popup Animation
      ↓
⏱️ Wait 3 seconds
      ↓
🧹 Cleanup (remove borders)
      ↓
✅ Complete
```

## Technical Details

### Architecture

The visual feedback system is implemented in:
- **`plugin/main/utils/visual-feedback.ts`** - Core feedback logic
- **`plugin/main/main.ts`** - Integration with task handlers

### Key Components

#### `VisualFeedbackManager` Class
Manages the lifecycle of visual feedback:

```typescript
class VisualFeedbackManager {
    start()              // Activate feedback mode
    highlightNode(id)    // Highlight a specific node
    stop(delayMs)        // Schedule cleanup
    forceCleanup()       // Immediate cleanup
    isActiveFeedback()   // Check if active
    getHighlightedCount() // Get count of highlighted nodes
}
```

#### Helper Functions

**`isCreateOrModifyCommand(command: string): boolean`**
- Determines if a command should trigger visual feedback

**`extractNodeIdFromResult(result: any, command: string): string | null`**
- Extracts the node ID from operation results

### Animation Details

**Popup Effect Timeline:**
1. **0ms**: Start at 30% opacity
2. **50ms**: Fade to 100% opacity
3. **150ms**: Quick dip to 80% opacity
4. **200ms**: Return to original opacity

Total duration: **~200ms**

**Cleanup Delay:**
- **Success**: 3000ms (3 seconds)
- **Error**: Immediate cleanup

## Usage Examples

### Example 1: Creating a Rectangle

```typescript
// AI calls create-rectangle
await mcp.callTool("create-rectangle", {
  x: 100,
  y: 100,
  width: 200,
  height: 150
});

// Visual Feedback:
// ✨ Activated
// 📍 Rectangle selected (blue border)
// 🔍 Viewport zooms to rectangle
// 💫 Popup animation plays
// ⏱️ Cleanup after 3 seconds
```

### Example 2: Batch Operations

```typescript
// AI creates multiple elements
for (const element of elements) {
  await mcp.callTool("create-frame", element);
  // Each frame gets:
  // - Border highlight
  // - Popup animation
  // - Added to selection
}

// After last element:
// ⏱️ Wait 3 seconds
// 🧹 All borders cleared at once
```

### Example 3: Error Handling

```typescript
// AI attempts invalid operation
await mcp.callTool("create-text", {
  text: null // Invalid!
});

// Visual Feedback:
// ❌ Error detected
// 🧹 Immediate cleanup
// No borders shown
```

## Configuration

### Cleanup Delay
To adjust the cleanup delay, modify the delay parameter in `main.ts`:

```typescript
// Default: 3000ms (3 seconds)
await visualFeedback.stop(3000);

// Faster cleanup (1 second)
await visualFeedback.stop(1000);

// Longer visible (5 seconds)
await visualFeedback.stop(5000);
```

### Animation Speed
To adjust animation speed, modify timing in `visual-feedback.ts`:

```typescript
// Faster popup (100ms total)
node.opacity = 0.3;
await this.sleep(25);  // Was: 50
node.opacity = 1.0;
await this.sleep(50);  // Was: 100
node.opacity = 0.8;
await this.sleep(25);  // Was: 50
node.opacity = originalOpacity;
```

## Debugging

The visual feedback system includes console logging:

```
🎨 Visual feedback activated
✨ Highlighted node: Button (FRAME)
✨ Highlighted node: Icon (RECTANGLE)
⏱️ Scheduling cleanup in 3000ms...
🧹 Cleaning up visual feedback...
✅ Cleaned up 2 highlighted nodes
```

To see debug logs:
1. Open Figma
2. Open the plugin
3. Open Developer Console: **Plugins > Development > Open Console**
4. Run AI operations
5. Watch for visual feedback logs

## Benefits

1. **Real-time Feedback**: See exactly what AI is creating as it happens
2. **Clear Visual Indicators**: Blue borders make it obvious what's being modified
3. **Automatic Cleanup**: No manual intervention needed
4. **Smooth UX**: Popup animations provide polished, professional feel
5. **Error Handling**: Cleanup on errors prevents stuck states

## Limitations

- **Figma API Constraints**: 
  - Cannot add custom overlays or decorations to nodes
  - Limited to native selection (blue border) for highlighting
  - No direct scale/transform animations available

- **Performance**:
  - For very large batch operations (100+ nodes), selection may become slow
  - Animation effects are lightweight (opacity only) to maintain performance

- **Timing**:
  - Fixed 3-second cleanup delay (customizable in code)
  - Animation duration is fixed (200ms)

## Future Enhancements

Potential improvements for future versions:

- [ ] **Customizable Colors**: Different border colors for different operation types
- [ ] **Sound Effects**: Optional audio feedback for operations
- [ ] **Progress Indicators**: Show count of items created (e.g., "3/10 elements")
- [ ] **User Preferences**: Settings panel to customize delays and effects
- [ ] **History Trail**: Visual breadcrumbs showing sequence of AI operations
- [ ] **Undo Highlighting**: Re-highlight elements when undo is pressed

## Troubleshooting

### Visual feedback not showing
**Cause**: Feature only activates for create/modify operations

**Solution**: Check that your command is in the supported list:
```typescript
// Supported commands
'create-rectangle', 'create-frame', 'create-text',
'create-instance', 'create-component', 'clone-node',
'move-node', 'resize-node', 'set-fill-color',
'set-stroke-color', 'set-corner-radius', 'set-layout',
'set-parent-id'
```

### Borders not clearing
**Cause**: Error occurred before cleanup scheduled

**Solution**: 
1. Check console for errors
2. Manually clear selection in Figma
3. Restart plugin if issue persists

### Animation not visible
**Cause**: Animation duration is very short (200ms) and subtle

**Solution**: 
1. Watch closely when nodes are created
2. Increase animation duration in code (see Configuration section)
3. Check that node has opacity property (some node types don't support it)

## API Reference

### `visualFeedback.start()`
Activates visual feedback mode.

**Returns**: `void`

**Example**:
```typescript
visualFeedback.start();
```

---

### `visualFeedback.highlightNode(nodeId: string)`
Highlights a specific node with border and animation.

**Parameters**:
- `nodeId` (string): The Figma node ID to highlight

**Returns**: `Promise<void>`

**Example**:
```typescript
await visualFeedback.highlightNode("123:456");
```

---

### `visualFeedback.stop(delayMs?: number)`
Schedules cleanup of visual feedback.

**Parameters**:
- `delayMs` (number, optional): Delay in milliseconds before cleanup (default: 2000)

**Returns**: `Promise<void>`

**Example**:
```typescript
await visualFeedback.stop(3000); // Cleanup after 3 seconds
```

---

### `visualFeedback.forceCleanup()`
Immediately cleans up all visual feedback.

**Returns**: `Promise<void>`

**Example**:
```typescript
await visualFeedback.forceCleanup();
```

---

### `visualFeedback.isActiveFeedback()`
Checks if visual feedback is currently active.

**Returns**: `boolean`

**Example**:
```typescript
if (visualFeedback.isActiveFeedback()) {
  console.log("Feedback is active");
}
```

---

### `visualFeedback.getHighlightedCount()`
Gets the count of currently highlighted nodes.

**Returns**: `number`

**Example**:
```typescript
const count = visualFeedback.getHighlightedCount();
console.log(`${count} nodes highlighted`);
```

---

## Contributing

To enhance the visual feedback system:

1. **Fork the repository**
2. **Modify** `plugin/main/utils/visual-feedback.ts`
3. **Test** your changes thoroughly
4. **Submit** a pull request with:
   - Description of changes
   - Screenshots/videos of new effects
   - Performance impact assessment

---

## License

Same as the main Figma MCP Server project.
