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
import { ActionTypes } from '../../store/action';
import { Action } from '../../store/reducer';
export interface Ingridients {
  [key: string]: number;
}
export interface Disable {
  [key: string]: boolean;
}
export interface BurgerProps {
  ingridients: Ingridients;
  totalPrice: number;
}
export interface State {
  purchasing: boolean;
  loading: boolean;
  error: boolean;
}

interface ReducerMethods {
  onIngridientAdded(ingName: string): Action;
  onIngridientRemoved(ingName: string): Action;
}
class BurgerBuilder extends Component<
  BurgerProps & RouteComponentProps & ReducerMethods
> {
  state: State = {
    purchasing: false,
    loading: false,
    error: false,
  };

  async componentDidMount() {
    // try {
    //   const res = await axios.get<Ingridients>(
    //     'https://sim-react-burger-default-rtdb.firebaseio.com/ingridients.json'
    //   );
    //   this.setState({ ingridients: res.data });
    // } catch (err) {
    //   this.setState({ error: true });
    // }
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
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };
  render() {
    const disabledInfo: Disable = {};
    for (let key in this.props.ingridients) {
      disabledInfo[key] = this.props.ingridients[key] <= 0;
    }
    let orderSummary: JSX.Element | null = null;
    let burger: JSX.Element = this.state.error ? (
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
    if (this.state.loading) {
      orderSummary = <Spinner />;
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
export const mapStateToProps = ({ ingridients, totalPrice }: BurgerProps) => {
  return {
    ingridients: ingridients,
    totalPrice: totalPrice,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onIngridientAdded: (ingName: string): Action =>
      dispatch<Action>({
        type: ActionTypes.ADD_INGRIDIENTS,
        ingridientName: ingName,
      }),
    onIngridientRemoved: (ingName: string): Action =>
      dispatch<Action>({
        type: ActionTypes.REMOVE_INGRIDIENTS,
        ingridientName: ingName,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, instance));
