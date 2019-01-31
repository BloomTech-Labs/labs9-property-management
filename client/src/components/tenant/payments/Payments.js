import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import styled from 'styled-components';
import testlogo from '../../../images/test-logo.svg';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';

const StyledCheckout = styled(StripeCheckout)`
  & button {
    background: none;
    span {
      background: none;
    }
  }
`;

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
    minHeight: 300,
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
    width: 'auto',
    minHeight: 300,
    margin: 'auto',
    marginTop: -140,
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
      <>
        <Grid container className={classes.container} spacing={16}>
          <Grid item xs={12} className={classes.title}>
            <List className={classes.root}>
              <Typography component="h1" variant="h5">
                Outstanding Balance -$350.00
              </Typography>
              <Divider component="li" />
            </List>
          </Grid>
        </Grid>
        <Grid container className={classes.container} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="space-around" spacing={16}>
              <Grid item xs={12} md={12}>
                <Paper className={classes.paper}>
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      Make a Payment
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardContent>
                    <form onSubmit={''} noValidate autoComplete="off">
                      <List className={classes.box}>
                        <ListItem className={classes.blockElement}>
                          <ListItemText
                            className={classNames(classes.noPadding)}
                            primary="Payment Amount"
                          />
                          <TextField
                            id="standard-name"
                            label="Amount"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.paymentAmount}
                            onChange={this.handleChange('paymentAmount')}
                          />
                        </ListItem>
                      </List>
                    </form>
                    <div className={classes.center}>
                      <StripeCheckout
                        label="Make secure payment using Stripe" //Component button text
                        name="Property Mgmt" //Modal Header
                        description="Make a payment."
                        panelLabel="Payment Amount:" //Submit button in modal
                        amount={Number(this.state.paymentAmount)} //Default state amount in cents $725.00
                        token={this.onToken}
                        stripeKey={publishableKey}
                        image={testlogo} //Pop-in header image
                        billingAddress={false}
                      />
                    </div>
                  </CardContent>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

Payments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Payments);
