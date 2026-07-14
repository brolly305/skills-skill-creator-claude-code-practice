# FinOps Practices

## Cost Allocation Tags (Foundation)
```bash
# Tag ALL resources — untagged = unaccountable
aws ec2 create-tags --resources i-1234567890 --tags \
  Key=Environment,Value=production \
  Key=Team,Value=backend \
  Key=CostCenter,Value=engineering \
  Key=Service,Value=api-server
```

**Required tags:**
| Tag | Purpose | Example |
|-----|---------|---------|
| Environment | Filter prod vs dev costs | production, staging, dev |
| Team | Accountability | backend, frontend, data |
| Service | Granular attribution | api-server, worker, cron |
| CostCenter | Finance allocation | engineering, marketing |

## Budget Alerts
```bash
# AWS Budget with alert at 80% and 100%
aws budgets create-budget --account-id 123456789 --budget '{
  "BudgetName": "Monthly-Total",
  "BudgetLimit": { "Amount": "2000", "Unit": "USD" },
  "TimeUnit": "MONTHLY",
  "BudgetType": "COST"
}' --notifications-with-subscribers '[
  {
    "Notification": {
      "NotificationType": "ACTUAL",
      "ComparisonOperator": "GREATER_THAN",
      "Threshold": 80
    },
    "Subscribers": [{ "SubscriptionType": "EMAIL", "Address": "team@company.com" }]
  }
]'
```

## Unit Economics Tracking
```typescript
// Track cost per business metric
const metrics = {
  totalMonthlyCost: 2033,          // From AWS Cost Explorer
  monthlyActiveUsers: 50000,
  monthlyOrders: 100000,
  monthlyApiRequests: 10_000_000,
};

const unitEconomics = {
  costPerUser: metrics.totalMonthlyCost / metrics.monthlyActiveUsers,        // $0.041
  costPerOrder: metrics.totalMonthlyCost / metrics.monthlyOrders,            // $0.020
  costPerRequest: metrics.totalMonthlyCost / metrics.monthlyApiRequests,     // $0.0002
  costPerThousandRequests: (metrics.totalMonthlyCost / metrics.monthlyApiRequests) * 1000, // $0.20
};

// Alert if unit cost increases >20%
if (unitEconomics.costPerUser > previousMonth.costPerUser * 1.2) {
  alert('Cost per user increased >20% — investigate');
}
```

## Monthly Cost Review Checklist
- [ ] Review Cost Explorer for top 5 cost increases
- [ ] Check for untagged resources
- [ ] Identify idle/unused resources (0% CPU, no traffic)
- [ ] Review reserved capacity utilization (unused RIs = waste)
- [ ] Check for cost anomalies (unexpected spikes)
- [ ] Compare unit economics to previous month
- [ ] Review spot instance interruption rate (if using spot)
- [ ] Check data transfer costs by service

---

## Managed vs Self-Hosted Decision

### When Managed is Cheaper
- Team < 5 engineers (engineering time is expensive)
- Usage is low-moderate (managed pricing beats server costs)
- Need compliance/certifications (managed handles this)
- Ops expertise is limited

### When Self-Hosted is Cheaper
- Scale exceeds managed plan limits (1M+ MAUs for auth, 1M+ searches)
- You have ops/DevOps capability
- Data sovereignty requirements
- Predictable, stable workload

### Cost Crossover Points (Approximate)
```
Auth: Self-host at ~200K MAUs (Keycloak replaces $2K+/month Clerk/Auth0)
Search: Self-host at ~500K records (Meilisearch replaces $500+/month Algolia)
Database: Self-host at ~$500/month managed bill (but factor in ops time)
Redis: Self-host at ~$100/month managed bill
Email: Almost never self-host (SES at $0.10/1K is hard to beat)
```

---

## Cost Optimization Priority Matrix

| Action | Effort | Monthly Savings | Do First? |
|--------|--------|----------------|-----------|
| S3 Intelligent-Tiering | 5 min | $30-200 | Yes |
| Log retention policies | 10 min | $10-50 | Yes |
| Fix N+1 queries | 1-2 hours | $50-150 | Yes |
| WebP/AVIF images | 2-4 hours | $50-200 | Yes |
| VPC Endpoints | 1 hour | $50-300 | Yes |
| Lambda memory tuning | 1-2 hours | $20-100 | Yes |
| Bundle tree-shaking | 2-4 hours | $50-200 | Yes |
| Redis caching layer | 1-2 days | $50-300 | If read-heavy |
| Container right-sizing | 2-4 hours | $30-200 | If K8s |
| Reserved/Savings Plans | 1 hour | $200-1000 | If stable workload |
| Self-host auth/search | 1-2 weeks | $100-500 | At scale only |
| Trace sampling | 1 hour | $50-500 | If using Datadog/NR |
