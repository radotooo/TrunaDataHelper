import React, { useEffect, useState } from 'react'
import './Styles/home.css'
import axios from 'axios'


export default function Home() {

    const [events, setEvents] = useState([])
    const [gameWeek, setGameWeek] = useState()

    useEffect(() => {

        const getData = async () => {
            try {
                let dataFetch = await axios.get("http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard")
                const { data } = dataFetch;

                const { week } = data;
                const { events } = data;

                setEvents(events);
                setGameWeek(week.number)
            } catch (error) {
                console.error(error);
            }
        }
        getData();
    }, [])

    return (
        <div className="home">
            <div className="home__container">
                <div className="title">
                    <p>ESPN Game Week:{gameWeek}</p>
                </div>
                <div className="team__names">
                    {events.map(x => <p>{x.name.replace(" at ", " vs ")}</p>)}
                </div>
                <div className="team__time">
                    {events.map(x => <p>{new Date(x.date).toLocaleString()}</p>)}
                </div>
            </div>
        </div>
    )
}
