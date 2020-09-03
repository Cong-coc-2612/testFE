import React from 'react';
import { connect } from 'react-redux';
import { IParams } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import './styles.css';

interface IMatchDetailProps extends React.ClassAttributes<MatchDetail> {
  info: IParams;
}

interface IMatchDetailState {
}


class MatchDetail extends React.Component<IMatchDetailProps, IMatchDetailState> {
  constructor(props: IMatchDetailProps) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div
        className="MatchDetail-container"
      >
        <div
          className="MatchDetail-info-container"
        >
          <p className={'MatchDetail-info-header-text'}>Trận {this.props.info.name}</p>
        </div >
        <div
          className="MatchDetail-teams-container"
        >
          <div
            className="MatchDetail-team1-container"
          >
            <div className={'MatchDetail-team1-name-container'}>
              <p>{`${((this.props.info.team1 as IParams).team as IParams).fullName} (${((this.props.info.team1 as IParams).team as IParams).shortName})`}</p>
            </div>
            <div className={'MatchDetail-team1-score-container'}>
              <p>0</p>
            </div>
          </div >
          <div
            className="MatchDetail-teams-middle-container"
          >
            <p className={'MatchDetail-teams-middle-text'}>VS</p>
          </div >
          <div
            className="MatchDetail-team2-container"
          >
            <div className={'MatchDetail-team2-name-container'}>
              <p>{`${((this.props.info.team2 as IParams).team as IParams).fullName} (${((this.props.info.team2 as IParams).team as IParams).shortName})`}</p>
            </div>
            <div className={'MatchDetail-team2-score-container'}>
              <p>0</p>
            </div>
          </div >
        </div >
        <div
          className="MatchDetail-info-container"
        >
          <p>Địa điểm: {this.props.info.location}</p>
          <p>Thời gian: {this.props.info.time}</p>
        </div >
      </div >
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  null
)(MatchDetail);