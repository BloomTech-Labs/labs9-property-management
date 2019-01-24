import React, { Component } from 'react';
import Layout from '../layout/Layout';
import { Route, Redirect, Switch } from 'react-router-dom';
import DashboardPage from './dashboard/DashboardPage';
import PropertiesPage from './properties/Properties';
import WorkOrders from './workorders/WorkOrders';
import SettingsPage from './settings/SettingsPage';
import Billing from './billing/Billing';
import Tenants from './tenants/Tenants';
import Dashboard from '@material-ui/icons/Dashboard';
import Business from '@material-ui/icons/Business';
import Assignment from '@material-ui/icons/Assignment';
import People from '@material-ui/icons/People';
import Settings from '@material-ui/icons/Settings';
import CreditCard from '@material-ui/icons/CreditCard';
import { AuthUserContext } from '../session';

const links = [
  { name: 'Dashboard', url: 'admin', icon: <Dashboard /> },
  {
    name: 'Properties',
    url: 'admin/properties',
    icon: <Business />,
  },
  {
    name: 'Work Orders',
    url: 'admin/work-orders',
    icon: <Assignment />,
  },
  { name: 'Tenants', url: 'admin/tenants', icon: <People /> },
  { name: 'Billing', url: 'admin/billing', icon: <CreditCard /> },
  { name: 'Settings', url: 'admin/settings', icon: <Settings /> },
];

class Admin extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {({ authUser }) =>
          authUser ? (
            <Layout links={links}>
              <Switch>
                <Route exact path="/admin" component={DashboardPage} />
                <Route
                  exact
                  path="/admin/properties"
                  component={PropertiesPage}
                />
                <Route exact path="/admin/work-orders" component={WorkOrders} />
                <Route exact path="/admin/tenants" component={Tenants} />
                <Route exact path="/admin/settings" component={SettingsPage} />
                <Route exact path="/admin/billing" component={Billing} />
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

export default Admin;
