import React, { Component, lazy, Suspense } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { AuthStateProps } from './store/reducers/auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BurgerBuilderStateProps } from './store/reducers/burgerBuilder';
import { Authenticated, AuthActions } from './containers/Auth/Auth';
interface Props {
  onTrySignUp(): Function;
  isAuthenticated: boolean;
}
const Checkout: any = lazy(() => import('./containers/Checkout/Checkout')); //nezinau tipo
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth: any = lazy(() => import('./containers/Auth/Auth')); //nezinau tipo
class App extends Component<Props> {
  componentDidMount() {
    this.props.onTrySignUp();
  }
  render() {
    let routes = (
      <Switch>
        <Route
          path="/auth"
          render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <Auth />
            </Suspense>
          )}
        />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route
            path="/checkout"
            render={(props) => (
              <Suspense fallback={<div>Loading...</div>}>
                <Checkout {...props} />
              </Suspense>
            )}
          />
          <Route
            path="/auth"
            render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <Auth />
              </Suspense>
            )}
          />
          <Route
            path="/orders"
            render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <Orders />
              </Suspense>
            )}
          />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}
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
