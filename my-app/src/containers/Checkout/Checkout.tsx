import React, { Component, Fragment } from 'react';
import { CheckoutSummary } from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { OrderBurgerStateProps } from '../../store/reducers/order';
import { BurgerBuilderStateProps } from '../../store/reducers/burgerBuilder';
import { Route, Redirect } from 'react-router-dom';
import { AllProps } from './ContactData/ContactData';
import ContactData from '../Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component<AllProps> {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    let summary = <Redirect to="/" />;
    if (Object.keys(this.props.ingridients).length !== 0) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            ingridients={this.props.ingridients}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}
export const mapStateToProps = ({
  burgerBuilder,
  order,
}: {
  burgerBuilder: BurgerBuilderStateProps;
  order: OrderBurgerStateProps;
}) => {
  return {
    ingridients: burgerBuilder.ingridients,
    purchased: order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
