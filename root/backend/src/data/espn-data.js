import axios from 'axios';
import fs from 'fs';
//site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=15

const formatData = (data) => {
  return data.reduce((a, b) => {
    let splitToHomeAndAway = b.name.split(' at ');

    let match = {
      away:
        splitToHomeAndAway[0] === 'Washington '
          ? 'Washington Football Team'
          : splitToHomeAndAway[0],
      home:
        splitToHomeAndAway[1] === 'Washington '
          ? 'Washington Football Team'
          : splitToHomeAndAway[1],
      date: b.date,
    };

    a.push(match);
    return a;
  }, []);
};

const getData = async (week) => {
  console.log('inside before try catch');
  try {
    const currenntWeekData = await axios.get(
      `http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=${week}`
    );

    let { events } = currenntWeekData.data;
    let parsedData = formatData(events);

    return parsedData;
  } catch (error) {
    return error;
  }
};

//get data from api for both weeks and save it to file
const getDataForCurrentAndNextWeek = async (week) => {
  try {
    let currentWeek = await getData(week);
    let nextWeek = await getData(week + 1);
    fs.writeFileSync(
      './scraped-data/espn.json',
      JSON.stringify([currentWeek, nextWeek].flat()) //flat into 1 big object with both weeks games
    );
  } catch (error) {
    return error;
  }
};

export default getData;
