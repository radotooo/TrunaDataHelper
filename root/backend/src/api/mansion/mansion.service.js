import fs from 'fs';

const parseData = () => {
  let rawdata = fs.readFileSync('./src/data/scraped-data/mansion.json');
  let data = JSON.parse(rawdata);

  return data.reduce((a, b) => {
    let match = {
      time: new Date(b.startEventDate).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      date: new Date(b.startEventDate),
      home: b.participants[0].name,
      away: b.participants[1].name,
    };
    a.push(match);
    return a;
  }, []);
};

// console.log(parseData());

export { parseData };
