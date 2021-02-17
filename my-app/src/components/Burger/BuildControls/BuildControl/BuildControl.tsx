import React, { FC } from 'react';
import classes from './BuildControl.module.scss';

interface Props {
  label: string;
  added(): void;
  remove(): void;
  disable: boolean;
}

export const BuildControl: FC<Props> = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.remove}
        disabled={props.disable}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.added}>
        More
      </button>
    </div>
  );
};
