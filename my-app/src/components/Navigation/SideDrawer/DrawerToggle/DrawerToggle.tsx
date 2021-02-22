import React, { FC } from 'react';
import classes from './DrawerToggle.module.scss';
import { Props } from '../../Toolbar/Toolbar';

export const DrawerToggle: FC<Props> = (props) => (
  <div className={classes.DrawerToggle} onClick={props.toggle}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
