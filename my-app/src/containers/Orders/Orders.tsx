import React, { Component } from 'react';
import { Order } from '../../components/Order/Order';
import { instance } from '../../axios-orders';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler';
import { Ingridients } from '../../store/reducers/burgerBuilder';
import { OrderBurgerStateProps } from '../../store/reducers/order';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';
import { OrderReq } from '../../containers/Checkout/ContactData/ContactData';
import { AuthStateProps } from '../../store/reducers/auth';
type OrderProps = {
  id: string;
  ingridients: Ingridients;
  price: number;
};
interface OrderAction {
  onFetchOrders(token: string, userId: string): Function;
}
export type AllProps = AuthStateProps & OrderBurgerStateProps & OrderAction;
class Orders extends Component<AllProps> {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  render() {
    let order: JSX.Element | JSX.Element[] = <Spinner />;
    if (!this.props.loading) {
      order = this.props.orders.map((order: OrderReq) => (
        <Order
          key={order.id}
          ingridients={order.ingridients}
          totalPrice={order.price}
        />
      ));
    }
    return <div>{order}</div>;
  }
}
export const mapStateToProps = ({
  order,
  auth,
}: {
  order: OrderBurgerStateProps;
  auth: AuthStateProps;
}) => {
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
