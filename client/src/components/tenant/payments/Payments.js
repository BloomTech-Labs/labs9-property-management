import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  container: {
    padding: 20,
    marginTop: 70,
  },
  root: {
    width: '100%',
  },
  card: {
    marginTop: 25,
    position: 'relative',
    overflow: 'visible',
    minWidth: '40%',
    minHeight: 350,
    zIndex: 0,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  displayNone: {
    display: 'none',
  },
  paper: {
    width: '80%',
    height: '80vh',
    margin: 'auto',
    marginTop: 50,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 50,
  },
  noPadding: {
    padding: 0,
  },
  blockElement: {
    display: 'block',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  dense: {
    marginTop: 16,
  },
  center: {
    display: 'flex',
    // flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    marginTop: 20,
  },
  customPadding: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 0,
    paddingRight: 0,
  },
});

class Payments extends React.Component {
  state = {
    amount: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.container} spacing={16}>
        <Grid item xs={12} className={classes.title}>
          <List className={classes.root}>
            <Typography component="h1" variant="h5">
              Outstanding Balance
            </Typography>
            <Typography component="h1" variant="h5">
              -350.00
            </Typography>
            <Divider component="li" />
          </List>
          <form onSubmit={''} autoComplete="off">
            <Grid container justify="space-around" spacing={16}>
              <Grid item xs={12} md={12}>
                <List className={classes.center}>
                  <Typography component="h1" variant="h5">
                    Payment Details
                  </Typography>
                </List>
              </Grid>
              <Grid item xs={12} md={5}>
                <ListItemText
                  className={classNames(classes.center, classes.noPadding)}
                  primary="Payment Amount"
                />
                <TextField
                  id="outlined-dense"
                  label="Amount"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                />
                <ListItemText
                  className={classNames(classes.center, classes.customPadding)}
                  primary="Payment Method"
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <ListItemText
                  className={classNames(classes.center, classes.noPadding)}
                  primary="Card Information"
                />
                <TextField
                  id="outlined-dense"
                  label="Name on Bank Account"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                />
                <FormControl className={classes.textField} required>
                  <InputLabel htmlFor="account-type-native-required">
                    Select Account Type
                  </InputLabel>
                  <Select
                    native
                    name="accountType"
                    inputProps={{ id: 'account-type-native-required' }}
                    // onChange={this.handleChange('accountType')}
                  >
                    <option value="" />
                    <option value="owner">Credit</option>
                    <option value="tenant">Debit</option>
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
                <TextField
                  id="outlined-dense"
                  label="Routing Number"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                />
                <TextField
                  id="outlined-dense"
                  label="Accounting Number"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={11}>
                <div className={classes.center}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                    className={classes.button}
                  >
                    Submit
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

Payments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Payments);
