import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import "typeface-roboto";
import Admin from "./components/admin/Admin";
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { Route } from "react-router-dom";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class App extends Component {
  render() {
    console.log(this.props);

    return (
      <div className="App">
        <CssBaseline />
        <Admin />
        <div>
          {/*<Route exact path='/orders' render={props => </>}/>*/}
          {/*<Route exact path='/tenants' render={props => </>}/>*/}
          {/*<Route exact path='/billing' render={props => </>}/>*/}
          {/*<Route exact path='/settings' render={props => </>}/>*/}
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
