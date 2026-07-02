// Ohana — single-page junk removal manager. Zero-build vanilla JS.

// ---------------------------------------------------------------- API helpers
const api = {
  async req(method, path, body) {
    const opts = { method, headers: { 'Content-Type': 'application/json' } };
    if (body !== undefined) opts.body = JSON.stringify(body);
    const res = await fetch(`/api${path}`, opts);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Request failed (${res.status})`);
    }
    return res.status === 204 ? null : res.json();
  },
  get: (p) => api.req('GET', p),
  post: (p, b) => api.req('POST', p, b),
  put: (p, b) => api.req('PUT', p, b),
  del: (p) => api.req('DELETE', p),
};

// ---------------------------------------------------------------- formatting
const money = (n) => '$' + (Number(n) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const initials = (name) => (name || '?').split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();

const fmtDate = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
const fmtTime = (t) => {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const ap = h >= 12 ? 'PM' : 'AM';
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${String(m).padStart(2, '0')} ${ap}`;
};

const JOB_STATUS = { unscheduled: 'gray', scheduled: 'blue', in_progress: 'amber', completed: 'green', cancelled: 'red' };
const QUOTE_STATUS = { draft: 'gray', sent: 'blue', approved: 'green', rejected: 'red' };
const INVOICE_STATUS = { draft: 'gray', sent: 'blue', paid: 'green', overdue: 'red' };
const badge = (status, map) => `<span class="badge ${map[status] || 'gray'}">${esc((status || '').replace('_', ' '))}</span>`;

// ---------------------------------------------------------------- toast / modal
function toast(msg, type = '') {
  const root = document.getElementById('toast-root');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  root.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

function closeModal() {
  document.getElementById('modal-root').innerHTML = '';
}

function openModal({ title, body, footer, wide }) {
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-overlay" data-overlay>
      <div class="modal ${wide ? 'wide' : ''}">
        <div class="modal-head">
          <h2>${esc(title)}</h2>
          <button class="x-close" data-close>&times;</button>
        </div>
        <div class="modal-body">${body}</div>
        ${footer ? `<div class="modal-foot">${footer}</div>` : ''}
      </div>
    </div>`;
  root.querySelector('[data-overlay]').addEventListener('mousedown', (e) => {
    if (e.target.dataset.overlay !== undefined) closeModal();
  });
  root.querySelector('[data-close]').addEventListener('click', closeModal);
  return root.querySelector('.modal');
}

// ---------------------------------------------------------------- line items editor
// Renders an editable table of {desc, qty, price}. Used by jobs/quotes/invoices.
function lineItemsEditor(container, items, { taxRate = null, onTax } = {}) {
  let rows = items.length ? items.map((i) => ({ ...i })) : [{ desc: '', qty: 1, price: 0 }];

  const render = () => {
    const subtotal = rows.reduce((a, r) => a + (Number(r.qty) || 0) * (Number(r.price) || 0), 0);
    const tax = taxRate !== null ? subtotal * (Number(taxRate) || 0) / 100 : 0;
    container.innerHTML = `
      <div class="line-items">
        <div class="li-row li-head">
          <div>Description</div><div>Qty</div><div>Unit price</div><div class="t-right">Amount</div><div></div>
        </div>
        ${rows.map((r, i) => `
          <div class="li-row" data-i="${i}">
            <input data-f="desc" value="${esc(r.desc)}" placeholder="e.g. 1/2 truck load" />
            <input data-f="qty" type="number" min="0" step="1" value="${esc(r.qty)}" />
            <input data-f="price" type="number" min="0" step="0.01" value="${esc(r.price)}" />
            <div class="li-amt">${money((Number(r.qty) || 0) * (Number(r.price) || 0))}</div>
            <button class="li-remove" data-remove="${i}" title="Remove">&times;</button>
          </div>`).join('')}
        <button class="btn ghost sm" data-add type="button">+ Add line</button>
        <div class="li-totals">
          <div class="row"><span class="muted">Subtotal</span><span>${money(subtotal)}</span></div>
          ${taxRate !== null ? `
            <div class="row">
              <span class="muted">Tax
                <input data-tax type="number" min="0" step="0.001" value="${esc(taxRate)}" style="width:62px;padding:3px 6px;" />%
              </span>
              <span>${money(tax)}</span>
            </div>` : ''}
          <div class="row total"><span>Total</span><span>${money(subtotal + tax)}</span></div>
        </div>
      </div>`;

    container.querySelectorAll('input[data-f]').forEach((inp) => {
      inp.addEventListener('input', () => {
        const i = Number(inp.closest('[data-i]').dataset.i);
        rows[i][inp.dataset.f] = inp.dataset.f === 'desc' ? inp.value : inp.value;
        // Only re-render amount cells live to avoid losing focus: update totals lazily.
        const amt = inp.closest('[data-i]').querySelector('.li-amt');
        amt.textContent = money((Number(rows[i].qty) || 0) * (Number(rows[i].price) || 0));
        updateTotals();
      });
    });
    container.querySelectorAll('[data-remove]').forEach((b) => b.addEventListener('click', () => {
      rows.splice(Number(b.dataset.remove), 1);
      if (!rows.length) rows.push({ desc: '', qty: 1, price: 0 });
      render();
    }));
    container.querySelector('[data-add]').addEventListener('click', () => {
      rows.push({ desc: '', qty: 1, price: 0 });
      render();
    });
    const taxInput = container.querySelector('[data-tax]');
    if (taxInput) taxInput.addEventListener('input', () => {
      taxRate = Number(taxInput.value) || 0;
      if (onTax) onTax(taxRate);
      updateTotals();
    });
  };

  const updateTotals = () => {
    const subtotal = rows.reduce((a, r) => a + (Number(r.qty) || 0) * (Number(r.price) || 0), 0);
    const tax = taxRate !== null ? subtotal * (Number(taxRate) || 0) / 100 : 0;
    const totals = container.querySelector('.li-totals');
    if (!totals) return;
    const spans = totals.querySelectorAll('.row > span:last-child');
    spans[0].textContent = money(subtotal);
    if (taxRate !== null) { spans[1].textContent = money(tax); spans[2].textContent = money(subtotal + tax); }
    else spans[1].textContent = money(subtotal + tax);
  };

  render();
  return {
    getItems: () => rows.filter((r) => r.desc || Number(r.qty) || Number(r.price))
      .map((r) => ({ desc: r.desc, qty: Number(r.qty) || 0, price: Number(r.price) || 0 })),
    getTaxRate: () => taxRate,
  };
}

const lineItemsReadonly = (items = []) => `
  <table>
    <thead><tr><th>Description</th><th class="t-right">Qty</th><th class="t-right">Unit</th><th class="t-right">Amount</th></tr></thead>
    <tbody>
      ${items.length ? items.map((i) => `
        <tr><td>${esc(i.desc)}</td><td class="t-right">${i.qty}</td>
        <td class="t-right">${money(i.price)}</td><td class="t-right strong">${money(i.qty * i.price)}</td></tr>`).join('')
      : '<tr><td colspan="4" class="muted">No line items.</td></tr>'}
    </tbody>
  </table>`;

// ---------------------------------------------------------------- view shell
const view = () => document.getElementById('view');

function pageHead(title, sub, actionsHtml = '') {
  return `<div class="page-head"><div><h1>${esc(title)}</h1>${sub ? `<div class="sub">${esc(sub)}</div>` : ''}</div><div>${actionsHtml}</div></div>`;
}

function emptyState(icon, text, actionHtml = '') {
  return `<div class="card"><div class="empty-state"><div class="big">${icon}</div><div>${esc(text)}</div><div style="margin-top:14px">${actionHtml}</div></div></div>`;
}

// ---------------------------------------------------------------- DASHBOARD
async function renderDashboard() {
  view().innerHTML = pageHead('Dashboard', "Today's overview for your crews");
  const d = await api.get('/dashboard');
  view().innerHTML = pageHead('Dashboard', new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })) + `
    <div class="stat-grid">
      <div class="stat"><div class="label">Jobs Today</div><div class="value">${d.jobsToday}</div></div>
      <div class="stat"><div class="label">Upcoming Jobs</div><div class="value">${d.jobsUpcoming}</div></div>
      <div class="stat"><div class="label">Open Quotes</div><div class="value">${d.openQuotes}</div><div class="muted">${money(d.quotesValue)} potential</div></div>
      <div class="stat"><div class="label">Outstanding</div><div class="value money">${money(d.unpaid)}</div><div class="muted">unpaid invoices</div></div>
      <div class="stat"><div class="label">Collected</div><div class="value money">${money(d.paidThisAll)}</div><div class="muted">all time</div></div>
      <div class="stat"><div class="label">Total Clients</div><div class="value">${d.clients}</div></div>
    </div>
    <div class="card">
      <div class="card-head">Today's Schedule <a href="#/schedule" class="link">View week →</a></div>
      <div class="card-body" style="padding:0">
        ${d.todaysJobs.length ? `<table><tbody>${d.todaysJobs.map((j) => `
          <tr class="clickable" data-job="${j.id}">
            <td style="width:90px"><span class="badge blue">${fmtTime(j.scheduled_time) || 'TBD'}</span></td>
            <td><div class="strong">${esc(j.title)}</div><div class="muted">${esc(j.client_name)}</div></td>
            <td class="muted">${esc(j.crew || 'Unassigned')}</td>
            <td class="t-right strong">${money(j.total)}</td>
            <td style="width:120px">${badge(j.status, JOB_STATUS)}</td>
          </tr>`).join('')}</tbody></table>`
        : '<div class="empty-state" style="padding:36px"><div class="big">☀️</div>No jobs scheduled for today.</div>'}
      </div>
    </div>`;
  view().querySelectorAll('[data-job]').forEach((r) => r.addEventListener('click', () => openJobModal(Number(r.dataset.job))));
}

// ---------------------------------------------------------------- SCHEDULE
async function renderSchedule() {
  view().innerHTML = pageHead('Schedule', 'Next 7 days', `<button class="btn" data-new>+ New Job</button>`);
  view().querySelector('[data-new]').addEventListener('click', () => openJobModal());
  const jobs = await api.get('/jobs');
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const dt = new Date(today); dt.setDate(today.getDate() + i);
    return dt.toISOString().slice(0, 10);
  });
  const byDay = {};
  jobs.forEach((j) => { if (j.scheduled_date) (byDay[j.scheduled_date] ||= []).push(j); });

  const grid = document.createElement('div');
  grid.className = 'sched-grid';
  grid.innerHTML = days.map((date, idx) => {
    const dt = new Date(date + 'T00:00:00');
    const list = (byDay[date] || []).sort((a, b) => (a.scheduled_time || '').localeCompare(b.scheduled_time || ''));
    return `<div class="day-col">
      <div class="day-head ${idx === 0 ? 'today' : ''}">
        <span>${dt.toLocaleDateString('en-US', { weekday: 'short' })}</span>
        <span>${dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      </div>
      ${list.length ? list.map((j) => `
        <div class="job-chip" data-job="${j.id}">
          <div class="time">${fmtTime(j.scheduled_time) || 'TBD'}</div>
          <div class="ttl">${esc(j.title)}</div>
          <div class="who">${esc(j.client_name)} · ${esc(j.crew || 'Unassigned')}</div>
        </div>`).join('')
      : '<div class="day-empty">No jobs</div>'}
    </div>`;
  }).join('');
  view().appendChild(grid);

  const unscheduled = jobs.filter((j) => !j.scheduled_date);
  if (unscheduled.length) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.marginTop = '20px';
    card.innerHTML = `<div class="card-head">Unscheduled (${unscheduled.length})</div>
      <div class="card-body" style="padding:0"><table><tbody>${unscheduled.map((j) => `
        <tr class="clickable" data-job="${j.id}"><td><div class="strong">${esc(j.title)}</div><div class="muted">${esc(j.client_name)}</div></td>
        <td class="t-right strong">${money(j.total)}</td><td style="width:120px">${badge(j.status, JOB_STATUS)}</td></tr>`).join('')}
      </tbody></table></div>`;
    view().appendChild(card);
  }
  view().querySelectorAll('[data-job]').forEach((r) => r.addEventListener('click', () => openJobModal(Number(r.dataset.job))));
}

// ---------------------------------------------------------------- CLIENTS
async function renderClients() {
  view().innerHTML = pageHead('Clients', 'Your customer book', `<button class="btn" data-new>+ New Client</button>`);
  const clients = await api.get('/clients');
  const wrap = document.createElement('div');
  if (!clients.length) {
    wrap.innerHTML = emptyState('👥', 'No clients yet. Add your first customer to get started.', `<button class="btn" data-new2>+ New Client</button>`);
  } else {
    wrap.innerHTML = `
      <div class="toolbar"><div class="search"><input placeholder="Search clients…" data-search /></div></div>
      <div class="card"><div class="card-body" style="padding:0"><table>
        <thead><tr><th>Name</th><th>Contact</th><th>Address</th><th class="t-right">Jobs</th></tr></thead>
        <tbody>${clients.map((c) => `
          <tr class="clickable" data-client="${c.id}" data-name="${esc((c.name + ' ' + (c.company || '') + ' ' + (c.email || '')).toLowerCase())}">
            <td><div class="client-cell"><span class="avatar">${initials(c.name)}</span><div><div class="strong">${esc(c.name)}</div>${c.company ? `<div class="muted">${esc(c.company)}</div>` : ''}</div></div></td>
            <td>${c.phone ? esc(c.phone) : ''}${c.phone && c.email ? '<br>' : ''}<span class="muted">${esc(c.email || '')}</span></td>
            <td class="muted">${esc(c.address || '—')}</td>
            <td class="t-right">${c.job_count}</td>
          </tr>`).join('')}</tbody>
      </table></div></div>`;
  }
  view().appendChild(wrap);
  const newBtn = view().querySelector('[data-new]') || view().querySelector('[data-new2]');
  if (newBtn) newBtn.addEventListener('click', () => openClientModal());
  view().querySelectorAll('[data-client]').forEach((r) => r.addEventListener('click', () => { location.hash = `#/clients/${r.dataset.client}`; }));
  const search = view().querySelector('[data-search]');
  if (search) search.addEventListener('input', () => {
    const q = search.value.toLowerCase();
    view().querySelectorAll('[data-name]').forEach((r) => { r.style.display = r.dataset.name.includes(q) ? '' : 'none'; });
  });
}

async function renderClientDetail(id) {
  view().innerHTML = pageHead('Client', '');
  const c = await api.get(`/clients/${id}`);
  view().innerHTML = pageHead(c.name, c.company || '', `
    <button class="btn secondary sm" data-edit>Edit</button>
    <button class="btn danger sm" data-del>Delete</button>`) + `
    <a href="#/clients" class="link" style="display:inline-block;margin-bottom:16px">← All clients</a>
    <div class="detail-grid">
      <div>
        <div class="card"><div class="card-head">Jobs <button class="btn sm" data-newjob>+ Job</button></div>
          <div class="card-body" style="padding:0">${listMini(c.jobs, 'job', JOB_STATUS)}</div></div>
        <div class="card"><div class="card-head">Quotes <button class="btn sm" data-newquote>+ Quote</button></div>
          <div class="card-body" style="padding:0">${listMini(c.quotes, 'quote', QUOTE_STATUS)}</div></div>
        <div class="card"><div class="card-head">Invoices <button class="btn sm" data-newinvoice>+ Invoice</button></div>
          <div class="card-body" style="padding:0">${listMini(c.invoices, 'invoice', INVOICE_STATUS)}</div></div>
      </div>
      <div class="card"><div class="card-head">Details</div><div class="card-body">
        <div class="kv"><span class="k">Phone</span><span>${esc(c.phone || '—')}</span></div>
        <div class="kv"><span class="k">Email</span><span>${esc(c.email || '—')}</span></div>
        <div class="kv"><span class="k">Address</span><span>${esc(c.address || '—')}</span></div>
        <div class="kv"><span class="k">Client since</span><span>${fmtDate((c.created_at || '').slice(0,10))}</span></div>
        ${c.notes ? `<div class="section-title">Notes</div><div>${esc(c.notes)}</div>` : ''}
      </div></div>
    </div>`;

  view().querySelector('[data-edit]').addEventListener('click', () => openClientModal(c));
  view().querySelector('[data-del]').addEventListener('click', async () => {
    if (!confirm(`Delete ${c.name} and all their jobs, quotes and invoices?`)) return;
    await api.del(`/clients/${id}`); toast('Client deleted'); location.hash = '#/clients';
  });
  view().querySelector('[data-newjob]').addEventListener('click', () => openJobModal(null, c.id));
  view().querySelector('[data-newquote]').addEventListener('click', () => openQuoteModal(null, c.id));
  view().querySelector('[data-newinvoice]').addEventListener('click', () => openInvoiceModal(null, c.id));
  view().querySelectorAll('[data-job]').forEach((r) => r.addEventListener('click', () => openJobModal(Number(r.dataset.job))));
  view().querySelectorAll('[data-quote]').forEach((r) => r.addEventListener('click', () => openQuoteModal(Number(r.dataset.quote))));
  view().querySelectorAll('[data-invoice]').forEach((r) => r.addEventListener('click', () => openInvoiceModal(Number(r.dataset.invoice))));
}

const listMini = (items, kind, statusMap) => items.length ? `<table><tbody>${items.map((it) => `
  <tr class="clickable" data-${kind}="${it.id}">
    <td><div class="strong">${esc(it.title)}</div>${it.scheduled_date ? `<div class="muted">${fmtDate(it.scheduled_date)} ${fmtTime(it.scheduled_time)}</div>` : ''}</td>
    <td class="t-right strong">${money(it.total)}</td>
    <td style="width:120px">${badge(it.status, statusMap)}</td>
  </tr>`).join('')}</tbody></table>` : `<div class="empty-state" style="padding:24px">Nothing yet.</div>`;

// ---------------------------------------------------------------- JOBS list
async function renderJobs() {
  view().innerHTML = pageHead('Jobs', 'All work orders', `<button class="btn" data-new>+ New Job</button>`);
  const jobs = await api.get('/jobs');
  const wrap = document.createElement('div');
  wrap.innerHTML = jobs.length ? `<div class="card"><div class="card-body" style="padding:0"><table>
    <thead><tr><th>Job</th><th>Client</th><th>Scheduled</th><th>Crew</th><th class="t-right">Total</th><th>Status</th></tr></thead>
    <tbody>${jobs.map((j) => `
      <tr class="clickable" data-job="${j.id}">
        <td class="strong">${esc(j.title)}</td>
        <td class="muted">${esc(j.client_name)}</td>
        <td>${j.scheduled_date ? fmtDate(j.scheduled_date) + ' ' + fmtTime(j.scheduled_time) : '<span class="muted">Unscheduled</span>'}</td>
        <td class="muted">${esc(j.crew || '—')}</td>
        <td class="t-right strong">${money(j.total)}</td>
        <td>${badge(j.status, JOB_STATUS)}</td>
      </tr>`).join('')}</tbody></table></div></div>`
    : emptyState('🚛', 'No jobs yet.', `<button class="btn" data-new2>+ New Job</button>`);
  view().appendChild(wrap);
  (view().querySelector('[data-new]') || {}).onclick = () => openJobModal();
  const n2 = view().querySelector('[data-new2]'); if (n2) n2.onclick = () => openJobModal();
  view().querySelectorAll('[data-job]').forEach((r) => r.addEventListener('click', () => openJobModal(Number(r.dataset.job))));
}

// ---------------------------------------------------------------- QUOTES list
async function renderQuotes() {
  view().innerHTML = pageHead('Quotes', 'Estimates sent to clients', `<button class="btn" data-new>+ New Quote</button>`);
  const quotes = await api.get('/quotes');
  const wrap = document.createElement('div');
  wrap.innerHTML = quotes.length ? `<div class="card"><div class="card-body" style="padding:0"><table>
    <thead><tr><th>Quote</th><th>Client</th><th>Valid until</th><th class="t-right">Total</th><th>Status</th></tr></thead>
    <tbody>${quotes.map((q) => `
      <tr class="clickable" data-quote="${q.id}">
        <td class="strong">${esc(q.title)}</td><td class="muted">${esc(q.client_name)}</td>
        <td>${fmtDate(q.valid_until)}</td><td class="t-right strong">${money(q.total)}</td>
        <td>${badge(q.status, QUOTE_STATUS)}</td>
      </tr>`).join('')}</tbody></table></div></div>`
    : emptyState('📝', 'No quotes yet.', `<button class="btn" data-new2>+ New Quote</button>`);
  view().appendChild(wrap);
  (view().querySelector('[data-new]') || {}).onclick = () => openQuoteModal();
  const n2 = view().querySelector('[data-new2]'); if (n2) n2.onclick = () => openQuoteModal();
  view().querySelectorAll('[data-quote]').forEach((r) => r.addEventListener('click', () => openQuoteModal(Number(r.dataset.quote))));
}

// ---------------------------------------------------------------- INVOICES list
async function renderInvoices() {
  view().innerHTML = pageHead('Invoices', 'Billing and payments', `<button class="btn" data-new>+ New Invoice</button>`);
  const invoices = await api.get('/invoices');
  const wrap = document.createElement('div');
  wrap.innerHTML = invoices.length ? `<div class="card"><div class="card-body" style="padding:0"><table>
    <thead><tr><th>Invoice</th><th>Client</th><th>Due</th><th class="t-right">Total</th><th class="t-right">Balance</th><th>Status</th></tr></thead>
    <tbody>${invoices.map((i) => `
      <tr class="clickable" data-invoice="${i.id}">
        <td class="strong">#${i.id} · ${esc(i.title)}</td><td class="muted">${esc(i.client_name)}</td>
        <td>${fmtDate(i.due_date)}</td><td class="t-right strong">${money(i.total)}</td>
        <td class="t-right">${money(i.total - i.amount_paid)}</td>
        <td>${badge(i.status, INVOICE_STATUS)}</td>
      </tr>`).join('')}</tbody></table></div></div>`
    : emptyState('💵', 'No invoices yet.', `<button class="btn" data-new2>+ New Invoice</button>`);
  view().appendChild(wrap);
  (view().querySelector('[data-new]') || {}).onclick = () => openInvoiceModal();
  const n2 = view().querySelector('[data-new2]'); if (n2) n2.onclick = () => openInvoiceModal();
  view().querySelectorAll('[data-invoice]').forEach((r) => r.addEventListener('click', () => openInvoiceModal(Number(r.dataset.invoice))));
}

// ---------------------------------------------------------------- client select
let CLIENT_CACHE = [];
async function clientOptions(selectedId) {
  if (!CLIENT_CACHE.length) CLIENT_CACHE = await api.get('/clients');
  return CLIENT_CACHE.map((c) => `<option value="${c.id}" ${c.id == selectedId ? 'selected' : ''}>${esc(c.name)}${c.company ? ' — ' + esc(c.company) : ''}</option>`).join('');
}

// ---------------------------------------------------------------- CLIENT modal
function openClientModal(client = null) {
  const c = client || {};
  openModal({
    title: client ? 'Edit Client' : 'New Client',
    body: `<form id="client-form">
      <div class="form-grid">
        <div class="field"><label>Name *</label><input name="name" value="${esc(c.name || '')}" required /></div>
        <div class="field"><label>Company</label><input name="company" value="${esc(c.company || '')}" /></div>
        <div class="field"><label>Phone</label><input name="phone" value="${esc(c.phone || '')}" /></div>
        <div class="field"><label>Email</label><input name="email" type="email" value="${esc(c.email || '')}" /></div>
        <div class="field full"><label>Address</label><input name="address" value="${esc(c.address || '')}" /></div>
        <div class="field full"><label>Notes</label><textarea name="notes">${esc(c.notes || '')}</textarea></div>
      </div>
    </form>`,
    footer: `<button class="btn secondary" data-cancel>Cancel</button>
      <div class="right"><button class="btn" data-save>${client ? 'Save changes' : 'Create client'}</button></div>`,
  });
  document.querySelector('[data-cancel]').onclick = closeModal;
  document.querySelector('[data-save]').onclick = async () => {
    const f = document.getElementById('client-form');
    const body = Object.fromEntries(new FormData(f));
    if (!body.name) return toast('Name is required', 'error');
    try {
      if (client) await api.put(`/clients/${client.id}`, body);
      else await api.post('/clients', body);
      CLIENT_CACHE = [];
      toast(client ? 'Client updated' : 'Client created');
      closeModal(); route();
    } catch (e) { toast(e.message, 'error'); }
  };
}

// ---------------------------------------------------------------- JOB modal
async function openJobModal(jobId = null, presetClient = null) {
  let job = null;
  if (jobId) job = (await api.get('/jobs')).find((j) => j.id === jobId);
  const j = job || {};
  const opts = await clientOptions(j.client_id || presetClient);
  const m = openModal({
    title: job ? 'Edit Job' : 'New Job', wide: true,
    body: `<form id="job-form">
      <div class="form-grid">
        <div class="field full"><label>Job title *</label><input name="title" value="${esc(j.title || '')}" placeholder="e.g. Garage cleanout" required /></div>
        <div class="field"><label>Client *</label><select name="client_id" ${job ? 'disabled' : ''}>${opts}</select></div>
        <div class="field"><label>Status</label><select name="status">${Object.keys(JOB_STATUS).map((s) => `<option value="${s}" ${j.status === s ? 'selected' : ''}>${s.replace('_', ' ')}</option>`).join('')}</select></div>
        <div class="field"><label>Date</label><input name="scheduled_date" type="date" value="${esc(j.scheduled_date || '')}" /></div>
        <div class="field"><label>Time</label><input name="scheduled_time" type="time" value="${esc(j.scheduled_time || '')}" /></div>
        <div class="field"><label>Crew</label><input name="crew" value="${esc(j.crew || '')}" placeholder="e.g. Truck 1 — Kainoa & Sam" /></div>
        <div class="field"><label>Duration (min)</label><input name="duration_min" type="number" value="${esc(j.duration_min || 120)}" /></div>
        <div class="field full"><label>Service address</label><input name="address" value="${esc(j.address || '')}" /></div>
        <div class="field full"><label>Description</label><textarea name="description">${esc(j.description || '')}</textarea></div>
      </div>
      <div class="section-title">Line items</div>
      <div id="li-editor"></div>
    </form>`,
    footer: `${job ? '<button class="btn danger" data-del>Delete</button>' : '<button class="btn secondary" data-cancel>Cancel</button>'}
      <div class="right">
        ${job ? '<button class="btn secondary" data-invoice>Create Invoice</button>' : ''}
        <button class="btn" data-save>${job ? 'Save changes' : 'Create job'}</button>
      </div>`,
  });
  const editor = lineItemsEditor(m.querySelector('#li-editor'), j.line_items || []);
  (m.querySelector('[data-cancel]') || {}).onclick = closeModal;
  m.querySelector('[data-save]').onclick = async () => {
    const f = document.getElementById('job-form');
    const body = Object.fromEntries(new FormData(f));
    body.line_items = editor.getItems();
    if (job) body.client_id = job.client_id;
    if (!body.title) return toast('Job title is required', 'error');
    if (!body.client_id) return toast('Please pick a client', 'error');
    try {
      if (job) await api.put(`/jobs/${job.id}`, body);
      else await api.post('/jobs', body);
      toast(job ? 'Job updated' : 'Job created'); closeModal(); route();
    } catch (e) { toast(e.message, 'error'); }
  };
  if (job) {
    m.querySelector('[data-del]').onclick = async () => {
      if (!confirm('Delete this job?')) return;
      await api.del(`/jobs/${job.id}`); toast('Job deleted'); closeModal(); route();
    };
    m.querySelector('[data-invoice]').onclick = async () => {
      try { await api.post(`/jobs/${job.id}/invoice`); toast('Invoice created from job'); closeModal(); location.hash = '#/invoices'; }
      catch (e) { toast(e.message, 'error'); }
    };
  }
}

// ---------------------------------------------------------------- QUOTE modal
async function openQuoteModal(quoteId = null, presetClient = null) {
  let quote = null;
  if (quoteId) quote = (await api.get('/quotes')).find((q) => q.id === quoteId);
  const q = quote || {};
  const opts = await clientOptions(q.client_id || presetClient);
  const m = openModal({
    title: quote ? 'Edit Quote' : 'New Quote', wide: true,
    body: `<form id="quote-form">
      <div class="form-grid">
        <div class="field full"><label>Quote title *</label><input name="title" value="${esc(q.title || '')}" required /></div>
        <div class="field"><label>Client *</label><select name="client_id" ${quote ? 'disabled' : ''}>${opts}</select></div>
        <div class="field"><label>Status</label><select name="status">${Object.keys(QUOTE_STATUS).map((s) => `<option value="${s}" ${q.status === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
        <div class="field"><label>Valid until</label><input name="valid_until" type="date" value="${esc(q.valid_until || '')}" /></div>
        <div class="field full"><label>Notes</label><textarea name="notes">${esc(q.notes || '')}</textarea></div>
      </div>
      <div class="section-title">Line items</div>
      <div id="li-editor"></div>
    </form>`,
    footer: `${quote ? '<button class="btn danger" data-del>Delete</button>' : '<button class="btn secondary" data-cancel>Cancel</button>'}
      <div class="right">
        ${quote ? '<button class="btn secondary" data-tojob>Convert to Job</button>' : ''}
        <button class="btn" data-save>${quote ? 'Save changes' : 'Create quote'}</button>
      </div>`,
  });
  const editor = lineItemsEditor(m.querySelector('#li-editor'), q.line_items || [], { taxRate: q.tax_rate ?? 0 });
  (m.querySelector('[data-cancel]') || {}).onclick = closeModal;
  m.querySelector('[data-save]').onclick = async () => {
    const f = document.getElementById('quote-form');
    const body = Object.fromEntries(new FormData(f));
    body.line_items = editor.getItems();
    body.tax_rate = editor.getTaxRate();
    if (quote) body.client_id = quote.client_id;
    if (!body.title) return toast('Quote title is required', 'error');
    if (!body.client_id) return toast('Please pick a client', 'error');
    try {
      if (quote) await api.put(`/quotes/${quote.id}`, body);
      else await api.post('/quotes', body);
      toast(quote ? 'Quote updated' : 'Quote created'); closeModal(); route();
    } catch (e) { toast(e.message, 'error'); }
  };
  if (quote) {
    m.querySelector('[data-del]').onclick = async () => {
      if (!confirm('Delete this quote?')) return;
      await api.del(`/quotes/${quote.id}`); toast('Quote deleted'); closeModal(); route();
    };
    m.querySelector('[data-tojob]').onclick = async () => {
      try { await api.post(`/quotes/${quote.id}/job`); toast('Job created from quote'); closeModal(); location.hash = '#/jobs'; }
      catch (e) { toast(e.message, 'error'); }
    };
  }
}

// ---------------------------------------------------------------- INVOICE modal
async function openInvoiceModal(invoiceId = null, presetClient = null) {
  let invoice = null;
  if (invoiceId) invoice = (await api.get('/invoices')).find((i) => i.id === invoiceId);
  const iv = invoice || {};
  const opts = await clientOptions(iv.client_id || presetClient);
  const m = openModal({
    title: invoice ? `Invoice #${invoice.id}` : 'New Invoice', wide: true,
    body: `<form id="invoice-form">
      <div class="form-grid">
        <div class="field full"><label>Invoice title *</label><input name="title" value="${esc(iv.title || '')}" required /></div>
        <div class="field"><label>Client *</label><select name="client_id" ${invoice ? 'disabled' : ''}>${opts}</select></div>
        <div class="field"><label>Status</label><select name="status">${Object.keys(INVOICE_STATUS).map((s) => `<option value="${s}" ${iv.status === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
        <div class="field"><label>Due date</label><input name="due_date" type="date" value="${esc(iv.due_date || '')}" /></div>
        <div class="field"><label>Amount paid</label><input name="amount_paid" type="number" step="0.01" value="${esc(iv.amount_paid || 0)}" /></div>
        <div class="field full"><label>Notes</label><textarea name="notes">${esc(iv.notes || '')}</textarea></div>
      </div>
      <div class="section-title">Line items</div>
      <div id="li-editor"></div>
    </form>`,
    footer: `${invoice ? '<button class="btn danger" data-del>Delete</button>' : '<button class="btn secondary" data-cancel>Cancel</button>'}
      <div class="right">
        ${invoice && invoice.status !== 'paid' ? '<button class="btn secondary" data-paid>Mark Paid</button>' : ''}
        <button class="btn" data-save>${invoice ? 'Save changes' : 'Create invoice'}</button>
      </div>`,
  });
  const editor = lineItemsEditor(m.querySelector('#li-editor'), iv.line_items || [], { taxRate: iv.tax_rate ?? 0 });
  (m.querySelector('[data-cancel]') || {}).onclick = closeModal;
  m.querySelector('[data-save]').onclick = async () => {
    const f = document.getElementById('invoice-form');
    const body = Object.fromEntries(new FormData(f));
    body.line_items = editor.getItems();
    body.tax_rate = editor.getTaxRate();
    body.amount_paid = Number(body.amount_paid) || 0;
    if (invoice) body.client_id = invoice.client_id;
    if (!body.title) return toast('Invoice title is required', 'error');
    if (!body.client_id) return toast('Please pick a client', 'error');
    try {
      if (invoice) await api.put(`/invoices/${invoice.id}`, body);
      else await api.post('/invoices', body);
      toast(invoice ? 'Invoice updated' : 'Invoice created'); closeModal(); route();
    } catch (e) { toast(e.message, 'error'); }
  };
  if (invoice) {
    m.querySelector('[data-del]').onclick = async () => {
      if (!confirm('Delete this invoice?')) return;
      await api.del(`/invoices/${invoice.id}`); toast('Invoice deleted'); closeModal(); route();
    };
    const paidBtn = m.querySelector('[data-paid]');
    if (paidBtn) paidBtn.onclick = async () => {
      try { await api.post(`/invoices/${invoice.id}/pay`); toast('Invoice marked paid'); closeModal(); route(); }
      catch (e) { toast(e.message, 'error'); }
    };
  }
}

// ---------------------------------------------------------------- router
async function route() {
  const hash = location.hash || '#/dashboard';
  const parts = hash.replace(/^#\//, '').split('/');
  const top = parts[0] || 'dashboard';

  document.querySelectorAll('#nav a').forEach((a) => a.classList.toggle('active', a.dataset.route === top));

  try {
    if (top === 'dashboard') await renderDashboard();
    else if (top === 'schedule') await renderSchedule();
    else if (top === 'clients') parts[1] ? await renderClientDetail(parts[1]) : await renderClients();
    else if (top === 'jobs') await renderJobs();
    else if (top === 'quotes') await renderQuotes();
    else if (top === 'invoices') await renderInvoices();
    else location.hash = '#/dashboard';
  } catch (e) {
    view().innerHTML = pageHead('Something went wrong', e.message);
    toast(e.message, 'error');
  }
}

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', () => {
  if (!location.hash) location.hash = '#/dashboard';
  route();
});
