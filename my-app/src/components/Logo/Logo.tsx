import React, { FC } from 'react';
import BurgerLogo from '../../assets/Images/burger-logo.png';
import classes from './Logo.module.scss';

export const Logo: FC = () => (
  <div className={classes.Logo}>
    <img src={BurgerLogo} alt="" />
  </div>
);
