import React, { FC, Fragment, useState, useEffect } from 'react';
import { Modal } from '../../components/UI/Modal/Modal';
import { AxiosInstance } from 'axios';
import useHttpErrorHandler from '../../hooks/http-error-handler';
interface State {
  error: string;
  errorClear(): void;
}
export const withErrorHandler = (
  WrappedComponent: typeof React.Component | FC<any>,
  instance: AxiosInstance
) => {
  return (
    props: JSX.IntrinsicAttributes &
      JSX.IntrinsicClassAttributes<React.Component<{}, {}, any>> &
      Readonly<{}> &
      Readonly<{ children?: React.ReactNode }>
  ) => {
    const [error, errorClear] = useHttpErrorHandler(instance);
    return (
      <Fragment>
        <Modal show={error ? true : false} moduleClose={errorClear}>
          {error ? error : null}
        </Modal>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};
