import React, { Component } from 'react';
import { AuthUserContext } from '../session';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Error from '@material-ui/icons/Error';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';

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
    margin: theme.spacing.unit * 3,
    width: 70,
    height: 70,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  formControl: {
    width: '100%',
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
});

class Setup extends Component {
  state = {
    accountType: '',
    openSnackbar: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.accountType === '') {
      this.setState({ openSnackbar: true });
    }
  };

  snackbarClose = () => {
    this.setState({ openSnackbar: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <main className={classes.main}>
            <Paper className={classes.paper}>
              <Avatar
                alt="Profile Photo"
                src={authUser.photoURL}
                className={classes.avatar}
              />
              <Typography component="h1" variant="h5">
                Account Setup
              </Typography>
              <form className={classes.form}>
                <FormControl className={classes.formControl} required>
                  <InputLabel htmlFor="account-type-native-required">
                    Select Account Type
                  </InputLabel>
                  <Select
                    native
                    name="accountType"
                    inputProps={{ id: 'account-type-native-required' }}
                    onChange={this.handleChange('accountType')}
                  >
                    <option value="" />
                    <option value="admin">Owner</option>
                    <option value="tenant">Tenant</option>
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </form>
            </Paper>

            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.openSnackbar}
              autoHideDuration={6000}
              onClose={this.snackbarClose}
            >
              <SnackbarContent
                className={classes.error}
                aria-describedby="snackbarError"
                message={
                  <span id="snackbarError" className={classes.message}>
                    <Error className={classes.icon} />
                    {'Please select an account type!'}
                  </span>
                }
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.snackbarClose}
                  >
                    <Close />
                  </IconButton>,
                ]}
              />
            </Snackbar>
          </main>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withStyles(styles)(Setup);
