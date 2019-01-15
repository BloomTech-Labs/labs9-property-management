import React from "react";
import AuthUserContext from "./Context";
import { withFirebase } from "../firebase";

const withAuthentication = Component => {
  class withAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        console.log(authUser);
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />;
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(withAuthentication);
};

export default withAuthentication;
