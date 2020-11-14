import puppeteer from 'puppeteer'

const browser = await puppeteer.launch();

const page = await browser.newPage();

await page.goto("https://www.nfl.com/schedules/2020/REG10/", { waitUntil: 'networkidle0' })

// await page.screenshot({ path: 'image2.png', fullPage: true })

// const text = await page.$$eval(".nfl-c-matchup-strip__left-area", elements =>
//     elements.map(x => x.textContent.trim().replace(/\s\s+/g, ' ').split(" "))
// )

const time = await page.$$eval(".nfl-c-matchup-strip__game-info", elements =>
    elements.map(x => x.textContent.trim().replace(/\s\s+/g, ' '))
)

const game = await page.$$eval(".nfl-c-matchup-strip__game > div > p > span:nth-child(3)", elements =>
    elements.map(x => x.textContent.trim())
)

let result = game.reduce(function (a, b, index, array) {
    if (index % 2 === 0)
        a.push({ home: array[index], away: array[index + 1] });
    return a;

}, [])

result.map((x, i) => { x.time = time[i].replace("EET", "").trimEnd() });
console.log(result);

await browser.close();