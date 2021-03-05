import React, { FC, ChangeEvent } from 'react';
import classes from './Input.module.scss';
import { ConfigProps } from '../../../containers/Checkout/ContactData/ContactData';
type Props = {
  elementType: string;
  changed(
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ): void;
  label?: string;
  value: string;
  elementConfig: ConfigProps;
  invalid: boolean;
  touched: boolean;
};

export const Input: FC<Props> = (props) => {
  let inputElement: null | JSX.Element = null;
  const inputClasses: string[] = [classes.InputElement];
  if (props.invalid && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options?.map(({ value, displayValue }) => (
            <option key={value} value={value}>
              {displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      {/* <label className={classes.Label}>{props.label}</label> */}
      {inputElement}
    </div>
  );
};
