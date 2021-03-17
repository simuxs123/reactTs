import React, {
  FC,
  ChangeEvent,
  useState,
  useEffect,
  SyntheticEvent,
} from 'react';
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

interface ReducerState {
  auth: AuthStateProps;
  burgerBuilder: BurgerBuilderStateProps;
}
export interface Authenticated {
  isAuthenticated: boolean;
}
export interface AuthActions {
  onAuth(email: string, password: string, isSignup: boolean): Function;
  onSetAuthRedirectPath(): AuthRedirectAction;
}
type AllProps = BurgerBuilderStateProps &
  AuthStateProps &
  Authenticated &
  AuthActions;

const Auth: FC<AllProps> = (props) => {
  const [emptyError, setEmptyError] = useState<string>('');
  const [isSignup, setisSignup] = useState<boolean>(true);
  const [control, setControl] = useState<OrderForm>({
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
  });
  const { building, authRedirectPath, onSetAuthRedirectPath } = props;
  useEffect(() => {
    if (!building && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [building, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>,
    controlName: string
  ) => {
    const updatedControls = {
      ...control,
      [controlName]: {
        ...control[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          control[controlName].validation
        ),
        touched: true,
      },
    };
    setControl(updatedControls);
  };
  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    setEmptyError('Please fill all inputs');
    if (control.email.value && control.password.value) {
      props.onAuth(control.email.value, control.password.value, isSignup);
      control.email.value = '';
      control.password.value = '';
      setEmptyError('');
    }
  };
  const switchAuthModeHandler = () => {
    setisSignup(!isSignup);
  };

  const formElementsArray = [];
  for (let [key, value] of Object.entries(control)) {
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
      changed={(event) => inputChangedHandler(event, id)}
      invalid={!config.valid}
      touched={config.touched}
      error={config.error}
    />
  ));
  if (props.loadingAuth) {
    form = <Spinner />;
  }
  let errorMessage: string | JSX.Element = '';
  if (props.errorAuth) {
    errorMessage = props.errorAuth;
  }
  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }
  return (
    <div className={classes.Auth}>
      {authRedirect}
      {isSignup ? <h1>SIGN UP</h1> : <h1>SIGN IN</h1>}
      <p style={{ color: 'red' }}>{emptyError ? emptyError : errorMessage}</p>
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">Submit</Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        Swith to {isSignup ? 'SIGNIN' : 'SIGNUP'}
      </Button>
    </div>
  );
};
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
