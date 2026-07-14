---
name: backend-cost-security-reference
description: Reference for cloud cost optimization (observability, auth, search, email, compute, serverless, storage, CI/CD, bundle/image size, database queries, caching ROI) and backend security hardening (SQL/NoSQL injection prevention, connection security, field-level encryption, dependency supply-chain security, caching and queue architecture). Use this whenever the user asks about cloud bills, AWS/Vercel/Datadog costs, right-sizing instances, choosing a managed service (auth provider, search, email), FinOps practices, or wants a security review of database access code, ORM usage, dependency management, or a caching/queue design — even if they just say something's "expensive" or ask you to "review this for security issues" in a backend context.
---

# Backend Cost & Security Reference

A lookup reference for two things that tend to get neglected until they're expensive: cloud/service costs, and backend security hardening. Both categories share the same posture — most of the value comes from a handful of well-known, mechanical fixes rather than deep architectural rework. This skill exists so you reach for the known-good pattern instead of reasoning from scratch every time.

## When to use this

- The user mentions a cloud bill, a specific cost number, or asks "why is X so expensive"
- They're choosing between managed services (auth, search, email, database, Redis) and want cost-informed guidance
- They ask you to right-size compute (EC2, Lambda, Kubernetes, containers) or optimize CI/CD spend
- They ask about bundle size, image optimization, or reducing bandwidth/egress costs
- They ask you to review backend code that touches a database, ORM, or raw SQL for security issues
- They ask about dependency/supply-chain security (lockfiles, auditing, pinning, SRI)
- They're designing a caching layer, rate limiter, message queue, or event-driven system

Don't wait for the user to say "FinOps" or "security audit" explicitly — if they're debugging a surprising AWS invoice or pasting a raw SQL query with string interpolation, that's your cue.

## How to use the reference files

Each file below is self-contained — read only the one(s) relevant to the question at hand, not all of them. They're organized by decision domain, not by source document, so a single user question usually maps to exactly one file.

| File | Read this when the user is asking about... |
|------|----------------------------------------------|
| `references/observability-and-services.md` | Datadog/New Relic/Grafana costs, log or trace sampling, or choosing an auth provider (Clerk/Auth0/Supabase/Keycloak/Firebase), search service (Algolia/Meilisearch/Typesense), or email service (SES/Resend/Postmark/SendGrid) |
| `references/finops-practices.md` | Cost tagging/allocation, budget alerts, unit economics, the managed-vs-self-hosted decision, or "what should I fix first" (priority matrix) |
| `references/code-level-savings.md` | Bundle size / tree-shaking, image optimization (WebP/AVIF), slow database queries and missing indexes, N+1 queries, memory leaks, or response/storage compression |
| `references/cloud-infra-costs.md` | EC2/Kubernetes right-sizing, Lambda/serverless tuning, NAT gateway or data transfer costs, S3 storage tiers, Docker image size, or CI/CD spend |
| `references/database-security.md` | SQL/NoSQL injection prevention, parameterized queries and ORM safety, DB connection security, field-level encryption, or dependency supply-chain hardening |
| `references/caching-and-queues.md` | Cache strategy (cache-aside/write-through/write-behind), Redis patterns (rate limiting, locks, sessions, leaderboards), message queues, or event-driven/CQRS architecture |

## Applying this reference well

**For cost questions:** don't just recite a number from the table — translate it into the user's actual scale. The tables give per-unit or reference-scale pricing (e.g., "100K emails/month"); scale it to what they described. When several fixes apply, lead with the ones in the priority matrix (`finops-practices.md`) that are low-effort and high-savings — cheap wins first, architectural self-hosting decisions last.

**For security questions:** the injection-prevention examples exist to be pattern-matched against the user's actual code, not quoted at them in the abstract. If they paste a query, show the specific parameterized rewrite. Treat the checklist at the end of `database-security.md` as a review rubric when asked to audit database-touching code.

**Numbers will drift.** These are 2026-era reference prices meant to establish relative magnitude and the shape of the tradeoff (e.g., "Reserved instances beat On-Demand by roughly half," "self-hosting search pays off past ~500K records") — always caveat that the user should confirm current pricing before making a purchasing decision, especially for anything approaching a real budget commitment.
