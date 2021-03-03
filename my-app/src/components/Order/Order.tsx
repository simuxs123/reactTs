import React, { FC } from 'react';
import { Ingridients } from '../../containers/BurgerBuilder/BurgerBuilder';
import classes from './Order.module.scss';
type Props = {
  ingridients: Ingridients;
  price: number;
};

export const Order: FC<Props> = (props) => {
  const ingridients = [];
  for (let [key, value] of Object.entries(props.ingridients)) {
    ingridients.push({ name: key, amount: value });
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
        Price: <strong>USD{props.price}</strong>
      </p>
    </div>
  );
};
