import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  BackToHomeContainer,
  BackToHomeLink,
  LoginOrSignupFormLink,
  AuthLogo,
  StyledH1,
  BackArrow,
} from './AuthStyles';
import testlogo from '../../images/test-logo.svg';

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

const INTIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class Signup extends Component {
  state = { ...INTIAL_STATE };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    //const { name, email, passwordOne, passwordTwo, error } = this.state;

    return (
      <>
        <BackToHomeContainer>
          <BackToHomeLink to="/">
            <BackArrow />
            <AuthLogo src={testlogo} width="32" />
          </BackToHomeLink>
          <BackToHomeLink to="/login">
            Have an account?
            <LoginOrSignupFormLink> Login here</LoginOrSignupFormLink>
          </BackToHomeLink>
        </BackToHomeContainer>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <StyledH1>Sign Up</StyledH1>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">Full Name</InputLabel>
                <Input
                  id="name"
                  name="name"
                  autoComplete="Name"
                  autoFocus
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="passwordOne">Password</InputLabel>
                <Input
                  name="passwordOne"
                  type="password"
                  id="passwordOne"
                  autoComplete="current-password"
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="passwordOne">Confirm Password</InputLabel>
                <Input
                  name="passwordTwo"
                  type="password"
                  id="passwordTwo"
                  autoComplete="current-password"
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </form>
          </Paper>
        </main>
      </>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
