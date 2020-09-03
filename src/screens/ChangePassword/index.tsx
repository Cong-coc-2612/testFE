import React from 'react';
import { connect } from 'react-redux';
import ReduxBlockUi from 'react-block-ui/redux';
import TextInput from 'components/TextInput';
import { IBigRequest } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import { CHANGE_PASSWORD } from 'redux-saga/actions';
import { CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILED } from 'screens/ChangePassword/reducers';
import { changePassword } from './actions';
import './styles.css';

interface IChangePasswordProps extends React.ClassAttributes<ChangePassword> {
  changePassword(params: IBigRequest): void;
}

interface IChangePasswordState {
  oldPassword: string;
  newPassword: string;
  reconfirmPassword: string;
  oldPasswordError: boolean;
  newPasswordError: boolean;
  reconfirmPasswordError: boolean;
  oldPasswordErrorContent: string;
  newPasswordErrorContent: string;
  reconfirmPasswordErrorContent: string;
}

class ChangePassword extends React.Component<IChangePasswordProps, IChangePasswordState> {
  constructor(props: IChangePasswordProps) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      reconfirmPassword: '',
      oldPasswordError: false,
      oldPasswordErrorContent: '',
      newPasswordError: false,
      reconfirmPasswordError: false,
      newPasswordErrorContent: '',
      reconfirmPasswordErrorContent: '',
    };
  }

  private onChangeOldPassword = (value: string) => {
    this.setState({ oldPassword: value, });
  }

  private onChangeNewPassword = (value: string) => {
    this.setState({ newPassword: value, });
  }

  private onChangeReconfirmPassword = (value: string) => {
    this.setState({ reconfirmPassword: value, });
  }

  private validate = () => {
    let newPasswordError = false;
    let newPasswordErrorContent = '';
    let oldPasswordErrorContent = '';
    let oldPasswordError = false;
    let reconfirmPasswordErrorContent = '';
    let reconfirmPasswordError = false;
    if (this.state.newPassword.includes(' ') || this.state.newPassword.trim() === '') {
      newPasswordError = true;
      newPasswordErrorContent = 'Mật khẩu không được trống, và không chứa dấu cách';
    }
    if (this.state.oldPassword.trim() === '' || this.state.oldPassword.includes(' ')) {
      oldPasswordError = true;
      oldPasswordErrorContent = 'Mật khẩu không được trống, và không chứa dấu cách';
    }
    if (newPasswordError !== true && oldPasswordError !== true && this.state.newPassword === this.state.oldPassword) {
      newPasswordError = true;
      newPasswordErrorContent = 'Mật khẩu mới không được giống mật khẩu cũ';
    }
    if (this.state.reconfirmPassword.trim() === '' || this.state.reconfirmPassword.includes(' ')) {
      reconfirmPasswordError = true;
      reconfirmPasswordErrorContent = 'Mật khẩu không được trống, và không chứa dấu cách';
    } else if (this.state.reconfirmPassword !== this.state.newPassword && newPasswordError !== true) {
      reconfirmPasswordError = true;
      reconfirmPasswordErrorContent = 'Xác nhận mật khẩu không hợp lệ';
    }

    return { newPasswordError, newPasswordErrorContent, oldPasswordErrorContent, oldPasswordError, reconfirmPasswordErrorContent, reconfirmPasswordError };
  }

  private handleChangePassword = () => {
    const { newPasswordError, newPasswordErrorContent, oldPasswordErrorContent, oldPasswordError, reconfirmPasswordErrorContent, reconfirmPasswordError } = this.validate();
    this.setState({
      newPasswordError,
      newPasswordErrorContent,
      oldPasswordErrorContent,
      oldPasswordError,
      reconfirmPasswordErrorContent,
      reconfirmPasswordError
    });
    if (newPasswordError === true || oldPasswordError === true || reconfirmPasswordError === true) {
      return;
    }
    const params = {
      path: '',
      param: {},
      data: {
        oldPassword: this.state.oldPassword,
        password: this.state.newPassword,
      },
    };

    this.props.changePassword(params);
  }

  render() {
    return (
      <ReduxBlockUi
        tag="div"
        block={CHANGE_PASSWORD}
        unblock={[CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILED]}
      >
        <div className="Container-changePassword">
          <div className="Container-changePassword-middle">
            <h2>Đổi mật khẩu</h2>
            <TextInput label={'Mật khẩu cũ'} type={'password'} onChangeText={this.onChangeOldPassword} error={this.state.oldPasswordError} errorContent={this.state.oldPasswordErrorContent} />
            <TextInput label={'Mật khẩu mới'} type={'password'} onChangeText={this.onChangeNewPassword} error={this.state.newPasswordError} errorContent={this.state.newPasswordErrorContent} />
            <TextInput label={'Xác nhận mật khẩu'} type={'password'} onChangeText={this.onChangeReconfirmPassword} error={this.state.reconfirmPasswordError} errorContent={this.state.reconfirmPasswordErrorContent} />
            <div className="Button-changePassword-container">
              <div className="Button-changePassword" onClick={this.handleChangePassword}>
                <h4 className="Button-changePassword-text">Đổi mật khẩu</h4>
              </div>
            </div>
          </div>
        </div>
      </ReduxBlockUi>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  {
    changePassword,
  }
)(ChangePassword);