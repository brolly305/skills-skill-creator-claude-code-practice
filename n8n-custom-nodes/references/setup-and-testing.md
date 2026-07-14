# Project Setup, Testing & Publishing

## Scaffold a New Node Package
```bash
npx n8n-node-dev new
# or clone the starter:
git clone https://github.com/n8n-io/n8n-nodes-starter.git
cd n8n-nodes-starter
npm install
```

## Directory Structure
```
n8n-nodes-<name>/
├── package.json
├── tsconfig.json
├── nodes/
│   └── MyNode/
│       ├── MyNode.node.ts          # Node implementation
│       ├── MyNode.node.json        # Codex metadata
│       └── mynode.svg              # Node icon
├── credentials/
│   └── MyApi.credentials.ts        # Credential definition
└── dist/                           # Compiled output
```

## package.json Requirements
```json
{
  "name": "n8n-nodes-myservice",
  "version": "1.0.0",
  "n8n": {
    "n8nNodesApiVersion": 1,
    "nodes": ["dist/nodes/MyNode/MyNode.node.js"],
    "credentials": ["dist/credentials/MyApi.credentials.js"]
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsc && gulp build:icons",
    "dev": "tsc --watch",
    "lint": "tslint -p tsconfig.json -c tslint.json",
    "lintfix": "tslint --fix -p tsconfig.json -c tslint.json"
  },
  "devDependencies": {
    "n8n-workflow": "latest",
    "typescript": "~5.x"
  }
}
```

## Testing Custom Nodes

### Local Development
```bash
# Build the node
npm run build

# Link to local n8n
cd /path/to/n8n-nodes-myservice
npm link

cd ~/.n8n
npm link n8n-nodes-myservice

# Start n8n
n8n start
```

### Linting
```bash
npx n8n-node-dev lint
```

### Publishing to npm
```bash
npm publish
# Users install via: npm install n8n-nodes-myservice
# Then restart n8n
```

## Best Practices

1. **Always handle `continueOnFail()`** — check in catch blocks
2. **Use `pairedItem`** — track item lineage for debugging
3. **Validate inputs early** — throw `NodeOperationError` for bad input
4. **Use `this.helpers.httpRequestWithAuthentication`** — handles credential injection
5. **Support expressions** — don't set `noDataExpression: true` unless the field is static
6. **Add codex metadata** — create `MyNode.node.json` for searchability
7. **Use `NodeConnectionType`** — import from `n8n-workflow` for type safety
8. **Handle pagination** — for "Get Many" operations, implement cursor/offset pagination
9. **Return proper `INodeExecutionData`** — always wrap in `{ json: {...} }`
10. **Use `additionalFields` collection** — for optional parameters to keep the UI clean
