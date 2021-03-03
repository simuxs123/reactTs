import React, { FC } from 'react';
import classes from './Spinner.module.scss';

export const Spinner: FC = () => (
  <div className={classes.Loader}>Loading...</div>
);
