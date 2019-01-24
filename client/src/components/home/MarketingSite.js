import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from './Nav';
import HomePage from './HomePage';
import PricingPage from './PricingPage';
import { GlobalStyle } from '../../styles/Styles';

class MarketingSite extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Nav />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/pricing" component={PricingPage} />
      </>
    );
  }
}

export default MarketingSite;
