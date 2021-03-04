import React, { FC, SyntheticEvent } from 'react';
import classes from './Button.module.scss';
type Props = {
  btnType: string;
  clicked?(event?: SyntheticEvent): void;
  disabled?: boolean;
};
export const Button: FC<Props> = (props) => (
  <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);
