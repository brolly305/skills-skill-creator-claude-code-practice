---
name: memory-management
description: Guides how to store, organize, update, and recall durable project and user knowledge across sessions using the ~/.claude/projects/<project>/memory/ file structure (MEMORY.md index + topic files). Use this whenever the user corrects you, states a preference ("I always use X", "never do Y", "remember that..."), when a project's context, stack, or architecture becomes clear, or when you're about to start a task and want to check what's already known about this user or project. Also use it when memory needs cleanup (MEMORY.md approaching its 200-line budget, stale entries, duplicate facts) or when the user asks you to "remember," "forget," or audit what you know about them.
---

# Memory Management

Claude Code persists durable knowledge about a user and project in a `memory/` directory scoped to the project path, separate from the conversation itself. This skill is the operating manual for that system: what's worth saving, where it goes, and how to keep it from rotting.

The point of memory isn't to log everything that happens — it's to make the next session (or the next hour of this one) start from where the last one left off, instead of re-learning the same facts or repeating the same mistake. A memory file nobody ever reads back is just noise; write for your future self's actual queries, not for completeness.

## Architecture

```
~/.claude/projects/<project-path>/memory/
├── MEMORY.md              ← Auto-loaded (first 200 lines) into every session
├── user-preferences.md    ← Dev tools, code style, framework choices
├── project-context.md     ← What they're building, business context
├── tech-stack.md          ← Languages, frameworks, versions, infrastructure
├── communication-style.md ← How they want Claude to interact
├── corrections.md         ← Mistakes Claude made — never repeat these
└── [topic].md              ← Any other topic-specific file as needed
```

- **MEMORY.md** is special: its first 200 lines load into context automatically at session start. Treat it as an index, not a database — short summaries with pointers to topic files, not the detail itself. Chronological entries ("March 5: did X") are an anti-pattern here; organize by what a future query would look for, not by when you learned it.
- **Topic files** are lazy-loaded — Claude must explicitly `Read` them when the task at hand makes them relevant. No hard line limit, but keep each one focused on one subject; split a file that's grown to cover unrelated things.
- Memory persists across conversations in the same project, and is shared across git worktrees of the same repo.
- Full entry formats and file templates are in `references/templates.md` — read that when you're actually about to write.

## What to track

| Category | Examples |
|---|---|
| **Development preferences** | Package manager/runtime, editor, code style (formatting, naming, comments, imports), framework/library choices, language and typing preferences |
| **Communication style** | Concise vs. detailed, code-first vs. explain-first, tone, how much upfront context they want, what frustrates them (over-explaining, excess clarifying questions, too cautious or too aggressive) |
| **Project context** | What they're building, target audience, stage (prototype/MVP/growth), team size, deployment target, business/domain context, key constraints |
| **Architecture decisions** | Monolith vs. microservices, database choices and why, API style, state management, auth strategy — the *why*, not just the *what* |
| **Workflow habits** | Git/commit conventions, branching and PR preferences, TDD vs. test-after, task management tooling |
| **Corrections** | Every time the user corrects you — see below, this is the highest-priority category |
| **Personal context (light touch)** | Only if volunteered and relevant to working together: timezone, role, experience level. Never save real name (unless they use it), location, health, financial, or relationship details — nothing they'd be surprised to see stored. |

## When to save

**Always save, immediately:**
- **User corrections.** If the user corrects you, it means an assumption you made was wrong, they cared enough to say so, and it will be frustrating if it happens again. This is the single highest-signal category — save it before doing anything else, in `corrections.md`, and go update whatever other memory file held the now-wrong assumption.
- **Explicit preferences.** Signals like "always use...", "never do...", "I prefer...", "remember that...", "from now on...", "I told you before..." — these are the user directly telling you what to store. Save immediately, don't wait for a second occurrence.
- **Non-obvious discoveries and environment specifics.** Things that took real effort to figure out (a build quirk, a required env var, a gotcha in how a middleware runs) belong in memory precisely because re-discovering them is expensive.

**Save after a pattern, not on first sight:**
- **Implicit signals** — the user consistently picks one tool over another, repeatedly reformats what you write a certain way, or keeps skipping a type of suggestion. Wait for 2+ occurrences before treating this as a stored preference; a single instance might just be a one-off. If it happens again, don't ask — note it. If it directly contradicts something already stored, ask once ("I noticed you're using X — should I default to that?") rather than silently overwriting.
- **Communication style** — save once you see a clear pattern (2+ signals), not from a single message.
- **Tool/framework choices** — confirm across 1-2 sessions before treating as durable.
- **Project context** — save once it's stable, not while still in a brainstorming/exploratory phase where it might change.

**Never save:**
- Session-specific state (what you're working on *right now* — that belongs in the conversation, not memory)
- Speculative conclusions drawn from a single file read
- General knowledge any developer would already have
- Secrets or credentials of any kind
- Anything already documented in CLAUDE.md — reference it, don't duplicate it

If two stored memories conflict with each other, prefer the more recent one, and clean up the stale one rather than leaving both.

## How to save

1. Check MEMORY.md — does a relevant section already exist?
2. If yes, read the linked topic file and add or update the entry there (use Edit, not a full rewrite, for existing files).
3. If no, create a new section in MEMORY.md plus a new topic file, following the templates in `references/templates.md`.
4. Re-read what you wrote to confirm it actually saved the way you intended — a silent failure here means the knowledge is gone.
5. Save quietly. Don't announce "I'm saving this to memory" for routine saves — the exception is acknowledging a correction, where a brief confirmation is appropriate.

When updating an existing entry (the user changes their mind, or a correction proves an old entry wrong), edit it in place — don't leave the stale version alongside the new one. When the user says "forget X" or a fact is clearly obsolete, delete the entry outright rather than marking it deprecated.

## How to recall

Before starting a task, do a quick mental pass: MEMORY.md is already in context from session start, so scan it for anything relevant. If the task involves writing code, do you already know their style preferences? If it involves architecture, do you know their stack and constraints? If it involves a long explanation, do you know how they like to receive one?

When a decision hinges on something that would live in a topic file — which testing approach, which library, how much detail to give — read that specific topic file before deciding, rather than guessing or asking the user something already answered in memory.

Apply what you recall silently. Use the stored preference without narrating that you're doing so ("I'm using bun since that's your default" is fine context once; "Based on my memory of your preferences..." as a recurring preamble is not). Don't quiz the user to re-confirm things memory already tells you — that undermines the point of having it.

## Hygiene

Audit memory when starting a new project (old context may be stale), when the user says something that contradicts what's stored, or when MEMORY.md is approaching the 200-line budget.

An audit means: re-read MEMORY.md for accuracy, check each topic file for outdated entries, look for duplicates across files, and confirm every link from MEMORY.md to a topic file still resolves to something real.

When MEMORY.md is getting long: move detail out into topic files and leave only summaries + pointers behind; drop entries for completed or abandoned projects; merge near-duplicate entries; and remove anything now covered by CLAUDE.md instead of keeping both.

## Anti-patterns

| Don't | Do instead |
|---|---|
| Save every detail from every session | Save stable patterns confirmed across interactions |
| Save speculative conclusions | Verify before writing to memory |
| Duplicate info already in CLAUDE.md | Reference CLAUDE.md, don't copy it |
| Save temporary task state | Only save durable, cross-session facts |
| Announce every memory save | Save quietly; only surface correction acknowledgments |
| Write without checking for conflicts first | Read existing memory before writing, to catch duplicates |
| Store credentials or secrets | Never — no exceptions |
| Let a correction slide | Corrections are the highest-priority save, every time |
