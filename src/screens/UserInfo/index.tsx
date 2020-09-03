import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import * as H from 'history';
import { StaticContext } from 'react-router';
import Skeleton from 'react-loading-skeleton';
import ReduxBlockUi from 'react-block-ui/redux';
import { AiFillCamera } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select, { ValueType, OptionTypeBase } from 'react-select';
import CustomTab from 'components/CustomTab';
import UserInfoOverview from 'components/UserInfoOverview';
import UserInfoTournament from 'components/UserInfoTournament';
import Teams from 'components/Teams';
import TextInput from 'components/TextInput';
import { IParams, IBigRequest } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import { formatGender } from 'utils/common';
import { formatStringToDate, formatDateToString, formatDateToDisplay } from 'utils/datetime';
import config from 'config';
import { EDIT_USER_INFO } from 'redux-saga/actions';
import { EDIT_USER_INFO_SUCCESS, EDIT_USER_INFO_FAILED } from './reducers';
import { queryUserInfo, editUserInfo, updateBackground, updateAvatar } from './actions';
import './styles.css';

interface IUserInfoProps extends React.ClassAttributes<UserInfo> {
  routerInfo: RouteComponentProps<any, StaticContext, H.LocationState>;
  userInfo: IParams | null;

  queryUserInfo(param: IBigRequest): void;
  editUserInfo(param: IBigRequest): void;
  updateBackground(param: IBigRequest): void;
  updateAvatar(param: IBigRequest): void;
}

interface IUserInfoState {
  editMode: boolean;
  firstName: string;
  firstNameErrorContent: string;
  firstNameError: boolean;
  lastName: string;
  lastNameErrorContent: string;
  lastNameError: boolean;
  email: string;
  emailErrorContent: string;
  emailError: boolean;
  address: string;
  addressErrorContent: string;
  addressError: boolean;
  phoneNumberErrorContent: string;
  phoneNumberError: boolean;
  gender: ValueType<OptionTypeBase>;
  dateOfBirth: Date;
  phoneNumber: string;
}

const genderOptions = [
  { value: true, label: 'Nam' },
  { value: false, label: 'Nữ' },
];

class UserInfo extends React.Component<IUserInfoProps, IUserInfoState> {
  constructor(props: IUserInfoProps) {
    super(props);
    this.state = {
      editMode: false,
      firstName: '',
      firstNameErrorContent: '',
      firstNameError: false,
      lastName: '',
      lastNameErrorContent: '',
      lastNameError: false,
      email: '',
      emailErrorContent: '',
      emailError: false,
      address: '',
      addressErrorContent: '',
      addressError: false,
      phoneNumber: '',
      phoneNumberErrorContent: '',
      phoneNumberError: false,
      gender: { value: true, label: 'Nam' },
      dateOfBirth: new Date(),
    };
  }

  shouldComponentUpdate(nextProps: IUserInfoProps, nextState: IUserInfoState) {
    if (this.props.userInfo !== nextProps.userInfo) {
      this.setState({
        editMode: false,
      });
    }
    return true;
  }

  componentDidMount() {
    this.requestData();
  }

  private requestData = () => {
    const params = {
      path: '',
      param: {
        id: Number(this.props.routerInfo.match.params.userId),
      },
      data: {},
    };
    this.props.queryUserInfo(params);
  }

  private handleOpenEditUserInfo = () => {
    this.setState({
      editMode: true,
      firstName: this.props.userInfo != null && (this.props.userInfo.User as unknown as IParams).firstName != null ? (this.props.userInfo.User as unknown as IParams).firstName as string : '',
      lastName: this.props.userInfo != null && (this.props.userInfo.User as unknown as IParams).lastName != null ? (this.props.userInfo.User as unknown as IParams).lastName as string : '',
      email: this.props.userInfo != null && (this.props.userInfo.User as unknown as IParams).email != null ? (this.props.userInfo.User as unknown as IParams).email as string : '',
      address: this.props.userInfo != null && (this.props.userInfo.User as unknown as IParams).address != null ? (this.props.userInfo.User as unknown as IParams).address as string : '',
      phoneNumber: this.props.userInfo != null && (this.props.userInfo.User as unknown as IParams).phoneNumber != null ? (this.props.userInfo.User as unknown as IParams).phoneNumber as string : '',
      gender: this.props.userInfo != null && (this.props.userInfo.User as unknown as IParams).gender === true ? { value: true, label: 'Nam' } : { value: false, label: 'Nữ' },
      dateOfBirth: this.props.userInfo != null && (this.props.userInfo.User as unknown as IParams).dob != null ? formatStringToDate((this.props.userInfo.User as unknown as IParams).dob as string, 'yyyy-MM-dd') : new Date(),
    });
  }

  private validate = () => {
    let firstNameError = false;
    let firstNameErrorContent = '';
    let lastNameErrorContent = '';
    let lastNameError = false;
    let emailErrorContent = '';
    let emailError = false;
    let addressErrorContent = '';
    let addressError = false;
    let phoneNumberErrorContent = '';
    let phoneNumberError = false;
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
    if (!config.regex.phoneNumber.test(this.state.phoneNumber)) {
      phoneNumberError = true;
      phoneNumberErrorContent = 'Số điện thoại không hợp lệ';
    }

    return {
      firstNameError,
      firstNameErrorContent,
      lastNameErrorContent,
      lastNameError,
      emailError,
      emailErrorContent,
      addressError,
      addressErrorContent,
      phoneNumberError,
      phoneNumberErrorContent
    };
  }

  private handleCloseEditUserInfo = () => {
    const { firstNameError,
      firstNameErrorContent,
      lastNameErrorContent,
      lastNameError,
      emailError,
      emailErrorContent,
      addressError,
      addressErrorContent,
      phoneNumberError,
      phoneNumberErrorContent } = this.validate();
    this.setState({
      firstNameError,
      firstNameErrorContent,
      lastNameErrorContent,
      lastNameError,
      emailError,
      emailErrorContent,
      addressError,
      addressErrorContent,
      phoneNumberError,
      phoneNumberErrorContent
    });
    if (firstNameError === true || lastNameError === true || emailError === true || addressError === true || phoneNumberError === true) {
      return;
    }
    const params = {
      path: '',
      param: {
        id: Number(this.props.routerInfo.match.params.userId),
      },
      data: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        dob: formatDateToString(this.state.dateOfBirth, 'yyyy-MM-dd'),
        email: this.state.email,
        gender: (this.state.gender as IParams).value,
        address: this.state.address,
        username: this.props.userInfo != null && (this.props.userInfo.User as unknown as IParams).username,
        phoneNumber: this.state.phoneNumber,
        roleId: this.props.userInfo != null && (this.props.userInfo.User as unknown as IParams).roleId,
        status: this.props.userInfo != null && (this.props.userInfo.User as unknown as IParams).status,
        url: this.props.userInfo != null && (this.props.userInfo.User as unknown as IParams).url,
      },
    };

    this.props.editUserInfo(params)
  }

  private onChangeFirstName = (value: string) => {
    this.setState({ firstName: value, });
  }

  private onChangeLastName = (value: string) => {
    this.setState({ lastName: value, });
  }

  private onChangeAddress = (value: string) => {
    this.setState({ address: value, });
  }

  private onChangePhoneNumber = (value: string) => {
    this.setState({ phoneNumber: value, });
  }

  private onChangeGender = (value: ValueType<OptionTypeBase>) => {
    this.setState({ gender: value, });
  }

  private handleChangeDateOfBirth = (value: Date) => {
    this.setState({
      dateOfBirth: value,
    });
  };

  private updateBackground = (selectorFiles: FileList | null) => {
    if (selectorFiles !== null && selectorFiles.length > 0) {
      const params = {
        path: '',
        param: {
          id: Number(this.props.routerInfo.match.params.userId),
          file: selectorFiles,
        },
        data: {
        },
      };

      this.props.updateBackground(params);
    }
  };

  private updateAvatar = (selectorFiles: FileList | null) => {
    if (selectorFiles !== null && selectorFiles.length > 0) {
      const params = {
        path: '',
        param: {
          id: Number(this.props.routerInfo.match.params.userId),
          file: selectorFiles,
        },
        data: {
        },
      };

      this.props.updateAvatar(params);
    }
  };

  render() {
    const tabList = [
      'Tổng quan',
      'Giải đấu',
      // 'Đội đang quản lý'
    ];
    const componentList = [
      <UserInfoOverview />,
      <UserInfoTournament userId={Number(this.props.routerInfo.match.params.userId)} />,
      // <Teams id={Number(this.props.routerInfo.match.params.userId)} type={'user'} />
    ];
    return (
      <div className="UserInfo-Container">
        <div className="UserInfo-background-image-container UserInfo-background-image-container2">
          <img className={'UserInfo-background-image'} src={require('../../assets/image-384.png')} alt={'logo'} />
          {this.props.userInfo != null && (this.props.userInfo as IParams).Config != null && ((this.props.userInfo as unknown as IParams).Config as unknown as IParams).canEdit === true && <AiFillCamera className={'UserInfo-change-image-icon'} />}
          {this.props.userInfo != null && (this.props.userInfo as IParams).Config != null && ((this.props.userInfo as unknown as IParams).Config as unknown as IParams).canEdit === true && <div className={'Overlay'}>
            <input type="file" onChange={(e) => this.updateBackground(e.target.files)} />
          </div>}
        </div>
        <div className="UserInfo-content-container">
          <div className="UserInfo-content-info-container">
            <ReduxBlockUi
              tag="div"
              block={EDIT_USER_INFO}
              unblock={[EDIT_USER_INFO_SUCCESS, EDIT_USER_INFO_FAILED]}
            >
              <img className={'UserInfo-avatar-image'} src={require('../../assets/7ab1b0125d485c8dd6a4e78832b0a4b2fbed3cf8.png')} alt={'logo'} />
              {this.props.userInfo != null && (this.props.userInfo as IParams).Config != null && ((this.props.userInfo as unknown as IParams).Config as unknown as IParams).canEdit === true && <AiFillCamera className={'UserInfo-change-avatar-icon'} />}
              {this.props.userInfo != null && (this.props.userInfo as IParams).Config != null && ((this.props.userInfo as unknown as IParams).Config as unknown as IParams).canEdit === true && <div className={'Overlay2'}>
                <input type="file" onChange={(e) => this.updateAvatar(e.target.files)} />
              </div>}
              <div className="UserInfo-content-info-basic-info-container">
                {this.state.editMode !== false &&
                  <div className="UserInfo-content-info-basic-info-container-singleRow">
                    <h4>Sửa thông tin cơ bản</h4>
                  </div>}
                {this.state.editMode === false ?
                  <div className="UserInfo-content-info-basic-info-container-singleRow">
                    <p className="UserInfo-name-text">{this.props.userInfo != null && this.props.userInfo.User != null && (this.props.userInfo.User as unknown as IParams).firstName != null && (this.props.userInfo.User as unknown as IParams).lastName != null ? `${(this.props.userInfo.User as unknown as IParams).firstName} ${(this.props.userInfo.User as unknown as IParams).lastName}` : <Skeleton width={250} height={30} />}</p>
                  </div> :
                  <div className="UserInfo-content-info-basic-info-container-singleRow">
                    <TextInput style={{ width: 300 }} label={'Tên'} value={this.state.firstName} onChangeText={this.onChangeFirstName} error={this.state.firstNameError} errorContent={this.state.firstNameErrorContent} />
                  </div>}
                {this.state.editMode !== false &&
                  <div className="UserInfo-content-info-basic-info-container-singleRow">
                    <TextInput style={{ width: 300 }} label={'Họ'} value={this.state.lastName} onChangeText={this.onChangeLastName} error={this.state.lastNameError} errorContent={this.state.lastNameErrorContent} />
                  </div>}
                {this.state.editMode === false ?
                  <div className="UserInfo-content-info-basic-info-container-singleRow">
                    <p className="UserInfo-otherInfo-text">{this.props.userInfo != null && this.props.userInfo.User != null ? `Giới tính: ${formatGender((this.props.userInfo.User as unknown as IParams).gender as boolean | null)}` : <Skeleton width={100} height={20} />}</p>
                  </div> :
                  <div className="UserInfo-content-info-basic-info-container-singleRow">
                    <p>Giới tính</p>
                    <Select
                      options={genderOptions}
                      className="Select"
                      defaultValue={this.state.gender}
                      value={this.state.gender}
                      onChange={this.onChangeGender}
                      menuPlacement={'top'}
                    />
                  </div>}
                {this.state.editMode === false ?
                  <div className="UserInfo-content-info-basic-info-container-singleRow">
                    <p className="UserInfo-otherInfo-text">{this.props.userInfo != null && this.props.userInfo.User != null ? `Ngày sinh: ${formatDateToDisplay((this.props.userInfo.User as unknown as IParams).dob as string, 'dd/MM/yyyy', 'yyyy-MM-dd')}` : <Skeleton width={200} height={20} />}</p>
                  </div> :
                  <div className="UserInfo-content-info-basic-info-container-singleRow">
                    <p className="UserInfo-otherInfo-text">Ngày sinh</p>
                    <DatePicker
                      selected={this.state.dateOfBirth}
                      dateFormat="dd/MM/yyyy"
                      onChange={this.handleChangeDateOfBirth}
                      maxDate={new Date()}
                    />
                  </div>}
                {this.state.editMode === false &&
                  <div className="UserInfo-content-info-basic-info-container-singleRow">
                  <p className="UserInfo-otherInfo-text">{this.props.userInfo != null && this.props.userInfo.User != null ? `Email: ${(this.props.userInfo.User as unknown as IParams).email != null ? (this.props.userInfo.User as unknown as IParams).email : ''}` : <Skeleton width={200} height={20} />}</p>
                  </div>}
                {this.state.editMode === false ?
                  <div className="UserInfo-content-info-basic-info-container-singleRow">
                    <p className="UserInfo-otherInfo-text">{this.props.userInfo != null && this.props.userInfo.User != null ? `Địa chỉ: ${(this.props.userInfo.User as unknown as IParams).address != null ? (this.props.userInfo.User as unknown as IParams).address : ''}` : <Skeleton width={300} height={20} />}</p>
                  </div> :
                  <div className="UserInfo-content-info-basic-info-container-singleRow">
                    <TextInput style={{ width: 500 }} label={'Địa chỉ'} value={this.state.address} onChangeText={this.onChangeAddress} error={this.state.addressError} errorContent={this.state.addressErrorContent} />
                  </div>}
                {this.state.editMode === false ?
                  <div className="UserInfo-content-info-basic-info-container-singleRow">
                    <p className="UserInfo-otherInfo-text">{this.props.userInfo != null && this.props.userInfo.User != null ? `Số điện thoại: ${(this.props.userInfo.User as unknown as IParams).phoneNumber != null ? (this.props.userInfo.User as unknown as IParams).phoneNumber : ''}` : <Skeleton width={200} height={20} />}</p>
                  </div> :
                  <div className="UserInfo-content-info-basic-info-container-singleRow">
                    <TextInput style={{ width: 500 }} label={'Số điện thoại'} value={this.state.phoneNumber} onChangeText={this.onChangePhoneNumber} error={this.state.phoneNumberError} errorContent={this.state.phoneNumberErrorContent} />
                  </div>}
                <div className="UserInfo-content-info-basic-info-container-singleRow">
                  {this.props.userInfo != null && this.props.userInfo.Config != null && (this.props.userInfo as IParams).Config != null && ((this.props.userInfo as IParams).Config as unknown as IParams).canEdit === true && (this.state.editMode === false ? <div className="UserInfo-button-container">
                    <div className="UserInfo-button" onClick={this.handleOpenEditUserInfo}>
                      <h4 className="UserInfo-button-text">Chỉnh sửa thông tin</h4>
                    </div>
                  </div> : <div className="UserInfo-button-container">
                      <div className="UserInfo-button" onClick={this.handleCloseEditUserInfo}>
                        <h4 className="UserInfo-button-text">Lưu</h4>
                      </div>
                    </div>)}
                </div>
              </div>
            </ReduxBlockUi>
            {this.props.userInfo != null && this.props.userInfo.User != null && <div className="UserInfo-content-info-advanced-info-container">
              <CustomTab tabList={tabList} componentList={componentList} selectedIndex={0}></CustomTab>
            </div>}
          </div>
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    userInfo: state.userInfo,
  };
};

export default connect(
  mapStateToProps,
  {
    queryUserInfo,
    editUserInfo,
    updateBackground,
    updateAvatar
  }
)(UserInfo);