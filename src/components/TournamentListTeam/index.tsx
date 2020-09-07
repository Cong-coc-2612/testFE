import React from 'react';
import { connect } from 'react-redux';
import Teams from 'components/Teams';
import { IParams } from 'interfaces/common';
import './styles.css';

interface ITournamentListTeamProps extends React.ClassAttributes<TournamentListTeam> {
  id: number;
  tournamentInfo: IParams | null;
}

interface ITournamentListTeamState {
}

class TournamentListTeam extends React.Component<ITournamentListTeamProps, ITournamentListTeamState> {
  constructor(props: ITournamentListTeamProps) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="TournamentListTeam-container">
        <Teams tournamentStatus={''} id={this.props.id} type={'tournament'} tournamentInfo={this.props.tournamentInfo} competitionInfo={null} addItem={false} />
      </div>
    );
  }
}

export default connect(
  null,
  null
)(TournamentListTeam);