import React, { FC, lazy, Suspense, useEffect } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { AuthStateProps } from './store/reducers/auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Route, Switch, Redirect } from 'react-router-dom';
interface Props {
  onTrySignUp(): Function;
  isAuthenticated: boolean;
}
const Checkout: any = lazy(() => import('./containers/Checkout/Checkout')); //nezinau tipo
const Orders: any = lazy(() => import('./containers/Orders/Orders')); //nezinau tipo
const Auth: any = lazy(() => import('./containers/Auth/Auth')); //nezinau tipo
const App: FC<Props> = (props) => {
  const { onTrySignUp } = props;
  useEffect(() => {
    onTrySignUp();
  }, [onTrySignUp]);
  let routes = (
    <Switch>
      <Route path="/auth" render={() => <Auth />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/auth" render={() => <Auth />} />
        <Route path="/orders" render={() => <Orders />} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};
const mapStateToProps = ({ auth }: { auth: AuthStateProps }) => {
  return {
    isAuthenticated: auth.token !== '',
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onTrySignUp: () => dispatch(actions.authCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
