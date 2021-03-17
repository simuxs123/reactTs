import React, { FC, SyntheticEvent, ChangeEvent, useState } from 'react';
import { Button } from '../../../components/UI/Button/Button';
import {
  BurgerBuilderStateProps,
  Ingridients,
} from '../../../store/reducers/burgerBuilder';
import { OrderBurgerStateProps } from '../../../store/reducers/order';
import { AuthStateProps } from '../../../store/reducers/auth';
import { RouteComponentProps } from 'react-router-dom';
import { Input } from '../../../components/UI/Input/Input';
import classes from './ContactData.module.scss';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../../../store/actions';
import { checkValidity } from '../../../shared/utility';

export interface OrderForm {
  [key: string]: ElementProps;
}
interface ElementProps {
  elementType: string;
  elementConfig: ConfigProps;
  value: string;
  validation: Validation;
  error?: string;
  valid: boolean;
  touched: boolean;
}
interface ReducerStateProps {
  burgerBuilder: BurgerBuilderStateProps;
  order: OrderBurgerStateProps;
  auth: AuthStateProps;
}
export interface Validation {
  required: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
}
export interface ConfigProps {
  type?: string;
  placeholder?: string;
  options?: {
    value: string;
    displayValue: string;
  }[];
}

export interface OrderReq {
  id?: string;
  ingridients: Ingridients;
  price: number;
  orderData: { [key: string]: string };
  userId: string;
}
interface DispatchActions {
  onpPurchaseBurgerStart(orderData: OrderReq, token: string): Function;
}
type AllProps = OrderBurgerStateProps &
  BurgerBuilderStateProps &
  RouteComponentProps &
  AuthStateProps &
  DispatchActions;
const ContactData: FC<AllProps> = (props) => {
  const [orderForm, setOrderForm] = useState<OrderForm>({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your name',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your street',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    postCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your ZIP code',
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your country',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your email',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: '', displayValue: 'Delivery' },
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'slowest', displayValue: 'Slowest' },
        ],
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const orderHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    const formData: { [key: string]: string } = {};
    for (let [key, value] of Object.entries(orderForm)) {
      formData[key] = value.value;
    }
    const order: OrderReq = {
      ingridients: props.ingridients,
      price: +props.totalPrice.toFixed(2),
      orderData: formData,
      userId: props.userId,
    };
    props.onpPurchaseBurgerStart(order, props.token);
  };

  const changeHandler = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>,
    inputIndetifier: string
  ) => {
    const updatedFormOrder: OrderForm = { ...orderForm };
    const updatedFormElement: ElementProps = {
      ...updatedFormOrder[inputIndetifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedFormOrder[inputIndetifier] = updatedFormElement;
    let formIsValid: boolean = true;
    for (let [key, value] of Object.entries(updatedFormOrder)) {
      formIsValid = value.valid && formIsValid;
    }
    setOrderForm(updatedFormOrder);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (let [key, value] of Object.entries(orderForm)) {
    formElementsArray.push({
      id: key,
      config: value,
    });
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(({ id, config }) => {
        return (
          <Input
            key={id}
            elementType={config.elementType}
            value={config.value}
            elementConfig={config.elementConfig}
            changed={(event) => changeHandler(event, id)}
            invalid={!config.valid}
            touched={config.touched}
          />
        );
      })}
      <Button btnType="Success" disabled={!formIsValid}>
        Order
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  );
};
export const mapStateToProps = ({
  burgerBuilder,
  order,
  auth,
}: ReducerStateProps) => {
  return {
    ingridients: burgerBuilder.ingridients,
    totalPrice: burgerBuilder.totalPrice,
    loading: order.loading,
    token: auth.token,
    userId: auth.userId,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onpPurchaseBurgerStart: (orderData: OrderReq, token: string) =>
      dispatch(actions.purchaseBurgerStart(orderData, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
