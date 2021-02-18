import React, { FC } from 'react';
import classes from './Button.module.scss';
type Props = {
  btnType: string;
  clicked(): void;
};
export const Button: FC<Props> = (props) => (
  <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);
