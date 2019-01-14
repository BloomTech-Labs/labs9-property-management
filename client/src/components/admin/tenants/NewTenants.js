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


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 20,
    marginTop:70,
    justifyContent:'center',
 
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
  },
  title: {
    display:'flex',
    flexDirection: 'column',
    marginBottom:50
},
  root: {
    width: '100%',
    maxWidth: 450,
  },
  dividerFullWidth: {
    margin: `2px 0 0 ${theme.spacing.unit * 2}px`,
  },
  dividerInset: {
    margin: `2px 0 0 ${theme.spacing.unit * 9}px`,
  },
  submit:{
    height:40,
    width:70,
    fontSize:15,
    marginTop:10
  },
  
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
      <div className={classes.title}>
      <List className={classes.root}>
      <ListItem>
        <ListItemText primary="Tenant Info" />
      </ListItem>
      <Divider component="li" />
      </List>     
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
        </div>
        <div className={classes.title}>
      <List className={classes.root}>
      <ListItem>
        <ListItemText primary="Property Info" />
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
        </div>
        <TextField 
          id="outlined-full-width"
          label="Contract"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          fullWidth
          multiline
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
      <Button color="inherit" className={classNames(classes.button, classes.submit)}>
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