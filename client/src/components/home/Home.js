import React, { Component } from 'react'
import Nav from './Nav'
import {
    Hero,
    HeroGroup,
    HeroGroupH1,
    HeroP,
    HeroA,
  } from './HomeStyles'
import { GlobalStyle } from '../../styles/Styles'


class Home extends Component {


  render() {
    return (
        <>
    <GlobalStyle />
      <Nav />
      <Hero>
      <HeroGroup>
        <HeroGroupH1>Simple property management software</HeroGroupH1>
        <HeroP>
          Next generation property management software for small businesses.
        </HeroP>
        <HeroA href="/">Watch the video</HeroA>
      </HeroGroup>
    </Hero>
      </>
    )
  }
}

export default Home
