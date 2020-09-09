import React from 'react';
import { connect } from 'react-redux';
import SheetData, { ISheetDataConfig } from 'components/SheetData';
import { IState } from 'redux-saga/reducers';
import { IParams, IBigRequest } from 'interfaces/common';
import { getMatchResult } from 'components/BracketMatch/actions';
import { updateResult, updateMatchInfo } from './actions';
import './styles.css';

interface IMatchSettingProps extends React.ClassAttributes<MatchSetting> {
  teamsInfo: IParams[];
  info: IParams;
  matchInfo: IParams | null;
  matchResult: IParams[];
  canEdit?: boolean;

  getMatchResult(params: IBigRequest): void;
  updateResult(params: IBigRequest): void;
  onChangeEditMode(editMode: boolean): void;
  updateMatchInfo(params: IBigRequest): void;
}

interface IMatchSettingState {
  configSheetData: ISheetDataConfig;
  winner: boolean | null;
  editMode: boolean;
}

class MatchSetting extends React.Component<IMatchSettingProps, IMatchSettingState> {
  private listResult: IParams[] = [];
  private tempFinalScoreTeam1 = 0;
  private tempFinalScoreTeam2 = 0;

  constructor(props: IMatchSettingProps) {
    super(props);
    this.state = {
      winner: null,
      editMode: false,
      configSheetData: {
        fixedColumnCount: 2,
        fixedRowCount: 1,
        rowHeight: 80,
        fetchCount: 2,
        header: [
          {
            label: 'Thứ tự',
            width: 60,
            style: { justifyContent: 'center' },
            element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
              <div style={style}>{rowIndex}</div>
            ),
          },
          {
            label: 'Tên đội',
            width: 130,
            style: { justifyContent: 'center' },
            element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
              <div style={style}>{rowData.team ? (rowData.team as IParams).shortName : ''}</div>
            ),
          },
        ],
      },
    };
  }

  shouldComponentUpdate(nextProps: IMatchSettingProps, nextState: IMatchSettingState) {
    if (this.props.matchResult !== nextProps.matchResult) {
      this.tempFinalScoreTeam1 = 0;
      this.tempFinalScoreTeam2 = 0;
      this.listResult = [];
      const tempList = [];
      for (let i = 0; i < nextProps.matchResult.length; i++) {
        if ((nextProps.matchResult[i].team1Score as number) > (nextProps.matchResult[i].team2Score as number)) {
          this.tempFinalScoreTeam1++;
        } else if ((nextProps.matchResult[i].team1Score as number) < (nextProps.matchResult[i].team2Score as number)) {
          this.tempFinalScoreTeam2++;
        }
        this.listResult.push({
          matchId: nextProps.matchResult[i].matchId,
          setNo: nextProps.matchResult[i].setNo,
          team1Score: nextProps.matchResult[i].team1Score,
          team2Score: nextProps.matchResult[i].team2Score,
        });
        tempList.push({
          label: `Set ${nextProps.matchResult[i].setNo}`,
          width: 100,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowIndex === 1 ? (this.state.editMode === false ? nextProps.matchResult[i].team1Score : <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeScoreTeam1(event, nextProps.matchResult[i].setNo as number)} type={'number'} defaultValue={nextProps.matchResult[i].team1Score as number} style={{ width: '35px' }} />) : (this.state.editMode === false ? nextProps.matchResult[i].team2Score : <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeScoreTeam2(event, nextProps.matchResult[i].setNo as number)} type={'number'} defaultValue={nextProps.matchResult[i].team2Score as number} style={{ width: '35px' }} />)}</div>
          ),
        });
      }
      tempList.unshift(
        {
          label: 'Kết quả chung cuộc',
          width: 140,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowIndex === 1 ? this.tempFinalScoreTeam1 : this.tempFinalScoreTeam2}</div>
          ),
        },
      );
      const tempList2 = [
        {
          label: 'Thứ tự',
          width: 60,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowIndex}</div>
          ),
        },
        {
          label: 'Tên đội',
          width: 130,
          style: { justifyContent: 'center' },
          element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
            <div style={style}>{rowData.team ? (rowData.team as IParams).shortName : ''}</div>
          ),
        },
      ].concat(tempList);
      this.setState({
        configSheetData: {
          ...this.state.configSheetData,
          header: tempList2,
        },
      });
    }
    return true;
  }

  private onAddASet = () => {
    const tempValue = this.state.configSheetData.header.length;
    this.setState({
      configSheetData: {
        ...this.state.configSheetData,
        header: [
          ...this.state.configSheetData.header,
          {
            label: `Set ${tempValue - 2}`,
            width: 100,
            style: { justifyContent: 'center' },
            element: (rowData: IParams, rowIndex: number, style?: React.CSSProperties) => (
              <div style={style}>{this.state.editMode === true ? (rowIndex === 1 ? <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeScoreTeam1(event, tempValue - 2)} style={{ width: '35px' }} type={'number'} defaultValue={0} /> : <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeScoreTeam2(event, tempValue - 2)} style={{ width: '35px' }} type={'number'} defaultValue={0} />) : 0}</div>
            ),
          }]
      }
    });
    this.listResult.push({
      matchId: this.props.info.id,
      setNo: tempValue - 2,
      team1Score: 0,
      team2Score: 0,
    });
  }


  componentDidMount() {
    this.requestData();
  }

  private onChangeScoreTeam1 = (event: React.ChangeEvent<HTMLInputElement>, setNo: number) => {
    this.listResult[setNo - 1] = { ...this.listResult[setNo - 1], team1Score: event.target.value == null ? 0 : Number(event.target.value), };
    this.tempFinalScoreTeam1 = 0;
    this.tempFinalScoreTeam2 = 0;
    for (let i = 0; i < this.listResult.length; i++) {
      if ((this.listResult[i].team1Score as number) > (this.listResult[i].team2Score as number)) {
        this.tempFinalScoreTeam1++;
      } else if ((this.listResult[i].team1Score as number) < (this.listResult[i].team2Score as number)) {
        this.tempFinalScoreTeam2++;
      }
    }
    if (this.tempFinalScoreTeam1 === this.tempFinalScoreTeam2) {
      this.setState({
        winner: null,
      });
    } else if (this.tempFinalScoreTeam1 < this.tempFinalScoreTeam2) {
      this.setState({
        winner: false,
      });
    } else {
      this.setState({
        winner: true,
      });
    }
  }

  private onChangeScoreTeam2 = (event: React.ChangeEvent<HTMLInputElement>, setNo: number) => {
    this.listResult[setNo - 1] = { ...this.listResult[setNo - 1], team2Score: event.target.value == null ? 0 : Number(event.target.value), };
    this.tempFinalScoreTeam1 = 0;
    this.tempFinalScoreTeam2 = 0;
    for (let i = 0; i < this.listResult.length; i++) {
      if ((this.listResult[i].team1Score as number) > (this.listResult[i].team2Score as number)) {
        this.tempFinalScoreTeam1++;
      } else if ((this.listResult[i].team1Score as number) < (this.listResult[i].team2Score as number)) {
        this.tempFinalScoreTeam2++;
      }
    }
    if (this.tempFinalScoreTeam1 === this.tempFinalScoreTeam2) {
      this.setState({
        winner: null,
      });
    } else if (this.tempFinalScoreTeam1 < this.tempFinalScoreTeam2) {
      this.setState({
        winner: false,
      });
    } else {
      this.setState({
        winner: true,
      });
    }
  }

  private onEditMode = () => {
    this.setState({
      editMode: true,
      winner: this.props.matchInfo!.winnerId == null ? null : (this.props.matchInfo!.winnerId === this.props.matchInfo!.team1Id ? true : false),
    }, () => {
      this.props.onChangeEditMode(true);
    });
  }

  private offEditMode = () => {
    let params: IBigRequest = {
      path: '',
      param: {
        matchId: this.props.info.id,
      },
      data: {
        results: { data: [...this.listResult] },
      },
    };
    this.props.updateResult(params);
    params = {
      path: '',
      param: {
        id: this.props.info.id,
      },
      data: {
        competitionId: this.props.matchInfo!.competitionId,
        location: this.props.matchInfo!.location,
        name: this.props.matchInfo!.name,
        status: this.props.matchInfo!.status,
        team1Id: this.props.matchInfo!.team1Id,
        team2Id: this.props.matchInfo!.team2Id,
        time: this.props.matchInfo!.time,
        url: this.props.matchInfo!.url,
        winnerId: this.state.winner == null ? null : (this.state.winner === true ? this.props.matchInfo!.team1Id : this.props.matchInfo!.team2Id),
        loserId: this.state.winner == null ? null : (this.state.winner === false ? this.props.matchInfo!.team1Id : this.props.matchInfo!.team2Id),
        team1Bonus: 0,
        team2Bonus: 0,
      },
    };
    this.props.updateMatchInfo(params);
    this.setState({
      editMode: false,
    }, () => {
      this.props.onChangeEditMode(false);
    });
  }

  private requestData = () => {
    const params = {
      path: '',
      param: {
        matchId: this.props.info.id,
      },
      data: {},
    };
    this.props.getMatchResult(params);
  }

  private onRemoveASet = () => {
    this.setState({
      configSheetData: {
        ...this.state.configSheetData,
        header: [
          ...this.state.configSheetData.header.slice(0, this.state.configSheetData.header.length - 1),
        ],
      }
    });
    this.listResult.pop();
  }

  private team1Win = () => {
    if (this.state.winner === true) {
      this.setState({
        winner: null,
      });
    } else {
      this.setState({
        winner: true,
      });
    }
  }

  private team2Win = () => {
    if (this.state.winner === false) {
      this.setState({
        winner: null,
      });
    } else {
      this.setState({
        winner: false,
      });
    }
  }

  render() {
    return (
      <div
        className="MatchSetting-container"
      >
        <div className="MatchSetting-set-container">
          {this.props.canEdit !== false && (this.state.editMode === false ? <p className="MatchSetting-set-text" onClick={this.onEditMode}>Sửa</p> : <p className="MatchSetting-set-text" onClick={this.offEditMode}>Lưu</p>)}
          {this.state.editMode === true && <p className="MatchSetting-set-text" onClick={this.onAddASet}>Thêm 1 set</p>}
          {this.state.editMode === true && this.state.configSheetData.header.length > 3 && <p className="MatchSetting-set-text" onClick={this.onRemoveASet}>Bớt 1 set</p>}
        </div>
        <div className="MatchSetting-sheetData-container">
          <SheetData config={this.state.configSheetData} data={this.props.teamsInfo as IParams[]} />
        </div>
        <div className="MatchSetting-verify-winner-container">
          {this.state.editMode === true ?
            <p className="MatchSetting-verify-winner-header">Xác định đội thắng cuộc: </p> :
            (this.props.matchInfo!.winnerId != null && <p className="MatchSetting-verify-winner-header">Đội thắng cuộc: {this.props.matchInfo!.winnerId === this.props.matchInfo!.team1Id ? ((this.props.info.team1 as IParams).team as IParams).shortName : ((this.props.info.team2 as IParams).team as IParams).shortName}</p>)
          }
          {this.state.editMode === true && <div className="MatchSetting-verify-winner-text-container-container">
            <div className={`MatchSetting-verify-winner-text-container ${this.state.winner === true ? 'MatchSetting-verify-winner-isWinner' : ''}`} onClick={this.team1Win}>
              <p className="MatchSetting-verify-winner-text noselect">{this.props.teamsInfo != null && this.props.teamsInfo[0] != null && (this.props.teamsInfo[0].team as IParams) != null && (this.props.teamsInfo[0].team as IParams).shortName}</p>
            </div>
            <div className={`MatchSetting-verify-winner-text-container ${this.state.winner === false ? 'MatchSetting-verify-winner-isWinner' : ''}`} onClick={this.team2Win}>
              <p className="MatchSetting-verify-winner-text noselect">{this.props.teamsInfo != null && this.props.teamsInfo[1] != null && (this.props.teamsInfo[1].team as IParams) != null && (this.props.teamsInfo[1].team as IParams).shortName}</p>
            </div>
          </div>}
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    matchResult: state.matchResult,
  };
};

export default connect(
  mapStateToProps,
  { getMatchResult, updateResult, updateMatchInfo }
)(MatchSetting);