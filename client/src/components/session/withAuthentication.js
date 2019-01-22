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
        authUserRole: JSON.parse(localStorage.getItem('authUserRole')),
        updateAuthUserRole: this.updateAuthUserRole,
      };
    }

    updateAuthUserRole = authUserRole => {
      console.log('update: ', authUserRole);
      localStorage.setItem('authUserRole', JSON.stringify(authUserRole));
      this.setState({ authUserRole: authUserRole });
    };

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.props.firebase.auth.currentUser.getIdToken().then(idToken => {
            console.log('Auth Token: ', idToken);

            axios.defaults.headers.common['Authorization'] = idToken;

            axios.get('/api/users/verifyregistration').then(response => {
              localStorage.setItem('authUser', JSON.stringify(authUser));
              localStorage.setItem(
                'authUserRole',
                JSON.stringify(response.data.role)
              );
              this.setState({
                authUser: authUser,
                authUserRole: response.data.role,
              });
            });
          });
        } else {
          localStorage.setItem('authUser', null);
          localStorage.setItem('authUserRole', null);
          this.setState({ authUser: null, authUserRole: null });
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
