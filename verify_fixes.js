const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Take desktop screenshot of Home page hero with 3D ribbons
  const screenshotDir = path.join(__dirname, 'verification', 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const heroScreenshot = path.join(screenshotDir, 'hero_3d_ribbons.png');
  await page.screenshot({ path: heroScreenshot });
  console.log('Saved hero screenshot to:', heroScreenshot);

  // Test footer link clickability
  console.log('Scrolling to footer...');
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(1000);

  // Check if footer "Visit Us" / address / phone links are clickable
  const phoneLink = page.locator('footer a[href^="tel:"]').first();
  const phoneVisible = await phoneLink.isVisible();
  console.log('Footer phone link visible:', phoneVisible);

  // Check elementFromPoint for phone link
  const phoneBox = await phoneLink.boundingBox();
  if (phoneBox) {
    const topElementTag = await page.evaluate(({ x, y }) => {
      const el = document.elementFromPoint(x, y);
      return el ? `${el.tagName.toLowerCase()}.${el.className}` : null;
    }, { x: phoneBox.x + phoneBox.width / 2, y: phoneBox.y + phoneBox.height / 2 });
    console.log('Element at footer phone link coordinates:', topElementTag);
  }

  // Click phone link or directions link and verify click works
  const mapLink = page.locator('footer a[href*="google.com/maps"]').first();
  const mapVisible = await mapLink.isVisible();
  console.log('Footer Google Maps link visible:', mapVisible);

  // Now test mobile view and mobile menu overlay showing 3D scene behind
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2000);

  // Click mobile menu button
  const menuButton = mobilePage.locator('button[aria-label="Menu"]');
  await menuButton.click();
  await mobilePage.waitForTimeout(500);

  const mobileMenuScreenshot = path.join(screenshotDir, 'mobile_menu_overlay_3d.png');
  await mobilePage.screenshot({ path: mobileMenuScreenshot });
  console.log('Saved mobile menu screenshot to:', mobileMenuScreenshot);

  await browser.close();
  console.log('Verification complete.');
})();
