import React, { FC } from 'react';
import classes from './NavigationItem.module.scss';
type Props = {
  link: string;
  active: boolean;
};
export const NavigationItem: FC<Props> = (props) => (
  <li className={classes.NavigationItem}>
    <a href={props.link} className={props.active ? classes.active : undefined}>
      {props.children}
    </a>
  </li>
);
