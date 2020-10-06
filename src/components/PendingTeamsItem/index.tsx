import React from 'react';
import { connect } from 'react-redux';
import { Styles } from 'react-modal';
import { Link } from 'react-router-dom';
import Player from 'components/Player';
import CustomModal from 'components/CustomModal';
import { IParams, IBigRequest } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import { queryUserInfo } from 'screens/UserInfo/actions';
import { approveTeam, rejectTeam } from './actions';
import './styles.css';

interface IPendingTeamsItemProps extends React.ClassAttributes<PendingTeamsItem> {
  info: IParams;
  index: number;
  tournamentInfo: IParams | null;
  userInfo: IParams | null;

  queryUserInfo(param: IBigRequest): void;
  approveTeam(param: IBigRequest): void;
  rejectTeam(param: IBigRequest): void;
}

interface IPendingTeamsItemState {
  seeMoreInfo: boolean;
}

const customStyles: Styles = {
  content: {
    top: '15%',
    left: '25%',
    right: '25%',
    bottom: '15%',
    backgroundColor: '#2b303d',
    display: 'flex',
    flexDirection: 'column',
  },
  overlay: {
    zIndex: 100001,
  },
};

class PendingTeamsItem extends React.Component<IPendingTeamsItemProps, IPendingTeamsItemState> {
  constructor(props: IPendingTeamsItemProps) {
    super(props);
    this.state = {
      seeMoreInfo: false,
    };
  }

  shouldComponentUpdate(nextProps: IPendingTeamsItemProps, nextState: IPendingTeamsItemState) {
    if (this.state.seeMoreInfo !== nextState.seeMoreInfo && nextState.seeMoreInfo === true) {
      const params = {
        path: '',
        param: {
          id: this.props.info.creatorId,
        },
        data: {},
      };
      this.props.queryUserInfo(params);
    }
    return true;
  }

  private handleSeeMore = () => {
    this.setState({
      seeMoreInfo: !this.state.seeMoreInfo,
    });
  }

  private onDeletePlayer = (indexx: number) => {
  }

  private handleCloseModal = () => {
    this.setState({
      seeMoreInfo: false,
    });
  }

  private handleConfirmModal = () => {
    const confirm = window.confirm('Bạn có chắc chắn chấp thuận team này?');
    if (confirm === true) {
      let params: IBigRequest = {
        path: '',
        param: {
          id: this.props.info.id
        },
        data: {
        },
      };
      this.props.approveTeam(params);
      this.setState({
        seeMoreInfo: false,
      });
    }
  }

  private handleCancelModal = () => {
    const confirm = window.confirm('Bạn có chắc chắn từ chối team này?');
    if (confirm === true) {
      let params: IBigRequest = {
        path: '',
        param: {
          id: this.props.info.id
        },
        data: {
        },
      };
      this.props.rejectTeam(params);
      this.setState({
        seeMoreInfo: false,
      });
    }
  }

  render() {
    return (
      <div className="PendingTeamsItem-info-container">
        <div className="PendingTeamsItem-container">
          <div className="PendingTeamsItem-container-container" onClick={this.handleSeeMore}>
            <div className="PendingTeamsItem-order-number-container">
              <div className="PendingTeamsItem-order-number-box">
                <p style={{ color: 'white' }}>{this.props.index + 1}</p>
              </div>
            </div>
            <div className="PendingTeamsItem-team-name-container">
              <p style={{ color: 'white' }}>{this.props.info && this.props.info.fullName}</p>
            </div>
          </div>
        </div>
        <CustomModal
          customStyles={customStyles}
          handleCloseModal={this.handleCloseModal}
          showModal={this.state.seeMoreInfo}
          handleConfirmModal={this.handleConfirmModal}
          handleCancelModal={this.handleCancelModal}
          confirmButtonText={'Đồng ý'}
          cancelButtonText={'Từ chối'}
        >
          <div className="PendingTeamsItem-moreInfo-container">
            <div className="PendingTeamsItem-moreInfo-normalInfo-container">
              <p style={{ color: 'white' }}>Tên đầy đủ: {this.props.info.fullName}</p>
              <p style={{ color: 'white' }}>Tên ngắn: {this.props.info.shortName}</p>
              <p style={{ color: 'white' }}>Giải tham gia: {this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament != null && (this.props.tournamentInfo.Tournament as unknown as IParams).fullName}</p>
              <p style={{ color: 'white' }}>Bộ môn tham gia: Bóng đá</p>
              <p style={{ color: 'white' }}>Quản lý của đội: <Link style={{ fontWeight: 'bold' }} target={'_blank'} to={`/user/${this.props.info.creatorId}`} rel="noopener noreferrer">
                {this.props.userInfo != null ? `${(this.props.userInfo.User as unknown as IParams).firstName} ${(this.props.userInfo.User as unknown as IParams).lastName}` : ''}
              </Link></p>
              <p style={{ color: 'white' }}>Danh sách thành viên:</p>
            </div>
            <div className="PendingTeamsItem-moreInfo-listTeamInfo-container">
              <div className="PendingTeamsItem-join-tournament-container">
                <div className="PendingTeamsItem-join-tournament-item1">
                  <p style={{ color: 'white' }}>Tên</p>
                </div>
                <div className="PendingTeamsItem-join-tournament-item2">
                  <p style={{ color: 'white' }}>Giới tính</p>
                </div>
                <div className="PendingTeamsItem-join-tournament-item2">
                  <p style={{ color: 'white' }}>Tuổi</p>
                </div>
                <div className="PendingTeamsItem-join-tournament-item1">
                  <p style={{ color: 'white' }}>Email</p>
                </div>
                <div className="PendingTeamsItem-join-tournament-setting">
                </div>
              </div>
              {this.props.info.players != null && (this.props.info.players as unknown as IParams[]).map((item, index) => <Player onDelete={this.onDeletePlayer} info={item} freeToEdit={false} key={index} index={index} />)}
            </div>
          </div>
        </CustomModal>
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
  { queryUserInfo, approveTeam, rejectTeam }
)(PendingTeamsItem);