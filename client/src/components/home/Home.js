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
  InfoSection,
  IconContainer,
} from './HomeStyles';
import { Build, Payment } from '@material-ui/icons';
import House from '@material-ui/icons/Home';
import Users from '@material-ui/icons/People';
import appshot from '../../images/app-shot.svg';
import appshotmidfi from '../../images/app-shot-mid-fi.svg';
import { GlobalStyle } from '../../styles/Styles';

class Home extends Component {
  render() {
    const role = this.props.authUserRole;
    const classes = this.props;

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
            <InfoSection>
              <IconContainer>
                <House color="primary" fontSize="inherit" />
              </IconContainer>
              <IconContainer>
                <Users color="primary" fontSize="inherit" />
              </IconContainer>
              <IconContainer>
                <Build color="primary" fontSize="inherit" />
              </IconContainer>
              <IconContainer>
                <Payment color="primary" fontSize="inherit" />
              </IconContainer>
            </InfoSection>
          </Hero>
          <Footer />
        </>
      );
    }
  }
}

export default withAuthUser(Home);
