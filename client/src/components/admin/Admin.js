import React, { Component } from "react";
import Layout from "./layout/Layout";
import { Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Properties from "./properties/Properties";
import WorkOrders from "./workorders/WorkOrders";
import Settings from "./settings/Settings";
import Billing from "./billing/Billing";
import NewTenant from "./tenants/NewTenants";

class Admin extends Component {
  state = {};
  render() {
    return (
      <Layout>
        <CssBaseline />
        <Route exact path="/admin/properties" component={Properties} />
        <Route exact path="/admin/work-orders" component={WorkOrders} />
        <Route exact path="/admin/tenants" component={NewTenant} />
        <Route exact path="/admin/settings" component={Settings} />
        <Route exact path="/admin/billing" component={Billing} />
      </Layout>
    );
  }
}

export default Admin;
