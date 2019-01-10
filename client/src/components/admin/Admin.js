import React, { Component } from "react";
import Layout from "./layout/Layout";
import { Route } from "react-router-dom";
import Properties from "./properties/Properties";
import WorkOrders from "./workorders/WorkOrders";
import Settings from "./settings/Settings";
import Billing from "./billing/Billing";

class Admin extends Component {
  state = {};
  render() {
    return (
      <Layout>
        <Route exact path="/" render={props => <Properties />} />
        <Route exact path="/work_orders" render={props => <WorkOrders />} />
        <Route exact path="/Settings" render={props => <Settings />} />
        <Route exact path="/Billing" render={props => <Billing />} />
      </Layout>
    );
  }
}

export default Admin;
