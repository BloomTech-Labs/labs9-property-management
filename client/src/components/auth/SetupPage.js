import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuthUser } from '../session';
import { compose } from 'recompose';
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
    errorMessage: '',
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.accountType === '') {
      this.setState({
        openSnackbar: true,
        errorMessage: 'Please select an account type!',
      });
    } else {
      axios
        .post('/api/users/register', { role: this.state.accountType })
        .then(response => {
          console.log('register response: ', response);
          this.props.updateAuthUserRole(this.state.accountType);
        })
        .catch(error => {
          console.log('register error: ', error);
          this.setState({
            openSnackbar: true,
            errorMessage: 'There was an error setting up your account.',
          });
        });
    }
  };

  snackbarClose = () => {
    this.setState({ openSnackbar: false, errorMessage: '' });
  };

  render() {
    const { classes, authUser, authUserRole } = this.props;
    console.log(this.props);
    console.log(this.state);
    if (!authUser) {
      return <Redirect to="/login" />;
    } else if (authUserRole === 'admin') {
      return <Redirect to="/admin" />;
    } else if (authUserRole === 'tenant') {
      return <Redirect to="/tenant" />;
    }

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar
            alt="Profile Photo"
            src={this.props.authUser.photoURL}
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
                {this.state.errorMessage}
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
    );
  }
}

const SetupPage = compose(
  withAuthUser,
  withStyles(styles)
)(Setup);

export default SetupPage;
