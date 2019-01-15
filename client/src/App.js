import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./components/home/Home";
import LoginPage from "./components/auth/LoginPage";
import Signup from "./components/auth/Signup";
import Admin from "./components/admin/Admin";
import Tenant from "./components/tenant/Tenant";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";
import { withAuthentication } from "./components/session";
import "typeface-roboto";

// testing theme initialization
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#b394ff",
      main: "#5f29ff",
      dark: "#4d1fd6",
      contrastText: "#fff"
    }
    // secondary: {
    //   light: '#ff7961',
    //   main: '#f44336',
    //   dark: '#ba000d',
    //   contrastText: '#000',
    // },
  }
});

class App extends Component {
  render() {
    return (
      <div className="auth">
        <Route exact path="/" component={Home} />
        <MuiThemeProvider theme={theme}>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={Signup} />
          <Route path="/admin" component={Admin} />
          <Route path="/tenant" component={Tenant} />
        </MuiThemeProvider>
        {/* <Route path="/product" component={Product} /> 
            <Route path="/pricing" component={Pricing} />
        */}
      </div>
    );
  }
}

export default withAuthentication(App);
