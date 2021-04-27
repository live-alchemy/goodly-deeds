import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { days, deeds } from './days.js';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import Button from 'react-bulma-components/lib/components/button';
import Content from 'react-bulma-components/lib/components/content';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Section from 'react-bulma-components/lib/components/section';
import Media from 'react-bulma-components/lib/components/media';
import Image from 'react-bulma-components/lib/components/image';

import App from './App.js';
import team from 'img/team.png';

dayjs.extend(customParseFormat)

export default function Welcome () {
  const [ready, toggleReady] = useState(false);
  const [dates, setDates] = useState([])
  const [returning, toggleReturning] = useState(false)
  const [start, toggleStart] = useState(false)
  const [ls, toggleLS] = useState(true);

  useEffect(() => {
    const ls = window.localStorage
    if (ls) {
      if (ls.getItem("adventStarted") === "true") {
        let dates = JSON.parse(ls.getItem("days"))
        toggleReady(true)
        setDates(dates)
        toggleReturning(true)
      } else {
        let dates = days.map((day, index) => {
          let min = 0
          let int = Math.random() * (deeds.length - min) + min;
          let deedObj = deeds.splice(int, 1)[0]
          // set to current month and year for year round demo purposes
          const date = dayjs(day.date, "YYYY-M-D").year(dayjs().year()).month(dayjs().month()).format('YYYY-M-D')
          return ({
            ...day,
            date,
            ...deedObj,
            opened: false
          })
        })
        ls.setItem("days", JSON.stringify(dates))
        setDates(dates)
        toggleReady(true)
      }
    } else toggleLS(false)
  }, [])

  function handleStartClick () {
    let ls = window.localStorage
    ls.setItem("adventStarted", "true")
    toggleStart(true)
  }

  function handleBoxOpened (date) {
    const ls = window.localStorage
    let dates = JSON.parse(ls.getItem("days"))
    let index = dates.findIndex(d => d.date === date)
    dates.splice(index, 1, Object.assign({}, dates[index], { opened: true }))
    ls.setItem("days", JSON.stringify(dates))
    setDates(dates)
  }

  return !ls ? (
    <Section>
      <h2>Oh no! Local storage isn't available in your browser. This won't work very well...</h2>
    </Section>
  ) : start || returning ? (
    <App days={dates} handleBoxOpened={handleBoxOpened} />
  ) : (
    <>
      <Section className="initParentSection">
        <Container>
          <Columns className="is-vcentered" >
            <Columns.Column size={4}>
              <Media.Item renderAs="figure" position="center">
                <Image alt="A team of people decorating a christmas tree" src={team} />
              </Media.Item>
            </Columns.Column>
            <Columns.Column size={7} className="level">
              <Content>
                <h2>Welcome to the <b>Advent of Goodly Deeds</b></h2>
                <p>Thanks for checking out this project <span role="img" aria-label="thank you">🙏</span></p>
                <p>Hit start to load your unique <b>advent calendar</b> <span role="img" aria-label="christmas tree">🎄</span></p>
                <p>Each day you'll be presented with a new <u>good deed</u> <span role="img" aria-label="shooting star">💫</span></p>
                <p>Try to do them all; let us know how it goes! <span role="img" aria-label="praise hands">🙌</span></p>
                <Button disabled={!ready} onClick={handleStartClick} className="is-primary">Start!</Button>
              </Content>
            </Columns.Column>
          </Columns>
        </Container>
        <p className="credits">
          a <strong>tall</strong>&<small><u>small</u></small> design
        </p>
      </Section>
    </>
  )
};
