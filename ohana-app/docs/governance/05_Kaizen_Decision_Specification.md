# Kaizen Decision Specification (KDS)
## Technical Specification for Decision Objects
**Orlop Group Holdings LLC | Version 1.0 | June 2026**

---

## Overview

The KDS defines the data structure for every significant decision made within Orlop Group Holdings. It ensures that decisions are recorded consistently, are traceable across time, and are queryable by AI agents and human operators.

Every entry in the Conformance Corpus follows this specification.

---

## Decision Object

```
DECISION_ID: [Entity prefix]-[Year]-[Sequential number]
  Examples: OPS-2026-001 (Ohana), HOL-2026-001, RES-2026-001

TITLE: [Plain English description of the decision]

ENTITY: [Ohana | HOL | Resonance | Orlop | Hearth]

DOMAIN: [Pricing | Operations | Marketing | Technology | Legal | Financial | Partnership | Hiring]

DATE_INITIATED: [ISO date]
DATE_COMMITTED: [ISO date]
DATE_CLOSED: [ISO date or OPEN]

STATUS: [IDENTIFIED | UNDER EVALUATION | COMMITTED | ACTIVE | CLOSED | UNDER REVISION | ARCHIVED]

REVERSIBILITY: [FULLY | PARTIALLY | LARGELY | IRREVERSIBLE]

DECISION_MAKER: [Role of human who authorized commitment]

CONFIDENCE_AT_COMMITMENT: [HIGH | MEDIUM | LOW | UNKNOWN]
EVIDENCE_TIER: [1 | 2 | 3 | 4 | 5 — per Epistemic Charter]
```

---

## Evidence Object

```
EVIDENCE:
  observations:
    - [Observation 1 — raw, uninterpreted]
    - [Observation 2]
  
  evidence_items:
    - source: [Where this came from]
      type: [DIRECT | ANALOGOUS | EXPERT_CONSENSUS | INFERRED | ASSUMPTION]
      content: [What the evidence says]
      confidence: [HIGH | MEDIUM | LOW]
  
  load_bearing_assumptions:
    - assumption: [What we are assuming]
      consequence_if_false: [How the decision changes if this assumption is wrong]
  
  frameworks_applied:
    - [Framework name from Framework Library]
    - [Framework name]
  
  adversarial_review:
    red_team: [Best argument against this decision]
    steelman: [Best version of the opposing position]
    premortem: [How this decision fails in 12 months]
```

---

## State Machine

```
DECISION STATES:

IDENTIFIED
  → trigger: Decision need recognized
  → action: Begin observation phase
  → next: UNDER EVALUATION

UNDER EVALUATION  
  → trigger: Sufficient observations collected
  → action: Apply frameworks, identify assumptions, assign confidence
  → next: COMMITTED (if evidence sufficient) | IDENTIFIED (if more observation needed)

COMMITTED
  → trigger: Human operator authorizes
  → action: Record decision, set revision triggers, begin implementation
  → next: ACTIVE

ACTIVE
  → trigger: Implementation begins
  → action: Monitor revision triggers, collect outcome observations
  → next: CLOSED (if outcome reached) | UNDER REVISION (if trigger fires)

CLOSED
  → trigger: Outcome documented
  → action: Complete learning record, update relevant models
  → next: ARCHIVED

UNDER REVISION
  → trigger: Revision trigger condition met
  → action: Re-enter evaluation with new evidence
  → next: COMMITTED (revised) | CLOSED (if decision reversed)

ARCHIVED
  → trigger: Learning record complete
  → action: Add to Conformance Corpus
  → terminal state
```

---

## Processor Contracts

Each role in the decision system has defined responsibilities:

**Human Operator (Primary):**
- MUST authorize all COMMITTED state transitions
- MUST review all IRREVERSIBLE decisions with a waiting period
- MUST approve Conformance Corpus entries
- MAY delegate FULLY REVERSIBLE decisions to AI agents with defined scope

**AI Agent (CoFounder / Marco / Voice AI):**
- MAY initiate IDENTIFIED state (flag a decision need)
- MAY conduct UNDER EVALUATION analysis and surface findings
- MAY execute ACTIVE phase implementations within defined authority
- MUST NOT transition to COMMITTED without human authorization
- MUST NOT make IRREVERSIBLE commitments
- MUST escalate when operating outside defined authority scope

**Operations Partner:**
- MUST maintain decision records for all HOL client deliverables
- MUST produce observation records from CoFounder agent sessions
- MAY authorize PARTIALLY REVERSIBLE decisions within defined scope
- MUST flag LARGELY IRREVERSIBLE decisions for Primary Operator review

---

## Policy Framework

**Policy 1 — Minimum evidence threshold by reversibility:**

| Reversibility | Minimum evidence | Human authorization required |
|---|---|---|
| FULLY | Tier 4 (reasoned inference acceptable) | No (agent may decide within scope) |
| PARTIALLY | Tier 3 (expert consensus or analogous) | Yes |
| LARGELY | Tier 2 (analogous evidence from comparable context) | Yes + waiting period |
| IRREVERSIBLE | Tier 1 (direct evidence) + professional review | Yes + legal/financial review |

**Policy 2 — Revision trigger requirements:**

All COMMITTED decisions must include at least one explicit revision trigger. A revision trigger is a condition that, if met, automatically moves the decision back to UNDER EVALUATION.

Format: "We will revisit this decision if [measurable condition] occurs by [date or milestone]."

**Policy 3 — Learning record minimum:**

All CLOSED decisions with significant outcomes must generate a learning record with minimum fields: outcome vs. expectation, evidence gap identified, model update recommended.

**Policy 4 — Assumption escalation:**

Any decision that depends on more than 3 load-bearing assumptions is automatically escalated to the next authority level. High assumption load is a signal that the decision is being made too early.

---

## Invariants

These conditions must always be true in the decision system:

1. **No fabricated evidence** — Every evidence item must have a real source. Fictional examples must be labeled as illustrations.

2. **No hidden assumptions** — All load-bearing assumptions must be named. An assumption discovered after commitment must be added to the record immediately.

3. **Confidence never exceeds evidence** — The confidence level assigned at commitment must be justified by the evidence tier. Overclaiming is a violation.

4. **Traceability is never broken** — Every significant decision must be traceable from initial observation through outcome. Gaps in the record are violations.

5. **Revision is always available** — No commitment is permanently locked against revision. The question is always what evidence would justify revision, not whether revision is possible.

6. **Human authorization on commitments** — AI agents do not authorize commitments. They surface, analyze, and recommend. Authorization is a human function.

---

## Decision ID Registry

| ID | Title | Entity | Status | Date |
|---|---|---|---|---|
| OPS-2026-001 | Pricing structure — junk removal service tiers | Ohana | ACTIVE | June 2026 |
| OPS-2026-002 | Free test drive model — 10 clients before paid pricing | HOL | ACTIVE | June 2026 |
| OPS-2026-003 | GHL Knowledge Base structure — 8 entries, 7-KB limit | Ohana | CLOSED | June 2026 |
| OPS-2026-004 | Blog configuration at ohanapropertyexperts.com/blog | Ohana | ACTIVE | June 2026 |
| OPS-2026-005 | Lean Canvas framework adoption — Rick/Chamber recommendation | Orlop | COMMITTED | June 2026 |
| OPS-2026-006 | Kaizen Intelligence Methodology adoption | Orlop | COMMITTED | June 2026 |
