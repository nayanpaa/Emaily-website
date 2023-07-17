import React, {Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
//for the payment actions
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    //token={token => this.props.handleToken(token)}, this is  class component
      //so it takes this instance's props and calls the function handleToken
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 fro 5 Email Credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">
          Add Credits
        </button>
      </StripeCheckout>
    );
  }
}
//null bcos no map to state props idk what that means tho
export default connect(null, actions)(Payments);