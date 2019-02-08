import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import testlogo from '../../../images/test-logo.svg';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import CustomSnackbar from '../../snackbar/CustomSnackbar';
import CardHeader from '@material-ui/core/CardHeader';
import { Payment } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import { withAuthUser } from '../../session';
import { compose } from 'recompose';
import Loading from '../../loading/Loading';
import InputAdornment from '@material-ui/core/InputAdornment';

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
  paddingTitle: {
    padding: 20,
  },
  padding: {
    padding: 20,
  },
  marginTop: {
    marginTop: 5,
  },
  imgpaper2: {
    width: '100%',
    padding: 20,
    backgroundColor: theme.palette.background.paper,
  },
  loading: {
    marginTop: '50%',
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      marginTop: '20%',
    },
  },
  purpleAvatar: {
    backgroundColor: '#5F29FF',
  },
});

class Payments extends React.Component {
  state = {
    amount: '',
    payments: [],
    paymentAmount: null,
    openSnackbar: false,
    snackbarMessage: '',
    snackbarVariant: '',
    address: '',
    loading: true,
  };

  componentDidMount() {
    const endpoint = 'api/tenants/dashboard/';
    if (this.props.authTokenRecieved) {
      axios
        .get(endpoint)
        .then(response => {
          if (response.data.length > 0) {
            this.setState(() => ({
              address: response.data[0].address,
              loading: false,
            }));
          } else {
            this.setState(() => ({
              loading: false,
            }));
          }
        })
        .catch(error => {
          console.log('Loading: ', this.state.loading);
          console.error('Server Error: ', error);
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.authTokenRecieved &&
      this.props.authTokenRecieved !== prevProps.authTokenRecieved
    ) {
      const endpoint = 'api/tenants/dashboard/';
      axios
        .get(endpoint)
        .then(response => {
          if (response.data.length > 0) {
            this.setState(() => ({
              address: response.data[0].address,
              loading: false,
            }));
          } else {
            this.setState(() => ({
              loading: false,
            }));
          }
        })
        .catch(err => {
          console.log('Loading: ', this.state.loading);
          console.log('ERROR CHECKING USER STRIPE ID', err);
        });
    }
  }

  onToken = token => {
    const body = {
      amount: this.state.paymentAmount * 100,
      token: token,
    };
    axios
      .post('/api/payments', body)
      .then(response => {
        // alert(
        //   'Payment Success: token was received by backend and charge was made.'
        // );
        this.setState(prevState => {
          return {
            openSnackbar: true,
            snackbarMessage: 'Payment was a success. Thank you!',
            snackbarVariant: 'success',
            payments: prevState.payments.concat({
              amount: (body.amount / 100).toFixed(2),
              timestamp: Date.now(),
            }),
          };
        });
      })
      .catch(error => {
        console.log('Payment Error: ', error);
        this.toggleSnackbarError(
          'Error: payment failed. Please contact support.'
        );
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

  toggleSnackbarError = message => {
    this.setState({
      openSnackbar: true,
      snackbarMessage: message,
      snackbarVariant: 'error',
    });
  };

  snackbarClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };

  render() {
    const { classes } = this.props;
    const publishableKey = 'pk_test_IiM4lt5m1LYfjZBPfY8wa6Jo';

    if (!this.state.loading && this.state.address) {
      return (
        <>
          <Grid container className={classes.container} spacing={16}>
            <Grid item xs={12} className={classes.title}>
              <Paper className={classNames(classes.padding, classes.marginTop)}>
                <CardHeader
                  title="Amount due"
                  subheader="Keep track of your monthly payments"
                  className={classes.cardHeader}
                  titleTypographyProps={{
                    component: 'h6',
                    variant: 'h6',
                    color: 'inherit',
                  }}
                  subheaderTypographyProps={{
                    variant: 'overline',
                  }}
                />
                <ListItem>
                  <Avatar className={classes.purpleAvatar}>
                    <Payment />
                  </Avatar>
                  <ListItemText primary="Balance:" secondary="$ 0.00" />
                </ListItem>
              </Paper>
            </Grid>
          </Grid>
          <Grid container className={classes.container} spacing={16}>
            <Grid item xs={12}>
              <Grid container justify="space-around" spacing={16}>
                <Grid item xs={12} md={12}>
                  <Paper
                    className={classNames(classes.paper, classes.paddingTitle)}
                  >
                    <CardHeader
                      title="Make a Payment"
                      subheader="Credit/Debit card"
                      className={classes.cardHeader}
                      titleTypographyProps={{
                        component: 'h6',
                        variant: 'h6',
                        color: 'inherit',
                      }}
                      subheaderTypographyProps={{
                        variant: 'overline',
                      }}
                    />
                    <CardContent>
                      <form noValidate autoComplete="off">
                        <List className={classes.box}>
                          <ListItem className={classes.blockElement}>
                            <TextField
                              id="filled-adornment-amount"
                              label="Payment Amount"
                              className={classes.textField}
                              margin="normal"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                              }}
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
                          amount={Number(this.state.paymentAmount * 100)} //Default state amount in cents $725.00
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
            <CustomSnackbar
              open={this.state.openSnackbar}
              variant={this.state.snackbarVariant}
              message={this.state.snackbarMessage}
              onClose={this.snackbarClose}
              onClick={this.snackbarClose}
            />
          </Grid>
        </>
      );
    } else if (!this.state.loading) {
      return (
        <Grid container className={classes.container} spacing={16}>
          <Grid item xs={12} className={classes.title}>
            <List className={classes.root}>
              <Paper className={classes.imgpaper2}>
                <CardHeader
                  title="Payments"
                  subheader="Account has no property assigned"
                  className={classes.cardHeader}
                  titleTypographyProps={{
                    component: 'h6',
                    variant: 'h6',
                    color: 'inherit',
                  }}
                  subheaderTypographyProps={{
                    variant: 'overline',
                  }}
                />
              </Paper>
            </List>
          </Grid>
        </Grid>
      );
    } else {
      return <Loading className={classes.loading} size={80} />;
    }
  }
}

Payments.propTypes = {
  classes: PropTypes.object.isRequired,
};

const PaymentsPage = compose(
  withAuthUser,
  withStyles(styles)
)(Payments);

export default PaymentsPage;
