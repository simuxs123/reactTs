import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions';
type Props = {
  onLogout(): void;
};

const Logout: FC<Props> = (props) => {
  const { onLogout } = props;
  useEffect(() => {
    onLogout();
  }, [onLogout]);
  return <Redirect to="/" />;
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};
export default connect(null, mapDispatchToProps)(Logout);
