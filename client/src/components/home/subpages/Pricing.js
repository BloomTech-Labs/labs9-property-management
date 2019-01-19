import React, { Component } from 'react';
import styled from 'styled-components';
import Nav from '../Nav';
import { Hero, HeroGroup, HeroGroupH1, HeroP } from '../HomeStyles';
import { GlobalStyle } from '../../../styles/Styles';

const PricingCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 48px;
  @media (max-width: 680px) {
    flex-direction: ${props => (props.mobile ? 'column' : 'row')};
    align-items: center;
  }
`;

const PricingCard = styled.div`
  display: flex;
  border: 1px solid #eee;
  padding: 24px;
  flex-direction: column;
  height: 400px;
  width: 300px;
  margin: 24px;
  border-radius: 4px;
  background: ${props => (props.bestvalue ? 'white' : '#f9f9f9')};
`;
const PricingTextLine = styled.div`
  display: block;
`;

class Pricing extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Nav />
        <Hero>
          <HeroGroup pricing>
            <HeroGroupH1>Simple pricing</HeroGroupH1>
            <HeroP>
              Leasefront redefines the lightweight app – so that you can spend
              less time managing your property.
            </HeroP>
          </HeroGroup>
          <PricingCardContainer mobile>
            <PricingCard bestvalue />
            <PricingCard />
          </PricingCardContainer>
        </Hero>
      </>
    );
  }
}

export default Pricing;
