const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();
  await page.goto("http://localhost:8080/Profile/", { waitUntil: "domcontentloaded" });
  for (const path of ["./industrial-era-profile.pdf", "./profile.bin"]) {
    const result = await page.evaluate(async (p) => {
      const r = await fetch(p);
      const buf = await r.arrayBuffer();
      return { path: p, status: r.status, len: buf.byteLength, type: r.headers.get("content-type") };
    }, path);
    console.log(result);
  }
  await browser.close();
})().catch(console.error);
