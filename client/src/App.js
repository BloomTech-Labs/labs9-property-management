import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/home/Home';
import Pricing from './components/home/subpages/Pricing';
import LoginPage from './components/auth/LoginPage';
import Signup from './components/auth/Signup';
import Setup from './components/auth/Setup';
import Admin from './components/admin/Admin';
import Tenant from './components/tenant/Tenant';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withAuthentication } from './components/session';
import 'typeface-roboto';

// testing theme initialization
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#b394ff',
      main: '#5f29ff',
      dark: '#4d1fd6',
      contrastText: '#fff',
    },
    secondary: {
      main: '#D4D4D4',
    },
    background: {
      default: '#EDEDEE',
    },
  },
  typography: {
    useNextVariants: true, // Required to prevent Material-UI deprecation warning
  },
  textSecondary: {
    color: '#D4D4D4',
  },
});

class App extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="auth">
        <Route exact path="/" component={Home} />
        <Route exact path="/pricing" component={Pricing} />
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={Signup} />
          <Route path="/setup" component={Setup} />
          <Route path="/admin" component={Admin} />
          <Route path="/tenant" component={Tenant} />
        </MuiThemeProvider>
        {/* <Route path="/product" component={Product} /> 
            <Route path="/pricing" component={Pricing} />
        */}
      </div>
    );
  }
}

export default withAuthentication(App);
