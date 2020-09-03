import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput';
import { IBigRequest } from 'interfaces/common';
import config from 'config';
import { forgotPassword } from './actions';
import './styles.css';

interface IForgotPasswordProps extends React.ClassAttributes<ForgotPassword> {
  forgotPassword(param: IBigRequest): void;
}

interface IForgotPasswordState {
  email: string;
  emailError: boolean;
  emailErrorContent: string;
}

class ForgotPassword extends React.Component<IForgotPasswordProps, IForgotPasswordState> {
  constructor(props: IForgotPasswordProps) {
    super(props);
    this.state = {
      email: '',
      emailError: false,
      emailErrorContent: '',
    };
  }

  private onChangeEmail = (value: string) => {
    this.setState({ email: value, });
  }

  private validate = () => {
    let emailError = false;
    let emailErrorContent = '';
    if (this.state.email.trim() === '' || !config.regex.email.test(this.state.email)) {
      emailError = true;
      emailErrorContent = 'Email không hợp lệ';
    }

    return { emailError, emailErrorContent };
  }

  private handleSubmitForm = () => {
    const { emailError, emailErrorContent, } = this.validate();
    this.setState({
      emailError,
      emailErrorContent,
    });
    if (emailError === true) {
      return;
    }
    const params = {
      path: '',
      param: {},
      data: {
        email: this.state.email,
      },
    };

    this.props.forgotPassword(params);
  }

  render() {
    return (
      <div className="Container-login">
        <div className="Container-login-middle">
          <h2>Quên mật khẩu</h2>
          <p className="Long-introduction">Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu của bạn.</p>

          <TextInput onHandleSubmit={this.handleSubmitForm} label={'Email của bạn'} onChangeText={this.onChangeEmail} error={this.state.emailError} errorContent={this.state.emailErrorContent} />
          <div className="Button-login-container">
            <div className="Button-login" onClick={this.handleSubmitForm}>
              <h4 className="Button-login-text">Gửi</h4>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { forgotPassword, }
)(ForgotPassword);