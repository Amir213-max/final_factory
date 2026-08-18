const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto("http://localhost:8080/Profile/", {
    waitUntil: "networkidle",
    timeout: 180000,
  });
  await page.waitForTimeout(35000);
  const frame = page.frames().find((f) => f.url().includes("viewer"));
  const info = frame
    ? await frame.evaluate(() => ({
        pages: PDFViewerApplication.pagesCount,
        hasPdf: !!PDFViewerApplication.pdfDocument,
      }))
    : { noFrame: true };
  console.log("PROFILE PAGE", info);
  await page.screenshot({
    path: "D:/arch-ltd.net/arch-ltd.net/.tmp-pdf-test/profile-preview-check.png",
    fullPage: false,
  });
  await browser.close();
})().catch(console.error);
