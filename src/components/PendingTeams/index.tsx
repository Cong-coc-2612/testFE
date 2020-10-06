import React from 'react';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import PendingTeamsItem from 'components/PendingTeamsItem';
import { IBigRequest, IParams } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import { queryListPendingTeams } from './actions';
import './styles.css';

interface IPendingTeamsProps extends React.ClassAttributes<PendingTeams> {
  id: number;
  listPendingTeam: IParams[] | null;
  tournamentInfo: IParams | null;
  currentUserInfo: IParams | null;
  addItem?: boolean;

  queryListPendingTeams(param: IBigRequest): void;
}

interface IPendingTeamsState {
}

class PendingTeams extends React.Component<IPendingTeamsProps, IPendingTeamsState> {
  constructor(props: IPendingTeamsProps) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.requestData();
  }

  private requestData = () => {
    const params = {
      path: '',
      param: {
        tournamentId: this.props.id,
        limit: 999,
      },
      data: {},
    };
    this.props.queryListPendingTeams(params);
  }

  render() {
    return (
      <div className="PendingTeams-container">
        {this.props.listPendingTeam != null ? (this.props.listPendingTeam.length > 0 ?
          this.props.listPendingTeam.map(
            (item, index) =>
            <PendingTeamsItem tournamentInfo={this.props.tournamentInfo} info={item} index={index} key={index} />
          ) : <p>Không tìm thấy đội nào!</p>) :
          <Skeleton />
        }
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    listPendingTeam: state.listPendingTeam,
    currentUserInfo: state.currentUserInfo,
  };
};

export default connect(
  mapStateToProps,
  { queryListPendingTeams }
)(PendingTeams);