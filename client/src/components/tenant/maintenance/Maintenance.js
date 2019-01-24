import React from 'react';
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

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 20,
    marginTop: 70,
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
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
});

class Maintenance extends React.Component {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <div className={classes.title}>
          <List className={classes.root}>
            <ListItem>
              <ListItemText primary="Submit a Work Order" />
            </ListItem>
            <Divider component="li" />
          </List>
          <div className={classes.box}>
            <div className={classes.section}>
              <TextField
                id="outlined-dense"
                label="Address"
                className={classNames(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
              />
              <TextField
                id="outlined-multiline-static"
                label="Description of Issue"
                className={classNames(classes.textField, classes.dense)}
                rows="6"
                multiline
                margin="dense"
                variant="outlined"
              />
              <TextField
                id="outlined-dense"
                label="Phone Number"
                className={classNames(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                id="outlined-dense"
                label="Upload photo -> CHANGE THIS!!!"
                className={classNames(classes.dense)}
                margin="dense"
                variant="outlined"
              />
            </div>
          </div>
          <div className={classes.center}>
            <FormControlLabel
              label="Permission to enter premises without tenant home"
              control={
                <Checkbox
                  // checked={this.state.checkedB}
                  // onChange={this.handleChange("checkedB")}
                  value="checkedB"
                  color="primary"
                />
              }
            />
          </div>
          <div className={classes.center}>
            <Button
              color="inherit"
              className={classNames(classes.button, classes.submit)}
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
