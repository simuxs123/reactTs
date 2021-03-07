import React, { Component, Fragment } from 'react';
import { CheckoutSummary } from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { BurgerProps, mapStateToProps } from '../BurgerBuilder/BurgerBuilder';
import { RouteComponentProps, Route } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
import { connect } from 'react-redux';
class Checkout extends Component<RouteComponentProps & BurgerProps> {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    return (
      <Fragment>
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingridients={this.props.ingridients}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
        />
      </Fragment>
    );
  }
}
export default connect(mapStateToProps)(Checkout);
