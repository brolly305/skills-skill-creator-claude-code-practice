# Observability & Managed Service Costs

## Observability Cost Control

### The Problem
- Traces: 60-70% of observability costs
- Logs: 20-30% of observability costs
- Total market: $34.1B in 2026 — most of it wasted

### Platform Pricing (Monthly, Mid-Size Team)
| Platform | Cost | Pricing Model |
|----------|------|---------------|
| Datadog | $8,000+ | Per host + per GB + per metric (complex) |
| New Relic | $1,000-2,000 | Per user + per GB ingested |
| Grafana Cloud | $1,500 | Per signal volume + per user |
| Self-hosted Grafana + Prometheus | $200-500 | Infrastructure only |

### Log Sampling (Immediate Savings)
```typescript
import pino from 'pino';

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
});

// Sample INFO-level logs in production
const SAMPLE_RATE = 0.1; // Log 10% of info events
function infoSampled(msg: string, data?: object) {
  if (Math.random() < SAMPLE_RATE) logger.info(data, msg);
}

// Always log errors and warnings (no sampling)
logger.error({ err, traceId }, 'Payment failed');
logger.warn({ userId }, 'Rate limit approaching');

// Sample info-level
infoSampled('Request completed', { path: req.path, duration: ms });
```
**Saves:** 90% log volume reduction while keeping all errors.

### Trace Sampling
```typescript
// Tail sampling: Keep 100% of errors + slow requests, sample the rest
const tracer = require('dd-trace').init({
  sampleRate: 0.1,  // Send 10% of normal traces
  // But always send error traces (configured in Datadog agent)
});
```
**Saves:** 70-80% on trace costs while keeping all interesting traces.

### High-Cardinality Metric Pitfalls
```typescript
// BAD: Creates millions of time series ($$$$)
counter.inc({ user_id: userId, request_id: requestId });

// GOOD: Aggregate by meaningful dimensions only
counter.inc({ endpoint: '/api/users', method: 'GET', status: '200' });
```
**Rule:** Never put user IDs, request IDs, timestamps, or UUIDs in metric labels.

### Retention Policies
| Log Type | Retention | Rationale |
|----------|----------|-----------|
| Application errors | 90 days | Debugging, postmortems |
| Access logs | 30 days | Security review period |
| Debug logs | 7 days | Short-term troubleshooting |
| Health check logs | 1 day | Almost never needed |
| CI/CD logs | 14 days | Build debugging |

---

## Auth Provider Economics

### Pricing Comparison (2026)

| Provider | Free Tier | Paid | SAML SSO |
|----------|----------|------|----------|
| Clerk | 10K MAUs | $0.02/MAU | $99/month |
| Auth0 | 7.5K MAUs | $240/month (3K MAUs) | $1,500/month |
| Supabase Auth | 50K MAUs | Included in Pro ($25) | Included |
| Keycloak | Unlimited | Free (self-host) | Free |
| Firebase Auth | 50K MAUs | Free (phone auth costs) | Not available |

### Cost at Scale
```
10,000 MAUs:
  Clerk: Free
  Auth0: $240/month
  Supabase: $25/month (included in Pro)
  Firebase: Free

100,000 MAUs:
  Clerk: $1,800/month (90K × $0.02)
  Auth0: $1,500+/month (Enterprise tier required)
  Supabase: $25/month (still included!)
  Firebase: Free (but limited features)

1,000,000 MAUs:
  Clerk: $19,800/month
  Auth0: Custom pricing ($$$$)
  Supabase: $25/month (yes, really)
  Self-hosted Keycloak: $50-200/month (infrastructure only)
```

**Rule:** Supabase Auth is cheapest at scale if you use Supabase. Self-hosted Keycloak for maximum control. Clerk for best DX at moderate scale.

---

## Search Service Costs

### Pricing (250K Records, 1M Searches/Month)
| Service | Monthly Cost | Self-Hostable |
|---------|-------------|---------------|
| Algolia | $500+ | No |
| Meilisearch Cloud | $59 | Yes (free) |
| Typesense Cloud | $60 | Yes (free) |
| Elasticsearch (AWS) | $200+ | Yes |
| Self-hosted Meilisearch | $15-30 (server) | Yes |

**Rule:** Start with Meilisearch (free self-hosted or $59 cloud). Only use Algolia if you need their specific features (AI recommendations, crawling).

---

## Email Service Costs

### Pricing (100K Emails/Month)
| Service | Cost | Notes |
|---------|------|-------|
| AWS SES | $10 | Cheapest, requires setup |
| Resend | $20 | Great DX, React Email |
| Postmark | $50 | Best deliverability |
| SendGrid | $20-50 | Established, complex pricing |

**Rule:** AWS SES for cost-sensitive. Resend for developer experience. Postmark for transactional email deliverability.
