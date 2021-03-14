import React, { FC } from 'react';
import { Logo } from '../../Logo/Logo';
import { NavigationItems } from '../NavigationItems/NavigationItems';
import { DrawerToggle } from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.module.scss';
interface Props {
  toggle(): void;
  isAuth: boolean;
}
export const Toolbar: FC<Props> = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle toggle={props.toggle} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);
