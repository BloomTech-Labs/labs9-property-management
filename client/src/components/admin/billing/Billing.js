import React, { Component } from 'react';
import { withAuthUser } from '../../session';
import { compose } from 'recompose';
import axios from 'axios';
import connectwstripe from '../../../images/connect-with-stripe@2x.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Skeleton from 'react-loading-skeleton';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const StripeButton = styled.img`
  width: 200px;
`;

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 200,
    minHeight: '400px',
    // border: "1px solid orange"
  },
  leftColumn: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    // border: "1px solid black",
    flexDirection: 'column',
  },
  rightColumn: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
    marginTop: 66,
    marginBottom: 30,
  },
  button: {
    width: 200,
    marginTop: 38,
  },
  card: {
    maxWidth: 300,
    marginTop: 100,
    marginLeft: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 220,
    marginTop: 30,
    marginLeft: 30,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  rootTable: {
    // width: "100%",
    overflowX: 'auto',
    marginTop: 30,
  },
  table: {
    minWidth: 150,
  },
  tableTitle: {
    marginLeft: 10,
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
      <Card className={classes.card}>
        <CardContent>
          {this.state.fetchingStripeID ? (
            <Skeleton height={30} maxWidth={300} />
          ) : (
            stripeConnectionDetails
          )}
        </CardContent>
      </Card>
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
