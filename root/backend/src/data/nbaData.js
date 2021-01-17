import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: false,
  });
  const page = await browser.newPage();

  

   await page.goto('https://www.mansionbet.com/sports/basketball/nba/20210118/oklahoma-city-thunder-vs-philadelphia-76ers/');


  await page.waitForSelector(
    '#groupID_18204',
    { visible: true }
  );

  await page.evaluate(() => {
  document.querySelector('#groupID_18204').click();
});

  let data = await page.$$eval(
    '.hoverable-event-container > .event-buttons-container',
    (elements) => elements.map((x) => x.textContent.trim())
  );


  console.log(data);


  // await page.screenshot({
  //   path: 'buddy-screenshot.png',
  //   fullPage: true,
  //   timeout: 5000,
  // });

  await browser.close();
})();


