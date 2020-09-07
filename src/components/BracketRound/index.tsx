import React from 'react';
import { connect } from 'react-redux';
import BracketMatch from 'components/BracketMatch';
import { IParams } from 'interfaces/common';
import './styles.css';
import { PADDING_TOP } from 'global';

interface IBracketRoundProps extends React.ClassAttributes<BracketRound> {
  info: IParams;
  roundNo: number;
  totalRound: number;
  index: number;
  competitionId: number;
  roundRobin?: boolean;
  has34?: boolean;
  allMatches: IParams | null;
}

interface IBracketRoundState {
  roundHover: boolean;
}

class BracketRound extends React.Component<IBracketRoundProps, IBracketRoundState> {
  constructor(props: IBracketRoundProps) {
    super(props);
    this.state = {
      roundHover: false,
    };
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
                  competitionId={this.props.competitionId}
                  info={item}
                  key={index}
                  totalRound={this.props.totalRound}
                  roundRobin={true}
                  allMatches={this.props.allMatches}
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
              return (<BracketMatch allMatches={this.props.allMatches} has34={this.props.has34} competitionId={this.props.competitionId} info={item} key={index} totalRound={this.props.totalRound} />);
            }) : (this.props.info.listWinMatches != null ? (this.props.info.listWinMatches as unknown as IParams[]).map((item, index) => {
              return (<BracketMatch allMatches={this.props.allMatches} competitionId={this.props.competitionId} info={item} key={index} totalRound={this.props.totalRound} />);
            }) : (this.props.info.listLoseMatches != null ? (this.props.info.listLoseMatches as unknown as IParams[]).map((item, index) => {
              return (<BracketMatch allMatches={this.props.allMatches} competitionId={this.props.competitionId} info={item} key={index} totalRound={this.props.totalRound} lowerBracket={true} />);
            }) : ((this.props.info.listSumMatches as IParams[]).map((item, index) => {
              return (<BracketMatch allMatches={this.props.allMatches} showAllDescription={true} has34={true} competitionId={this.props.competitionId} info={item} key={index} totalRound={this.props.totalRound} />);
            }))))
          }
          {this.props.info.listLoseMatches != null && <svg style={{ position: 'absolute', marginTop: '20px', width: '1px', height: `${(this.props.info.highestMatch as number) + 100}px`, backgroundColor: 'transparent', }}>
            {this.props.info.listRoundPosition != null && (this.props.info.listRoundPosition as IParams[]).map((item, index) => <path key={index} d={`M 0 ${(item.a as number) + PADDING_TOP + 14} L 0 ${(item.b as number) + PADDING_TOP + 14}`} stroke="white" strokeWidth={2}></path>)}
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