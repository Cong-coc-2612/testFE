import React from 'react';
import { connect } from 'react-redux';
import { Styles } from 'react-modal';
import 'react-tabs/style/react-tabs.css';
import { MdSettings } from 'react-icons/md';
import BracketTeam from 'components/BracketTeam';
import CustomModal from 'components/CustomModal';
import CustomTab from 'components/CustomTab';
import MatchDetail from 'components/MatchDetail';
import MatchSetting from 'components/MatchSetting';
import { IState } from 'redux-saga/reducers';
import { IParams, IBigRequest } from 'interfaces/common';
import { MATCH_CONTAINER_HEIGHT, PADDING_TOP } from 'global';
import './styles.css';

interface IBracketMatchProps extends React.ClassAttributes<BracketMatch> {
  bracketStartedStatus?: boolean;
  info: IParams;
  totalRound: number;
  lowerBracket?: boolean;
  competitionId: number;
  roundRobin?: boolean;
}

interface IBracketMatchState {
  iconVisible: boolean;
  selectedIndexInTab: number
  showModal: boolean;
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

class BracketMatch extends React.Component<IBracketMatchProps, IBracketMatchState> {
  constructor(props: IBracketMatchProps) {
    super(props);
    this.state = {
      iconVisible: false,
      showModal: false,
      selectedIndexInTab: 0,
    };
  }

  private handleCloseModal = () => {
    this.setState({
      showModal: false,
      selectedIndexInTab: 0,
    });
  }

  private handleOpenModal = (index: number) => {
    this.setState({
      showModal: true,
      selectedIndexInTab: index,
    });
  }

  private handleConfirmModal = () => {
  }

  render() {
    // let amountOfListTeamDisplayed = 0;
    // for (let i = 0; i < this.props.info.listTeam.length; i++) {
    //   if (this.props.info.listTeam[i].teamInfo != null && this.props.info.listTeam[i].teamInfo!.id) {
    //     amountOfListTeamDisplayed++;
    //   }
    // }
    let listTeam: IParams[] = [];
    listTeam.push((this.props.info.data as IParams).team1 as IParams);
    listTeam.push((this.props.info.data as IParams).team2 as IParams);
    const tabList = ['Thông tin trận đấu', 'Điểm số'];
    const tabComponentList = [<MatchDetail info={this.props.info.data as IParams} />, <MatchSetting teamsInfo={listTeam} info={this.props.info.data as IParams} />];
    // if (this.props.info.listTeam.length === amountOfListTeamDisplayed && this.props.bracketStartedStatus === true) {
    //   tabComponentList.push(<MatchResult teamsInfo={this.props.info.listTeam}/>);
    //   tabList.push('Match Result');
    // }
    if (this.props.roundRobin === true) {
      return (
        <div
          className="BracketMatch-container"
          style={{ height: '60px', marginLeft: '15px', marginRight: '20px' }}
        >
          {this.props.info.id !== -1 &&
            <div className="BracketMatch-numericalOrder-container">
              <p className="BracketMatch-numericalOrder-text">{this.props.info.name}</p>
            </div>
          }
          {this.props.info.id !== -1 && <div className="BracketMatch-info-container">
            <p className={'BracketMatch-info-text No-margin-bottom'}>{this.props.info.time}</p>
            <div className="BracketMatch-teams-container" onMouseOver={() => { this.setState({ iconVisible: true, }); }} onMouseOut={() => { this.setState({ iconVisible: false, }); }}>
              <div className="BracketMatch-team-container">
                <BracketTeam competitionId={this.props.competitionId} info={this.props.info.team1 != null ? (this.props.info.team1 as IParams).team as IParams : null} description={this.props.info.team1 != null ? (this.props.info.team1 as IParams).description as IParams : null} borderBottom={true} />
                <BracketTeam competitionId={this.props.competitionId} info={this.props.info.team2 != null ? (this.props.info.team2 as IParams).team as IParams : null} description={this.props.info.team2 != null ? (this.props.info.team2 as IParams).description as IParams : null} />
              </div>
              <div className="BracketMatch-matchSetting-container">
                <div className={`BracketMatch-afterMatch-icon-container ${this.state.iconVisible === true && 'BracketMatch-afterMatch-icon-container-background'}`} onClick={() => this.handleOpenModal(0)}>
                  <MdSettings className={`BracketMatch-afterMatch-icon-setting ${this.state.iconVisible === true ? 'BracketMatch-afterMatch-icon-visible' : 'BracketMatch-afterMatch-icon-invisible'}`} />
                </div>
              </div>
            </div>
            <p className={'BracketMatch-info-text No-margin-top'}>{this.props.info.location}</p>
          </div>}
          <CustomModal
            customStyles={customStyles}
            handleCloseModal={this.handleCloseModal}
            showModal={this.state.showModal}
            handleConfirmModal={this.handleConfirmModal}>
            {/* <CustomTab tabList={tabList} componentList={tabComponentList} selectedIndex={this.state.selectedIndexInTab} /> */}
          </CustomModal>
        </div>
      );
    } else if (this.props.lowerBracket !== true) {
      return (
        <div
          className="BracketMatch-container"
          style={{ height: `${(MATCH_CONTAINER_HEIGHT / 2) * (2 ** ((this.props.info.data as unknown as IParams).roundNo as number))}px` }}
        >
          {((this.props.info.data as unknown as IParams).roundNo as number) > 1 &&
            <div
              className="BracketMatch-preMatch-connector"
              style={{ height: `${(MATCH_CONTAINER_HEIGHT / 4) * (2 ** ((this.props.info.data as unknown as IParams).roundNo as number))}px` }}
            >
              {/* height=số đội trong 1 match * 25px / 2 + 2 */}
              <div className={`${this.props.info.left != null && (this.props.info.left as unknown as IParams).id !== -1 && 'BracketMatch-preMatch-connector-border1'} ${((this.props.info.left != null && (this.props.info.left as unknown as IParams).id !== -1) || (this.props.info.right != null && (this.props.info.right as unknown as IParams).id !== -1)) && 'BracketMatch-preMatch-connector-borderrr'} BracketMatch-preMatch-connector-borderr`}></div>
              <div className={`${this.props.info.right != null && (this.props.info.right as unknown as IParams).id !== -1 && 'BracketMatch-preMatch-connector-border2-border'} BracketMatch-preMatch-connector-border2`}></div>
            </div>}
          {this.props.info.id !== -1 &&
            <div className="BracketMatch-numericalOrder-container">
              <p className="BracketMatch-numericalOrder-text">{(this.props.info.data as unknown as IParams).name}</p>
            </div>
          }
          {this.props.info.id !== -1 &&
            <div className="BracketMatch-info-container">
              <p className={'BracketMatch-info-text No-margin-bottom'}>{this.props.info.time}</p>
              <div className="BracketMatch-teams-container" onMouseOver={() => { this.setState({ iconVisible: true, }); }} onMouseOut={() => { this.setState({ iconVisible: false, }); }}>
                <div className="BracketMatch-team-container">
                  <BracketTeam
                    competitionId={this.props.competitionId}
                    info={(this.props.info.data as unknown as IParams).team1 != null ? ((this.props.info.data as IParams).team1 as IParams).team as IParams : null}
                    description={(this.props.info.data as unknown as IParams).team1 != null ? ((this.props.info.data as unknown as IParams).team1 as unknown as IParams).description as IParams : null}
                    borderBottom={true}
                  />
                  <BracketTeam
                    competitionId={this.props.competitionId}
                    info={(this.props.info.data as IParams).team2 != null ? ((this.props.info.data as IParams).team2 as unknown as IParams).team as IParams : null}
                    description={(this.props.info.data as IParams).team2 != null ? ((this.props.info.data as unknown as IParams).team2 as IParams).description as IParams : null}
                  />
                </div>
                <div className="BracketMatch-matchSetting-container">
                  <div className={`BracketMatch-afterMatch-icon-container ${this.state.iconVisible === true && 'BracketMatch-afterMatch-icon-container-background'}`} onClick={() => this.handleOpenModal(0)}>
                    <MdSettings className={`BracketMatch-afterMatch-icon-setting ${this.state.iconVisible === true ? 'BracketMatch-afterMatch-icon-visible' : 'BracketMatch-afterMatch-icon-invisible'}`} />
                  </div>
                </div>
              </div>
              <p className={'BracketMatch-info-text No-margin-top'}>{this.props.info.location}</p>
            </div>}
          {
            ((this.props.info.data as unknown as IParams).roundNo as number) < this.props.totalRound && this.props.info.id !== -1 && <div
              // ((this.props.info.data as IParams).roundNo as number) nhỏ hơn tổng số round
              className="BracketMatch-preMatch-connector"
              style={{ height: `${MATCH_CONTAINER_HEIGHT}px` }}
            >
              {/* height=số đội trong 1 match * 25px / 2 + 2 */}
              <div className="BracketMatch-afterMatch-connector-border1"></div>
              <div className="BracketMatch-afterMatch-connector-border2"></div>
            </div>
          }
          <CustomModal
            customStyles={customStyles}
            handleCloseModal={this.handleCloseModal}
            showModal={this.state.showModal}
            handleConfirmModal={this.handleConfirmModal}>
            <CustomTab tabList={tabList} componentList={tabComponentList} selectedIndex={0} />
          </CustomModal>
        </div>
      );
    } else {
      const fakeId = this.props.info!.fakeId as number;
      const fakeRoundNo = (this.props.totalRound % 2 === 0 ? ((this.props.info.data as unknown as IParams).roundNo as number) : (((this.props.info.data as unknown as IParams).roundNo as number) + 1));
      const firstId = 2 ** (Math.floor((this.props.info!.degree as number) / 2));
      const treeHeight = (2 ** (Math.floor((fakeRoundNo + 1) / 2))) * (41 + 10);
      let firstLocation = (Math.floor(((2 ** ((Math.floor((fakeRoundNo + 1) / 2)) - 1)) * Math.floor((41 + 10))) / 2));
      if ((this.props.info!.degree as number) % 2 === 0) {
        firstLocation = 0;
      }
      firstLocation += Math.floor((41 + 10) / 2);
      return (
        <div
          className="BracketMatch-container-lowerBracket"
          style={{
            left: (((this.props.info.data as unknown as IParams).roundNo as number) - 1) === 0 ?
              0 :
              ((((this.props.info.data as unknown as IParams).roundNo as number) - 2) * 250) + 250,
            marginTop: (fakeId - firstId) * treeHeight + firstLocation + PADDING_TOP,
          }}
        >
          <div
            className="BracketMatch-preMatch-connector"
          // style={{
          //   height: `${(MATCH_CONTAINER_HEIGHT / 4) * (2 ** ((!((this.props.info.data as IParams).roundNo === this.props.totalRound && this.props.lowerBracket === true)) ? ((this.props.info.data as IParams).roundNo as number) : ((this.props.info.data as IParams).roundNo as number) - 1))}px`
          // }}
          >
            {/* height=số đội trong 1 match * 25px / 2 + 2 */}
            <div className={`${
              (
                !((this.props.info.data as unknown as IParams).roundNo === this.props.totalRound &&
                  this.props.lowerBracket === true) &&
                this.props.info.left != null &&
                (this.props.info.left as unknown as IParams).id !== -1 &&
                !(((this.props.info.left as unknown as IParams).data as unknown as IParams).name as string).includes('A')) &&
              'BracketMatch-preMatch-connector-border1'} ${
              ((
                this.props.info.left != null &&
                (this.props.info.left as unknown as IParams).id !== -1)) &&
              ((this.props.info.data as unknown as IParams).roundNo as number) > 1 &&
              'BracketMatch-preMatch-connector-borderrr'
              } BracketMatch-preMatch-connector-borderr`
            }></div>
            <div className={`${
              !((this.props.info.data as unknown as IParams).roundNo === this.props.totalRound &&
                this.props.lowerBracket === true) &&
              this.props.info.right != null &&
              (this.props.info.right as unknown as IParams).id !== -1 &&
              'BracketMatch-preMatch-connector-border2-border'} BracketMatch-preMatch-connector-border2`}></div>
          </div>
          {this.props.info.id !== -1 &&
            <div className="BracketMatch-numericalOrder-container">
              <p className="BracketMatch-numericalOrder-text">{(this.props.info.data as IParams).name}</p>
            </div>
          }
          {this.props.info.id !== -1 && <div className="BracketMatch-info-container">
            <p className={'BracketMatch-info-text No-margin-bottom'}>{this.props.info.time}</p>
            <div className="BracketMatch-teams-container" onMouseOver={() => { this.setState({ iconVisible: true, }); }} onMouseOut={() => { this.setState({ iconVisible: false, }); }}>
              <div className="BracketMatch-team-container">
                <BracketTeam competitionId={this.props.competitionId} info={(this.props.info.data as unknown as IParams).team1 as unknown as IParams} description={((this.props.info.data as unknown as IParams).team1 as unknown as IParams).description as unknown as IParams} borderBottom={true} />
                <BracketTeam competitionId={this.props.competitionId} info={(this.props.info.data as unknown as IParams).team2 as unknown as IParams} description={((this.props.info.data as unknown as IParams).team2 as unknown as IParams).description as unknown as IParams} />
              </div>
              <div className="BracketMatch-matchSetting-container">
                <div className={`BracketMatch-afterMatch-icon-container ${this.state.iconVisible === true && 'BracketMatch-afterMatch-icon-container-background'}`} onClick={() => this.handleOpenModal(0)}>
                  <MdSettings className={`BracketMatch-afterMatch-icon-setting ${this.state.iconVisible === true ? 'BracketMatch-afterMatch-icon-visible' : 'BracketMatch-afterMatch-icon-invisible'}`} />
                </div>
              </div>
            </div>
            <p className={'BracketMatch-info-text No-margin-top'}>{this.props.info.location}</p>
          </div>}
          {
            ((this.props.info.data as unknown as IParams).roundNo as number) < this.props.totalRound && this.props.info.id !== -1 && <div
              // ((this.props.info.data as IParams).roundNo as number) nhỏ hơn tổng số round
              className="BracketMatch-preMatch-connector"
              style={{ height: `${MATCH_CONTAINER_HEIGHT}px` }}
            >
              {/* height=số đội trong 1 match * 25px / 2 + 2 */}
              <div className="BracketMatch-afterMatch-connector-border1"></div>
              <div className="BracketMatch-afterMatch-connector-border2"></div>
            </div>
          }
          <CustomModal
            customStyles={customStyles}
            handleCloseModal={this.handleCloseModal}
            showModal={this.state.showModal}
            handleConfirmModal={this.handleConfirmModal}>
            {/* <CustomTab tabList={tabList} componentList={tabComponentList} selectedIndex={this.state.selectedIndexInTab} /> */}
          </CustomModal>
        </div >
      );
    }
  }
}

const mapStateToProps = (state: IState) => {
  return {
    bracketStartedStatus: state.bracketStartedStatus,
  };
};

export default connect(
  mapStateToProps,
  null
)(BracketMatch);