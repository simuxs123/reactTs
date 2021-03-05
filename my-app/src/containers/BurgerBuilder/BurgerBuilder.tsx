import React, { Component, Fragment } from 'react';
import { Burger } from '../../components/Burger/Burger';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';
import { Modal } from '../../components/UI/Modal/Modal';
import { OrderSummary } from '../../components/Burger/OrderSummary/OrderSummary';
import { instance } from '../../axios-orders';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
export interface Ingridients {
  [key: string]: number;
}
export interface Disable {
  [key: string]: boolean;
}
export interface BurgerProps {
  ingridients: Ingridients;
  totalPrice: number;
}
export interface State extends BurgerProps {
  purchasable: boolean;
  purchasing: boolean;
  loading: boolean;
  error: boolean;
}
type Price = {
  [key: string]: number;
};

const INGRIDIENTS_PRICES: Price = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
class BurgerBuilder extends Component<RouteComponentProps> {
  state: State = {
    ingridients: {},
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };
  async componentDidMount() {
    try {
      const res = await axios.get<Ingridients>(
        'https://sim-react-burger-default-rtdb.firebaseio.com/ingridients.json'
      );
      this.setState({ ingridients: res.data });
    } catch (err) {
      this.setState({ error: true });
    }
  }
  updatePurchaseState(ingridients: Ingridients) {
    const sum = Object.keys(ingridients)
      .map((igKey) => {
        return ingridients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }
  addIngridientHandler = (type: string) => {
    const oldCount: number = this.state.ingridients[type];
    const updatedCount: number = oldCount + 1;
    const updatedIngridients = { ...this.state.ingridients };
    updatedIngridients[type] = updatedCount;
    const priceAddition: number = INGRIDIENTS_PRICES[type];
    const oldPrice: number = this.state.totalPrice;
    const newPrice: number = priceAddition + oldPrice;
    this.setState({ totalPrice: newPrice, ingridients: updatedIngridients });
    this.updatePurchaseState(updatedIngridients);
  };
  removeIngridientHandler = (type: string) => {
    const oldCount: number = this.state.ingridients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount: number = oldCount - 1;
    const updatedIngridients = { ...this.state.ingridients };
    updatedIngridients[type] = updatedCount;
    const priceDeduction: number = INGRIDIENTS_PRICES[type];
    const oldPrice: number = this.state.totalPrice;
    const newPrice: number = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingridients: updatedIngridients });
    this.updatePurchaseState(updatedIngridients);
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    const queryParams: string[] = [];
    for (let i in this.state.ingridients) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.state.ingridients[i])
      );
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString: string = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
  };
  render() {
    const disabledInfo: Disable = {};
    for (let key in this.state.ingridients) {
      disabledInfo[key] = this.state.ingridients[key] <= 0;
    }
    let orderSummary: JSX.Element | null = null;
    let burger: JSX.Element = this.state.error ? (
      <p>Ingridients cant be loaded</p>
    ) : (
      <Spinner />
    );
    if (Object.keys(this.state.ingridients).length !== 0) {
      burger = (
        <Fragment>
          <Burger ingridients={this.state.ingridients} />
          <BuildControls
            ingridientAdded={this.addIngridientHandler}
            ingridientRemove={this.removeIngridientHandler}
            disable={disabledInfo}
            totalPrice={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingridients={this.state.ingridients}
          moduleClose={this.purchaseCancelHandler}
          continuePurchase={this.purchaseContinueHandler}
          totalPrice={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          moduleClose={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}
export default withErrorHandler(BurgerBuilder, instance);
