import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: process.env.PW_CHROME, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 820 }, reducedMotion: 'reduce' });
const page = await ctx.newPage();
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/shots/hero-detail.png' });
// scroll to recurring plans
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.44));
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/shots/recurring-detail.png' });
await browser.close();
console.log('ok');
