import React, { Component } from 'react';
import Layout from '../layout/Layout';
import { Route, Redirect, Switch } from 'react-router-dom';
import DashboardPage from './dashboard/DashboardPage';
import Properties from './properties/Properties';
import WorkOrders from './workorders/WorkOrders';
import SettingsPage from './settings/SettingsPage';
import Billing from './billing/Billing';
import NewTenant from './tenants/NewTenants';
import Dashboard from '@material-ui/icons/Dashboard';
import Business from '@material-ui/icons/Business';
import Assignment from '@material-ui/icons/Assignment';
import People from '@material-ui/icons/People';
import Settings from '@material-ui/icons/Settings';
import CreditCard from '@material-ui/icons/CreditCard';
import { AuthUserContext } from '../session';

const links = [
  { name: 'Dashboard', url: '', icon: <Dashboard color="secondary" /> },
  {
    name: 'Properties',
    url: 'properties',
    icon: <Business color="secondary" />,
  },
  {
    name: 'Work Orders',
    url: 'work-orders',
    icon: <Assignment color="secondary" />,
  },
  { name: 'Tenants', url: 'tenants', icon: <People color="secondary" /> },
  { name: 'Billing', url: 'billing', icon: <CreditCard color="secondary" /> },
  { name: 'Settings', url: 'settings', icon: <Settings color="secondary" /> },
];

class Admin extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <Layout links={links}>
              <Switch>
                <Route exact path="/admin" component={DashboardPage} />
                <Route exact path="/admin/properties" component={Properties} />
                <Route exact path="/admin/work-orders" component={WorkOrders} />
                <Route exact path="/admin/tenants" component={NewTenant} />
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
