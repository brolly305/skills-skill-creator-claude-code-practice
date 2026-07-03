# Ohana 🌺 — Junk Removal Manager

A standalone, self-hosted field-service management app — a focused Jobber-style
clone built for junk removal crews. Manage clients, schedule jobs, send quotes,
and bill invoices, all from one place. No accounts, no cloud, no subscription —
it runs on your machine with a local SQLite database.

## Features

- **Dashboard** — today's jobs, upcoming work, open quotes, and outstanding balances at a glance.
- **Schedule** — a 7-day board of scheduled jobs by crew, plus an unscheduled backlog.
- **Clients** — a searchable customer book with per-client job/quote/invoice history.
- **Jobs** — work orders with crew, time, duration, service address, and itemized pricing.
- **Quotes** — itemized estimates with tax; convert an approved quote straight into a job.
- **Invoices** — itemized billing with tax, due dates, balance tracking, and "mark paid"; generate one from a completed job in a click.

The whole workflow is wired together: **Quote → Job → Invoice**.

## Tech

- **Backend:** Node.js + Express, SQLite via `better-sqlite3` (a single `ohana.sqlite` file).
- **Frontend:** zero-build vanilla JS single-page app served as static files.

No build step, no framework toolchain — clone, install, run.

## Getting started

```bash
cd ohana-app
npm install
npm run seed     # optional: load sample junk-removal data
npm start
```

Then open **http://localhost:3000**.

Set a different port with `PORT=8080 npm start`. The database file location can be
overridden with `OHANA_DB=/path/to/file.sqlite`.

## API

All endpoints are under `/api`:

| Method | Path | Purpose |
| --- | --- | --- |
| GET/POST | `/clients` | List / create clients |
| GET/PUT/DELETE | `/clients/:id` | Read (with history) / update / delete |
| GET/POST | `/jobs` | List / create jobs |
| PUT/DELETE | `/jobs/:id` | Update / delete |
| POST | `/jobs/:id/invoice` | Create an invoice from a job |
| GET/POST | `/quotes` | List / create quotes |
| PUT/DELETE | `/quotes/:id` | Update / delete |
| POST | `/quotes/:id/job` | Convert a quote into a job |
| GET/POST | `/invoices` | List / create invoices |
| PUT/DELETE | `/invoices/:id` | Update / delete |
| POST | `/invoices/:id/pay` | Mark an invoice paid in full |
| GET | `/dashboard` | Aggregate stats + today's jobs |

## Notes

This is an MVP intended for testing with real junk-removal crews. It does not yet
include online payments, customer-facing portals, SMS/email notifications, photos,
or multi-user auth — those are natural next steps if the pilot goes well.
