import React, { Component } from 'react';
import { Order } from '../../components/Order/Order';
import { instance } from '../../axios-orders';
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler';
import { Ingridients } from '../BurgerBuilder/BurgerBuilder';
type State = {
  loading: boolean;
  orders: OrderProps[];
};
type OrderProps = {
  id: string;
  ingridients: Ingridients;
  price: number;
};
class Orders extends Component<{}, State> {
  state = {
    orders: [],
    loading: true,
  };
  async componentDidMount() {
    try {
      const res = await instance.get<OrderProps[]>('orders.json');
      const fetchedOrder: OrderProps[] = [];
      for (let key in res.data) {
        fetchedOrder.push({ ...res.data[key], id: key });
      }
      this.setState({ loading: false, orders: fetchedOrder });
      console.log(this.state.orders);
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
  }
  render() {
    return (
      <div>
        {this.state.orders.map(({ id, ingridients, price }: OrderProps) => (
          <Order key={id} ingridients={ingridients} price={price} />
        ))}
      </div>
    );
  }
}
export default withErrorHandler(Orders, instance);
