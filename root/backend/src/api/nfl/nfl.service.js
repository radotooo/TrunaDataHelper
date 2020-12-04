import puppeteer from 'puppeteer';

const getData = async () => {
  let result;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('response', async (response) => {
    if (response.request().method() === 'GET') {
      if (
        response.request().url() ===
        'https://api.nfl.com/football/v1/games?season=2020&seasonType=REG&week=13&withExternalIds=true'
      ) {
        try {
          const data = await response.json();
          // console.log(data);
          result = data;
        } catch (error) {
          return error;
        }
      }
    }
  });
  await page.goto('https://www.nfl.com/schedules/', {
    waitUntil: 'load',
  });
  await browser.close();
  return result;
};

export default getData;
