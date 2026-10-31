---
name: ai-consulting-playbook
description: Run a client engagement the way a senior AI/automation consultant would - discovery and process audit, scored opportunity list, statement of work with value-based pricing, build spec, AI governance, eval plan, cost-to-run model, and handoff runbook - and produce the client-ready documents for each. Use this whenever the user is scoping, pricing, proposing, or delivering work for a client (websites, booking flows, chatbots, automations, AI agents, CRM/GHL builds), wants to go "upmarket" to bigger retainers, needs an SOW or proposal, gets asked about data governance / running costs / reliability, or says things like "run the playbook", "discovery for this client", "how should I price this", "write the SOW", "what do I tell their legal/finance team", even if they don't name the playbook.
---

# AI Consulting Playbook

Small builders lose bigger deals not because they can't build, but because they can't answer three questions the buyer's team asks:

- **Legal / compliance:** "How are you handling our data, and what is this system allowed to do?"
- **Finance:** "What does this cost to run, today and at scale, and what do we get back?"
- **Operations / procurement:** "How do we know it works, and what happens when it doesn't?"

There is a fourth question that decides whether a project becomes a retainer: **"Is anyone actually using it?"** Systems that work but never get adopted get cancelled.

This playbook produces documents that answer all four, in the client's numbers, before anyone has to ask. It runs in four phases and seven pillars.

| Phase | Pillar | Output file |
|---|---|---|
| 1. Discover & Scope | 1. Process Audit & AI Fit | `01-discovery-audit.md` (includes the scored opportunity list) |
| | 2. Engagement Design | `02-statement-of-work.md` |
| 2. Architect & Build | 3. Context, Workflow & Reliability | `03-build-spec.md` |
| | 4. Governance | `04-governance.md` |
| 3. Evaluate & Iterate | 5. Evals | `05-eval-plan.md` |
| 4. Deliver & Sustain | 6. Cost & ROI Model | `06-cost-model.md` |
| | 7. Adoption & Enablement | `07-adoption-and-handoff.md` |
| (all) | Buyer answers | `00-executive-summary.md` (written last) |

Templates for every file are in `assets/templates/`. Copy the template, then fill it. The templates hold the structure so this file can focus on judgment.

## Step 0: Right-size before writing anything

A 40-page packet handed to a two-person HVAC shop loses the deal just as surely as a napkin quote handed to a 200-person company. Pick the track first and say which one you picked and why.

- **Lite track:** owner-operated business, one decision-maker, roughly under $5K or a one-off project (site, booking form, simple automation). Produce `00`, `01`, `02` and a short `07` (sections 5-8 only: what to do when something breaks, who owns what, content upkeep, and a one-line monthly check-in). Fold governance, evals, and cost into a one-page "How we protect you" section inside the SOW (data handled, what we test before launch, monthly running cost). Plain language, no jargon.
- **Full track:** growing or larger company, multiple stakeholders (owner + ops + finance or legal), $10K+ or a monthly retainer, or any system where AI reads customer data or acts on its own (sends messages, books, quotes, updates records). Produce all eight files.

If unsure, ask the user one question: who signs, and roughly what budget. Do not guess the budget.

## Ground rules (why they matter)

1. **Only real facts.** Client names, call volumes, revenue, close rates, licenses, review counts, years in business: use only what the user or client supplied. Where a number is needed but unknown, write `[CONFIRM: what you need and who can answer]` and keep going. Invented numbers in an SOW destroy trust the first time the client checks one, and fabricated reviews or credentials can be illegal.
2. **Their numbers, not your activities.** Outcomes are stated as the client measures them ("missed after-hours calls answered", "quotes sent within 1 hour"), not as tasks ("build chatbot").
3. **Show the math.** Every price, cost, and ROI figure shows its inputs and formula, with assumptions in a table. A finance person trusts a visible calculation over a confident total.
4. **Vendor prices are dated.** Model, API, and SaaS prices change. Look them up if you can and cite the date and source; otherwise mark them `[CONFIRM: current price]`. Never present a remembered price as current.
5. **Never silently substitute.** If a real asset or input (photos, logins, data export, brand files) is missing, list it as a blocker in the SOW rather than quietly filling the gap with something generated.
6. **Client's language.** Client-facing documents go in the language the decision-maker reads best; offer a translated copy for bilingual businesses.
7. **Not legal advice.** The SOW is a working draft. For contracts above roughly $10K or with unusual liability, recommend the client's attorney review it, and say so in the document.

## Phase 1: Discover & Scope

### Pillar 1: Process Audit & AI Fit -> `01-discovery-audit.md`

Goal: find the problem worth paying to solve, which is often not the one the client asked for.

1. **Reframe the request.** Write the stated request, then the underlying problem, then the evidence for it. "We want a chatbot" often turns out to be "we miss 30% of evening calls and those are our highest-value jobs."
2. **Map the work as it actually flows today**, step by step, including the parts nobody documents: the owner's personal cell, the paper notebook, the spreadsheet only one person updates, the "we just remember." Note who does each step, the tool, the time it takes, and where things drop.
3. **List opportunities**, one per broken or slow step.
4. **Score each one** in the scorecard: value (1-5, in the client's terms), AI fit (1-5, how much of the work a model can really do, versus rules, a form, or a human), and risk (1-5, what happens if it's wrong). Priority = value x fit, with risk as a gate: anything risk 4-5 needs a human in the loop or moves to Later.
5. **Bucket into Now / Later / Leave alone**, with one sentence of reasoning each. Say plainly when the right answer is not AI (a booking form, a missed-call text-back, a fixed checklist). Recommending the boring fix builds more trust than forcing AI into everything.

Done when: the client would recognize their own workflow in the map, and the Now list has 1-3 items, each tied to a number they care about.

### Pillar 2: Engagement Design -> `02-statement-of-work.md`

Goal: a document the client can sign that protects both sides.

1. **Outcome** in their numbers, with a baseline (or `[CONFIRM]` if unmeasured) and a target.
2. **Scope line:** an In list where every item has a "done" test someone could check without asking you, an Out list naming the obvious adjacent things you are not doing, and Client responsibilities (logins, content, approvals, a contact person).
3. **Price against value, not hours.** Estimate the outcome's yearly value to the client (show the formula), then price at a fraction of it that is easy to say yes to. Offer 2-3 options (e.g. Core / Core + Monitoring retainer / Full) rather than one take-it-or-leave-it number. Keep your internal hours estimate out of the client document.
4. **Terms:** payment schedule tied to milestones, what counts as acceptance (link to the eval plan's acceptance criteria), change-request rule (new asks are quoted separately before work starts), timeline with client dependencies, and ownership of accounts and code.

Done when: every In item has a testable done-check, every price has visible math, and the change-request rule is written.

## Phase 2: Architect & Build

### Pillar 3: Context, Workflow & Reliability -> `03-build-spec.md`

Goal: design for the real user on a bad day, not the demo.

1. **Context inventory:** what information the system needs (services, prices, hours, service area, policies), where each piece lives, who keeps it current, and how it goes stale. Stale context, like last year's prices or a closed service area, is the most common way AI systems quietly degrade.
2. **Code vs. model line:** a table of each decision and whether deterministic code, the model, or a human makes it. Rule of thumb: anything with a right answer you can write down (business hours, ZIP-code coverage, price lookups, sending the message) is code; judgment over messy language (understanding what a customer wants, drafting a reply) is the model; anything expensive, irreversible, or legally sensitive gets a human approval step.
3. **Scenario map:** happy path, common variations, edge cases, and failure cases (the API is down, the customer writes in Spanish, the customer is angry, the request is out of the service area, emergency or safety issues). Each scenario becomes a test in the eval plan.
4. **Milestones:** build in thin, working slices that each pass their scenarios before the next starts.
5. **Reliability:** retries and timeouts, fallbacks when the model or an integration fails (fall back to "a person will call you"), no duplicate actions on retry, logging that lets you reconstruct what happened, and a kill switch the client can use.

### Pillar 4: Governance -> `04-governance.md`

Goal: answer legal and compliance before they ask, and build the answers into the system.

1. **Permission matrix:** for each system and data source, what the AI may read, write, or act on, what needs human approval, and what it must never touch.
2. **Data handling** sized to the client's industry and risk: what personal data is collected, why, where it's stored, who can see it, how long it's kept, how it's deleted on request, and whether any of it is sent to a model provider (and that provider's retention terms, dated). Flag regulated data (payments, health, minors' data, recorded calls) and the rules that may apply, with `[CONFIRM]` where the client's obligations are unknown.
3. **Escalation and ownership:** when the system is wrong or unsure, who gets notified, how fast, and who owns the fix. Name a person or role on each side.
4. **Requirements, not paperwork:** give each rule an ID (G-1, G-2...) and point to where the build spec enforces it and where the eval plan tests it. A rule nobody enforces is a liability, not a protection.

## Phase 3: Evaluate & Iterate

### Pillar 5: Evals -> `05-eval-plan.md`

Goal: prove it works in measurable terms, and keep proving it after launch.

1. **Define "working"** as 3-6 measurable criteria tied to the SOW outcome (e.g. "95% of test inquiries get the correct service-area answer", "0 messages sent without approval in restricted categories", "median response under 60 seconds").
2. **Golden test set** built from the scenario map, with an expected result for each case, including the failure and edge cases.
3. **Three kinds of check**, each where it fits: deterministic (exact rules: right phone number, never quotes a price, links work), model-graded (a rubric scored by a model for tone, accuracy, completeness), and human review (a sampled percentage each week, plus every escalation).
4. **Acceptance:** the thresholds that trigger the SOW's acceptance and final payment.
5. **Drift loop after launch:** what gets re-run and how often, which signals trigger a review (complaints, escalation rate, a model or price change), and the rule for deciding fix now / accept / log for later.

For non-AI deliverables such as a website, the eval plan becomes a launch QA checklist: renders on phone and desktop, forms deliver, every link and phone number works, accessibility basics, page speed, and real (not placeholder) content everywhere.

## Phase 4: Deliver & Sustain

### Pillar 6: Cost & ROI Model -> `06-cost-model.md`

Goal: answer the finance question with a model they can change themselves.

1. **Cost per unit of work** (per conversation, per booking, per document): model tokens, API calls, phone/SMS fees, SaaS seats, hosting, and the human review time the eval plan requires. Every price is dated and sourced, or `[CONFIRM]`.
2. **Volume scenarios:** today, 3x, and 10x, so they see how cost scales, and where a different tier or architecture becomes cheaper.
3. **Value side:** what the outcome is worth per month using the client's own numbers (hours saved x loaded rate, recovered leads x close rate x average job value).
4. **Payback and break-even**, with the formula visible, and a sensitivity line ("if close rate is half what we assumed, payback moves from X to Y months"). Conservative is more persuasive than optimistic.

### Pillar 7: Adoption & Enablement -> `07-adoption-and-handoff.md`

Goal: people actually use it, the client can run it without you, and the monthly report gives them a reason to keep paying you.

Plan adoption from the start, not at the end. A system that passes every eval but that staff route around is a failed project, and it's usually the first thing cut when budgets tighten.

1. **Who it changes:** for each affected role, what they do today, what changes, and what they might lose or fear (status, control, their job, a familiar routine). Name a champion on the client side. Resistance you don't plan for shows up as quiet workarounds.
2. **Rollout:** pilot with the champion or one team first, fix what it surfaces, then roll out, then decide when the old way is switched off or kept as a backup.
3. **Training and enablement**, sized to the audience: a two-minute video or one-page guide for daily users, a short walkthrough for the owner on reading the usage report and using the kill switch. Training goes in the language the users work in.
4. **Runbook:** what normal looks like, common failures with step-by-step fixes a non-technical person can follow, when to call you, the kill switch, who owns which accounts (in the client's name, not yours), and who keeps content current.
5. **Monthly usage report:** usage, adoption (share of work going through the new system versus the old way), quality (eval pass rate, escalations), and the SOW outcome measure, ending in a one-sentence answer to "is it being used and holding up?" plus one recommended next step.
6. **Retainer menu:** monitoring (the monthly report and eval re-runs), improvements from the Later list, new opportunities. The usage report is what makes the retainer easy to keep paying for.

## Last: `00-executive-summary.md`

One page for the decision-maker: the problem in their words, the recommendation, the price options, and four short paragraphs titled exactly "What it's allowed to do with your data", "What it costs to run", "How we know it works", and "How your team will use it", each pointing to the detailed file. Write it last, because it summarizes decisions made in the others.

## Before delivering

Check the set against this list and fix anything that fails:

- Every number is either sourced from the client, calculated with visible math, or marked `[CONFIRM]`. Nothing is invented.
- Every SOW In item has a done-test, and acceptance points to the eval plan.
- Every governance rule ID is enforced in the build spec and tested in the eval plan (Full track).
- The track matches the client (no 40-page packet for a two-person shop).
- A list of all open `[CONFIRM]` items, with who answers each, sits at the end of `00-executive-summary.md`, so the user knows exactly what to ask the client.

Save the files to `clients/<client-slug>/` in the user's working directory unless they name another place, and tell the user which track you used, what files you produced, and the open `[CONFIRM]` list.
