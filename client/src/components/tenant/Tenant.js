import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Layout from '../layout/Layout';
import StripeTest from './payments/StripeTest';
import TestingEndpoints from './testing/TestingEndpoints'; // test component
import Dashboard from '@material-ui/icons/Dashboard';
import Settings from '@material-ui/icons/Settings';
import CreditCard from '@material-ui/icons/CreditCard';
import Maintenance from '@material-ui/icons/Build';
import { withAuthUser } from '../session';
import DashboardPage from './dashboard/Dashboard';
import PaymentPage from './payments/Payments';
import SettingsPage from './settings/Settings';
import MaintenancePage from './maintenance/Maintenance';

const links = [
  { name: 'Dashboard', url: 'tenant', icon: <Dashboard /> },
  {
    name: 'Payments',
    url: 'tenant/payments',
    icon: <CreditCard />,
  },
  {
    name: 'Maintenance',
    url: 'tenant/maintenance',
    icon: <Maintenance />,
  },
  { name: 'Settings', url: 'tenant/settings', icon: <Settings /> },
];

class Tenant extends Component {
  render() {
    const role = this.props.authUserRole;

    if (this.props.authUser && role === 'tenant') {
      return (
        <Layout links={links}>
          <Switch>
            <Route exact path="/tenant" component={DashboardPage} />
            <Route exact path="/tenant/payments" component={PaymentPage} />
            <Route exact path="/tenant/stripe-test" component={StripeTest} />
            <Route exact path="/tenant/" component={Dashboard} />
            <Route exact path="/tenant/testing" component={TestingEndpoints} />
            <Route
              exact
              path="/tenant/maintenance"
              component={MaintenancePage}
            />
            <Route exact path="/tenant/settings" component={SettingsPage} />
          </Switch>
        </Layout>
      );
    } else if (this.props.authUser && role === 'owner') {
      return <Redirect to="/admin" />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default withAuthUser(Tenant);
