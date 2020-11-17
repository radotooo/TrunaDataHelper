import puppeteer from 'puppeteer'
import { renameTeams } from './replaceData.js'

const browser = await puppeteer.launch();

const page = await browser.newPage();

await page.goto("https://www.nfl.com/schedules/", { waitUntil: 'networkidle0' });

const time = await page.$$eval(".nfl-c-matchup-strip__game-info", elements =>
    elements.map(x => x.textContent.trim().replace(/\s\s+/g, ' ')));

let data = await page.$$eval(".nfl-c-matchup-strip__game > div > p > span:nth-child(3)", elements =>
    elements.map(x => x.textContent.trim()));

let renamedTeams = data.map(x => x = renameTeams[x]);

let mapData = renamedTeams.reduce(function (a, b, index, array) {
    if (index % 2 === 0)
        a.push({ home: array[index], away: array[index + 1] });
    return a;
}, []);

mapData.map((x, i) => { x.time = time[i].replace("EET", "").trimEnd() });
console.log(mapData);

await browser.close();