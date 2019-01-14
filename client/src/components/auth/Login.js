import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  BackToHomeContainer,
  BackToHomeLink,
  LoginOrSignupFormLink,
  AuthLogo
} from "./AuthStyles";
import { KeyboardBackspace, ArrowBackIos } from "@material-ui/icons";
import testlogo from "../../images/test-logo.svg";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class Login extends Component {
  state = {
    loggedIn: false
  };

  login = () => {
    this.setState({ loggedIn: true });
  };

  render() {
    const { classes } = this.props;
    if (this.state.loggedIn) return <Redirect to="/admin" />;

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
          <CssBaseline />
          <Paper className={classes.paper}>
            {/* <img src={testlogo} width="32" /> */}
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
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
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.login}
              >
                Login
              </Button>
            </form>
          </Paper>
        </main>
      </>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
