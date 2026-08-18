const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();
  page.on("request", (r) => {
    if (r.url().includes("industrial-era-profile.pdf")) {
      console.log("REQ", r.method(), r.url());
    }
  });
  page.on("response", async (r) => {
    if (r.url().includes("industrial-era-profile.pdf")) {
      const body = await r.body().catch(() => Buffer.alloc(0));
      console.log("RES", r.request().method(), r.status(), body.length, r.headers()["content-type"]);
    }
  });
  await page.goto("http://localhost:8080/Profile/viewer/viewer.html", {
    waitUntil: "networkidle",
    timeout: 120000,
  });
  await page.waitForTimeout(20000);
  await browser.close();
})().catch(console.error);
