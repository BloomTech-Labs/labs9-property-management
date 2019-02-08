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
  IconGroup,
  HeroGroupH3,
  HeroP2,
} from './HomeStyles';
import { Build } from '@material-ui/icons';
import House from '@material-ui/icons/Home';
import Users from '@material-ui/icons/People';
import bothdash from '../../images/bothdash.png';
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
              <AppImage src={bothdash} />
            </AppImageContainer>
            <InfoSection>
              <IconGroup>
                <IconContainer>
                  <House fontSize="inherit" />
                  <HeroGroupH3>Property Management</HeroGroupH3>
                  <HeroP2>
                    Whether you are a property owner or manager, PropertEAZY
                    includes all the features you need to operate efficiently.
                  </HeroP2>
                </IconContainer>
                <IconContainer>
                  <Users fontSize="inherit" />
                  <HeroGroupH3>Manage tenants</HeroGroupH3>
                  <HeroP2>
                    Manage lease agreements. Collect rent payments instantly
                    using Stripe.
                  </HeroP2>
                </IconContainer>
                <IconContainer>
                  <Build fontSize="inherit" />
                  <HeroGroupH3>Maintenance requests</HeroGroupH3>
                  <HeroP2>
                    Keeping property in safe and habitable condition is key.
                    Receive work orders from your tenants instantly.
                  </HeroP2>
                </IconContainer>
                {/* <IconContainer>
                  <Payment fontSize="inherit" />
                  <HeroGroupH3>Online payments</HeroGroupH3>
                  <HeroP2>
                    Stripe is integrated to the PropertEAZY platform. Stripe
                    software allows individuals and businesses to receive
                    payments over the Internet.
                  </HeroP2>
                </IconContainer> */}
              </IconGroup>
            </InfoSection>
          </Hero>
          <Footer />
        </>
      );
    }
  }
}

export default withAuthUser(Home);
