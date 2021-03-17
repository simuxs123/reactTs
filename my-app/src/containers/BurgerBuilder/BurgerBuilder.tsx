import React, { FC, useEffect, Fragment, useState, useCallback } from 'react';
import { Burger } from '../../components/Burger/Burger';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';
import { Modal } from '../../components/UI/Modal/Modal';
import { OrderSummary } from '../../components/Burger/OrderSummary/OrderSummary';
import { instance } from '../../axios-orders';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import {
  Ingridients,
  BurgerBuilderStateProps,
} from '../../store/reducers/burgerBuilder';

import { AuthStateProps } from '../../store/reducers/auth';
export interface Disable {
  [key: string]: boolean;
}

const BurgerBuilder: FC<RouteComponentProps> = (props) => {
  const [purchasing, setPurchasing] = useState<boolean>(false);
  const dispatch = useDispatch();
  const ingridients = useSelector(
    ({ burgerBuilder }: { burgerBuilder: BurgerBuilderStateProps }) =>
      burgerBuilder.ingridients
  );
  const totalPrice = useSelector(
    ({ burgerBuilder }: { burgerBuilder: BurgerBuilderStateProps }) =>
      burgerBuilder.totalPrice
  );
  const error = useSelector(
    ({ burgerBuilder }: { burgerBuilder: BurgerBuilderStateProps }) =>
      burgerBuilder.error
  );
  const isAuthenticated = useSelector(
    ({ auth }: { auth: AuthStateProps }) => auth.token !== ''
  );
  const onIngridientAdded = (ingName: string) =>
    dispatch(actions.addIngridients(ingName));
  const onIngridientRemoved = (ingName: string) =>
    dispatch(actions.removeIngridients(ingName));
  const onInitIngridients = useCallback(
    () => dispatch(actions.initIngridients()),
    []
  );
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirect = (path: string) =>
    dispatch(actions.setAuthRedirect(path));

  useEffect(() => {
    onInitIngridients();
  }, [onInitIngridients]);
  const updatePurchaseState = (ingridients: Ingridients) => {
    const sum = Object.entries(ingridients)
      .map(([key, value]) => {
        return value;
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirect('/checkout');
      props.history.push('/auth');
    }
  };
  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };
  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo: Disable = {};
  for (let key in ingridients) {
    disabledInfo[key] = ingridients[key] <= 0;
  }
  let orderSummary: JSX.Element | null = null;
  let burger: JSX.Element = error ? (
    <p>Ingridients cant be loaded</p>
  ) : (
    <Spinner />
  );
  if (Object.keys(ingridients).length !== 0) {
    burger = (
      <Fragment>
        <Burger ingridients={ingridients} />
        <BuildControls
          ingridientAdded={onIngridientAdded}
          ingridientRemove={onIngridientRemoved}
          disable={disabledInfo}
          totalPrice={totalPrice}
          purchasable={updatePurchaseState(ingridients)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
        />
      </Fragment>
    );
    orderSummary = (
      <OrderSummary
        ingridients={ingridients}
        moduleClose={purchaseCancelHandler}
        continuePurchase={purchaseContinueHandler}
        totalPrice={totalPrice}
      />
    );
  }
  return (
    <Fragment>
      <Modal show={purchasing} moduleClose={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Fragment>
  );
};

export default withErrorHandler(BurgerBuilder, instance);
