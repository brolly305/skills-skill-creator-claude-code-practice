# [Project]: Eval Plan

## 1. What "working" means
| # | Criterion | Target | Ties to SOW outcome |
|---|---|---|---|
| C-1 | | [e.g. ≥95% correct] | |

## 2. Golden test set
| ID | Scenario (from build spec) | Input | Expected result | Check type |
|---|---|---|---|---|
| E-1 | S-1 | | | deterministic / model-graded / human |

## 3. How each check runs
- **Deterministic:** [exact rules and how they're checked]
- **Model-graded:** [rubric: criteria and score scale; grader model, dated]
- **Human review:** [what % is sampled, how often, by whom; every escalation reviewed]

## 4. Acceptance
The work is accepted, and final payment is due, when: [criteria and thresholds over N test runs].

## 5. After launch (drift loop)
| What | How often | Who | Trigger for review |
|---|---|---|---|
| Re-run golden set | [monthly] | | [model/price change, complaints, escalation rate > x%] |

**Decision rule:** fix now if [a governance test fails or a C-criterion drops below target]; accept if [...]; log for later if [...].

*Website / non-AI build:* replace sections 1-3 with a launch QA checklist: phone + desktop render, forms deliver, links and phone numbers work, accessibility basics, page speed, no placeholder content.
