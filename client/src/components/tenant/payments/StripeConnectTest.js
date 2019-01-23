import React from 'react';
import connectwstripe from '../../../images/connect-with-stripe@2x.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StripeButton = styled.img`
  width: 144px;
`;

/*

user clicks on connnect

user submits

user is redirected to http://localhost:3000/tenant/stripe-connect-test

auth code is attached by redirect

componentDidMount checks route path this.props. location or match?

POST check the url string and check for anything that was appended to the url, if so make axios call (POST) using object with the Auth Code from url (see stripe docs for formatting)
if there is an error the url will contain an error so keep that in mind (only one .catch() on the outside for this). .then() response, we should grab the user id, then send to our backend. 
*/

class StripeConnectTest extends React.Component {
  state = {};

  componentDidMount() {
    console.log('props', this.props);
    if (this.props.location.search) {
      console.log('BINGO', this.props.location.search.substring(23));
      let computedCode = this.props.location.search.substring(23);
      const stripeAuthCode = {
        computedCode,
      };
      console.log(stripeAuthCode);
      setTimeout(
        () =>
          axios
            .post('http://localhost:4000/api/stripe-connect', stripeAuthCode)
            .then(response => console.log('response'))
            .catch(err => console.log(err)),
        2000
      );

      /*
      Stripe frontend post request initial logic
      axios
        .post('https://connect.stripe.com/oauth/token', {
          form: {
            grant_type: 'authorization_code',
            client_secret: process.env.REACT_APP_STRIPE_SECRET,
            code: stripeAuthCode,
          },
          json: true,
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => console.log(err));
      */

      // remove the else block before going live
    } else {
      console.log('Error getting stripe auth code back from stripe');
    }
  }

  handleClick = () => {
    axios
      .get()
      .then()
      .catch();
  };

  render() {
    return (
      <>
        <Link
          target="_blank"
          to={
            '//connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_ELLhp2vnlFHBpk0AVDL7PVxBzrsk2NXz&scope=read_write'
          }
        >
          <StripeButton src={connectwstripe} />
        </Link>
        <p>hello from connect test</p>
      </>
    );
  }
}

export default StripeConnectTest;
