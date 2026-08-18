const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();
  await page.goto("http://localhost:8080/Profile/", { waitUntil: "domcontentloaded" });
  const result = await page.evaluate(async () => {
    const r = await fetch("./industrial-era-profile.pdf");
    const buf = await r.arrayBuffer();
    return { status: r.status, len: buf.byteLength, type: r.headers.get("content-type") };
  });
  console.log("fetch from page:", result);
  await browser.close();
})().catch(console.error);
