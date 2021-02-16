import React, { FC, Fragment } from 'react';
import classes from './Layout.module.scss';
export const Layout: FC = ({ children }) => (
  <Fragment>
    <div>Toolbar,SideDrawr,Backdrop</div>
    <main className={classes.Content}>{children}</main>
  </Fragment>
);
