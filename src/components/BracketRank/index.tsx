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
    if (this.props.bracketRankInfo != null) {
      if (this.props.finalStage === true) {
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
                <div className={`BracketRank-item-container ${index % 2 === 0 ? 'BracketRank-item-container1' : 'BracketRank-item-container2'}`} key={index}>
                  <div className="BracketRank-item-orderNumber-container">
                    <p className={`BracketRank-item-orderNumber-${index + 1}`}>{index + 1}</p>
                  </div>
                  <div className="BracketRank-item-managerName-container">
                    <p className={`BracketRank-item-orderNumber-${index + 1}`}>{item.team != null ? (item.team as IParams).fullName : ''}</p>
                  </div>
                  <div className="BracketRank-item-teamName-container">
                    <p className={`BracketRank-item-orderNumber-${index + 1}`}>{item.team != null ? (item.team as IParams).shortName : ''}</p>
                  </div>
                  <div className="BracketRank-item-matchHistory-container">
                    <p className={`BracketRank-item-orderNumber-${index + 1}`}>{item.score}</p>
                  </div>
                  <div className="BracketRank-item-score-container">
                    <p className={`BracketRank-item-orderNumber-${index + 1}`}>{item.difference}</p>
                  </div>
                  <div className="BracketRank-item-score-container">
                    <p className={`BracketRank-item-orderNumber-${index + 1}`}>{item.totalWin}</p>
                  </div>
                  <div className="BracketRank-item-score-container">
                    <p className={`BracketRank-item-orderNumber-${index + 1}`}>{item.totalLose}</p>
                  </div>
                </div>
              )
            }
          </div>
        );
      } else {

        return (
          (this.props.bracketRankInfo.groupStageScheduleRanking as IParams[]).map((item, index) =>
            <div key={index} className="BracketRank-container">
              <h2>Bảng {item.tableName}</h2>
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
              {(item.rankingTable as IParams[]).map((item2, index2) =>
                <div className={`BracketRank-item-container ${index2 % 2 === 0 ? 'BracketRank-item-container1' : 'BracketRank-item-container2'}`} key={index2}>
                  <div className="BracketRank-item-orderNumber-container">
                    <p className={`BracketRank-item-orderNumber-${index2 + 1}`}>{index2 + 1}</p>
                  </div>
                  <div className="BracketRank-item-managerName-container">
                    <p className={`BracketRank-item-orderNumber-${index2 + 1}`}>{item2.team != null ? (item2.team as IParams).fullName : ''}</p>
                  </div>
                  <div className="BracketRank-item-teamName-container">
                    <p className={`BracketRank-item-orderNumber-${index2 + 1}`}>{item2.team != null ? (item2.team as IParams).shortName : ''}</p>
                  </div>
                  <div className="BracketRank-item-matchHistory-container">
                    <p className={`BracketRank-item-orderNumber-${index2 + 1}`}>{item2.score}</p>
                  </div>
                  <div className="BracketRank-item-score-container">
                    <p className={`BracketRank-item-orderNumber-${index2 + 1}`}>{item2.difference}</p>
                  </div>
                  <div className="BracketRank-item-score-container">
                    <p className={`BracketRank-item-orderNumber-${index2 + 1}`}>{item2.totalWin}</p>
                  </div>
                  <div className="BracketRank-item-score-container">
                    <p className={`BracketRank-item-orderNumber-${index2 + 1}`}>{item2.totalLose}</p>
                  </div>
                </div>
              )}
            </div>
          )
        );

      }
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