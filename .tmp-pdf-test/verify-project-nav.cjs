const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto("http://localhost:8080/projects/commercial-building/", { waitUntil: "networkidle" });

  const checks = await page.evaluate(() => {
    const nav = document.querySelector(".era-main-nav");
    const oldNav = document.querySelector(".era-project-nav");
    const hero = document.querySelector(".elementor-element-fe57057");
    const heroVisible = hero ? getComputedStyle(hero).display !== "none" : null;
    const oldHeader = document.querySelector(".elementor-5137");
    const oldHeaderVisible = oldHeader ? getComputedStyle(oldHeader).display !== "none" : null;
    const navStyle = nav ? getComputedStyle(nav) : null;
    const breadcrumb = document.querySelector(".elementor-element-04f694a");
    const breadcrumbVisible = breadcrumb ? getComputedStyle(breadcrumb.closest(".elementor-element-fe57057") || breadcrumb).display !== "none" : null;
    return {
      hasMainNav: !!nav,
      hasOldNav: !!oldNav,
      heroVisible,
      oldHeaderVisible,
      navPosition: navStyle?.position,
      navBg: navStyle?.backgroundColor,
      breadcrumbParentHidden: breadcrumbVisible === false,
    };
  });

  console.log(JSON.stringify(checks, null, 2));
  await page.screenshot({ path: "D:/arch-ltd.net/arch-ltd.net/.tmp-pdf-test/project-nav-check.png", fullPage: false });
  await browser.close();
})();
