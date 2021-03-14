import React, { Component, Fragment } from 'react';
import { Burger } from '../../components/Burger/Burger';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';
import { Modal } from '../../components/UI/Modal/Modal';
import { OrderSummary } from '../../components/Burger/OrderSummary/OrderSummary';
import { instance } from '../../axios-orders';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../../store/actions';
import {
  Ingridients,
  BurgerBuilderStateProps,
  AddIngridientAction,
  RemoveIngridientAction,
} from '../../store/reducers/burgerBuilder';
import {
  OrderBurgerStateProps,
  SetPurchaseInit,
} from '../../store/reducers/order';
import { AuthStateProps, AuthRedirectAction } from '../../store/reducers/auth';
export interface Disable {
  [key: string]: boolean;
}

export interface State {
  purchasing: boolean;
}
interface ReducerStateProps {
  burgerBuilder: BurgerBuilderStateProps;
  order: OrderBurgerStateProps;
  auth: AuthStateProps;
}
interface BurgerActions {
  onIngridientAdded(ingName: string): AddIngridientAction;
  onIngridientRemoved(ingName: string): RemoveIngridientAction;
  onInitIngridients(): Function;
  onInitPurchase(): SetPurchaseInit;
  onSetAuthRedirect(path: string): AuthRedirectAction;
}
interface Props extends BurgerBuilderStateProps {
  isAuthenticated: boolean;
}
class BurgerBuilder extends Component<
  Props & RouteComponentProps & BurgerActions
> {
  state: State = {
    purchasing: false,
  };

  async componentDidMount() {
    this.props.onInitIngridients();
  }
  updatePurchaseState(ingridients: Ingridients) {
    const sum = Object.entries(ingridients)
      .map(([key, value]) => {
        return value;
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirect('/checkout');
      this.props.history.push('/auth');
    }
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };
  render() {
    const disabledInfo: Disable = {};
    for (let key in this.props.ingridients) {
      disabledInfo[key] = this.props.ingridients[key] <= 0;
    }
    let orderSummary: JSX.Element | null = null;
    let burger: JSX.Element = this.props.error ? (
      <p>Ingridients cant be loaded</p>
    ) : (
      <Spinner />
    );
    if (Object.keys(this.props.ingridients).length !== 0) {
      burger = (
        <Fragment>
          <Burger ingridients={this.props.ingridients} />
          <BuildControls
            ingridientAdded={this.props.onIngridientAdded}
            ingridientRemove={this.props.onIngridientRemoved}
            disable={disabledInfo}
            totalPrice={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingridients)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingridients={this.props.ingridients}
          moduleClose={this.purchaseCancelHandler}
          continuePurchase={this.purchaseContinueHandler}
          totalPrice={this.props.totalPrice}
        />
      );
    }
    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          moduleClose={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export const mapStateToProps = ({
  burgerBuilder,
  order,
  auth,
}: ReducerStateProps) => {
  return {
    ingridients: burgerBuilder.ingridients,
    totalPrice: burgerBuilder.totalPrice,
    error: burgerBuilder.error,
    purchased: order.purchased,
    isAuthenticated: auth.token !== '',
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onIngridientAdded: (ingName: string) =>
      dispatch(actions.addIngridients(ingName)),
    onIngridientRemoved: (ingName: string) =>
      dispatch(actions.removeIngridients(ingName)),
    onInitIngridients: () => dispatch(actions.initIngridients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirect: (path: string) =>
      dispatch(actions.setAuthRedirect(path)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, instance));
