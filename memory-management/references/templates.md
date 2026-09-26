# Memory File Templates

Exact formats to copy when writing to memory files. Read this when you're about to write or edit a memory file and want the precise structure, not just the concept.

## MEMORY.md (index file)

```markdown
# Project Memory

## Quick Reference
- Build: `npm run build` (takes ~45s)
- Test: `npm test -- --watch`
- Deploy: `npm run deploy:staging`
- DB: PostgreSQL 15, Redis 7

## Tech Stack
Next.js 14 (App Router), TypeScript, Prisma, TailwindCSS

## User Preferences
- [Package manager], [framework], [testing tool] — see `user-preferences.md`
- Communication: [concise/detailed], [casual/formal] — see `communication-style.md`

## Current Project
- [One-line description] — see `project-context.md`
- Stack: [key technologies] — see `tech-stack.md`

## Key Patterns
See `patterns.md` for discovered code patterns
See `conventions.md` for codebase conventions

## Architecture Decisions
See `architecture.md` for ADRs and rationale

## Known Gotchas
- Auth middleware runs before API routes, not after
- Redis connection pool max is 10 in dev, 50 in prod

## Important Corrections
- [Most critical correction] — see `corrections.md`
```

Budget: ~20 lines per section, max 6-8 sections. If a section is growing past that, move detail into its topic file and leave only the summary line + pointer here.

## Topic file (general)

```markdown
# [Topic Name]

## [Subtopic]
- Key point with context
- Another point
  - Supporting detail if needed

## [Another Subtopic]
- Entries organized by relevance, not chronology
```

## Preference entry (inside a topic file)

```markdown
### Package Manager: bun
- **Observed:** 2026-03-10
- **Context:** User said "I always use bun"
- **Detail:** Use bun for all package management. Use `bun install`, `bun run`, `bunx`.
```

## Project context entry

```markdown
### Project: [Name]
- **Type:** B2B SaaS for dental practices
- **Stage:** MVP, launching Q2 2026
- **Stack:** Next.js, Supabase, Tailwind, Vercel
- **Team:** Solo founder + 1 contractor
- **Key constraints:** Bootstrap budget, need to ship fast
```

## Correction entry (in corrections.md)

```markdown
### Correction: Don't add JSDoc to unchanged functions
- **Date:** 2026-03-10
- **Wrong assumption:** Claude added JSDoc comments to existing functions while editing nearby code
- **Correct behavior:** Only modify code that's directly related to the task. Never add comments, types, or docs to unchanged code.
- **Category:** code-style
```

Categories in use: `code-style`, `tool-choice`, `communication`, `architecture`, `other`.

## Standard memory directory layout

```
~/.claude/projects/<project-path>/memory/
├── MEMORY.md              ← Auto-loaded (first 200 lines). Index + key facts.
├── user-preferences.md    ← Dev tools, code style, framework choices
├── project-context.md     ← What they're building, business context
├── tech-stack.md          ← Languages, frameworks, versions, infrastructure
├── communication-style.md ← How they want Claude to interact
├── corrections.md         ← Mistakes Claude made — never repeat these
└── [topic].md              ← Any other topic-specific file (patterns, debugging, architecture, conventions, tooling, external-resources, ...)
```

The exact set of topic files is not fixed — create a new one when a category doesn't fit the existing files, and merge small ones (under ~10 lines) back into MEMORY.md directly rather than leaving a near-empty file.
