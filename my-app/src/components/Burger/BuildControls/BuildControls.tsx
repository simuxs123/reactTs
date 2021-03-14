import React from 'react';
import classes from './BuildControls.module.scss';
import { BuildControl } from './BuildControl/BuildControl';
import { Disable } from '../../../containers/BurgerBuilder/BurgerBuilder';
import {
  AddIngridientAction,
  RemoveIngridientAction,
} from '../../../store/reducers/burgerBuilder';
type Props = {
  ingridientAdded(type: string): AddIngridientAction;
  ingridientRemove(type: string): RemoveIngridientAction;
  ordered(): void;
  purchasable: boolean;
  disable: Disable;
  totalPrice: number;
  isAuth: boolean;
};
type Control = {
  label: string;
  type: string;
}[];

const controls: Control = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];
export const BuildControls: React.FC<Props> = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Total price: <strong>{props.totalPrice.toFixed(2)}$</strong>
      </p>
      {controls.map((item) => {
        return (
          <BuildControl
            key={item.label}
            label={item.label}
            added={() => props.ingridientAdded(item.type)}
            remove={() => props.ingridientRemove(item.type)}
            disable={props.disable[item.type]}
          />
        );
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
      </button>
    </div>
  );
};
