const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();
  page.on("response", async (r) => {
    if (r.url().includes("industrial-era-profile")) {
      const body = await r.body().catch(() => Buffer.alloc(0));
      console.log("download req", r.status(), body.length, r.url().split("/").pop());
    }
  });
  await page.goto("http://localhost:8080/Profile/", { waitUntil: "domcontentloaded" });
  const [download] = await Promise.all([
    page.waitForEvent("download", { timeout: 60000 }).catch(() => null),
    page.click('a.profile-btn--download'),
  ]);
  console.log("download event", download ? download.suggestedFilename() : "none");
  await browser.close();
})().catch(console.error);
