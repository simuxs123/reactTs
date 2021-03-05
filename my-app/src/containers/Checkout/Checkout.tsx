import React, { Component, Fragment } from 'react';
import { CheckoutSummary } from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { BurgerProps, Ingridients } from '../BurgerBuilder/BurgerBuilder';
import { RouteComponentProps, Route } from 'react-router-dom';
import { ContactData } from '../Checkout/ContactData/ContactData';

export class Checkout extends Component<RouteComponentProps, BurgerProps> {
  state = {
    ingridients: {},
    totalPrice: 0,
  };
  componentDidMount() {
    const ingridients: Ingridients = {};
    let price: number = 0;
    const query = new URLSearchParams(this.props.location.search);
    for (let [key, value] of query.entries()) {
      if (key === 'price') {
        price = +value;
      } else {
        ingridients[key] = +value;
      }
    }
    this.setState({ ingridients: ingridients, totalPrice: price });
  }
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
          ingridients={this.state.ingridients}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => (
            <ContactData
              ingridients={this.state.ingridients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </Fragment>
    );
  }
}
