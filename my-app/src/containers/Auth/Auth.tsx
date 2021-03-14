import React, { ChangeEvent, Component, SyntheticEvent } from 'react';
import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { AuthStateProps, AuthRedirectAction } from '../../store/reducers/auth';
import { BurgerBuilderStateProps } from '../../store/reducers/burgerBuilder';
import { Redirect } from 'react-router-dom';
import classes from './Auth.module.scss';
import * as actions from '../../store/actions/index';
import {
  Validation,
  OrderForm,
} from '../../containers/Checkout/ContactData/ContactData';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { checkValidity } from '../../shared/utility';
type State = {
  control: OrderForm;
  isSignup: boolean;
  emptyError: string;
};
interface ReducerState {
  auth: AuthStateProps;
  burgerBuilder: BurgerBuilderStateProps;
}
export interface Authenticated {
  isAuthenticated: boolean;
}
type AllProps = BurgerBuilderStateProps & AuthStateProps & Authenticated;
export interface AuthActions {
  onAuth(email: string, password: string, isSignup: boolean): Function;
  onSetAuthRedirectPath(): AuthRedirectAction;
}
class Auth extends Component<AllProps & AuthActions, State> {
  state: State = {
    control: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        error: 'Invalid email',
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        error: 'Password min length 6 characters',
        touched: false,
      },
    },
    emptyError: '',
    isSignup: true,
  };
  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }
  inputChangedHandler = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>,
    controlName: string
  ) => {
    const updatedControls = {
      ...this.state.control,
      [controlName]: {
        ...this.state.control[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.control[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ control: updatedControls });
  };
  submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    this.setState({
      ...this.state.control,
      emptyError: 'Please fill all inputs',
    });
    if (this.state.control.email.value && this.state.control.password.value) {
      this.props.onAuth(
        this.state.control.email.value,
        this.state.control.password.value,
        this.state.isSignup
      );
      this.setState({ ...this.state.control, emptyError: '' });
    }
  };
  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };
  render() {
    const formElementsArray = [];
    for (let [key, value] of Object.entries(this.state.control)) {
      formElementsArray.push({
        id: key,
        config: value,
      });
    }
    let form:
      | JSX.Element
      | JSX.Element[] = formElementsArray.map(({ id, config }) => (
      <Input
        key={id}
        elementType={config.elementType}
        value={config.value}
        elementConfig={config.elementConfig}
        changed={(event) => this.inputChangedHandler(event, id)}
        invalid={!config.valid}
        touched={config.touched}
        error={config.error}
      />
    ));
    if (this.props.loadingAuth) {
      form = <Spinner />;
    }
    let errorMessage: string | JSX.Element = '';
    if (this.props.errorAuth) {
      errorMessage = this.props.errorAuth;
    }
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {this.state.isSignup ? <h1>SIGN UP</h1> : <h1>SIGN IN</h1>}
        <p style={{ color: 'red' }}>
          {this.state.emptyError ? this.state.emptyError : errorMessage}
        </p>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          Swith to {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
}
const mapStateToProps = ({ burgerBuilder, auth }: ReducerState) => {
  return {
    loadingAuth: auth.loadingAuth,
    errorAuth: auth.errorAuth,
    isAuthenticated: auth.token !== '',
    building: burgerBuilder.building,
    authRedirectPath: auth.authRedirectPath,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onAuth: (email: string, password: string, isSignup: boolean) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirect('/')),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
