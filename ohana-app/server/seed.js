import db from './db.js';

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
  { name: 'Maria Kealoha', company: null, email: 'maria.k@example.com', phone: '(808) 555-0142', address: '1240 Kapiolani Blvd, Honolulu, HI', notes: 'Garage cleanout, gated community — call on arrival.' },
  { name: 'Dave Thompson', company: 'Thompson Rentals', email: 'dave@thompsonrentals.com', phone: '(808) 555-0188', address: '88 Makai St, Kailua, HI', notes: 'Manages 6 rental units. Recurring tenant move-out cleanouts.' },
  { name: 'Aiko Tanaka', company: null, email: 'aiko.t@example.com', phone: '(808) 555-0199', address: '512 Pali Hwy, Honolulu, HI', notes: 'Estate cleanout for elderly parent. Sensitive — be respectful.' },
  { name: 'Carlos Mendez', company: 'Island Build Co', email: 'carlos@islandbuild.co', phone: '(808) 555-0123', address: '730 Industrial Rd, Aiea, HI', notes: 'Construction debris, ongoing remodel projects.' },
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
    client_id: clientIds[0], title: 'Garage cleanout', description: 'Full single-car garage, old furniture and boxes.',
    status: 'scheduled', scheduled_date: d(0), scheduled_time: '09:00', duration_min: 120, crew: 'Truck 1 — Kainoa & Sam',
    address: '1240 Kapiolani Blvd, Honolulu, HI',
    items: [{ desc: '1/2 truck load', qty: 1, price: 295 }, { desc: 'Mattress disposal fee', qty: 1, price: 40 }],
  },
  {
    client_id: clientIds[1], title: 'Tenant move-out cleanout — Unit 3B', description: 'Appliances and household junk.',
    status: 'scheduled', scheduled_date: d(0), scheduled_time: '13:00', duration_min: 90, crew: 'Truck 2 — Leilani & Bo',
    address: '88 Makai St, Kailua, HI',
    items: [{ desc: 'Full truck load', qty: 1, price: 550 }, { desc: 'Refrigerator disposal', qty: 1, price: 50 }],
  },
  {
    client_id: clientIds[2], title: 'Estate cleanout — full house', description: 'Three-bedroom home, sort donate vs haul.',
    status: 'scheduled', scheduled_date: d(2), scheduled_time: '08:00', duration_min: 300, crew: 'Truck 1 + Truck 2',
    address: '512 Pali Hwy, Honolulu, HI',
    items: [{ desc: 'Full truck load', qty: 3, price: 550 }, { desc: 'Donation drop-off run', qty: 1, price: 75 }],
  },
  {
    client_id: clientIds[3], title: 'Construction debris haul', description: 'Drywall, lumber offcuts, tile.',
    status: 'completed', scheduled_date: d(-3), scheduled_time: '10:00', duration_min: 150, crew: 'Truck 2 — Leilani & Bo',
    address: '730 Industrial Rd, Aiea, HI',
    items: [{ desc: 'Full truck load (heavy)', qty: 2, price: 650 }],
  },
  {
    client_id: clientIds[0], title: 'Yard waste pickup', description: 'Green waste and old fence panels.',
    status: 'unscheduled', scheduled_date: null, scheduled_time: null, duration_min: 60, crew: null,
    address: '1240 Kapiolani Blvd, Honolulu, HI',
    items: [{ desc: '1/4 truck load', qty: 1, price: 175 }],
  },
];
jobs.forEach((j) => insJob.run({ ...j, line_items: li(j.items), total: sum(j.items) }));

const insQuote = db.prepare(`
  INSERT INTO quotes (client_id, title, status, line_items, subtotal, tax_rate, total, valid_until, notes)
  VALUES (@client_id, @title, @status, @line_items, @subtotal, @tax_rate, @total, @valid_until, @notes)
`);

const quotes = [
  {
    client_id: clientIds[3], title: 'Office remodel debris removal', status: 'sent',
    items: [{ desc: 'Full truck load', qty: 4, price: 550 }, { desc: 'Labor — extra crew member', qty: 6, price: 45 }],
    tax_rate: 4.712, valid_until: d(14), notes: 'Multi-day job, scheduling TBD.',
  },
  {
    client_id: clientIds[1], title: 'Unit 5A appliance haul', status: 'draft',
    items: [{ desc: '1/2 truck load', qty: 1, price: 295 }, { desc: 'Washer/dryer disposal', qty: 1, price: 60 }],
    tax_rate: 4.712, valid_until: d(21), notes: '',
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

const debrisItems = [{ desc: 'Full truck load (heavy)', qty: 2, price: 650 }];
const debrisSub = sum(debrisItems);
insInvoice.run({
  client_id: clientIds[3], job_id: null, title: 'Construction debris haul',
  status: 'sent', line_items: li(debrisItems), subtotal: debrisSub, tax_rate: 4.712,
  total: debrisSub * 1.04712, amount_paid: 0, due_date: d(7), notes: 'Net 14.',
});

const garageItems = [{ desc: '1/2 truck load', qty: 1, price: 295 }];
const garageSub = sum(garageItems);
insInvoice.run({
  client_id: clientIds[0], job_id: null, title: 'Garage cleanout — March',
  status: 'paid', line_items: li(garageItems), subtotal: garageSub, tax_rate: 4.712,
  total: garageSub * 1.04712, amount_paid: garageSub * 1.04712, due_date: d(-10), notes: 'Paid by card.',
});

console.log('Seeded:', clientIds.length, 'clients,', jobs.length, 'jobs,', quotes.length, 'quotes, 2 invoices.');
