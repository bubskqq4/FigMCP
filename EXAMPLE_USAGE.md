# Get Layer Tree - Usage Examples

## Quick Start

The `get-layer-tree` tool allows you to retrieve the complete hierarchical structure of your entire Figma document without needing to specify any node IDs.

## Basic Usage

### 1. Get Complete Document Structure

```javascript
// Call the tool with no parameters
const result = await getLayerTree({});

// Access the tree
console.log(result.tree);

// Example output structure:
// {
//   id: "0:0",
//   name: "My Design",
//   type: "DOCUMENT",
//   childIds: ["1:2", "1:3"],
//   children: [...]
// }
```

### 2. Get Statistics Only

```javascript
const result = await getLayerTree({});

// View document statistics
console.log(result.statistics);

// Example output:
// {
//   totalNodes: 342,
//   totalLayers: 341,
//   nodeTypes: {
//     "DOCUMENT": 1,
//     "PAGE": 3,
//     "FRAME": 89,
//     "TEXT": 124,
//     "RECTANGLE": 56
//   }
// }
```

### 3. Exclude Hidden Layers

```javascript
const result = await getLayerTree({
  includeHidden: false
});

// Only visible layers will be in the tree
console.log(`Found ${result.statistics.totalNodes} visible nodes`);
```

### 4. Limit Depth for Performance

```javascript
const result = await getLayerTree({
  maxDepth: 3  // Only go 3 levels deep
});

// Useful for large documents
console.log(`Scanned to depth: ${result.statistics.maxDepthScanned}`);
```

## Advanced Examples

### Finding All Nodes of a Specific Type

```javascript
function findNodesByType(tree, targetType) {
  const results = [];
  
  function traverse(node) {
    if (node.type === targetType) {
      results.push({
        id: node.id,
        name: node.name,
        properties: node.properties
      });
    }
    
    if (node.children) {
      node.children.forEach(traverse);
    }
  }
  
  traverse(tree);
  return results;
}

// Usage
const result = await getLayerTree({});
const allFrames = findNodesByType(result.tree, 'FRAME');
const allText = findNodesByType(result.tree, 'TEXT');

console.log(`Found ${allFrames.length} frames`);
console.log(`Found ${allText.length} text layers`);
```

### Analyzing Layer Naming Conventions

```javascript
const result = await getLayerTree({});

function analyzeNaming(tree) {
  const namingPatterns = {
    hasPrefix: 0,
    allCaps: 0,
    camelCase: 0,
    containsSlash: 0,
    total: 0
  };
  
  function traverse(node) {
    namingPatterns.total++;
    
    if (/^[A-Z]+_/.test(node.name)) namingPatterns.hasPrefix++;
    if (node.name === node.name.toUpperCase()) namingPatterns.allCaps++;
    if (/^[a-z]+[A-Z]/.test(node.name)) namingPatterns.camelCase++;
    if (node.name.includes('/')) namingPatterns.containsSlash++;
    
    if (node.children) {
      node.children.forEach(traverse);
    }
  }
  
  traverse(tree);
  return namingPatterns;
}

const patterns = analyzeNaming(result.tree);
console.log('Naming Analysis:', patterns);
```

### Building a Flat List of All Node IDs

```javascript
const result = await getLayerTree({});

function collectAllNodeIds(tree) {
  const ids = [];
  
  function traverse(node) {
    ids.push(node.id);
    
    if (node.children) {
      node.children.forEach(traverse);
    }
  }
  
  traverse(tree);
  return ids;
}

const allIds = collectAllNodeIds(result.tree);
console.log(`Total node IDs: ${allIds.length}`);
console.log('First 10 IDs:', allIds.slice(0, 10));
```

### Finding Deepest Nesting Level

```javascript
const result = await getLayerTree({});

function findMaxDepth(tree) {
  let maxDepth = 0;
  
  function traverse(node) {
    if (node.depth > maxDepth) {
      maxDepth = node.depth;
    }
    
    if (node.children) {
      node.children.forEach(traverse);
    }
  }
  
  traverse(tree);
  return maxDepth;
}

const maxNesting = findMaxDepth(result.tree);
console.log(`Maximum nesting depth: ${maxNesting}`);
```

### Extracting Parent-Child Relationships

```javascript
const result = await getLayerTree({});

function buildRelationshipMap(tree) {
  const relationships = new Map();
  
  function traverse(node, parentId = null) {
    relationships.set(node.id, {
      name: node.name,
      type: node.type,
      parentId: parentId,
      childIds: node.childIds || []
    });
    
    if (node.children) {
      node.children.forEach(child => traverse(child, node.id));
    }
  }
  
  traverse(tree);
  return relationships;
}

const relationships = buildRelationshipMap(result.tree);

// Find a specific node's parent
const nodeId = "123:456";
const nodeInfo = relationships.get(nodeId);
if (nodeInfo) {
  console.log(`Node: ${nodeInfo.name}`);
  console.log(`Parent ID: ${nodeInfo.parentId}`);
  console.log(`Children: ${nodeInfo.childIds.length}`);
}
```

### Generating a Visual Tree (ASCII)

```javascript
const result = await getLayerTree({ maxDepth: 4 });

function generateAsciiTree(tree, prefix = '', isLast = true) {
  const connector = isLast ? '└── ' : '├── ';
  const extension = isLast ? '    ' : '│   ';
  
  console.log(prefix + connector + `${tree.name} (${tree.type})`);
  
  if (tree.children && tree.children.length > 0) {
    tree.children.forEach((child, index) => {
      const isLastChild = index === tree.children.length - 1;
      generateAsciiTree(child, prefix + extension, isLastChild);
    });
  }
}

generateAsciiTree(result.tree);

// Output example:
// └── My Design (DOCUMENT)
//     ├── Page 1 (PAGE)
//     │   ├── Header (FRAME)
//     │   │   ├── Logo (TEXT)
//     │   │   └── Nav (GROUP)
//     │   └── Content (FRAME)
//     └── Page 2 (PAGE)
```

### Finding All Components and Instances

```javascript
const result = await getLayerTree({});

function findComponentsAndInstances(tree) {
  const components = [];
  const instances = [];
  
  function traverse(node) {
    if (node.type === 'COMPONENT') {
      components.push({
        id: node.id,
        name: node.name,
        childCount: node.childIds.length
      });
    } else if (node.type === 'INSTANCE') {
      instances.push({
        id: node.id,
        name: node.name
      });
    }
    
    if (node.children) {
      node.children.forEach(traverse);
    }
  }
  
  traverse(tree);
  
  return { components, instances };
}

const { components, instances } = findComponentsAndInstances(result.tree);
console.log(`Components: ${components.length}`);
console.log(`Instances: ${instances.length}`);
console.log(`Component usage ratio: ${instances.length / components.length}`);
```

### Finding Nodes by Property Value

```javascript
const result = await getLayerTree({});

function findByProperty(tree, propertyPath, value) {
  const results = [];
  
  function traverse(node) {
    // Navigate nested property path (e.g., "properties.width")
    const parts = propertyPath.split('.');
    let current = node;
    
    for (const part of parts) {
      if (current && current[part] !== undefined) {
        current = current[part];
      } else {
        current = undefined;
        break;
      }
    }
    
    if (current === value) {
      results.push(node);
    }
    
    if (node.children) {
      node.children.forEach(traverse);
    }
  }
  
  traverse(tree);
  return results;
}

// Find all locked nodes
const lockedNodes = findByProperty(result.tree, 'locked', true);
console.log(`Found ${lockedNodes.length} locked nodes`);

// Find all nodes with specific width
const width1440 = findByProperty(result.tree, 'properties.width', 1440);
console.log(`Found ${width1440.length} nodes with width=1440`);
```

## Performance Tips

### For Large Documents

```javascript
// Use maxDepth to limit traversal
const result = await getLayerTree({
  maxDepth: 5,
  includeHidden: false
});

// Process in chunks if needed
function processInChunks(tree, chunkSize = 100) {
  const allNodes = [];
  let currentChunk = [];
  
  function traverse(node) {
    currentChunk.push(node);
    
    if (currentChunk.length >= chunkSize) {
      allNodes.push([...currentChunk]);
      currentChunk = [];
    }
    
    if (node.children) {
      node.children.forEach(traverse);
    }
  }
  
  traverse(tree);
  
  if (currentChunk.length > 0) {
    allNodes.push(currentChunk);
  }
  
  return allNodes;
}

const chunks = processInChunks(result.tree, 50);
console.log(`Processed in ${chunks.length} chunks`);
```

## Error Handling

```javascript
try {
  const result = await getLayerTree({
    maxDepth: -1  // Invalid
  });
} catch (error) {
  console.error('Failed to get layer tree:', error);
}

// Check for errors in response
const result = await getLayerTree({});

if (result.isError) {
  console.error('Tool returned error:', result.content);
} else {
  console.log('Success:', result.content.tree);
}
```

---

## Next Steps

1. Explore the returned `properties` object for detailed node information
2. Combine with other MCP tools for powerful workflows
3. Build custom visualizations or analysis tools
4. Export the tree structure for documentation

## Related Tools

- `get-node-tree` - Get subtree for a specific node
- `list-nodes` - Get a flat list of nodes
- `search-nodes` - Search for nodes by criteria
- `get-node-info` - Get detailed info about a specific node
