# Ohana — Junk Removal Manager

A standalone Jobber-style field-service management app built for junk removal crews.
Manages clients, jobs, quotes, and invoices with a complete Quote → Job → Invoice workflow.

## Guardrails (binding — read before making decisions)

This project operates under the Orlop Group Holdings governance layer in
`docs/governance/`. Read those documents before product, pricing, or
business-facing decisions. The rules that bind every AI session working here:

1. **Never fabricate evidence** (Constitution, Art. I). No invented testimonials,
   case studies, metrics, or client results — anywhere, including demo content.
   Seed/demo data must be clearly labeled as demo, never presented as real outcomes.
2. **Separate observations from assumptions** (Art. II). When an assumption is
   load-bearing in a recommendation, name it explicitly: "Assuming X; if X is
   false, the recommendation changes as follows."
3. **Calibrate confidence** (Art. III). Significant recommendations carry a
   confidence level (high/medium/low/unknown) and an evidence tier (1–5, per the
   Epistemic Charter): direct evidence → analogous → expert consensus → inference
   → assumption.
4. **Prefer reversible changes** (Art. V). Under uncertainty, ship the smallest
   reversible version. No irreversible actions — deleting data, publishing
   externally, spending money, sending customer communications — without explicit
   human approval.
5. **Record significant decisions** (Art. IV). Use the template in
   `docs/governance/07_Conformance_Corpus.md`: decision, evidence, load-bearing
   assumptions, alternatives rejected, revision trigger.
6. **Customer dignity** (Art. VII). Ohana serves people in transition — grief,
   estate cleanouts, foreclosure, downsizing. All UI copy, notifications, and
   customer-facing text must be respectful and pressure-free.
7. **Entity separation** (Art. VI). Ohana, HOL Creative Solutions, and The Hearth
   Project are distinct entities. Don't blend branding, funds, or claims between
   them in anything built here.
8. **AI honesty** (Art. X). Any customer-facing AI feature added to this app must
   disclose it is an AI if asked. It never claims to be human.
9. **Amendments are human-only.** No AI session may modify the documents in
   `docs/governance/` — flag proposed changes to the operator instead.

## Stack

- **Backend:** Node.js + Express, SQLite via `better-sqlite3`
- **Frontend:** Zero-build vanilla JS SPA (no bundler, no framework)
- **DB file:** `ohana.sqlite` in the project root (gitignored)

## Running locally

```bash
npm install
npm run seed     # optional: loads sample junk-removal data
npm start        # http://localhost:3000
```

Use `PORT=8080 npm start` to change the port.
Use `OHANA_DB=/path/to/file.sqlite` to change the DB location.

## Project structure

```
ohana-app/
  server/
    index.js      # Express app + all REST API routes
    db.js         # SQLite connection + schema creation (runs on startup)
    seed.js       # Sample data loader (4 clients, 5 jobs, 2 quotes, 2 invoices)
  public/
    index.html    # SPA shell
    styles.css    # All styles (single file, no framework)
    app.js        # All frontend logic — routing, views, modals, API calls
  railway.toml    # Railway deployment config
  package.json
```

## API routes

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/dashboard` | Stats + today's jobs |
| GET/POST | `/api/clients` | List / create |
| GET/PUT/DELETE | `/api/clients/:id` | Detail (includes jobs/quotes/invoices) / update / delete |
| GET/POST | `/api/jobs` | List / create |
| PUT/DELETE | `/api/jobs/:id` | Update / delete |
| POST | `/api/jobs/:id/invoice` | Generate invoice from job |
| GET/POST | `/api/quotes` | List / create |
| PUT/DELETE | `/api/quotes/:id` | Update / delete |
| POST | `/api/quotes/:id/job` | Convert approved quote to job |
| GET/POST | `/api/invoices` | List / create |
| PUT/DELETE | `/api/invoices/:id` | Update / delete |
| POST | `/api/invoices/:id/pay` | Mark invoice paid in full |

## Deploying to Railway

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub repo
3. Set **Root Directory** to `ohana-app`, and under Settings → Source make sure
   the deploy **branch** is the one containing `ohana-app/`
4. Add a **Volume** mounted at `/data`
5. Set env vars: `OHANA_DB=/data/ohana.sqlite`, and optionally `SEED_ON_START=1`
   to load demo data on first boot (seeds only an empty database — never wipes)
6. Generate a public domain under Settings → Networking

## Key design decisions

- **SQLite over Postgres** — simple, zero-config, single file. Fine for a small crew.
  Swap to Postgres via `OHANA_DB` + updating `db.js` if the team scales.
- **No build step** — frontend is plain ES modules served as static files.
  Makes the codebase easy to edit without toolchain knowledge.
- **Line items as JSON** — stored as a JSON column in SQLite. Avoids a separate
  line_items table for this scale; easy to query in JS.
- **SPA routing via hash** — `#/clients/3` etc. The Express server returns
  `index.html` for all non-API routes; the frontend reads `location.hash`.

## What's not built yet (good next steps)

- Online payment links (Stripe)
- Email/SMS delivery of quotes and invoices
- Photo attachments on jobs
- Customer-facing portal (read-only quote/invoice view)
- Multi-user auth
