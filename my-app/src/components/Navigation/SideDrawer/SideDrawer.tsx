import React, { FC, Fragment } from 'react';
import { Logo } from '../../Logo/Logo';
import { NavigationItems } from '../NavigationItems/NavigationItems';
import { Backdrop } from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.scss';
interface Props {
  isAuth: boolean;
  show: boolean;
  moduleClose(): void;
}

export const SideDrawer: FC<Props> = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Fragment>
      <Backdrop show={props.show} moduleClose={props.moduleClose} />
      <div onClick={props.moduleClose} className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Fragment>
  );
};
