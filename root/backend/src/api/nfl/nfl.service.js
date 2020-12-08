import fs from 'fs';
import axios from 'axios';
import { renameShortNames } from '../../data/replaceData.js';

const parseDataFromWebsite = () => {
  let rawdata = fs.readFileSync('./src/data/scraped-data/nfl.json');
  let data = JSON.parse(rawdata);
  return data.data.viewer.league.gamesByWeek.reduce((a, b) => {
    let match = {
      time: b.gameTime
        ? new Date(b.gameTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        : 'none',
      date: b.gameTime ? new Date(b.gameTime) : 'none',
      home: b.homeTeam.fullName,
      away: b.awayTeam.fullName,
    };
    a.push(match);
    return a;
  }, []);
};

const parseDataFromApi = async () => {
  try {
    const response = await axios.get('https://scores.axis6.ca/v1/nfl/2020/14');
    let data = [];
    let result1 = JSON.stringify(response.data);

    for (const matches in response.data) {
      let currentMatch = response.data[matches];
      let parsedMatchValues = {
        date: currentMatch.Date,
        home: renameShortNames[currentMatch.Home],
        away: renameShortNames[currentMatch.Away],
      };
      data.push(parsedMatchValues);
    }
    return data;
  } catch (error) {
    return error;
  }
};

// console.log(parseDataFromWebsite());
export { parseDataFromWebsite, parseDataFromApi };
