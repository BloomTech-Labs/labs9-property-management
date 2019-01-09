import React, { Component } from 'react';
import Layout from './layout/Layout';
import { Route } from 'react-router-dom';
import Properties from './properties/Properties';

class Admin extends Component {
  state = {};
  render() {
    return (
      <Layout>
        <Route exact path="/" render={props => <Properties />} />
      </Layout>
    );
  }
}

export default Admin;
