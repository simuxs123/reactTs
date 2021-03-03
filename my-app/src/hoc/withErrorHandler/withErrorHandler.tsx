import React, { FC, Fragment, Component } from 'react';
import { Modal } from '../../components/UI/Modal/Modal';
import { AxiosInstance } from 'axios';
type Props = {
  error: string | null;
};

export const withErrorHandler = (
  WrappedComponent: typeof React.Component,
  instance: AxiosInstance
) => {
  return class extends Component {
    state: Props = {
      error: null,
    };
    reqInterceptor!: number;
    resInterceptor!: number;

    componentWillMount() {
      this.reqInterceptor = instance.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = instance.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error.message });
        }
      );
    }
    componentWillUnmount() {
      instance.interceptors.request.eject(this.reqInterceptor);
      instance.interceptors.response.eject(this.resInterceptor);
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Fragment>
          <Modal
            show={this.state.error ? true : false}
            moduleClose={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};
