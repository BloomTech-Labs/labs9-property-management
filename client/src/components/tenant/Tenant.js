import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Layout from '../layout/Layout';
import StripeTest from './payments/StripeTest';
import StripeConnectTest from './payments/StripeConnectTest';
import TestingEndpoints from './testing/TestingEndpoints'; // test component
import Dashboard from '@material-ui/icons/Dashboard';
import Settings from '@material-ui/icons/Settings';
import CreditCard from '@material-ui/icons/CreditCard';
import Maintenance from '@material-ui/icons/PanTool';
import { AuthUserContext } from '../session';
import DashboardPage from './dashboard/Dashboard';
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
    return (
      <AuthUserContext.Consumer>
        {({ authUser }) =>
          authUser ? (
            <Layout links={links}>
              <Switch>
                <Route exact path="/tenant" component={DashboardPage} />
                <Route
                  exact
                  path="/tenant/stripe-test"
                  component={StripeTest}
                />
                <Route
                  path="/tenant/stripe-connect-test"
                  component={StripeConnectTest}
                />
                <Route exact path="/tenant/" component={Dashboard} />
                <Route
                  exact
                  path="/tenant/testing"
                  component={TestingEndpoints}
                />
                <Route
                  exact
                  path="/tenant/maintenance"
                  component={MaintenancePage}
                />
                <Route exact path="/tenant/settings" component={SettingsPage} />
              </Switch>
            </Layout>
          ) : (
            <Redirect to="/login" />
          )
        }
      </AuthUserContext.Consumer>
    );
  }
}

export default Tenant;
