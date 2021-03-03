import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.scss';
type Props = {
  link: string;
};
export const NavigationItem: FC<Props> = (props) => (
  <li className={classes.NavigationItem}>
    <NavLink exact activeClassName={classes.active} to={props.link}>
      {props.children}
    </NavLink>
  </li>
);
