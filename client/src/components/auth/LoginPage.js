import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthUserContext } from '../session';
import { compose } from 'recompose';
import { withFirebase } from '../firebase';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
/*
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel"; */
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  BackToHomeContainer,
  BackToHomeLink,
  LoginOrSignupFormLink,
  AuthLogo,
  StyledH1,
  GoogleContainer,
  GoogleLogo,
} from './AuthStyles';
import { KeyboardBackspace } from '@material-ui/icons';
import testlogo from '../../images/test-logo.svg';
import google from '../../images/google.svg';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component {
  state = {
    error: null,
  };

  loginGoogle = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        console.log('login: ', socialAuthUser);
        this.setState({ error: null });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { classes } = this.props;

    return (
      <AuthUserContext.Consumer>
        {({ authUser, authUserRole }) => {
          if (!authUser) {
            return (
              <>
                <BackToHomeContainer>
                  <BackToHomeLink to="/">
                    <KeyboardBackspace />
                    <AuthLogo src={testlogo} width="32" />
                  </BackToHomeLink>
                  <BackToHomeLink to="/signup">
                    New user?
                    <LoginOrSignupFormLink> Sign up here</LoginOrSignupFormLink>
                  </BackToHomeLink>
                </BackToHomeContainer>
                <main className={classes.main}>
                  <Paper className={classes.paper}>
                    {/* <img src={testlogo} width="32" /> */}
                    <StyledH1>Login</StyledH1>
                    <form className={classes.form}>
                      {/*            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me" /> 
*/}
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.loginGoogle}
                      >
                        <GoogleContainer>
                          <GoogleLogo src={google} height="16px" />
                        </GoogleContainer>
                        Login with Google
                      </Button>
                    </form>
                  </Paper>
                </main>
              </>
            );
          } else if (authUserRole === 'admin') {
            return <Redirect to="/admin" />;
          } else if (authUserRole === 'tenant') {
            return <Redirect to="/tenant" />;
          } else {
            return <Redirect to="/setup" />;
          }
        }}
      </AuthUserContext.Consumer>
    );
  }
}

const LoginPage = compose(
  withFirebase,
  withStyles(styles)
)(Login);

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default LoginPage;
