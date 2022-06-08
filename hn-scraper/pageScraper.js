const scraperObject = {
  url: 'https://news.ycombinator.com/',
  async scraper(browser) {
    const page = await browser.newPage();
    await page.goto(this.url);
    const tableRows = await page.$$('table.itemlist > tbody > tr.athing');
    const subtextTableRows = await page.$$(
        'table.itemlist > tbody > tr > td.subtext',
    );
    const titlesAndUrls = [];
    const datesAndVotes = [];

    let title; let link;
    for (const tableRow of tableRows) {
      title = await page.evaluate(
          (el) => el.querySelector('a.titlelink').textContent,
          tableRow,
      );

      link = await page.evaluate(
          (el) => el.querySelector('a.titlelink').getAttribute('href'),
          tableRow,
      );
      if (link.includes('item?id')) {
        link = this.url + link;
      }

      titlesAndUrls.push({title, link});
    }

    let points; let date;
    for (const subtextRow of subtextTableRows) {
      try {
        points = await page.evaluate(
            (el) => el.querySelector('span.score').textContent,
            subtextRow,
        );
        points = parseInt(points.split(' ')[0]);
      } catch (err) {
        points = 0;
      }
      date = await page.evaluate(
          (el) => el.querySelector('span.age').getAttribute('title'),
          subtextRow,
      );

      date = new Date(date);
      datesAndVotes.push({date, points});
    }
    const articles = [];
    titlesAndUrls.forEach((titleAndUrl, index) => {
      const dateAndVote = datesAndVotes[index];
      articles.push(Object.assign(titleAndUrl, dateAndVote));
    });
    console.log(articles);

    await browser.close();
  },
};

module.exports = scraperObject;
