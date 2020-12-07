import fs from 'fs';
import convert from 'xml-js';
import axios from 'axios';

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
    const response = await axios.get(
      'https://static.nfl.com/ajax/scorestrip?season=2020&seasonType=REG&week=13'
    );

    let result1 = convert.xml2json(response.data, { compact: true, spaces: 4 });

    console.log(result1);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const reddit = async () => {
  try {
    const response = await axios.get('https://scores.axis6.ca/v1/nfl/2020/14');

    let result1 = JSON.stringify(response.data);

    for (const key in response.data) {
      let position = response.data[key];
      // let result = JSON.parse(position);
      console.log(
        new Date(position.Date).toLocaleString() +
          ' ' +
          position.Away +
          ' ' +
          position.Home
      );
      // console.log(position.Home);
      // console.log(position.Away);
    }

    // console.log(response.data.map((x) => x.Date));
  } catch (error) {
    console.error(error);
  }
};

reddit();
export { parseDataFromWebsite };
