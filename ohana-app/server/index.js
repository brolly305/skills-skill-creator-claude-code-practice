import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import db from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(join(__dirname, '..', 'public')));

// ---- helpers ----------------------------------------------------------------

const parseItems = (row) => {
  if (row && typeof row.line_items === 'string') {
    try { row.line_items = JSON.parse(row.line_items); } catch { row.line_items = []; }
  }
  return row;
};

const sumItems = (items = []) =>
  items.reduce((acc, it) => acc + (Number(it.qty) || 0) * (Number(it.price) || 0), 0);

const wrap = (handler) => (req, res) => {
  try {
    handler(req, res);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// ---- clients ----------------------------------------------------------------

app.get('/api/clients', wrap((req, res) => {
  const rows = db.prepare(`
    SELECT c.*,
      (SELECT COUNT(*) FROM jobs j WHERE j.client_id = c.id) AS job_count
    FROM clients c ORDER BY c.name COLLATE NOCASE
  `).all();
  res.json(rows);
}));

app.get('/api/clients/:id', wrap((req, res) => {
  const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(req.params.id);
  if (!client) return res.status(404).json({ error: 'Client not found' });
  client.jobs = db.prepare('SELECT * FROM jobs WHERE client_id = ? ORDER BY created_at DESC').all(client.id).map(parseItems);
  client.quotes = db.prepare('SELECT * FROM quotes WHERE client_id = ? ORDER BY created_at DESC').all(client.id).map(parseItems);
  client.invoices = db.prepare('SELECT * FROM invoices WHERE client_id = ? ORDER BY created_at DESC').all(client.id).map(parseItems);
  res.json(client);
}));

app.post('/api/clients', wrap((req, res) => {
  const { name, company, email, phone, address, notes } = req.body;
  if (!name) throw new Error('Client name is required');
  const info = db.prepare(`
    INSERT INTO clients (name, company, email, phone, address, notes)
    VALUES (@name, @company, @email, @phone, @address, @notes)
  `).run({ name, company: company || null, email: email || null, phone: phone || null, address: address || null, notes: notes || null });
  res.status(201).json(db.prepare('SELECT * FROM clients WHERE id = ?').get(info.lastInsertRowid));
}));

app.put('/api/clients/:id', wrap((req, res) => {
  const { name, company, email, phone, address, notes } = req.body;
  db.prepare(`
    UPDATE clients SET name=@name, company=@company, email=@email,
      phone=@phone, address=@address, notes=@notes WHERE id=@id
  `).run({ id: req.params.id, name, company: company || null, email: email || null, phone: phone || null, address: address || null, notes: notes || null });
  res.json(db.prepare('SELECT * FROM clients WHERE id = ?').get(req.params.id));
}));

app.delete('/api/clients/:id', wrap((req, res) => {
  db.prepare('DELETE FROM clients WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
}));

// ---- jobs -------------------------------------------------------------------

app.get('/api/jobs', wrap((req, res) => {
  const rows = db.prepare(`
    SELECT j.*, c.name AS client_name
    FROM jobs j JOIN clients c ON c.id = j.client_id
    ORDER BY (j.scheduled_date IS NULL), j.scheduled_date, j.scheduled_time
  `).all().map(parseItems);
  res.json(rows);
}));

app.post('/api/jobs', wrap((req, res) => {
  const b = req.body;
  if (!b.client_id) throw new Error('A client is required');
  if (!b.title) throw new Error('A job title is required');
  const items = b.line_items || [];
  const info = db.prepare(`
    INSERT INTO jobs (client_id, title, description, status, scheduled_date, scheduled_time, duration_min, crew, address, line_items, total)
    VALUES (@client_id, @title, @description, @status, @scheduled_date, @scheduled_time, @duration_min, @crew, @address, @line_items, @total)
  `).run({
    client_id: b.client_id, title: b.title, description: b.description || null,
    status: b.status || 'unscheduled', scheduled_date: b.scheduled_date || null,
    scheduled_time: b.scheduled_time || null, duration_min: b.duration_min || 120,
    crew: b.crew || null, address: b.address || null,
    line_items: JSON.stringify(items), total: sumItems(items),
  });
  res.status(201).json(parseItems(db.prepare('SELECT * FROM jobs WHERE id = ?').get(info.lastInsertRowid)));
}));

app.put('/api/jobs/:id', wrap((req, res) => {
  const b = req.body;
  const items = b.line_items || [];
  db.prepare(`
    UPDATE jobs SET title=@title, description=@description, status=@status,
      scheduled_date=@scheduled_date, scheduled_time=@scheduled_time, duration_min=@duration_min,
      crew=@crew, address=@address, line_items=@line_items, total=@total WHERE id=@id
  `).run({
    id: req.params.id, title: b.title, description: b.description || null,
    status: b.status || 'unscheduled', scheduled_date: b.scheduled_date || null,
    scheduled_time: b.scheduled_time || null, duration_min: b.duration_min || 120,
    crew: b.crew || null, address: b.address || null,
    line_items: JSON.stringify(items), total: sumItems(items),
  });
  res.json(parseItems(db.prepare('SELECT * FROM jobs WHERE id = ?').get(req.params.id)));
}));

app.delete('/api/jobs/:id', wrap((req, res) => {
  db.prepare('DELETE FROM jobs WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
}));

// Convert a job into an invoice
app.post('/api/jobs/:id/invoice', wrap((req, res) => {
  const job = parseItems(db.prepare('SELECT * FROM jobs WHERE id = ?').get(req.params.id));
  if (!job) return res.status(404).json({ error: 'Job not found' });
  const subtotal = sumItems(job.line_items);
  const info = db.prepare(`
    INSERT INTO invoices (client_id, job_id, title, status, line_items, subtotal, tax_rate, total, due_date)
    VALUES (@client_id, @job_id, @title, 'draft', @line_items, @subtotal, 0, @total, date('now','+14 days'))
  `).run({
    client_id: job.client_id, job_id: job.id, title: job.title,
    line_items: JSON.stringify(job.line_items), subtotal, total: subtotal,
  });
  res.status(201).json(parseItems(db.prepare('SELECT * FROM invoices WHERE id = ?').get(info.lastInsertRowid)));
}));

// ---- quotes -----------------------------------------------------------------

const recalc = (items, taxRate) => {
  const subtotal = sumItems(items);
  const total = subtotal * (1 + (Number(taxRate) || 0) / 100);
  return { subtotal, total };
};

app.get('/api/quotes', wrap((req, res) => {
  const rows = db.prepare(`
    SELECT q.*, c.name AS client_name FROM quotes q
    JOIN clients c ON c.id = q.client_id ORDER BY q.created_at DESC
  `).all().map(parseItems);
  res.json(rows);
}));

app.post('/api/quotes', wrap((req, res) => {
  const b = req.body;
  if (!b.client_id) throw new Error('A client is required');
  if (!b.title) throw new Error('A quote title is required');
  const items = b.line_items || [];
  const { subtotal, total } = recalc(items, b.tax_rate);
  const info = db.prepare(`
    INSERT INTO quotes (client_id, title, status, line_items, subtotal, tax_rate, total, valid_until, notes)
    VALUES (@client_id, @title, @status, @line_items, @subtotal, @tax_rate, @total, @valid_until, @notes)
  `).run({
    client_id: b.client_id, title: b.title, status: b.status || 'draft',
    line_items: JSON.stringify(items), subtotal, tax_rate: b.tax_rate || 0, total,
    valid_until: b.valid_until || null, notes: b.notes || null,
  });
  res.status(201).json(parseItems(db.prepare('SELECT * FROM quotes WHERE id = ?').get(info.lastInsertRowid)));
}));

app.put('/api/quotes/:id', wrap((req, res) => {
  const b = req.body;
  const items = b.line_items || [];
  const { subtotal, total } = recalc(items, b.tax_rate);
  db.prepare(`
    UPDATE quotes SET title=@title, status=@status, line_items=@line_items,
      subtotal=@subtotal, tax_rate=@tax_rate, total=@total, valid_until=@valid_until, notes=@notes WHERE id=@id
  `).run({
    id: req.params.id, title: b.title, status: b.status || 'draft',
    line_items: JSON.stringify(items), subtotal, tax_rate: b.tax_rate || 0, total,
    valid_until: b.valid_until || null, notes: b.notes || null,
  });
  res.json(parseItems(db.prepare('SELECT * FROM quotes WHERE id = ?').get(req.params.id)));
}));

app.delete('/api/quotes/:id', wrap((req, res) => {
  db.prepare('DELETE FROM quotes WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
}));

// Convert an approved quote into a scheduled job
app.post('/api/quotes/:id/job', wrap((req, res) => {
  const quote = parseItems(db.prepare('SELECT * FROM quotes WHERE id = ?').get(req.params.id));
  if (!quote) return res.status(404).json({ error: 'Quote not found' });
  const info = db.prepare(`
    INSERT INTO jobs (client_id, title, status, line_items, total)
    VALUES (@client_id, @title, 'unscheduled', @line_items, @total)
  `).run({
    client_id: quote.client_id, title: quote.title,
    line_items: JSON.stringify(quote.line_items), total: sumItems(quote.line_items),
  });
  db.prepare("UPDATE quotes SET status='approved' WHERE id = ?").run(quote.id);
  res.status(201).json(parseItems(db.prepare('SELECT * FROM jobs WHERE id = ?').get(info.lastInsertRowid)));
}));

// ---- invoices ---------------------------------------------------------------

app.get('/api/invoices', wrap((req, res) => {
  const rows = db.prepare(`
    SELECT i.*, c.name AS client_name FROM invoices i
    JOIN clients c ON c.id = i.client_id ORDER BY i.created_at DESC
  `).all().map(parseItems);
  res.json(rows);
}));

app.post('/api/invoices', wrap((req, res) => {
  const b = req.body;
  if (!b.client_id) throw new Error('A client is required');
  if (!b.title) throw new Error('An invoice title is required');
  const items = b.line_items || [];
  const { subtotal, total } = recalc(items, b.tax_rate);
  const info = db.prepare(`
    INSERT INTO invoices (client_id, job_id, title, status, line_items, subtotal, tax_rate, total, amount_paid, due_date, notes)
    VALUES (@client_id, @job_id, @title, @status, @line_items, @subtotal, @tax_rate, @total, @amount_paid, @due_date, @notes)
  `).run({
    client_id: b.client_id, job_id: b.job_id || null, title: b.title, status: b.status || 'draft',
    line_items: JSON.stringify(items), subtotal, tax_rate: b.tax_rate || 0, total,
    amount_paid: b.amount_paid || 0, due_date: b.due_date || null, notes: b.notes || null,
  });
  res.status(201).json(parseItems(db.prepare('SELECT * FROM invoices WHERE id = ?').get(info.lastInsertRowid)));
}));

app.put('/api/invoices/:id', wrap((req, res) => {
  const b = req.body;
  const items = b.line_items || [];
  const { subtotal, total } = recalc(items, b.tax_rate);
  db.prepare(`
    UPDATE invoices SET title=@title, status=@status, line_items=@line_items,
      subtotal=@subtotal, tax_rate=@tax_rate, total=@total, amount_paid=@amount_paid,
      due_date=@due_date, notes=@notes WHERE id=@id
  `).run({
    id: req.params.id, title: b.title, status: b.status || 'draft',
    line_items: JSON.stringify(items), subtotal, tax_rate: b.tax_rate || 0, total,
    amount_paid: b.amount_paid || 0, due_date: b.due_date || null, notes: b.notes || null,
  });
  res.json(parseItems(db.prepare('SELECT * FROM invoices WHERE id = ?').get(req.params.id)));
}));

app.delete('/api/invoices/:id', wrap((req, res) => {
  db.prepare('DELETE FROM invoices WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
}));

app.post('/api/invoices/:id/pay', wrap((req, res) => {
  const inv = db.prepare('SELECT * FROM invoices WHERE id = ?').get(req.params.id);
  if (!inv) return res.status(404).json({ error: 'Invoice not found' });
  db.prepare("UPDATE invoices SET amount_paid = total, status = 'paid' WHERE id = ?").run(inv.id);
  res.json(parseItems(db.prepare('SELECT * FROM invoices WHERE id = ?').get(inv.id)));
}));

// ---- dashboard --------------------------------------------------------------

app.get('/api/dashboard', wrap((req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  res.json({
    clients: db.prepare('SELECT COUNT(*) n FROM clients').get().n,
    jobsToday: db.prepare("SELECT COUNT(*) n FROM jobs WHERE scheduled_date = ?").get(today).n,
    jobsUpcoming: db.prepare("SELECT COUNT(*) n FROM jobs WHERE scheduled_date >= ? AND status != 'completed'").get(today).n,
    openQuotes: db.prepare("SELECT COUNT(*) n FROM quotes WHERE status IN ('draft','sent')").get().n,
    quotesValue: db.prepare("SELECT COALESCE(SUM(total),0) v FROM quotes WHERE status IN ('draft','sent')").get().v,
    unpaid: db.prepare("SELECT COALESCE(SUM(total-amount_paid),0) v FROM invoices WHERE status != 'paid'").get().v,
    paidThisAll: db.prepare("SELECT COALESCE(SUM(amount_paid),0) v FROM invoices").get().v,
    todaysJobs: db.prepare(`
      SELECT j.*, c.name AS client_name FROM jobs j JOIN clients c ON c.id = j.client_id
      WHERE j.scheduled_date = ? ORDER BY j.scheduled_time
    `).all(today).map(parseItems),
  });
}));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Ohana running at http://localhost:${PORT}`);
});
