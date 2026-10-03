import { chromium } from 'playwright';
const raw = process.env.HERMES_STATUS_TXT;
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const body = raw.split('\n').map(l => {
    let s = esc(l);
    if (/^─/.test(l)) return `<span class="mut">${s}</span>`;
    if (/^(CLI|PROJECTS|HEALTH|SYSTEM|GITHUB)$/.test(l.trim())) return `<span class="hl">${s}</span>`;
    if (/Registered|^Status/.test(l)) s = s.replace('16','<span class="hl">16</span>').replace('READY','<span class="ok">READY</span>');
    if (/✓/.test(l)) s = s.replace(/(✓)/g, '<span class="ok">$1</span>');
    if (/✗/.test(l)) s = s.replace(/✗/g, '<span class="bad">✗</span>');
    if (/Attention/.test(l)) s = s.replace(/(Attention\s+\d+)/, '<span class="warn">$1</span>');
    return s;
}).join('\n');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  body{margin:0;background:#0B0C10;font-family:Consolas,'JetBrains Mono',monospace}
  .win{margin:14px;border:1px solid #2A2E37;border-radius:10px;overflow:hidden;background:#0B0C10}
  .bar{display:flex;align-items:center;gap:8px;background:#16181D;padding:9px 16px;border-bottom:1px solid #2A2E37}
  .dot{width:11px;height:11px;border-radius:50%}.r{background:#FF5F57}.y{background:#FEBC2E}.g{background:#28C840}
  .ttl{color:#9AA1AD;font-size:13px;margin-left:10px}
  .cols{display:grid;grid-template-columns:1fr 1fr;gap:0 40px;padding:24px 30px;font-size:15px;line-height:1.65;color:#E6EAF0}
  .c1{font-family:inherit;font-size:14px;line-height:1.7;padding:0;margin:0}
  .c1 .cmd{font-size:15px;margin-bottom:10px}
  pre{color:#E6EAF0;font-size:15px;line-height:1.6;padding:0;margin:0;white-space:pre-wrap}
  .hl{color:#63B3FF}.ok{color:#4ADE80}.mut{color:#9AA1AD}.warn{color:#FBBF24}.bad{color:#F87171}
</style></head><body><div class="win" id="w">
  <div class="bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
  <span class="ttl">reyon — hermes-devops — status</span></div>
  <div class="cols">
    <div class="c1"><span class="cmd">$ <span class="hl">hermes-devops status</span></span>
<pre>HERMES DEVOPS
${'─'.repeat(44)}

<span class="hl">CLI</span>
Status        <span class="ok">READY</span>
Version       0.7.5
Registry      ~/.config/hermes-devops/
              data/projects.json

<span class="hl">PROJECTS</span>
Registered    <span class="hl">16</span>
PHP           5
Node.js       1
Laravel       5
Next.js       4
Flutter       1</pre></div>
    <div class="c1"><pre>
<span class="hl">HEALTH</span>
Healthy       0
Attention     <span class="warn">1</span>
Critical      0
Unchecked     15

<span class="hl">SYSTEM</span>
Git           <span class="ok">✓</span>
Node.js       <span class="ok">✓</span>
PHP           <span class="ok">✓</span>
Composer      <span class="ok">✓</span>
Flutter       <span class="ok">✓</span>
Python        <span class="ok">✓</span>
Docker        <span class="bad">✗</span>
SSH           <span class="ok">✓</span>

<span class="hl">GITHUB</span>
Connected     <span class="hl">7</span>
Not connected 9
<span class="mut">$</span> ▮</pre></div>
  </div></div></body></html>`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 700 }, deviceScaleFactor: 1 });
await page.setContent(html);
await page.waitForTimeout(300);
const el = page.locator('#w');
await el.screenshot({ path: 'C:/laragon/www/portofolio-reyon/public/images/hermes-terminal.jpg', type: 'jpeg', quality: 86 });
const b = await el.boundingBox();
console.log('win box:', JSON.stringify(b));
await browser.close();
