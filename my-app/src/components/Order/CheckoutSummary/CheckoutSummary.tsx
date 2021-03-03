import React, { FC } from 'react';
import { Burger } from '../../Burger/Burger';
import { Button } from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.scss';
import { Ingridients } from '../../../containers/BurgerBuilder/BurgerBuilder';
type Props = {
  ingridients: Ingridients;
  checkoutCancelled(): void;
  checkoutContinued(): void;
};
export const CheckoutSummary: FC<Props> = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div>
        <Burger ingridients={props.ingridients} />
      </div>
      <Button clicked={props.checkoutCancelled} btnType="Danger">
        Cancel
      </Button>
      <Button clicked={props.checkoutContinued} btnType="Success">
        Continue
      </Button>
    </div>
  );
};
