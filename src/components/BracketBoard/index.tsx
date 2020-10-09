import React from 'react';
import { connect } from 'react-redux';
import ReduxBlockUi from 'react-block-ui/redux';
import BracketRound from 'components/BracketRound';
import { IState } from 'redux-saga/reducers';
import { IBigRequest, IParams } from 'interfaces/common';
import { queryListTeams } from 'components/Teams/actions';
import { SWAP_TWO_TEAM_IN_BRACKET_SUCCESS, SWAP_TWO_TEAM_IN_BRACKET_FAILED } from 'components/BracketTeam/reducers';
import { SWAP_TWO_TEAM_IN_BRACKET } from 'redux-saga/actions';
import { queryAllMatches, queryBracketBoardInfo, setBracketStartedStatus } from './actions';
import './styles.css';
import { TOURNAMENT_STATUS } from 'global';

interface IBracketBoardProps extends React.ClassAttributes<BracketBoard> {
  bracketBoardInfo: IParams | null;
  tournamentId: number;
  listTeam: IParams[] | null;
  allMatches: IParams | null;
  finalStage: boolean;
  tournamentStatus: string,
  swapAble: boolean;
  canEdit: boolean;

  queryBracketBoardInfo(params: IBigRequest): void;
  setBracketStartedStatus(params: boolean): void;
  queryListTeams(params: IBigRequest): void;
  queryAllMatches(params: IBigRequest): void;
}

interface IBracketBoardState {
}

class BracketBoard extends React.Component<IBracketBoardProps, IBracketBoardState> {

  constructor(props: IBracketBoardProps) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps: IBracketBoardProps, nextState: IBracketBoardState) {
    if (nextProps.bracketBoardInfo !== this.props.bracketBoardInfo) {
      this.setState({});
    }
    // if (nextProps.finalStage !== true) {
    //   if (nextProps.bracketBoardInfo !== this.props.bracketBoardInfo && nextProps.bracketBoardInfo != null) {
    //     console.log('nextProps.bracketBoardInfo.groupStage', nextProps.bracketBoardInfo.groupStage);
    //     if (nextProps.bracketBoardInfo.groupStage == null) {
    //       const params: IBigRequest = {
    //         path: '',
    //         param: {
    //           competitionId: this.props.competitionId,
    //         },
    //         data: {},
    //       };
    //       this.props.queryBracketBoardInfo(params);
    //     }
    //   }
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
        tournamentId: this.props.tournamentId,
      },
      data: {},
    };
    this.props.queryBracketBoardInfo(params);
    params = {
      path: '',
      param: {
        tournamentId: this.props.tournamentId,
        limit: 999,
      },
      data: {},
    };
    this.props.queryListTeams(params);
    if (this.props.tournamentStatus !== TOURNAMENT_STATUS.INITIALIZING && this.props.tournamentStatus !== TOURNAMENT_STATUS.OPENING) {
      params = {
        path: '',
        param: {
          tournamentId: this.props.tournamentId,
        },
        data: {},
      };
      this.props.queryAllMatches(params);
    }
  }

  render() {
    if (this.props.bracketBoardInfo != null) {
      if (this.props.finalStage === true) {
        if ((this.props.bracketBoardInfo.finalStage as IParams).listRRRound != null) {
          return (
            <ReduxBlockUi
              tag="div"
              block={SWAP_TWO_TEAM_IN_BRACKET}
              unblock={[SWAP_TWO_TEAM_IN_BRACKET_SUCCESS, SWAP_TWO_TEAM_IN_BRACKET_FAILED]}
            >
              <div className="BracketBoard-container-container">
                <div className="BracketBoard-container">
                  {((this.props.bracketBoardInfo.finalStage as IParams).listRRRound as IParams[]).map((item, index) =>
                    <BracketRound
                      tournamentId={this.props.tournamentId}
                      index={index}
                      info={item}
                      key={index}
                      roundNo={index + 1}
                      totalRound={((this.props.bracketBoardInfo!.finalStage as IParams).listRRRound as IParams[]).length}
                      roundRobin={true}
                      allMatches={this.props.allMatches}
                      swapAble={this.props.swapAble}
                      finalStage={true}
                      previousRound={index > 0 ? ((this.props.bracketBoardInfo!.finalStage as IParams).listRRRound as IParams[])[index - 1] : null}
                      nextRound={index < ((this.props.bracketBoardInfo!.finalStage as IParams).listRRRound as IParams[]).length - 1 ? ((this.props.bracketBoardInfo!.finalStage as IParams).listRRRound as IParams[])[index + 1] : null}
                      tournamentStarted={this.props.tournamentStatus !== TOURNAMENT_STATUS.INITIALIZING && this.props.tournamentStatus !== TOURNAMENT_STATUS.OPENING}
                      canEdit={this.props.canEdit}
                    />
                  )}
                </div>
              </div>
            </ReduxBlockUi>
          );
        } else {
          return (
            <ReduxBlockUi
              tag="div"
              block={SWAP_TWO_TEAM_IN_BRACKET}
              unblock={[SWAP_TWO_TEAM_IN_BRACKET_SUCCESS, SWAP_TWO_TEAM_IN_BRACKET_FAILED]}
            >
              {((this.props.tournamentStatus === TOURNAMENT_STATUS.INITIALIZING || this.props.tournamentStatus === TOURNAMENT_STATUS.OPENING) && this.props.swapAble === true) && <div className={'BracketBoard-text'}>
                <p>Bạn có thể đổi chỗ các đội thi đấu bằng cách bấm vào 2 đội, Thay đổi này chỉ có thể thực hiện khi giải đấu chưa bắt đầu</p>
              </div>}
              <div className="BracketBoard-container-container">
                <div className="BracketBoard-container">
                  {this.props.bracketBoardInfo == null || this.props.listTeam == null || this.props.bracketBoardInfo.finalStage == null
                    ? <p>Chưa có thông tin!</p>
                    : ((this.props.bracketBoardInfo.finalStage as IParams).listRound != null ? ((this.props.bracketBoardInfo.finalStage as IParams).listRound as unknown as IParams[]).map((item, index) =>
                      (<BracketRound canEdit={this.props.canEdit} tournamentStarted={this.props.tournamentStatus !== TOURNAMENT_STATUS.INITIALIZING && this.props.tournamentStatus !== TOURNAMENT_STATUS.OPENING} nextRound={index < ((this.props.bracketBoardInfo!.finalStage as IParams).listRound as IParams[]).length - 1 ? ((this.props.bracketBoardInfo!.finalStage as IParams).listRound as IParams[])[index + 1] : null} previousRound={index > 0 ? ((this.props.bracketBoardInfo!.finalStage as IParams).listRound as IParams[])[index - 1] : null} finalStage={true} swapAble={this.props.swapAble} allMatches={this.props.allMatches} has34={((this.props.bracketBoardInfo!.finalStage as IParams).listRound as IParams[])[((this.props.bracketBoardInfo!.finalStage as IParams).listRound as IParams[]).length - 1].roundName === 'Tranh Giải 3'} tournamentId={this.props.tournamentId} index={index} info={item} key={index} roundNo={index + 1} totalRound={((this.props.bracketBoardInfo!.finalStage as IParams).listRound! as unknown as IParams[]).length} />)) :
                      ((this.props.bracketBoardInfo.finalStage as IParams).listWinRound as unknown as IParams[]).map((item, index) =>
                        <BracketRound canEdit={this.props.canEdit} tournamentStarted={this.props.tournamentStatus !== TOURNAMENT_STATUS.INITIALIZING && this.props.tournamentStatus !== TOURNAMENT_STATUS.OPENING} nextRound={index < ((this.props.bracketBoardInfo!.finalStage as IParams).listWinRound as IParams[]).length - 1 ? ((this.props.bracketBoardInfo!.finalStage as IParams).listWinRound as IParams[])[index + 1] : null} previousRound={index > 0 ? ((this.props.bracketBoardInfo!.finalStage as IParams).listWinRound as IParams[])[index - 1] : null} finalStage={true} swapAble={this.props.swapAble} allMatches={this.props.allMatches} tournamentId={this.props.tournamentId} index={index} info={item} key={index} roundNo={index + 1} totalRound={((this.props.bracketBoardInfo!.finalStage as IParams).listWinRound! as unknown as IParams[]).length} />)
                    )
                  }
                </div>
                <div className="BracketBoard-container">
                  {this.props.bracketBoardInfo != null && this.props.bracketBoardInfo.finalStage && (this.props.bracketBoardInfo.finalStage as IParams).listLoseRound != null && ((this.props.bracketBoardInfo.finalStage as IParams).listLoseRound as unknown as IParams[]).map((item, index) =>
                    <BracketRound canEdit={this.props.canEdit} tournamentStarted={this.props.tournamentStatus !== TOURNAMENT_STATUS.INITIALIZING && this.props.tournamentStatus !== TOURNAMENT_STATUS.OPENING} nextRound={index < ((this.props.bracketBoardInfo!.finalStage as IParams).listLoseRound as IParams[]).length - 1 ? ((this.props.bracketBoardInfo!.finalStage as IParams).listLoseRound as IParams[])[index + 1] : null} previousRound={index > 0 ? ((this.props.bracketBoardInfo!.finalStage as IParams).listLoseRound as IParams[])[index - 1] : null} finalStage={true} swapAble={this.props.swapAble} allMatches={this.props.allMatches} tournamentId={this.props.tournamentId} index={index} info={item} key={index} roundNo={index + 1} totalRound={((this.props.bracketBoardInfo!.finalStage as IParams).listLoseRound! as unknown as IParams[]).length} />)}
                </div>
                <div className="BracketBoard-container">
                  {
                    this.props.bracketBoardInfo != null &&
                    this.props.bracketBoardInfo.finalStage &&
                    (this.props.bracketBoardInfo.finalStage as IParams).listSumRound != null &&
                    ((this.props.bracketBoardInfo.finalStage as IParams).listSumRound as IParams[]).length > 0 &&
                    ((this.props.bracketBoardInfo.finalStage as IParams).listSumRound as IParams[]).map((item, index) =>
                      <BracketRound canEdit={this.props.canEdit} tournamentStarted={this.props.tournamentStatus !== TOURNAMENT_STATUS.INITIALIZING && this.props.tournamentStatus !== TOURNAMENT_STATUS.OPENING} nextRound={index < ((this.props.bracketBoardInfo!.finalStage as IParams).listSumRound as IParams[]).length - 1 ? ((this.props.bracketBoardInfo!.finalStage as IParams).listSumRound as IParams[])[index + 1] : null} previousRound={index > 0 ? ((this.props.bracketBoardInfo!.finalStage as IParams).listSumRound as IParams[])[index - 1] : null} finalStage={true} swapAble={this.props.swapAble} allMatches={this.props.allMatches} tournamentId={this.props.tournamentId} index={index} info={item} key={index} roundNo={index + 1} totalRound={2} />)
                  }
                </div>
              </div>
            </ReduxBlockUi>
          );
        }
      } else {
        if (this.props.bracketBoardInfo.groupStage != null) {
          if ((this.props.bracketBoardInfo.groupStage as IParams).listTableRR != null) {
            return (
              <ReduxBlockUi
                tag="div"
                block={SWAP_TWO_TEAM_IN_BRACKET}
                unblock={[SWAP_TWO_TEAM_IN_BRACKET_SUCCESS, SWAP_TWO_TEAM_IN_BRACKET_FAILED]}
              >
                {((this.props.tournamentStatus === TOURNAMENT_STATUS.INITIALIZING || this.props.tournamentStatus === TOURNAMENT_STATUS.OPENING) && this.props.swapAble === true) && <div className={'BracketBoard-text'}>
                  <p>Bạn có thể đổi chỗ các đội thi đấu bằng cách bấm vào 2 đội, Thay đổi này chỉ có thể thực hiện khi giải đấu chưa bắt đầu</p>
                </div>}
                {((this.props.bracketBoardInfo.groupStage as IParams).listTableRR as IParams[]).map((item, index) =>
                  <div className="BracketBoard-container-container" key={index}>
                    <div className="BracketBoard-container">
                      <p>Bảng {item.tableName}</p>
                    </div>
                    <div className="BracketBoard-container">
                      {(item.listRRRound as IParams[]).length > 0 ? ((item.listRRRound as IParams[]).map((item2, index2) => {
                        return <BracketRound
                          tournamentId={this.props.tournamentId}
                          index={index2}
                          info={item2}
                          key={index2}
                          roundNo={index2 + 1}
                          totalRound={(item.listRRRound as IParams[]).length}
                          roundRobin={true}
                          allMatches={this.props.allMatches}
                          swapAble={this.props.swapAble}
                          finalStage={false}
                          tableId={item.tableId as number}
                          previousRound={index2 > 0 ? (item.listRRRound as IParams[])[index2 - 1] : null}
                          nextRound={index2 < (item.listRRRound as IParams[]).length - 1 ? (item.listRRRound as IParams[])[index2 + 1] : null}
                          tournamentStarted={this.props.tournamentStatus !== TOURNAMENT_STATUS.INITIALIZING && this.props.tournamentStatus !== TOURNAMENT_STATUS.OPENING}
                          canEdit={this.props.canEdit}
                        />
                      }
                      )) : <p>Không thể lập lịch cho bảng này!</p>}
                    </div>
                  </div>)}
              </ReduxBlockUi>
            );
          } else {
            if (this.props.bracketBoardInfo.groupStage != null && this.props.listTeam != null) {
              if ((this.props.bracketBoardInfo.groupStage as IParams).listTableSE != null) {
                return (
                  <ReduxBlockUi
                    tag="div"
                    block={SWAP_TWO_TEAM_IN_BRACKET}
                    unblock={[SWAP_TWO_TEAM_IN_BRACKET_SUCCESS, SWAP_TWO_TEAM_IN_BRACKET_FAILED]}
                  >
                    {((this.props.tournamentStatus === TOURNAMENT_STATUS.INITIALIZING || this.props.tournamentStatus === TOURNAMENT_STATUS.OPENING) && this.props.swapAble === true) && <div className={'BracketBoard-text'}>
                      <p>Bạn có thể đổi chỗ các đội thi đấu bằng cách bấm vào 2 đội, Thay đổi này chỉ có thể thực hiện khi giải đấu chưa bắt đầu</p>
                    </div>}
                    {((this.props.bracketBoardInfo.groupStage as IParams).listTableSE as IParams[]).map((item, index) =>
                      <div className="BracketBoard-container-container" key={index}>
                        <div className="BracketBoard-container">
                          <p>Bảng {item.tableName}</p>
                        </div>
                        <div className="BracketBoard-container">
                          {(item.listRound != null && (item.listRound as IParams[]).length > 0 ?
                            (item.listRound as IParams[]).map((item2, index2) =>
                              (<BracketRound
                                allMatches={this.props.allMatches}
                                tournamentId={this.props.tournamentId}
                                index={index2}
                                info={item2}
                                key={index2}
                                roundNo={index2 + 1}
                                swapAble={this.props.swapAble}
                                totalRound={(item.listRound as IParams[]).length}
                                finalStage={false}
                                has34={(item.listRound as IParams[])[(item.listRound as IParams[]).length - 1].roundName === 'Tranh Giải 3'}
                                previousRound={index2 > 0 ? (item.listRound as IParams[])[index2 - 1] : null}
                                nextRound={index2 < (item.listRound as IParams[]).length - 1 ? (item.listRound as IParams[])[index2 + 1] : null}
                                tournamentStarted={this.props.tournamentStatus !== TOURNAMENT_STATUS.INITIALIZING && this.props.tournamentStatus !== TOURNAMENT_STATUS.OPENING}
                                canEdit={this.props.canEdit}
                              />)) :
                            <p>Không thể lập lịch cho bảng này!</p>
                          )
                          }
                        </div>
                      </div>)}
                  </ReduxBlockUi>
                );
              } else if ((this.props.bracketBoardInfo.groupStage as IParams).listTableDE != null) {
                console.log('(this.props.bracketBoardInfo.groupStage as IParams).listTableDE', (this.props.bracketBoardInfo.groupStage as IParams).listTableDE);
                return (
                  <ReduxBlockUi
                    tag="div"
                    block={SWAP_TWO_TEAM_IN_BRACKET}
                    unblock={[SWAP_TWO_TEAM_IN_BRACKET_SUCCESS, SWAP_TWO_TEAM_IN_BRACKET_FAILED]}
                  >
                    {((this.props.tournamentStatus === TOURNAMENT_STATUS.INITIALIZING || this.props.tournamentStatus === TOURNAMENT_STATUS.OPENING) && this.props.swapAble === true) && <div className={'BracketBoard-text'}>
                      <p>Bạn có thể đổi chỗ các đội thi đấu bằng cách bấm vào 2 đội, Thay đổi này chỉ có thể thực hiện khi giải đấu chưa bắt đầu</p>
                    </div>}
                    {((this.props.bracketBoardInfo.groupStage as IParams).listTableDE as IParams[]).map((item, index) =>
                      <div className="BracketBoard-container-container" key={index}>
                        <div className="BracketBoard-container">
                          <p>Bảng {item.tableName}</p>
                        </div>
                        <div className="BracketBoard-container">
                          {(item.listWinRound != null && (item.listWinRound as IParams[]).length > 0 ?
                            (item.listWinRound as IParams[]).map((item2, index2) =>
                              (<BracketRound canEdit={this.props.canEdit} tournamentStarted={this.props.tournamentStatus !== TOURNAMENT_STATUS.INITIALIZING && this.props.tournamentStatus !== TOURNAMENT_STATUS.OPENING} nextRound={index2 < (item.listWinRound as IParams[]).length - 1 ? (item.listWinRound as IParams[])[index2 + 1] : null} previousRound={index2 > 0 ? (item.listWinRound as IParams[])[index2 - 1] : null} finalStage={false} swapAble={this.props.swapAble} allMatches={this.props.allMatches} tournamentId={this.props.tournamentId} index={index2} info={item2} key={index2} roundNo={index2 + 1} totalRound={(item.listWinRound as IParams[]).length} />)) :
                            <p>Không thể lập lịch cho bảng này!</p>
                          )
                          }
                        </div>
                        <div className="BracketBoard-container">
                          {(item.listLoseRound != null && (item.listLoseRound as IParams[]).length > 0 &&
                            (item.listLoseRound as IParams[]).map((item2, index2) =>
                              (<BracketRound canEdit={this.props.canEdit} tournamentStarted={this.props.tournamentStatus !== TOURNAMENT_STATUS.INITIALIZING && this.props.tournamentStatus !== TOURNAMENT_STATUS.OPENING} nextRound={index2 < (item.listLoseRound as IParams[]).length - 1 ? (item.listLoseRound as IParams[])[index2 + 1] : null} previousRound={index2 > 0 ? (item.listLoseRound as IParams[])[index2 - 1] : null} finalStage={false} swapAble={this.props.swapAble} allMatches={this.props.allMatches} tournamentId={this.props.tournamentId} index={index2} info={item2} key={index2} roundNo={index2 + 1} totalRound={(item.listLoseRound as IParams[]).length} />))
                          )
                          }
                        </div>
                        <div className="BracketBoard-container">
                          {(item.listSumRound != null && (item.listSumRound as IParams[]).length > 0 &&
                            (item.listSumRound as IParams[]).map((item2, index2) =>
                              (<BracketRound canEdit={this.props.canEdit} tournamentStarted={this.props.tournamentStatus !== TOURNAMENT_STATUS.INITIALIZING && this.props.tournamentStatus !== TOURNAMENT_STATUS.OPENING} nextRound={index2 < (item.listSumRound as IParams[]).length - 1 ? (item.listSumRound as IParams[])[index2 + 1] : null} previousRound={index2 > 0 ? (item.listSumRound as IParams[])[index2 - 1] : null} finalStage={false} swapAble={this.props.swapAble} allMatches={this.props.allMatches} tournamentId={this.props.tournamentId} index={index2} info={item2} key={index2} roundNo={index2 + 1} totalRound={2} />))
                          )
                          }
                        </div>
                      </div>
                    )}
                  </ReduxBlockUi>
                );
              }
            } else {
              // if (this.props.bracketBoardInfo.groupStage == null) {
              //   const params: IBigRequest = {
              //     path: '',
              //     param: {
              //       competitionId: this.props.competitionId,
              //     },
              //     data: {},
              //   };
              //   this.props.queryBracketBoardInfo(params);
              // }
              return (
                <p>Chưa có thông tin!</p>
              );
            }
          }
        } else {
          return <div></div>
        }
      }
    } else {
      return (<p>Chưa có thông tin!</p>);
    }
  }

}

const mapStateToProps = (state: IState) => {
  return {
    listTeam: state.listTeam,
    bracketBoardInfo: state.bracketBoardInfo,
    allMatches: state.allMatches,
  };
};

export default connect(
  mapStateToProps,
  {
    queryBracketBoardInfo,
    setBracketStartedStatus,
    queryListTeams,
    queryAllMatches
  }
)(BracketBoard);