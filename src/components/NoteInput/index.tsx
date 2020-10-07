import config from 'config';
import { TOURNAMENT_STATUS } from 'global';
import { IParams } from 'interfaces/common';
import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import { connect } from 'react-redux';
import { IState } from 'redux-saga/reducers';
import './styles.css';

interface INoteInputProps extends React.ClassAttributes<NoteInput> {
  info: IParams;
  index: number;
  tournamentId: number;
  tableId: number;
  teamId: number;
  swappedTeamInBracketRank?: boolean;
  canEdit: boolean;
  tournamentStatus: string;

  handleSaveChangeNote(tournamentId: number, tableId: number, teamId: number, note: string): void;
}

interface INoteInputState {
  editMode: boolean;
  note: string;
  noteError: boolean;
  noteErrorContent: string;
}

class NoteInput extends React.Component<INoteInputProps, INoteInputState> {
  constructor(props: INoteInputProps) {
    super(props);
    this.state = {
      editMode: false,
      note: props.info.note as string,
      noteError: false,
      noteErrorContent: '',
    };
  }

  shouldComponentUpdate(nextProps: INoteInputProps, nextState: INoteInputState) {
    if (this.props.swappedTeamInBracketRank !== nextProps.swappedTeamInBracketRank) {
      this.setState({
        editMode: false,
        note: nextProps.info.note as string,
      });
    }
    return true;
  }

  private onChangeNote = (value: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      note: value.target.value,
    });
  }

  private onStartEditMode = () => {
    this.setState({
      note: this.props.info.note as string,
      editMode: true,
    });
  }

  private validate = () => {
    let noteError = false;
    let noteErrorContent = '';
    if (!config.regex.note.test(this.state.note)) {
      noteError = true;
      noteErrorContent = 'Ghi chú tối đa 60 ký tự và không được chứa kí tự đặc biệt';
    }

    return { noteError, noteErrorContent };
  }

  private onEndEditMode = () => {
    const { noteError, noteErrorContent } = this.validate();
    this.setState({
      noteError,
      noteErrorContent
    });
    if (noteError === true) {
      return;
    }
    this.props.handleSaveChangeNote(this.props.tournamentId, this.props.tableId, this.props.teamId, this.state.note);
    this.setState({
      editMode: false,
    });
  }

  render() {
    if (this.state.editMode === false) {
      return (
        <div className={'NoteInput-one-row-container'}>
          <p className={`BracketRank-item-orderNumber-${this.props.index + 1} NoteInput-text`}>{this.props.info.note}</p>
          {this.props.tournamentStatus !== TOURNAMENT_STATUS.FINISHED && this.props.canEdit === true && <div className={'NoteInput-icon-container'}>
            <AiFillEdit size={30} onClick={this.onStartEditMode} />
          </div>}
        </div>
      );
    } else {
      return (
        <div className={'NoteInput-one-row-container2'}>
          <div className={'NoteInput-one-row-container3'}>
            <input value={this.state.note} onChange={this.onChangeNote} />
            {this.props.tournamentStatus !== TOURNAMENT_STATUS.FINISHED && this.props.canEdit === true && <div className={'NoteInput-icon-container'}>
              <TiTick size={30} onClick={this.onEndEditMode} />
            </div>}
          </div>
          {this.state.noteError === true && <div className={'NoteInput-one-row-container4'}>
            <p className={`BracketRank-item-orderNumber-${this.props.index + 1} NoteInput-text2`}>{this.state.noteErrorContent}</p>
          </div>}
        </div>
      );
    }
  }
}

const mapStateToProps = (state: IState) => {
  return {
    swappedTeamInBracketRank: state.swappedTeamInBracketRank,
  };
};

export default connect(
  mapStateToProps,
  null
)(NoteInput);