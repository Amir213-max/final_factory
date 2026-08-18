const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();
  page.on("response", async (r) => {
    if (r.url().includes(".pdf")) {
      const body = await r.body().catch(() => Buffer.alloc(0));
      console.log("PDF", r.status(), body.length);
    }
  });
  await page.goto("http://localhost:8080/Profile/industrial-era-profile.pdf", {
    waitUntil: "load",
    timeout: 120000,
  });
  await page.waitForTimeout(5000);
  await browser.close();
})().catch(console.error);
