import React, { Component, Fragment } from 'react';
import { Burger } from '../../components/Burger/Burger';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';

type Ingridients = {
  [key: string]: number;
};
type Disable = {
  [key: string]: boolean;
};
type Props = {
  totalPrice: number;
  ingridients: Ingridients;
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
export class BurgerBuilder extends Component<{}, Props> {
  state: Props = {
    ingridients: {
      salad: 0,
      bacon: 0,
      meat: 0,
      cheese: 0,
    },
    totalPrice: 0,
  };
  addIngridientHandler = (type: string) => {
    const oldCount: number = this.state.ingridients[type];
    const updatedCount: number = oldCount + 1;
    const updatedIngridients = { ...this.state.ingridients };
    updatedIngridients[type] = updatedCount;
    const priceAddition: number = INGRIDIENTS_PRICES[type];
    const oldPrice: number = this.state.totalPrice;
    const newPrice: number = priceAddition + oldPrice;
    this.setState({ totalPrice: newPrice, ingridients: updatedIngridients });
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
    const newPrice: number = priceDeduction + oldPrice;
    this.setState({ totalPrice: newPrice, ingridients: updatedIngridients });
  };
  render() {
    const disabledInfo: Disable = {};
    for (let key in this.state.ingridients) {
      disabledInfo[key] = this.state.ingridients[key] <= 0;
    }
    return (
      <Fragment>
        <Burger ingridients={this.state.ingridients} />
        <BuildControls
          ingridientAdded={this.addIngridientHandler}
          ingridientRemove={this.removeIngridientHandler}
          disable={disabledInfo}
        />
      </Fragment>
    );
  }
}
