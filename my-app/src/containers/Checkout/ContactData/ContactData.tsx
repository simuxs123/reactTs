import React, { Component, SyntheticEvent, ChangeEvent } from 'react';
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
type State = {
  orderForm: OrderForm;
  formIsValid: boolean;
};
export interface OrderForm {
  [key: string]: ElementProps;
}
type ElementProps = {
  elementType: string;
  elementConfig: ConfigProps;
  value: string;
  validation: Validation;
  error?: string;
  valid: boolean;
  touched: boolean;
};
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
interface ReducerStateProps {
  burgerBuilder: BurgerBuilderStateProps;
  order: OrderBurgerStateProps;
  auth: AuthStateProps;
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
export type AllProps = OrderBurgerStateProps &
  BurgerBuilderStateProps &
  RouteComponentProps &
  AuthStateProps;
class ContactData extends Component<AllProps & DispatchActions, State> {
  state = {
    orderForm: {
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
    },
    formIsValid: false,
  };
  orderHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    const formData: { [key: string]: string } = {};
    for (let [key, value] of Object.entries(this.state.orderForm)) {
      formData[key] = value.value;
    }
    const order: OrderReq = {
      ingridients: this.props.ingridients,
      price: +this.props.totalPrice.toFixed(2),
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onpPurchaseBurgerStart(order, this.props.token);
  };

  changeHandler = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>,
    inputIndetifier: string
  ) => {
    const updatedFormOrder: OrderForm = { ...this.state.orderForm };
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
    this.setState({ orderForm: updatedFormOrder, formIsValid: formIsValid });
  };
  render() {
    const formElementsArray = [];
    for (let [key, value] of Object.entries(this.state.orderForm)) {
      formElementsArray.push({
        id: key,
        config: value,
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(({ id, config }) => {
          return (
            <Input
              key={id}
              elementType={config.elementType}
              value={config.value}
              elementConfig={config.elementConfig}
              changed={(event) => this.changeHandler(event, id)}
              invalid={!config.valid}
              touched={config.touched}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
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
