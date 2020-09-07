import React from 'react';
import { connect } from 'react-redux';
import ReduxBlockUi from 'react-block-ui/redux';
import { isAfter, isBefore } from 'date-fns';
import DatePicker from "react-datepicker";
import 'react-block-ui/style.css';
import TextInput from 'components/TextInput';
import { IBigRequest, IParams } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import { formatStringToDate, formatDateToString } from 'utils/datetime';
import { checkUsernameExisted, setUsernameExistedDefault } from 'redux-saga/global-actions/CheckUsernameExisted-action';
import { CHECK_USERNAME_EXISTED, EDIT_TOURNAMENT_INFO } from 'redux-saga/actions';
import { CHECK_USERNAME_EXISTED_SUCCESS, CHECK_USERNAME_EXISTED_FAILED } from 'redux-saga/global-reducers/IsUsernameExisted-reducer';
import { editTournamentInfo } from './actions';
import { EDIT_TOURNAMENT_INFO_SUCCESS, EDIT_TOURNAMENT_INFO_FAILED } from './reducers';
import './styles.css';

interface ITournamentSettingProps extends React.ClassAttributes<TournamentSetting> {
  isUsernameExisted: boolean | null | {};
  tournamentInfo: IParams;
  tournamentId: number;

  checkUsernameExisted(param: IBigRequest): void;
  editTournamentInfo(param: IBigRequest): void;
  setUsernameExistedDefault(): void;
}

interface ITournamentSettingState {
  listManager: string[];
  username: string;
  usernameError: boolean;
  usernameErrorContent: string;
  tournamentName: string;
  tournamentNameError: boolean;
  tournamentNameErrorContent: string;
  tournamentShortName: string;
  tournamentShortNameError: boolean;
  tournamentShortNameErrorContent: string;
  description: string;
  descriptionError: boolean;
  descriptionErrorContent: string;
  startLocation: string;
  startLocationError: boolean;
  startLocationErrorContent: string;
  endLocation: string;
  endLocationError: boolean;
  endLocationErrorContent: string;
  donor: string;
  donorError: boolean;
  donorErrorContent: string;
  startDate: Date;
  endDate: Date;
  endFormDate: Date;
  startFormDate: Date;
}

class TournamentSetting extends React.Component<ITournamentSettingProps, ITournamentSettingState> {
  constructor(props: ITournamentSettingProps) {
    super(props);
    const { tournamentInfo } = props;
    this.state = {
      listManager: ['Phạm Minh Hiếu', 'Phan Trọng Nhân', 'Đỗ Văn Công', '4', '5', '6', '7'],
      donor: tournamentInfo.donor as string,
      donorError: false,
      donorErrorContent: '',
      endLocation: tournamentInfo.closingLocation as string,
      endLocationError: false,
      endLocationErrorContent: '',
      startLocation: tournamentInfo.openingLocation as string,
      startLocationError: false,
      startLocationErrorContent: '',
      description: tournamentInfo.description as string,
      descriptionError: false,
      descriptionErrorContent: '',
      tournamentShortName: tournamentInfo.shortName as string,
      tournamentShortNameError: false,
      tournamentShortNameErrorContent: '',
      tournamentName: tournamentInfo.fullName as string,
      tournamentNameError: false,
      tournamentNameErrorContent: '',
      username: '',
      usernameError: false,
      usernameErrorContent: '',
      startDate: formatStringToDate(tournamentInfo.openingTime as string, 'yyyy-MM-dd HH:mm:ss'),
      endDate: formatStringToDate(tournamentInfo.closingTime as string, 'yyyy-MM-dd HH:mm:ss'),
      endFormDate: formatStringToDate(tournamentInfo.openingTime as string, 'yyyy-MM-dd HH:mm:ss'),
      startFormDate: formatStringToDate(tournamentInfo.openingTime as string, 'yyyy-MM-dd HH:mm:ss'),
    };
  }

  shouldComponentUpdate(nextProps: ITournamentSettingProps, nextState: ITournamentSettingState) {
    if (this.props.isUsernameExisted !== nextProps.isUsernameExisted && nextProps.isUsernameExisted === true) {
      this.addManager(this.state.username);
    }
    if (this.props.isUsernameExisted !== nextProps.isUsernameExisted && nextProps.isUsernameExisted === false) {
      this.setState({
        usernameError: true,
        usernameErrorContent: 'Tài khoản không hợp lệ',
      });
    }
    if (this.props.isUsernameExisted !== nextProps.isUsernameExisted && nextProps.isUsernameExisted === null) {
      this.setState({
        usernameError: true,
        usernameErrorContent: 'Mất kết nối',
      });
    }
    if (this.props.isUsernameExisted !== nextProps.isUsernameExisted && nextProps.isUsernameExisted === {}) {
      this.setState({
        usernameError: false,
        usernameErrorContent: '',
      });
    }
    return true;
  }

  private addManager = (username: string) => {
    this.setState({
      listManager: this.state.listManager.concat(username),
    });
  }

  private onDeleteManager = (itemm: string) => {
    this.setState({
      listManager: this.state.listManager.filter((item) => item !== itemm),
    });
  }

  private onChangeUsername = (value: string) => {
    this.setState({ username: value, });
  }

  private onChangeTournamentName = (value: string) => {
    this.setState({ tournamentName: value, });
  }

  private onChangeTournamentShortName = (value: string) => {
    this.setState({ tournamentShortName: value, });
  }

  private onChangeDescription = (value: string) => {
    this.setState({ description: value, });
  }

  private onChangeStartLocation = (value: string) => {
    this.setState({ startLocation: value, });
  }

  private onChangeEndLocation = (value: string) => {
    this.setState({ endLocation: value, });
  }

  private onChangeDonor = (value: string) => {
    this.setState({ donor: value, });
  }

  private validate = () => {
    let usernameError = false;
    let usernameErrorContent = '';
    if (this.state.username.trim() === '') {
      usernameError = true;
      usernameErrorContent = 'Tên đăng nhập không được trống';
    } else if (this.state.listManager.includes(this.state.username.trim())) {
      usernameError = true;
      usernameErrorContent = 'Người dùng này đã là quản lý';
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

  private handleChangeStartDate = (value: Date) => {
    if (isAfter(value, this.state.endDate)) {
      this.setState({
        startDate: value,
        endDate: value,
      });
    } else if (isBefore(value, this.state.startFormDate)) {
      this.setState({
        startDate: value,
        startFormDate: value,
        endFormDate: value,
      });
    } else if (isBefore(value, this.state.endFormDate)) {
      this.setState({
        startDate: value,
        endFormDate: value,
      });
    } else {
      this.setState({
        startDate: value,
      });
    }
  };

  private handleChangeStartFormDate = (value: Date) => {
    if (isAfter(value, this.state.endFormDate)) {
      this.setState({
        startFormDate: value,
        endFormDate: value,
      });
    } else {
      this.setState({
        startFormDate: value,
      });
    }
  };

  private handleChangeEndDate = (value: Date) => {
    if (isBefore(value, this.state.startDate)) {
      if (isBefore(value, this.state.startFormDate)) {
        this.setState({
          startFormDate: value,
          endFormDate: value,
          endDate: value,
          startDate: value,
        });
      } else if (isBefore(value, this.state.endFormDate)) {
        this.setState({
          endFormDate: value,
          endDate: value,
          startDate: value,
        });
      } else {
        this.setState({
          startDate: value,
          endDate: value,
        });
      }
    } else {
      this.setState({
        endDate: value,
      });
    }
  };

  private handleChangeEndFormDate = (value: Date) => {
    if (isBefore(value, this.state.startFormDate)) {
      this.setState({
        startFormDate: value,
        endFormDate: value,
      });
    } else {
      this.setState({
        endFormDate: value,
      });
    }
  };

  private validateInfo = () => {
    let tournamentNameError = false;
    let tournamentNameErrorContent = '';
    let tournamentShortNameErrorContent = '';
    let tournamentShortNameError = false;
    let descriptionErrorContent = '';
    let descriptionError = false;
    let startLocationErrorContent = '';
    let startLocationError = false;
    let endLocationErrorContent = '';
    let endLocationError = false;
    let donorErrorContent = '';
    let donorError = false;
    if (this.state.tournamentName.trim() === '') {
      tournamentNameError = true;
      tournamentNameErrorContent = 'Tên giải không được trống';
    }
    if (this.state.tournamentShortName.trim() === '') {
      tournamentShortNameError = true;
      tournamentShortNameErrorContent = 'Tên ngắn giải không được trống';
    }

    return { tournamentNameError, tournamentNameErrorContent, tournamentShortNameErrorContent, tournamentShortNameError, descriptionError, descriptionErrorContent, startLocationError, startLocationErrorContent, endLocationError, endLocationErrorContent, donorError, donorErrorContent };
  }

  private handleSave = () => {
    const { tournamentNameError, tournamentNameErrorContent, tournamentShortNameErrorContent, tournamentShortNameError, descriptionError, descriptionErrorContent, startLocationError, startLocationErrorContent, endLocationError, endLocationErrorContent, donorError, donorErrorContent } = this.validateInfo();
    this.setState({
      tournamentNameError,
      tournamentNameErrorContent,
      tournamentShortNameErrorContent,
      tournamentShortNameError,
      descriptionError,
      descriptionErrorContent,
      startLocationError,
      startLocationErrorContent,
      endLocationError,
      endLocationErrorContent,
      donorError,
      donorErrorContent
    });
    if (tournamentNameError === true || tournamentShortNameError === true || descriptionError === true || startLocationError === true || endLocationError === true || donorError === true) {
      return;
    }
    const params = {
      path: '',
      param: {
        id: this.props.tournamentId,
      },
      data: {
        fullName: this.state.tournamentName,
        shortName: this.state.tournamentShortName,
        description: this.state.description,
        creatorId: this.props.tournamentInfo.creatorId,
        openingLocation: this.state.startLocation,
        closingLocation: this.state.endLocation,
        openingTime: formatDateToString(this.state.startDate, 'yyyy-MM-dd HH:mm:ss'),
        closingTime: formatDateToString(this.state.endDate, 'yyyy-MM-dd HH:mm:ss'),
        donor: this.state.donor,
        url: '',
      },
    };

    this.props.editTournamentInfo(params);
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
          block={EDIT_TOURNAMENT_INFO}
          unblock={[EDIT_TOURNAMENT_INFO_SUCCESS, EDIT_TOURNAMENT_INFO_FAILED]}
        >
          <div className="TournamentSetting-container">
            <div className="TournamentSetting-tournament-container">
              <p className="TournamentSetting-header-text">Thông tin giải đấu</p>
              {/* <div className={'TournamentSetting-listManager-container'}>
                <p>Danh sách quản trị viên: </p>
                <div className={'TournamentSetting-listManager-container-container'}>
                  {this.state.listManager.map((item, index) => <div className={'TournamentSetting-manager-container'} key={index}>
                    <p className={'TournamentSetting-manager-text'}>{item}</p>
                    <div className={'TournamentSetting-icon-container'} onClick={() => { this.onDeleteManager(item) }}>
                      <AiOutlineClose />
                    </div>
                  </div>)}
                  <TextInput label='nhập username để thêm quản trị viên' error={this.state.usernameError} errorContent={this.state.usernameErrorContent} onChangeText={this.onChangeUsername} onHandleSubmit={this.handleAddManager} />
                </div>
              </div> */}
              <div className={'TournamentSetting-listManager-container'}>
                <p>Tên giải:</p>
                <div className={'TournamentSetting-tounamentName-container-container'}>
                  <TextInput value={this.state.tournamentName} label='Nhập tên của giải' error={this.state.tournamentNameError} errorContent={this.state.tournamentNameErrorContent} onChangeText={this.onChangeTournamentName} />
                </div>
              </div>
              <div className={'TournamentSetting-listManager-container'}>
                <p>Tên ngắn:</p>
                <div className={'TournamentSetting-tounamentName-container-container'}>
                  <TextInput value={this.state.tournamentShortName} label='Nhập tên ngắn của giải' error={this.state.tournamentShortNameError} errorContent={this.state.tournamentShortNameErrorContent} onChangeText={this.onChangeTournamentShortName} />
                  {/*defaultValue */}
                </div>
              </div>
              {/* <div className={'TournamentSetting-checkBox-container'}>
              <label className="Checkbox-label">
                <input type="checkbox" />
            Đăng kí qua form
          </label>
            </div>
            <div className={'TournamentSetting-checkBox-container'}>
              <label className="Checkbox-label">
                <input type="checkbox" />
            Xắp xếp lịch cho 2 giải so le
          </label>
            </div> */}
              <div className={'TournamentSetting-listManager-container'}>
                <p>Mô tả:</p>
                <div className={'TournamentSetting-tounamentName-container-container'}>
                  <TextInput value={this.state.description} label='Nhập mô tả' error={this.state.descriptionError} errorContent={this.state.descriptionErrorContent} onChangeText={this.onChangeDescription} />
                </div>
              </div>
              <div className={'TournamentSetting-listManager-container'}>
                <p>Địa điểm khai mạc:</p>
                <div className={'TournamentSetting-tounamentName-container-container'}>
                  <TextInput value={this.state.startLocation} label='Nhập địa điểm' error={this.state.startLocationError} errorContent={this.state.startLocationErrorContent} onChangeText={this.onChangeStartLocation} />
                </div>
              </div>
              <div className={'TournamentSetting-listManager-container TournamentSetting-listManager-container1'}>
                <p className="UserInfo-otherInfo-text">Ngày khai mạc: </p>
                <DatePicker
                  selected={this.state.startDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={this.handleChangeStartDate}
                />
              </div>
              <div className={'TournamentSetting-listManager-container'}>
                <p>Địa điểm bế mạc:</p>
                <div className={'TournamentSetting-tounamentName-container-container'}>
                  <TextInput value={this.state.endLocation} label='Nhập địa điểm' error={this.state.endLocationError} errorContent={this.state.endLocationErrorContent} onChangeText={this.onChangeEndLocation} />
                </div>
              </div>
              <div className={'TournamentSetting-listManager-container TournamentSetting-listManager-container1'}>
                <p className="UserInfo-otherInfo-text">Ngày bế mạc: </p>
                <DatePicker
                  selected={this.state.endDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={this.handleChangeEndDate}
                />
              </div>
              <div className={'TournamentSetting-listManager-container TournamentSetting-listManager-container1'}>
                <p className="UserInfo-otherInfo-text">Ngày mở form đăng ký: </p>
                <DatePicker
                  selected={this.state.startFormDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={this.handleChangeStartFormDate}
                  maxDate={this.state.startDate}
                />
              </div>
              <div className={'TournamentSetting-listManager-container TournamentSetting-listManager-container1'}>
                <p className="UserInfo-otherInfo-text">Ngày đóng form đăng ký: </p>
                <DatePicker
                  selected={this.state.endFormDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={this.handleChangeEndFormDate}
                  maxDate={this.state.startDate}
                />
              </div>
              <div className={'TournamentSetting-listManager-container'}>
                <p>Nhà tài trợ:</p>
                <div className={'TournamentSetting-tounamentName-container-container'}>
                  <TextInput value={this.state.donor} label='Nhập tên nhà tài trợ' error={this.state.donorError} errorContent={this.state.donorErrorContent} onChangeText={this.onChangeDonor} />
                </div>
              </div>
            </div>
            <div className="TournamentSetting-competition-container">
              <div className="TournamentSetting-button-container">
                <div className="TournamentSetting-button" onClick={this.handleSave}>
                  <h4 className="TournamentSetting-button-text">Lưu cài đặt</h4>
                </div>
              </div>
            </div>
          </div>
        </ReduxBlockUi>
      </ReduxBlockUi>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    isUsernameExisted: state.isUsernameExisted,
  };
};

export default connect(
  mapStateToProps,
  { checkUsernameExisted, setUsernameExistedDefault, editTournamentInfo }
)(TournamentSetting);