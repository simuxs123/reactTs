import React, { Component, Fragment } from 'react';
import { Burger } from '../../components/Burger/Burger';
export class BurgerBuilder extends Component {
  state = {
    ingridients: {
      salad: 1,
      bacon: 1,
      meat: 1,
      cheese: 1,
    },
  };
  render() {
    return (
      <Fragment>
        <Burger ingridients={this.state.ingridients} />
        <div>Build controls</div>
      </Fragment>
    );
  }
}
