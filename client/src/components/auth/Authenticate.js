import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "../home/Home";
import Login from "./Login";
import Signup from "./Signup";

const Authenticate = App =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loggedIn: false,
        user: ""
      };
    }

    handleLogin = () => {
      this.setState({ loggedIn: !this.state.loggedIn });
    };

    render() {
      if (this.state.loggedIn) return <App />;

      return (
        <div className="auth">
          <Route exact path="/" render={props => <Home />} />
          <Route
            path="/login"
            render={props => <Login login={this.handleLogin} />}
          />
          <Route path="/signup" render={props => <Signup />} />
          {/* <Route path="/product" render={props => <Product />} /> 
              <Route path="/pricing" render={props => <Pricing />} />
          */}
        </div>
      );
    }
  };

export default Authenticate;
