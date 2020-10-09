import React from 'react';
import { connect } from 'react-redux';
import BracketMatch from 'components/BracketMatch';
import { IParams } from 'interfaces/common';
import './styles.css';
import { PADDING_TOP } from 'global';
import { formatStringToDate } from 'utils/datetime';
import { isAfter, isBefore } from 'date-fns';

interface IBracketRoundProps extends React.ClassAttributes<BracketRound> {
  info: IParams;
  roundNo: number;
  totalRound: number;
  index: number;
  tournamentId: number;
  roundRobin?: boolean;
  has34?: boolean;
  allMatches: IParams | null;
  swapAble: boolean;
  finalStage: boolean;
  tableId?: number;
  previousRound: IParams | null;
  nextRound: IParams | null;
  tournamentStarted: boolean;
  canEdit: boolean;
}

interface IBracketRoundState {
  roundHover: boolean;
}

class BracketRound extends React.Component<IBracketRoundProps, IBracketRoundState> {
  private dateNextRound: Date | null = null;
  private datePreviousRound: Date | null = null;

  constructor(props: IBracketRoundProps) {
    super(props);
    if (props.nextRound) {
      if (props.nextRound.listMatches) {
        for (let i = 0; i < (props.nextRound.listMatches as IParams[]).length; i++) {
          if (props.roundRobin === true) {
            if ((props.nextRound.listMatches as IParams[])[i].time !== '') {
              if (this.dateNextRound == null) {
                this.dateNextRound = formatStringToDate((props.nextRound.listMatches as IParams[])[i].time as string, 'yyyy-MM-dd HH:mm:ss');
              } else {
                if (isBefore(formatStringToDate((props.nextRound.listMatches as IParams[])[i].time as string, 'yyyy-MM-dd HH:mm:ss'), this.dateNextRound)) {
                  this.dateNextRound = formatStringToDate((props.nextRound.listMatches as IParams[])[i].time as string, 'yyyy-MM-dd HH:mm:ss');
                }
              }
            }
          } else {
            if (props.nextRound.listMatches != null) {
              if (((props.nextRound.listMatches as IParams[])[i].data as IParams).time !== '' && (props.nextRound.listMatches as IParams[])[i].id !== -1) {
                if (this.dateNextRound == null) {
                  this.dateNextRound = formatStringToDate(((props.nextRound.listMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                } else {
                  if (isBefore(formatStringToDate(((props.nextRound.listMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss'), this.dateNextRound)) {
                    this.dateNextRound = formatStringToDate(((props.nextRound.listMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                  }
                }
              }
            }
          }
        }
      } else {
        if (props.nextRound.listWinMatches != null) {
          for (let i = 0; i < (props.nextRound.listWinMatches as IParams[]).length; i++) {
            if (((props.nextRound.listWinMatches as IParams[])[i].data as IParams).time !== '' && (props.nextRound.listWinMatches as IParams[])[i].id !== -1) {
              if (this.dateNextRound == null) {
                this.dateNextRound = formatStringToDate(((props.nextRound.listWinMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
              } else {
                if (isBefore(formatStringToDate(((props.nextRound.listWinMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss'), this.dateNextRound)) {
                  this.dateNextRound = formatStringToDate(((props.nextRound.listWinMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                }
              }
            }
          }
        } else {
          if (props.nextRound.listLoseMatches != null) {
            for (let i = 0; i < (props.nextRound.listLoseMatches as IParams[]).length; i++) {
              if (((props.nextRound.listLoseMatches as IParams[])[i].data as IParams).time !== '' && (props.nextRound.listLoseMatches as IParams[])[i].id !== -1) {
                if (this.dateNextRound == null) {
                  this.dateNextRound = formatStringToDate(((props.nextRound.listLoseMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                } else {
                  if (isBefore(formatStringToDate(((props.nextRound.listLoseMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss'), this.dateNextRound)) {
                    this.dateNextRound = formatStringToDate(((props.nextRound.listLoseMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                  }
                }
              }
            }
          }
        }
      }
    }
    if (props.previousRound) {
      if (props.previousRound.listMatches) {
        for (let i = 0; i < (props.previousRound.listMatches as IParams[]).length; i++) {
          if (props.roundRobin === true) {
            if ((props.previousRound.listMatches as IParams[])[i].time !== '') {
              if (this.datePreviousRound == null) {
                this.datePreviousRound = formatStringToDate((props.previousRound.listMatches as IParams[])[i].time as string, 'yyyy-MM-dd HH:mm:ss');
              } else {
                if (isAfter(formatStringToDate((props.previousRound.listMatches as IParams[])[i].time as string, 'yyyy-MM-dd HH:mm:ss'), this.datePreviousRound)) {
                  this.datePreviousRound = formatStringToDate((props.previousRound.listMatches as IParams[])[i].time as string, 'yyyy-MM-dd HH:mm:ss');
                }
              }
            }
          } else {
            if (props.previousRound.listMatches != null) {
              if (((props.previousRound.listMatches as IParams[])[i].data as IParams).time !== '' && (props.previousRound.listMatches as IParams[])[i].id !== -1) {
                if (this.datePreviousRound == null) {
                  this.datePreviousRound = formatStringToDate(((props.previousRound.listMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                } else {
                  if (isAfter(formatStringToDate(((props.previousRound.listMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss'), this.datePreviousRound)) {
                    this.datePreviousRound = formatStringToDate(((props.previousRound.listMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                  }
                }
              }
            }
          }
        }
      } else {
        if (props.previousRound.listWinMatches != null) {
          for (let i = 0; i < (props.previousRound.listWinMatches as IParams[]).length; i++) {
            if (((props.previousRound.listWinMatches as IParams[])[i].data as IParams).time !== '' && (props.previousRound.listWinMatches as IParams[])[i].id !== -1) {
              if (this.datePreviousRound == null) {
                this.datePreviousRound = formatStringToDate(((props.previousRound.listWinMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
              } else {
                if (isAfter(formatStringToDate(((props.previousRound.listWinMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss'), this.datePreviousRound)) {
                  this.datePreviousRound = formatStringToDate(((props.previousRound.listWinMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                }
              }
            }
          }
        } else {
          if (props.previousRound.listLoseMatches != null) {
            for (let i = 0; i < (props.previousRound.listLoseMatches as IParams[]).length; i++) {
              if (((props.previousRound.listLoseMatches as IParams[])[i].data as IParams).time !== '' && (props.previousRound.listLoseMatches as IParams[])[i].id !== -1) {
                if (this.datePreviousRound == null) {
                  this.datePreviousRound = formatStringToDate(((props.previousRound.listLoseMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                } else {
                  if (isAfter(formatStringToDate(((props.previousRound.listLoseMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss'), this.datePreviousRound)) {
                    this.datePreviousRound = formatStringToDate(((props.previousRound.listLoseMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                  }
                }
              }
            }
          }
        }
      }
    }
    this.state = {
      roundHover: false,
    };
  }

  shouldComponentUpdate(nextProps: IBracketRoundProps, nextState: IBracketRoundState) {
    if (this.props.nextRound !== nextProps.nextRound) {
      if (nextProps.nextRound) {
        if (nextProps.nextRound.listMatches) {
          for (let i = 0; i < (nextProps.nextRound.listMatches as IParams[]).length; i++) {
            if (nextProps.roundRobin === true) {
              if ((nextProps.nextRound.listMatches as IParams[])[i].time !== '') {
                if (this.dateNextRound == null) {
                  this.dateNextRound = formatStringToDate((nextProps.nextRound.listMatches as IParams[])[i].time as string, 'yyyy-MM-dd HH:mm:ss');
                } else {
                  if (isBefore(formatStringToDate((nextProps.nextRound.listMatches as IParams[])[i].time as string, 'yyyy-MM-dd HH:mm:ss'), this.dateNextRound)) {
                    this.dateNextRound = formatStringToDate((nextProps.nextRound.listMatches as IParams[])[i].time as string, 'yyyy-MM-dd HH:mm:ss');
                  }
                }
              }
            } else {
              if (nextProps.nextRound.listMatches != null) {
                if (((nextProps.nextRound.listMatches as IParams[])[i].data as IParams).time !== '' && (nextProps.nextRound.listMatches as IParams[])[i].id !== -1) {
                  if (this.dateNextRound == null) {
                    this.dateNextRound = formatStringToDate(((nextProps.nextRound.listMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                  } else {
                    if (isBefore(formatStringToDate(((nextProps.nextRound.listMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss'), this.dateNextRound)) {
                      this.dateNextRound = formatStringToDate(((nextProps.nextRound.listMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                    }
                  }
                }
              }
            }
          }
        } else {
          if (nextProps.nextRound.listWinMatches != null) {
            for (let i = 0; i < (nextProps.nextRound.listWinMatches as IParams[]).length; i++) {
              if (((nextProps.nextRound.listWinMatches as IParams[])[i].data as IParams).time !== '' && (nextProps.nextRound.listWinMatches as IParams[])[i].id !== -1) {
                if (this.dateNextRound == null) {
                  this.dateNextRound = formatStringToDate(((nextProps.nextRound.listWinMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                } else {
                  if (isBefore(formatStringToDate(((nextProps.nextRound.listWinMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss'), this.dateNextRound)) {
                    this.dateNextRound = formatStringToDate(((nextProps.nextRound.listWinMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                  }
                }
              }
            }
          } else {
            if (nextProps.nextRound.listLoseMatches != null) {
              for (let i = 0; i < (nextProps.nextRound.listLoseMatches as IParams[]).length; i++) {
                if (((nextProps.nextRound.listLoseMatches as IParams[])[i].data as IParams).time !== '' && (nextProps.nextRound.listLoseMatches as IParams[])[i].id !== -1) {
                  if (this.dateNextRound == null) {
                    this.dateNextRound = formatStringToDate(((nextProps.nextRound.listLoseMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                  } else {
                    if (isBefore(formatStringToDate(((nextProps.nextRound.listLoseMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss'), this.dateNextRound)) {
                      this.dateNextRound = formatStringToDate(((nextProps.nextRound.listLoseMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (this.props.previousRound !== nextProps.previousRound) {
      if (nextProps.previousRound) {
        if (nextProps.previousRound.listMatches) {
          for (let i = 0; i < (nextProps.previousRound.listMatches as IParams[]).length; i++) {
            if (nextProps.roundRobin === true) {
              if ((nextProps.previousRound.listMatches as IParams[])[i].time !== '') {
                if (this.datePreviousRound == null) {
                  this.datePreviousRound = formatStringToDate((nextProps.previousRound.listMatches as IParams[])[i].time as string, 'yyyy-MM-dd HH:mm:ss');
                } else {
                  if (isAfter(formatStringToDate((nextProps.previousRound.listMatches as IParams[])[i].time as string, 'yyyy-MM-dd HH:mm:ss'), this.datePreviousRound)) {
                    this.datePreviousRound = formatStringToDate((nextProps.previousRound.listMatches as IParams[])[i].time as string, 'yyyy-MM-dd HH:mm:ss');
                  }
                }
              }
            } else {
              if (nextProps.previousRound.listMatches != null) {
                if (((nextProps.previousRound.listMatches as IParams[])[i].data as IParams).time !== '' && (nextProps.previousRound.listMatches as IParams[])[i].id !== -1) {
                  if (this.datePreviousRound == null) {
                    this.datePreviousRound = formatStringToDate(((nextProps.previousRound.listMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                  } else {
                    if (isAfter(formatStringToDate(((nextProps.previousRound.listMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss'), this.datePreviousRound)) {
                      this.datePreviousRound = formatStringToDate(((nextProps.previousRound.listMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                    }
                  }
                }
              }
            }
          }
        } else {
          if (nextProps.previousRound.listWinMatches != null) {
            for (let i = 0; i < (nextProps.previousRound.listWinMatches as IParams[]).length; i++) {
              if (((nextProps.previousRound.listWinMatches as IParams[])[i].data as IParams).time !== '' && (nextProps.previousRound.listWinMatches as IParams[])[i].id !== -1) {
                if (this.datePreviousRound == null) {
                  this.datePreviousRound = formatStringToDate(((nextProps.previousRound.listWinMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                } else {
                  if (isAfter(formatStringToDate(((nextProps.previousRound.listWinMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss'), this.datePreviousRound)) {
                    this.datePreviousRound = formatStringToDate(((nextProps.previousRound.listWinMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                  }
                }
              }
            }
          } else {
            if (nextProps.previousRound.listLoseMatches != null) {
              for (let i = 0; i < (nextProps.previousRound.listLoseMatches as IParams[]).length; i++) {
                if (((nextProps.previousRound.listLoseMatches as IParams[])[i].data as IParams).time !== '' && (nextProps.previousRound.listLoseMatches as IParams[])[i].id !== -1) {
                  if (this.datePreviousRound == null) {
                    this.datePreviousRound = formatStringToDate(((nextProps.previousRound.listLoseMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                  } else {
                    if (isAfter(formatStringToDate(((nextProps.previousRound.listLoseMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss'), this.datePreviousRound)) {
                      this.datePreviousRound = formatStringToDate(((nextProps.previousRound.listLoseMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return true;
  }

  render() {
    if (this.props.roundRobin === true) {
      return (
        <div className={`BracketRound-eachRound ${this.state.roundHover === true ? 'BracketRound-reachRound-bolder' : 'BracketRound-eachRound-noBold'}`} style={{ ...this.props.info.listLoseMatches != null && { width: '250px' } }}>
          <div className={`BracketRound-title-round-container ${this.props.roundNo > 1 && 'BracketRound-title-round-container-border'}`} onMouseOver={() => { this.setState({ roundHover: true, }); }} onMouseOut={() => { this.setState({ roundHover: false, }); }}>
            <p className="BracketRound-title-round-text">{this.props.info.roundName}</p>
          </div>
          {this.props.info.listMatches != null &&
            (this.props.info.listMatches as unknown as IParams[]).map((item, index) => {
              return (
                <BracketMatch
                  tournamentId={this.props.tournamentId}
                  info={item}
                  key={index}
                  totalRound={this.props.totalRound}
                  roundRobin={true}
                  allMatches={this.props.allMatches}
                  swapAble={this.props.swapAble}
                  finalStage={this.props.finalStage}
                  tableId={this.props.tableId}
                  matchType={'rr'}
                  dateNextRound={this.dateNextRound}
                  datePreviousRound={this.datePreviousRound}
                  tournamentStarted={this.props.tournamentStarted}
                  canEdit={this.props.canEdit}
                />
              );
            })
          }
        </div>
      );
    } else {
      return (
        <div className={`BracketRound-eachRound ${this.state.roundHover === true ? 'BracketRound-reachRound-bolder' : 'BracketRound-eachRound-noBold'}`} style={{ ...this.props.info.listLoseMatches != null && { width: '250px', height: `${(this.props.info.highestMatch as number) + 100}px` } }}>
          <div className={`BracketRound-title-round-container ${this.props.roundNo > 1 && 'BracketRound-title-round-container-border'}`} onMouseOver={() => { this.setState({ roundHover: true, }); }} onMouseOut={() => { this.setState({ roundHover: false, }); }}>
            <p className="BracketRound-title-round-text">{this.props.info.roundName}</p>
          </div>
          {this.props.info.listMatches != null ?
            (this.props.info.listMatches as unknown as IParams[]).map((item, index) => {
              return (<BracketMatch canEdit={this.props.canEdit} tournamentStarted={this.props.tournamentStarted} dateNextRound={this.dateNextRound} datePreviousRound={this.datePreviousRound} matchType={'se'} finalStage={this.props.finalStage} swapAble={this.props.swapAble} allMatches={this.props.allMatches} has34={this.props.has34} tournamentId={this.props.tournamentId} info={item} key={index} totalRound={this.props.totalRound} />);
            }) : (this.props.info.listWinMatches != null ? (this.props.info.listWinMatches as unknown as IParams[]).map((item, index) => {
              return (<BracketMatch canEdit={this.props.canEdit} tournamentStarted={this.props.tournamentStarted} dateNextRound={this.dateNextRound} datePreviousRound={this.datePreviousRound} matchType={'win'} finalStage={this.props.finalStage} swapAble={this.props.swapAble} allMatches={this.props.allMatches} tournamentId={this.props.tournamentId} info={item} key={index} totalRound={this.props.totalRound} />);
            }) : (this.props.info.listLoseMatches != null ? (this.props.info.listLoseMatches as unknown as IParams[]).map((item, index) => {
              return (<BracketMatch canEdit={this.props.canEdit} tournamentStarted={this.props.tournamentStarted} dateNextRound={this.dateNextRound} datePreviousRound={this.datePreviousRound} matchType={'lose'} finalStage={this.props.finalStage} swapAble={this.props.swapAble} allMatches={this.props.allMatches} tournamentId={this.props.tournamentId} info={item} key={index} totalRound={this.props.totalRound} lowerBracket={true} />);
            }) : ((this.props.info.listSumMatches as IParams[]).map((item, index) => {
              return (<BracketMatch canEdit={this.props.canEdit} tournamentStarted={this.props.tournamentStarted} dateNextRound={this.dateNextRound} datePreviousRound={this.datePreviousRound} matchType={'sum'} finalStage={this.props.finalStage} swapAble={this.props.swapAble} allMatches={this.props.allMatches} showAllDescription={true} has34={true} tournamentId={this.props.tournamentId} info={item} key={index} totalRound={this.props.totalRound} />);
            }))))
          }
          {this.props.info.listLoseMatches != null && <svg style={{ position: 'absolute', marginTop: '20px', width: '1px', height: `${(this.props.info.highestMatch as number) + 100}px`, backgroundColor: 'transparent', }}>
            {this.props.info.listRoundPosition != null && (this.props.info.listRoundPosition as IParams[]).map((item, index) => <path key={index} d={`M 0 ${(item.a as number) + PADDING_TOP + 14} L 0 ${(item.b as number) + PADDING_TOP + 14}`} stroke="#3bbf1a" strokeWidth={2}></path>)}
          </svg>}
        </div>
      );
    }
  }
}

export default connect(
  null,
  null
)(BracketRound);