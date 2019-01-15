import React, { Component } from "react";
import { Route } from 'react-router-dom'
import StripeTest from './payments/StripeTest'

class Tenant extends Component {
  render() {
    return (
    <>
    <Route exact path="/tenant/stripe-test" component={StripeTest} />
    </>
    )
  }
}

export default Tenant;
