const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();
  await page.goto("http://localhost:8080/Profile/", { waitUntil: "domcontentloaded" });
  const paths = ["./viewer/viewer.css", "./build/pdf.js", "./profile.bin", "./industrial-era-profile.pdf"];
  for (const p of paths) {
    const result = await page.evaluate(async (path) => {
      const r = await fetch(path);
      const buf = await r.arrayBuffer();
      return { status: r.status, len: buf.byteLength };
    }, p);
    console.log(p, result);
  }
  await browser.close();
})().catch(console.error);
