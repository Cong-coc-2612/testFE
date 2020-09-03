import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import * as H from 'history';
import { StaticContext } from 'react-router';
import { IBigRequest } from 'interfaces/common';
import store from 'redux-saga/store';
import { IState } from 'redux-saga/reducers';
import { activeAccount } from './actions';
import { ACTIVE_ACCOUNT_DEFAULT } from './reducers';
import './styles.css';

interface IActiveAccountProps extends React.ClassAttributes<ActiveAccount> {
  routerInfo: RouteComponentProps<any, StaticContext, H.LocationState>;
  activeAccountStatus: boolean | null;

  activeAccount(params: IBigRequest): void;
}

interface IActiveAccountState {
}

class ActiveAccount extends React.Component<IActiveAccountProps, IActiveAccountState> {
  constructor(props: IActiveAccountProps) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    const params = {
      path: '',
      param: {},
      data: {
        code: this.props.routerInfo.match.params.tokenVerify,
      },
    };

    this.props.activeAccount(params);
  }

  componentWillUnmount() {
    store.dispatch({
      type: ACTIVE_ACCOUNT_DEFAULT,
      payload: null,
    });
  }

  render() {
    if (this.props.activeAccountStatus == null) {
      return (
        <div className="Container-login">
          <div className="Container-login-middle">
            <h2>Vui lòng chờ trong giây lát</h2>
            <p className="Long-introduction">Chúng tôi đang kích hoạt tài khoản cho bạn</p>
          </div>
        </div>
      );
    } else if (this.props.activeAccountStatus === true) {
      return (
        <div className="Container-login">
          <div className="Container-login-middle">
            <h2>Bạn đã kích hoạt tài khoản thành công</h2>
            <p className="Long-introduction">Bây giờ hãy đăng nhập lại 1 lần nữa</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Container-login">
          <div className="Container-login-middle">
            <h2>Đã có lỗi xảy ra</h2>
            <p className="Long-introduction">Bạn vui lòng thử lại sau</p>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state: IState) => {
  return {
    activeAccountStatus: state.activeAccountStatus,
  };
};

export default connect(
  mapStateToProps,
  {
    activeAccount,
  }
)(ActiveAccount);