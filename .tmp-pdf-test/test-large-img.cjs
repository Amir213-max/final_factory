const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();
  await page.goto("http://localhost:8080/", { waitUntil: "domcontentloaded" });
  const result = await page.evaluate(async () => {
    const r = await fetch("/wp-content/uploads/2026/08/hero-industrial-era.png?v=2");
    const buf = await r.arrayBuffer();
    return { status: r.status, len: buf.byteLength, type: r.headers.get("content-type") };
  });
  console.log("hero png:", result);
  await browser.close();
})().catch(console.error);
