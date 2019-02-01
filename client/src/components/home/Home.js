import React, { Component } from 'react';
import { withAuthUser } from '../session';
import { Redirect } from 'react-router-dom';
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
import updatedappshot from '../../images/updateAppshot.svg';
import { GlobalStyle } from '../../styles/Styles';

class Home extends Component {
  render() {
    const role = this.props.authUserRole;

    if (this.props.authUser && role === 'owner') {
      return <Redirect to="/admin" />;
    } else if (this.props.authUser && role === 'tenant') {
      return <Redirect to="/tenant" />;
    } else {
      return (
        <>
          <GlobalStyle />
          <Nav />
          <Hero>
            <HeroGroup>
              <HeroGroupH1>Insanely simple property management</HeroGroupH1>
              <HeroP>
                Our all-in-one solution gives you the features you need to
                manage your properties, right in your pocket.
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
}

export default withAuthUser(Home);
