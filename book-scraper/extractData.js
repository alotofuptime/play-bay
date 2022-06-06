const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://news.ycombinator.com/");
  const tableRows = await page.$$("table.itemlist > tbody > tr.athing");
  const subtextTableRows = await page.$$(
    "table.itemlist > tbody > tr > td.subtext"
  );
  let titlesAndUrls = [],
    datesAndVotes = [];

  let title, link;
  for (const tableRow of tableRows) {
    title = await page.evaluate(
      (el) => el.querySelector("a.titlelink").textContent,
      tableRow
    );

    link = await page.evaluate(
      (el) => el.querySelector("a.titlelink").getAttribute("href"),
      tableRow
    );

    titlesAndUrls.push({ title, link });
  }

  let points, date;
  for (const subtextRow of subtextTableRows) {
    try {
      points = await page.evaluate(
        (el) => el.querySelector("span.score").textContent,
        subtextRow
      );
    } catch (err) {
      points = "Null";
    }
    date = await page.evaluate(
      (el) => el.querySelector("span.age").getAttribute("title"),
      subtextRow
    );
    datesAndVotes.push({ date, points });
  }
  const articles = [];
  titlesAndUrls.forEach((titleAndUrl, index) => {
    let dateAndVote = datesAndVotes[index];
    articles.push(Object.assign(titleAndUrl, dateAndVote));
  });
  console.log(articles);

  await browser.close();
})();
