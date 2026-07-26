# Level 3: Connectors Setup — HOL (The Integrator)

Connect Claude to your actual tools so you stop copy-pasting between apps.

---

## Priority Connectors for HOL

### 1. Gmail
**Why:** Draft and send client outreach, monthly reports, and follow-ups without leaving Claude.

**HOL uses:**
- Draft first outreach to prospects
- Send monthly performance reports
- Follow up on proposals
- Respond to client questions

**How to activate:** In Claude → Settings → Integrations → Connect Gmail

**What to tell Claude after connecting:**
> "I've connected Gmail. When I ask you to send or draft an email, use Gmail directly. My sent name is Hansel Ortega-Lopez / HOL."

---

### 2. Google Drive
**Why:** Store and pull client documents, case study assets, and templates without uploading files manually.

**HOL uses:**
- Store before/after screenshots for Ohana case study
- Pull client-provided photos for GBP setup
- Save generated client reports
- Store signed agreements or proposals

**How to activate:** In Claude → Settings → Integrations → Connect Google Drive

**Folder structure to create in Drive:**
```
HOL/
├── Clients/
│   ├── Ohana (Case Study)/
│   │   ├── Screenshots/
│   │   ├── Reports/
│   │   └── Metrics-log.sheet
│   └── [Client Name]/
│       ├── Screenshots/
│       ├── Reports/
│       └── Onboarding-notes.doc
├── Templates/
└── Proposals/
```

---

### 3. Google Calendar
**Why:** Schedule client check-ins, post reminders, and 30/60-day case study milestones without switching apps.

**HOL uses:**
- 30-day and 60-day Ohana metric check-ins
- Monthly client report reminders (last week of each month)
- Prospect follow-up reminders (7-day and 14-day)
- Post scheduling reminders for clients without auto-scheduling

**How to activate:** In Claude → Settings → Integrations → Connect Google Calendar

**Recurring events to create now:**
- "HOL: Monthly client reports due" — last Monday of each month
- "HOL: Ohana 30-day metric snapshot" — one-time, 30 days from system launch
- "HOL: Ohana 60-day metric snapshot" — one-time, 60 days from system launch
- "HOL: Weekly prospect outreach block" — every Monday, 1 hour

---

### 4. Notion
**Why:** Track the full client pipeline, content calendar, and business metrics in one place.

**HOL uses:**
- Prospect pipeline (lead → contacted → proposal → client → churned)
- Active client tracker (status, next action, metrics)
- Content calendar for post scheduling
- Lessons learned log

**How to activate:** In Claude → Settings → Integrations → Connect Notion

**Notion pages to create:**
- HOL Pipeline (database: Name, Status, Next Action, Notes, Date Added)
- HOL Clients (database: Name, Monthly $, Start Date, GBP status, Review count, Last report sent)
- HOL Content Calendar (database: Client, Post type, Draft, Status, Scheduled date)

---

## How to Use Connectors in Practice

Once connected, you stop telling Claude what's in your inbox or calendar. Instead:

**Instead of:** "I need to follow up with the landscaper I messaged last week — here's what I said..."
**You say:** "Check my Gmail for my last message to [landscaper name] and draft a 7-day follow-up."

**Instead of:** "Write a monthly report for my client — here are their numbers..."
**You say:** "Pull this month's metrics from my HOL Clients Notion database for [client name] and write their report."

That's the shift from Level 2 to Level 3. Claude reads your actual data instead of you relaying it.
