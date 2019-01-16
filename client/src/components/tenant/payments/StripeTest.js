import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import testlogo from '../../../images/test-logo.svg';

class StripeTest extends React.Component {
  state = {
    payments: [],
    paymentAmount: 72500,
  };

  onToken = token => {
    const body = {
      amount: this.state.paymentAmount,
      token: token,
    };
    axios
      .post('http://localhost:4000/api/payments', body)
      .then(response => {
        console.log('response', response.data);
        alert('Payment Success');
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

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleUpdateAmount = event => {
    event.preventDefault();
    this.setState({ paymentAmount: this.state.paymentAmount });
  };

  render() {
    const publishableKey = 'pk_test_IiM4lt5m1LYfjZBPfY8wa6Jo';
    console.log(this.state.payments);
    return (
      <>
        <StripeCheckout
          label="Pay rent" //Component button text
          name="Property Mgmt" //Modal Header
          description="Pay rent today."
          panelLabel="Pay rent" //Submit button in modal
          amount={Number(this.state.paymentAmount)} //Default state amount in cents $725.00
          token={this.onToken}
          stripeKey={publishableKey}
          image={testlogo} //Pop-in header image
          billingAddress={false}
        />
        <form onSubmit={this.handleUpdateAmount}>
          <input
            placeholder="Amount to pay"
            name="paymentAmount"
            type="number"
            value={this.state.paymentAmount}
            onChange={this.handleChange}
          />
          <button>Update amount to pay</button>
        </form>
        <h3>Payments</h3>
        {this.state.payments.map(payment => (
          <ul key={Date.now()}>
            <li>
              Date: {payment.timestamp} | Amount: {payment.amount}
            </li>
          </ul>
        ))}
      </>
    );
  }
}

export default StripeTest;
