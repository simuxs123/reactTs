import React, { FC, Fragment, useState } from 'react';
import classes from './Layout.module.scss';
import { Toolbar } from '../../components/Navigation/Toolbar/Toolbar';
import { SideDrawer } from '../../components/Navigation/SideDrawer/SideDrawer';
import { AuthStateProps } from '../../store/reducers/auth';
import { connect } from 'react-redux';
type State = boolean;
type Props = {
  children: JSX.Element;
  isAuthenticated: boolean;
};
const Layout: FC<Props> = (props) => {
  const [showSiderDrawer, setShowSiderDrawer] = useState<State>(false);

  const sideDrawerCloseHandler = (): void => {
    setShowSiderDrawer(!showSiderDrawer);
  };
  return (
    <Fragment>
      <Toolbar isAuth={props.isAuthenticated} toggle={sideDrawerCloseHandler} />
      <SideDrawer
        isAuth={props.isAuthenticated}
        show={showSiderDrawer}
        moduleClose={sideDrawerCloseHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Fragment>
  );
};
const mapStateToProps = ({ auth }: { auth: AuthStateProps }) => {
  return {
    isAuthenticated: auth.token !== '',
  };
};
export default connect(mapStateToProps)(Layout);
