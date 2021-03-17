import React, { FC, Fragment } from 'react';
import { BurgerProps } from '../../../store/reducers/burgerBuilder';
import { Button } from '../../UI/Button/Button';
interface Props extends BurgerProps {
  moduleClose(): void;
  continuePurchase(): void;
}

export const OrderSummary: FC<Props> = (props) => {
  const ingridientSummary = Object.keys(props.ingridients).map((igKey, i) => {
    return (
      <li key={igKey + i}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
        {props.ingridients[igKey]}
      </li>
    );
  });
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingridients:</p>
      <ul>{ingridientSummary}</ul>
      <p>
        Total Price: <strong>{props.totalPrice.toFixed(2)}$</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button clicked={props.moduleClose} btnType={'Danger'}>
        CANCEL
      </Button>
      <Button clicked={props.continuePurchase} btnType={'Success'}>
        CONTINUE
      </Button>
    </Fragment>
  );
};
