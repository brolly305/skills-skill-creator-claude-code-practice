# Implementation via Critical Path Method (CPM)

Once an automation is *designed*, it still has to be *built and launched* inside a GHL sub-account. The order you build in determines how fast you go live. Critical Path Method exists to answer one question: **what is the longest chain of dependent tasks, and therefore the soonest this can possibly launch?** Everything on that chain is sacred; everything off it has slack you can spend elsewhere.

## The counter-intuitive core insight

When people implement a GHL system, they start with the visible, satisfying work: building workflows, writing copy, designing emails. That work feels like progress. But in CPM terms, **the build work has the most float (slack) and is almost never the bottleneck.**

The real critical path is made of *waiting tasks*, approvals and warm-up periods where your effort is one day but the clock runs for two weeks:

- **A2P 10DLC registration** (SMS compliance): carrier approval takes ~7–14 days. You cannot legally/reliably send SMS until it clears. Every SMS workflow is blocked behind it.
- **Email domain warming**: sending reputation builds over ~10–21 days of gradually increasing volume. Blast a cold domain and you land in spam, poisoning every email sequence.

These two clocks must start on **Day 0**, before a single workflow is built, because they gate the launch regardless of how fast you do the fun work.

## Step 1: List activities, durations, and dependencies

Build a table like this for the specific implementation. Durations are in business days; adjust to the account's reality.

| ID | Activity | Duration | Depends on |
|----|----------|----------|------------|
| A | A2P 10DLC brand + campaign registration | 10d (carrier wait) | (none) |
| B | Email domain auth (SPF / DKIM / DMARC) | 1d | (none) |
| C | Email domain warming | 14d | B |
| D | Tag dictionary + custom fields + pipeline stages | 1d | (none) |
| E | Write all SMS + email copy | 3d | D |
| F | Creative assets (Canva / Higgsfield) | 2d | (none) |
| G | Calendar setup + booking links | 1d | (none) |
| H | Build speed-to-lead workflow | 1d | E |
| I | Build appointment confirm + reminder workflow | 1d | E, G |
| J | Build no-show + reactivation + post-sale workflows | 2d | E |
| K | Lead-source integration (FB Lead Ads / form / webhook) | 1d | H |
| L | Stripe + PandaDoc integration | 1d | D |
| M | Apollo lead sourcing + bulk import | 2d | D |
| N | End-to-end test (SMS + email + branch logic) | 2d | A, C, H, I, J, K, L |
| O | Go live | 0d | N |

## Step 2: Find the critical path

Trace every path from start to launch (N → O) and sum the durations:

- **Email path:** B(1) → C(14) → N(2) = **17 days** ← longest
- A2P path: A(10) → N(2) = 12 days
- Build path: D(1) → E(3) → J(2) → N(2) = 8 days
- Integration path: D(1) → L(1) → N(2) = 4 days

**Critical path = B → C → N → O = 17 business days.** This is the floor. No amount of working harder on workflows makes you launch before the email domain finishes warming.

## Step 3: Calculate float on everything else

Float (slack) = how long an activity can slip without delaying launch.

- **A2P registration (A):** must finish by day 15 (when warming ends and testing begins). It takes 10 days, so it can start as late as day 5 → **5 days of float.** Comfortable, *but* it's the sub-critical path; if A2P drags past 15 days it becomes the new bottleneck. Monitor it; don't ignore it.
- **The entire build chain (D→E→H/I/J):** ~6–8 days of work that must finish by day 15 → **~9 days of float.** This is the paradox: the work that feels like "the project" has the most slack.

## Step 4: Act on the analysis

This is where CPM changes behavior:

1. **Start the clocks on Day 0.** A2P registration (A) and domain auth + warming (B→C) have zero predecessors and the longest waits. They are what "implement immediately" actually means. Submitting A2P on day 1 instead of day 5 buys back your entire safety margin.

2. **Sequence the build work into the warming window.** You have ~14 days while email warms. That is *plenty* of time to build every workflow, write copy, source leads in Apollo, and wire integrations. Don't rush it on day 1 at the expense of the approvals.

3. **Compress the critical path, not the floated tasks.** Speeding up workflow-building saves nothing; it has float. The only way to launch sooner is to shorten warming or A2P:
   - Use an already-established/pre-warmed sending domain, or dedicated email infrastructure, to cut warming.
   - Submit a clean, complete A2P registration the first time (rejections restart the clock).
   - Launch SMS-first and email-second if warming is the holdup, so the SMS half goes live on day 12 instead of waiting for email.

4. **Re-baseline when reality moves.** If A2P approval comes back in 4 days instead of 10, recompute; the critical path might shift. CPM is a living schedule, not a one-time diagram.

## Day-by-day launch schedule (this example)

```
Day 0  → Submit A2P registration (A starts) ⚡ CRITICAL TO START
Day 0  → Configure SPF/DKIM/DMARC (B) ⚡ CRITICAL TO START
Day 1  → Begin domain warming (C starts, runs to day 15) ⚡ CRITICAL PATH
Day 1  → Build tag/field/pipeline architecture (D)
Day 2-4 → Write all SMS + email copy (E) | Creative assets (F) in parallel
Day 2  → Calendar setup (G)
Day 5  → Build speed-to-lead (H), appointment (I) workflows
Day 6-7 → Build no-show/reactivation/post-sale (J)
Day 5-6 → Apollo lead sourcing + import (M)
Day 8  → Lead-source (K) + Stripe/PandaDoc (L) integrations
Day 8-14 → Buffer / internal dry-runs (build work is done, float absorbed here)
Day ~12 → A2P expected clear → SMS workflows go live for testing
Day 15 → Domain warm → full end-to-end test (N)
Day 17 → GO LIVE (O)
```

## How to present this to the user

When a user asks "what can I implement immediately?" or "how do I roll this out?", give them:

1. The **critical path** in one sentence (what gates the launch and why).
2. The **Day-0 actions**: the waiting tasks that must start now (A2P, domain warming). Flag these ⚡.
3. The **float reassurance**: the workflow build isn't the bottleneck, so it can be done carefully during the warm-up window.
4. A **dated schedule** like the one above, sized to their account.

The whole value of CPM here is psychological as much as logistical: it stops people from spending week one on the satisfying-but-floated work while the real bottleneck sits un-started.
