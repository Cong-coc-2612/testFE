import React from 'react';
import { connect } from 'react-redux';
import { IParams, IBigRequest } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import { queryBracketBoardInfo } from 'components/BracketBoard/actions';
import { queryListTeams } from 'components/Teams/actions';
import { formatDateToDisplay } from 'utils/datetime';
import './styles.css';

interface IBracketScheduleProps extends React.ClassAttributes<BracketSchedule> {
  bracketBoardInfo: IParams | null;
  competitionId: number;
  finalStage: boolean;
  listTeam: IParams[] | null;

  queryBracketBoardInfo(params: IBigRequest): void;
  queryListTeams(params: IBigRequest): void;
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
      console.log('this.props.bracketBoardInfo', this.props.bracketBoardInfo);
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
                            <p>{(item2.data as IParams).time}</p>
                            <p>{(item2.data as IParams).location}</p>
                          </div>
                          <div className="BracketSchedule-roundMatch-name-container">
                            {(item2.data as IParams).team1 != null && (((item2.data as IParams).team1 as IParams).description != null && ((item2.data as IParams).team1 as IParams).team != null ?
                              <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team1 as IParams).team as IParams).name}</p> :
                              ((((item2.data as IParams).team1 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team1 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                          </div>
                          <div className="BracketSchedule-roundMatch-consequent-container BracketSchedule-roundMatch-consequent1-container">
                            <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result1-text">1</p>
                          </div>
                          <div className="BracketSchedule-roundMatch-consequentMiddle-container">
                            <p>-</p>
                          </div>
                          <div className="BracketSchedule-roundMatch-consequent-container BracketSchedule-roundMatch-consequent2-container">
                            <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result2-text">0</p>
                          </div>
                          <div className="BracketSchedule-roundMatch-name-container">
                            {
                              (item2.data as IParams).team2 != null && (((item2.data as IParams).team2 as IParams).description != null && ((item2.data as IParams).team2 as IParams).team != null ?
                                <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team2 as IParams).team as IParams).name}</p> :
                                ((((item2.data as IParams).team2 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team2 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
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
                  ((this.props.bracketBoardInfo.finalStage as IParams).listWinRound as unknown as IParams[]).map((item, index) =>
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
                              <p>{(item2.data as IParams).time}</p>
                              <p>{(item2.data as IParams).location}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-name-container">
                              {(item2.data as IParams).team1 != null && (((item2.data as IParams).team1 as IParams).description != null && ((item2.data as IParams).team1 as IParams).team != null ?
                                <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team1 as IParams).team as IParams).name}</p> :
                                ((((item2.data as IParams).team1 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team1 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                            </div>
                            <div className="BracketSchedule-roundMatch-consequent-container BracketSchedule-roundMatch-consequent1-container">
                              <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result1-text">1</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-consequentMiddle-container">
                              <p>-</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-consequent-container BracketSchedule-roundMatch-consequent2-container">
                              <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result2-text">0</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-name-container">
                              {
                                (item2.data as IParams).team2 != null && (((item2.data as IParams).team2 as IParams).description != null && ((item2.data as IParams).team2 as IParams).team != null ?
                                  <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team2 as IParams).team as IParams).name}</p> :
                                  ((((item2.data as IParams).team2 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team2 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                            </div>
                          </div>)
                        } else {
                          return <div key={index2}></div>
                        }
                      })}
                    </div>))}
                <p style={{ fontWeight: 'bold', fontSize: 20 }}>Nhánh Thua</p>
                {(
                  ((this.props.bracketBoardInfo.finalStage as IParams).listLoseRound as unknown as IParams[]).length > 0 ? ((this.props.bracketBoardInfo.finalStage as IParams).listLoseRound as unknown as IParams[]).map((item, index) =>
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
                              <p>{(item2.data as IParams).time}</p>
                              <p>{(item2.data as IParams).location}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-name-container">
                              {(item2.data as IParams).team1 != null && (((item2.data as IParams).team1 as IParams).description != null && ((item2.data as IParams).team1 as IParams).team != null ?
                                <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team1 as IParams).team as IParams).name}</p> :
                                ((((item2.data as IParams).team1 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team1 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                            </div>
                            <div className="BracketSchedule-roundMatch-consequent-container BracketSchedule-roundMatch-consequent1-container">
                              <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result1-text">1</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-consequentMiddle-container">
                              <p>-</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-consequent-container BracketSchedule-roundMatch-consequent2-container">
                              <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result2-text">0</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-name-container">
                              {
                                (item2.data as IParams).team2 != null && (((item2.data as IParams).team2 as IParams).description != null && ((item2.data as IParams).team2 as IParams).team != null ?
                                  <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team2 as IParams).team as IParams).name}</p> :
                                  ((((item2.data as IParams).team2 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team2 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
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
                  ((this.props.bracketBoardInfo.finalStage as IParams).listRRRound as unknown as IParams[]).map((item, index) =>
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
                              <p>{item2.time}</p>
                              <p>{item2.location}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-name-container">
                              {item2.team1 != null && ((item2.team1 as IParams).description != null && (item2.team1 as IParams).team != null ?
                                <p className={"BracketSchedule-name-text"}>{((item2.team1 as IParams).team as IParams).name}</p> :
                                (((item2.team1 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{((item2.team1 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[(((item2.team1 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[(((item2.team1 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[(((item2.team1 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                            </div>
                            <div className="BracketSchedule-roundMatch-consequent-container BracketSchedule-roundMatch-consequent1-container">
                              <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result1-text">1</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-consequentMiddle-container">
                              <p>-</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-consequent-container BracketSchedule-roundMatch-consequent2-container">
                              <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result2-text">0</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-name-container">
                              {
                                item2.team2 != null && ((item2.team2 as IParams).description != null && (item2.team2 as IParams).team != null ?
                                  <p className={"BracketSchedule-name-text"}>{((item2.team2 as IParams).team as IParams).name}</p> :
                                  (((item2.team2 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{((item2.team2 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[(((item2.team2 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[(((item2.team2 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[(((item2.team2 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
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
        if ((this.props.bracketBoardInfo.groupStage as IParams).listTableSE != null) {
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
                              <p>{(item2.data as IParams).time}</p>
                              <p>{(item2.data as IParams).location}</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-name-container">
                              {(item2.data as IParams).team1 != null && (((item2.data as IParams).team1 as IParams).description != null && ((item2.data as IParams).team1 as IParams).team != null ?
                                <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team1 as IParams).team as IParams).name}</p> :
                                ((((item2.data as IParams).team1 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team1 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                            </div>
                            <div className="BracketSchedule-roundMatch-consequent-container BracketSchedule-roundMatch-consequent1-container">
                              <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result1-text">1</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-consequentMiddle-container">
                              <p>-</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-consequent-container BracketSchedule-roundMatch-consequent2-container">
                              <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result2-text">0</p>
                            </div>
                            <div className="BracketSchedule-roundMatch-name-container">
                              {
                                (item2.data as IParams).team2 != null && (((item2.data as IParams).team2 as IParams).description != null && ((item2.data as IParams).team2 as IParams).team != null ?
                                  <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team2 as IParams).team as IParams).name}</p> :
                                  ((((item2.data as IParams).team2 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team2 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
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
          if ((this.props.bracketBoardInfo.groupStage as IParams).listTableDE != null) {
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
                                <p>{formatDateToDisplay((item2.data as IParams).time as string, 'HH:mm dd/MM/yyyy', 'yyyy-MM-dd HH:mm:ss')}</p>
                                <p>{(item2.data as IParams).location}</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-name-container">
                                {(item2.data as IParams).team1 != null && (((item2.data as IParams).team1 as IParams).description != null && ((item2.data as IParams).team1 as IParams).team != null ?
                                  <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team1 as IParams).team as IParams).name}</p> :
                                  ((((item2.data as IParams).team1 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team1 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                              </div>
                              <div className="BracketSchedule-roundMatch-consequent-container BracketSchedule-roundMatch-consequent1-container">
                                <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result1-text">1</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-consequentMiddle-container">
                                <p>-</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-consequent-container BracketSchedule-roundMatch-consequent2-container">
                                <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result2-text">0</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-name-container">
                                {
                                  (item2.data as IParams).team2 != null && (((item2.data as IParams).team2 as IParams).description != null && ((item2.data as IParams).team2 as IParams).team != null ?
                                    <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team2 as IParams).team as IParams).name}</p> :
                                    ((((item2.data as IParams).team2 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team2 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
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
                                <p>{(item2.data as IParams).time}</p>
                                <p>{(item2.data as IParams).location}</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-name-container">
                                {(item2.data as IParams).team1 != null && (((item2.data as IParams).team1 as IParams).description != null && ((item2.data as IParams).team1 as IParams).team != null ?
                                  <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team1 as IParams).team as IParams).name}</p> :
                                  ((((item2.data as IParams).team1 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team1 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team1 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                              </div>
                              <div className="BracketSchedule-roundMatch-consequent-container BracketSchedule-roundMatch-consequent1-container">
                                <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result1-text">1</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-consequentMiddle-container">
                                <p>-</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-consequent-container BracketSchedule-roundMatch-consequent2-container">
                                <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result2-text">0</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-name-container">
                                {
                                  (item2.data as IParams).team2 != null && (((item2.data as IParams).team2 as IParams).description != null && ((item2.data as IParams).team2 as IParams).team != null ?
                                    <p className={"BracketSchedule-name-text"}>{(((item2.data as IParams).team2 as IParams).team as IParams).name}</p> :
                                    ((((item2.data as IParams).team2 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{(((item2.data as IParams).team2 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[((((item2.data as IParams).team2 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
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
              (((this.props.bracketBoardInfo.groupStage as IParams).listTableRR as IParams[]).map((item3, index3) =>
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
                                <p>{item2.time}</p>
                                <p>{item2.location}</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-name-container">
                                {item2.team1 != null && ((item2.team1 as IParams).description != null && (item2.team1 as IParams).team != null ?
                                  <p className={"BracketSchedule-name-text"}>{((item2.team1 as IParams).team as IParams).name}</p> :
                                  (((item2.team1 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{((item2.team1 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[(((item2.team1 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[(((item2.team1 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[(((item2.team1 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                              </div>
                              <div className="BracketSchedule-roundMatch-consequent-container BracketSchedule-roundMatch-consequent1-container">
                                <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result1-text">1</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-consequentMiddle-container">
                                <p>-</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-consequent-container BracketSchedule-roundMatch-consequent2-container">
                                <p className="BracketSchedule-roundMatch-result-text BracketSchedule-roundMatch-result2-text">0</p>
                              </div>
                              <div className="BracketSchedule-roundMatch-name-container">
                                {
                                  item2.team2 != null && ((item2.team2 as IParams).description != null && (item2.team2 as IParams).team != null ?
                                    <p className={"BracketSchedule-name-text"}>{((item2.team2 as IParams).team as IParams).name}</p> :
                                    (((item2.team2 as IParams).description as IParams).descType !== 0 ? <p className={"BracketSchedule-name-text BracketSchedule-name-text2"}>{((item2.team2 as IParams).description as IParams).description}</p> : <p className={"BracketSchedule-name-text"}>{this.props.listTeam != null && this.props.listTeam[(((item2.team2 as IParams).description as IParams).unitIndex as number) - 1] != null && this.props.listTeam[(((item2.team2 as IParams).description as IParams).unitIndex as number) - 1].shortName != null ? this.props.listTeam[(((item2.team2 as IParams).description as IParams).unitIndex as number) - 1].shortName : ''}</p>))}
                              </div>
                            </div>)
                          } else {
                            return <div key={index2}></div>
                          }
                        })}
                      </div>))}
                </div>)
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
  };
};

export default connect(
  mapStateToProps,
  { queryBracketBoardInfo, queryListTeams }
)(BracketSchedule);