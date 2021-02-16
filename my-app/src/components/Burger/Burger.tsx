import React, { FC } from 'react';
import { BurgerIngridient } from './BurgerIngridient/BurgerIngridient';
import classes from './Burger.module.scss';
type Props = {
  ingridients: {
    salad: Number;
    bacon: Number;
    meat: Number;
    cheese: Number;
    [index: string]: Number;
  };
};
type Nr = {
  Props: Number;
};

export const Burger: FC<Props> = (props) => {
  const transformIngridients = Object.keys(props.ingridients).map((igKey) => {
    return [...Array(props.ingridients[igKey])].map((_, i) => {
      <BurgerIngridient key={i + igKey} type={igKey} />;
    });
  });
  return (
    <div className={classes.Burger}>
      <BurgerIngridient type={'bread-top'} />
      <BurgerIngridient type={'salad'} />
      <BurgerIngridient type={'meat'} />
      <BurgerIngridient type={'bread-bottom'} />
    </div>
  );
};
