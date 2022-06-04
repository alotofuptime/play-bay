const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://news.ycombinator.com/");

  let articleTitles = page.$$eval("a.titlelink", (titles) =>
    titles.map((item) => item.textContent)
  );

  let articleLinks = page.$$eval("a.titlelink", (links) =>
    links.map((item) => item.href)
  );
  // edge case: some articles have 0 votes
  let articleUpVotes = page.$$eval("span.score", (spans) =>
    spans.map((item) => (item.textContent))
  );
  console.log(await articleUpVotes);
  await browser.close();
})();