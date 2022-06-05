const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: false,
    //   save the actions you did on the site e.g. captcha
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();
  await page.goto(
    "https://www.amazon.com/s?k=amazon+basics&sprefix=amazon+bas%2Caps%2C79&ref=nb_sb_ss_ts-doa-p_1_10"
  );

  // let's just call them tweetHandle
  const productHandles = await page.$$(
    "div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
  );

  let items = [];

  // loop thru all handles
  for (const producthandle of productHandles) {
    let title = "Null";
    let price = "Null";
    let img = "Null";

    try {
      // pass the single handle below
      title = await page.evaluate(
        (el) => el.querySelector("h2 > a > span").textContent,
        producthandle
      );
    } catch (e) {}

    try {
      price = await page.evaluate(
        (el) => el.querySelector(".a-price > .a-offscreen").textContent,
        producthandle
      );
    } catch (e) {}

    try {
      img = await page.evaluate(
        (el) => el.querySelector(".s-image").getAttribute("src"),
        producthandle
      );
    } catch (e) {}

    // do whatever you want with the data
    if (title !== "Null") {
      items.push({
        title: title,
        price: price,
        img: img,
      });
    }
  }
  console.log(items);
  await browser.close();
})();
