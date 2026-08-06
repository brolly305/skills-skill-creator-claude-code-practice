# Musashi on your Q3 plan

*"Do nothing which is of no use."* — the ninth and last of Musashi's principles, and the one your plan breaks hardest.

I don't have your churn, net revenue retention, CAC, runway, win/loss notes, or ACV mix. So I've assumed a typical $40k-MRR dev-tools shape (~$500/mo average account, ~80 customers, 12-24 months runway, founder-led sales) and flagged at the end exactly which numbers would change my verdict. Everything below survives a wide range of those assumptions.

---

## The verdict first

You have five initiatives. **Not one of them can plausibly produce revenue inside the window you've set.** Two of them actively work against each other. One of them subtracts MRR on day one. The plan isn't too ambitious — it's mistimed against its own goal.

$40k → $100k in five months is 20.1% compounding net growth every month, held for five consecutive months. Average net new MRR of ~$12k/month against a current base of $40k. That is a top-decile rate for a company at your stage, and you've proposed to hit it while cutting price, absorbing two unramped salaries, and redesigning your website.

---

## Ground — 地 — the terrain, honestly surveyed

Musashi opens the Ground book with the carpenter. Before the carpenter cuts, he knows the timber: which beam bears load, which is for show, which is warped and good only for scaffolding. *"Distinguish between gain and loss in worldly matters."*

Lay your five beams out and mark which bears weight in 2026:

| Initiative | Effect on Dec 31 MRR | Verdict |
|---|---|---|
| 1. Ship 4 big features | Partial — only if the features gate live deals | Keep, but cut to 2 |
| 2. 8 blog posts/month | ~Zero. Content compounds on 6–9 month lag | Freeze at 4, raise quality |
| 3. Hire 2 AEs for enterprise | **Negative.** Cost now, revenue in 2027 | Defer |
| 4. Match Datadog entry pricing | **Negative on day one.** Direct MRR cut | Refuse |
| 5. Rebrand in September | Zero, minus the team's attention | Defer to January |

The arithmetic on #3: two enterprise AEs at $180–220k OTE fully loaded is roughly **$30k+/month of new burn — about 75% of your entire current MRR.** Hire in August, ramp 60–90 days, first real pipeline in November, then enterprise procurement, security review, legal, and vendor onboarding. Your first AE-sourced close lands somewhere between February and June 2027. You're paying 2026 cash for 2027 revenue and counting it toward a 2026 goal.

The arithmetic on #4: whatever fraction of your $40k sits in the entry tier, you're voluntarily reducing it, and inviting your mid-tier customers to ask why they're not getting the new number too. You now have to grow *more* than $60k to arrive at $100k. You've made the hill steeper on the way to claiming you'll climb it faster.

**The single most important thing on this page:** four of your five initiatives pay out after the deadline they're meant to hit.

---

## Water — 水 — one body, one rhythm

*Niten Ichi-ryū* is two swords. It is not two duels. Two weapons, one mind, one target, one rhythm.

Initiatives 3 and 4 are two duels.

- **Upmarket into enterprise** means fewer accounts, larger contracts, buyers who are not price-sensitive, sold on trust, depth, security posture, and support. Price is close to the last thing that closes those deals.
- **Matching Datadog on the entry tier** means high-volume, price-sensitive, self-serve, sold on cost.

These require different pricing, different messaging, different site, different support model, different roadmap. You are asking six people to hold both stances at once — and then, in September, to design a single brand identity for a position you have not chosen.

*"Do not act following customary beliefs."* Hiring AEs is what companies "do" at your size. That is a custom, not a reason. You have no evidence in the plan that you have closed even three enterprise deals founder-led at the ACV you're targeting. Until a motion is repeatable by a founder, an AE is being hired to discover it — and discovery is the founder's job, not a quota-carrying hire's.

Also missing from the enterprise plan entirely: SOC 2, SSO/SAML, RBAC, audit logs, MSA/DPA, security questionnaire coverage, uptime SLAs. Every one of these will stop a deal cold, and none of them is on your list. You have budgeted the salespeople and not the thing they need to sell.

---

## Fire — 火 — the engagement

*Kan no me tsuyoku, ken no me yowaku.* Perception strong, eyesight weak. See the distant thing as near and the near thing as distant.

**"The 4 big features customers keep asking for"** is *ken* — what your eyes see and ears hear. Feature requests come loudest from customers who already pay you and aren't leaving. The *kan* question is the one that moves MRR:

> Which features appear by name in the notes of deals you **lost**, or in the accounts that **churned**?

That list is usually one or two items, and usually not the same list. Go read your last 40 closed-lost deals before you commit a quarter of engineering to four builds. Then ship two, and publicly kill the other two — you get roadmap credibility for the kill, which is worth more than the half-built third feature.

**Content, 4 → 8 posts.** With six people, who writes them? Doubling volume at fixed headcount halves depth, and depth is the only thing that ranks in a category where Datadog, CircleCI, Honeycomb and Buildkite already own the terms. Musashi again: *"Do nothing which is of no use."* Eight mediocre posts in a quarter is eight units of useless motion. Four posts that a CI-observability buyer finds at the exact moment their pipeline is on fire will outperform them and cost half as much.

**The rebrand in September** lands in the middle of the only selling window that could reach your number. It produces zero MRR. If your site converts badly, that is a messaging and landing-page problem — fix the copy in a week, not the logo in a quarter. Move the rebrand to January, when you know which position you actually occupy.

---

## Wind — 風 — the other school

The Wind book is Musashi studying rival schools and naming their faults. Yours is called Datadog.

Their school's weapon is **the bundle**. Their strategy is to be adequate at forty things so no buyer needs a forty-first vendor. Their entry-tier price is not a price — it is a loss-leader funded by the other thirty-nine products. **They can take it to zero. You cannot.**

Matching that number is fighting on ground the enemy chose, with the enemy's weapon, at the enemy's preferred distance. It is what Musashi calls *release four hands* — two fighters locked in the same grip, neither gaining, both tiring. His instruction is explicit: **abandon the technique and win by a different method.**

Your school's weapon is the opposite of theirs: you are the *sharp instrument*, they are the *toolbox*. Depth in CI specifically. Time-to-value in an afternoon, not a quarter. A team that answers. Nobody has ever bought CI observability *from Datadog* because it was the best CI observability — they bought it because it was already in the contract.

So when you lose on price, hear it correctly. "Too expensive" is the polite lie a buyer tells when the value wasn't legible. The real losses are usually: value not proven fast enough in trial, wrong packaging (they had to buy a tier three sizes too big), or no clean answer to "we already have Datadog." **None of those is fixed by lowering the number.** All three are fixed by repackaging, faster onboarding, and a direct displacement story.

If anything, raise the top tier and give yourself an expansion path. Expansion into 80 existing accounts is the fastest, highest-certainty revenue in your building — and it is the one lever missing from all five of your initiatives.

---

## Void — 空 — what isn't on the page

*"Perceive those things which cannot be seen."*

1. **Net revenue retention.** If NRR is under 100%, every acquisition plan on this page is water into a cracked bucket, and nothing else matters until it's sealed.
2. **Runway.** You never state it. Adding $30k/month of burn against $40k of MRR is a survival decision, not a growth decision, and the plan discusses it as neither.
3. **Why $100k?** It reads like a round number chosen before the plan, then a plan reverse-engineered to reach it. That is the most dangerous sentence in the document: *"if we execute all 5."* Five simultaneous bets with six people is not execution risk, it is execution certainty — you will be late on all five rather than early on one.
4. **Who is running the company** while two founders interview AEs, one runs a rebrand, and engineering builds four features?

---

## The plan I'd actually run

**Two weeks of ground survey, before you commit anything:**
- Win/loss interviews on the last 40 closed-lost deals. Real reasons, not CRM dropdowns.
- Cohort retention and NRR. Gross and net.
- Which of the 4 features appear in *lost* deals vs. wishlist tickets.
- Runway in months at current burn, and at current burn plus 2 AEs.

**Then the quarter — three things, not five:**

1. **Ship 2 features**, chosen by lost-deal evidence. Kill the other two loudly.
2. **Expansion motion into the existing base.** Founder-run, starting week one. Usage-based upsell, seat growth, top-tier migration. This is where your next $15–20k of MRR actually is, and it needs no new headcount.
3. **Founder-led enterprise, no AEs.** Close three enterprise deals yourself at target ACV for the same reason. *Then* hire — you'll know what to hire for, and the AE will ramp in half the time.

**Explicitly deferred:** the price match (refused outright), the rebrand (January), post volume (hold at 4).

**And restate the number honestly.** At a realistic 10–12% net monthly growth, you finish the year at $65–72k MRR — with a clean, repeatable enterprise motion and no price floor conceded. $100k is a Q2-2027 number. Say that out loud to the team and to your board now, rather than in December.

---

## What would change my mind

- **NRR above 120%** → the expansion motion is even more clearly the answer, and $100k moves within reach without a single new hire.
- **Three or more inbound enterprise deals already stalled on missing SOC 2 / SSO** → the upmarket bet has real evidence. Fund the compliance work immediately; still don't fund the AEs yet.
- **Price is the #1 loss reason in >40% of losses, specifically against Datadog** → you have a *packaging* problem, not a price problem. Restructure the tier, don't match the number.
- **24+ months of runway** → the AE hire is an affordable 2027 investment. Fine. But then stop counting it toward a 2026 target and say plainly what it is.

---

*From the Dokkodo, three lines for this quarter:*
*Accept everything just the way it is.* — the growth rate you have, not the one on the slide.
*Do not act following customary beliefs.* — the AEs.
*Do not seek pleasure for its own sake.* — the rebrand.
