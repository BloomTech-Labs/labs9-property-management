import React, { Component } from "react";
import Admin from "./components/admin/Admin";
import Tenant from "./components/tenant/Tenant";
import CssBaseline from "@material-ui/core/CssBaseline";
import "typeface-roboto";

class App extends Component {
  state = {
    isAuthenticated: false,
    isAdmin: true
  };

  render() {
    console.log(this.props);
    let route = this.state.isAdmin ? <Admin /> : <Tenant />;

    return (
      <div className="App">
        <CssBaseline />
        {route}
      </div>
    );
  }
}

export default App;
