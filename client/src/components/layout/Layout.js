import React, { Component } from "react";
import SidebarAdmin from "./SidebarAdmin";
import Grid from "@material-ui/core/Grid";
import Footer from "./Footer";

class Layout extends Component {
  render() {
    return (
      <Grid container justify="center" spacing={16}>
        <SidebarAdmin links={this.props.links} />

        <Grid item xs={10}>
          {this.props.children}
        </Grid>

        <Footer />
      </Grid>
    );
  }
}

export default Layout;