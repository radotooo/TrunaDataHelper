import axios from 'axios';
import { renameShortNames } from '../../data/replaceData.js';

const getDateFromApi = async (week) => {
  try {
    const response = await axios.get(
      `https://scores.axis6.ca/v1/nfl/2020/${week}`
    );
    const { data } = response;
    return data;
  } catch (error) {
    return error;
  }
};

const parseDataFromApi = async (week) => {
  let result = [];
  try {
    let data = await getDateFromApi(week);
    if (data) {
      for (const matches in data) {
        let currentMatch = data[matches];

        if (currentMatch.Home && currentMatch.Away) {
          let parsedMatchValues = {
            away: renameShortNames[currentMatch.Away],
            home: renameShortNames[currentMatch.Home],
            date: currentMatch.Date,
          };
          result.push(parsedMatchValues);
        } else {
          continue;
        }
      }
    }
  } catch (error) {
    return error;
  }
  return result;
};
//get shedule for next two game weeks and save it to file
const getDataForCurrentAndNextWeek = async (week) => {
  try {
    let currentWeek = await parseDataFromApi(week);
    let nextWeek = await parseDataFromApi(week + 1);
    return [currentWeek, nextWeek].flat();
  } catch (error) {
    return error;
  }
};

export { getDataForCurrentAndNextWeek };
