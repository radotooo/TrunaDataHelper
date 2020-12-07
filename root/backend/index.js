import app from './src/app.js';
import scrapeMansion from './src/data/mansion-scrape.js';
import scrapeNfl from './src/data/nfl-scrape.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  //srape data and refresh on every 5 mins
  // scrapeMansion();
  // scrapeNfl();
  // setInterval(scrapeMansion, 300000);
  // setInterval(scrapeNfl, 300000);
  console.log(`Example app listening at http://localhost:${PORT}`);
});
