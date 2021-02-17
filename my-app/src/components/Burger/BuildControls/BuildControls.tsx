import React from 'react';
import classes from './BuildControls.module.scss';
import { BuildControl } from './BuildControl/BuildControl';
type Disable = {
  [key: string]: boolean;
};
type Props = {
  ingridientAdded(type: string): void;
  ingridientRemove(type: string): void;
  disable: Disable;
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
    </div>
  );
};
