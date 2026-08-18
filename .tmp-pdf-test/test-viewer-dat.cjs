const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();
  const logs = [];
  page.on("console", (m) => logs.push(m.text()));
  await page.goto(
    "http://localhost:8080/Profile/viewer/viewer.html?file=../industrial-era-profile.dat",
    { waitUntil: "networkidle", timeout: 180000 }
  );
  await page.waitForTimeout(30000);
  const info = await page.evaluate(() => ({
    pages: PDFViewerApplication.pagesCount,
    hasPdf: !!PDFViewerApplication.pdfDocument,
    url: PDFViewerApplication.url,
  }));
  console.log("INFO", info);
  if (logs.length) console.log("LOGS", logs.slice(0, 5));
  await browser.close();
})().catch(console.error);
