# Level 6: HOL Agent Orchestration Blueprint (The Agent Orchestrator)

The end state. HOL runs on interconnected agents. Hansel is human-on-the-loop — reviewing and approving, not doing.

---

## The Architecture

```
┌─────────────────────────────────────────┐
│         HOL ORCHESTRATOR AGENT          │
│              "Hansel Agent"             │
│                                         │
│  Reads: about-me.md, global-instructions│
│  Role: Routes tasks, prioritizes work,  │
│  surfaces decisions that need Hansel    │
└────────────┬────────────┬───────────────┘
             │            │            │
    ┌────────▼──┐  ┌──────▼────┐  ┌───▼──────────┐
    │ PROSPECTING│  │CLIENT CARE│  │CONTENT ENGINE│
    │   AGENT    │  │   AGENT   │  │    AGENT     │
    └────────────┘  └───────────┘  └──────────────┘
```

---

## Agent Roles

### HOL Orchestrator ("Hansel Agent")
**Job:** Coordinates all other agents. Knows the full business state. Routes incoming work. Flags decisions that require Hansel.

**Reads daily:**
- Pipeline status from Notion
- Client health (reviews, profile activity)
- Scheduled task queue

**Surfaces to Hansel:**
- New leads that hit the target profile
- Client accounts showing no review activity in 30 days
- Proposals that have gone quiet for 7+ days
- Monthly reports ready for approval before sending

---

### Prospecting Agent
**Job:** Find businesses that fit the HOL profile, run GBP audits, draft first outreach.

**Inputs:**
- Search criteria (local service business, Lafayette area, 3+ years old, weak Google presence)

**Outputs:**
- Prospect list with audit summary per business
- Draft outreach message (held for Hansel approval before sending)
- Follow-up message if no reply at 7 days

**Human gate:** Outreach does NOT send without Hansel approval.

---

### Client Care Agent
**Job:** Monitor active clients, track metrics, flag issues, draft retention communications.

**Monitors:**
- Review count changes (weekly)
- GBP profile activity (monthly)
- Last contact date per client

**Outputs:**
- Monthly performance report drafts (held for Hansel approval)
- Alert if client review count drops or stalls
- Upsell flag if client is performing well and hasn't been offered expansion

**Human gate:** Reports do NOT send without Hansel approval.

---

### Content Engine Agent
**Job:** Generate and schedule all GBP content for active clients on a monthly cycle.

**Inputs:**
- Client profile (from PROJECTS folder)
- Month, season, any client-provided updates

**Outputs:**
- 4 GBP posts per client, formatted and ready to schedule
- Review request text templates for the month
- Content calendar update in Notion

**Human gate:** Content is queued for review. Hansel approves the batch, then it publishes.

---

## Human-on-the-Loop vs Human-in-the-Loop

| Human-in-the-Loop (now) | Human-on-the-Loop (target) |
|---|---|
| Hansel writes every prompt | Agents generate, Hansel approves |
| Hansel tracks every client manually | Client Care Agent surfaces issues |
| Hansel finds prospects | Prospecting Agent delivers qualified list |
| Hansel writes every post | Content Engine batches and queues |
| Hansel does monthly reports | Reports drafted, Hansel reviews + sends |

**Hansel's only job at Level 6:** Review the queue each morning. Approve, redirect, or skip. 30 minutes a day runs the business.

---

## Build Sequence to Get Here

1. ✅ Level 2: Project files live (persistent memory)
2. ⬜ Level 3: Connect Gmail, Drive, Calendar, Notion
3. ⬜ Level 4: Build the 10 HOL skills — start with `/gbp-audit` and `/outreach-writer`
4. ⬜ Level 4: Schedule autonomous tasks in co-work
5. ⬜ Level 5: Build review tracker and client dashboard in Claude Code
6. ⬜ Level 6: Wire agents together with orchestrator once skills are proven

**Don't skip levels.** Each one makes the next one possible.

---

## The Daily HOL Morning Queue (End State)

```
Good morning, Hansel. Here's today's HOL queue:

APPROVE OR REDIRECT:
→ 3 outreach messages ready to send (Prospecting Agent)
→ November reports for 2 clients ready to review (Client Care Agent)
→ December content batch for 5 clients queued (Content Engine)

FLAGS:
→ [Client X] has had no new reviews in 47 days
→ [Prospect Y] hasn't replied to follow-up — archive or call?

DECISIONS NEEDED:
→ [Prospect Z] replied and wants a proposal — proceed?

Revenue this month: $[X]
Active clients: [N]
```

That's the end state. Every morning, a queue. You make calls, not content.
