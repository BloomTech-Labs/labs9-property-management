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
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

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
      <div className={classes.container}>
        <div className={classes.title}>
          <List className={classes.root}>
            <ListItem className={classes.blockElement}>
              <Typography component="h1" variant="h5">
                Outstanding Balance
              </Typography>
              <Typography component="h1" variant="h5">
                -350.00
              </Typography>
            </ListItem>
            <Divider component="li" />
          </List>
          <List>
            <ListItem className={classes.center}>
              <Typography component="h1" variant="h5">
                Payment Details
              </Typography>
            </ListItem>
            <form onSubmit={''} noValidate autoComplete="off">
              <List className={classes.box}>
                <ListItem className={classes.blockElement}>
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
                    className={classNames(
                      classes.center,
                      classes.customPadding
                    )}
                    primary="Payment Method"
                  />
                </ListItem>
                <ListItem className={classes.blockElement}>
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
                </ListItem>
              </List>
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
            </form>
          </List>
        </div>
      </div>
    );
  }
}

Payments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Payments);
