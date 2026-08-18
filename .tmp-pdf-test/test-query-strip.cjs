const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();
  await page.goto(
    "http://localhost:8080/Profile/viewer/viewer.html?file=../industrial-era-profile.dat&test=1",
    { waitUntil: "domcontentloaded" }
  );
  const loc = await page.evaluate(() => ({
    href: location.href,
    search: location.search,
  }));
  console.log(loc);
  await browser.close();
})().catch(console.error);
