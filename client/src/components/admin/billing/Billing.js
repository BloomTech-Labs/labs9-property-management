import React, { Component } from 'react';
import { withAuthUser } from '../../session';
import { compose } from 'recompose';
import axios from 'axios';
import connectwstripe from '../../../images/connect-with-stripe@2x.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const StripeButton = styled.img`
  width: 200px;
`;
const styles = theme => ({
  container: {
    marginTop: 100,
    marginLeft: 0,
  },
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    marginTop: 25,
    paddingTop: 75,
    position: 'relative',
    overflow: 'visible',
    minWidth: '40%',
    minHeight: 350,
    zIndex: 0,
  },
  longCard: {
    position: 'relative',
    overflow: 'visible',
    minWidth: '80%',
    minHeight: 350,
    zIndex: 0,
    marginTop: 50,
  },
  cardTop: {
    padding: '15px',
    width: '90%',
    backgroundColor: '#5f29ff',
    zIndex: '2000',
    top: '-6%',
    left: '50%',
    transform: 'translateX(-50%)',
    position: 'absolute',
    boxShadow:
      '0px 5px 5px -3px rgba(81,71,255,0.2), 0px 8px 10px 1px rgba(81,71,255,0.2), 0px 3px 14px 2px rgba(81,71,255,0.2)',
    borderRadius: '4px',
    color: 'white',
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
});

class Billing extends Component {
  state = {
    hasStripeID: false,
    fetchingStripeID: true,
  };
  componentDidMount() {
    console.log('props', this.props);
    // check to see if owner has stripe account connected
    if (this.props.authTokenRecieved) {
      axios
        .get('/api/stripe-connect')
        .then(response => {
          console.log('RESPONSE:', response.data);
          if (response.data.hasStripeID === true) {
            console.log('SERVER STRIPE ID:', response.data);
            this.setState({ hasStripeID: true, fetchingStripeID: false });
          } else {
            this.setState({ hasStripeID: false, fetchingStripeID: false });
          }
          // check to see if auth code is provided
          if (this.props.location.search) {
            console.log('BINGO', this.props.location.search.substring(23));
            let computedCode = this.props.location.search.substring(23);
            const stripeAuthCode = {
              computedCode,
            };
            console.log(stripeAuthCode);

            axios.post('/api/stripe-connect', stripeAuthCode).then(response => {
              this.setState({ hasStripeID: true, fetchingStripeID: false });
            });
          }
        })
        .catch(err => console.log('ERROR CHECKING USER STRIPE ID', err));
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.authTokenRecieved &&
      this.props.authTokenRecieved !== prevProps.authTokenRecieved
    ) {
      axios
        .get('/api/stripe-connect')
        .then(response => {
          if (response.data.hasStripeID === true) {
            this.setState({ hasStripeID: true, fetchingStripeID: false });
          } else {
            // check to see if auth code is provided
            if (this.props.location.search) {
              console.log('BINGO', this.props.location.search.substring(23));
              let computedCode = this.props.location.search.substring(23);
              const stripeAuthCode = {
                computedCode,
              };
              console.log(stripeAuthCode);

              axios
                .post('/api/stripe-connect', stripeAuthCode)
                .then(response => {
                  this.setState({ hasStripeID: true, fetchingStripeID: false });
                });
            } else {
              this.setState({ hasStripeID: false, fetchingStripeID: false });
            }
          }
        })
        .catch(err => console.log('ERROR CHECKING USER STRIPE ID', err));
    }
  }

  render() {
    const { classes } = this.props;
    let stripeConnectionDetails;
    console.log(this.state.hasStripeID);

    if (this.state.hasStripeID) {
      stripeConnectionDetails = (
        <Typography className={classes.tableTitle} component="h5" variant="h6">
          Connected to Stripe
        </Typography>
      );
    } else {
      stripeConnectionDetails = (
        <Link
          target="_blank"
          to={
            '//connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_ELLhp2vnlFHBpk0AVDL7PVxBzrsk2NXz&scope=read_write'
          }
        >
          <StripeButton src={connectwstripe} />
        </Link>
      );
    }

    return (
      <>
        <Grid container className={classes.container} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="space-around" spacing={16}>
              <Grid item xs={12} md={5}>
                <Card className={classes.card}>
                  <CardHeader
                    title="Your Payment Info & Properties"
                    subheader="Select a property to view Payments"
                    className={classes.cardTop}
                    titleTypographyProps={{
                      component: 'h4',
                      variant: 'body1',
                      color: 'inherit',
                    }}
                    subheaderTypographyProps={{
                      variant: 'overline',
                      color: 'secondary',
                    }}
                  />

                  {this.state.fetchingStripeID ? (
                    <Skeleton height={30} />
                  ) : (
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {stripeConnectionDetails}
                      </Typography>
                      <Typography component="p">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                  )}
                </Card>
              </Grid>
              <Grid item xs={12} md={5}>
                <Card className={classes.card}>
                  <CardHeader
                    title="Payment History"
                    subheader="Most Recent Rent Payments"
                    className={classes.cardTop}
                    titleTypographyProps={{
                      component: 'h4',
                      variant: 'body1',
                      color: 'inherit',
                    }}
                    subheaderTypographyProps={{
                      variant: 'overline',
                      color: 'secondary',
                    }}
                  />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

Billing.propTypes = {
  classes: PropTypes.object.isRequired,
};

const BillingPage = compose(
  withAuthUser,
  withStyles(styles)
)(Billing);

export default BillingPage;
