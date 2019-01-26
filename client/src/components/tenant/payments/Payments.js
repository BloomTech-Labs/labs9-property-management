import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import styled from 'styled-components';
import testlogo from '../../../images/test-logo.svg';
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
    payments: [],
    paymentAmount: 72500,
  };

  onToken = token => {
    const body = {
      amount: this.state.paymentAmount,
      token: token,
    };
    axios
      .post('/api/payments', body)
      .then(response => {
        console.log('response', response.data);
        alert(
          'Payment Success: token was received by backend and charge was made.'
        );
        this.setState(prevState => {
          return {
            payments: prevState.payments.concat({
              amount: (body.amount / 100).toFixed(2),
              timestamp: Date.now(),
            }),
          };
        });
      })
      .catch(error => {
        console.log('Payment Error: ', error);
        alert('Payment Error');
      });
  };

  handlePaymentChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const publishableKey = 'pk_test_IiM4lt5m1LYfjZBPfY8wa6Jo';
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <List className={classes.root}>
            <ListItem className={classes.blockElement}>
              {/* <form>
                <input
                  placeholder="Amount to pay"
                  name="paymentAmount"
                  type="number"
                  value={this.state.paymentAmount}
                  onChange={this.handlePaymentChange}
                />
              </form> */}
            </ListItem>
          </List>
          <List>
            <ListItem className={classes.center}>
              <Typography component="h1" variant="h5">
                Make a rent payment
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
                </ListItem>
              </List>
            </form>
            <div className={classes.center}>
              <StripeCheckout
                label="Make payment" //Component button text
                name="Property Mgmt" //Modal Header
                description="Make a payment."
                panelLabel="Make payment" //Submit button in modal
                amount={Number(this.state.paymentAmount)} //Default state amount in cents $725.00
                token={this.onToken}
                stripeKey={publishableKey}
                image={testlogo} //Pop-in header image
                billingAddress={false}
              />
            </div>
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
