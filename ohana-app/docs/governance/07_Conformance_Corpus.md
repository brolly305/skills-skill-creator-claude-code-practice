# Conformance Corpus
## Canonical Decision Examples with Evidence and Outcomes
**Orlop Group Holdings LLC | Version 1.0 | June 2026**

---

## Purpose

This corpus is the institutional memory of Orlop Group Holdings. Every significant decision — its evidence, reasoning, alternatives, outcome, and lessons — is recorded here. It becomes the most valuable knowledge asset in the system because it contains real decisions with real outcomes, not theoretical frameworks.

AI agents query this corpus to calibrate confidence, identify analogous situations, and avoid repeating errors. Human operators review it before making similar decisions.

---

## Decision #001 — Pricing Structure (Ohana)

**ID:** OPS-2026-001
**Title:** Junk removal service tier pricing structure
**Entity:** Ohana Property & Transition Services LLC
**Date:** June 2026
**Status:** ACTIVE

**Decision:** Implement two-table pricing structure — minimum service charges by travel zone ($199 within 50 miles, $299 for 50-100 miles) plus load-based volume pricing ($89 minimum to $875+ full truck). No flat rates. All quotes by range, confirmed at walkthrough.

**Evidence:**
- Direct (Tier 1): Operating cost analysis — labor, fuel, dump fees, insurance, equipment
- Analogous (Tier 2): Competitor pricing in Central Indiana market via market research
- Inferred (Tier 4): Range pricing reduces scope creep disputes vs. flat rate pricing

**Load-bearing assumptions:**
- Central Indiana market will accept $199 minimum without significant price resistance
- Walkthrough confirmation will reduce underpriced complex jobs to acceptable frequency

**Alternatives considered:**
- Flat rate by item type (rejected: too many edge cases, difficult to explain)
- Hourly rate (rejected: creates incentive for slow work, difficult to estimate)
- Market rate matching (rejected: leads with price, conflicts with positioning strategy)

**Risks:**
- Underpricing on early jobs before margin data is established
- Scope creep if change-order language is not enforced

**Revision trigger:** Gross margin below 40% on 3 or more consecutive jobs triggers pricing review.

**Outcome:** PENDING — first 10 jobs required to evaluate.

**Lessons:** PENDING

---

## Decision #002 — Free Test Drive Model (HOL)

**ID:** OPS-2026-002
**Title:** Pre-revenue social proof strategy — free campaigns before paid pricing
**Entity:** HOL Creative Solutions LLC
**Date:** June 2026
**Status:** ACTIVE

**Decision:** Run 10 free Google review or reactivation campaigns before charging any client. In exchange: one 5-star video testimonial and five business referrals per client. Paid pricing unlocks at 10 video reviews.

**Evidence:**
- Analogous (Tier 2): Agency Lab / Atlas Digital documented methodology (source: PDF guide, "Close Your First Client in 30 Days")
- Analogous (Tier 2): The Hormozi value-first model — add insane free value then pitch
- Inferred (Tier 4): Ohana is only internal case study; external social proof required before charging premium rates
- Assumption (Tier 5): 60% of test drive clients will produce the requested referrals

**Load-bearing assumptions:**
- Test drive campaigns (review + reactivation) will produce measurable results within 72 hours
- Business owners will provide video testimonials and referrals when results are delivered
- HOL has sufficient capacity to run 10 free campaigns without depleting operator time

**Alternatives considered:**
- Charge from day one at lower rate (rejected: insufficient social proof to justify even low rates)
- Free for one client, then charge (rejected: sample size too small to validate the system)
- Build internal case studies only from Ohana (rejected: Ohana is HOL's own company — discounted by external evaluators)

**Risks:**
- Time investment in free campaigns depletes HOL capacity before revenue is generated
- Test drive clients do not convert to paid after receiving free results
- Referrals from test drive clients are lower quality than expected

**Revision trigger:** After 5 test drive clients, evaluate: Are video reviews being collected? Are referrals converting to additional test drives? Is conversion to paid occurring? Adjust model if any metric is significantly below expectation.

**Outcome:** PENDING — in execution.

**Lessons:** PENDING

---

## Decision #003 — GHL Knowledge Base Structure (Ohana)

**ID:** OPS-2026-003
**Title:** Marco bot knowledge base — 8 entries structured for GHL retrieval
**Entity:** Ohana Property & Transition Services LLC
**Date:** June 2026
**Status:** CLOSED

**Decision:** Build 8 separate rich text KB entries in GHL for Marco (Conversation AI) rather than one monolithic entry. Entries cover: Business Identity, Bot Persona and Tone, NEPQ Conversation Flow, Objection Handling, FAQs and Pricing, Booking Protocol, Escalation Rules, Additional Question Bank.

**Evidence:**
- Direct (Tier 1): GHL documentation — 7 KB per trigger limit discovered during configuration
- Inferred (Tier 4): Chunked entries improve retrieval accuracy over single monolithic entry
- Assumption (Tier 5): GHL retrieval uses file name as part of the retrieval signal

**Load-bearing assumptions:**
- GHL's AI retrieval is semantic — naming conventions affect which entry fires
- 8 entries exceed the 7-KB-per-trigger limit — requires combining entries 7 and 8

**Revision required:** Combine KB entries 7 (Escalation) and 8 (Question Bank) before next Marco deployment to stay within 7-KB limit.

**Outcome:** KB entries built and loaded. Trigger instructions written per entry. Combining entries 7+8 is PENDING.

**Lessons:**
- Audit GHL platform limits before designing KB structure in future builds
- File naming is a retrieval signal — entries should be named for the trigger condition, not the content type
- Pre-existing KBs in the GHL account must be audited before adding new entries to avoid retrieval conflicts

---

## Decision #004 — Blog at ohanapropertyexperts.com/blog (Ohana)

**ID:** OPS-2026-004
**Title:** GHL native blog configuration for Ohana
**Entity:** Ohana Property & Transition Services LLC
**Date:** June 2026
**Status:** ACTIVE

**Decision:** Configure GHL blog at ohanapropertyexperts.com/blog. Blog title: "Ohana Property Services Blog." Meta description: "Junk removal tips, estate cleanout guides, and property transition resources for Central Indiana." (97 characters — within 100-char limit.)

**Evidence:**
- Direct (Tier 1): Website already live at ohanapropertyexperts.com on Emergent hosting with GHL connected
- Expert consensus (Tier 3): Blog content at /blog on primary domain is a strong local SEO signal
- Inferred (Tier 4): GHL native blog reduces technical friction vs. separate blog platform

**Pending actions (revision triggers if not completed):**
1. Configure blog categories
2. Set up author profile
3. Publish first post: "How to clean out a parent's home after a loss"
4. Verify GHL generates sitemap entry or submit manually to Google Search Console

**Outcome:** Blog configured. Categories, author profile, and first post PENDING.

**Lessons:** PENDING — add after first post published and indexed.

---

## Decision #005 — Lean Canvas Framework Adoption (Orlop)

**ID:** OPS-2026-005
**Title:** Lean Canvas as standard business profiling and client discovery tool
**Entity:** Orlop Group Holdings LLC (all entities)
**Date:** June 2026
**Status:** COMMITTED

**Decision:** Adopt Lean Canvas as the standard one-page business profile format for all Orlop entities and as the HOL client discovery instrument. Recommended by Rick (retired Cummins professional, Columbus Chamber of Commerce advisor).

**Evidence:**
- Expert consensus (Tier 3): Rick's recommendation carries domain credibility — Cummins-level operational discipline and Chamber network access
- Analogous (Tier 2): Lean Canvas is widely validated in startup and SMB contexts for forcing strategic clarity
- Direct (Tier 1): Lean Canvases built for all three entities — gaps immediately visible, HOL client discovery gap tool built from canvas structure

**Key insight:** The canvas gaps in client discovery tell you what to build. Empty Channels = GBP and SEO. No Key Metrics = CRM pipeline. Inconsistent Revenue = automation. This makes HOL's scoping process evidence-based rather than assumption-based.

**Outcome:** Canvases built for Ohana, HOL, and Resonance Training. Interactive dashboard and PDF built for Rick/Chamber presentation.

**Lessons:** The Lean Canvas forced articulation of Resonance Training's model for the first time — previously undocumented. The exercise revealed that Resonance Training's unfair advantage (HOL as undisclosed operator) had never been written down, which means it could not be protected or replicated intentionally.

---

## Decision #006 — Kaizen Intelligence Methodology Adoption (Orlop)

**ID:** OPS-2026-006
**Title:** Adoption of Kaizen Intelligence Methodology as governance layer for all AI systems and human decisions
**Entity:** Orlop Group Holdings LLC
**Date:** June 2026
**Status:** COMMITTED

**Decision:** Implement Kaizen Intelligence Methodology as the governance foundation for all AI agents (CoFounder, Marco, Voice AI, future systems) and human decision processes within Orlop Group Holdings.

**Evidence:**
- Expert consensus (Tier 3): The Kaizen methodology framework shared via strategic document articulates a clear gap between information-loaded AI systems and governance-guided AI systems
- Inferred (Tier 4): Every AI system built without a governance layer defaults to the model's general training — which does not reflect Orlop's specific reasoning standards, values, or decision authority structure
- Direct (Tier 1): Observed during this session — AI agents provided useful information but without explicit governance, they could not distinguish between Tier 1 and Tier 5 evidence in their own recommendations

**Key insight:** Most people upload information to AI knowledge bases. The competitive advantage is uploading governance. The model already knows facts. It does not know how Orlop thinks, evaluates, and decides.

**Outcome:** Phase 1 governing documents built (this corpus). Phase 2 business knowledge already exists across multiple outputs from this session. Phase 3 enterprise memory begins with this corpus entry.

**Lessons:** The decision to build governance before scaling is itself a Kaizen-compliant decision — evidence before commitment, smallest viable implementation first, revision triggers built in.

---

## Template for Future Entries

```
## Decision #[XXX] — [Title]

**ID:** [Entity]-[Year]-[Number]
**Title:** [Plain English]
**Entity:** [Entity name]
**Date:** [Month Year]
**Status:** [Status]

**Decision:** [What was decided — 2-3 sentences]

**Evidence:**
- [Evidence type (Tier N)]: [What the evidence says]

**Load-bearing assumptions:**
- [Assumption]: [Consequence if false]

**Alternatives considered:**
- [Alternative]: [Why rejected]

**Risks:**
- [Risk]: [Mitigation]

**Revision trigger:** [Condition that reopens evaluation]

**Outcome:** [What actually happened — complete after the fact]

**Lessons:** [What this decision teaches — complete after outcome is known]
```
