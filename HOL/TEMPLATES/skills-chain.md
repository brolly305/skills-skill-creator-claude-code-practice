# Level 4: HOL Skills Chain (The Operator)

Design for chaining Claude skills across the full HOL workflow — from prospect to retained client.

---

## The Full HOL Skill Chain

```
STAGE 1: PROSPECTING
      /gbp-audit              ← Google any business, returns visibility gap report
            ↓
      /outreach-writer        ← Takes gap report, outputs first message (2 versions)
            ↓
      /follow-up-writer       ← 7-day and 14-day follow-up if no reply

STAGE 2: CLOSING
      /proposal-builder       ← Takes audit + prospect info, outputs HOL proposal
            ↓
      /objection-handler      ← Handles "I already have someone" / "not the right time" / "how much?"

STAGE 3: DELIVERY
      /client-onboarding      ← Runs full setup checklist, generates GBP content batch
            ↓
      /review-request-writer  ← Generates personalized post-job review request texts
            ↓
      /google-post-writer     ← Monthly: 4 posts per client, ready to schedule

STAGE 4: RETENTION
      /monthly-report         ← Pulls metrics, writes client performance update
            ↓
      /upsell-identifier      ← Spots clients ready for expanded service or referrals
```

---

## Skills Build Priority

Build in this order — highest ROI first:

| Priority | Skill | Why First |
|---|---|---|
| 1 | `/gbp-audit` | Gates every sale — you can't pitch without it |
| 2 | `/outreach-writer` | Converts audits into conversations |
| 3 | `/client-onboarding` | Delivers the product — needed after first sale |
| 4 | `/google-post-writer` | Monthly recurring task — needs to be fast |
| 5 | `/monthly-report` | Retains clients — shows the value |
| 6 | `/proposal-builder` | Speeds up close process as volume grows |
| 7 | `/follow-up-writer` | Recovers deals that go quiet |
| 8 | `/review-request-writer` | Systematizes the core deliverable |
| 9 | `/objection-handler` | Needed once you have consistent conversations |
| 10 | `/upsell-identifier` | Revenue expansion — build last |

---

## Autonomous Tasks (Co-Work Scheduling)

Once skills are built, schedule these to run without prompting:

| Task | Frequency | Skill Used |
|---|---|---|
| Generate 4 GBP posts per active client | Monthly (1st of month) | `/google-post-writer` |
| Draft monthly performance reports | Monthly (last week) | `/monthly-report` |
| Flag clients with no new reviews in 30 days | Monthly | `/review-request-writer` |
| Prospect scan: find 5 new businesses fitting HOL profile | Weekly | `/gbp-audit` |

---

## How to Invoke a Skill

Once a skill is installed:
```
/gbp-audit [Business Name], [City], [Type of Business]
```
Claude runs the full audit protocol without you writing a prompt.

---

## The Operator Mindset Shift

**Level 2 (Regular):** You write a prompt → Claude responds → you edit → you use it.

**Level 4 (Operator):** You trigger a skill → Claude runs a defined workflow → output lands in the right place → you approve or redirect.

You stop being the typist. You become the decision-maker.
