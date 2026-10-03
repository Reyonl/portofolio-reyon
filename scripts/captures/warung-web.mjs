// Capture UI asli Warung Lupi web buat portfolio (screenshots honest, dari dev app lokal).
import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = process.env.SHOT_BASE || 'http://localhost:8000';
const OUT = process.argv[2] || '.';
fs.mkdirSync(OUT, { recursive: true });

const SHOTS = [
  ['/', 'warung-dashboard.png'],
  ['/bon', 'warung-bon.png'],
  ['/bon/buat', 'warung-buat-bon.png'],
  ['/laporan/rokok', 'warung-laporan-rokok.png'],
  ['/pelanggan', 'warung-pelanggan.png'],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const [path, file] of SHOTS) {
  const resp = await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 }).catch(e => null);
  await page.waitForTimeout(1200);
  const status = resp ? resp.status() : 'ERR';
  // detect login wall / empty state
  const probe = await page.evaluate(() => {
    const t = document.body.innerText.slice(0, 200).replace(/\s+/g, ' ');
    const hasPassword = !!document.querySelector('input[type=password]');
    return { t, hasPassword };
  });
  console.log(`${path} -> ${status}${probe.hasPassword ? ' [LOGIN WALL]' : ''} :: ${probe.t.slice(0, 90)}`);
  await page.screenshot({ path: `${OUT}/${file}` });
}
await browser.close();
