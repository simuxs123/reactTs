import React, { Component } from 'react';
import classes from './BurgerIngridient.module.scss';

type Props = {
  type: string;
};

export class BurgerIngridient extends Component<Props> {
  render() {
    let ingridients: null | JSX.Element = null;
    switch (this.props.type) {
      case 'bread-bottom':
        ingridients = <div className={classes.BreadBottom}></div>;
        break;
      case 'bread-top':
        ingridients = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;
      case 'meat':
        ingridients = <div className={classes.Meat}></div>;
        break;
      case 'cheese':
        ingridients = <div className={classes.Cheese}></div>;
        break;
      case 'salad':
        ingridients = <div className={classes.Salad}></div>;
        break;
      case 'bacon':
        ingridients = <div className={classes.Bacon}></div>;
        break;
      default:
        ingridients = null;
    }

    return ingridients;
  }
}
