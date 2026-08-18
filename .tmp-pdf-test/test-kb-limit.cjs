const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();
  await page.goto("http://localhost:8080/Profile/", { waitUntil: "domcontentloaded" });
  for (const kb of [100, 300, 500, 700, 900]) {
    const result = await page.evaluate(async (size) => {
      const r = await fetch(`./test-${size}kb.bin`);
      const buf = await r.arrayBuffer();
      return { status: r.status, len: buf.byteLength };
    }, kb);
    console.log(`${kb}KB`, result);
  }
  await browser.close();
})().catch(console.error);
