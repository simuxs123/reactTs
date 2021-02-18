import React, { Component, Fragment } from 'react';
import { Burger } from '../../components/Burger/Burger';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';
import { Modal } from '../../components/UI/Modal/Modal';
import { OrderSummary } from '../../components/Burger/OrderSummary/OrderSummary';
export interface Ingridients {
  [key: string]: number;
}
export interface Disable {
  [key: string]: boolean;
}

type Props = {
  ingridients: Ingridients;
  totalPrice: number;
  purchasable: boolean;
  purchasing: boolean;
};
type Price = {
  [key: string]: number;
};

const INGRIDIENTS_PRICES: Price = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
export class BurgerBuilder extends Component {
  state: Props = {
    ingridients: {
      salad: 0,
      bacon: 0,
      meat: 0,
      cheese: 0,
    },
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
  };

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
    alert('Continue');
  };
  render() {
    const disabledInfo: Disable = {};
    for (let key in this.state.ingridients) {
      disabledInfo[key] = this.state.ingridients[key] <= 0;
    }
    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          moduleClose={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingridients={this.state.ingridients}
            moduleClose={this.purchaseCancelHandler}
            continuePurchase={this.purchaseContinueHandler}
          />
        </Modal>
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
  }
}
