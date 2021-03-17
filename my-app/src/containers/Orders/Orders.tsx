import React, { useEffect, FC } from 'react';
import { Order } from '../../components/Order/Order';
import { instance } from '../../axios-orders';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler';
import { OrderBurgerStateProps } from '../../store/reducers/order';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';
import { OrderReq } from '../../containers/Checkout/ContactData/ContactData';
import { AuthStateProps } from '../../store/reducers/auth';

interface OrderAction {
  onFetchOrders(token: string, userId: string): Function;
}
interface ReducerProps {
  order: OrderBurgerStateProps;
  auth: AuthStateProps;
}
export type AllProps = AuthStateProps & OrderBurgerStateProps & OrderAction;
const Orders: FC<AllProps> = (props) => {
  const { onFetchOrders } = props;
  useEffect(() => {
    onFetchOrders(props.token, props.userId);
  }, [onFetchOrders]);

  let order: JSX.Element | JSX.Element[] = <Spinner />;
  if (!props.loading) {
    order = props.orders.map((order: OrderReq) => (
      <Order
        key={order.id}
        ingridients={order.ingridients}
        totalPrice={order.price}
      />
    ));
  }
  return <div>{order}</div>;
};
export const mapStateToProps = ({ order, auth }: ReducerProps) => {
  return {
    orders: order.orders,
    loading: order.loading,
    token: auth.token,
    userId: auth.userId,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onFetchOrders: (token: string, userId: string) =>
      dispatch(actions.fetchOrdersStart(token, userId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, instance));
