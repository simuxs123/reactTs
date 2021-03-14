import React, { FC, Fragment } from 'react';
import classes from './NavigationItems.module.scss';
import { NavigationItem } from './NavigationItem/NavigationItem';
interface Props {
  isAuthenticated: boolean;
}
export const NavigationItems: FC<Props> = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link={'/'}>Burger Builder</NavigationItem>

      {props.isAuthenticated ? (
        <Fragment>
          <NavigationItem link={'/orders'}>Orders</NavigationItem>
          <NavigationItem link={'/logout'}>Logout</NavigationItem>
        </Fragment>
      ) : (
        <NavigationItem link={'/auth'}>Authenticate</NavigationItem>
      )}
    </ul>
  );
};
