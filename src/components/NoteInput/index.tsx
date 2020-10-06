import { IParams } from 'interfaces/common';
import React from 'react';
import { connect } from 'react-redux';
import { IState } from 'redux-saga/reducers';
import './styles.css';

interface INoteInputProps extends React.ClassAttributes<NoteInput> {
  info: IParams;
  index: number;

  handleSaveChangeNote(tournamentId: number, tableId: number, teamId: number, note: string): void;
}

interface INoteInputState {
  editMode: boolean;
  note: string;
}

class NoteInput extends React.Component<INoteInputProps, INoteInputState> {
  constructor(props: INoteInputProps) {
    super(props);
    this.state = {
      editMode: false,
      note: props.info.note as string,
    };
  }

  private onChangeNote = (value: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      note: value.target.value,
    });
  }

  render() {
    if (this.state.editMode === false) {
      return (<p className={`BracketRank-item-orderNumber-${this.props.index + 1}`}>{this.props.info.note}</p>);
    } else {
      return (<input value={this.state.note} onChange={this.onChangeNote} />);
    }
  }
}

const mapStateToProps = (state: IState) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  null
)(NoteInput);