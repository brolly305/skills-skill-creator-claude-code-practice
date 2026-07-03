import db from './db.js';

// DEMO DATA — clearly fictional, for testing only (Constitution Art. I: never
// present demo content as real client results).
//
// Pricing follows the OPS-2026-001 structure (docs/governance/07_Conformance_Corpus.md):
//   - Travel-zone minimum service charge: $199 within 50 mi, $299 for 50-100 mi
//   - Load-based volume pricing: $89 minimum to $875+ full truck
//   - Quotes are ranges, confirmed at walkthrough
// Only the $89 minimum, $875 full-truck, and zone minimums come from the rate
// card; intermediate tier prices below are demo placeholders pending the real
// rate card. Indiana does not tax junk-removal services, so tax_rate is 0.

// Wipe existing rows so seeding is idempotent.
db.exec('DELETE FROM invoices; DELETE FROM quotes; DELETE FROM jobs; DELETE FROM clients;');

const today = new Date();
const d = (offset) => {
  const x = new Date(today);
  x.setDate(x.getDate() + offset);
  return x.toISOString().slice(0, 10);
};

const insClient = db.prepare(`
  INSERT INTO clients (name, company, email, phone, address, notes)
  VALUES (@name, @company, @email, @phone, @address, @notes)
`);

const clients = [
  { name: 'Linda Hartman', company: null, email: 'linda.h@example.com', phone: '(812) 555-0142', address: '2418 Franklin St, Columbus, IN 47201', notes: 'Estate cleanout for late father’s home. In transition — handle with care and no pressure.' },
  { name: 'Dave Thompson', company: 'Thompson Rentals LLC', email: 'dave@example-rentals.com', phone: '(812) 555-0188', address: '880 Washington St, Columbus, IN 47201', notes: 'Manages 6 rental units. Recurring tenant move-out cleanouts.' },
  { name: 'Rosa Delgado', company: null, email: 'rosa.d@example.com', phone: '(317) 555-0199', address: '5127 E Thompson Rd, Indianapolis, IN 46237', notes: 'Downsizing before assisted-living move. Family will flag donation items — get authorization before redirecting anything.' },
  { name: 'Carl Jensen', company: 'Jensen Build Co', email: 'carl@example-build.co', phone: '(812) 555-0123', address: '730 Industrial Dr, Seymour, IN 47274', notes: 'Construction debris, ongoing remodel projects. 50-100 mi zone.' },
];
const clientIds = clients.map((c) => insClient.run(c).lastInsertRowid);

const insJob = db.prepare(`
  INSERT INTO jobs (client_id, title, description, status, scheduled_date, scheduled_time, duration_min, crew, address, line_items, total)
  VALUES (@client_id, @title, @description, @status, @scheduled_date, @scheduled_time, @duration_min, @crew, @address, @line_items, @total)
`);

const li = (items) => JSON.stringify(items);
const sum = (items) => items.reduce((a, i) => a + i.qty * i.price, 0);

const jobs = [
  {
    client_id: clientIds[0], title: 'Estate cleanout — full house', description: 'Three-bedroom home. Sort donate vs. haul with family present. Scope confirmed at walkthrough.',
    status: 'scheduled', scheduled_date: d(0), scheduled_time: '09:00', duration_min: 300, crew: 'Truck 1 — Sam & Marcus',
    address: '2418 Franklin St, Columbus, IN 47201',
    items: [{ desc: 'Full truck load', qty: 2, price: 875 }, { desc: 'Donation drop-off run', qty: 1, price: 75 }],
  },
  {
    client_id: clientIds[1], title: 'Tenant move-out cleanout — Unit 3B', description: 'Appliances and household junk.',
    status: 'scheduled', scheduled_date: d(0), scheduled_time: '14:00', duration_min: 90, crew: 'Truck 2 — Jess & Bo',
    address: '880 Washington St, Columbus, IN 47201',
    items: [{ desc: '1/2 truck load', qty: 1, price: 450 }, { desc: 'Refrigerator disposal', qty: 1, price: 50 }],
  },
  {
    client_id: clientIds[2], title: 'Downsizing assist — furniture & garage', description: 'Living room set, garage shelving, boxes. Donation authorization on file.',
    status: 'scheduled', scheduled_date: d(2), scheduled_time: '10:00', duration_min: 150, crew: 'Truck 1 — Sam & Marcus',
    address: '5127 E Thompson Rd, Indianapolis, IN 46237',
    items: [{ desc: '1/2 truck load', qty: 1, price: 450 }],
  },
  {
    client_id: clientIds[3], title: 'Construction debris haul', description: 'Drywall, lumber offcuts, tile. 50-100 mi travel zone.',
    status: 'completed', scheduled_date: d(-3), scheduled_time: '10:00', duration_min: 150, crew: 'Truck 2 — Jess & Bo',
    address: '730 Industrial Dr, Seymour, IN 47274',
    items: [{ desc: 'Full truck load (heavy debris)', qty: 1, price: 875 }, { desc: 'Travel zone minimum adjustment (50-100 mi)', qty: 1, price: 100 }],
  },
  {
    client_id: clientIds[1], title: 'Single-item pickup — sofa', description: 'Curbside sofa pickup, minimum charge applies.',
    status: 'unscheduled', scheduled_date: null, scheduled_time: null, duration_min: 45, crew: null,
    address: '880 Washington St, Columbus, IN 47201',
    items: [{ desc: 'Minimum load charge', qty: 1, price: 89 }, { desc: 'Zone minimum top-up (within 50 mi, $199 floor)', qty: 1, price: 110 }],
  },
];
jobs.forEach((j) => insJob.run({ ...j, line_items: li(j.items), total: sum(j.items) }));

const insQuote = db.prepare(`
  INSERT INTO quotes (client_id, title, status, line_items, subtotal, tax_rate, total, valid_until, notes)
  VALUES (@client_id, @title, @status, @line_items, @subtotal, @tax_rate, @total, @valid_until, @notes)
`);

const quotes = [
  {
    client_id: clientIds[3], title: 'Office remodel debris removal (range estimate)', status: 'sent',
    items: [{ desc: 'Full truck load', qty: 3, price: 875 }, { desc: 'Travel zone minimum adjustment (50-100 mi)', qty: 1, price: 100 }],
    tax_rate: 0, valid_until: d(14), notes: 'Range estimate — final price confirmed at walkthrough per standard scope agreement.',
  },
  {
    client_id: clientIds[1], title: 'Unit 5A appliance haul (range estimate)', status: 'draft',
    items: [{ desc: '1/4 truck load', qty: 1, price: 250 }, { desc: 'Washer/dryer disposal', qty: 1, price: 60 }],
    tax_rate: 0, valid_until: d(21), notes: 'Final price confirmed at walkthrough.',
  },
];
quotes.forEach((q) => {
  const subtotal = sum(q.items);
  const total = subtotal * (1 + q.tax_rate / 100);
  insQuote.run({ ...q, line_items: li(q.items), subtotal, total });
});

const insInvoice = db.prepare(`
  INSERT INTO invoices (client_id, job_id, title, status, line_items, subtotal, tax_rate, total, amount_paid, due_date, notes)
  VALUES (@client_id, @job_id, @title, @status, @line_items, @subtotal, @tax_rate, @total, @amount_paid, @due_date, @notes)
`);

const debrisItems = [{ desc: 'Full truck load (heavy debris)', qty: 1, price: 875 }, { desc: 'Travel zone minimum adjustment (50-100 mi)', qty: 1, price: 100 }];
const debrisSub = sum(debrisItems);
insInvoice.run({
  client_id: clientIds[3], job_id: null, title: 'Construction debris haul',
  status: 'sent', line_items: li(debrisItems), subtotal: debrisSub, tax_rate: 0,
  total: debrisSub, amount_paid: 0, due_date: d(7), notes: 'Net 14.',
});

const moveOutItems = [{ desc: '1/2 truck load', qty: 1, price: 450 }];
const moveOutSub = sum(moveOutItems);
insInvoice.run({
  client_id: clientIds[1], job_id: null, title: 'Unit 2A move-out cleanout — May',
  status: 'paid', line_items: li(moveOutItems), subtotal: moveOutSub, tax_rate: 0,
  total: moveOutSub, amount_paid: moveOutSub, due_date: d(-10), notes: 'Paid by card.',
});

console.log('Seeded (DEMO data, Central Indiana):', clientIds.length, 'clients,', jobs.length, 'jobs,', quotes.length, 'quotes, 2 invoices.');
