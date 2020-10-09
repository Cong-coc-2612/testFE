import React from 'react';
import { connect } from 'react-redux';
import { isAfter, isBefore } from 'date-fns';
import ReduxBlockUi from 'react-block-ui/redux';
import Select, { ValueType, OptionTypeBase } from 'react-select';
import 'react-block-ui/style.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from 'components/TextInput';
import { IState } from 'redux-saga/reducers';
import { IBigRequest, IParams } from 'interfaces/common';
import { COOKIES_TYPE } from 'global';
import { cookies } from 'utils/cookies';
import { formatDateToString } from 'utils/datetime';
import {
  queryAllFormats,
  queryAllSports
} from 'screens/CompetitionInfo/actions';
import {
  createAFinalStageSetting,
  createAGroupStageSetting
} from 'components/CompetitionsSetting/actions';
import { createNewTournament } from './actions';
import './styles.css';
import { CREATE_NEW_TOURNAMENT } from 'redux-saga/actions';
import { CREATE_NEW_TOURNAMENT_FAILED, CREATE_NEW_TOURNAMENT_SUCCESS } from './reducers';
import config from 'config';

interface ICreateNewTournamentProps extends React.ClassAttributes<CreateNewTournament> {
  allSports: IParams[];
  allFormats: IParams[];
  newTournament: IParams | null;

  createNewTournament(param: IBigRequest): void;
  createAFinalStageSetting(param: IBigRequest): void;
  createAGroupStageSetting(param: IBigRequest): void;
  queryAllSports(): void;
  queryAllFormats(): void;
}

interface ICreateNewTournamentState {
  tournamentName: string;
  tournamentNameError: boolean;
  tournamentNameErrorContent: string;
  tournamentShortName: string;
  tournamentShortNameError: boolean;
  tournamentShortNameErrorContent: string;
  tournamentDescription: string;
  tournamentDescriptionError: boolean;
  tournamentDescriptionErrorContent: string;
  tournamentStartLocation: string;
  tournamentStartLocationError: boolean;
  tournamentStartLocationErrorContent: string;
  tournamentEndLocation: string;
  tournamentEndLocationError: boolean;
  tournamentEndLocationErrorContent: string;
  amountOfTeamsInAGroup: number;
  amountOfTeamsInAGroupError: boolean;
  amountOfTeamsInAGroupErrorContent: string;
  donor: string;
  donorError: boolean;
  donorErrorContent: string;
  startDate: Date;
  selectedSport: ValueType<OptionTypeBase>;
  endDate: Date;
  startDateError: boolean;
  endDateError: boolean;
  endDateErrorContent: string;
  startDateErrorContent: string;
  onePhase: boolean;
  twoPhase: boolean;
  boPhase1: ValueType<OptionTypeBase>;
  boPhase2: ValueType<OptionTypeBase>;
  competitionFormatError: boolean;
  competitionFormatErrorContent: string;
  selectedCompetitionFormatPhase1: ValueType<OptionTypeBase>;
  selectedCompetitionFormatPhase2: ValueType<OptionTypeBase>;
  homeWayPhase2: boolean;
  homeWayPhase1: boolean;
  amountOfTeamsGoOnInAGroup: number;
  amountOfTeamsGoOnInAGroupError: boolean;
  amountOfTeamsGoOnInAGroupErrorContent: string;
  // win1: number;
  // win1Error: boolean;
  // win1ErrorContent: string;
  // draw1: number;
  // draw1Error: boolean;
  // draw1ErrorContent: string;
  // lose1: number;
  // lose1Error: boolean;
  // lose1ErrorContent: string;
  // win2: number;
  // win2Error: boolean;
  // win2ErrorContent: string;
  // draw2: number;
  // draw2Error: boolean;
  // draw2ErrorContent: string;
  // lose2: number;
  // lose2Error: boolean;
  // lose2ErrorContent: string;
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
  { value: 3, label: '3' },
  { value: 5, label: '5' },
  { value: 7, label: '7' },
];

class CreateNewTournament extends React.Component<ICreateNewTournamentProps, ICreateNewTournamentState> {
  constructor(props: ICreateNewTournamentProps) {
    super(props);
    this.state = {
      tournamentName: '',
      tournamentNameError: false,
      tournamentNameErrorContent: '',
      tournamentShortName: '',
      tournamentShortNameError: false,
      competitionFormatError: false,
      competitionFormatErrorContent: '',
      tournamentShortNameErrorContent: '',
      tournamentDescription: '',
      tournamentDescriptionError: false,
      tournamentDescriptionErrorContent: '',
      tournamentStartLocation: '',
      tournamentStartLocationError: false,
      tournamentStartLocationErrorContent: '',
      tournamentEndLocation: '',
      tournamentEndLocationError: false,
      tournamentEndLocationErrorContent: '',
      selectedCompetitionFormatPhase1: { value: -1, label: '' },
      selectedCompetitionFormatPhase2: { value: -1, label: '' },
      amountOfTeamsInAGroup: 3,
      amountOfTeamsInAGroupError: false,
      amountOfTeamsInAGroupErrorContent: '',
      amountOfTeamsGoOnInAGroup: 1,
      amountOfTeamsGoOnInAGroupError: false,
      amountOfTeamsGoOnInAGroupErrorContent: '',
      donor: '',
      onePhase: true,
      twoPhase: false,
      donorError: false,
      donorErrorContent: '',
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0),
      endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59, 0),
      startDateError: false,
      endDateError: false,
      endDateErrorContent: '',
      startDateErrorContent: '',
      selectedSport: null,
      homeWayPhase2: false,
      homeWayPhase1: false,
      boPhase1: { value: 1, label: '1' },
      boPhase2: { value: 1, label: '1' },
      // win1: 3,
      // win1Error: false,
      // win1ErrorContent: '',
      // draw1: 1,
      // draw1Error: false,
      // draw1ErrorContent: '',
      // lose1: 0,
      // lose1Error: false,
      // lose1ErrorContent: '',
      // win2: 3,
      // win2Error: false,
      // win2ErrorContent: '',
      // draw2: 1,
      // draw2Error: false,
      // draw2ErrorContent: '',
      // lose2: 0,
      // lose2Error: false,
      // lose2ErrorContent: '',
    };
  }

  shouldComponentUpdate(nextProps: ICreateNewTournamentProps, nextState: ICreateNewTournamentState) {
    if (this.props.allSports !== nextProps.allSports) {
      sportOptions = [];
      nextProps.allSports.map((item, index) => sportOptions.push({ value: item.id, label: item.fullName }));
      if (nextProps.allSports.length > 0) {
        this.setState({
          selectedSport: { value: nextProps.allSports[0].id, label: nextProps.allSports[0].fullName },
        });
      }
    }
    if (this.props.allFormats !== nextProps.allFormats) {
      competitionFormatOptions = [];
      competitionFormatOptions2 = [];
      nextProps.allFormats.map((item, index) => competitionFormatOptions.push({ value: item.id, label: item.description }));
      nextProps.allFormats.map((item, index) => item.name !== 'Round Robin' && competitionFormatOptions2.push({ value: item.id, label: item.description }));
      if (nextProps.allFormats.length > 0) {
        this.setState({
          selectedCompetitionFormatPhase1: { value: nextProps.allFormats[0].id, label: nextProps.allFormats[0].description },
          selectedCompetitionFormatPhase2: { value: nextProps.allFormats[0].id, label: nextProps.allFormats[0].description },
        });
      }
    }
    if (this.state.selectedCompetitionFormatPhase1 !== nextState.selectedCompetitionFormatPhase1) {
      this.setState({
        boPhase1: { value: 1, label: '1' },
      });
    }
    if (this.state.selectedCompetitionFormatPhase2 !== nextState.selectedCompetitionFormatPhase2) {
      this.setState({
        boPhase2: { value: 1, label: '1' },
      });
    }
    if (this.state.twoPhase !== nextState.twoPhase && nextState.twoPhase === true) {
      this.setState({
        selectedCompetitionFormatPhase1: { value: 3, label: 'Vòng tròn tính điểm' },
      });
    }
    return true;
  }

  componentDidMount() {
    this.requestData();
  }

  private requestData = () => {
    this.props.queryAllSports();
    this.props.queryAllFormats();
  }

  private onChangeTournamentname = (value: string) => {
    this.setState({ tournamentName: value, });
  }

  private onChangeTournamentShortName = (value: string) => {
    this.setState({ tournamentShortName: value, });
  }

  private onChangeTournamentDescription = (value: string) => {
    this.setState({ tournamentDescription: value, });
  }

  private onChangeTournamentDonor = (value: string) => {
    this.setState({ donor: value, });
  }

  private onChangeTournamentStartLocation = (value: string) => {
    this.setState({ tournamentStartLocation: value, });
  }

  private onChangeTournamentEndLocation = (value: string) => {
    this.setState({ tournamentEndLocation: value, });
  }

  private onChangeCompetitionFormatPhase1 = (value: ValueType<OptionTypeBase>) => {
    this.setState({
      selectedCompetitionFormatPhase1: value,
    });
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

  private onChangeCompetitionFormatPhase2 = (value: ValueType<OptionTypeBase>) => {
    this.setState({
      selectedCompetitionFormatPhase2: value,
    });
  }

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

  private handleChangeStartDate = (value: Date) => {
    // console.log('this.state.startDate.getDate', this.state.startDate.setHours(0,0,0,0));
    if (isAfter(value, this.state.endDate)) {
      this.setState({
        startDate: value,
        startDateError: true,
        startDateErrorContent: 'Ngày khai mạc không thể diễn ra sau ngày bế mạc',
        endDateError: true,
        endDateErrorContent: 'Ngày bế mạc không thể diễn ra trước ngày khai mạc',
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

  private validate = () => {
    let tournamentStartLocationError = false;
    let tournamentStartLocationErrorContent = '';
    let tournamentEndLocationError = false;
    let tournamentEndLocationErrorContent = '';
    let donorError = false;
    let donorErrorContent = '';
    let tournamentNameError = false;
    let tournamentNameErrorContent = '';
    let tournamentShortNameErrorContent = '';
    let tournamentShortNameError = false;
    let competitionFormatError = false;
    let competitionFormatErrorContent = '';
    let tournamentDescriptionError = false;
    let tournamentDescriptionErrorContent = '';
    let endDateErrorContent = '';
    let startDateErrorContent = '';
    let endDateError = false;
    let startDateError = false;
    if (this.state.tournamentName.trim() === '' || !config.regex.tournamentName.test(this.state.tournamentName)) {
      tournamentNameError = true;
      tournamentNameErrorContent = 'Tên giải không được trống, không chứa ký tự đặc biệt và không quá 100 ký tự';
    }
    if (this.state.tournamentShortName.trim() === '' || !config.regex.tournamentShortName.test(this.state.tournamentShortName)) {
      tournamentShortNameError = true;
      tournamentShortNameErrorContent = 'Tên ngắn giải không được trống, không chứa ký tự đặc biệt và không quá 30 ký tự';
    }
    if (!config.regex.description.test(this.state.tournamentDescription)) {
      tournamentDescriptionError = true;
      tournamentDescriptionErrorContent = 'Mô tả không quá 200 ký tự';
    }
    if (isBefore(this.state.endDate, this.state.startDate)) {
      startDateError = true;
      startDateErrorContent = 'Ngày khai mạc không thể diễn ra sau ngày bế mạc';
      endDateError = true;
      endDateErrorContent = 'Ngày bế mạc không thể diễn ra trước ngày khai mạc';
    }
    if (this.state.selectedCompetitionFormatPhase1 == null || (this.state.twoPhase && this.state.selectedCompetitionFormatPhase2 == null)) {
      competitionFormatError = true;
      competitionFormatErrorContent = 'Thể thức không được trống';
    }
    if (!config.regex.address.test(this.state.tournamentStartLocation)) {
      tournamentStartLocationError = true;
      tournamentStartLocationErrorContent = 'Nơi khai mạc không quá 100 kí tự';
    }
    if (!config.regex.address.test(this.state.tournamentEndLocation)) {
      tournamentEndLocationError = true;
      tournamentEndLocationErrorContent = 'Nơi bế mạc không quá 100 kí tự';
    }
    if (!config.regex.address.test(this.state.donor)) {
      donorError = true;
      donorErrorContent = 'Nơi bế mạc không quá 100 kí tự';
    }

    return { donorError, donorErrorContent, tournamentEndLocationError, tournamentEndLocationErrorContent, tournamentStartLocationError, tournamentStartLocationErrorContent, tournamentDescriptionErrorContent, tournamentDescriptionError, competitionFormatError, competitionFormatErrorContent, endDateErrorContent, endDateError, startDateErrorContent, startDateError, tournamentNameError, tournamentNameErrorContent, tournamentShortNameErrorContent, tournamentShortNameError };
  }

  private handleCreateNewTournament = () => {
    const { donorError, donorErrorContent, tournamentEndLocationError, tournamentEndLocationErrorContent, tournamentStartLocationError, tournamentStartLocationErrorContent, tournamentDescriptionErrorContent, tournamentDescriptionError, competitionFormatError, competitionFormatErrorContent, tournamentNameError, tournamentNameErrorContent, tournamentShortNameErrorContent, tournamentShortNameError, endDateErrorContent, endDateError, startDateErrorContent, startDateError } = this.validate();
    const { amountOfTeamsGoOnInAGroupError, amountOfTeamsGoOnInAGroupErrorContent } = this.validateAmountOfTeamsGoOnInAGroup();
    const { amountOfTeamsInAGroupError, amountOfTeamsInAGroupErrorContent } = this.validateAmountOfTeamsInAGroup();
    this.setState({
      tournamentNameError,
      tournamentNameErrorContent,
      tournamentShortNameErrorContent,
      tournamentShortNameError,
      endDateErrorContent,
      endDateError,
      startDateErrorContent,
      startDateError,
      competitionFormatError,
      competitionFormatErrorContent,
      amountOfTeamsGoOnInAGroupError,
      amountOfTeamsGoOnInAGroupErrorContent,
      amountOfTeamsInAGroupError,
      amountOfTeamsInAGroupErrorContent,
      tournamentDescriptionErrorContent,
      tournamentDescriptionError,
      tournamentStartLocationError,
      tournamentStartLocationErrorContent,
      tournamentEndLocationError,
      tournamentEndLocationErrorContent,
      donorError,
      donorErrorContent
    });
    if (donorError === true || tournamentEndLocationError === true || tournamentStartLocationError === true || tournamentDescriptionError === true || amountOfTeamsGoOnInAGroupError === true || amountOfTeamsInAGroupError === true || competitionFormatError === true || tournamentNameError === true || tournamentShortNameError === true || endDateError === true || startDateError === true) {
      return;
    }
    const params = {
      path: '',
      param: {},
      data: {
        fullName: this.state.tournamentName,
        shortName: this.state.tournamentShortName,
        description: this.state.tournamentDescription,
        creatorId: cookies.get(COOKIES_TYPE.AUTH_TOKEN).User.id,
        openingLocation: this.state.tournamentStartLocation,
        openingTime: formatDateToString(this.state.startDate, 'yyyy-MM-dd HH:mm:ss'),
        closingLocation: this.state.tournamentEndLocation,
        closingTime: formatDateToString(this.state.endDate, 'yyyy-MM-dd HH:mm:ss'),
        donor: this.state.donor,
        hasGroupStage: this.state.twoPhase === true,
        sportId: (this.state.selectedSport as IParams).value,
        format1: (this.state.selectedCompetitionFormatPhase1 as IParams).value,
        format2: (this.state.selectedCompetitionFormatPhase2 as IParams).value,
        homeWay1: this.state.homeWayPhase1,
        homeWay2: this.state.homeWayPhase2,
        boPhase1: (this.state.boPhase1 as IParams).value,
        boPhase2: (this.state.boPhase2 as IParams).value,
        team1Group: this.state.amountOfTeamsInAGroup,
        teamGoOn1Group: this.state.amountOfTeamsGoOnInAGroup,
      },
    };
    this.props.createNewTournament(params);
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

  private onChangeSport = (value: ValueType<OptionTypeBase>) => {
    this.setState({
      selectedSport: value,
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

  private validateAmountOfTeamsGoOnInAGroup = () => {
    let amountOfTeamsGoOnInAGroupError = false;
    let amountOfTeamsGoOnInAGroupErrorContent = '';
    if (this.state.amountOfTeamsGoOnInAGroup < 1 || this.state.amountOfTeamsGoOnInAGroup >= this.state.amountOfTeamsInAGroup) {
      amountOfTeamsGoOnInAGroupError = true;
      amountOfTeamsGoOnInAGroupErrorContent = 'Số đội đi tiếp trong 1 bảng phải lớn hơn 0 và nhỏ hơn số đội tối đa';
    }

    return { amountOfTeamsGoOnInAGroupError, amountOfTeamsGoOnInAGroupErrorContent };
  }

  private validateAmountOfTeamsInAGroup = () => {
    let amountOfTeamsInAGroupError = false;
    let amountOfTeamsInAGroupErrorContent = '';
    if (this.state.amountOfTeamsInAGroup < 3) {
      amountOfTeamsInAGroupError = true;
      amountOfTeamsInAGroupErrorContent = 'Số đội tối đa trong 1 bảng phải lớn hơn 2';
    }

    return { amountOfTeamsInAGroupError, amountOfTeamsInAGroupErrorContent };
  }

  render() {
    return (
      <ReduxBlockUi
        tag="div"
        block={CREATE_NEW_TOURNAMENT}
        unblock={[CREATE_NEW_TOURNAMENT_SUCCESS, CREATE_NEW_TOURNAMENT_FAILED]}
      >
        <div className="CreateNewTournament-container">
          <div className="CreateNewTournament-tournament-container">
            <p className="CreateNewTournament-header-text">Tạo mới giải đấu</p>
            <table>
              <tr>
                <td>Tên giải: </td>
                <td style={{ paddingTop: '25px' }}><TextInput label='' error={this.state.tournamentNameError} errorContent={this.state.tournamentNameErrorContent} onChangeText={this.onChangeTournamentname} /></td>
              </tr>
              <tr>
                <td>Tên viết tắt của giải: </td>
                <td style={{ paddingTop: '25px' }}><TextInput label='' error={this.state.tournamentShortNameError} errorContent={this.state.tournamentShortNameErrorContent} onChangeText={this.onChangeTournamentShortName} /></td>
              </tr>
              <tr>
                <td>Mô tả: </td>
                <td style={{ paddingTop: '25px' }}><TextInput label='' error={this.state.tournamentDescriptionError} errorContent={this.state.tournamentDescriptionErrorContent} onChangeText={this.onChangeTournamentDescription} /></td>
              </tr>
              <tr>
                <td>Bộ môn: </td>
                <td style={{ height: '80px' }}>
                  <Select
                    options={sportOptions}
                    className="Select"
                    defaultValue={this.state.selectedSport}
                    value={this.state.selectedSport}
                    onChange={this.onChangeSport}
                    maxMenuHeight={140}
                  />
                </td>
              </tr>
              <tr>
                <td>Cách tổ chức giải: </td>
                <td>
                  <input type="radio" name="competitionType" onClick={this.OnChoose1} checked={this.state.onePhase} readOnly />
                  <label onClick={this.OnChoose1}>1 giai đoạn</label>
                  <input type="radio" name="competitionType" onClick={this.OnChoose2} checked={this.state.twoPhase} readOnly />
                  <label onClick={this.OnChoose2}>2 giai đoạn</label>
                </td>
              </tr>
              <tr>
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
              </tr>
              <tr>
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
              </tr>
              {/* <tr>
                <td style={{ width: '225px', height: '80px' }}>{`Cách tính điểm${this.state.onePhase === true ? ': ' : ' vòng bảng: '}`}</td>
                <td>
                </td>
              </tr> */}
              {/* <tr>
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
              {(this.state.selectedCompetitionFormatPhase1 != null &&
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
              {(this.state.twoPhase === true &&
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
              {(this.state.twoPhase === true &&
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
              {(this.state.twoPhase === true &&
                <tr>
                  <td>Thể thức vòng chung kết</td>
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
              </tr>)} */}
              {/* {(this.state.twoPhase === true && <tr>
                <td>Thắng</td>
                <td style={{ paddingTop: '25px' }}>
                  <TextInput value={this.state.win2 as unknown as string} style={{ width: '100px' }} label='' error={this.state.win2Error} errorContent={this.state.win2ErrorContent} onChangeText={this.onChangeWin2} />
                </td>
              </tr>)}
              {(this.state.twoPhase === true && <tr>
                <td>Thua</td>
                <td style={{ paddingTop: '25px' }}>
                  <TextInput value={this.state.lose2 as unknown as string} style={{ width: '100px' }} label='' error={this.state.lose2Error} errorContent={this.state.lose2ErrorContent} onChangeText={this.onChangeLose2} />
                </td>
              </tr>)} */}
              {(this.state.twoPhase === true && (this.state.selectedCompetitionFormatPhase2 as IParams).value !== 2 && ((this.state.selectedCompetitionFormatPhase2 as IParams).value === 3 ?
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
              {this.state.twoPhase === true && <tr>
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
                <td style={{ paddingTop: '25px' }}><TextInput label='' error={this.state.tournamentStartLocationError} errorContent={this.state.tournamentStartLocationErrorContent} onChangeText={this.onChangeTournamentStartLocation} /></td>
              </tr>
              <tr>
                <td>Thời gian khai mạc: </td>
                <td>
                  <DatePicker
                    selected={this.state.startDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={this.handleChangeStartDate}
                    minDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0)}
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
                <td style={{ paddingTop: '25px' }}><TextInput label='' error={this.state.tournamentEndLocationError} errorContent={this.state.tournamentEndLocationErrorContent} onChangeText={this.onChangeTournamentEndLocation} /></td>
              </tr>
              <tr>
                <td>Thời gian bế mạc: </td>
                <td>
                  <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleChangeEndDate}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59, 0)}
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
                <td style={{ paddingTop: '25px' }}><TextInput label='' error={this.state.donorError} errorContent={this.state.donorErrorContent} onChangeText={this.onChangeTournamentDonor} /></td>
              </tr>
            </table>
            <div className="CreateNewTournament-button-container">
              <div className="CreateNewTournament-button" onClick={this.handleCreateNewTournament}>
                <h4 className="CreateNewTournament-button-text">Tạo mới</h4>
              </div>
            </div>
            {/* <div className={'CreateNewTournament-listManager-container'}>
            <p>Tên giải:</p>
            <div className={'CreateNewTournament-tounamentName-container-container'}>
              <TextInput label='Nhập tên của giải' error={this.state.tournamentNameError} errorContent={this.state.tournamentNameErrorContent} onChangeText={this.onChangeTournamentname} />
            </div>
          </div>
          <div className={'CreateNewTournament-listManager-container'}>
            <p>Tên ngắn:</p>
            <div className={'CreateNewTournament-tounamentName-container-container'}>
              <TextInput label='Nhập tên ngắn của giải' error={this.state.tournamentShortNameError} errorContent={this.state.tournamentShortNameErrorContent} onChangeText={this.onChangeTournamentShortName} />
            </div>
          </div>
          <div className={'CreateNewTournament-listManager-container'}>
            <p>Mô tả:</p>
            <div className={'CreateNewTournament-tounamentName-container-container'}>
              <TextInput label='Nhập mô tả' error={this.state.tournamentDescriptionError} errorContent={this.state.tournamentDescriptionErrorContent} onChangeText={this.onChangeTournamentDescription} />
            </div>
          </div>
          <div className={'CreateNewTournament-listManager-container'}>
            <p>Địa điểm khai mạc:</p>
            <div className={'CreateNewTournament-tounamentName-container-container'}>
              <TextInput label='' error={this.state.tournamentStartLocationError} errorContent={this.state.tournamentStartLocationErrorContent} onChangeText={this.onChangeTournamentStartLocation} />
            </div>
          </div>
          <div className={'CreateNewTournament-listManager-container'}>
            <p>Thời gian khai mạc:</p>
            <div className={'CreateNewTournament-tounamentName-container-container'}>
              <DatePicker
                selected={this.state.startDate}
                dateFormat="dd/MM/yyyy"
                onChange={this.handleChangeStartDate}
              />
            </div>
          </div>
          <div className={'CreateNewTournament-listManager-container'}>
            <p>Địa điểm bế mạc:</p>
            <div className={'CreateNewTournament-tounamentName-container-container'}>
              <TextInput label='' error={this.state.tournamentEndLocationError} errorContent={this.state.tournamentEndLocationErrorContent} onChangeText={this.onChangeTournamentEndLocation} />
            </div>
          </div>
          <div className={'CreateNewTournament-listManager-container'}>
            <p>Thời gian bế mạc:</p>
            <div className={'CreateNewTournament-tounamentName-container-container'}>
              <DatePicker
                selected={this.state.endDate}
                onChange={this.handleChangeEndDate}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
          <div className={'CreateNewTournament-listManager-container'}>
            <p>Nhà tài trợ:</p>
            <div className={'CreateNewTournament-tounamentName-container-container'}>
              <TextInput label='' error={this.state.donorError} errorContent={this.state.donorErrorContent} onChangeText={this.onChangeTournamentDonor} />
            </div>
          </div>
          <div className="CreateNewTournament-button-container">
            <div className="CreateNewTournament-button" onClick={this.handleCreateNewTournament}>
              <h4 className="CreateNewTournament-button-text">Tạo mới</h4>
            </div>
          </div> */}
          </div>
        </div>
      </ReduxBlockUi>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    allSports: state.allSports,
    allFormats: state.allFormats,
    newTournament: state.newTournament,
  };
};

export default connect(
  mapStateToProps,
  {
    createNewTournament,
    queryAllSports,
    queryAllFormats,
    createAFinalStageSetting,
    createAGroupStageSetting
  }
)(CreateNewTournament);