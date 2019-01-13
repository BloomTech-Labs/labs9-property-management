import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 20,
    marginTop:70
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  section: {
      display:'flex',
      flexDirection: 'column'
  },
  box: {
    display:'flex',
    padding:10,
  }
});


class NewTenant extends React.Component {
  state = {

  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
      <div className={classes.box}>
      <div className={classes.section}>
        <TextField
          id="outlined-dense"
          label="Name"
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
        />
        <TextField
          id="outlined-dense"
          label="Mobile Number"
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
        /> 
      </div>
      <div className={classes.section}>
        <TextField
          id="outlined-dense"
          label="Email"
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
        />
        <TextField
          id="outlined-dense"
          label="Home Address"
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
        />
        </div>
        </div>
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
          id="outlined-dense"
          label="# Bedrooms"
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
        />
        <TextField
          id="outlined-dense"
          label="Max Occupancy"
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
        />
        </div>
        <div className={classes.section}>
        <TextField
          id="outlined-dense"
          label="# Bathrooms"
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
        />
        <TextField
          id="outlined-dense"
          label="Square Footage"
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
        />
        <TextField
          id="outlined-dense"
          label="Year Built"
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
        />
        </div>
        </div>

        <TextField
          id="outlined-full-width"
          label="Contract"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
      <Button color="inherit" className={classes.button}>
        Submit
      </Button>
      </form>
    );
  }
}

NewTenant.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewTenant);