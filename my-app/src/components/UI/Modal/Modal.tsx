import React, { FC, Fragment } from 'react';
import classes from './Modal.module.scss';
import { Backdrop } from '../Backdrop/Backdrop';
export interface Props {
  show: boolean;
  moduleClose(): void;
}
export const Modal: FC<Props> = (props) => (
  <Fragment>
    <Backdrop show={props.show} moduleClose={props.moduleClose} />
    <div
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(100vh)',
        opacity: props.show ? 1 : 0,
      }}
      className={classes.Modal}
    >
      {props.children}
    </div>
  </Fragment>
);
