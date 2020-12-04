import puppeteer from 'puppeteer';
import fs from 'fs';

const getData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('response', async (response) => {
    if (response.request().method() === 'POST') {
      if (
        response.request().url() ===
        'https://sbapi.sbtech.com/mansioncom/sportscontent/sportsbook/v1/Events/GetByLeagueId'
      ) {
        try {
          const data = await response.json();

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
    '#html-container-Center_LeagueViewResponsiveBlock_15984',
    { visible: true }
  );
  console.log('data scraped');
  await browser.close();
};

export default getData;
