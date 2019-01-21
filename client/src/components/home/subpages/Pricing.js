import React, { Component } from 'react';
import styled from 'styled-components';
import Nav from '../Nav';
import Footer from '../Footer';
import { Hero, HeroGroup, HeroGroupH1, HeroP } from '../HomeStyles';
import { GlobalStyle } from '../../../styles/Styles';

const PricingCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 48px;
  padding-top: 32px;
  @media (max-width: 680px) {
    flex-direction: ${props => (props.mobile ? 'column' : 'row')};
    align-items: center;
    padding-top: 0px;
  }
`;

const PricingCard = styled.div`
  display: flex;
  border: 1px solid #eee;
  padding: 24px;
  flex-direction: column;
  height: 375px;
  width: 275px;
  padding: 24px;
  margin: 16px;
  border-radius: 4px;
  background: ${props => (props.bestvalue ? 'white' : '#fbfbfb')};
`;
const PricingTextLine = styled.div`
  display: block;
  color: #333;
  &.planName {
    font-size: 32px;
    font-weight: 700;
  }
  &.planNameSubText {
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 24px;
    color: #777d8c;
  }
  &.planLineItem {
    font-size: 16px;
    font-weight: 400;
    color: #2c303b;
    line-height: 2.2;
  }
`;

// Unlimited queries
// Unlimited folders
// 1 dashboard
// No scheduled reports for email and Slack
// No team members

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
            <PricingCard bestvalue>
              <PricingTextLine className="planName">Basic</PricingTextLine>
              <PricingTextLine className="planNameSubText">
                Free
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                Unlimited queries
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                No scheduled reports for email
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                Up to 10 properties
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                SMS maintenance alerts
              </PricingTextLine>
            </PricingCard>
            <PricingCard>
              <PricingTextLine className="planName">Growth</PricingTextLine>
              <PricingTextLine className="planNameSubText">
                $10 / admin / month
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                Unlimited queries
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                No scheduled reports for email
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                Up to 10 properties
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                SMS maintenance alerts
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                Some more info here
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                Another great free feature
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                SMS maintenance alerts
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                Some more info here
              </PricingTextLine>
            </PricingCard>
          </PricingCardContainer>
        </Hero>
        <Footer />
      </>
    );
  }
}

export default Pricing;
