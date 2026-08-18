const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();
  await page.goto("http://localhost:8080/Profile/", { waitUntil: "domcontentloaded" });
  const result = await page.evaluate(async () => {
    const r = await fetch("../index.html");
    const t = await r.text();
    return { status: r.status, len: t.length };
  });
  console.log("index.html fetch:", result);
  await browser.close();
})().catch(console.error);
