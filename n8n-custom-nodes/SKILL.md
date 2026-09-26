---
name: n8n-custom-nodes
description: Reference for building custom n8n nodes — declarative (simple HTTP APIs) and programmatic (custom logic, non-HTTP protocols) node types, credential definitions, trigger/polling nodes, property types, and project setup/testing/publishing. Use this whenever the user is building or debugging an n8n community node, asks how to structure a node's package.json or INodeTypeDescription, needs a credential definition with authentication, wants a polling trigger node, or asks about n8n's displayOptions, property types, or n8n-workflow TypeScript interfaces.
---

# n8n Custom Nodes Reference

Custom nodes extend n8n with new integrations. The first decision is always which of the two node styles fits:

- **Declarative** — for simple HTTP-based APIs where the work is just "map these parameters to a request." No `execute()` method; n8n handles the request/response via a `routing` config on each operation.
- **Programmatic** — for anything with real logic: non-HTTP protocols, custom pagination, conditional branching on a response, or per-item processing. Implements `execute()` directly.

If unsure which one fits a given integration, default to declarative and only switch to programmatic once you hit something declarative's `routing` config can't express (see the "when to reach for declarative" note in `references/declarative-and-credentials.md`).

## Reference files

| File | Contents |
|------|----------|
| `references/setup-and-testing.md` | Scaffolding a node package, directory structure, `package.json` requirements, local linking/testing with `npm link`, linting, and publishing |
| `references/programmatic-node.md` | Full programmatic node example (`execute()`, per-item loop, `continueOnFail`, `httpRequestWithAuthentication`), the property types table, and `displayOptions` show/hide syntax |
| `references/declarative-and-credentials.md` | Full declarative node example with `routing` config, credential definitions with `authenticate`/`test` blocks, and a polling trigger node example |

Read only the file(s) relevant to the task — a user asking "how do I test my node locally" needs `setup-and-testing.md`, not the full programmatic example.

## Working with this reference

Every node — declarative or programmatic — needs a matching `INodeTypeDescription` with `displayName`, `name`, `group`, `version`, `defaults`, `inputs`/`outputs`, and (if it calls an authenticated API) a `credentials` entry. Get this scaffold right first; it's the same shape regardless of which execution style you pick.

For programmatic nodes, always route outgoing requests through `this.helpers.httpRequestWithAuthentication` rather than a raw HTTP client — it pulls credentials from the node's configured credential type automatically, so the node works with n8n's credential UI (including the "Test" button) instead of requiring the user to paste a token into a generic field.

When a node needs to remember state between runs (most commonly a polling trigger), use `this.getWorkflowStaticData('node')` rather than external storage — see the trigger example in `references/declarative-and-credentials.md`.

Before finishing a node, check it against the ten best practices in `references/setup-and-testing.md` — `continueOnFail()` handling and `pairedItem` tracking in particular are easy to skip and cause confusing failures in production workflows.
