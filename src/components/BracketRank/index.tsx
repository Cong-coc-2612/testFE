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
    return (
      <div className="BracketRank-container">
        <div className="BracketRank-item-container BracketRank-menuItem-container">
          <div className="BracketRank-item-orderNumber-container">
            <p>Hạng</p>
          </div>
          <div className="BracketRank-item-teamName-container">
            <p>Tên đội</p>
          </div>
          <div className="BracketRank-item-managerName-container">
            <p>Tên Người quản lý đội</p>
          </div>
          <div className="BracketRank-item-matchHistory-container">
            <p>Lịch sử đấu</p>
          </div>
          <div className="BracketRank-item-score-container">
            <p>Điểm</p>
          </div>
        </div>
        <div className="BracketRank-item-container">
          <div className="BracketRank-item-orderNumber-container">
            <p>2</p>
          </div>
          <div className="BracketRank-item-teamName-container">
            <p>Đội B</p>
          </div>
          <div className="BracketRank-item-managerName-container">
            <p>Phan Trọng Nhân</p>
          </div>
          <div className="BracketRank-item-matchHistory-container">
            <p>LLLL</p>
          </div>
          <div className="BracketRank-item-score-container">
            <p>0</p>
          </div>
        </div>
        <div className="BracketRank-item-container">
          <div className="BracketRank-item-orderNumber-container">
            <p>3</p>
          </div>
          <div className="BracketRank-item-teamName-container">
            <p>Đội C</p>
          </div>
          <div className="BracketRank-item-managerName-container">
            <p>Đỗ Văn Công</p>
          </div>
          <div className="BracketRank-item-matchHistory-container">
            <p>LWLW</p>
          </div>
          <div className="BracketRank-item-score-container">
            <p>4</p>
          </div>
        </div>
        <div className="BracketRank-item-container">
          <div className="BracketRank-item-orderNumber-container">
            <p>4</p>
          </div>
          <div className="BracketRank-item-teamName-container">
            <p>Hoang</p>
          </div>
          <div className="BracketRank-item-managerName-container">
            <p>Nguyen Van Hoang</p>
          </div>
          <div className="BracketRank-item-matchHistory-container">
            <p>WWWW</p>
          </div>
          <div className="BracketRank-item-score-container">
            <p>8</p>
          </div>
        </div>
        <div className="BracketRank-item-container">
          <div className="BracketRank-item-orderNumber-container">
            <p>1</p>
          </div>
          <div className="BracketRank-item-teamName-container">
            <p>Đội A</p>
          </div>
          <div className="BracketRank-item-managerName-container">
            <p>Phạm Minh Hiếu</p>
          </div>
          <div className="BracketRank-item-matchHistory-container">
            <p>WLWL</p>
          </div>
          <div className="BracketRank-item-score-container">
            <p>4</p>
          </div>
        </div>
      </div>
    );
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