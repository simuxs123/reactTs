import React, { FC } from 'react';
import classes from './NavigationItems.module.scss';
import { NavigationItem } from './NavigationItem/NavigationItem';

export const NavigationItems: FC = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link={'/'} active={true}>
      Burger Builder
    </NavigationItem>
    <NavigationItem link={'/'} active={false}>
      Checkout
    </NavigationItem>
  </ul>
);
