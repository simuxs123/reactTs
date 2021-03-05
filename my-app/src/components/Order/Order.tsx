import React, { FC } from 'react';
import { BurgerProps } from '../../containers/BurgerBuilder/BurgerBuilder';
import classes from './Order.module.scss';

export const Order: FC<BurgerProps> = (props) => {
  const ingridients: { name: string; amount: number }[] = [];
  for (let ingridient in props.ingridients) {
    ingridients.push({
      name: ingridient,
      amount: props.ingridients[ingridient],
    });
  }
  const ingridientsOutput = ingridients.map((ig) => {
    return (
      <span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px',
        }}
        key={ig.name}
      >
        {ig.name}({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingridients:{ingridientsOutput}</p>
      <p>
        Price: <strong>USD{props.totalPrice}</strong>
      </p>
    </div>
  );
};
