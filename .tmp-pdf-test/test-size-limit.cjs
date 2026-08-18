const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();
  await page.goto("http://localhost:8080/Profile/", { waitUntil: "domcontentloaded" });
  for (const mb of [1, 5, 10, 20, 30, 40, 50]) {
    const result = await page.evaluate(async (size) => {
      const r = await fetch(`./test-${size}mb.bin`);
      const buf = await r.arrayBuffer();
      return { status: r.status, len: buf.byteLength };
    }, mb);
    console.log(`${mb}MB`, result);
  }
  await browser.close();
})().catch(console.error);
