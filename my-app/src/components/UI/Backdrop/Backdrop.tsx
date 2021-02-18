import React, { FC } from 'react';
import classes from './Backdrop.module.scss';
import { Props } from '../Modal/Modal';

export const Backdrop: FC<Props> = (props) =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.moduleClose}></div>
  ) : null;
