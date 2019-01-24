import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Mobile from '@material-ui/icons/Phone';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    padding: 20,
    marginTop: 70,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  textFieldHeight: {
    height: 200,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
  },
  box: {
    display: 'flex',
    padding: 10,
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 50,
  },
  root: {
    width: '100%',
  },
  dividerFullWidth: {
    margin: `2px 0 0 ${theme.spacing.unit * 2}px`,
  },
  dividerInset: {
    margin: `2px 0 0 ${theme.spacing.unit * 9}px`,
  },
  submit: {
    height: 40,
    width: 70,
    fontSize: 15,
    marginTop: 10,
  },
  center: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  blockElement: {
    display: 'block',
  },
  noPadding: {
    padding: 0,
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
    const { classes } = this.props;

    return (
      <form
        onSubmit={this.submitWorkOrder}
        className={classes.container}
        noValidate
        autoComplete="off"
      >
        <div className={classes.title}>
          <List className={classes.root}>
            <Typography component="h1" variant="h5">
              Submit a Work Order
            </Typography>
            <Divider component="li" />
          </List>
          <List className={classes.box}>
            <ListItem className={classes.blockElement}>
              <ListItem>
                <Mobile />
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
            </ListItem>
            <ListItem className={classes.blockElement}>
              <button onClick={this.onClick}>click me to see state</button>
              <TextField
                id="outlined-dense"
                label="Upload photo -> CHANGE THIS!!!"
                className={classNames(classes.dense)}
                margin="dense"
                variant="outlined"
              />
            </ListItem>
          </List>
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
        </div>
      </form>
    );
  }
}

Maintenance.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Maintenance);
