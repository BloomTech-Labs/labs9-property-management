import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import StripeTest from './payments/StripeTest';
import StripeConnectTest from './payments/StripeConnectTest';
import TestingEndpoints from './testing/TestingEndpoints';

// test comment

class Tenant extends Component {
  render() {
    return (
      <>
        <Route exact path="/tenant/stripe-test" component={StripeTest} />
        <Route
          path="/tenant/stripe-connect-test"
          component={StripeConnectTest}
        />
        <Route exact path="/tenant/testing" component={TestingEndpoints} />
      </>
    );
  }
}

export default Tenant;
