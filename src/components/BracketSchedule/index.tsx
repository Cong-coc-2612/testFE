import React from 'react';
import { connect } from 'react-redux';
import { IParams, IBigRequest } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import { queryBracketBoardInfo } from 'components/BracketBoard/actions';
import { queryListTeams } from 'components/Teams/actions';
import { queryAllMatches } from 'components/BracketBoard/actions';
import './styles.css';

interface IBracketScheduleProps extends React.ClassAttributes<BracketSchedule> {
  bracketBoardInfo: IParams | null;
  tournamentId: number;
  finalStage: boolean;
  listTeam: IParams[] | null;
  allMatches: IParams | null;
  started: boolean;

  queryBracketBoardInfo(params: IBigRequest): void;
  queryListTeams(params: IBigRequest): void;
  queryAllMatches(params: IBigRequest): void;
}

interface IBracketScheduleState {
}

class BracketSchedule extends React.Component<IBracketScheduleProps, IBracketScheduleState> {
  constructor(props: IBracketScheduleProps) {
    super(props);
    this.state = {
    };
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
    if (this.props.started === true) {
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

  private getScoreTeam1 = (allMatches: IParams | null, currentMatchId: string) => {
    if (allMatches == null) {
      return 0;
    }
    if ((allMatches.Scores as IParams)[currentMatchId] != null) {
      return ((allMatches.Scores as IParams)[currentMatchId] as IParams).team1;
    }
    return 0;
  }

  private getScoreTeam2 = (allMatches: IParams | null, currentMatchId: string) => {
    if (allMatches == null) {
      return 0;
    }
    if ((allMatches.Scores as IParams)[currentMatchId] != null) {
      return ((allMatches.Scores as IParams)[currentMatchId] as IParams).team2;
    }
    return 0;
  }

  private getWinner = (allMatches: IParams | null, currentMatchId: number) => {
    if (allMatches == null) {
      return null;
    }
    const tempValue = (allMatches.Matchs as IParams[]).findIndex(element => element.id === currentMatchId);
    if (tempValue !== -1) {
      if ((allMatches.Matchs as IParams[])[tempValue].winnerId == null) {
        return null;
      } else {
        if ((allMatches.Matchs as IParams[])[tempValue].team1Id == null || (allMatches.Matchs as IParams[])[tempValue].team2Id == null) {
          return null;
        } else {
          if ((allMatches.Matchs as IParams[])[tempValue].winnerId === (allMatches.Matchs as IParams[])[tempValue].team1Id) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
    return null;
  }

  render() {
    if (this.props.bracketBoardInfo != null) {
      if (this.props.finalStage === true) {
        if ((this.props.bracketBoardInfo.finalStage as IParams).listRound != null) {
          return (
            <div className="BracketSchedule-container">
              {((this.props.bracketBoardInfo.finalStage as IParams).listRound != null &&
                ((this.props.bracketBoardInfo.finalStage as IParams).listRound as IParams[]).map((item, index) =>
                  <div className="BracketSchedule-round-container" key={index}>
                    <div className="BracketSchedule-roundName-container">
                      <p className={'BracketSchedule-roundName-text'}>{`${item.roundName}`}</p>
                    </div>
                    {item.listMatches != null && (item.listMatches as IParams[]).map((item2, index2) => {
                      if (item2.id !== -1) {
                        return (<div className="BracketSchedule-roundMatch-container" key={index2}>
                          <div className="BracketSchedule-roundMatch-orderNumber-container">
                            <p>{(item2.data as IParams).name}</p>
                          </div>
                          <div className="BracketSchedule-roundMatch-time-container">
                            <p>{this.props.started !== true ? ((item2.data != null && (item2.data as IParams).time != null && (item2.data as IParams).time !== '') ? (item2.data as IParams).time : `(Chưa có thời gian)`) : ((this.props.allMatches != null && (this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) != null && (((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).time as string) !== '') ? ((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).time : `(Chưa có thời gian)`)}</p>
                            <p>{this.props.started !== true ? ((item2.data != null && (item2.data as IParams).location != null && (item2.data as IParams).location !== '') ? (item2.data as IParams).location : `(Chưa có địa điểm)`) : ((this.props.allMatches != null && (this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) != null && (((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).location as string) !== '') ? ((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).location : `(Chưa có địa điểm)`)}</p>
                          </div>
                          <div className="BracketSchedule-roundMatch-name-container">
                            {(item2.data as IParams).team1 != null && (((item2.data as IParams).team1 as IParams).description != null && ((item2.data as IParams).team1 as IParams).team != null ?
                              <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team1 as IParams).team as IParams).shortName}</p> :
                              ((((item2.data as IParams).team1 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team1 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                          </div>
                          <div className={`BracketSchedule-roundMatch-consequent-container ${this.getWinner(this.props.allMatches, (item2.data as IParams).id as number) === true ? 'BracketSchedule-roundMatch-consequent1-container' : 'BracketSchedule-roundMatch-consequent2-container'}`}>
                            <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result1-text">{this.getScoreTeam1(this.props.allMatches, (item2.data as IParams).id as string)}</p>
                          </div>
                          <div className="BracketSchedule-roundMatch-consequentMiddle-container">
                            <p>-</p>
                          </div>
                          <div className={`BracketSchedule-roundMatch-consequent-container ${this.getWinner(this.props.allMatches, (item2.data as IParams).id as number) === false ? 'BracketSchedule-roundMatch-consequent1-container' : 'BracketSchedule-roundMatch-consequent2-container'}`}>
                            <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result2-text">{this.getScoreTeam2(this.props.allMatches, (item2.data as IParams).id as string)}</p>
                          </div>
                          <div className="BracketSchedule-roundMatch-name-container">
                            {
                              (item2.data as IParams).team2 != null && (((item2.data as IParams).team2 as IParams).description != null && ((item2.data as IParams).team2 as IParams).team != null ?
                                <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team2 as IParams).team as IParams).shortName}</p> :
                                ((((item2.data as IParams).team2 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team2 as IParams).description as IParams).descType !== -1 ? (((item2.data as IParams).team2 as IParams).description as IParams).description : `(Chưa có)`}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                          </div>
                        </div>)
                      } else {
                        return <div key={index2}></div>
                      }
                    })}
                  </div>))}
            </div>
          );
        } else {
          if ((this.props.bracketBoardInfo.finalStage as IParams).listWinRound != null) {
            return (
              <div className="BracketSchedule-container">
                <p style={{ fontWeight: 'bold', fontSize: 20 }}>Nhánh thắng</p>
                {(
                  (this.props.bracketBoardInfo.finalStage as IParams).listWinRound != null && ((this.props.bracketBoardInfo.finalStage as IParams).listWinRound as unknown as IParams[]).map((item, index) =>
                    <div className="BracketSchedule-round-container" key={index}>
                      <div className="BracketSchedule-roundName-container">
                        <p className={'BracketSchedule-roundName-text'}>{`${item.roundName}`}</p>
                      </div>
                      {item.listWinMatches != null && (item.listWinMatches as IParams[]).map((item2, index2) => {
                        if (item2.id !== -1) {
                          return (<div className="BracketSchedule-roundMatch-container" key={index2}>
                            <div className="BracketSchedule-roundMatch-orderNumber-container">
                              <p>{(item2.data as IParams).name}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-time-container">
                              <p>{this.props.started !== true ? ((item2.data != null && (item2.data as IParams).time != null && (item2.data as IParams).time !== '') ? (item2.data as IParams).time : `(Chưa có thời gian)`) : ((this.props.allMatches != null && (this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) != null && (((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).time as string) !== '') ? ((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).time : `(Chưa có thời gian)`)}</p>
                              <p>{this.props.started !== true ? ((item2.data != null && (item2.data as IParams).location != null && (item2.data as IParams).location !== '') ? (item2.data as IParams).location : `(Chưa có địa điểm)`) : ((this.props.allMatches != null && (this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) != null && (((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).location as string) !== '') ? ((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).location : `(Chưa có địa điểm)`)}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-name-container">
                              {(item2.data as IParams).team1 != null && (((item2.data as IParams).team1 as IParams).description != null && ((item2.data as IParams).team1 as IParams).team != null ?
                                <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team1 as IParams).team as IParams).shortName}</p> :
                                ((((item2.data as IParams).team1 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team1 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                            </div>
                            <div className={`BracketSchedule-roundMatch-consequent-container ${this.getWinner(this.props.allMatches, (item2.data as IParams).id as number) === true ? 'BracketSchedule-roundMatch-consequent1-container' : 'BracketSchedule-roundMatch-consequent2-container'}`}>
                              <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result1-text">{this.getScoreTeam1(this.props.allMatches, (item2.data as IParams).id as string)}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-consequentMiddle-container">
                              <p>-</p>
                            </div>
                            <div className={`BracketSchedule-roundMatch-consequent-container ${this.getWinner(this.props.allMatches, (item2.data as IParams).id as number) === false ? 'BracketSchedule-roundMatch-consequent1-container' : 'BracketSchedule-roundMatch-consequent2-container'}`}>
                              <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result2-text">{this.getScoreTeam2(this.props.allMatches, (item2.data as IParams).id as string)}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-name-container">
                              {
                                (item2.data as IParams).team2 != null && (((item2.data as IParams).team2 as IParams).description != null && ((item2.data as IParams).team2 as IParams).team != null ?
                                  <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team2 as IParams).team as IParams).shortName}</p> :
                                  ((((item2.data as IParams).team2 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team2 as IParams).description as IParams).descType !== -1 ? (((item2.data as IParams).team2 as IParams).description as IParams).description : `(Chưa có)`}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                            </div>
                          </div>)
                        } else {
                          return <div key={index2}></div>
                        }
                      })}
                    </div>))}
                <p style={{ fontWeight: 'bold', fontSize: 20 }}>Nhánh Thua</p>
                {(
                  (this.props.bracketBoardInfo.finalStage as IParams).listLoseRound != null && ((this.props.bracketBoardInfo.finalStage as IParams).listLoseRound as unknown as IParams[]).length > 0 ? ((this.props.bracketBoardInfo.finalStage as IParams).listLoseRound as unknown as IParams[]).map((item, index) =>
                    <div className="BracketSchedule-round-container" key={index}>
                      <div className="BracketSchedule-roundName-container">
                        <p className={'BracketSchedule-roundName-text'}>{`${item.roundName}`}</p>
                      </div>
                      {item.listLoseMatches != null && (item.listLoseMatches as IParams[]).map((item2, index2) => {
                        if (item2.id !== -1) {
                          return (<div className="BracketSchedule-roundMatch-container" key={index2}>
                            <div className="BracketSchedule-roundMatch-orderNumber-container">
                              <p>{(item2.data as IParams).name}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-time-container">
                              <p>{this.props.started !== true ? ((item2.data != null && (item2.data as IParams).time != null && (item2.data as IParams).time !== '') ? (item2.data as IParams).time : `(Chưa có thời gian)`) : ((this.props.allMatches != null && (this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) != null && (((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).time as string) !== '') ? ((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).time : `(Chưa có thời gian)`)}</p>
                              <p>{this.props.started !== true ? ((item2.data != null && (item2.data as IParams).location != null && (item2.data as IParams).location !== '') ? (item2.data as IParams).location : `(Chưa có địa điểm)`) : ((this.props.allMatches != null && (this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) != null && (((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).location as string) !== '') ? ((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).location : `(Chưa có địa điểm)`)}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-name-container">
                              {(item2.data as IParams).team1 != null && (((item2.data as IParams).team1 as IParams).description != null && ((item2.data as IParams).team1 as IParams).team != null ?
                                <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team1 as IParams).team as IParams).shortName}</p> :
                                ((((item2.data as IParams).team1 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team1 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                            </div>
                            <div className={`BracketSchedule-roundMatch-consequent-container ${this.getWinner(this.props.allMatches, (item2.data as IParams).id as number) === true ? 'BracketSchedule-roundMatch-consequent1-container' : 'BracketSchedule-roundMatch-consequent2-container'}`}>
                              <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result1-text">{this.getScoreTeam1(this.props.allMatches, (item2.data as IParams).id as string)}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-consequentMiddle-container">
                              <p>-</p>
                            </div>
                            <div className={`BracketSchedule-roundMatch-consequent-container ${this.getWinner(this.props.allMatches, (item2.data as IParams).id as number) === false ? 'BracketSchedule-roundMatch-consequent1-container' : 'BracketSchedule-roundMatch-consequent2-container'}`}>
                              <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result2-text">{this.getScoreTeam2(this.props.allMatches, (item2.data as IParams).id as string)}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-name-container">
                              {
                                (item2.data as IParams).team2 != null && (((item2.data as IParams).team2 as IParams).description != null && ((item2.data as IParams).team2 as IParams).team != null ?
                                  <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team2 as IParams).team as IParams).shortName}</p> :
                                  ((((item2.data as IParams).team2 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team2 as IParams).description as IParams).descType !== -1 ? (((item2.data as IParams).team2 as IParams).description as IParams).description : `(Chưa có)`}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                            </div>
                          </div>)
                        } else {
                          return <div key={index2}></div>
                        }
                      })}
                    </div>) : <p>Không có trận nào!</p>)}
              </div>
            );
          } else {
            return (
              <div className="BracketSchedule-container">
                {((this.props.bracketBoardInfo.finalStage as IParams).listRRRound != null &&
                  ((this.props.bracketBoardInfo.finalStage as IParams).listRRRound as IParams[]).map((item, index) =>
                    <div className="BracketSchedule-round-container" key={index}>
                      <div className="BracketSchedule-roundName-container">
                        <p className={'BracketSchedule-roundName-text'}>{`${item.roundName}`}</p>
                      </div>
                      {item.listMatches != null && (item.listMatches as IParams[]).map((item2, index2) => {
                        if (item2.id !== -1) {
                          return (<div className="BracketSchedule-roundMatch-container" key={index2}>
                            <div className="BracketSchedule-roundMatch-orderNumber-container">
                              <p>{item2.name}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-time-container">
                              <p>{this.props.started !== true ? ((item2.time != null && item2.time !== '') ? item2.time : `(Chưa có thời gian)`) : ((this.props.allMatches != null && (this.props.allMatches.Matchs as IParams[]).find(element => element.id === item2.id) != null && (((this.props.allMatches.Matchs as IParams[]).find(element => element.id === item2.id) as IParams).time as string) !== '') ? ((this.props.allMatches.Matchs as IParams[]).find(element => element.id === item2.id) as IParams).time : `(Chưa có thời gian)`)}</p>
                              <p>{this.props.started !== true ? ((item2.location != null && item2.location !== '') ? item2.location : `(Chưa có địa điểm)`) : ((this.props.allMatches != null && (this.props.allMatches.Matchs as IParams[]).find(element => element.id === item2.id) != null && (((this.props.allMatches.Matchs as IParams[]).find(element => element.id === item2.id) as IParams).location as string) !== '') ? ((this.props.allMatches.Matchs as IParams[]).find(element => element.id === item2.id) as IParams).location : `(Chưa có địa điểm)`)}</p>
                              {/* <p>{(item2.time as string).trim() !== '' ? item2.time : `(Chưa có thời gian)`}</p>
                              <p>{(item2.location as string).trim() !== '' ? item2.location : `(Chưa có địa điểm)`}</p> */}
                            </div>
                            <div className="BracketSchedule-roundMatch-name-container">
                              {item2.team1 != null && ((item2.team1 as IParams).description != null && (item2.team1 as IParams).team != null ?
                                <p className={"BracketSchedule-name-text"}>{((item2.team1 as IParams).team as IParams).shortName}</p> :
                                (((item2.team1 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{((item2.team1 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[(((item2.team1 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[(((item2.team1 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[(((item2.team1 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                            </div>
                            <div className={`BracketSchedule-roundMatch-consequent-container ${this.getWinner(this.props.allMatches, item2.id as number) === true ? 'BracketSchedule-roundMatch-consequent1-container' : 'BracketSchedule-roundMatch-consequent2-container'}`}>
                              <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result1-text">{this.getScoreTeam1(this.props.allMatches, item2.id as string)}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-consequentMiddle-container">
                              <p>-</p>
                            </div>
                            <div className={`BracketSchedule-roundMatch-consequent-container ${this.getWinner(this.props.allMatches, item2.id as number) === false ? 'BracketSchedule-roundMatch-consequent1-container' : 'BracketSchedule-roundMatch-consequent2-container'}`}>
                              <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result2-text">{this.getScoreTeam2(this.props.allMatches, item2.id as string)}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-name-container">
                              {
                                item2.team2 != null && ((item2.team2 as IParams).description != null && (item2.team2 as IParams).team != null ?
                                  <p className={"BracketSchedule-name-text"}>{((item2.team2 as IParams).team as IParams).shortName}</p> :
                                  (((item2.team2 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{((item2.team2 as IParams).description as IParams).descType !== -1 ? ((item2.team2 as IParams).description as IParams).description : `(Chưa có)`}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[(((item2.team2 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[(((item2.team2 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[(((item2.team2 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                            </div>
                          </div>)
                        } else {
                          return <div key={index2}></div>
                        }
                      })}
                    </div>))}
              </div>
            );
          }
        }
      } else {
        if (this.props.bracketBoardInfo.groupStage != null && (this.props.bracketBoardInfo.groupStage as IParams).listTableSE != null) {
          return (
            ((this.props.bracketBoardInfo.groupStage as IParams).listTableSE as IParams[]).map((item3, index3) =>
              <div className="BracketSchedule-container" key={index3}>
                <p style={{ fontWeight: 'bold', fontSize: 20 }}>Bảng {item3.tableName}</p>
                {(item3.listRound != null &&
                  (item3.listRound as unknown as IParams[]).map((item, index) =>
                    <div className="BracketSchedule-round-container" key={index}>
                      <div className="BracketSchedule-roundName-container">
                        <p className={'BracketSchedule-roundName-text'}>{`${item.roundName}`}</p>
                      </div>
                      {item.listMatches != null && (item.listMatches as IParams[]).map((item2, index2) => {
                        if (item2.id !== -1) {
                          return (<div className="BracketSchedule-roundMatch-container" key={index2}>
                            <div className="BracketSchedule-roundMatch-orderNumber-container">
                              <p>{(item2.data as IParams).name}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-time-container">
                              <p>{this.props.started !== true ? ((item2.data != null && (item2.data as IParams).time != null && (item2.data as IParams).time !== '') ? (item2.data as IParams).time : `(Chưa có thời gian)`) : ((this.props.allMatches != null && (this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) != null && (((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).time as string) !== '') ? ((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).time : `(Chưa có thời gian)`)}</p>
                              <p>{this.props.started !== true ? ((item2.data != null && (item2.data as IParams).location != null && (item2.data as IParams).location !== '') ? (item2.data as IParams).location : `(Chưa có địa điểm)`) : ((this.props.allMatches != null && (this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) != null && (((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).location as string) !== '') ? ((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).location : `(Chưa có địa điểm)`)}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-name-container">
                              {(item2.data as IParams).team1 != null && (((item2.data as IParams).team1 as IParams).description != null && ((item2.data as IParams).team1 as IParams).team != null ?
                                <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team1 as IParams).team as IParams).shortName}</p> :
                                ((((item2.data as IParams).team1 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team1 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                            </div>
                            <div className={`BracketSchedule-roundMatch-consequent-container ${this.getWinner(this.props.allMatches, (item2.data as IParams).id as number) === true ? 'BracketSchedule-roundMatch-consequent1-container' : 'BracketSchedule-roundMatch-consequent2-container'}`}>
                              <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result1-text">{this.getScoreTeam1(this.props.allMatches, (item2.data as IParams).id as string)}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-consequentMiddle-container">
                              <p>-</p>
                            </div>
                            <div className={`BracketSchedule-roundMatch-consequent-container ${this.getWinner(this.props.allMatches, (item2.data as IParams).id as number) === false ? 'BracketSchedule-roundMatch-consequent1-container' : 'BracketSchedule-roundMatch-consequent2-container'}`}>
                              <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result2-text">{this.getScoreTeam2(this.props.allMatches, (item2.data as IParams).id as string)}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-name-container">
                              {
                                (item2.data as IParams).team2 != null && (((item2.data as IParams).team2 as IParams).description != null && ((item2.data as IParams).team2 as IParams).team != null ?
                                  <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team2 as IParams).team as IParams).shortName}</p> :
                                  ((((item2.data as IParams).team2 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team2 as IParams).description as IParams).descType !== -1 ? (((item2.data as IParams).team2 as IParams).description as IParams).description : `(Chưa có)`}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                            </div>
                          </div>)
                        } else {
                          return <div key={index2}></div>
                        }
                      })}
                    </div>))}
              </div>
            )
          );
        } else {
          if (this.props.bracketBoardInfo.groupStage != null && (this.props.bracketBoardInfo.groupStage as IParams).listTableDE != null) {
            return (
              ((this.props.bracketBoardInfo.groupStage as IParams).listTableDE as IParams[]).map((item3, index3) =>
                <div className="BracketSchedule-container">
                  <p style={{ fontWeight: 'bold', fontSize: 20 }}>Nhánh thắng Bảng {item3.tableName}</p>
                  {(
                    (item3.listWinRound as unknown as IParams[]).map((item, index) =>
                      <div className="BracketSchedule-round-container" key={index}>
                        <div className="BracketSchedule-roundName-container">
                          <p className={'BracketSchedule-roundName-text'}>{`${item.roundName}`}</p>
                        </div>
                        {item.listWinMatches != null && (item.listWinMatches as IParams[]).map((item2, index2) => {
                          if (item2.id !== -1) {
                            return (<div className="BracketSchedule-roundMatch-container" key={index2}>
                              <div className="BracketSchedule-roundMatch-orderNumber-container">
                                <p>{(item2.data as IParams).name}</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-time-container">
                                <p>{this.props.started !== true ? ((item2.data != null && (item2.data as IParams).time != null && (item2.data as IParams).time !== '') ? (item2.data as IParams).time : `(Chưa có thời gian)`) : ((this.props.allMatches != null && (this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) != null && (((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).time as string) !== '') ? ((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).time : `(Chưa có thời gian)`)}</p>
                                <p>{this.props.started !== true ? ((item2.data != null && (item2.data as IParams).location != null && (item2.data as IParams).location !== '') ? (item2.data as IParams).location : `(Chưa có địa điểm)`) : ((this.props.allMatches != null && (this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) != null && (((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).location as string) !== '') ? ((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).location : `(Chưa có địa điểm)`)}</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-name-container">
                                {(item2.data as IParams).team1 != null && (((item2.data as IParams).team1 as IParams).description != null && ((item2.data as IParams).team1 as IParams).team != null ?
                                  <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team1 as IParams).team as IParams).shortName}</p> :
                                  ((((item2.data as IParams).team1 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team1 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                              </div>
                              <div className={`BracketSchedule-roundMatch-consequent-container ${this.getWinner(this.props.allMatches, (item2.data as IParams).id as number) === true ? 'BracketSchedule-roundMatch-consequent1-container' : 'BracketSchedule-roundMatch-consequent2-container'}`}>
                                <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result1-text">{this.getScoreTeam1(this.props.allMatches, (item2.data as IParams).id as string)}</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-consequentMiddle-container">
                                <p>-</p>
                              </div>
                              <div className={`BracketSchedule-roundMatch-consequent-container ${this.getWinner(this.props.allMatches, (item2.data as IParams).id as number) === false ? 'BracketSchedule-roundMatch-consequent1-container' : 'BracketSchedule-roundMatch-consequent2-container'}`}>
                                <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result2-text">{this.getScoreTeam2(this.props.allMatches, (item2.data as IParams).id as string)}</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-name-container">
                                {
                                  (item2.data as IParams).team2 != null && (((item2.data as IParams).team2 as IParams).description != null && ((item2.data as IParams).team2 as IParams).team != null ?
                                    <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team2 as IParams).team as IParams).shortName}</p> :
                                    ((((item2.data as IParams).team2 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team2 as IParams).description as IParams).descType !== -1 ? (((item2.data as IParams).team2 as IParams).description as IParams).description : `(Chưa có)`}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                              </div>
                            </div>)
                          } else {
                            return <div key={index2}></div>
                          }
                        })}
                      </div>))}
                  <p style={{ fontWeight: 'bold', fontSize: 20 }}>Nhánh Thua Bảng {item3.tableName}</p>
                  {(
                    (item3.listLoseRound as IParams[]).length > 0 ? (item3.listLoseRound as IParams[]).map((item, index) =>
                      <div className="BracketSchedule-round-container" key={index}>
                        <div className="BracketSchedule-roundName-container">
                          <p className={'BracketSchedule-roundName-text'}>{`${item.roundName}`}</p>
                        </div>
                        {item.listLoseMatches != null && (item.listLoseMatches as IParams[]).map((item2, index2) => {
                          if (item2.id !== -1) {
                            return (<div className="BracketSchedule-roundMatch-container" key={index2}>
                              <div className="BracketSchedule-roundMatch-orderNumber-container">
                                <p>{(item2.data as IParams).name}</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-time-container">
                                <p>{this.props.started !== true ? ((item2.data != null && (item2.data as IParams).time != null && (item2.data as IParams).time !== '') ? (item2.data as IParams).time : `(Chưa có thời gian)`) : ((this.props.allMatches != null && (this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) != null && (((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).time as string) !== '') ? ((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).time : `(Chưa có thời gian)`)}</p>
                                <p>{this.props.started !== true ? ((item2.data != null && (item2.data as IParams).location != null && (item2.data as IParams).location !== '') ? (item2.data as IParams).location : `(Chưa có địa điểm)`) : ((this.props.allMatches != null && (this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) != null && (((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).location as string) !== '') ? ((this.props.allMatches.Matchs as IParams[]).find(element => element.id === (item2.data as IParams).id) as IParams).location : `(Chưa có địa điểm)`)}</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-name-container">
                                {(item2.data as IParams).team1 != null && (((item2.data as IParams).team1 as IParams).description != null && ((item2.data as IParams).team1 as IParams).team != null ?
                                  <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team1 as IParams).team as IParams).shortName}</p> :
                                  ((((item2.data as IParams).team1 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team1 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                              </div>
                              <div className={`BracketSchedule-roundMatch-consequent-container ${this.getWinner(this.props.allMatches, (item2.data as IParams).id as number) === true ? 'BracketSchedule-roundMatch-consequent1-container' : 'BracketSchedule-roundMatch-consequent2-container'}`}>
                                <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result1-text">{this.getScoreTeam1(this.props.allMatches, (item2.data as IParams).id as string)}</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-consequentMiddle-container">
                                <p>-</p>
                              </div>
                              <div className={`BracketSchedule-roundMatch-consequent-container ${this.getWinner(this.props.allMatches, (item2.data as IParams).id as number) === false ? 'BracketSchedule-roundMatch-consequent1-container' : 'BracketSchedule-roundMatch-consequent2-container'}`}>
                                <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result2-text">{this.getScoreTeam2(this.props.allMatches, (item2.data as IParams).id as string)}</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-name-container">
                                {
                                  (item2.data as IParams).team2 != null && (((item2.data as IParams).team2 as IParams).description != null && ((item2.data as IParams).team2 as IParams).team != null ?
                                    <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team2 as IParams).team as IParams).shortName}</p> :
                                    ((((item2.data as IParams).team2 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team2 as IParams).description as IParams).descType !== -1 ? (((item2.data as IParams).team2 as IParams).description as IParams).description : `(Chưa có)`}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                              </div>
                            </div>)
                          } else {
                            return <div key={index2}></div>
                          }
                        })}
                      </div>) : <p>Không có trận nào!</p>)}
                </div>)
            );
          } else {
            return (
              (this.props.bracketBoardInfo != null && this.props.bracketBoardInfo.groupStage != null && (this.props.bracketBoardInfo.groupStage as IParams).listTableRR != null ? ((this.props.bracketBoardInfo.groupStage as IParams).listTableRR as IParams[]).map((item3, index3) =>
                <div className="BracketSchedule-container" key={index3}>
                  <p style={{ fontWeight: 'bold', fontSize: 20 }}>Bảng {item3.tableName}</p>
                  {(item3.listRRRound != null &&
                    (item3.listRRRound as IParams[]).map((item, index) =>
                      <div className="BracketSchedule-round-container" key={index}>
                        <div className="BracketSchedule-roundName-container">
                          <p className={'BracketSchedule-roundName-text'}>{`${item.roundName}`}</p>
                        </div>
                        {item.listMatches != null && (item.listMatches as IParams[]).map((item2, index2) => {
                          if (item2.id !== -1) {
                            return (<div className="BracketSchedule-roundMatch-container" key={index2}>
                              <div className="BracketSchedule-roundMatch-orderNumber-container">
                                <p>{item2.name}</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-time-container">
                                <p>{this.props.started !== true ? ((item2.time != null && item2.time !== '') ? item2.time : `(Chưa có thời gian)`) : ((this.props.allMatches != null && (this.props.allMatches.Matchs as IParams[]).find(element => element.id === item2.id) != null && (((this.props.allMatches.Matchs as IParams[]).find(element => element.id === item2.id) as IParams).time as string) !== '') ? ((this.props.allMatches.Matchs as IParams[]).find(element => element.id === item2.id) as IParams).time : `(Chưa có thời gian)`)}</p>
                                <p>{this.props.started !== true ? ((item2.location != null && item2.location !== '') ? item2.location : `(Chưa có địa điểm)`) : ((this.props.allMatches != null && (this.props.allMatches.Matchs as IParams[]).find(element => element.id === item2.id) != null && (((this.props.allMatches.Matchs as IParams[]).find(element => element.id === item2.id) as IParams).location as string) !== '') ? ((this.props.allMatches.Matchs as IParams[]).find(element => element.id === item2.id) as IParams).location : `(Chưa có địa điểm)`)}</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-name-container">
                                {item2.team1 != null && ((item2.team1 as IParams).description != null && (item2.team1 as IParams).team != null ?
                                  <p className={"BracketSchedule-name-text"}>{((item2.team1 as IParams).team as IParams).shortName}</p> :
                                  (((item2.team1 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{((item2.team1 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[(((item2.team1 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[(((item2.team1 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[(((item2.team1 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                              </div>
                              <div className={`BracketSchedule-roundMatch-consequent-container ${this.getWinner(this.props.allMatches, item2.id as number) === true ? 'BracketSchedule-roundMatch-consequent1-container' : 'BracketSchedule-roundMatch-consequent2-container'}`}>
                                <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result1-text">{this.getScoreTeam1(this.props.allMatches, item2.id as string)}</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-consequentMiddle-container">
                                <p>-</p>
                              </div>
                              <div className={`BracketSchedule-roundMatch-consequent-container ${this.getWinner(this.props.allMatches, item2.id as number) === false ? 'BracketSchedule-roundMatch-consequent1-container' : 'BracketSchedule-roundMatch-consequent2-container'}`}>
                                <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result2-text">{this.getScoreTeam2(this.props.allMatches, item2.id as string)}</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-name-container">
                                {
                                  item2.team2 != null && ((item2.team2 as IParams).description != null && (item2.team2 as IParams).team != null ?
                                    <p className={"BracketSchedule-name-text"}>{((item2.team2 as IParams).team as IParams).shortName}</p> :
                                    (((item2.team2 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{((item2.team2 as IParams).description as IParams).descType === -1 ? `(Chưa có)` : ((item2.team2 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[(((item2.team2 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[(((item2.team2 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[(((item2.team2 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                              </div>
                            </div>)
                          } else {
                            return <div key={index2}></div>
                          }
                        })}
                      </div>))}
                </div>) : <div/>
              )
            );
          }
        }
      }
    } else {
      return (<p>Chưa có thông tin</p>);
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
  { queryBracketBoardInfo, queryListTeams, queryAllMatches }
)(BracketSchedule);