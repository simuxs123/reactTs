import React, { Component, FC, Fragment } from 'react';
import classes from './Layout.module.scss';
import { Toolbar } from '../../components/Navigation/Toolbar/Toolbar';
import { SideDrawer } from '../../components/Navigation/SideDrawer/SideDrawer';
type Props = {
  showSiderDrawer: boolean;
};
export class Layout extends Component<{}, Props> {
  state = {
    showSiderDrawer: false,
  };
  sideDrawerCloseHandler = () => {
    this.setState((prevState) => {
      return { showSiderDrawer: !prevState.showSiderDrawer };
    });
  };
  render() {
    return (
      <Fragment>
        <Toolbar toggle={this.sideDrawerCloseHandler} />
        <SideDrawer
          show={this.state.showSiderDrawer}
          moduleClose={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}
