import React, { Component } from 'react';
import Nav from '../Nav';
import { Hero, HeroGroup, HeroGroupH1, HeroP } from '../HomeStyles';
import { GlobalStyle } from '../../../styles/Styles';

class Pricing extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Nav />
        <Hero>
          <HeroGroup>
            <HeroGroupH1>Simple pricing</HeroGroupH1>
            <HeroP>
              Leasefront redefines the lightweight app – so that you can spend
              less time managing your property.
            </HeroP>
          </HeroGroup>
        </Hero>
      </>
    );
  }
}

export default Pricing;
