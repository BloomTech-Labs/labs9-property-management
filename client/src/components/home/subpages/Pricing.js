import React, { Component } from 'react';
import styled from 'styled-components';
import Nav from '../Nav';
import Footer from '../Footer';
import {
  Hero,
  HeroGroup,
  HeroGroupH1,
  HeroP,
  HeroAnimation,
} from '../HomeStyles';
import { GlobalStyle } from '../../../styles/Styles';
import { Check } from '@material-ui/icons';

const CheckMark = styled(Check)`
  color: ${props => (props.basic ? '#1b1b1b' : '#5f29ff')};
  margin-right: 4px;
  padding-bottom: 2px;
  font-size: 22px !important;
`;

const PricingCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 48px;
  padding-top: 32px;
  opacity: 0;
  animation: ${HeroAnimation};
  animation-duration: 2s;
  animation-delay: 0.01s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
  @media (max-width: 680px) {
    flex-direction: ${props => (props.mobile ? 'column' : 'row')};
    align-items: center;
    padding-top: 0px;
  }
`;

const PricingCard = styled.div`
  display: flex;
  border: 1px solid #eee;
  padding: 20px 24px;
  flex-direction: column;
  height: 450px;
  width: 325px;
  margin: 16px;
  border-radius: 4px;
  background: ${props => (props.bestvalue ? 'white' : '#fbfbfb')};
`;
const PricingTextLine = styled.div`
  display: block;
  color: #333;
  display: flex;
  align-items: center;
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
    line-height: 2.4 !important;
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
              No credit card required to sign up. Start managing your properties
              today.
            </HeroP>
          </HeroGroup>
          <PricingCardContainer mobile>
            <PricingCard bestvalue>
              <PricingTextLine className="planName">Basic</PricingTextLine>
              <PricingTextLine className="planNameSubText">
                Free
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                <CheckMark /> Up to 50 tenants
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                <CheckMark /> Up to 10 properties
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                <CheckMark /> SMS maintenance alerts
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                <CheckMark /> Accept rent payments
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                <CheckMark /> Live chat support
              </PricingTextLine>
            </PricingCard>
            <PricingCard>
              <PricingTextLine className="planName">Growth</PricingTextLine>
              <PricingTextLine className="planNameSubText">
                $39.99 / admin / month
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                <CheckMark /> Unlimited tenants
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                <CheckMark /> Unlimited properties
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                <CheckMark /> Unlimited SMS maintenance alerts
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                <CheckMark /> Accept rent payments
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                <CheckMark /> Rent payment reminders
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                <CheckMark /> 24/7 Live chat support
              </PricingTextLine>
              <PricingTextLine className="planLineItem">
                <CheckMark /> 24/7 Phone support
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
