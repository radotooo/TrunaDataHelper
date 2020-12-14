import axios from 'axios';

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
  try {
    const currenntWeekData = await axios.get(
      `http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=${week}`
    );
    const { data } = currenntWeekData;
    return data;
  } catch (error) {
    return error;
  }
};

const getAndParseData = async (week) => {
  console.log('inside before try catch');
  try {
    const data = await getData(week);
    let { events } = data;
    let parsedData = formatData(events);
    return parsedData;
  } catch (error) {
    return error;
  }
};

//get data from api for both weeks and save it to file
const getDataForCurrentAndNextWeek = async (week) => {
  try {
    let currentWeek = await getAndParseData(week);
    let nextWeek = await getAndParseData(Number(week) + 1);
    return [currentWeek, nextWeek].flat();
  } catch (error) {
    return error;
  }
};

export { getDataForCurrentAndNextWeek };
