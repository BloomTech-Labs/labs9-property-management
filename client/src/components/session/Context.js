import React from 'react';

const AuthUserContext = React.createContext(null);

export const withAuthUser = Component => props => (
  <AuthUserContext.Consumer>
    {({ authUser, updateAuthUserRole }) => (
      <Component
        {...props}
        authUser={authUser}
        updateAuthUserRole={updateAuthUserRole}
      />
    )}
  </AuthUserContext.Consumer>
);

export default AuthUserContext;
