import React, { Component, FC, Fragment } from 'react';
import classes from './Layout.module.scss';
import { Toolbar } from '../../components/Navigation/Toolbar/Toolbar';
import { SideDrawer } from '../../components/Navigation/SideDrawer/SideDrawer';
import { AuthStateProps } from '../../store/reducers/auth';
import { connect } from 'react-redux';
type State = {
  showSiderDrawer: boolean;
};
type Props = {
  children: JSX.Element;
  isAuthenticated: boolean;
};
class Layout extends Component<Props, State> {
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
        <Toolbar
          isAuth={this.props.isAuthenticated}
          toggle={this.sideDrawerCloseHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          show={this.state.showSiderDrawer}
          moduleClose={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ auth }: { auth: AuthStateProps }) => {
  return {
    isAuthenticated: auth.token !== '',
  };
};
export default connect(mapStateToProps)(Layout);
