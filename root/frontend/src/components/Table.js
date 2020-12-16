import React, {  useState } from 'react';
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
    marginTop:20
  },
  cell: { color: 'red'},
  boldFont: {fontWeight: 800 },
  biggerCellandFont: {
    width: 500,
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

let gameWeeksTotal = new  Array(17).fill(0)
const tableHeadData = ['GAME', 'ESPN', 'MANSION'];

export default function BasicTable() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [gameWeek, setGameWeek] = useState();

 const getData = async (data) =>{
      const mansionData = await axios.get( `http://localhost:5000/api/v1/mansion` );
      const espnData = await axios.get( `http://localhost:5000/api/v1/espn/${data}`);
      const mansion = mansionData.data;
      const espn = espnData.data;

      let result = espn.reduce((a, b) => {
        let findMansionMatch = mansion.find( (x) => x.home === b.home && x.away === b.away );
        if (findMansionMatch) {
          let result = {
            away: b.away,
            home: b.home,
            ESPN: new Date(b.date).toLocaleString([], options),
            MANSION: new Date(findMansionMatch.date).toLocaleString([],options ),
          };
          a.push(result);
        }
        return a;
      }, []);
        setEvents(result);
    };
   
  return (
    <div>
      <form onSubmit={(e)=>e.preventDefault()} >
        <label>
          <span>Pick game week: </span>
            <select
              value={gameWeek}
              onChange={(value)=>setGameWeek(value.target.value)} >
              {gameWeeksTotal.map((x,i)=> <option value={i+1}>{i+1}</option>)}
            </select>
        </label>
        <button onClick={() => { getData(gameWeek) }}>Get</button>
      </form>
      <TableContainer className={classes.table} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeadData.map((value, i) => (
                <TableCell
                  className={ i === 0 ? classes.biggerCellandFont : classes.boldFont } >
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
                    className= { events.ESPN === events.MANSION  ? '' : classes.cell } >
                    {events.ESPN}
                  </TableCell>
                  <TableCell align="left">{events.MANSION}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

