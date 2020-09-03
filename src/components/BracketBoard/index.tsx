import React from 'react';
import { connect } from 'react-redux';
import ReduxBlockUi from 'react-block-ui/redux';
import BracketRound from 'components/BracketRound';
import { IState } from 'redux-saga/reducers';
import { IBigRequest, IParams } from 'interfaces/common';
import { queryListTeams } from 'components/Teams/actions';
import { SWAP_TWO_TEAM_IN_BRACKET_SUCCESS, SWAP_TWO_TEAM_IN_BRACKET_FAILED } from 'components/BracketTeam/reducers';
import { SWAP_TWO_TEAM_IN_BRACKET } from 'redux-saga/actions';
import { queryBracketBoardInfo, setBracketStartedStatus } from './actions';
import './styles.css';

interface IBracketBoardProps extends React.ClassAttributes<BracketBoard> {
  bracketBoardInfo: IParams | null;
  competitionId: number;
  listTeam: IParams[] | null;
  finalStage: boolean;

  queryBracketBoardInfo(params: IBigRequest): void;
  setBracketStartedStatus(params: boolean): void;
  queryListTeams(params: IBigRequest): void;
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
    return true;
  }

  componentDidMount() {
    this.requestData();
  }

  private requestData = () => {
    let params: IBigRequest = {
      path: '',
      param: {
        competitionId: this.props.competitionId,
      },
      data: {},
    };
    this.props.queryBracketBoardInfo(params);
    params = {
      path: '',
      param: {
        competitionId: this.props.competitionId,
        limit: 999,
      },
      data: {},
    };
    this.props.queryListTeams(params);
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
                      competitionId={this.props.competitionId}
                      index={index}
                      info={item}
                      key={index}
                      roundNo={index + 1}
                      totalRound={((this.props.bracketBoardInfo!.finalStage as IParams).listRRRound as IParams[]).length}
                      roundRobin={true}
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
              <div className={'BracketBoard-text'}>
                <p>Bạn có thể đổi chỗ các đội thi đấu bằng cách bấm vào 2 đội, Thay đổi này chỉ có thể thực hiện khi giải đấu chưa bắt đầu</p>
              </div>
              <div className="BracketBoard-container-container">
                <div className="BracketBoard-container">
                  {this.props.bracketBoardInfo == null || this.props.listTeam == null || this.props.bracketBoardInfo.finalStage == null
                    ? <p>Chưa có thông tin!</p>
                    : ((this.props.bracketBoardInfo.finalStage as IParams).listRound != null ? ((this.props.bracketBoardInfo.finalStage as IParams).listRound as unknown as IParams[]).map((item, index) =>
                      (<BracketRound competitionId={this.props.competitionId} index={index} info={item} key={index} roundNo={index + 1} totalRound={((this.props.bracketBoardInfo!.finalStage as IParams).listRound! as unknown as IParams[]).length} />)) :
                      ((this.props.bracketBoardInfo.finalStage as IParams).listWinRound as unknown as IParams[]).map((item, index) =>
                        <BracketRound competitionId={this.props.competitionId} index={index} info={item} key={index} roundNo={index + 1} totalRound={((this.props.bracketBoardInfo!.finalStage as IParams).listWinRound! as unknown as IParams[]).length} />)
                    )
                  }
                </div>
                <div className="BracketBoard-container">
                  {this.props.bracketBoardInfo != null && this.props.bracketBoardInfo.finalStage && (this.props.bracketBoardInfo.finalStage as IParams).listLoseRound != null && ((this.props.bracketBoardInfo.finalStage as IParams).listLoseRound as unknown as IParams[]).map((item, index) =>
                    <BracketRound competitionId={this.props.competitionId} index={index} info={item} key={index} roundNo={index + 1} totalRound={((this.props.bracketBoardInfo!.finalStage as IParams).listLoseRound! as unknown as IParams[]).length} />)}
                </div>
              </div>
            </ReduxBlockUi>
          );
        }
      } else {
        if ((this.props.bracketBoardInfo.groupStage as IParams).listTableRR != null) {
          return (
            <ReduxBlockUi
              tag="div"
              block={SWAP_TWO_TEAM_IN_BRACKET}
              unblock={[SWAP_TWO_TEAM_IN_BRACKET_SUCCESS, SWAP_TWO_TEAM_IN_BRACKET_FAILED]}
            >
              <div className={'BracketBoard-text'}>
                <p>Bạn có thể đổi chỗ các đội thi đấu bằng cách bấm vào 2 đội, Thay đổi này chỉ có thể thực hiện khi giải đấu chưa bắt đầu</p>
              </div>
              {((this.props.bracketBoardInfo.groupStage as IParams).listTableRR as IParams[]).map((item, index) =>
                <div className="BracketBoard-container-container" key={index}>
                  <div className="BracketBoard-container">
                    <p>Bảng {item.tableName}</p>
                  </div>
                  <div className="BracketBoard-container">
                    {(item.listRRRound as IParams[]).length > 0 ? ((item.listRRRound as IParams[]).map((item2, index2) =>
                      <BracketRound
                        competitionId={this.props.competitionId}
                        index={index2}
                        info={item2}
                        key={index2}
                        roundNo={index2 + 1}
                        totalRound={(item.listRRRound as IParams[]).length}
                        roundRobin={true}
                      />
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
                  <div className={'BracketBoard-text'}>
                    <p>Bạn có thể đổi chỗ các đội thi đấu bằng cách bấm vào 2 đội, Thay đổi này chỉ có thể thực hiện khi giải đấu chưa bắt đầu</p>
                  </div>
                  {((this.props.bracketBoardInfo.groupStage as IParams).listTableSE as IParams[]).map((item, index) =>
                    <div className="BracketBoard-container-container" key={index}>
                      <div className="BracketBoard-container">
                        <p>Bảng {item.tableName}</p>
                      </div>
                      <div className="BracketBoard-container">
                        {(item.listRound != null && (item.listRound as IParams[]).length > 0 ?
                          (item.listRound as IParams[]).map((item2, index2) =>
                            (<BracketRound competitionId={this.props.competitionId} index={index2} info={item2} key={index2} roundNo={index2 + 1} totalRound={(item.listRound as IParams[]).length} />)) :
                          <p>Không thể lập lịch cho bảng này!</p>
                        )
                        }
                      </div>
                    </div>)}
                </ReduxBlockUi>
              );
            } else if ((this.props.bracketBoardInfo.groupStage as IParams).listTableDE != null) {
              return (
                <ReduxBlockUi
                  tag="div"
                  block={SWAP_TWO_TEAM_IN_BRACKET}
                  unblock={[SWAP_TWO_TEAM_IN_BRACKET_SUCCESS, SWAP_TWO_TEAM_IN_BRACKET_FAILED]}
                >
                  <div className={'BracketBoard-text'}>
                    <p>Bạn có thể đổi chỗ các đội thi đấu bằng cách bấm vào 2 đội, Thay đổi này chỉ có thể thực hiện khi giải đấu chưa bắt đầu</p>
                  </div>
                  {((this.props.bracketBoardInfo.groupStage as IParams).listTableDE as IParams[]).map((item, index) =>
                    <div className="BracketBoard-container-container" key={index}>
                      <div className="BracketBoard-container">
                        <p>Bảng {item.tableName}</p>
                      </div>
                      <div className="BracketBoard-container">
                        {(item.listWinRound != null && (item.listWinRound as IParams[]).length > 0 ?
                          (item.listWinRound as IParams[]).map((item2, index2) =>
                            (<BracketRound competitionId={this.props.competitionId} index={index2} info={item2} key={index2} roundNo={index2 + 1} totalRound={(item.listWinRound as IParams[]).length} />)) :
                          <p>Không thể lập lịch cho bảng này!</p>
                        )
                        }
                      </div>
                      <div className="BracketBoard-container">
                        {(item.listLoseRound != null && (item.listLoseRound as IParams[]).length > 0 &&
                          (item.listLoseRound as IParams[]).map((item2, index2) =>
                            (<BracketRound competitionId={this.props.competitionId} index={index2} info={item2} key={index2} roundNo={index2 + 1} totalRound={(item.listLoseRound as IParams[]).length} />))
                        )
                        }
                      </div>
                    </div>
                  )}
                </ReduxBlockUi>
              );
            }
          } else {
            return (
              <p>Chưa có thông tin!</p>
            );
          }
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
  };
};

export default connect(
  mapStateToProps,
  {
    queryBracketBoardInfo,
    setBracketStartedStatus,
    queryListTeams
  }
)(BracketBoard);