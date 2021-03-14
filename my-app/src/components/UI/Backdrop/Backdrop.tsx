import React, { FC } from 'react';
import classes from './Backdrop.module.scss';
interface Props {
  show: boolean;
  moduleClose(): void;
}

export const Backdrop: FC<Props> = (props) =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.moduleClose}></div>
  ) : null;
