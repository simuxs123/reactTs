import React, { FC } from 'react';
import classes from './NavigationItems.module.scss';
import { NavigationItem } from './NavigationItem/NavigationItem';

export const NavigationItems: FC = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link={'/'}>Burger Builder</NavigationItem>
    <NavigationItem link={'/orders'}>Orders</NavigationItem>
  </ul>
);
