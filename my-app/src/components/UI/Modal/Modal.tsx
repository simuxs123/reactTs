import React, { FC, Fragment, ReactNode } from 'react';
import classes from './Modal.module.scss';
import { Backdrop } from '../Backdrop/Backdrop';
export interface Props {
  show: boolean;
  moduleClose(): void;
  children: ReactNode;
}
export const Modal: FC<Props> = React.memo(
  (props) => {
    // shouldComponentUpdate(nextProps: Props) {
    //   return (
    //     nextProps.show !== this.props.show ||
    //     nextProps.children !== this.props.children
    //   );
    // }

    return (
      <Fragment>
        <Backdrop show={props.show} moduleClose={props.moduleClose} />
        <div
          style={{
            transform: props.show ? 'translateY(0)' : 'translateY(100vh)',
            opacity: props.show ? 1 : 0,
          }}
          className={classes.Modal}
        >
          {props.children}
        </div>
      </Fragment>
    );
  },
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
