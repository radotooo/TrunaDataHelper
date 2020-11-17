import puppeteer from 'puppeteer'

(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: false });
    const page = await browser.newPage();
    await page.goto('https://uk.mansionbet.com/sports/american-football/nfl/');
    await page.waitForSelector('.rj-ev-list__ev-card__section.rj-ev-list__ev-card__event-info.rj-ev-list__ev-card__section-item--no-league', { visible: true });

    let data = await page.$$eval(".rj-ev-list__ev-card__section.rj-ev-list__ev-card__event-info.rj-ev-list__ev-card__section-item--no-league", elements =>
        elements.map(x => x.textContent.trim()));

    console.log(data);

    await page.screenshot({ path: 'buddy-screenshot.png', fullPage: true, timeout: 5000 });

    await browser.close();
})();

// const browser = await puppeteer.launch({ headless: false });

// const page = await browser.newPage();

// await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36")


// await page.goto("https://uk.mansionbet.com/sports/american-football/nfl/", { waitUntil: 'networkidle0' });



// await page.screenshot({
//     path: "./screenshot.jpg",
//     type: "jpeg",
//     fullPage: true
// });

//let data = await page.$$eval(".page-header-main-navi-link");

// console.log(data);

// await browser.close();