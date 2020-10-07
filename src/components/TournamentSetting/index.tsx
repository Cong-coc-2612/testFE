import React from 'react';
import { connect } from 'react-redux';
import ReduxBlockUi from 'react-block-ui/redux';
import { isAfter, isBefore } from 'date-fns';
import Select, { ValueType, OptionTypeBase } from 'react-select';
import DatePicker from "react-datepicker";
import 'react-block-ui/style.css';
import TextInput from 'components/TextInput';
import { IBigRequest, IParams } from 'interfaces/common';
import { IState } from 'redux-saga/reducers';
import { formatStringToDate, formatDateToString } from 'utils/datetime';
import { checkUsernameExisted, setUsernameExistedDefault } from 'redux-saga/global-actions/CheckUsernameExisted-action';
import { CHECK_USERNAME_EXISTED, EDIT_TOURNAMENT_INFO } from 'redux-saga/actions';
import { CHECK_USERNAME_EXISTED_SUCCESS, CHECK_USERNAME_EXISTED_FAILED } from 'redux-saga/global-reducers/IsUsernameExisted-reducer';
import { editFinalStageSetting, editGroupStageSetting, queryFinalStageSetting, queryGroupStageSetting, queryAllFormats, queryAllSports } from 'screens/CompetitionInfo/actions';
import { queryBracketBoardInfo } from 'components/BracketBoard/actions';
import { editTournamentInfo } from './actions';
import { EDIT_TOURNAMENT_INFO_SUCCESS, EDIT_TOURNAMENT_INFO_FAILED } from './reducers';
import './styles.css';
import { TOURNAMENT_STATUS } from 'global';
import config from 'config';

interface ITournamentSettingProps extends React.ClassAttributes<TournamentSetting> {
  isUsernameExisted: boolean | null | {};
  tournamentInfo: IParams;
  tournamentId: number;
  allSports: IParams[];
  allFormats: IParams[];
  finalStageSetting: IParams | null;
  groupStageSetting: IParams | null;
  tournamentStatus: string;
  bracketBoardInfo: IParams | null;

  queryAllSports(): void;
  queryAllFormats(): void;
  checkUsernameExisted(param: IBigRequest): void;
  editTournamentInfo(param: IBigRequest): void;
  queryFinalStageSetting(params: IBigRequest): void;
  queryGroupStageSetting(params: IBigRequest): void;
  editFinalStageSetting(params: IBigRequest): void;
  editGroupStageSetting(params: IBigRequest): void;
  setUsernameExistedDefault(): void;
  queryBracketBoardInfo(params: IBigRequest): void;
}

interface ITournamentSettingState {
  username: string;
  usernameError: boolean;
  usernameErrorContent: string;
  selectedSport: ValueType<OptionTypeBase>;
  tournamentName: string;
  tournamentNameError: boolean;
  tournamentNameErrorContent: string;
  tournamentShortName: string;
  selectedCompetitionFormatPhase1: ValueType<OptionTypeBase>;
  selectedCompetitionFormatPhase2: ValueType<OptionTypeBase>;
  onePhase: boolean;
  twoPhase: boolean;
  homeWayPhase2: boolean;
  homeWayPhase1: boolean;
  tournamentShortNameError: boolean;
  tournamentShortNameErrorContent: string;
  description: string;
  descriptionError: boolean;
  descriptionErrorContent: string;
  startLocation: string;
  startLocationError: boolean;
  startLocationErrorContent: string;
  endLocation: string;
  endLocationError: boolean;
  endLocationErrorContent: string;
  donor: string;
  donorError: boolean;
  donorErrorContent: string;
  startDate: Date;
  endDate: Date;
  endFormDate: Date;
  startFormDate: Date;
  amountOfTeamsInAGroup: number;
  amountOfTeamsInAGroupError: boolean;
  amountOfTeamsInAGroupErrorContent: string;
  amountOfTeamsGoOnInAGroup: number;
  amountOfTeamsGoOnInAGroupError: boolean;
  amountOfTeamsGoOnInAGroupErrorContent: string;
  startDateError: boolean;
  endDateError: boolean;
  endDateErrorContent: string;
  startDateErrorContent: string;
  boPhase1: ValueType<OptionTypeBase>;
  boPhase2: ValueType<OptionTypeBase>;
  win1: number;
  win1Error: boolean;
  win1ErrorContent: string;
  draw1: number;
  draw1Error: boolean;
  draw1ErrorContent: string;
  lose1: number;
  lose1Error: boolean;
  lose1ErrorContent: string;
  win2: number;
  win2Error: boolean;
  win2ErrorContent: string;
  draw2: number;
  draw2Error: boolean;
  draw2ErrorContent: string;
  lose2: number;
  lose2Error: boolean;
  lose2ErrorContent: string;
}

let sportOptions: IParams[] = [];

let competitionFormatOptions: IParams[] = [];
let competitionFormatOptions2: IParams[] = [];
const boOdd = [
  { value: 1, label: '1' },
  { value: 3, label: '3' },
  { value: 5, label: '5' },
  { value: 7, label: '7' },
];
const boEven = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 5, label: '5' },
  { value: 7, label: '7' },
];

class TournamentSetting extends React.Component<ITournamentSettingProps, ITournamentSettingState> {
  constructor(props: ITournamentSettingProps) {
    super(props);
    const { tournamentInfo } = props;
    this.state = {
      donor: tournamentInfo.donor as string,
      donorError: false,
      donorErrorContent: '',
      selectedSport: { value: -1, label: '' },
      endLocation: tournamentInfo.closingLocation as string,
      endLocationError: false,
      endLocationErrorContent: '',
      startLocation: tournamentInfo.openingLocation as string,
      startLocationError: false,
      startLocationErrorContent: '',
      onePhase: tournamentInfo.hasGroupStage === false,
      twoPhase: tournamentInfo.hasGroupStage === true,
      description: tournamentInfo.description as string,
      selectedCompetitionFormatPhase1: props.finalStageSetting != null && props.groupStageSetting != null ? (tournamentInfo.hasGroupStage === false ? competitionFormatOptions.find(element => element.value === props.finalStageSetting!.formatId) : competitionFormatOptions.find(element => element.value === props.groupStageSetting!.formatId)) : { value: -1, label: '' },
      selectedCompetitionFormatPhase2: props.finalStageSetting != null ? (competitionFormatOptions2.find(element => element.value === props.finalStageSetting!.formatId) as ValueType<OptionTypeBase>) : { value: -1, label: '' },
      homeWayPhase1: props.finalStageSetting != null && props.groupStageSetting != null ? (tournamentInfo.hasGroupStage === false ? props.finalStageSetting.hasHomeMatch as boolean : props.groupStageSetting.hasHomeMatch as boolean) : false,
      homeWayPhase2: props.finalStageSetting != null ? props.finalStageSetting.hasHomeMatch as boolean : false,
      descriptionError: false,
      descriptionErrorContent: '',
      tournamentShortName: tournamentInfo.shortName as string,
      tournamentShortNameError: false,
      tournamentShortNameErrorContent: '',
      tournamentName: tournamentInfo.fullName as string,
      tournamentNameError: false,
      tournamentNameErrorContent: '',
      username: '',
      usernameError: false,
      usernameErrorContent: '',
      startDate: formatStringToDate(tournamentInfo.openingTime as string, 'yyyy-MM-dd HH:mm:ss'),
      endDate: formatStringToDate(tournamentInfo.closingTime as string, 'yyyy-MM-dd HH:mm:ss'),
      endFormDate: formatStringToDate(tournamentInfo.openingTime as string, 'yyyy-MM-dd HH:mm:ss'),
      startFormDate: formatStringToDate(tournamentInfo.openingTime as string, 'yyyy-MM-dd HH:mm:ss'),
      amountOfTeamsInAGroupError: false,
      amountOfTeamsInAGroupErrorContent: '',
      amountOfTeamsGoOnInAGroupError: false,
      amountOfTeamsGoOnInAGroupErrorContent: '',
      amountOfTeamsInAGroup: props.groupStageSetting != null ? props.groupStageSetting.maxTeamPerTable as number : 2,
      amountOfTeamsGoOnInAGroup: props.groupStageSetting != null ? props.groupStageSetting.advanceTeamPerTable as number : 1,
      startDateError: false,
      endDateError: false,
      endDateErrorContent: '',
      startDateErrorContent: '',
      boPhase1: props.finalStageSetting != null && props.groupStageSetting != null ? (tournamentInfo.hasGroupStage === false ? boEven.find(element => element.value === props.finalStageSetting!.bo) : boEven.find(element => element.value === props.groupStageSetting!.bo)) : { value: 1, label: '1' },
      boPhase2: props.finalStageSetting != null ? (boEven.find(element => element.value === props.finalStageSetting!.bo)) : { value: 1, label: '1' },
      win1: 3,
      win1Error: false,
      win1ErrorContent: '',
      draw1: 1,
      draw1Error: false,
      draw1ErrorContent: '',
      lose1: 0,
      lose1Error: false,
      lose1ErrorContent: '',
      win2: 3,
      win2Error: false,
      win2ErrorContent: '',
      draw2: 1,
      draw2Error: false,
      draw2ErrorContent: '',
      lose2: 0,
      lose2Error: false,
      lose2ErrorContent: '',
    };
  }

  shouldComponentUpdate(nextProps: ITournamentSettingProps, nextState: ITournamentSettingState) {
    if (this.state.twoPhase !== nextState.twoPhase && nextState.twoPhase === true) {
      this.setState({
        selectedCompetitionFormatPhase1: { value: 3, label: 'Vòng tròn tính điểm' },
      });
    }
    if (this.props.allSports !== nextProps.allSports) {
      sportOptions = [];
      nextProps.allSports.map((item, index) => sportOptions.push({ value: item.id, label: item.fullName }));
      this.setState({
        selectedSport: this.props.tournamentInfo.sportId != null ?
          (sportOptions.find(element => element.value === this.props.tournamentInfo.sportId) != null ?
            sportOptions.find(element => element.value === this.props.tournamentInfo.sportId) as ValueType<OptionTypeBase> :
            null) :
          null,
      });
    }
    if (this.props.allFormats !== nextProps.allFormats) {
      competitionFormatOptions = [];
      competitionFormatOptions2 = [];
      nextProps.allFormats.map((item, index) => competitionFormatOptions.push({ value: item.id, label: item.description }));
      nextProps.allFormats.map((item, index) => item.name !== 'Round Robin' && competitionFormatOptions2.push({ value: item.id, label: item.description }));
      if (nextProps.finalStageSetting != null && nextProps.groupStageSetting != null) {
        this.setState({
          selectedCompetitionFormatPhase1: nextProps.finalStageSetting != null && nextProps.groupStageSetting != null ? (nextProps.tournamentInfo.hasGroupStage === false ? competitionFormatOptions.find(element => element.value === nextProps.finalStageSetting!.formatId) : competitionFormatOptions.find(element => element.value === nextProps.groupStageSetting!.formatId)) : { value: -1, label: '' },
          selectedCompetitionFormatPhase2: nextProps.finalStageSetting != null ? (competitionFormatOptions2.find(element => element.value === nextProps.finalStageSetting!.formatId) ? competitionFormatOptions2.find(element => element.value === nextProps.finalStageSetting!.formatId) as ValueType<OptionTypeBase> : competitionFormatOptions2[0]) : { value: -1, label: '' },
          boPhase1: (nextProps.tournamentInfo.hasGroupStage === false ? boEven.find(element => element.value === nextProps.finalStageSetting!.bo) : boEven.find(element => element.value === nextProps.groupStageSetting!.bo)),
          boPhase2: boEven.find(element => element.value === nextProps.finalStageSetting!.bo),
        });
      }
    }
    if (this.props.finalStageSetting !== nextProps.finalStageSetting || this.props.groupStageSetting !== nextProps.groupStageSetting) {
      if (nextProps.finalStageSetting != null && nextProps.groupStageSetting != null) {
        this.setState({
          selectedCompetitionFormatPhase1: nextProps.tournamentInfo.hasGroupStage === false ? competitionFormatOptions.find(element => element.value === nextProps.finalStageSetting!.formatId) : competitionFormatOptions.find(element => element.value === nextProps.groupStageSetting!.formatId),
          selectedCompetitionFormatPhase2: competitionFormatOptions2.find(element => element.value === nextProps.finalStageSetting!.formatId) ? competitionFormatOptions2.find(element => element.value === nextProps.finalStageSetting!.formatId) as ValueType<OptionTypeBase> : competitionFormatOptions2[0],
          homeWayPhase1: nextProps.tournamentInfo.hasGroupStage === false ? nextProps.finalStageSetting.hasHomeMatch as boolean : nextProps.groupStageSetting.hasHomeMatch as boolean,
          homeWayPhase2: nextProps.finalStageSetting.hasHomeMatch as boolean,
          amountOfTeamsInAGroup: nextProps.groupStageSetting.maxTeamPerTable as number,
          amountOfTeamsGoOnInAGroup: nextProps.groupStageSetting.advanceTeamPerTable as number,
          boPhase1: (nextProps.tournamentInfo.hasGroupStage === false ? boEven.find(element => element.value === nextProps.finalStageSetting!.bo) : boEven.find(element => element.value === nextProps.groupStageSetting!.bo)),
          boPhase2: boEven.find(element => element.value === nextProps.finalStageSetting!.bo),
        });
      }
    }
    return true;
  }

  componentDidMount() {
    this.requestData();
  }

  private requestData = () => {
    this.props.queryAllSports();
    this.props.queryAllFormats();
    let params: IBigRequest = {
      path: '',
      param: {
        tournamentId: this.props.tournamentInfo.id as number,
      },
      data: {},
    };
    this.props.queryFinalStageSetting(params);
    params = {
      path: '',
      param: {
        tournamentId: this.props.tournamentInfo.id as number,
      },
      data: {},
    };
    this.props.queryGroupStageSetting(params);
    params = {
      path: '',
      param: {
        tournamentId: this.props.tournamentId,
      },
      data: {},
    };
    this.props.queryBracketBoardInfo(params);
  }

  private onChangeTournamentName = (value: string) => {
    this.setState({ tournamentName: value, });
  }

  private onChangeTournamentShortName = (value: string) => {
    this.setState({ tournamentShortName: value, });
  }

  private onChangeDescription = (value: string) => {
    this.setState({ description: value, });
  }

  private onChangeStartLocation = (value: string) => {
    this.setState({ startLocation: value, });
  }

  private onChangeEndLocation = (value: string) => {
    this.setState({ endLocation: value, });
  }

  private onChangeDonor = (value: string) => {
    this.setState({ donor: value, });
  }

  // private handleChangeStartDate = (value: Date) => {
  //   if (isAfter(value, this.state.endDate)) {
  //     this.setState({
  //       startDate: value,
  //       endDate: value,
  //     });
  //   } else if (isBefore(value, this.state.startFormDate)) {
  //     this.setState({
  //       startDate: value,
  //       startFormDate: value,
  //       endFormDate: value,
  //     });
  //   } else if (isBefore(value, this.state.endFormDate)) {
  //     this.setState({
  //       startDate: value,
  //       endFormDate: value,
  //     });
  //   } else {
  //     this.setState({
  //       startDate: value,
  //     });
  //   }
  // };

  private handleChangeStartFormDate = (value: Date) => {
    if (isAfter(value, this.state.endFormDate)) {
      this.setState({
        startFormDate: value,
        endFormDate: value,
      });
    } else {
      this.setState({
        startFormDate: value,
      });
    }
  };

  // private handleChangeEndDate = (value: Date) => {
  //   if (isBefore(value, this.state.startDate)) {
  //     if (isBefore(value, this.state.startFormDate)) {
  //       this.setState({
  //         startFormDate: value,
  //         endFormDate: value,
  //         endDate: value,
  //         startDate: value,
  //       });
  //     } else if (isBefore(value, this.state.endFormDate)) {
  //       this.setState({
  //         endFormDate: value,
  //         endDate: value,
  //         startDate: value,
  //       });
  //     } else {
  //       this.setState({
  //         startDate: value,
  //         endDate: value,
  //       });
  //     }
  //   } else {
  //     this.setState({
  //       endDate: value,
  //     });
  //   }
  // };

  private handleChangeStartDate = (value: Date) => {
    if (isAfter(value, this.state.endDate)) {
      this.setState({
        startDate: value,
        startDateError: true,
        startDateErrorContent: 'Ngày khai mạc không thể diễn ra sau ngày bế mạc',
        endDateError: true,
        endDateErrorContent: 'Ngày bế mạc không thể diễn ra trước ngày khai mạc',
      });
    } else {
      if (this.props.bracketBoardInfo == null) {
        this.setState({
          endDateError: false,
          endDateErrorContent: '',
          startDateError: false,
          startDateErrorContent: '',
          startDate: value,
        });
      } else {
        let earliestTime: Date | null = null;
        if (this.props.bracketBoardInfo.groupStage == null) {
          if ((this.props.bracketBoardInfo.finalStage as IParams).listRound) {
            for (let i = 0; i < (((this.props.bracketBoardInfo.finalStage as IParams).listRound as IParams[])[0].listMatches as IParams[]).length; i++) {
              if ((((this.props.bracketBoardInfo.finalStage as IParams).listRound as IParams[])[0].listMatches as IParams[])[i].id !== -1 && ((((this.props.bracketBoardInfo.finalStage as IParams).listRound as IParams[])[0].listMatches as IParams[])[i].data as IParams).time !== '') {
                if (earliestTime == null) {
                  earliestTime = formatStringToDate(((((this.props.bracketBoardInfo.finalStage as IParams).listRound as IParams[])[0].listMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                } else {
                  if (isBefore(formatStringToDate(((((this.props.bracketBoardInfo.finalStage as IParams).listRound as IParams[])[0].listMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss'), earliestTime)) {
                    earliestTime = formatStringToDate(((((this.props.bracketBoardInfo.finalStage as IParams).listRound as IParams[])[0].listMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                  }
                }
              }
            }
            if (earliestTime == null) {
              this.setState({
                endDateError: false,
                endDateErrorContent: '',
                startDateError: false,
                startDateErrorContent: '',
                startDate: value,
              });
            } else {
              if (isAfter(value, earliestTime)) {
                this.setState({
                  endDateError: false,
                  endDateErrorContent: '',
                  startDateError: true,
                  startDateErrorContent: 'Đã có trận đấu diễn ra trước ngày này',
                  startDate: value,
                });
              } else {
                this.setState({
                  endDateError: false,
                  endDateErrorContent: '',
                  startDateError: false,
                  startDateErrorContent: '',
                  startDate: value,
                });
              }
            }
          } else {
            if ((this.props.bracketBoardInfo.finalStage as IParams).listWinRound) {
              for (let i = 0; i < (((this.props.bracketBoardInfo.finalStage as IParams).listWinRound as IParams[])[0].listWinMatches as IParams[]).length; i++) {
                if ((((this.props.bracketBoardInfo.finalStage as IParams).listWinRound as IParams[])[0].listWinMatches as IParams[])[i].id !== -1 && ((((this.props.bracketBoardInfo.finalStage as IParams).listWinRound as IParams[])[0].listWinMatches as IParams[])[i].data as IParams).time !== '') {
                  if (earliestTime == null) {
                    earliestTime = formatStringToDate(((((this.props.bracketBoardInfo.finalStage as IParams).listWinRound as IParams[])[0].listWinMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                  } else {
                    if (isBefore(formatStringToDate(((((this.props.bracketBoardInfo.finalStage as IParams).listWinRound as IParams[])[0].listWinMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss'), earliestTime)) {
                      earliestTime = formatStringToDate(((((this.props.bracketBoardInfo.finalStage as IParams).listWinRound as IParams[])[0].listWinMatches as IParams[])[i].data as IParams).time as string, 'yyyy-MM-dd HH:mm:ss');
                    }
                  }
                }
              }
              if (earliestTime == null) {
                this.setState({
                  endDateError: false,
                  endDateErrorContent: '',
                  startDateError: false,
                  startDateErrorContent: '',
                  startDate: value,
                });
              } else {
                if (isAfter(value, earliestTime)) {
                  this.setState({
                    endDateError: false,
                    endDateErrorContent: '',
                    startDateError: true,
                    startDateErrorContent: 'Đã có trận đấu diễn ra trước ngày này',
                    startDate: value,
                  });
                } else {
                  this.setState({
                    endDateError: false,
                    endDateErrorContent: '',
                    startDateError: false,
                    startDateErrorContent: '',
                    startDate: value,
                  });
                }
              }
            } else {
              for (let i = 0; i < (((this.props.bracketBoardInfo.finalStage as IParams).listRRRound as IParams[])[0].listMatches as IParams[]).length; i++) {
                if ((((this.props.bracketBoardInfo.finalStage as IParams).listRRRound as IParams[])[0].listMatches as IParams[])[i].time !== '') {
                  if (earliestTime == null) {
                    earliestTime = formatStringToDate((((this.props.bracketBoardInfo.finalStage as IParams).listRRRound as IParams[])[0].listMatches as IParams[])[i].time as string, 'yyyy-MM-dd HH:mm:ss');
                  } else {
                    if (isBefore(formatStringToDate((((this.props.bracketBoardInfo.finalStage as IParams).listRRRound as IParams[])[0].listMatches as IParams[])[i].time as string, 'yyyy-MM-dd HH:mm:ss'), earliestTime)) {
                      earliestTime = formatStringToDate((((this.props.bracketBoardInfo.finalStage as IParams).listRRRound as IParams[])[0].listMatches as IParams[])[i].time as string, 'yyyy-MM-dd HH:mm:ss');
                    }
                  }
                }
              }
              if (earliestTime == null) {
                this.setState({
                  endDateError: false,
                  endDateErrorContent: '',
                  startDateError: false,
                  startDateErrorContent: '',
                  startDate: value,
                });
              } else {
                if (isAfter(value, earliestTime)) {
                  this.setState({
                    endDateError: false,
                    endDateErrorContent: '',
                    startDateError: true,
                    startDateErrorContent: 'Đã có trận đấu diễn ra trước ngày này',
                    startDate: value,
                  });
                } else {
                  this.setState({
                    endDateError: false,
                    endDateErrorContent: '',
                    startDateError: false,
                    startDateErrorContent: '',
                    startDate: value,
                  });
                }
              }
            }
          }
        } else {
          for (let j = 0; j < ((this.props.bracketBoardInfo.groupStage as IParams).listTableRR as IParams[]).length; j++) {
            for (let i = 0; i < ((((this.props.bracketBoardInfo.groupStage as IParams).listTableRR as IParams[])[j].listRRRound as IParams[])[0].listMatches as IParams[]).length; i++) {
              if (((((this.props.bracketBoardInfo.groupStage as IParams).listTableRR as IParams[])[j].listRRRound as IParams[])[0].listMatches as IParams[])[i].time !== '') {
                if (earliestTime == null) {
                  earliestTime = formatStringToDate(((((this.props.bracketBoardInfo.groupStage as IParams).listTableRR as IParams[])[j].listRRRound as IParams[])[0].listMatches as IParams[])[i].time as string, 'yyyy-MM-dd HH:mm:ss');
                } else {
                  if (isBefore(formatStringToDate(((((this.props.bracketBoardInfo.groupStage as IParams).listTableRR as IParams[])[j].listRRRound as IParams[])[0].listMatches as IParams[])[i].time as string, 'yyyy-MM-dd HH:mm:ss'), earliestTime)) {
                    earliestTime = formatStringToDate(((((this.props.bracketBoardInfo.groupStage as IParams).listTableRR as IParams[])[j].listRRRound as IParams[])[0].listMatches as IParams[])[i].time as string, 'yyyy-MM-dd HH:mm:ss');
                  }
                }
              }
            }
            if (earliestTime == null) {
              this.setState({
                endDateError: false,
                endDateErrorContent: '',
                startDateError: false,
                startDateErrorContent: '',
                startDate: value,
              });
            } else {
              if (isAfter(value, earliestTime)) {
                this.setState({
                  endDateError: false,
                  endDateErrorContent: '',
                  startDateError: true,
                  startDateErrorContent: 'Đã có trận đấu diễn ra trước ngày này',
                  startDate: value,
                });
              } else {
                this.setState({
                  endDateError: false,
                  endDateErrorContent: '',
                  startDateError: false,
                  startDateErrorContent: '',
                  startDate: value,
                });
              }
            }
          }
        }
      }
    }
  };

  private handleChangeEndDate = (value: Date) => {
    if (isBefore(value, this.state.startDate)) {
      this.setState({
        startDateError: true,
        startDateErrorContent: 'Ngày khai mạc không thể diễn ra sau ngày bế mạc',
        endDateError: true,
        endDateErrorContent: 'Ngày bế mạc không thể diễn ra trước ngày khai mạc',
        endDate: value,
      });
    } else {
      this.setState({
        endDate: value,
        endDateError: false,
        endDateErrorContent: '',
        startDateError: false,
        startDateErrorContent: '',
      });
    }
  };

  private handleChangeEndFormDate = (value: Date) => {
    if (isBefore(value, this.state.startFormDate)) {
      this.setState({
        startFormDate: value,
        endFormDate: value,
      });
    } else {
      this.setState({
        endFormDate: value,
      });
    }
  };

  private validateInfo = () => {
    let tournamentNameError = false;
    let tournamentNameErrorContent = '';
    let tournamentShortNameErrorContent = '';
    let tournamentShortNameError = false;
    let descriptionErrorContent = '';
    let descriptionError = false;
    let startLocationErrorContent = '';
    let startLocationError = false;
    let endLocationErrorContent = '';
    let endLocationError = false;
    let donorErrorContent = '';
    let donorError = false;
    let endDateErrorContent = '';
    let startDateErrorContent = '';
    if (this.state.tournamentName.trim() === '' || !config.regex.tournamentName.test(this.state.tournamentName)) {
      tournamentNameError = true;
      tournamentNameErrorContent = 'Tên giải không được trống, không chứa ký tự đặc biệt và không quá 100 ký tự';
    }
    if (this.state.tournamentShortName.trim() === '' || !config.regex.tournamentShortName.test(this.state.tournamentShortName)) {
      tournamentShortNameError = true;
      tournamentShortNameErrorContent = 'Tên ngắn giải không được trống, không chứa ký tự đặc biệt và không quá 30 ký tự';
    }
    if (!config.regex.description.test(this.state.description)) {
      descriptionError = true;
      descriptionErrorContent = 'Mô tả không quá 200 ký tự';
    }
    if (!config.regex.address.test(this.state.startLocation)) {
      startLocationError = true;
      startLocationErrorContent = 'Nơi khai mạc không quá 100 kí tự';
    }
    if (!config.regex.address.test(this.state.endLocation)) {
      endLocationError = true;
      endLocationErrorContent = 'Nơi bế mạc không quá 100 kí tự';
    }
    if (!config.regex.address.test(this.state.donor)) {
      donorError = true;
      donorErrorContent = 'Nơi bế mạc không quá 100 kí tự';
    }

    return { endDateErrorContent, startDateErrorContent, tournamentNameError, tournamentNameErrorContent, tournamentShortNameErrorContent, tournamentShortNameError, descriptionError, descriptionErrorContent, startLocationError, startLocationErrorContent, endLocationError, endLocationErrorContent, donorError, donorErrorContent };
  }

  private handleSave = () => {
    const { endDateErrorContent, startDateErrorContent, tournamentNameError, tournamentNameErrorContent, tournamentShortNameErrorContent, tournamentShortNameError, descriptionError, descriptionErrorContent, startLocationError, startLocationErrorContent, endLocationError, endLocationErrorContent, donorError, donorErrorContent } = this.validateInfo();
    const { amountOfTeamsInAGroupError, amountOfTeamsInAGroupErrorContent } = this.validateAmountOfTeamsInAGroup();
    const { amountOfTeamsGoOnInAGroupError, amountOfTeamsGoOnInAGroupErrorContent } = this.validateAmountOfTeamsGoOnInAGroup();
    this.setState({
      endDateErrorContent,
      startDateErrorContent,
      tournamentNameError,
      tournamentNameErrorContent,
      tournamentShortNameErrorContent,
      tournamentShortNameError,
      descriptionError,
      descriptionErrorContent,
      startLocationError,
      startLocationErrorContent,
      endLocationError,
      endLocationErrorContent,
      donorError,
      donorErrorContent,
      amountOfTeamsInAGroupError,
      amountOfTeamsInAGroupErrorContent,
      amountOfTeamsGoOnInAGroupError,
      amountOfTeamsGoOnInAGroupErrorContent
    });
    if (this.state.startDateError === true || this.state.endDateError === true || amountOfTeamsInAGroupError === true || amountOfTeamsGoOnInAGroupError === true || tournamentNameError === true || tournamentShortNameError === true || descriptionError === true || startLocationError === true || endLocationError === true || donorError === true) {
      return;
    }
    let params: IBigRequest = {
      path: '',
      param: {
        id: this.props.tournamentId,
      },
      data: {
        fullName: this.state.tournamentName,
        shortName: this.state.tournamentShortName,
        description: this.state.description,
        creatorId: this.props.tournamentInfo.creatorId,
        openingLocation: this.state.startLocation,
        closingLocation: this.state.endLocation,
        openingTime: formatDateToString(this.state.startDate, 'yyyy-MM-dd HH:mm:ss'),
        closingTime: formatDateToString(this.state.endDate, 'yyyy-MM-dd HH:mm:ss'),
        donor: this.state.donor,
        url: '',
        hasGroupStage: this.state.twoPhase === true,
        sportId: (this.state.selectedSport as IParams).value,
      },
    };

    this.props.editTournamentInfo(params);
    params = {
      path: '',
      param: {
        id: (this.props.finalStageSetting as IParams).id,
      },
      data: {
        tournamentId: this.props.tournamentId,
        formatId: this.state.twoPhase === true ? (this.state.selectedCompetitionFormatPhase2 as IParams).value : (this.state.selectedCompetitionFormatPhase1 as IParams).value,
        hasHomeMatch: this.state.twoPhase === true ? this.state.homeWayPhase2 : this.state.homeWayPhase1,
        bo: this.state.twoPhase === true ? (this.state.boPhase2 as IParams).value : (this.state.boPhase1 as IParams).value,
        status: (this.props.finalStageSetting as IParams).status,
        url: (this.props.finalStageSetting as IParams).url,
      },
    };
    this.props.editFinalStageSetting(params);
    if (this.state.twoPhase === true) {
      params = {
        path: '',
        param: {
          id: (this.props.groupStageSetting as IParams).id,
        },
        data: {
          tournamentId: this.props.tournamentId,
          formatId: (this.state.selectedCompetitionFormatPhase1 as IParams).value,
          bo: (this.state.boPhase1 as IParams).value,
          hasHomeMatch: this.state.homeWayPhase1,
          status: (this.props.groupStageSetting as IParams).status,
          url: (this.props.groupStageSetting as IParams).url,
          advanceTeamPerTable: this.state.amountOfTeamsGoOnInAGroup,
          maxTeamPerTable: this.state.amountOfTeamsInAGroup,
        },
      };
      this.props.editGroupStageSetting(params);
    }
  }

  private onChangeSport = (value: ValueType<OptionTypeBase>) => {
    this.setState({
      selectedSport: value,
    });
  }

  private OnChoose1 = () => {
    this.setState({
      onePhase: true,
      twoPhase: false,
    });
  }

  private OnChoose2 = () => {
    this.setState({
      onePhase: false,
      twoPhase: true,
    });
  }

  private onChangeCompetitionFormatPhase1 = (value: ValueType<OptionTypeBase>) => {
    this.setState({
      selectedCompetitionFormatPhase1: value,
      boPhase1: { value: 1, label: '1' },
    });
  }

  private onChangeCompetitionFormatPhase2 = (value: ValueType<OptionTypeBase>) => {
    this.setState({
      selectedCompetitionFormatPhase2: value,
      boPhase2: { value: 1, label: '1' },
    });
  }

  private onChangeHomeWayPhase1 = () => {
    this.setState({
      homeWayPhase1: !this.state.homeWayPhase1,
    });
  };

  private onChangeHomeWayPhase2 = () => {
    this.setState({
      homeWayPhase2: !this.state.homeWayPhase2,
    });
  };

  private onChangeAmountOfTeamsInAGroup = (value: string) => {
    let tempValue = 0;
    if (!isNaN(value as unknown as number)) {
      tempValue = Number(value);
    } else {
      tempValue = 0;
    }
    this.setState({ amountOfTeamsInAGroup: tempValue, });
  }

  private onChangeAmountOfTeamsGoOnInAGroup = (value: string) => {
    let tempValue = 0;
    if (!isNaN(value as unknown as number)) {
      tempValue = Number(value);
    } else {
      tempValue = 0;
    }
    this.setState({ amountOfTeamsGoOnInAGroup: tempValue, });
  }

  private validateAmountOfTeamsInAGroup = () => {
    let amountOfTeamsInAGroupError = false;
    let amountOfTeamsInAGroupErrorContent = '';
    if (this.state.amountOfTeamsInAGroup < 2) {
      amountOfTeamsInAGroupError = true;
      amountOfTeamsInAGroupErrorContent = 'Số đội tối đa trong 1 bảng phải lớn hơn 1';
    }

    return { amountOfTeamsInAGroupError, amountOfTeamsInAGroupErrorContent };
  }

  private onBlurAmountOfTeamsInAGroup = () => {
    const { amountOfTeamsInAGroupError, amountOfTeamsInAGroupErrorContent } = this.validateAmountOfTeamsInAGroup();
    this.setState({
      amountOfTeamsInAGroupError,
      amountOfTeamsInAGroupErrorContent
    });
    if (amountOfTeamsInAGroupError === true) {
      return;
    }
  }

  private validateAmountOfTeamsGoOnInAGroup = () => {
    let amountOfTeamsGoOnInAGroupError = false;
    let amountOfTeamsGoOnInAGroupErrorContent = '';
    if (this.state.amountOfTeamsGoOnInAGroup < 1 || this.state.amountOfTeamsGoOnInAGroup >= this.state.amountOfTeamsInAGroup) {
      amountOfTeamsGoOnInAGroupError = true;
      amountOfTeamsGoOnInAGroupErrorContent = 'Số đội đi tiếp trong 1 bảng phải lớn hơn 0 và nhỏ hơn số đội tối đa';
    }

    return { amountOfTeamsGoOnInAGroupError, amountOfTeamsGoOnInAGroupErrorContent };
  }

  private onBlurAmountOfTeamsGoOnInAGroup = () => {
    const { amountOfTeamsGoOnInAGroupError, amountOfTeamsGoOnInAGroupErrorContent } = this.validateAmountOfTeamsGoOnInAGroup();
    this.setState({
      amountOfTeamsGoOnInAGroupError,
      amountOfTeamsGoOnInAGroupErrorContent
    });
    if (amountOfTeamsGoOnInAGroupError === true) {
      return;
    }
  }

  private onChangeboPhase1 = (value: ValueType<OptionTypeBase>) => {
    this.setState({
      boPhase1: value,
    });
  }

  private onChangeboPhase2 = (value: ValueType<OptionTypeBase>) => {
    this.setState({
      boPhase2: value,
    });
  }

  // private onChangeWin1 = (value: string) => {
  //   let tempValue = 0;
  //   if (!isNaN(value as unknown as number)) {
  //     tempValue = Number(value);
  //   } else {
  //     tempValue = 0;
  //   }
  //   this.setState({ win1: tempValue, });
  // }

  // private onChangeDraw1 = (value: string) => {
  //   let tempValue = 0;
  //   if (!isNaN(value as unknown as number)) {
  //     tempValue = Number(value);
  //   } else {
  //     tempValue = 0;
  //   }
  //   this.setState({ draw1: tempValue, });
  // }

  // private onChangeLose1 = (value: string) => {
  //   let tempValue = 0;
  //   if (!isNaN(value as unknown as number)) {
  //     tempValue = Number(value);
  //   } else {
  //     tempValue = 0;
  //   }
  //   this.setState({ lose1: tempValue, });
  // }
  // private onChangeWin2 = (value: string) => {
  //   let tempValue = 0;
  //   if (!isNaN(value as unknown as number)) {
  //     tempValue = Number(value);
  //   } else {
  //     tempValue = 0;
  //   }
  //   this.setState({ win2: tempValue, });
  // }

  // private onChangeDraw2 = (value: string) => {
  //   let tempValue = 0;
  //   if (!isNaN(value as unknown as number)) {
  //     tempValue = Number(value);
  //   } else {
  //     tempValue = 0;
  //   }
  //   this.setState({ draw2: tempValue, });
  // }

  // private onChangeLose2 = (value: string) => {
  //   let tempValue = 0;
  //   if (!isNaN(value as unknown as number)) {
  //     tempValue = Number(value);
  //   } else {
  //     tempValue = 0;
  //   }
  //   this.setState({ lose2: tempValue, });
  // }

  render() {
    return (
      <ReduxBlockUi
        tag="div"
        block={CHECK_USERNAME_EXISTED}
        unblock={[CHECK_USERNAME_EXISTED_SUCCESS, CHECK_USERNAME_EXISTED_FAILED]}
      >
        <ReduxBlockUi
          tag="div"
          block={EDIT_TOURNAMENT_INFO}
          unblock={[EDIT_TOURNAMENT_INFO_SUCCESS, EDIT_TOURNAMENT_INFO_FAILED]}
        >
          <div className="TournamentSetting-container">
            <div className="TournamentSetting-tournament-container">
              <p className="TournamentSetting-header-text">Thông tin giải đấu</p>


              <table>
                <tr>
                  <td>Tên giải: </td>
                  <td style={{ paddingTop: '25px' }}><TextInput value={this.state.tournamentName} label='Nhập tên của giải' error={this.state.tournamentNameError} errorContent={this.state.tournamentNameErrorContent} onChangeText={this.onChangeTournamentName} /></td>
                </tr>
                <tr>
                  <td>Tên ngắn: </td>
                  <td style={{ paddingTop: '25px' }}><TextInput value={this.state.tournamentShortName} label='Nhập tên ngắn của giải' error={this.state.tournamentShortNameError} errorContent={this.state.tournamentShortNameErrorContent} onChangeText={this.onChangeTournamentShortName} /></td>
                </tr>
                <tr>
                  <td>Mô tả: </td>
                  <td style={{ paddingTop: '25px' }}><TextInput value={this.state.description} label='Nhập mô tả' error={this.state.descriptionError} errorContent={this.state.descriptionErrorContent} onChangeText={this.onChangeDescription} /></td>
                </tr>
                {(this.props.tournamentStatus === TOURNAMENT_STATUS.INITIALIZING || this.props.tournamentStatus === TOURNAMENT_STATUS.OPENING) && <tr>
                  <td>Bộ môn: </td>
                  <td style={{ height: '80px' }}>
                    {(sportOptions.length > 0 &&
                      <Select
                        options={sportOptions}
                        className="Select"
                        defaultValue={this.state.selectedSport}
                        value={this.state.selectedSport}
                        onChange={this.onChangeSport}
                        maxMenuHeight={140}
                      />)}
                  </td>
                </tr>}
                {(this.props.tournamentStatus === TOURNAMENT_STATUS.INITIALIZING || this.props.tournamentStatus === TOURNAMENT_STATUS.OPENING) && <tr>
                  <td>Cách tổ chức giải: </td>
                  <td>
                    <input type="radio" name="competitionType" onClick={this.OnChoose1} checked={this.state.onePhase} readOnly />
                    <label onClick={this.OnChoose1}>1 giai đoạn</label>
                    <input type="radio" name="competitionType" onClick={this.OnChoose2} checked={this.state.twoPhase} readOnly />
                    <label onClick={this.OnChoose2}>2 giai đoạn</label>
                  </td>
                </tr>}
                {(this.props.tournamentStatus === TOURNAMENT_STATUS.INITIALIZING || this.props.tournamentStatus === TOURNAMENT_STATUS.OPENING) && <tr>
                  <td style={{ width: '225px', height: '80px' }}>{`Thể thức${this.state.onePhase === true ? ': ' : ' vòng bảng: '}`}</td>
                  <td>
                    {this.state.onePhase === true ? <Select
                      options={competitionFormatOptions}
                      className="Select"
                      defaultValue={this.state.selectedCompetitionFormatPhase1}
                      value={this.state.selectedCompetitionFormatPhase1}
                      onChange={this.onChangeCompetitionFormatPhase1}
                      menuPlacement={'top'}
                    /> : <p>Vòng tròn tính điểm</p>}
                  </td>
                </tr>}
                {(this.props.tournamentStatus === TOURNAMENT_STATUS.INITIALIZING || this.props.tournamentStatus === TOURNAMENT_STATUS.OPENING) && (this.state.selectedCompetitionFormatPhase1 != null &&
                  (this.state.selectedCompetitionFormatPhase1 as IParams).value !== 2 &&
                  <tr>
                    <td></td>
                    <td>
                      <label className="Checkbox-label">
                        <input
                          type="checkbox"
                          checked={this.state.homeWayPhase1}
                          onChange={this.onChangeHomeWayPhase1}
                        />
                        {`${(this.state.selectedCompetitionFormatPhase1 as IParams).value === 3 ? `${this.state.twoPhase === true ? 'Chơi lượt đi lượt về vòng bảng' : 'Chơi lượt đi lượt về'}` : `${this.state.twoPhase === true ? 'Có trận tranh hạng 3 vòng bảng' : 'Có trận tranh hạng 3'}`}`}
                      </label>
                    </td>
                  </tr>
                )}
                {(this.props.tournamentStatus === TOURNAMENT_STATUS.INITIALIZING || this.props.tournamentStatus === TOURNAMENT_STATUS.OPENING) && <tr>
                  <td style={{ width: '225px', height: '80px' }}>{`Số set đấu tối đa 1 trận${this.state.onePhase === true ? ': ' : ' vòng bảng: '}`}</td>
                  <td>
                    {this.state.selectedCompetitionFormatPhase1 != null &&
                      ((this.state.selectedCompetitionFormatPhase1 as IParams).value !== 3 ?
                        <Select
                          options={boOdd}
                          className="Select"
                          defaultValue={this.state.boPhase1}
                          value={this.state.boPhase1}
                          onChange={this.onChangeboPhase1}
                          menuPlacement={'top'}
                        /> : <Select
                          options={boEven}
                          className="Select"
                          defaultValue={this.state.boPhase1}
                          value={this.state.boPhase1}
                          onChange={this.onChangeboPhase1}
                          menuPlacement={'top'}
                        />
                      )}
                  </td>
                </tr>}
                {/* <tr>
                  <td style={{ width: '225px', height: '80px' }}>{`Cách tính điểm${this.state.onePhase === true ? ': ' : ' vòng bảng: '}`}</td>
                  <td>
                  </td>
                </tr>
                <tr>
                  <td>Thắng</td>
                  <td style={{ paddingTop: '25px' }}>
                    <TextInput value={this.state.win1 as unknown as string} style={{ width: '100px' }} label='' error={this.state.win1Error} errorContent={this.state.win1ErrorContent} onChangeText={this.onChangeWin1} />
                  </td>
                </tr>
                <tr>
                  <td>Hòa</td>
                  <td style={{ paddingTop: '25px' }}>
                    <TextInput value={this.state.draw1 as unknown as string} style={{ width: '100px' }} label='' error={this.state.draw1Error} errorContent={this.state.draw1ErrorContent} onChangeText={this.onChangeDraw1} />
                  </td>
                </tr>
                <tr>
                  <td>Thua</td>
                  <td style={{ paddingTop: '25px' }}>
                    <TextInput value={this.state.lose1 as unknown as string} style={{ width: '100px' }} label='' error={this.state.lose1Error} errorContent={this.state.lose1ErrorContent} onChangeText={this.onChangeLose1} />
                  </td>
                </tr> */}
                {(this.props.tournamentStatus === TOURNAMENT_STATUS.INITIALIZING || this.props.tournamentStatus === TOURNAMENT_STATUS.OPENING) && (this.state.twoPhase === true &&
                  <tr>
                    <td>Số đội tối đa 1 bảng</td>
                    <td style={{ paddingTop: '25px' }}>
                      <TextInput
                        style={{ width: 250 }}
                        label={''}
                        value={this.state.amountOfTeamsInAGroup as unknown as string}
                        onChangeText={this.onChangeAmountOfTeamsInAGroup}
                        error={this.state.amountOfTeamsInAGroupError}
                        errorContent={this.state.amountOfTeamsInAGroupErrorContent}
                        onBlur={this.onBlurAmountOfTeamsInAGroup}
                      />
                    </td>
                  </tr>
                )}
                {(this.props.tournamentStatus === TOURNAMENT_STATUS.INITIALIZING || this.props.tournamentStatus === TOURNAMENT_STATUS.OPENING) && (this.state.twoPhase === true &&
                  <tr>
                    <td>Số đội đi tiếp 1 bảng</td>
                    <td style={{ paddingTop: '25px' }}>
                      <TextInput
                        style={{ width: 300 }}
                        label={''}
                        value={this.state.amountOfTeamsGoOnInAGroup as unknown as string}
                        onChangeText={this.onChangeAmountOfTeamsGoOnInAGroup}
                        error={this.state.amountOfTeamsGoOnInAGroupError}
                        errorContent={this.state.amountOfTeamsGoOnInAGroupErrorContent}
                        onBlur={this.onBlurAmountOfTeamsGoOnInAGroup}
                      />
                    </td>
                  </tr>)}
                {(this.props.tournamentStatus === TOURNAMENT_STATUS.INITIALIZING || this.props.tournamentStatus === TOURNAMENT_STATUS.OPENING) && (this.state.twoPhase === true &&
                  <tr>
                    <td>Thể thức vòng chung kết:</td>
                    <td style={{ height: '80px' }}>
                      <Select
                        options={competitionFormatOptions2}
                        className="Select"
                        defaultValue={this.state.selectedCompetitionFormatPhase2}
                        value={this.state.selectedCompetitionFormatPhase2}
                        onChange={this.onChangeCompetitionFormatPhase2}
                        menuPlacement={'top'}
                      />
                    </td>
                  </tr>)}
                {/* {(this.state.twoPhase === true && <tr>
                  <td style={{ width: '225px', height: '80px' }}>{`Cách tính điểm vòng chung kết: `}</td>
                  <td>
                  </td>
                </tr>)}
                {(this.state.twoPhase === true && <tr>
                  <td>Thắng</td>
                  <td style={{ paddingTop: '25px' }}>
                    <TextInput value={this.state.win2 as unknown as string} style={{ width: '100px' }} label='' error={this.state.win2Error} errorContent={this.state.win2ErrorContent} onChangeText={this.onChangeWin2} />
                  </td>
                </tr>)}
                {(this.state.twoPhase === true && <tr>
                  <td>Hòa</td>
                  <td style={{ paddingTop: '25px' }}>
                    <TextInput value={this.state.draw2 as unknown as string} style={{ width: '100px' }} label='' error={this.state.draw2Error} errorContent={this.state.draw2ErrorContent} onChangeText={this.onChangeDraw2} />
                  </td>
                </tr>)}
                {(this.state.twoPhase === true && <tr>
                  <td>Thua</td>
                  <td style={{ paddingTop: '25px' }}>
                    <TextInput value={this.state.lose2 as unknown as string} style={{ width: '100px' }} label='' error={this.state.lose2Error} errorContent={this.state.lose2ErrorContent} onChangeText={this.onChangeLose2} />
                  </td>
                </tr>)} */}
                {(this.props.tournamentStatus === TOURNAMENT_STATUS.INITIALIZING || this.props.tournamentStatus === TOURNAMENT_STATUS.OPENING) && (this.state.twoPhase === true && this.state.selectedCompetitionFormatPhase2 != null && (this.state.selectedCompetitionFormatPhase2 as IParams).value !== 2 && ((this.state.selectedCompetitionFormatPhase2 as IParams).value === 3 ?
                  <tr>
                    <td></td>
                    <td>
                      <label className="Checkbox-label">
                        <input
                          type="checkbox"
                          checked={this.state.homeWayPhase2}
                          onChange={this.onChangeHomeWayPhase2}
                        />
                      Chơi lượt đi lượt về vòng chung kết
                    </label>
                    </td>
                  </tr>
                  : <tr>
                    <td></td>
                    <td>
                      <label className="Checkbox-label">
                        <input
                          type="checkbox"
                          checked={this.state.homeWayPhase2}
                          onChange={this.onChangeHomeWayPhase2}
                        />
                      Có trận tranh hạng 3 vòng chung kết
                    </label>
                    </td>
                  </tr>
                ))}
                {(this.props.tournamentStatus === TOURNAMENT_STATUS.INITIALIZING || this.props.tournamentStatus === TOURNAMENT_STATUS.OPENING) && this.state.twoPhase === true && <tr>
                  <td style={{ width: '225px', height: '80px' }}>{`Số set đấu tối đa 1 trận vòng chung kết: `}</td>
                  <td>
                    {this.state.selectedCompetitionFormatPhase2 != null &&
                      <Select
                        options={boOdd}
                        className="Select"
                        defaultValue={this.state.boPhase2}
                        value={this.state.boPhase2}
                        onChange={this.onChangeboPhase2}
                        menuPlacement={'top'}
                      />
                    }
                  </td>
                </tr>}
                <tr>
                  <td>Địa điểm khai mạc: </td>
                  <td style={{ paddingTop: '25px' }}><TextInput value={this.state.startLocation} label='Nhập địa điểm' error={this.state.startLocationError} errorContent={this.state.startLocationErrorContent} onChangeText={this.onChangeStartLocation} /></td>
                </tr>
                <tr>
                  <td>Thời gian khai mạc: </td>
                  <td>
                    <DatePicker
                      minDate={formatStringToDate(this.props.tournamentInfo.openingTime as string, 'yyyy-MM-dd HH:mm:ss')}
                      selected={this.state.startDate}
                      dateFormat="dd/MM/yyyy"
                      onChange={this.handleChangeStartDate}
                    />
                  </td>
                </tr>
                {this.state.startDateError === true && <tr>
                  <td></td>
                  <td style={{ color: 'red' }}>
                    {this.state.startDateErrorContent}
                  </td>
                </tr>}
                <tr>
                  <td>Địa điểm bế mạc: </td>
                  <td style={{ paddingTop: '25px' }}><TextInput value={this.state.endLocation} label='Nhập địa điểm' error={this.state.endLocationError} errorContent={this.state.endLocationErrorContent} onChangeText={this.onChangeEndLocation} /></td>
                </tr>
                <tr>
                  <td>Thời gian bế mạc: </td>
                  <td>
                    <DatePicker
                      minDate={formatStringToDate(this.props.tournamentInfo.closingTime as string, 'yyyy-MM-dd HH:mm:ss')}
                      selected={this.state.endDate}
                      dateFormat="dd/MM/yyyy"
                      onChange={this.handleChangeEndDate}
                    />
                  </td>
                </tr>
                {this.state.endDateError === true && <tr>
                  <td></td>
                  <td style={{ color: 'red' }}>
                    {this.state.endDateErrorContent}
                  </td>
                </tr>}
                <tr>
                  <td>Nhà tài trợ: </td>
                  <td style={{ paddingTop: '25px' }}><TextInput value={this.state.donor} label='Nhập tên nhà tài trợ' error={this.state.donorError} errorContent={this.state.donorErrorContent} onChangeText={this.onChangeDonor} /></td>
                </tr>
              </table>


              {/* 
              <div className={'TournamentSetting-listManager-container'}>
                <p>Tên giải:</p>
                <div className={'TournamentSetting-tounamentName-container-container'}>
                  <TextInput value={this.state.tournamentName} label='Nhập tên của giải' error={this.state.tournamentNameError} errorContent={this.state.tournamentNameErrorContent} onChangeText={this.onChangeTournamentName} />
                </div>
              </div>
              <div className={'TournamentSetting-listManager-container'}>
                <p>Tên ngắn:</p>
                <div className={'TournamentSetting-tounamentName-container-container'}>
                  <TextInput value={this.state.tournamentShortName} label='Nhập tên ngắn của giải' error={this.state.tournamentShortNameError} errorContent={this.state.tournamentShortNameErrorContent} onChangeText={this.onChangeTournamentShortName} />
                </div>
              </div>
              <div className={'TournamentSetting-listManager-container'}>
                <p>Bộ môn thi đấu:</p>
                <div className={'TournamentSetting-tounamentName-container-container'}>
                  {(sportOptions.length > 0 &&
                    <Select
                      options={sportOptions}
                      className="Select"
                      defaultValue={this.state.selectedSport}
                      value={this.state.selectedSport}
                      onChange={this.onChangeSport}
                      maxMenuHeight={140}
                    />)}
                </div>
              </div>
              <div className={'TournamentSetting-listManager-container'}>
                <p>Cách tổ chức giải:</p>
                <div className={'TournamentSetting-tounamentName-container-container'}>
                  <input type="radio" name="competitionType" onClick={this.OnChoose1} checked={this.state.onePhase} readOnly />
                  <label onClick={this.OnChoose1}>1 giai đoạn</label>
                  <input type="radio" name="competitionType" onClick={this.OnChoose2} checked={this.state.twoPhase} readOnly />
                  <label onClick={this.OnChoose2}>2 giai đoạn</label>
                </div>
              </div>
              <div className={'TournamentSetting-listManager-container'}>
                <p>{`Thể thức${this.state.onePhase === true ? '' : ' vòng bảng'}`}</p>
                <div className={'TournamentSetting-tounamentName-container-container'}>
                  <Select
                    options={competitionFormatOptions}
                    className="Select"
                    defaultValue={this.state.selectedCompetitionFormatPhase1}
                    value={this.state.selectedCompetitionFormatPhase1}
                    onChange={this.onChangeCompetitionFormatPhase1}
                    menuPlacement={'top'}
                  />
                </div>
              </div>
              <div className={'TournamentSetting-listManager-container'}>
                <div className={'TournamentSetting-tounamentName-container-container'}>
                  {(this.state.selectedCompetitionFormatPhase1 != null &&
                    (this.state.selectedCompetitionFormatPhase1 as IParams).value !== 2 &&
                    <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                      <div className="CompetitionInfo-info-item">
                        <label className="Checkbox-label">
                          <input
                            type="checkbox"
                            checked={this.state.homeWayPhase1}
                            onChange={this.onChangeHomeWayPhase1}
                          />
                          {`${(this.state.selectedCompetitionFormatPhase1 as IParams).value === 3 ? `${this.state.twoPhase === true ? 'Chơi lượt đi lượt về vòng bảng' : 'Chơi lượt đi lượt về'}` : `${this.state.twoPhase === true ? 'Có trận tranh hạng 3 vòng bảng' : 'Có trận tranh hạng 3'}`}`}
                        </label>
                      </div>
                    </div>)}
                </div>
              </div>
              {(this.state.twoPhase === true &&
                <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                  <div className="CompetitionInfo-info-item">
                    <TextInput
                      style={{ width: 250 }}
                      label={'Số đội trong 1 bảng (lớn hơn 1)'}
                      value={this.state.amountOfTeamsInAGroup as unknown as string}
                      onChangeText={this.onChangeAmountOfTeamsInAGroup}
                      error={this.state.amountOfTeamsInAGroupError}
                      errorContent={this.state.amountOfTeamsInAGroupErrorContent}
                      onBlur={this.onBlurAmountOfTeamsInAGroup}
                    />
                  </div>
                  <div className="CompetitionInfo-info-item">
                    <TextInput
                      style={{ width: 300 }}
                      label={'Số đội đi tiếp trong 1 bảng (lớn hơn 0)'}
                      value={this.state.amountOfTeamsGoOnInAGroup as unknown as string}
                      onChangeText={this.onChangeAmountOfTeamsGoOnInAGroup}
                      error={this.state.amountOfTeamsGoOnInAGroupError}
                      errorContent={this.state.amountOfTeamsGoOnInAGroupErrorContent}
                      onBlur={this.onBlurAmountOfTeamsGoOnInAGroup}
                    />
                  </div>
                </div>)}
              {this.state.twoPhase === true &&
                <div className={'TournamentSetting-listManager-container'}>
                  <p>Thể thức vòng chung kết:</p>
                  <div className={'TournamentSetting-tounamentName-container-container'}>
                    <Select
                      options={competitionFormatOptions}
                      className="Select"
                      defaultValue={this.state.selectedCompetitionFormatPhase2}
                      value={this.state.selectedCompetitionFormatPhase2}
                      onChange={this.onChangeCompetitionFormatPhase2}
                      menuPlacement={'top'}
                    />
                  </div>
                </div>}
              {(this.state.twoPhase === true && this.state.selectedCompetitionFormatPhase2 != null && (this.state.selectedCompetitionFormatPhase2 as IParams).value !== 2 && ((this.state.selectedCompetitionFormatPhase2 as IParams).value === 3 ?
                <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                  <div className="CompetitionInfo-info-item">
                    <label className="Checkbox-label">
                      <input
                        type="checkbox"
                        checked={this.state.homeWayPhase2}
                        onChange={this.onChangeHomeWayPhase2}
                      />
                      Chơi lượt đi lượt về vòng chung kết
                    </label>
                  </div>
                </div> : <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                  <div className="CompetitionInfo-info-item">
                    <label className="Checkbox-label">
                      <input
                        type="checkbox"
                        checked={this.state.homeWayPhase2}
                        onChange={this.onChangeHomeWayPhase2}
                      />
                      Có trận tranh hạng 3 vòng chung kết
                    </label>
                  </div>
                </div>))}
              <div className={'TournamentSetting-listManager-container'}>
                <p>Mô tả:</p>
                <div className={'TournamentSetting-tounamentName-container-container'}>
                  <TextInput value={this.state.description} label='Nhập mô tả' error={this.state.descriptionError} errorContent={this.state.descriptionErrorContent} onChangeText={this.onChangeDescription} />
                </div>
              </div>
              <div className={'TournamentSetting-listManager-container'}>
                <p>Địa điểm khai mạc:</p>
                <div className={'TournamentSetting-tounamentName-container-container'}>
                  <TextInput value={this.state.startLocation} label='Nhập địa điểm' error={this.state.startLocationError} errorContent={this.state.startLocationErrorContent} onChangeText={this.onChangeStartLocation} />
                </div>
              </div>
              <div className={'TournamentSetting-listManager-container TournamentSetting-listManager-container1'}>
                <p className="UserInfo-otherInfo-text">Ngày khai mạc: </p>
                <DatePicker
                  selected={this.state.startDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={this.handleChangeStartDate}
                />
              </div>
              <div className={'TournamentSetting-listManager-container'}>
                <p>Địa điểm bế mạc:</p>
                <div className={'TournamentSetting-tounamentName-container-container'}>
                  <TextInput value={this.state.endLocation} label='Nhập địa điểm' error={this.state.endLocationError} errorContent={this.state.endLocationErrorContent} onChangeText={this.onChangeEndLocation} />
                </div>
              </div>
              <div className={'TournamentSetting-listManager-container TournamentSetting-listManager-container1'}>
                <p className="UserInfo-otherInfo-text">Ngày bế mạc: </p>
                <DatePicker
                  selected={this.state.endDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={this.handleChangeEndDate}
                />
              </div>
              <div className={'TournamentSetting-listManager-container TournamentSetting-listManager-container1'}>
                <p className="UserInfo-otherInfo-text">Ngày mở form đăng ký: </p>
                <DatePicker
                  selected={this.state.startFormDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={this.handleChangeStartFormDate}
                  maxDate={this.state.startDate}
                />
              </div>
              <div className={'TournamentSetting-listManager-container TournamentSetting-listManager-container1'}>
                <p className="UserInfo-otherInfo-text">Ngày đóng form đăng ký: </p>
                <DatePicker
                  selected={this.state.endFormDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={this.handleChangeEndFormDate}
                  maxDate={this.state.startDate}
                />
              </div>
              <div className={'TournamentSetting-listManager-container'}>
                <p>Nhà tài trợ:</p>
                <div className={'TournamentSetting-tounamentName-container-container'}>
                  <TextInput value={this.state.donor} label='Nhập tên nhà tài trợ' error={this.state.donorError} errorContent={this.state.donorErrorContent} onChangeText={this.onChangeDonor} />
                </div>
              </div> */}



            </div>
            <div className="TournamentSetting-competition-container">
              <div className="TournamentSetting-button-container">
                <div className="TournamentSetting-button" onClick={this.handleSave}>
                  <h4 className="TournamentSetting-button-text">Lưu cài đặt</h4>
                </div>
              </div>
            </div>
          </div>
        </ReduxBlockUi>
      </ReduxBlockUi>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    isUsernameExisted: state.isUsernameExisted,
    allSports: state.allSports,
    groupStageSetting: state.groupStageSetting,
    finalStageSetting: state.finalStageSetting,
    allFormats: state.allFormats,
    bracketBoardInfo: state.bracketBoardInfo,
  };
};

export default connect(
  mapStateToProps,
  { queryBracketBoardInfo, editGroupStageSetting, editFinalStageSetting, queryFinalStageSetting, queryGroupStageSetting, queryAllSports, queryAllFormats, checkUsernameExisted, setUsernameExistedDefault, editTournamentInfo }
)(TournamentSetting);