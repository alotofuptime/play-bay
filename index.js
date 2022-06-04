const { chromium } = require("playwright");

// (async () => {
//   const browser = await chromium.launch();
//   // Create pages, interact with UI elements, assert values
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   await page.goto('https://quotes.toscrape.com');
//   // (await page).screenshot({path: "example.png"});
//   // const loginText = await page.locator('//a[contains(@href, "/login")]').textContent();
//   const allQuotes = await page.locator('//span[@class="text"]').allTextContents();
//   console.log(allQuotes)
//   await browser.close();
// })();

const login = async () => {
  const browser = await chromium.launch();
  // Create pages, interact with UI elements, assert values
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://quotes.toscrape.com");
  await page.click("text=Login");
  await page.fill("input[name=username]", "user123");
  await page.fill("input[name=password]", "password123");
  await page.click('//input[@class="btn btn-primary"]');
  const logoutBtn = await page
    .locator('//a[contains(@href, "/logout")]')
    .textContent();
  await context.storageState({ path: "state.json" });
  console.log(logoutBtn);
  await browser.close();
};

// login();

const getQuotes = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  await page.goto("https://quotes.toscrape.com");
  const quoteDivs = await page.evaluate(() => {
    divs = document.querySelectorAll(".quote");
    let quotes = [];
    divs.forEach((div) => {
      const quoteSpans = div.querySelectorAll("span");
      const quoteTagLinks = div.querySelectorAll("a.tag");
      const quote = quoteSpans[0];
      const author = quoteSpans[1];
      const tags = [...quoteTagLinks].map((item) => item.innerText);
      const authorName = author.querySelector("small");
      quotes.push({
        quote: quote.innerText,
        author: authorName.innerText,
        tags: tags,
      });
    });
    return quotes;
  });
  console.log(quoteDivs);
  await browser.close();
};

getQuotes();
