import React, { ReactNode } from 'react';
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
import { MATCH_CONTAINER_HEIGHT, PADDING_TOP, MATCH_STATUS } from 'global';
import { queryAllMatches } from 'components/BracketBoard/actions';
import { queryMatchInfo, finishMatch } from './actions';
import './styles.css';

interface IBracketMatchProps extends React.ClassAttributes<BracketMatch> {
  bracketStartedStatus?: boolean;
  info: IParams;
  matchInfo: IParams | null;
  totalRound: number;
  lowerBracket?: boolean;
  tournamentId: number;
  roundRobin?: boolean;
  has34?: boolean;
  showAllDescription?: boolean;
  allMatches: IParams | null;
  swapAble: boolean;
  finalStage: boolean;
  tableId?: number;
  matchType: 'se' | 'win' | 'lose' | 'rr' | 'sum';
  dateNextRound: Date | null;
  datePreviousRound: Date | null;

  queryMatchInfo(params: IBigRequest): void;
  finishMatch(params: IBigRequest): void;
  queryAllMatches(params: IBigRequest): void;
}

interface IBracketMatchState {
  iconVisible: boolean;
  selectedIndexInTab: number
  showModal: boolean;
  confirmButtonModalVisible: boolean;
  winner: boolean | null;
  team1Score: number;
  team2Score: number;
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
  private tabList: string[] = [''];
  private tabComponentList: ReactNode[] = [<div></div>];

  constructor(props: IBracketMatchProps) {
    super(props);
    this.state = {
      iconVisible: false,
      showModal: false,
      confirmButtonModalVisible: false,
      selectedIndexInTab: 0,
      winner: null,
      team1Score: 0,
      team2Score: 0,
    };
  }

  shouldComponentUpdate(nextProps: IBracketMatchProps, nextState: IBracketMatchState) {
    if (this.state.showModal !== nextState.showModal && nextState.showModal === true) {
      if (nextProps.roundRobin === true) {
        if (nextProps.info.id != null) {
          const params = {
            path: '',
            param: {
              id: nextProps.info.id,
            },
            data: {},
          };
          this.props.queryMatchInfo(params);
        }
      } else {
        if ((nextProps.info.data as IParams).id != null) {
          const params = {
            path: '',
            param: {
              id: (nextProps.info.data as IParams).id,
            },
            data: {},
          };
          this.props.queryMatchInfo(params);
        }
      }
      this.setState({
        confirmButtonModalVisible: false,
      });
    }
    if ((this.props.matchInfo !== nextProps.matchInfo || this.props.allMatches !== nextProps.allMatches) && nextProps.matchInfo != null && nextProps.allMatches != null) {
      let listTeam: IParams[] = [];
      if (this.props.roundRobin === true) {
        listTeam.push(this.props.info.team1 as IParams);
        listTeam.push(this.props.info.team2 as IParams);
        if (nextProps.matchInfo.status === MATCH_STATUS.PLAYING) {
          this.tabList = ['Thông tin trận đấu', 'Điểm số'];
          this.tabComponentList = [<MatchDetail datePreviousRound={this.props.datePreviousRound} dateNextRound={this.props.dateNextRound} matchType={this.props.matchType} tableId={this.props.tableId != null ? this.props.tableId : null} lowerBracket={this.props.lowerBracket} tournamentId={this.props.tournamentId} allMatches={nextProps.allMatches} matchInfo={nextProps.matchInfo} info={this.props.info as IParams} />, <MatchSetting finalStage={nextProps.finalStage} matchInfo={nextProps.matchInfo} onChangeEditMode={this.onChangeEditMode} teamsInfo={listTeam} info={this.props.info as IParams} />];
        } else {
          this.tabList = ['Thông tin trận đấu', 'Điểm số'];
          this.tabComponentList = [<MatchDetail datePreviousRound={this.props.datePreviousRound} dateNextRound={this.props.dateNextRound} matchType={this.props.matchType} tableId={this.props.tableId != null ? this.props.tableId : null} lowerBracket={this.props.lowerBracket} tournamentId={this.props.tournamentId} allMatches={nextProps.allMatches} matchInfo={nextProps.matchInfo} info={this.props.info as IParams} />, <MatchSetting finalStage={nextProps.finalStage} canEdit={false} matchInfo={nextProps.matchInfo} onChangeEditMode={this.onChangeEditMode} teamsInfo={listTeam} info={this.props.info as IParams} />];
        }
      } else {
        listTeam.push((this.props.info.data as IParams).team1 as IParams);
        listTeam.push((this.props.info.data as IParams).team2 as IParams);
        if (nextProps.matchInfo.status === MATCH_STATUS.PLAYING) {
          this.tabList = ['Thông tin trận đấu', 'Điểm số'];
          this.tabComponentList = [<MatchDetail datePreviousRound={this.props.datePreviousRound} dateNextRound={this.props.dateNextRound} matchType={this.props.matchType} tableId={this.props.tableId != null ? this.props.tableId : null} lowerBracket={this.props.lowerBracket} tournamentId={this.props.tournamentId} beforeInfo={this.props.info} allMatches={nextProps.allMatches} matchInfo={nextProps.matchInfo} info={this.props.info.data as IParams} />, <MatchSetting finalStage={nextProps.finalStage} matchInfo={nextProps.matchInfo} onChangeEditMode={this.onChangeEditMode} teamsInfo={listTeam} info={this.props.info.data as IParams} />];
        } else {
          this.tabList = ['Thông tin trận đấu', 'Điểm số'];
          this.tabComponentList = [<MatchDetail datePreviousRound={this.props.datePreviousRound} dateNextRound={this.props.dateNextRound} matchType={this.props.matchType} tableId={this.props.tableId != null ? this.props.tableId : null} lowerBracket={this.props.lowerBracket} tournamentId={this.props.tournamentId} beforeInfo={this.props.info} allMatches={nextProps.allMatches} matchInfo={nextProps.matchInfo} info={this.props.info.data as IParams} />, <MatchSetting finalStage={nextProps.finalStage} canEdit={false} matchInfo={nextProps.matchInfo} onChangeEditMode={this.onChangeEditMode} teamsInfo={listTeam} info={this.props.info.data as IParams} />];
        }
      }
    }
    if (
      this.props.allMatches !== nextProps.allMatches &&
      nextProps.allMatches != null &&
      nextProps.info != null
    ) {
      if (this.props.roundRobin === true) {
        if (nextProps.info.id != null) {
          const tempValue = (nextProps.allMatches.Matchs as IParams[]).findIndex(element => element.id === nextProps.info.id);
          if (tempValue !== -1) {
            if ((nextProps.allMatches.Matchs as IParams[])[tempValue].winnerId == null) {
              this.setState({
                winner: null,
              });
            } else {
              if ((nextProps.allMatches.Matchs as IParams[])[tempValue].team1Id == null) {
                if ((nextProps.allMatches.Matchs as IParams[])[tempValue].team2Id != null) {
                  this.setState({
                    winner: false,
                  });
                } else {
                  this.setState({
                    winner: null,
                  });
                }
              } else {
                if ((nextProps.allMatches.Matchs as IParams[])[tempValue].team2Id == null) {
                  this.setState({
                    winner: true,
                  });
                } else {
                  if ((nextProps.allMatches.Matchs as IParams[])[tempValue].winnerId === (nextProps.allMatches.Matchs as IParams[])[tempValue].team1Id) {
                    this.setState({
                      winner: true,
                    });
                  } else {
                    this.setState({
                      winner: false,
                    });
                  }
                }
              }
            }
          }
          if ((nextProps.allMatches.Scores as IParams)[nextProps.info.id as string] != null) {
            this.setState({
              team1Score: ((nextProps.allMatches.Scores as IParams)[nextProps.info.id as string] as IParams).team1 as number,
              team2Score: ((nextProps.allMatches.Scores as IParams)[nextProps.info.id as string] as IParams).team2 as number,
            });
          }
        }
      } else {
        if (nextProps.info.data != null && (nextProps.info.data as IParams).id != null) {
          const tempValue = (nextProps.allMatches.Matchs as IParams[]).findIndex(element => element.id === (nextProps.info.data as IParams).id);
          if (tempValue !== -1) {
            if ((nextProps.allMatches.Matchs as IParams[])[tempValue].winnerId == null) {
              this.setState({
                winner: null,
              });
            } else {
              if ((nextProps.allMatches.Matchs as IParams[])[tempValue].team1Id == null) {
                if ((nextProps.allMatches.Matchs as IParams[])[tempValue].team2Id != null) {
                  this.setState({
                    winner: false,
                  });
                } else {
                  this.setState({
                    winner: null,
                  });
                }
              } else {
                if ((nextProps.allMatches.Matchs as IParams[])[tempValue].team2Id == null) {
                  this.setState({
                    winner: true,
                  });
                } else {
                  if ((nextProps.allMatches.Matchs as IParams[])[tempValue].winnerId === (nextProps.allMatches.Matchs as IParams[])[tempValue].team1Id) {
                    this.setState({
                      winner: true,
                    });
                  } else {
                    this.setState({
                      winner: false,
                    });
                  }
                }
              }
            }
          }
          if ((nextProps.allMatches.Scores as IParams)[(nextProps.info.data as IParams).id as string] != null) {
            this.setState({
              team1Score: ((nextProps.allMatches.Scores as IParams)[(nextProps.info.data as IParams).id as string] as IParams).team1 as number,
              team2Score: ((nextProps.allMatches.Scores as IParams)[(nextProps.info.data as IParams).id as string] as IParams).team2 as number,
            });
          }
        }
      }
    }
    return true;
  }

  componentDidMount() {
    if (
      this.props.allMatches != null &&
      this.props.info != null
    ) {
      if (this.props.roundRobin === true) {
        if (this.props.info.id != null) {
          const tempValue = (this.props.allMatches.Matchs as IParams[]).findIndex(element => element.id === this.props.info.id);
          if (tempValue !== -1) {
            if ((this.props.allMatches.Matchs as IParams[])[tempValue].winnerId == null) {
              this.setState({
                winner: null,
              });
            } else {
              if ((this.props.allMatches.Matchs as IParams[])[tempValue].team1Id == null) {
                if ((this.props.allMatches.Matchs as IParams[])[tempValue].team2Id != null) {
                  this.setState({
                    winner: false,
                  });
                } else {
                  this.setState({
                    winner: null,
                  });
                }
              } else {
                if ((this.props.allMatches.Matchs as IParams[])[tempValue].team2Id == null) {
                  this.setState({
                    winner: true,
                  });
                } else {
                  if ((this.props.allMatches.Matchs as IParams[])[tempValue].winnerId === (this.props.allMatches.Matchs as IParams[])[tempValue].team1Id) {
                    this.setState({
                      winner: true,
                    });
                  } else {
                    this.setState({
                      winner: false,
                    });
                  }
                }
              }
            }
          }
          if ((this.props.allMatches.Scores as IParams)[this.props.info.id as string] != null) {
            this.setState({
              team1Score: ((this.props.allMatches.Scores as IParams)[this.props.info.id as string] as IParams).team1 as number,
              team2Score: ((this.props.allMatches.Scores as IParams)[this.props.info.id as string] as IParams).team2 as number,
            });
          }
        }
      } else {
        if (this.props.info.data != null && (this.props.info.data as IParams).id != null) {
          const tempValue = (this.props.allMatches.Matchs as IParams[]).findIndex(element => element.id === (this.props.info.data as IParams).id);
          if (tempValue !== -1) {
            if ((this.props.allMatches.Matchs as IParams[])[tempValue].winnerId == null) {
              this.setState({
                winner: null,
              });
            } else {
              if ((this.props.allMatches.Matchs as IParams[])[tempValue].team1Id == null) {
                if ((this.props.allMatches.Matchs as IParams[])[tempValue].team2Id != null) {
                  this.setState({
                    winner: false,
                  });
                } else {
                  this.setState({
                    winner: null,
                  });
                }
              } else {
                if ((this.props.allMatches.Matchs as IParams[])[tempValue].team2Id == null) {
                  this.setState({
                    winner: true,
                  });
                } else {
                  if ((this.props.allMatches.Matchs as IParams[])[tempValue].winnerId === (this.props.allMatches.Matchs as IParams[])[tempValue].team1Id) {
                    this.setState({
                      winner: true,
                    });
                  } else {
                    this.setState({
                      winner: false,
                    });
                  }
                }
              }
            }
          }
          if ((this.props.allMatches.Scores as IParams)[(this.props.info.data as IParams).id as string] != null) {
            this.setState({
              team1Score: ((this.props.allMatches.Scores as IParams)[(this.props.info.data as IParams).id as string] as IParams).team1 as number,
              team2Score: ((this.props.allMatches.Scores as IParams)[(this.props.info.data as IParams).id as string] as IParams).team2 as number,
            });
          }
        }
      }
    }
  }

  private handleCloseModal = () => {
    const params = {
      path: '',
      param: {
        tournamentId: this.props.tournamentId,
      },
      data: {},
    };
    this.props.queryAllMatches(params);
    this.setState({
      showModal: false,
      selectedIndexInTab: 0,
    });
  }

  private onChangeEditMode = (editMode: boolean) => {
    if (editMode === true) {
      this.setState({
        confirmButtonModalVisible: false,
      });
    } else {
      if (this.props.matchInfo != null && this.props.matchInfo.status === MATCH_STATUS.PLAYING) {
        this.setState({
          confirmButtonModalVisible: true,
        });
      }
    }
  }

  private handleOpenModal = (index: number) => {
    this.setState({
      showModal: true,
      selectedIndexInTab: index,
    });
  }

  private onChangeSelectedIndex = (index: number) => {
    if (index === 0) {
      this.setState({
        confirmButtonModalVisible: false,
      });
    } else {
      if (this.props.matchInfo != null && this.props.matchInfo.status === MATCH_STATUS.PLAYING) {
        this.setState({
          confirmButtonModalVisible: true,
        });
      }
    }
  }

  private handleConfirmModal = () => {
    if (this.props.roundRobin === true) {
      const params = {
        path: '',
        param: {
          id: this.props.info.id,
        },
        data: {
          tournamentId: this.props.tournamentId,
        },
      }
      this.props.finishMatch(params);
    } else {
      const params = {
        path: '',
        param: {
          id: (this.props.info.data as IParams).id,
        },
        data: {
          tournamentId: this.props.tournamentId,
        },
      }
      this.props.finishMatch(params);
    }
    const params = {
      path: '',
      param: {
        tournamentId: this.props.tournamentId,
      },
      data: {},
    };
    this.props.queryAllMatches(params);
    this.setState({
      showModal: false,
    });
  }

  render() {
    // let amountOfListTeamDisplayed = 0;
    // for (let i = 0; i < this.props.info.listTeam.length; i++) {
    //   if (this.props.info.listTeam[i].teamInfo != null && this.props.info.listTeam[i].teamInfo!.id) {
    //     amountOfListTeamDisplayed++;
    //   }
    // }
    if (this.props.roundRobin === true) {
      if (this.props.info.id == null) {
        this.tabList = ['Thông tin trận đấu'];
        this.tabComponentList = [<MatchDetail datePreviousRound={this.props.datePreviousRound} dateNextRound={this.props.dateNextRound} matchType={this.props.matchType} tableId={this.props.tableId != null ? this.props.tableId : null} lowerBracket={this.props.lowerBracket} tournamentId={this.props.tournamentId} allMatches={null} matchInfo={null} info={this.props.info as IParams} />];
      }
    } else {
      if ((this.props.info.data as IParams).id == null) {
        this.tabList = ['Thông tin trận đấu'];
        this.tabComponentList = [<MatchDetail datePreviousRound={this.props.datePreviousRound} dateNextRound={this.props.dateNextRound} matchType={this.props.matchType} tableId={this.props.tableId != null ? this.props.tableId : null} lowerBracket={this.props.lowerBracket} tournamentId={this.props.tournamentId} beforeInfo={this.props.info} allMatches={null} matchInfo={null} info={this.props.info.data as IParams} />];
      }
    }
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
            <div className="BracketMatch-teams-container" onMouseOver={() => { this.setState({ iconVisible: true, }); }} onMouseOut={() => { this.setState({ iconVisible: false, }); }}>
              <div className="BracketMatch-team-container">
                <BracketTeam swapAble={this.props.swapAble} score={this.state.team1Score} isWinner={this.state.winner === true} tournamentId={this.props.tournamentId} beforeInfo={this.props.info.team1 != null ? this.props.info.team1 as IParams : null} info={this.props.info.team1 != null ? (this.props.info.team1 as IParams).team as IParams : null} description={this.props.info.team1 != null ? (this.props.info.team1 as IParams).description as IParams : null} borderBottom={true} />
                <BracketTeam swapAble={this.props.swapAble} score={this.state.team2Score} isWinner={this.state.winner === false} tournamentId={this.props.tournamentId} beforeInfo={this.props.info.team2 != null ? this.props.info.team2 as IParams : null} info={this.props.info.team2 != null ? (this.props.info.team2 as IParams).team as IParams : null} description={this.props.info.team2 != null ? (this.props.info.team2 as IParams).description as IParams : null} />
              </div>
              <div className="BracketMatch-matchSetting-container">
                <div className={`BracketMatch-afterMatch-icon-container ${this.state.iconVisible === true && 'BracketMatch-afterMatch-icon-container-background'}`} onClick={() => this.handleOpenModal(0)}>
                  <MdSettings className={`BracketMatch-afterMatch-icon-setting ${this.state.iconVisible === true ? 'BracketMatch-afterMatch-icon-visible' : 'BracketMatch-afterMatch-icon-invisible'}`} />
                </div>
              </div>
            </div>
          </div>}
          <CustomModal
            customStyles={customStyles}
            handleCloseModal={this.handleCloseModal}
            showModal={this.state.showModal}
            handleConfirmModal={this.handleConfirmModal}
            confirmButtonText={'Kết thúc'}
            confirmButtonVisible={this.state.confirmButtonModalVisible}
          >
            <CustomTab darkMode={true} tabList={this.tabList} componentList={this.tabComponentList} selectedIndex={this.state.selectedIndexInTab} />
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
              <div className="BracketMatch-teams-container" onMouseOver={() => { this.setState({ iconVisible: true, }); }} onMouseOut={() => { this.setState({ iconVisible: false, }); }}>
                <div className="BracketMatch-team-container">
                  <BracketTeam
                    tournamentId={this.props.tournamentId}
                    beforeInfo={(this.props.info.data as IParams).team1 != null ? (this.props.info.data as IParams).team1 as IParams : null}
                    info={(this.props.info.data as IParams).team1 != null ? ((this.props.info.data as IParams).team1 as IParams).team as IParams : null}
                    description={(this.props.info.data as IParams).team1 != null ? ((this.props.info.data as IParams).team1 as IParams).description as IParams : null}
                    borderBottom={true}
                    showAllDescription={this.props.showAllDescription}
                    isWinner={this.state.winner === true}
                    score={this.state.team1Score}
                    swapAble={this.props.swapAble}
                  />
                  <BracketTeam
                    showAllDescription={this.props.showAllDescription}
                    tournamentId={this.props.tournamentId}
                    beforeInfo={(this.props.info.data as IParams).team1 != null ? (this.props.info.data as IParams).team2 as IParams : null}
                    info={(this.props.info.data as IParams).team2 != null ? ((this.props.info.data as IParams).team2 as IParams).team as IParams : null}
                    description={(this.props.info.data as IParams).team2 != null ? ((this.props.info.data as IParams).team2 as IParams).description as IParams : null}
                    isWinner={this.state.winner === false}
                    score={this.state.team2Score}
                    swapAble={this.props.swapAble}
                  />
                </div>
                <div className="BracketMatch-matchSetting-container">
                  <div className={`BracketMatch-afterMatch-icon-container ${this.state.iconVisible === true && 'BracketMatch-afterMatch-icon-container-background'}`} onClick={() => this.handleOpenModal(0)}>
                    <MdSettings className={`BracketMatch-afterMatch-icon-setting ${this.state.iconVisible === true ? 'BracketMatch-afterMatch-icon-visible' : 'BracketMatch-afterMatch-icon-invisible'}`} />
                  </div>
                </div>
              </div>
            </div>}
          {
            this.props.has34 === true ?
              ((((this.props.info.data as IParams).roundNo as number) < this.props.totalRound - 1) && this.props.info.id !== -1 && <div
                // ((this.props.info.data as IParams).roundNo as number) nhỏ hơn tổng số round
                className="BracketMatch-preMatch-connector"
                style={{ height: `${MATCH_CONTAINER_HEIGHT}px` }}
              >
                {/* height=số đội trong 1 match * 25px / 2 + 2 */}
                <div className="BracketMatch-afterMatch-connector-border1"></div>
                <div className="BracketMatch-afterMatch-connector-border2"></div>
              </div>)
              : (((this.props.info.data as IParams).roundNo as number) < this.props.totalRound && this.props.info.id !== -1 && <div
                // ((this.props.info.data as IParams).roundNo as number) nhỏ hơn tổng số round
                className="BracketMatch-preMatch-connector"
                style={{ height: `${MATCH_CONTAINER_HEIGHT}px` }}
              >
                {/* height=số đội trong 1 match * 25px / 2 + 2 */}
                <div className="BracketMatch-afterMatch-connector-border1"></div>
                <div className="BracketMatch-afterMatch-connector-border2"></div>
              </div>)
          }
          <CustomModal
            customStyles={customStyles}
            handleCloseModal={this.handleCloseModal}
            showModal={this.state.showModal}
            handleConfirmModal={this.handleConfirmModal}
            confirmButtonText={'Kết thúc'}
            confirmButtonVisible={this.state.confirmButtonModalVisible}
          >
            <CustomTab darkMode={true} tabList={this.tabList} componentList={this.tabComponentList} selectedIndex={0} onChangeSelectedIndex={this.onChangeSelectedIndex} />
          </CustomModal>
        </div>
      );
    } else {
      const fakeId = this.props.info!.fakeId as number;
      const fakeRoundNo = (this.props.totalRound % 2 === 0 ? ((this.props.info.data as IParams).roundNo as number) : (((this.props.info.data as unknown as IParams).roundNo as number) + 1));
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
            marginTop: (fakeId - firstId) * treeHeight + firstLocation + PADDING_TOP + ((this.props.info.data as unknown as IParams).roundNo === this.props.totalRound ? 7 : 0),
          }}
        >
          <div
            className="BracketMatch-preMatch-connector"
          // style={{
          //   height: `${(MATCH_CONTAINER_HEIGHT / 4) * (2 ** ((!((this.props.info.data as IParams).roundNo === this.props.totalRound && this.props.lowerBracket === true)) ? ((this.props.info.data as IParams).roundNo as number) : ((this.props.info.data as IParams).roundNo as number) - 1))}px`
          // }}
          >
            {/* height=số đội trong 1 match * 25px / 2 + 2 */}
            <div className={`${(
              !((this.props.info.data as unknown as IParams).roundNo === this.props.totalRound &&
                this.props.lowerBracket === true) &&
              this.props.info.left != null &&
              (this.props.info.left as unknown as IParams).id !== -1 &&
              !(((this.props.info.left as unknown as IParams).data as unknown as IParams).name as string).includes('A')) &&
              'BracketMatch-preMatch-connector-border1'} ${((
                this.props.info.left != null &&
                (this.props.info.left as unknown as IParams).id !== -1)) &&
              ((this.props.info.data as unknown as IParams).roundNo as number) > 1 &&
              ((((this.props.info.left as IParams).data as IParams).name as string).includes('L') || (((this.props.info.right as IParams).data as IParams).name as string).includes('L')) &&
              'BracketMatch-preMatch-connector-borderrr'
              } BracketMatch-preMatch-connector-borderr`
            }></div>
            <div className={`${!((this.props.info.data as unknown as IParams).roundNo === this.props.totalRound &&
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
                <BracketTeam swapAble={this.props.swapAble} score={this.state.team1Score} isWinner={this.state.winner === true} tournamentId={this.props.tournamentId} beforeInfo={(this.props.info.data as IParams).team1 != null ? (this.props.info.data as IParams).team1 as IParams : null} info={(this.props.info.data as IParams).team1 != null ? ((this.props.info.data as IParams).team1 as IParams).team as IParams : null} description={((this.props.info.data as IParams).team1 as IParams).description as IParams} borderBottom={true} />
                <BracketTeam swapAble={this.props.swapAble} score={this.state.team2Score} isWinner={this.state.winner === false} tournamentId={this.props.tournamentId} beforeInfo={(this.props.info.data as IParams).team2 != null ? (this.props.info.data as IParams).team2 as IParams : null} info={(this.props.info.data as IParams).team2 != null ? ((this.props.info.data as IParams).team2 as IParams).team as IParams : null} description={((this.props.info.data as IParams).team2 as IParams).description as IParams} />
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
            handleConfirmModal={this.handleConfirmModal}
            confirmButtonText={'Kết thúc'}
            confirmButtonVisible={this.state.confirmButtonModalVisible}
          >
            <CustomTab darkMode={true} tabList={this.tabList} componentList={this.tabComponentList} selectedIndex={this.state.selectedIndexInTab} />
          </CustomModal>
        </div >
      );
    }
  }
}

const mapStateToProps = (state: IState) => {
  return {
    bracketStartedStatus: state.bracketStartedStatus,
    matchInfo: state.matchInfo,
  };
};

export default connect(
  mapStateToProps,
  { queryMatchInfo, finishMatch, queryAllMatches }
)(BracketMatch);