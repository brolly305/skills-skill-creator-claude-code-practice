// Screenshot a local URL with Playwright Chromium.
// Usage: node screenshot.mjs <url> [label]
// Saves to ./temporary screenshots/screenshot-N[-label].png (auto-incremented, never overwritten).
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

// Playwright is installed globally at /opt/node22/lib/node_modules, not as a project
// dependency. Node's ESM `import` does NOT honor NODE_PATH for bare specifiers (unlike
// CommonJS `require`), so it's loaded via an absolute-path require instead.
const require = createRequire(import.meta.url);
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const url = process.argv[2];
const label = process.argv[3];

if (!url) {
  console.error('Usage: node screenshot.mjs <url> [label]');
  process.exit(1);
}
if (!/^https?:\/\/localhost/.test(url) && !/^https?:\/\/127\.0\.0\.1/.test(url)) {
  console.error('Refusing to screenshot a non-localhost URL. Serve the project first (node serve.mjs) and pass an http://localhost URL.');
  process.exit(1);
}

const OUT_DIR = path.join(process.cwd(), 'temporary screenshots');
fs.mkdirSync(OUT_DIR, { recursive: true });

const existing = fs.readdirSync(OUT_DIR).filter((f) => /^screenshot-\d+/.test(f));
const nextN = existing.reduce((max, f) => {
  const m = f.match(/^screenshot-(\d+)/);
  return m ? Math.max(max, Number(m[1])) : max;
}, 0) + 1;

const fileName = `screenshot-${nextN}${label ? `-${label}` : ''}.png`;
const outPath = path.join(OUT_DIR, fileName);

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(300);
  await page.screenshot({ path: outPath, fullPage: true });
  console.log(`Saved ${outPath}`);
} finally {
  await browser.close();
}
