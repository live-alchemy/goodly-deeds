import React, { useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Clipboard from 'clipboard';

import Button from 'react-bulma-components/lib/components/button';
import Hero from 'react-bulma-components/lib/components/hero';
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Box from 'react-bulma-components/lib/components/box';
import Modal from 'react-bulma-components/lib/components/modal';
import Image from 'react-bulma-components/lib/components/image';
import Media from 'react-bulma-components/lib/components/media';
import Content from 'react-bulma-components/lib/components/content';
import Tag from 'react-bulma-components/lib/components/tag';

import './App.scss';
import Images from './img/Images.js';

dayjs.extend(customParseFormat);

function App({ days, handleBoxOpened }) {

  let today = dayjs();
  if (dayjs().date() > 25) {
    today = today.date(today.date() - 10);
  }

  const [selectedDay, setSelectedDay] = useState({ date: today.format('YYYY-M-D'), deed: '' })
  const [show, toggleShow] = useState(false)
  const [copied, toggleCopied] = useState(false)

  function handleClick (day) {
    setSelectedDay(day)
    toggleShow(true)
    let c = new Clipboard('#shareButton')
    c.on('success', function() {
      toggleCopied(true)
      setTimeout(function () {
        toggleCopied(false)
      }, 3000)
    })
    handleBoxOpened(day.date)
  }

  return (
    <Section className="container appBody">
      <Hero size="fullheight" className="adventHero">
        <Hero.Body>
          <Container className="adventBody">
            <Heading size={1}>
              The Advent of Goodly Deeds
            </Heading>
            <Heading subtitle size={3}>
              A deed a day and you're on your way
            </Heading>
            <Columns className="is-multiline">
              {days.map((day, i, days) => (
                <Columns.Column key={i} size="one-fifth">
                  {
                    dayjs(day.date, "YYYY-M-D").isSame(today, "day") ? (
                      <Box className="dayBox today" onClick={() => handleClick(day)}>
                        {day.opened ? (
                          <>
                            <Image size={128} alt="128x128" src={Images[day.img]} />
                            <Tag className="dateTag" rounded>
                              {day.number}
                            </Tag>
                          </>
                        ) : (
                          <p className="title">{day.number === 25 ? `${day.number}!` : day.number}</p>
                        )}
                      </Box>
                    ) : (day.opened || dayjs(day.date, "YYYY-M-D").isBefore(today, "day")) ? (
                      <Box className="noTransition">
                        <Media.Item renderAs="figure" position="center">
                          <Image size={128} alt="128x128" src={Images[day.img]} />
                          <Tag className="dateTag" rounded>
                            {day.number}
                          </Tag>
                        </Media.Item>
                      </Box>
                    ) : (
                      <Box className="dayBox">
                        <p className="title">{day.number === 25 ? `${day.number}!` : day.number}</p>
                      </Box>
                    )
                  }
                </Columns.Column>
              ))}
            </Columns>
            {
              <Modal show={show} closeOnBlur={true} onClose={() => toggleShow(false)} showClose={false}>
                <Modal.Card>
                  <Modal.Card.Head>
                    <Modal.Card.Title>{selectedDay.date}</Modal.Card.Title>
                    <Button className="delete" onClick={() => toggleShow(false)}></Button>
                  </Modal.Card.Head>
                  <Modal.Card.Body>
                    <Media>
                      <Media.Item renderAs="figure" position="left">
                        <Image size={64} alt="64x64" src={Images[selectedDay.img]} />
                      </Media.Item>
                      <Media.Item>
                        <Content>
                          <p>{selectedDay.deed}</p>
                        </Content>
                      </Media.Item>
                    </Media>
                  </Modal.Card.Body>
                  <Modal.Card.Foot>
                    <Button onClick={() => toggleShow(false)} className="is-danger">Close</Button>
                    <Button
                      id="shareButton"
                      className="is-link"
                      data-clipboard-text={`My good deed for today: ${selectedDay.deed}. As per #theAdventOfGoodlyDeeds: https://advent.now.sh`}
                    >
                      {copied ? "Copied!" : "Share"}
                    </Button>
                  </Modal.Card.Foot>
                </Modal.Card>
              </Modal>
            }
          </Container>
        </Hero.Body>
        <Hero.Footer style={{paddingTop: "2rem"}}>
          <small>
            {
              dayjs(today).month() !== 11 ? (
                <p>Not December? Then this app is in demo mode :) Enjoy</p>
              ) : null
            }
            <p>Check back daily using the same browser to open your next deed.</p>
            <p>Keep your streak going till X-mas!</p>
            <span style={{fontSize: "2rem"}} role="img" aria-label="ribbon">🎀</span>
          </small>
        </Hero.Footer>
      </Hero>
    </Section>
  );
}

export default App;
