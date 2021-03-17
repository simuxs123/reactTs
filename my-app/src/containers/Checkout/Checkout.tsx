import React, { FC } from 'react';
import { CheckoutSummary } from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { OrderBurgerStateProps } from '../../store/reducers/order';
import { BurgerBuilderStateProps } from '../../store/reducers/burgerBuilder';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

interface ReducerProps {
  burgerBuilder: BurgerBuilderStateProps;
  order: OrderBurgerStateProps;
}
type Props = BurgerBuilderStateProps &
  OrderBurgerStateProps &
  RouteComponentProps;

const Checkout: FC<Props> = (props) => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };
  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };
  let summary = <Redirect to="/" />;
  if (Object.keys(props.ingridients).length !== 0) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
          ingridients={props.ingridients}
        />
        <Route
          path={props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};
export const mapStateToProps = ({ burgerBuilder, order }: ReducerProps) => {
  return {
    ingridients: burgerBuilder.ingridients,
    purchased: order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
