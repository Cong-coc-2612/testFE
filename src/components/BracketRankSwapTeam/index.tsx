import React from 'react';
import { connect } from 'react-redux';
import Select, { ValueType, OptionTypeBase } from 'react-select';
import { IBigRequest, IParams } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import { swapTeamInBracketRank } from './actions';
import './styles.css';

interface IBracketRankSwapTeamProps extends React.ClassAttributes<BracketRankSwapTeam> {
  tableName: string;
  listTeam: IParams[];
  tournamentId: number;
  tableId: number;

  swapTeamInBracketRank(params: IBigRequest): void;
}

interface IBracketRankSwapTeamState {
  selectedTeam1: ValueType<OptionTypeBase>;
  selectedTeam2: ValueType<OptionTypeBase>;
}

class BracketRankSwapTeam extends React.Component<IBracketRankSwapTeamProps, IBracketRankSwapTeamState> {
  private team1Option: IParams[] = [];
  private team2Option: IParams[] = [];

  constructor(props: IBracketRankSwapTeamProps) {
    super(props);
    this.team1Option = [];
    this.team2Option = [];
    for (let i = 0; i < this.props.listTeam.length; i++) {
      this.team1Option.push({ value: (this.props.listTeam[i].team as IParams).id, label: (this.props.listTeam[i].team as IParams).shortName });
    }
    this.state = {
      selectedTeam1: null,
      selectedTeam2: null,
    };
  }

  shouldComponentUpdate(nextProps: IBracketRankSwapTeamProps, nextState: IBracketRankSwapTeamState) {
    if (this.props.listTeam !== nextProps.listTeam) {
      this.team1Option = [];
      this.team2Option = [];
      for (let i = 0; i < nextProps.listTeam.length; i++) {
        this.team1Option.push({ value: (nextProps.listTeam[i].team as IParams).id, label: (nextProps.listTeam[i].team as IParams).shortName });
      }
    }
    if (this.state.selectedTeam1 !== nextState.selectedTeam1) {
      this.team2Option = this.team1Option.filter(element => element.value !== (nextState.selectedTeam1 as IParams).value);
      this.setState({
        selectedTeam2: null,
      })
    }
    return true;
  }

  private onChangeTeam1 = (value: ValueType<OptionTypeBase>) => {
    this.setState({
      selectedTeam1: value,
    });
  }

  private onChangeTeam2 = (value: ValueType<OptionTypeBase>) => {
    this.setState({
      selectedTeam2: value,
    });
  }

  private onChangePosition = () => {
    const params = {
      path: '',
      param: {
        tournamentId: this.props.tournamentId,
        tableId: this.props.tableId,
        team1Id: (this.state.selectedTeam1 as IParams).value,
        team2Id: (this.state.selectedTeam2 as IParams).value,
      },
      data: {},
    };
    this.props.swapTeamInBracketRank(params);
  }

  render() {
    return (
      <div className={'BracketRankSwapTeam-container'}>
        {this.props.tableName.trim() === '' ? <p>Đổi chỗ 2 đội bảng xếp hạng: </p> : <p>Đổi chỗ 2 đội bảng xếp hạng bảng {this.props.tableName}: </p>}
        <Select
          options={this.team1Option}
          className="Select"
          defaultValue={this.state.selectedTeam1}
          value={this.state.selectedTeam1}
          onChange={this.onChangeTeam1}
          maxMenuHeight={140}
        />
        <Select
          options={this.team2Option}
          className="Select"
          defaultValue={this.state.selectedTeam2}
          value={this.state.selectedTeam2}
          onChange={this.onChangeTeam2}
          maxMenuHeight={140}
          isDisabled={this.state.selectedTeam1 == null}
        />
        <div onClick={this.onChangePosition} className="SignUp-Button-container SignUp-Button-containerr"><p className="Button">Đổi chỗ</p></div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  { swapTeamInBracketRank }
)(BracketRankSwapTeam);