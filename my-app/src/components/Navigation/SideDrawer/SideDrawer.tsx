import React, { FC, Fragment } from 'react';
import { Logo } from '../../Logo/Logo';
import { NavigationItems } from '../NavigationItems/NavigationItems';
import { Backdrop } from '../../UI/Backdrop/Backdrop';
import { Props } from '../../UI/Modal/Modal';
import classes from './SideDrawer.module.scss';

export const SideDrawer: FC<Props> = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Fragment>
      <Backdrop show={props.show} moduleClose={props.moduleClose} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};
