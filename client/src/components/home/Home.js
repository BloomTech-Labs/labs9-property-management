import React, { Component } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import {
  Hero,
  HeroGroup,
  HeroGroupH1,
  HeroP,
  HeroA,
  AppImage,
  AppImageContainer,
} from './HomeStyles';
import appshot from '../../images/app-shot.svg';
import appshotmidfi from '../../images/app-shot-mid-fi.svg';
import { GlobalStyle } from '../../styles/Styles';

class Home extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Nav />
        <Hero>
          <HeroGroup>
            <HeroGroupH1>Insanely simple property management</HeroGroupH1>
            <HeroP>
              Our all-in-one solution gives you the features you need to manage
              your properties, right in your pocket.
            </HeroP>
            <HeroA href="/">Watch the video</HeroA>
          </HeroGroup>
          <AppImageContainer>
            <AppImage src={appshot} />
          </AppImageContainer>
        </Hero>
        <Footer />
      </>
    );
  }
}

export default Home;
