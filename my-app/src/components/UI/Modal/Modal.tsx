import React, { Component, Fragment } from 'react';
import classes from './Modal.module.scss';
import { Backdrop } from '../Backdrop/Backdrop';
export interface Props {
  show: boolean;
  moduleClose(): void;
}
export class Modal extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return nextProps.show !== this.props.show;
  }

  render() {
    return (
      <Fragment>
        <Backdrop show={this.props.show} moduleClose={this.props.moduleClose} />
        <div
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(100vh)',
            opacity: this.props.show ? 1 : 0,
          }}
          className={classes.Modal}
        >
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}
