import React, { Component, SyntheticEvent, ChangeEvent } from 'react';
import { Button } from '../../../components/UI/Button/Button';
import { Ingridients } from '../../BurgerBuilder/BurgerBuilder';
import { RouteComponentProps } from 'react-router-dom';
import { Input } from '../../../components/UI/Input/Input';
import classes from './ContactData.module.scss';
import { instance } from '../../../axios-orders';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
type State = {
  loading: boolean;
  orderForm: OrderForm;
  formIsValid: boolean;
};
type OrderForm = {
  [key: string]: ElementProps;
};
type ElementProps = {
  elementType: string;
  elementConfig: ConfigProps;
  value: string;
  validation: Validation;
  valid: boolean;
  touched: boolean;
};
type Validation = {
  required: boolean;
  minLength?: number;
  maxLength?: number;
};
export interface ConfigProps {
  type?: string;
  placeholder?: string;
  options?: {
    value: string;
    displayValue: string;
  }[];
}
interface Props extends RouteComponentProps {
  ingridients: Ingridients;
  totalPrice: number;
}
type OrderReq = {
  ingridients: Ingridients;
  price: string;
  orderData: { [key: string]: string };
};

export class ContactData extends Component<Props, State> {
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
    loading: false,
  };
  orderHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData: { [key: string]: string } = {};
    for (let [key, value] of Object.entries(this.state.orderForm)) {
      formData[key] = value.value;
    }
    const order: OrderReq = {
      ingridients: this.props.ingridients,
      price: this.props.totalPrice.toFixed(2),
      orderData: formData,
    };
    try {
      const res = await instance.post<OrderReq>('/orders.json', order);
      this.setState({ loading: false });
      this.props.history.push('/');
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
  };
  checkValidity = (value: string, rules: Validation) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length <= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length >= rules.maxLength && isValid;
    }
    return isValid;
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
    updatedFormElement.valid = this.checkValidity(
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
    if (this.state.loading) {
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
