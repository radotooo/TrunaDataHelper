import puppeteer from 'puppeteer';
import fs from 'fs';

//scrape with puppeteer
const getData = async () => {
  let result;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('response', async (response) => {
    if (response.request().method() === 'GET') {
      if (
        response.request().url().includes(
          //alternative route
          'https://api.nfl.com/football/v1/games?season=2020&seasonType'
          // 'https://api.nfl.com/v3/shield/?query=query%7Bviewer%7Bleague%7BgamesByWeek'
        )
      ) {
        try {
          const data = await response.json();
       console.log(data);
          result = data;
        } catch (error) {
          return error;
        }
      }
    }
  });
  await page.goto('https://www.nfl.com/schedules/', {
    waitUntil: 'networkidle0',
  });
  await browser.close();
  fs.writeFileSync(
    './src/data/scraped-data/nfl.json',
    JSON.stringify(result),
    (err) => {
      if (err) throw err;
    }
  );
  console.log('nfl scraped');
};

export default getData;
