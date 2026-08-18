const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();
  await page.goto("http://localhost:8080/Profile/", { waitUntil: "domcontentloaded" });
  const result = await page.evaluate(async () => {
    const r = await fetch("./industrial-era-profile.pdf", {
      headers: { Range: "bytes=0-1048575" },
    });
    const buf = await r.arrayBuffer();
    return {
      status: r.status,
      len: buf.byteLength,
      cr: r.headers.get("content-range"),
    };
  });
  console.log("range 1mb:", result);
  await browser.close();
})().catch(console.error);
