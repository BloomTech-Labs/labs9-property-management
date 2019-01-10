import React, { Component } from "react";
import SidebarAdmin from "./SidebarAdmin";
import Grid from "@material-ui/core/Grid";
import Footer from "./Footer";
class Layout extends Component {
  state = {};
  render() {
    return (
      <Grid container>
        <Grid item xs={2}>
          <SidebarAdmin />
        </Grid>
        <Grid item xs={9}>
          {this.props.children}
        </Grid>
        <Footer />
      </Grid>
    );
  }
}

export default Layout;
