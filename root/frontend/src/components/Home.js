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
                    {events.sort((a, b) => { return new Date(a.date) - new Date(b.date) })
                        .map(x => <p> {new Date(x.date).toLocaleTimeString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>)}
                </div>
            </div>
        </div>
    )
}
