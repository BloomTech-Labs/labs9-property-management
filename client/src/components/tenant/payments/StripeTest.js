import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import testlogo from '../../../images/test-logo.svg'

const StripeTest = () => {
    const publishableKey = "pk_test_IiM4lt5m1LYfjZBPfY8wa6Jo";
   
    const onToken = token => {
      const body = {
        amount: 999,
        token: token
    };
    axios
        .post("http://localhost:8000/payment", body)
        .then(response => {
          console.log(response);
          alert("Payment Success");
        })
        .catch(error => {
          console.log("Payment Error: ", error);
          alert("Payment Error");
        });
    };
    return (
      <StripeCheckout
        label="Pay rent" //Component button text
        name="Property Mgmt" //Modal Header
        description="Pay rent today."
        panelLabel="Pay rent" //Submit button in modal
        amount={999} //Amount in cents $9.99
        token={onToken}
        stripeKey={publishableKey}
        image={testlogo} //Pop-in header image
        billingAddress={false}
      />
    );
  };

export default StripeTest