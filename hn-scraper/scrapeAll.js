const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com/');
  // let nextPage = page.$('.morelink')
  while (true) {
    try {
      console.log('Checking if next page link exists...');

      console.log(`Starting page: ${page.url()}`);
      const response = await Promise.all([
        page.waitForNavigation({waitUntil: 'networkidle0'}),
        // page.click('a.morelink'),
        page.waitForTimeout(10000).then(() => page.click('a.morelink')),
      ]);
      console.log(`Current page: ${page.url()}`);
      console.log('Next page found...');
    } catch (err) {
      console.log('Last page has been reached....');
      console.log('Closing browser...');
      break;
    }
  }

  await browser.close();
})();

// const [response] = await Promise.all([
//     page.waitForNavigation(waitOptions),
//     page.click(selector, clickOptions),
//     ]);
