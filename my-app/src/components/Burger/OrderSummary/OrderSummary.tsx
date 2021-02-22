import React, { Component, Fragment } from 'react';
import { Ingridients } from '../../../containers/BurgerBuilder/BurgerBuilder';
import { Button } from '../../UI/Button/Button';
interface Props {
  ingridients: Ingridients;
  totalPrice: number;
  moduleClose(): void;
  continuePurchase(): void;
}

export class OrderSummary extends Component<Props> {
  render() {
    const ingridientSummary = Object.keys(this.props.ingridients).map(
      (igKey, i) => {
        return (
          <li key={igKey + i}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
            {this.props.ingridients[igKey]}
          </li>
        );
      }
    );
    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingridients:</p>
        <ul>{ingridientSummary}</ul>
        <p>
          Total Price: <strong>{this.props.totalPrice.toFixed(2)}$</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button clicked={this.props.moduleClose} btnType={'Danger'}>
          CANCEL
        </Button>
        <Button clicked={this.props.continuePurchase} btnType={'Success'}>
          CONTINUE
        </Button>
      </Fragment>
    );
  }
}
