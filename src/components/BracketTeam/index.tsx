import React from 'react';
import { connect } from 'react-redux';
import { IState } from 'redux-saga/reducers';
import { IParams } from 'interfaces/common';
import { setHoveringTeam, onEditBracketMode, addListTeamSelecting } from './actions';
import './styles.css';

interface IBracketTeamProps extends React.ClassAttributes<BracketTeam> {
  info: IParams | null;
  borderBottom?: boolean;
  hoveringTeam: number | null;
  description: IParams | null;
  listTeam: IParams[] | null;
  editBracketMode: boolean;
  listTeamSelecting: number[];
  competitionId: number;

  setHoveringTeam(params: number | null): void;
  onEditBracketMode(status: boolean): void;
  addListTeamSelecting(params: IParams): void;
}

interface IBracketTeamState {
}

class BracketTeam extends React.Component<IBracketTeamProps, IBracketTeamState> {
  constructor(props: IBracketTeamProps) {
    super(props);
    this.state = {
    };
  }

  private setHoveringTeam = (data: number | null) => {
    if (this.props.setHoveringTeam != null) {
      this.props.setHoveringTeam(data);
    }
  }

  render() {
    return (
      <div
        className={`BracketTeam-container ${this.props.borderBottom === true && 'BracketTeam-border-bottom'}`}
        onMouseOver={() => { this.setHoveringTeam(this.props.info != null && this.props.info.id != null ? this.props.info.id as number : null); }}
        onMouseOut={() => { this.setHoveringTeam(null); }}
      >
        <div
          className={
            `BracketTeam-name-container
            ${this.props.info != null && this.props.info.id != null && this.props.hoveringTeam != null && this.props.info.id === this.props.hoveringTeam ? 'BracketTeam-beingHovered' : 'BracketTeam-notBeingHovered'}
            ${this.props.description != null && this.props.description.descType === 0 ? (this.props.editBracketMode === true ? 'BracketTeam-name-container2' : 'BracketTeam-name-container1') : ''}
            ${this.props.editBracketMode === true && this.props.description != null && this.props.description.descType === 0 ? 'BracketTeam-name-container-editBracketMode' : ''}`
          }
        // thêm đk check giải đấu còn ở trạn thái unStarted hay ko
        >
          <div
            className={'BracketTeam-name-container-container'}
            onClick={() => {
              // thêm đk check giải đấu còn ở trạn thái unStarted hay ko
              if (this.props.description != null && this.props.description.descType === 0 && this.props.info == null) {
                this.props.addListTeamSelecting({
                  listTeamId: [...this.props.listTeamSelecting, this.props.listTeam![(this.props.description.unitIndex as number) - 1].id as number],
                  competitionId: this.props.competitionId,
                });
                this.props.onEditBracketMode(!this.props.editBracketMode);
              }
            }}
          >
            {this.props.info != null &&
              this.props.info.name != null ?
              <p className={"BracketTeam-name-text"}>{this.props.info.name}</p> :
              (this.props.description != null &&
                ((this.props.description.descType === 1 || this.props.description.descType === 4) ?
                  <p className={"BracketTeam-name-text BracketTeam-name-text2"}>{this.props.description.description}</p> :
                  (this.props.description.descType === 0 && <p className={"BracketTeam-name-text"}>{this.props.listTeam![(this.props.description.unitIndex as number) - 1] &&
                    this.props.listTeam![(this.props.description.unitIndex as number) - 1].shortName ?
                    this.props.listTeam![(this.props.description.unitIndex as number) - 1].shortName : ''}</p>)))}
          </div>
        </div>
        <div className={`BracketTeam-score-container BracketTeam-score-top2-container`}
        // BracketTeam-score-top${this.props.info.top ? this.props.info.top : '2'}-container`}
        >
          {/* {this.props.info.score && <p className={`BracketTeam-score-top${this.props.info.top ? this.props.info.top : '2'}-text`}>{this.props.info.score}</p>} */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    listTeam: state.listTeam,
    hoveringTeam: state.hoveringTeam,
    editBracketMode: state.editBracketMode,
    listTeamSelecting: state.listTeamSelecting,
  };
};

export default connect(
  mapStateToProps,
  {
    setHoveringTeam,
    onEditBracketMode,
    addListTeamSelecting,
  }
)(BracketTeam);