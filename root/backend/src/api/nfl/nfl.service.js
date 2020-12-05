import fs from 'fs';

const parseData = () => {
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
export { parseData };
