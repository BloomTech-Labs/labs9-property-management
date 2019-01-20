import React from 'react';

const AuthUserContext = React.createContext(null);

export const withAuthUser = Component => props => (
  <AuthUserContext.Consumer>
    {({ authUser, authUserRole, updateAuthUserRole }) => (
      <Component
        {...props}
        authUser={authUser}
        authUserRole={authUserRole}
        updateAuthUserRole={updateAuthUserRole}
      />
    )}
  </AuthUserContext.Consumer>
);

export default AuthUserContext;
