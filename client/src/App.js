import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Admin from "./components/admin/Admin";
import Tenant from "./components/tenant/Tenant";
import "typeface-roboto";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: ""
    };
  }

  render() {
    return (
      <div className="auth">
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/admin" component={Admin} />
        <Route path="/tenant" component={Tenant} />
        {/* <Route path="/product" component={Product} /> 
            <Route path="/pricing" component={Pricing} />
        */}
      </div>
    );
  }
}

export default App;
