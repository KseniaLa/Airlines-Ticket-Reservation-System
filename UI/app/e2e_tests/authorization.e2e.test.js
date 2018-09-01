import { launch } from 'puppeteer';

describe('Initial test', () => {
  test(
    'page loads correctly',
    async () => {
      const browser = await launch({
        headless: false,
      });
      const page = await browser.newPage();

      page.emulate({
        viewport: {
          width: 1000,
          height: 2400,
        },
        userAgent: '',
      });

      await page.goto('http://localhost:3000/', {
        waitUntil: 'domcontentloaded',
      });
      await page.waitForSelector('.wrapper');
      await page.waitFor(2000);
      await page.click('.header__options .page-button');
      await page.type('input[name=email]', 'airlines@ks.la');
      await page.type('input[name=pass]', '12345678');
      await page.waitFor(2000);
      await page.click('.sign-page__form .page-button');
      await page.waitFor(2000);
    },
    160000,
  );
});
