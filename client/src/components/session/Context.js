import React from 'react';

const AuthUserContext = React.createContext(null);

export const withAuthUser = Component => props => (
  <AuthUserContext.Consumer>
    {({ authUser, authUserRole, updateAuthUserRole, authTokenRecieved }) => (
      <Component
        {...props}
        authUser={authUser}
        authUserRole={authUserRole}
        authTokenRecieved={authTokenRecieved}
        updateAuthUserRole={updateAuthUserRole}
      />
    )}
  </AuthUserContext.Consumer>
);

export default AuthUserContext;
