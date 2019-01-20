import React from 'react';
import AuthUserContext from './Context';
import { withFirebase } from '../firebase';
import axios from 'axios';

const withAuthentication = Component => {
  class withAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
        updateAuthUserRole: this.updateAuthUserRole,
      };
    }

    updateAuthUserRole = role => {
      const authUser = { ...this.state.authUser, role: role };

      localStorage.setItem('authUser', JSON.stringify(authUser));
      this.setState({ authUser: authUser });
    };

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.props.firebase.auth.currentUser.getIdToken().then(idToken => {
            console.log('Auth Token: ', idToken);
            axios.defaults.headers.common['Authorization'] = idToken;
            axios.get('/api/users/verifyregistration').then(role => {
              authUser.role = role;
              localStorage.setItem('authUser', JSON.stringify(authUser));
              this.setState({ authUser });
            });
          });
        } else {
          localStorage.setItem('authUser', null);
          this.setState({ authUser: null });
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(withAuthentication);
};

export default withAuthentication;
