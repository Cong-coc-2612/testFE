import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Select, { ValueType, OptionTypeBase } from 'react-select';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoMdAddCircleOutline } from 'react-icons/io';
import TextInput from 'components/TextInput';
import Player from 'components/Player';
import { IParams, IBigRequest } from 'interfaces/common';
import config from 'config';
import { TOURNAMENT_STATUS } from 'global';
import { IState } from 'redux-saga/reducers';
import { queryUserInfo } from 'screens/UserInfo/actions';
import { editTeam, deleteTeam } from './actions';
import './styles.css';

interface IUserInfoTeamsItemProps extends React.ClassAttributes<UserInfoTeamsItem> {
  info: IParams;
  index: number;
  tournamentInfo: IParams | null;
  userInfo: IParams | null;
  listTeam: IParams[];
  tournamentStatus: string;

  queryUserInfo(param: IBigRequest): void;
  // queryCompetition(param: IBigRequest): void;
  deleteTeam(param: IBigRequest): void;
  editTeam(param: IBigRequest): void;
}

interface IUserInfoTeamsItemState {
  seeMoreInfo: boolean;
  onEditMode: boolean;
  teamFullName: string;
  teamFullNameError: boolean;
  teamFullNameErrorContent: string;
  teamShortName: string;
  teamShortNameError: boolean;
  teamShortNameErrorContent: string;
  listPlayerInForm: IParams[];
  playerNameInForm: string;
  playerNameInFormError: boolean;
  playerNameInFormErrorContent: string;
  playerGenderInForm: ValueType<OptionTypeBase>;
  playerAgeInForm: number;
  playerEmailInForm: string;
  playerEmailInFormError: boolean;
  playerEmailInFormErrorContent: string;
}

const genderOptions = [
  { value: true, label: 'Nam' },
  { value: false, label: 'Nữ' },
];

class UserInfoTeamsItem extends React.Component<IUserInfoTeamsItemProps, IUserInfoTeamsItemState> {
  constructor(props: IUserInfoTeamsItemProps) {
    super(props);
    this.state = {
      seeMoreInfo: false,
      onEditMode: false,
      teamFullName: '',
      teamFullNameError: false,
      teamFullNameErrorContent: '',
      teamShortName: '',
      teamShortNameError: false,
      teamShortNameErrorContent: '',
      listPlayerInForm: [],
      playerNameInForm: '',
      playerNameInFormError: false,
      playerNameInFormErrorContent: '',
      playerGenderInForm: { value: true, label: 'Nam' },
      playerAgeInForm: 0,
      playerEmailInForm: '',
      playerEmailInFormError: false,
      playerEmailInFormErrorContent: '',
    };
  }

  shouldComponentUpdate(nextProps: IUserInfoTeamsItemProps, nextState: IUserInfoTeamsItemState) {
    if (this.props.info !== nextProps.info) {
      this.setState({
        onEditMode: false,
      });
    }
    // if (this.state.seeMoreInfo !== nextState.seeMoreInfo && nextState.seeMoreInfo === true && nextProps.competitionInfo == null) {
    //   const params = {
    //     path: '',
    //     param: {
    //       id: this.props.info.competitionId,
    //     },
    //     data: {},
    //   }
    //   this.props.queryCompetition(params);
    // }
    return true;
  }

  componentDidMount() {
    this.requestData();
  }

  private requestData = () => {
    let params: IBigRequest = {
      path: '',
      param: {
        teamId: this.props.info.id,
      },
      data: {},
    };
    // this.props.queryListPlayerOfTeam(params);
    params = {
      path: '',
      param: {
        id: this.props.info.creatorId,
      },
      data: {},
    };
    this.props.queryUserInfo(params);
  }

  private handleSeeMore = () => {
    if (this.state.onEditMode === true) {
      return;
    }
    this.setState({
      seeMoreInfo: !this.state.seeMoreInfo,
    });
  }

  private openEditMode = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    this.setState({
      seeMoreInfo: true,
      onEditMode: true,
      teamFullName: this.props.info.fullName ? this.props.info.fullName as string : '',
      teamShortName: this.props.info.shortName ? this.props.info.shortName as string : '',
      listPlayerInForm: this.props.info.players as IParams[],
    });
  }

  private onDeleteTeam = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    const confirm = window.confirm('Bạn có chắc chắn muốn xóa đội này?');
    if (confirm === true) {
      const params = {
        path: '',
        param: {
          id: this.props.info.id,
        },
        data: {
          tournamentId: this.props.info.tournamentId,
        },
      }
      this.props.deleteTeam(params);
    }
  }

  private onChangeTeamFullName = (value: string) => {
    this.setState({
      teamFullName: value,
    });
  }

  private onChangeTeamShortName = (value: string) => {
    this.setState({
      teamShortName: value,
    });
  }

  private validateTeamFullName = () => {
    let teamFullNameError = false;
    let teamFullNameErrorContent = '';
    let tempList = this.props.listTeam.slice(0);
    tempList = tempList.filter((item, index) => index !== this.props.index);
    if (this.state.teamFullName.trim() === '') {
      teamFullNameError = true;
      teamFullNameErrorContent = 'Tên đội không được trống';
    } else if (tempList.find(element => element.fullName === this.state.teamFullName)) {
      teamFullNameError = true;
      teamFullNameErrorContent = 'Tên đội này đã tồn tại trong cuộc thi vui lòng chọn tên khác!';
    }

    return { teamFullNameError, teamFullNameErrorContent };
  }

  private validateTeamShortName = () => {
    let teamShortNameError = false;
    let teamShortNameErrorContent = '';
    let tempList = this.props.listTeam.slice(0);
    tempList = tempList.filter((item, index) => index !== this.props.index);
    if (this.state.teamShortName.trim() === '') {
      teamShortNameError = true;
      teamShortNameErrorContent = 'Tên ngắn đội không được trống';
    } else if (tempList.find(element => element.shortName === this.state.teamShortName)) {
      teamShortNameError = true;
      teamShortNameErrorContent = 'Tên ngắn đội này đã tồn tại trong cuộc thi vui lòng chọn tên khác!';
    }

    return { teamShortNameError, teamShortNameErrorContent };
  }

  private onBlurTeamFullName = () => {
    const { teamFullNameError, teamFullNameErrorContent } = this.validateTeamFullName();
    this.setState({
      teamFullNameError,
      teamFullNameErrorContent,
    });
  }

  private onBlurTeamShortName = () => {
    const { teamShortNameError, teamShortNameErrorContent } = this.validateTeamShortName();
    this.setState({
      teamShortNameError,
      teamShortNameErrorContent,
    });
  }

  private onDeletePlayer = (indexx: number) => {
    this.setState({
      listPlayerInForm: this.state.listPlayerInForm.filter((item, index) => index !== indexx),
    });
  }

  private onChangePlayerNameInForm = (value: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      playerNameInForm: value.target.value,
    });
  }

  private onChangePlayerGenderInForm = (value: ValueType<OptionTypeBase>) => {
    this.setState({ playerGenderInForm: value, });
  }

  private onChangePlayerAgeInForm = (value: React.ChangeEvent<HTMLInputElement>) => {
    let tempValue = 0;
    if (!isNaN(value.target.value as unknown as number)) {
      tempValue = Number(value.target.value);
    } else {
      tempValue = 0;
    }
    this.setState({
      playerAgeInForm: tempValue,
    });
  }

  private onChangePlayerEmailInForm = (value: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      playerEmailInForm: value.target.value,
    });
  }

  private validateAddPlayer = () => {
    let playerEmailInFormErrorContent = '';
    let playerEmailInFormError = false;
    let playerNameInFormErrorContent = '';
    let playerNameInFormError = false;
    if (this.state.playerNameInForm.trim() === '') {
      playerNameInFormError = true;
      playerNameInFormErrorContent = 'Tên người chơi không được trống';
    }
    if (!config.regex.email.test(this.state.playerEmailInForm)) {
      playerEmailInFormError = true;
      playerEmailInFormErrorContent = 'Email không hợp lệ';
    }

    return {
      playerEmailInFormError,
      playerEmailInFormErrorContent,
      playerNameInFormErrorContent,
      playerNameInFormError,
    };
  }

  private addPlayer = () => {
    const {
      playerEmailInFormError,
      playerEmailInFormErrorContent,
      playerNameInFormErrorContent,
      playerNameInFormError,
    } = this.validateAddPlayer();
    this.setState({
      playerEmailInFormError,
      playerEmailInFormErrorContent,
      playerNameInFormErrorContent,
      playerNameInFormError,
    });
    if (playerNameInFormError === true || playerEmailInFormError === true) {
      return;
    }
    const listTemp = this.state.listPlayerInForm;
    listTemp.push({
      name: this.state.playerNameInForm,
      age: this.state.playerAgeInForm,
      email: this.state.playerEmailInForm,
      gender: (this.state.playerGenderInForm as IParams).label,
    });
    this.setState({
      listPlayerInForm: listTemp,
      playerNameInForm: '',
      playerAgeInForm: 0,
      playerEmailInForm: '',
      playerGenderInForm: { value: true, label: 'Nam' },
    });
  }

  private handleSaveChange = () => {
    const { teamFullNameError, teamFullNameErrorContent } = this.validateTeamFullName();
    const { teamShortNameError, teamShortNameErrorContent } = this.validateTeamShortName();
    this.setState({
      teamShortNameError,
      teamShortNameErrorContent,
      teamFullNameError,
      teamFullNameErrorContent,
    });
    if (teamFullNameError === true || teamShortNameError === true) {
      return;
    }
    const params: IBigRequest = {
      path: '',
      param: {
        id: this.props.info.id,
      },
      data: {
        tournamentId: this.props.info.tournamentId,
        creatorId: this.props.info.creatorId,
        description: this.props.info.description,
        fullName: this.state.teamFullName,
        shortName: this.state.teamShortName,
        seedNo: this.props.info.seedNo,
        status: this.props.info.status,
        url: this.props.info.url,
        players: this.state.listPlayerInForm,
      },
    };
    this.props.editTeam(params);
  }

  render() {
    return (
      <div className="UserInfoTeamsItem-info-container">
        <div className="UserInfoTeamsItem-container">
          <div className="UserInfoTeamsItem-container-container" onClick={this.handleSeeMore}>
            <div className="UserInfoTeamsItem-order-number-container">
              <div className="UserInfoTeamsItem-order-number-box">
                <p style={{ color: 'white' }}>{this.props.index + 1}</p>
              </div>
            </div>
            <div className="UserInfoTeamsItem-team-name-container">
              {
                this.state.onEditMode === false ?
                  <p style={{ color: 'white', fontWeight: 'bold' }}>{this.props.info && this.props.info.fullName}</p> :
                  <TextInput label={'Tên đội'} value={this.state.teamFullName} error={this.state.teamFullNameError} errorContent={this.state.teamFullNameErrorContent} onChangeText={this.onChangeTeamFullName} onBlur={this.onBlurTeamFullName} />
              }
            </div>
            {(this.props.tournamentStatus === TOURNAMENT_STATUS.INITIALIZING || this.props.tournamentStatus === TOURNAMENT_STATUS.OPENING) && <div className="UserInfoTeamsItem-team-setting-container">
              <div className="UserInfoTeamsItem-team-setting-container-container" onClick={this.openEditMode}>
                <FaEdit className="UserInfoTeamsItem-team-setting-icon" />
              </div>
              <div className="UserInfoTeamsItem-team-setting-container-container" onClick={this.onDeleteTeam}>
                <MdDelete className="UserInfoTeamsItem-team-setting-icon" />
              </div>
            </div>}
          </div>
        </div>
        {this.state.seeMoreInfo === true &&
          <div className="UserInfoTeamsItem-moreInfo-container">
            <div className="UserInfoTeamsItem-moreInfo-normalInfo-container">
              {
                this.state.onEditMode === false ?
                  <p>Tên ngắn: {this.props.info.shortName}</p> :
                  <TextInput label={'Tên ngắn đội'} value={this.state.teamShortName} error={this.state.teamShortNameError} errorContent={this.state.teamShortNameErrorContent} onChangeText={this.onChangeTeamShortName} onBlur={this.onBlurTeamShortName} />
              }
              <p>Quản lý của đội: <Link style={{ fontWeight: 'bold' }} target={'_blank'} to={`/user/${this.props.info.creatorId}`} rel="noopener noreferrer">
                {this.props.userInfo != null ? `${(this.props.userInfo.User as unknown as IParams).firstName} ${(this.props.userInfo.User as unknown as IParams).lastName}` : ''}
              </Link></p>
              <p>Danh sách thành viên:</p>
            </div>
            <div className="UserInfoTeamsItem-moreInfo-listTeamInfo-container">
              <div className="UserInfoTeamsItem-join-tournament-container">
                <div className="UserInfoTeamsItem-join-tournament-item1">
                  <p style={{ color: 'white' }}>Tên</p>
                </div>
                <div className="UserInfoTeamsItem-join-tournament-item2">
                  <p style={{ color: 'white' }}>Giới tính</p>
                </div>
                <div className="UserInfoTeamsItem-join-tournament-item2">
                  <p style={{ color: 'white' }}>Tuổi</p>
                </div>
                <div className="UserInfoTeamsItem-join-tournament-item1">
                  <p style={{ color: 'white' }}>Email</p>
                </div>
                <div className="UserInfoTeamsItem-join-tournament-setting">
                </div>
              </div>
              {
                this.state.onEditMode === true ?
                  (this.state.listPlayerInForm != null && this.state.listPlayerInForm.map((item, index) => <Player onDelete={this.onDeletePlayer} info={item} freeToEdit={this.state.onEditMode} key={index} index={index} />)) :
                  (this.props.info.players != null && (this.props.info.players as unknown as IParams[]).map((item, index) => <Player onDelete={this.onDeletePlayer} info={item} freeToEdit={this.state.onEditMode} key={index} index={index} />))
              }
              {this.state.onEditMode === true &&
                <div className="UserInfoTeamsItem-join-tournament-container">
                  <div className="UserInfoTeamsItem-join-tournament-item1">
                    <input type={'text'} onChange={this.onChangePlayerNameInForm} value={this.state.playerNameInForm} />
                  </div>
                  <div className="UserInfoTeamsItem-join-tournament-item2">
                    <Select
                      options={genderOptions}
                      className="Select"
                      defaultValue={this.state.playerGenderInForm}
                      value={this.state.playerGenderInForm}
                      onChange={this.onChangePlayerGenderInForm}
                    />
                  </div>
                  <div className="UserInfoTeamsItem-join-tournament-item2">
                    <input style={{ width: '70px' }} type={'text'} onChange={this.onChangePlayerAgeInForm} value={this.state.playerAgeInForm} />
                  </div>
                  <div className="UserInfoTeamsItem-join-tournament-item1">
                    <input type={'text'} onChange={this.onChangePlayerEmailInForm} value={this.state.playerEmailInForm} />
                  </div>
                  <div className="UserInfoTeamsItem-join-tournament-setting">
                    <IoMdAddCircleOutline color={'white'} size={25} style={{ marginLeft: '3px', marginRight: '3px' }} onClick={this.addPlayer} />
                  </div>
                </div>}
              {this.state.onEditMode === true && this.state.playerNameInFormError === true && <p style={{ color: 'red' }}>{this.state.playerNameInFormErrorContent}</p>}
              {this.state.onEditMode === true && this.state.playerEmailInFormError === true && <p style={{ color: 'red' }}>{this.state.playerEmailInFormErrorContent}</p>}
              {this.state.onEditMode === true && <div className="UserInfoTeamsItem-login-container">
                <div className="UserInfoTeamsItem-login" onClick={this.handleSaveChange}>
                  <h4 className="UserInfoTeamsItem-login-text">Lưu</h4>
                </div>
              </div>}
            </div>
          </div>}
      </div>
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
  { queryUserInfo, editTeam, deleteTeam }
)(UserInfoTeamsItem);