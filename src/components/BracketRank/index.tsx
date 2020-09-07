import React from 'react';
import { connect } from 'react-redux';
import { IBigRequest, IParams } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import { queryBracketRankInfo } from './actions';
import './styles.css';

interface IBracketRankProps extends React.ClassAttributes<BracketRank> {
  competitionId: number;
  finalStage: boolean;
  bracketRankInfo: IParams | null;

  queryBracketRankInfo(params: IBigRequest): void;
}

interface IBracketRankState {
}

class BracketRank extends React.Component<IBracketRankProps, IBracketRankState> {
  constructor(props: IBracketRankProps) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.requestData();
  }

  private requestData = () => {
    const params: IBigRequest = {
      path: '',
      param: {
        competitionId: this.props.competitionId,
      },
      data: {},
    };
    this.props.queryBracketRankInfo(params);
  }

  render() {
    console.log('bracketRankInfo', this.props.bracketRankInfo);
    if (this.props.bracketRankInfo != null) {
      return (
        <div className="BracketRank-container">
          <div className="BracketRank-item-container BracketRank-menuItem-container">
            <div className="BracketRank-item-orderNumber-container">
              <p>Hạng</p>
            </div>
            <div className="BracketRank-item-managerName-container">
              <p>Tên đội</p>
            </div>
            <div className="BracketRank-item-teamName-container">
              <p>Tên ngắn đội</p>
            </div>
            <div className="BracketRank-item-matchHistory-container">
              <p>Điểm</p>
            </div>
            <div className="BracketRank-item-score-container">
              <p>Hiệu số</p>
            </div>
            <div className="BracketRank-item-score-container">
              <p>Thắng</p>
            </div>
            <div className="BracketRank-item-score-container">
              <p>Thua</p>
            </div>
          </div>
          {this.props.bracketRankInfo.finalStageScheduleRanking != null && (this.props.bracketRankInfo.finalStageScheduleRanking as IParams[]).length > 0 &&
            (this.props.bracketRankInfo.finalStageScheduleRanking as IParams[]).map((item, index) =>
              <div className="BracketRank-item-container" key={index}>
                <div className="BracketRank-item-orderNumber-container">
                  <p>{index + 1}</p>
                </div>
                <div className="BracketRank-item-teamName-container">
                  <p>{item.team != null ? (item.team as IParams).fullName : ''}</p>
                </div>
                <div className="BracketRank-item-managerName-container">
                  <p>{item.team != null ? (item.team as IParams).shortName : ''}</p>
                </div>
                <div className="BracketRank-item-matchHistory-container">
                  <p>{item.score}</p>
                </div>
                <div className="BracketRank-item-score-container">
                  <p>{item.difference}</p>
                </div>
                <div className="BracketRank-item-score-container">
                  <p>{item.totalWin}</p>
                </div>
                <div className="BracketRank-item-score-container">
                  <p>{item.totalLose}</p>
                </div>
              </div>
            )
          }
        </div>
      );
    } else {
      return (
        <div className="BracketRank-container">
          <p>Chưa có thông tin!</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state: IState) => {
  return {
    bracketRankInfo: state.bracketRankInfo,
  };
};

export default connect(
  mapStateToProps,
  { queryBracketRankInfo }
)(BracketRank);