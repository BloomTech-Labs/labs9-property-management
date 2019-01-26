import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Call from '@material-ui/icons/Call';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
});

class Maintenance extends React.Component {
  state = {
    // address: '',
    description: '',
    // phoneNumber: '',
    permission: true,
    // photo: '',
    // house_data: [],
  };

  // componentDidMount() {
  //   const endpoint = 'https://mynotespal.herokuapp.com/api/notes';  <==== ENDPOINT SHOULD RETRIEVE PROPERTY OWNER INFO
  //   axios
  //     .get(endpoint)
  //     .then(response => {
  //       this.setState(() => ({ house_data: response.data }));
  //     })
  //     .catch(error => {
  //       console.error('Server Error: ', error);
  //     });
  // }

  submitWorkOrder = event => {
    event.preventDefault();
    // const endpoint = 'http://localhost:4000/api/work-orders/';
    axios
      .post('/api/work-orders/', {
        // addess: this.state.address,
        description: this.state.description,
        property_access: this.state.permission,
      })
      .then(res => {
        console.log('register response: ', res);
        // this.props.history.push('/tenant');
      })
      .catch(error => {
        console.error('Axios response: ', error);
        // this.props.history.push('/tenant');
      });
  };

  handleCheckedBox = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = event => {
    event.preventDefault();
    console.log('state', this.state);
  };

  render() {
    const { classes, theme } = this.props;
    console.log(theme);

    return (
      <Grid container className={classes.container} spacing={16}>
        <Grid item xs={12} className={classes.title}>
          <List className={classes.root}>
            <Typography component="h1" variant="h5">
              Submit a Work Order
            </Typography>
            <Divider component="li" />
          </List>
          <form onSubmit={this.submitWorkOrder} autoComplete="off">
            <Grid container justify="space-around" spacing={16}>
              <Grid item xs={12} md={5}>
                <ListItem>
                  <Avatar>
                    <Call />
                  </Avatar>
                  <ListItem className={classes.blockElement}>
                    <ListItemText
                      className={classes.noPadding}
                      primary="24/7 Maintenance"
                    />
                    <ListItemText
                      className={classes.noPadding}
                      primary="1-800-123-9876"
                    />
                  </ListItem>
                </ListItem>
                <TextField
                  id="outlined-dense"
                  label="Address"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                  onChange={this.handleInputChange}
                  value={this.state.address}
                  type="text"
                  name="address"
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Description of Issue"
                  className={classNames(classes.textField, classes.dense)}
                  rows="6"
                  multiline
                  margin="dense"
                  variant="outlined"
                  onChange={this.handleInputChange}
                  value={this.state.description}
                  type="text"
                  name="description"
                />
                <TextField
                  id="outlined-dense"
                  label="Phone Number"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                  onChange={this.handleInputChange}
                  value={this.state.phoneNumber}
                  type="integer"
                  name="phoneNumber"
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <button onClick={this.onClick}>click me to see state</button>
                <TextField
                  id="outlined-dense"
                  label="Upload photo -> CHANGE THIS!!!"
                  className={classNames(classes.dense)}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={11}>
                <div className={classes.center}>
                  <FormControlLabel
                    label="Permission to enter premises without tenant home"
                    control={
                      <Checkbox
                        checked={this.state.permission}
                        onChange={this.handleCheckedBox('permission')}
                        value="permission"
                        color="primary"
                      />
                    }
                  />
                </div>
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

Maintenance.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Maintenance);
