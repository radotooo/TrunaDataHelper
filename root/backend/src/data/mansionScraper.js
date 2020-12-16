import puppeteer from 'puppeteer';
import fs from 'fs';

const getData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('response', async (response) => {
    if (response.request().method() === 'POST') {
      if (
        response.request().url() ===
          'https://sbapi.sbtech.com/mansioncom/sportscontent/sportsbook/v1/Events/GetByLeagueId' &&
        response.request().postData().includes('Fixture')
      ) {
        const data = await response.json();

        try {
          fs.writeFileSync(
            './src/data/scraped-data/mansion.json',
            JSON.stringify(data.events),
            (err) => {
              if (err) throw err;
            }
          );
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  });
  await page.goto('https://www.mansionbet.com/sports/american-football/nfl/', {
    waitUntil: 'load',
  });
  await page.waitForSelector(
    '#eventsWrapper-Center_LeagueViewResponsiveBlock_15984 > sb-comp > div:nth-child(1) > div > sb-lazy-render > div:nth-child(1) > div > div.rj-ev-list__inner-holder > a',
    { visible: true }
  );
  console.log('mansion scraped');
  await browser.close();
};
export default getData;
