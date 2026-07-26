# HOL — Dan Martell's 6 Levels of Claude (Implementation Map)

This document tracks where HOL sits on each level and what's been built or still needs to be done.

---

## Level 1: The Amateur ✅
**What it means:** Treats Claude like a search engine. Asks Claude to interview you for context and check its own work.

**HOL Status:** Done. We're past this.

**Key habit to keep:** Always use the Interview Prompt before starting any task. Let Claude ask questions first.

---

## Level 2: The Regular ✅
**What it means:** Uses Projects for persistent memory. Creates Master Prompts (ingredients) and System Prompts (recipes) for specific workflows.

**HOL Status:** Built.

**Master Prompts (ingredients — what Claude always reads):**
- `ABOUT_ME/about-me.md` — identity, business context, goal
- `ABOUT_ME/voice-profile.md` — tone DNA
- `ABOUT_ME/anti-ai-writing-style.md` — banned words and structures
- `ABOUT_ME/global-instructions.md` — persistent rules

**System Prompts (recipes — task-specific workflows):**
- `TEMPLATES/system-prompts/write-outreach.md` — first contact messages
- `TEMPLATES/system-prompts/write-google-post.md` — GBP content
- `TEMPLATES/system-prompts/monthly-client-report.md` — client reporting
- `TEMPLATES/system-prompts/onboard-new-client.md` — setup workflow

**Next action:** Use these system prompts as the starting point for every recurring HOL task.

---

## Level 3: The Integrator ⬜
**What it means:** Connects Claude to external tools (Gmail, Drive, Slack, Notion) to eliminate context switching. Creates visualizations and interactive artifacts.

**HOL Status:** Connectors available but not wired into HOL workflows yet.

**Connectors to activate for HOL:**
- **Gmail** → Read and draft client emails without leaving Claude
- **Google Drive** → Pull client assets, upload reports, store case study data
- **Google Calendar** → Schedule client check-ins, post reminders, 30-day follow-ups
- **Notion** → Client tracker, project notes, content calendar

**Artifacts to build:**
- HOL client dashboard (visual — review count, profile views, calls by client)
- Monthly performance report (auto-generated, shareable with client)
- Prospect pipeline tracker

**Next action:** See `TEMPLATES/connectors-setup.md` for activation steps.

---

## Level 4: The Operator ⬜
**What it means:** Directs the AI instead of talking to it. Creates custom Skills, chains them, schedules autonomous tasks with co-work.

**HOL Status:** One skill built (`pd-business-idea-generator`). Chain not designed yet.

**HOL Skill Chain:**
```
[Prospect Identified]
      ↓
  /outreach-writer        ← drafts first message
      ↓
  /gbp-audit              ← pulls their Google presence gaps
      ↓
  /proposal-builder       ← packages the offer
      ↓
  [Client Signs]
      ↓
  /client-onboarding      ← runs the setup checklist
      ↓
  /monthly-report         ← generates performance update
      ↓
  /review-request-writer  ← keeps the review system alive
```

**Autonomous tasks to schedule with co-work:**
- Weekly: generate 4 Google posts for each active client
- Monthly: pull GBP metrics + generate client report
- Ongoing: monitor Ohana reviews and flag new ones

**Next action:** See `TEMPLATES/skills-chain.md` for build sequence.

---

## Level 5: The Builder ✅
**What it means:** Uses Claude Code to build custom software, loops, and apps without traditional programming.

**HOL Status:** Active. We're using Claude Code in this repo right now.

**What to build next:**
- Review count tracker (simple script — pulls GBP data, logs to spreadsheet)
- Client onboarding automation (auto-generates all setup files for a new client)
- HOL proposal generator (inputs client name + audit findings, outputs a formatted proposal)

---

## Level 6: The Agent Orchestrator ⬜
**What it means:** A main orchestrator agent + specialized sub-agents run entire departments autonomously. Human-on-the-loop, not human-in-the-loop.

**HOL Status:** Not built yet. This is the end state.

**HOL Agent Architecture:**
```
        [HOL Orchestrator — "Hansel Agent"]
               /        |        \
  [Prospecting]  [Client Care]  [Content Engine]
    Agent           Agent           Agent
       |               |               |
  Finds leads    Monitors GBP     Generates posts
  Writes DMs     Tracks reviews   Schedules content
  Qualifies      Flags issues     Reports results
  prospects      Drafts reports   Suggests topics
```

**Target state:** Hansel reviews outputs and approves actions. Agents run the day-to-day.

**Next action:** See `TEMPLATES/agent-orchestration.md` for blueprint.

---

## The Progression Path

| Level | Status | Unlocks |
|---|---|---|
| 1 — Amateur | ✅ Done | Basic output quality |
| 2 — Regular | ✅ Done | Consistent, on-brand outputs |
| 3 — Integrator | Build next | No context switching, real data in |
| 4 — Operator | Build next | HOL runs on skills, not prompts |
| 5 — Builder | ✅ Active | Custom tools and automation |
| 6 — Orchestrator | End state | HOL operates autonomously |
