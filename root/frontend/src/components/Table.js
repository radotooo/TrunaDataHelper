import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const useStyles = makeStyles({
  table: {
    maxWidth: 1200,
  },
  cell: {
    color: 'red',
  },
  biggerCellandFont: {
    width: 500,
    fontWeight: 800,
  },
  boldFont: {
    fontWeight: 800,
  },
});

const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};
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

const parseData = (formatedData, mansionData, nflData) => {
  return formatedData.reduce((a, b) => {
    let findMansionMatch = mansionData.find(
      (x) => x.home === b.home && x.away === b.away
    );
    let findNflMatch = nflData.find(
      (x) => x.home === b.home && x.away === b.away
    );

    if (findMansionMatch) {
      let result = {
        away: b.away,
        home: b.home,
        ESPN: new Date(b.date).toLocaleString([], options),
        MANSION: new Date(findMansionMatch.date).toLocaleString([], options),
        NFL: new Date(findNflMatch.date).toLocaleString([], options),
      };
      a.push(result);
    }
    return a;
  }, []);
};

const tableHeadData = ['GAME', 'ESPN', 'MANSION', 'NFL'];
export default function BasicTable() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  // const [gameWeek, setGameWeek] = useState();
  // const [mansion, setMansion] = useState([]);

  const gg = () => {
    let ChirpChirp = new Audio('546671__cbj-student__breaking-glass-mix.wav');
    ChirpChirp.play();
  };

  useEffect(() => {
    const getData = async () => {
      let dataFetch = await axios.get(
        'http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard'
      );

      let mansionFetch = await axios.get(
        'http://localhost:5000/api/v1/mansion'
      );
      let nflFetch = await axios.get('http://localhost:5000/api/v1/nfl');

      let { events } = dataFetch.data;
      let mansionData = mansionFetch.data;
      let nflData = nflFetch.data;
      let formatedData = formatData(events);

      let result = parseData(formatedData, mansionData, nflData);
      // console.log(result);
      setEvents(result);
      console.log(mansionData);
      console.log(nflData);
      console.log(formatedData);
    };
    getData();
  }, []);

  //!  todo imash bug kato tursish da sravnqvash otborite tesi ot menshuna imat poveche otbori i dava error
  //!  moje da sortirash tezi na spn i da tursih drygite dali suvpadata

  return (
    <div>
      <TableContainer className={classes.table} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeadData.map((value, i) => (
                <TableCell
                  align="rignt"
                  className={
                    i === 0 ? classes.biggerCellandFont : classes.boldFont
                  }
                >
                  {value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {events
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((events) => (
                <TableRow>
                  <TableCell component="th" scope="row" style={{ width: 150 }}>
                    {events.away + ' vs ' + events.home}
                  </TableCell>
                  <TableCell
                    align="left"
                    className={
                      events.ESPN === events.MANSION &&
                      events.ESPN === events.NFL
                        ? ''
                        : classes.cell
                    }
                  >
                    {events.ESPN}
                  </TableCell>
                  <TableCell align="left">{events.MANSION}</TableCell>
                  <TableCell align="left">{events.NFL}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
