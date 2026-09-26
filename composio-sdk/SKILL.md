---
name: composio-sdk
description: Reference for the Composio SDK (Python and TypeScript) — connecting an agent to third-party tools (GitHub, Gmail, Slack, Notion, Linear, Google Calendar, and more) via managed sessions, native tool definitions, or MCP. Use this whenever the user wants to integrate Composio into an agent, is calling composio.create/session.tools()/actions.execute in Python or TypeScript, is wiring Composio up with the Claude Agent SDK or Anthropic SDK, needs a specific toolkit's action name (e.g. "what's the Composio action for creating a GitHub issue"), or is debugging a ComposioError.
---

# Composio SDK Reference

Composio provides pre-built, authenticated integrations to third-party apps (GitHub, Gmail, Slack, Notion, Linear, Google Calendar, and others) so an agent doesn't need custom OAuth and API-client code for every tool it should be able to use.

## Core concepts

- **Session** — an isolated context for one end user (`user_id`), scoped to a specific list of `toolkits`. Create one session per user and reuse it across that user's interaction rather than creating a new session per request.
- **Tools** — `session.tools()` returns native tool definitions you can hand directly to an agent framework's tool-use API (e.g. Anthropic's `tools` parameter).
- **MCP mode** — `session.mcp.url` exposes the same toolkits as an MCP endpoint with a Tool Router for dynamic discovery at runtime, instead of sending every tool schema upfront. Prefer this when token budget matters or the client is MCP-native (Claude Desktop, Cursor, etc.).
- **Direct action execution** — `composio.actions.execute(...)` runs a specific named action (e.g. `GITHUB_CREATE_ISSUE`) without going through an agent loop at all — use this for deterministic, non-agentic automation.
- **Connected accounts** — the underlying OAuth grants a user has made to third-party apps; manage these when a user needs to check, list, or revoke access.

## Quick start

Full installation commands, session/tool code for both Python and TypeScript, the Claude Agent SDK integration pattern, MCP wiring, connected-account management, a table of common action names by toolkit (GitHub, Gmail, Slack, Notion, Linear, Google Calendar), error handling, and best practices are all in `references/api-reference.md` — read it before writing any Composio integration code, since the exact method signatures matter and shouldn't be guessed at.

## Working with this reference

When the user names a toolkit and an action informally ("have it star a repo," "send a Slack DM"), check the action-name table in the reference file first rather than guessing the `TOOLKIT_ACTION_NAME` format — Composio's naming is consistent (`TOOLKIT_VERB_NOUN`) but exact names should be confirmed, not inferred, since a wrong action string fails at runtime rather than at review time.

When scoping a session's `toolkits` list, include only what the agent actually needs for the task — narrower scoping is both a security practice and (per Composio's own guidance) a way to keep MCP tool-discovery overhead down.

If the user is deciding between native tool-definitions mode and MCP mode, the deciding factor is usually token budget and client compatibility: native mode sends full tool schemas upfront (fine for a small toolkit list), MCP mode discovers tools at runtime (better when many toolkits are attached or the client is already MCP-native).
