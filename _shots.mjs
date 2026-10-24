import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
const exe = process.env.PW_CHROME;
mkdirSync('/tmp/shots', { recursive: true });
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });

const pages = [
  ['home', '/'],
  ['services', '/services'],
  ['recurring', '/recurring-cleaning'],
  ['about', '/about'],
  ['areas', '/service-areas'],
  ['faq', '/faq'],
  ['contact', '/contact'],
  ['join', '/join-our-team'],
];
const widths = { desktop: 1440, tablet: 768, mobile: 390 };

for (const [name, path] of pages) {
  for (const [label, w] of Object.entries(widths)) {
    if (label !== 'desktop' && !['home','contact'].includes(name)) continue; // full set only for key pages
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto('http://localhost:3000' + path, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(600);
    await page.screenshot({ path: `/tmp/shots/${name}-${label}.png`, fullPage: label === 'desktop' });
    await ctx.close();
    console.log(`shot ${name}-${label}`);
  }
}
await browser.close();
