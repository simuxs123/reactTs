import React from 'react';
import classes from './BuildControls.module.scss';
import { BuildControl } from './BuildControl/BuildControl';
import { Disable } from '../../../containers/BurgerBuilder/BurgerBuilder';
import { Action } from '../../../store/reducer';
type Props = {
  ingridientAdded(type: string): Action;
  ingridientRemove(type: string): Action;
  ordered(): void;
  purchasable: boolean;
  disable: Disable;
  totalPrice: number;
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
        ORDER NOW
      </button>
    </div>
  );
};
