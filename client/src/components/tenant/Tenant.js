import React, { Component } from "react";
import { Route } from 'react-router-dom'
import StripeTest from './payments/StripeTest'
import StripeConnectTest from './payments/StripeConnectTest'

class Tenant extends Component {
  render() {
    return (
    <>
    <Route exact path="/tenant/stripe-test" component={StripeTest} />
    <Route exact path="/tenant/stripe-connect-test" component={StripeConnectTest} />
    </>
    )
  }
}

export default Tenant;
