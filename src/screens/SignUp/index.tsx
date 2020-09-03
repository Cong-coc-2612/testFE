import React from 'react';
import { connect } from 'react-redux';
import ReduxBlockUi from 'react-block-ui/redux';
import TextInput from 'components/TextInput';
import { IBigRequest } from 'interfaces/common';
import config from 'config';
import { checkUsernameExisted, setUsernameExistedDefault } from 'redux-saga/global-actions/CheckUsernameExisted-action';
import { checkEmailExisted, setEmailExistedDefault } from 'redux-saga/global-actions/CheckEmailExisted-action';
import { CHECK_USERNAME_EXISTED_SUCCESS, CHECK_USERNAME_EXISTED_FAILED } from 'redux-saga/global-reducers/IsUsernameExisted-reducer';
import { CHECK_EMAIL_EXISTED_FAILED, CHECK_EMAIL_EXISTED_SUCCESS } from 'redux-saga/global-reducers/IsEmailExisted-reducer';
import { CHECK_USERNAME_EXISTED, CHECK_EMAIL_EXISTED, SIGNUP } from 'redux-saga/actions';
import { IState } from 'redux-saga/reducers';
import { signUp } from './actions';
import { SIGNUP_FAILED, SIGNUP_SUCCESS } from './reducers';
import './styles.css';

interface ISignUpProps extends React.ClassAttributes<SignUp> {
  isUsernameExisted: boolean | null | {};
  isEmailExisted: boolean | null | {};

  signUp(param: IBigRequest): void;
  checkUsernameExisted(param: IBigRequest): void;
  checkEmailExisted(param: IBigRequest): void;
  setUsernameExistedDefault(): void;
  setEmailExistedDefault(): void;
}

interface ISignUpState {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  reConfirmPassword: string;
  usernameError: boolean;
  firstNameError: boolean;
  passwordError: boolean;
  lastNameError: boolean;
  usernameErrorContent: string;
  firstNameErrorContent: string;
  passwordErrorContent: string;
  lastNameErrorContent: string;
  emailError: boolean;
  reconfirmPasswordError: boolean;
  emailErrorContent: string;
  reconfirmPasswordErrorContent: string;
}

class SignUp extends React.Component<ISignUpProps, ISignUpState> {
  constructor(props: ISignUpProps) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      reConfirmPassword: '',
      usernameError: false,
      passwordError: false,
      firstNameError: false,
      lastNameError: false,
      usernameErrorContent: '',
      lastNameErrorContent: '',
      firstNameErrorContent: '',
      passwordErrorContent: '',
      emailError: false,
      reconfirmPasswordError: false,
      emailErrorContent: '',
      reconfirmPasswordErrorContent: '',
    };
  }

  shouldComponentUpdate(nextProps: ISignUpProps, nextState: ISignUpState) {
    if (this.props.isUsernameExisted !== nextProps.isUsernameExisted && nextProps.isUsernameExisted === true) {
      this.setState({
        usernameError: true,
        usernameErrorContent: 'Tài khoản này đã tồn tại',
      });
    }
    if (this.props.isUsernameExisted !== nextProps.isUsernameExisted && nextProps.isUsernameExisted === false) {
      this.setState({
        usernameError: false,
        usernameErrorContent: 'Tên đăng nhập có thể sử dụng được',
      });
    }
    if (this.props.isUsernameExisted !== nextProps.isUsernameExisted && nextProps.isUsernameExisted === null) {
      this.setState({
        usernameError: true,
        usernameErrorContent: 'Mất kết nối',
      });
    }
    if (this.props.isEmailExisted !== nextProps.isEmailExisted && nextProps.isEmailExisted === true) {
      this.setState({
        emailError: true,
        emailErrorContent: 'Email này đã được sử dụng',
      });
    }
    if (this.props.isEmailExisted !== nextProps.isEmailExisted && nextProps.isEmailExisted === false) {
      this.setState({
        emailError: false,
        emailErrorContent: 'Email có thể sử dụng được',
      });
    }
    if (this.props.isEmailExisted !== nextProps.isEmailExisted && nextProps.isEmailExisted === null) {
      this.setState({
        emailError: true,
        emailErrorContent: 'Mất kết nối',
      });
    }
    // if (this.props.isUsernameExisted !== nextProps.isUsernameExisted && nextProps.isUsernameExisted === {}) {
    //   this.setState({
    //     usernameError: false,
    //     usernameErrorContent: '',
    //   });
    // }
    return true;
  }

  private onChangeUserName = (value: string) => {
    this.setState({ username: value, });
  }

  private onChangeFirstName = (value: string) => {
    this.setState({ firstName: value, });
  }

  private onChangeLastName = (value: string) => {
    this.setState({ lastName: value, });
  }

  private validateUsername = () => {
    let usernameError = false;
    let usernameErrorContent = '';
    if (this.state.username.trim() === '' || !config.regex.username.test(this.state.username)) {
      usernameError = true;
      usernameErrorContent = 'Tên đăng nhập không được trống, và phải chứa từ 8 đến 32 kí tự';
    } else {
      const params = {
        path: '',
        param: {
          username: this.state.username,
        },
        data: {},
      };
      this.props.checkUsernameExisted(params);
    }

    return { usernameError, usernameErrorContent };
  }

  private onBlurUserName = () => {
    const { usernameError, usernameErrorContent } = this.validateUsername();
    this.setState({
      usernameError,
      usernameErrorContent,
    });
    this.props.setUsernameExistedDefault();
  }

  private validateEmail = () => {
    let emailError = false;
    let emailErrorContent = '';
    if (this.state.email.trim() === '' || !config.regex.email.test(this.state.email)) {
      emailError = true;
      emailErrorContent = 'Email không hợp lệ';
    } else {
      const params = {
        path: '',
        param: {
          email: this.state.email,
        },
        data: {},
      };
      this.props.checkEmailExisted(params);
    }

    return { emailError, emailErrorContent };
  }

  private onBlurEmail = () => {
    const { emailError, emailErrorContent } = this.validateEmail();
    this.setState({
      emailError,
      emailErrorContent,
    });
    this.props.setEmailExistedDefault();
  }

  private onChangePassword = (value: string) => {
    this.setState({ password: value, });
  }

  private onChangeEmail = (value: string) => {
    this.setState({ email: value, });
  }

  private onChangeReconfirmPassword = (value: string) => {
    this.setState({ reConfirmPassword: value, });
  }

  private validate = () => {
    let passwordError = false;
    let passwordErrorContent = '';
    let firstNameError = false;
    let firstNameErrorContent = '';
    let lastNameError = false;
    let lastNameErrorContent = '';
    let usernameErrorContent = '';
    let usernameError = false;
    let emailErrorContent = '';
    let emailError = false;
    let reconfirmPasswordErrorContent = '';
    let reconfirmPasswordError = false;
    if (this.state.password.includes(' ') || !config.regex.password.test(this.state.password) || this.state.password.trim() === '') {
      passwordError = true;
      passwordErrorContent = 'Mật khẩu không được trống, không chứa dấu cách, và phải chứa từ 8 đến 32 kí tự';
    }
    if (this.state.username.trim() === '' || !config.regex.username.test(this.state.username)) {
      usernameError = true;
      usernameErrorContent = 'Tên đăng nhập không được trống, và phải chứa từ 8 đến 32 kí tự';
    }
    if (this.state.firstName.trim() === '') {
      firstNameError = true;
      firstNameErrorContent = 'Tên không được trống';
    }
    if (this.state.lastName.trim() === '') {
      lastNameError = true;
      lastNameErrorContent = 'Họ không được trống';
    }
    if (this.state.email.trim() === '' || !config.regex.email.test(this.state.email)) {
      emailError = true;
      emailErrorContent = 'Email không hợp lệ';
    }
    if (this.state.reConfirmPassword !== this.state.password) {
      reconfirmPasswordError = true;
      reconfirmPasswordErrorContent = 'Nhập lại mật khẩu phải giống mật khẩu';
    }

    return { passwordError, passwordErrorContent, usernameErrorContent, usernameError, emailErrorContent, emailError, reconfirmPasswordErrorContent, reconfirmPasswordError, firstNameError, firstNameErrorContent, lastNameError, lastNameErrorContent };
  }

  private handleSignUp = () => {
    const { passwordError, passwordErrorContent, usernameErrorContent, usernameError, emailErrorContent, emailError, reconfirmPasswordErrorContent, reconfirmPasswordError, firstNameError, firstNameErrorContent, lastNameError, lastNameErrorContent } = this.validate();
    this.setState({
      passwordError,
      passwordErrorContent,
      usernameErrorContent,
      usernameError,
      emailErrorContent,
      emailError,
      reconfirmPasswordErrorContent,
      reconfirmPasswordError,
      firstNameError,
      firstNameErrorContent,
      lastNameError,
      lastNameErrorContent
    });
    if (passwordError === true || usernameError === true || reconfirmPasswordError === true || emailError === true || firstNameError === true || lastNameError === true) {
      return;
    }
    const params = {
      path: '',
      param: {},
      data: {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      },
    };

    this.props.signUp(params);
  }

  render() {
    return (
      <ReduxBlockUi
        tag="div"
        block={CHECK_USERNAME_EXISTED}
        unblock={[CHECK_USERNAME_EXISTED_SUCCESS, CHECK_USERNAME_EXISTED_FAILED]}
      >
        <ReduxBlockUi
          tag="div"
          block={CHECK_EMAIL_EXISTED}
          unblock={[CHECK_EMAIL_EXISTED_FAILED, CHECK_EMAIL_EXISTED_SUCCESS]}
        >
        <ReduxBlockUi
          tag="div"
          block={SIGNUP}
          unblock={[SIGNUP_FAILED, SIGNUP_SUCCESS]}
        >
          <div className="Container-login">
            <div className="Container-login-middle">
              <h2>Đăng ký</h2>
              <p className="Long-introduction">Bắt đầu dễ dàng bằng cách đăng ký để quản lý các giải đấu</p>

              <TextInput onHandleSubmit={this.handleSignUp} label={'Tên đăng nhập'} onChangeText={this.onChangeUserName} error={this.state.usernameError} errorContent={this.state.usernameErrorContent} onBlur={this.onBlurUserName} />
              <TextInput onHandleSubmit={this.handleSignUp} label={'Họ'} onChangeText={this.onChangeFirstName} error={this.state.firstNameError} errorContent={this.state.firstNameErrorContent} />
              <TextInput onHandleSubmit={this.handleSignUp} label={'Tên'} onChangeText={this.onChangeLastName} error={this.state.lastNameError} errorContent={this.state.lastNameErrorContent} />
              <TextInput onHandleSubmit={this.handleSignUp} label={'Email'} onChangeText={this.onChangeEmail} error={this.state.emailError} errorContent={this.state.emailErrorContent} onBlur={this.onBlurEmail} />
              <TextInput onHandleSubmit={this.handleSignUp} label={'Mật khẩu'} type={'password'} onChangeText={this.onChangePassword} error={this.state.passwordError} errorContent={this.state.passwordErrorContent} />
              <TextInput onHandleSubmit={this.handleSignUp} label={'Xác nhận mật khẩu'} type={'password'} onChangeText={this.onChangeReconfirmPassword} error={this.state.reconfirmPasswordError} errorContent={this.state.reconfirmPasswordErrorContent} />

              <div className="Button-login-container" onClick={this.handleSignUp}>
                <div className="Button-login">
                  <h4 className="Button-login-text">Đăng ký</h4>
                </div>
              </div>

            </div>
          </div>
        </ReduxBlockUi>
        </ReduxBlockUi>
      </ReduxBlockUi>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    isUsernameExisted: state.isUsernameExisted,
    isEmailExisted: state.isEmailExisted,
  };
};

export default connect(
  mapStateToProps,
  { signUp, checkUsernameExisted, setUsernameExistedDefault, checkEmailExisted, setEmailExistedDefault }
)(SignUp);