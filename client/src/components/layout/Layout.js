import React, { Component } from 'react';
import SidebarAdmin from './Sidebar';
import Grid from '@material-ui/core/Grid';

class Layout extends Component {
  render() {
    return (
      <Grid container justify="center" spacing={16}>
        <SidebarAdmin links={this.props.links} />

        <Grid item xs={10}>
          <main>{this.props.children}</main>
        </Grid>
      </Grid>
    );
  }
}

export default Layout;
