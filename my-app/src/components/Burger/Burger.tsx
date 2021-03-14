import React, { FC } from 'react';
import { BurgerIngridient } from './BurgerIngridient/BurgerIngridient';
import classes from './Burger.module.scss';
import { Ingridients } from '../../store/reducers/burgerBuilder';
type Props = {
  ingridients: Ingridients;
};
export const Burger: FC<Props> = (props) => {
  let transformIngridients: JSX.Element | JSX.Element[] = Object.keys(
    props.ingridients
  )
    .map((igKey) => {
      return [...Array(props.ingridients[igKey])].map((_, i) => {
        return <BurgerIngridient key={i + igKey} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return [...arr, ...el];
    }, []);
  if (transformIngridients.length === 0) {
    transformIngridients = <p>Please start adding ingridients</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngridient type={'bread-top'} />
      {transformIngridients}
      <BurgerIngridient type={'bread-bottom'} />
    </div>
  );
};
