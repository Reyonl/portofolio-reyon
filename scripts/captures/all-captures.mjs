// Re-shoot portfolio screenshots: JPEG (small), per-route viewport (kill dead space),
// plus Daily.co below-fold and rendered hermes-devops terminal shot.
import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = process.argv[2] || '.';
fs.mkdirSync(OUT, { recursive: true });
const J = { type: 'jpeg', quality: 82 };

const browser = await chromium.launch();

// --- Warung Lupi web (dev :8000) ---
const warung = await browser.newPage();
const WARUNG = [
  ['/', 'warung-dashboard', 1440, 620],          // crop: remove bottom dead space
  ['/bon', 'warung-bon', 1440, 760],
  ['/laporan/rokok', 'warung-rokok', 1440, 900], // dense report: keep full
  ['/pelanggan', 'warung-pelanggan', 1440, 760],
];
for (const [path, name, w, h] of WARUNG) {
  await warung.setViewportSize({ width: w, height: h });
  const resp = await warung.goto('http://localhost:8000' + path, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => null);
  await warung.waitForTimeout(900);
  await warung.screenshot({ path: `${OUT}/${name}.jpg`, ...J });
  console.log(`warung ${path} -> ${resp ? resp.status() : 'ERR'} ${name}.jpg`);
}

// --- Daily.co (dev :8001) ---
const daily = await browser.newPage();
await daily.setViewportSize({ width: 1440, height: 860 });
const resp = await daily.goto('http://localhost:8001/', { waitUntil: 'networkidle', timeout: 30000 }).catch(() => null);
await daily.waitForTimeout(900);
await daily.screenshot({ path: `${OUT}/dailyco-hero.jpg`, ...J });
console.log(`daily / -> ${resp ? resp.status() : 'ERR'} dailyco-hero.jpg`);
const probe = await daily.evaluate(() => {
  const els = [...document.querySelectorAll('section, [id]')].map(e => e.id).filter(Boolean);
  return { ids: els.slice(0, 10), pageH: document.body.scrollHeight };
});
console.log('daily sections:', JSON.stringify(probe));
for (const [y, name] of [[900, 'dailyco-canvas'], [1800, 'dailyco-feature2']]) {
  await daily.evaluate(v => window.scrollTo(0, v), y);
  await daily.waitForTimeout(700);
  await daily.screenshot({ path: `${OUT}/${name}.jpg`, ...J });
  console.log(`daily scroll ${y} -> ${name}.jpg`);
}

// --- hermes-devops real CLI output rendered as honest terminal image ---
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  body{margin:0;background:#0B0C10;font-family:Consolas,'JetBrains Mono',monospace}
  .win{max-width:1100px;margin:40px auto;border:1px solid #2A2E37;border-radius:10px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.55)}
  .bar{display:flex;align-items:center;gap:8px;background:#16181D;padding:10px 14px;border-bottom:1px solid #2A2E37}
  .dot{width:11px;height:11px;border-radius:50%}.r{background:#FF5F57}.y{background:#FEBC2E}.g{background:#28C840}
  .ttl{color:#9AA1AD;font-size:12px;margin-left:10px}
  pre{color:#E6EAF0;font-size:13.5px;line-height:1.5;padding:22px 26px;margin:0;white-space:pre-wrap}
  .hl{color:#63B3FF}.ok{color:#4ADE80}.mut{color:#9AA1AD}.warn{color:#FBBF24}
</style></head><body><div class="win">
  <div class="bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
  <span class="ttl">reyon — hermes-devops — status</span></div>
  <pre>$ <span class="hl">hermes-devops status</span>
HERMES DEVOPS
<span class="mut">────────────────────────────────────────────</span>

CLI
Status        <span class="ok">READY</span>
Version       0.7.5
Registry      ~/.config/hermes-devops/data/projects.json

PROJECTS
Registered    16
PHP           5          Node.js        1
Laravel       5          Next.js        4
Flutter       1

HEALTH
Healthy       0          Attention      <span class="warn">1</span>
Critical      0          Unchecked      15

SYSTEM
Git           <span class="ok">✓</span>
<span class="mut">$</span> ▮</pre></div></body></html>`;
const term = await browser.newPage();
await term.setViewportSize({ width: 1440, height: 810 });
await term.setContent(html);
await term.waitForTimeout(300);
await term.screenshot({ path: `${OUT}/hermes-terminal.jpg`, ...J });
console.log('hermes terminal -> hermes-terminal.jpg');

await browser.close();
