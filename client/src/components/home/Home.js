import React, { Component } from 'react';
import Nav from './Nav';
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
              Leasefront redefines the lightweight app – so that you can spend
              less time managing your property.
            </HeroP>
            <HeroA href="/">Watch the video</HeroA>
            <AppImageContainer>
              <AppImage src={appshot} />
            </AppImageContainer>
          </HeroGroup>
        </Hero>
      </>
    );
  }
}

export default Home;
