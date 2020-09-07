import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Styles } from 'react-modal';
import Skeleton from 'react-loading-skeleton';
import ReduxBlockUi from 'react-block-ui/redux';
import { RouteComponentProps } from 'react-router-dom';
import * as H from 'history';
import { StaticContext } from 'react-router';
import Select, { ValueType, OptionTypeBase } from 'react-select';
import { IState } from 'redux-saga/reducers';
import {
  editGroupStageSetting,
  editFinalStageSetting,
  editCompetition,
  queryAllFormats,
  queryCompetition,
  queryAllSports,
  querySportInfo,
  queryFinalStageSetting,
  queryGroupStageSetting,
  updateSchedule,
} from './actions';
import './styles.css';
import CustomModal from 'components/CustomModal';
import TextInput from 'components/TextInput';
import { IBigRequest, IParams } from 'interfaces/common';
import CustomTab from 'components/CustomTab';
import Player from 'components/Player';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { queryAllCompetitionsByTournamentId } from 'components/CompetitionsSetting/actions';
import BracketBoard from 'components/BracketBoard';
import Teams from 'components/Teams';
import BracketSchedule from 'components/BracketSchedule';
import BracketRank from 'components/BracketRank';
import PendingTeams from 'components/PendingTeams';
import { queryTournamentInfo, reportViolation, registTeam } from 'screens/TournamentInfo/actions';
import { cookies } from 'utils/cookies';
import { REPORT_VIOLATION } from 'redux-saga/actions';
import { queryBracketBoardInfo } from 'components/BracketBoard/actions';
import { REPORT_VIOLATION_SUCCESS, REPORT_VIOLATION_FAILED } from 'screens/TournamentInfo/reducers';
import { COOKIES_TYPE, TOURNAMENT_STATUS } from 'global';
import config from 'config';
import { formatTournamentStatus } from 'utils/common';

interface ICompetitionInfoProps extends React.ClassAttributes<CompetitionInfo> {
  routerInfo: RouteComponentProps<any, StaticContext, H.LocationState>;
  competitionInfo: IParams | null;
  tournamentInfo: IParams | null;
  finalStageSetting: IParams | null;
  groupStageSetting: IParams | null;
  currentUserInfo: IParams | null;
  allSports: IParams[];
  allFormats: IParams[];
  sportInfo: IParams | null;
  allCompetitionByTournamentId: IParams[] | null;

  queryCompetition(params: IBigRequest): void;
  queryTournamentInfo(params: IBigRequest): void;
  querySportInfo(params: IBigRequest): void;
  queryFinalStageSetting(params: IBigRequest): void;
  queryGroupStageSetting(params: IBigRequest): void;
  editCompetition(params: IBigRequest): void;
  editFinalStageSetting(params: IBigRequest): void;
  editGroupStageSetting(params: IBigRequest): void;
  reportViolation(params: IBigRequest): void;
  queryAllCompetitionsByTournamentId(params: IBigRequest): void;
  updateSchedule(params: IBigRequest): void;
  queryBracketBoardInfo(params: IBigRequest): void;
  registTeam(params: IBigRequest): void;
  queryAllSports(): void;
  queryAllFormats(): void;
}

interface ICompetitionInfoState {
  showJoinModal: boolean;
  competitionFullName: string;
  competitionFullNameError: boolean;
  competitionFullNameErrorContent: string;
  teamNameInForm: string;
  teamNameInFormError: boolean;
  teamNameInFormErrorContent: string;
  playerNameInForm: string;
  playerNameInFormError: boolean;
  playerNameInFormErrorContent: string;
  playerEmailInForm: string;
  playerEmailInFormError: boolean;
  playerEmailInFormErrorContent: string;
  playerAgeInForm: number;
  teamShortNameInForm: string;
  teamShortNameInFormError: boolean;
  showReportModal: boolean;
  teamShortNameInFormErrorContent: string;
  listPlayerInForm: IParams[];
  playerGenderInForm: ValueType<OptionTypeBase>;
  onEditMode: boolean;
  selectedSport: ValueType<OptionTypeBase>;
  onePhase: boolean;
  twoPhase: boolean;
  selectedCompetitionFormatPhase1: ValueType<OptionTypeBase>;
  selectedCompetitionFormatPhase2: ValueType<OptionTypeBase>;
  homeWayPhase2: boolean;
  homeWayPhase1: boolean;
  amountOfTeamsInAGroup: number;
  amountOfTeamsInAGroupError: boolean;
  amountOfTeamsInAGroupErrorContent: string;
  amountOfTeamsGoOnInAGroup: number;
  amountOfTeamsGoOnInAGroupError: boolean;
  amountOfTeamsGoOnInAGroupErrorContent: string;
  subjectForm: string;
  detailReportForm: string;
  subjectFormError: boolean;
  subjectFormErrorContent: string;
  detailReportFormError: boolean;
  detailReportFormErrorContent: string;
}

const customStyles: Styles = {
  content: {
    top: '5%',
    left: '15%',
    right: '15%',
    bottom: '5%',
    backgroundColor: '#2b303d',
    display: 'flex',
    flexDirection: 'column',
  },
  overlay: {
    zIndex: 100001,
  },
};

const customStyles2: Styles = {
  content: {
    top: '15%',
    left: '15%',
    right: '15%',
    bottom: '15%',
    backgroundColor: '#2b303d',
    display: 'flex',
    flexDirection: 'column',
  },
  overlay: {
    zIndex: 100001,
  },
};

const genderOptions = [
  { value: true, label: 'Nam' },
  { value: false, label: 'Nữ' },
];

let sportOptions: IParams[] = [];

let competitionFormatOptions: IParams[] = [];

class CompetitionInfo extends React.Component<ICompetitionInfoProps, ICompetitionInfoState> {
  private tabList: string[] = [''];
  private componentList: ReactNode[] = [<div></div>];

  constructor(props: ICompetitionInfoProps) {
    super(props);
    this.state = {
      showJoinModal: false,
      showReportModal: false,
      teamNameInForm: '',
      playerEmailInForm: '',
      teamNameInFormError: false,
      teamNameInFormErrorContent: '',
      playerNameInForm: '',
      playerAgeInForm: 0,
      playerGenderInForm: { value: true, label: 'Nam' },
      playerEmailInFormError: false,
      playerEmailInFormErrorContent: '',
      playerNameInFormError: false,
      playerNameInFormErrorContent: '',
      teamShortNameInForm: '',
      teamShortNameInFormError: false,
      onEditMode: false,
      teamShortNameInFormErrorContent: '',
      competitionFullName: '',
      competitionFullNameError: false,
      competitionFullNameErrorContent: '',
      selectedSport: null,
      onePhase: true,
      twoPhase: false,
      selectedCompetitionFormatPhase1: null,
      selectedCompetitionFormatPhase2: null,
      homeWayPhase2: false,
      homeWayPhase1: false,
      amountOfTeamsInAGroup: 2,
      amountOfTeamsInAGroupError: false,
      amountOfTeamsInAGroupErrorContent: '',
      amountOfTeamsGoOnInAGroup: 1,
      amountOfTeamsGoOnInAGroupError: false,
      amountOfTeamsGoOnInAGroupErrorContent: '',
      subjectForm: '',
      detailReportForm: '',
      subjectFormError: false,
      subjectFormErrorContent: '',
      detailReportFormError: false,
      detailReportFormErrorContent: '',
      listPlayerInForm: [],
    };
  }

  shouldComponentUpdate(nextProps: ICompetitionInfoProps, nextState: ICompetitionInfoState) {
    if (nextProps.competitionInfo !== this.props.competitionInfo && nextProps.competitionInfo != null && nextProps.competitionInfo.Competition != null && (nextProps.competitionInfo.Competition as unknown as IParams).tournamentId != null) {
      let params: IBigRequest = {
        path: '',
        param: {
          id: (nextProps.competitionInfo.Competition as unknown as IParams).tournamentId,
        },
        data: {},
      };
      this.props.queryTournamentInfo(params);
      params = {
        path: '',
        param: {
          tournamentId: (nextProps.competitionInfo.Competition as unknown as IParams).tournamentId,
          limit: 99,
        },
        data: {},
      };
      this.props.queryAllCompetitionsByTournamentId(params);
      params = {
        path: '',
        param: {
          id: (nextProps.competitionInfo.Competition as unknown as IParams).sportId,
        },
        data: {},
      };
      this.props.querySportInfo(params);
      params = {
        path: '',
        param: {
          competitionId: this.props.routerInfo.match.params.competitionId as number,
        },
        data: {},
      };
      this.props.queryFinalStageSetting(params);
      params = {
        path: '',
        param: {
          competitionId: this.props.routerInfo.match.params.competitionId as number,
        },
        data: {},
      };
      this.props.queryGroupStageSetting(params);
    }
    if (this.props.allSports !== nextProps.allSports) {
      sportOptions = [];
      nextProps.allSports.map((item, index) => sportOptions.push({ value: item.id, label: item.fullName }));
    }
    if (this.props.allFormats !== nextProps.allFormats) {
      competitionFormatOptions = [];
      nextProps.allFormats.map((item, index) => competitionFormatOptions.push({ value: item.id, label: item.description }));
    }
    if ((this.props.competitionInfo !== nextProps.competitionInfo || this.props.tournamentInfo !== nextProps.tournamentInfo) && nextProps.competitionInfo != null && nextProps.competitionInfo.Competition != null && nextProps.tournamentInfo != null && nextProps.tournamentInfo.Tournament != null) {
      if ((nextProps.competitionInfo.Competition as IParams).hasGroupStage === false) {
        if ((nextProps.competitionInfo.Config as IParams).canEdit !== true) {
          this.tabList = [
            'Nhánh thi đấu vòng chung kết',
            'Lịch thi đấu vòng chung kết',
            'BXH vòng chung kết',
            'Các đội tham gia'
          ];
          this.componentList = [
            <BracketBoard tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={true} />,
            <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={true} />,
            <BracketRank competitionId={this.props.routerInfo.match.params.competitionId} finalStage={true} />,
            <Teams tournamentStatus={''} competitionInfo={nextProps.competitionInfo} tournamentInfo={nextProps.tournamentInfo} id={(nextProps.competitionInfo.Competition as IParams).id as number} type={'competition'} />
          ];
        } else {
          if ((nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || (nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.OPENING) {
            this.tabList = [
              'Nhánh thi đấu vòng chung kết',
              'Lịch thi đấu vòng chung kết',
              'Các đội tham gia',
              'Các đội đang chờ phê duyệt'
            ];
            this.componentList = [
              <BracketBoard tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={true} />,
              <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={true} />,
              <Teams tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} competitionInfo={nextProps.competitionInfo} tournamentInfo={nextProps.tournamentInfo} id={(nextProps.competitionInfo.Competition as IParams).id as number} type={'competition'} />,
              <PendingTeams competitionInfo={nextProps.competitionInfo} tournamentInfo={nextProps.tournamentInfo} id={(nextProps.competitionInfo.Competition as IParams).id as number} type={'competition'} />
            ];
          } else {
            this.tabList = [
              'Nhánh thi đấu vòng chung kết',
              'Lịch thi đấu vòng chung kết',
              'BXH vòng chung kết',
              'Các đội tham gia'
            ];
            this.componentList = [
              <BracketBoard tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={true} />,
              <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={true} />,
              <BracketRank competitionId={this.props.routerInfo.match.params.competitionId} finalStage={true} />,
              <Teams tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} competitionInfo={nextProps.competitionInfo} tournamentInfo={nextProps.tournamentInfo} id={(nextProps.competitionInfo.Competition as IParams).id as number} type={'competition'} />
            ];
          }
        }
      } else {
        if ((nextProps.competitionInfo.Config as IParams).canEdit !== true) {
          if ((nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || (nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.OPENING) {
            this.tabList = [
              'Nhánh thi đấu vòng bảng',
              'Lịch thi đấu vòng bảng',
              'Nhánh thi đấu vòng chung kết',
              'Lịch thi đấu vòng chung kết',
              'Các đội tham gia'
            ];
            this.componentList = [
              <BracketBoard tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={false} />,
              <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={false} />,
              <BracketBoard tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={true} />,
              <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={true} />,
              <Teams tournamentStatus={''} competitionInfo={nextProps.competitionInfo} tournamentInfo={nextProps.tournamentInfo} id={(nextProps.competitionInfo.Competition as IParams).id as number} type={'competition'} />
            ];
          } else {
            this.tabList = [
              'Nhánh thi đấu vòng bảng',
              'Lịch thi đấu vòng bảng',
              'BXH vòng bảng',
              'Nhánh thi đấu vòng chung kết',
              'Lịch thi đấu vòng chung kết',
              'BXH vòng chung kết',
              'Các đội tham gia'
            ];
            this.componentList = [
              <BracketBoard tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={false} />,
              <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={false} />,
              <BracketRank competitionId={this.props.routerInfo.match.params.competitionId} finalStage={false} />,
              <BracketBoard tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={true} />,
              <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={true} />,
              <BracketRank competitionId={this.props.routerInfo.match.params.competitionId} finalStage={true} />,
              <Teams tournamentStatus={''} competitionInfo={nextProps.competitionInfo} tournamentInfo={nextProps.tournamentInfo} id={(nextProps.competitionInfo.Competition as IParams).id as number} type={'competition'} />
            ];
          }
        } else {
          if ((nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || (nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.OPENING) {
            this.tabList = [
              'Nhánh thi đấu vòng bảng',
              'Lịch thi đấu vòng bảng',
              'Nhánh thi đấu vòng chung kết',
              'Lịch thi đấu vòng chung kết',
              'Các đội tham gia',
              'Các đội đang chờ phê duyệt'
            ];
            this.componentList = [
              <BracketBoard tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={false} />,
              <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={false} />,
              <BracketBoard tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={true} />,
              <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={true} />,
              <Teams tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} competitionInfo={nextProps.competitionInfo} tournamentInfo={nextProps.tournamentInfo} id={(nextProps.competitionInfo.Competition as IParams).id as number} type={'competition'} />,
              <PendingTeams competitionInfo={nextProps.competitionInfo} tournamentInfo={nextProps.tournamentInfo} id={(nextProps.competitionInfo.Competition as IParams).id as number} type={'competition'} />
            ];
          } else {
            this.tabList = [
              'Nhánh thi đấu vòng bảng',
              'Lịch thi đấu vòng bảng',
              'BXH vòng bảng',
              'Nhánh thi đấu vòng chung kết',
              'Lịch thi đấu vòng chung kết',
              'BXH vòng chung kết',
              'Các đội tham gia'
            ];
            this.componentList = [
              <BracketBoard tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={false} />,
              <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={false} />,
              <BracketRank competitionId={this.props.routerInfo.match.params.competitionId} finalStage={false} />,
              <BracketBoard tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={true} />,
              <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} competitionId={this.props.routerInfo.match.params.competitionId} finalStage={true} />,
              <BracketRank competitionId={this.props.routerInfo.match.params.competitionId} finalStage={true} />,
              <Teams tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} competitionInfo={nextProps.competitionInfo} tournamentInfo={nextProps.tournamentInfo} id={(nextProps.competitionInfo.Competition as IParams).id as number} type={'competition'} />
            ];
          }
        }
      }
    }
    return true;
  }

  componentDidMount() {
    this.requestData();
  }

  private requestData = () => {
    const params = {
      path: '',
      param: {
        id: this.props.routerInfo.match.params.competitionId as number,
      },
      data: {},
    }
    this.props.queryCompetition(params);
    this.props.queryAllSports();
    this.props.queryAllFormats();
  }

  private handleCloseModal = () => {
    const confirm = window.confirm('Bạn có chắc chắn muốn hủy form đăng ký?');
    if (confirm === true) {
      this.setState({
        showJoinModal: false,
      });
    }
  };

  private validateForm = () => {
    let teamNameInFormError = false;
    let teamNameInFormErrorContent = '';
    let teamShortNameInFormErrorContent = '';
    let teamShortNameInFormError = false;
    if (this.state.teamNameInForm.trim() === '') {
      teamNameInFormError = true;
      teamNameInFormErrorContent = 'Tên đội không được trống';
    }
    if (this.state.teamShortNameInForm.trim() === '') {
      teamShortNameInFormError = true;
      teamShortNameInFormErrorContent = 'Tên ngắn đội không được trống';
    }

    return {
      teamNameInFormError,
      teamNameInFormErrorContent,
      teamShortNameInFormError,
      teamShortNameInFormErrorContent
    };
  }

  private validateAddPlayer = () => {
    let playerEmailInFormErrorContent = '';
    let playerEmailInFormError = false;
    let playerNameInFormErrorContent = '';
    let playerNameInFormError = false;
    if (this.state.playerNameInForm.trim() === '') {
      playerNameInFormError = true;
      playerNameInFormErrorContent = 'Tên người chơi không được trống';
    }
    if (!config.regex.email.test(this.state.playerEmailInForm)) {
      playerEmailInFormError = true;
      playerEmailInFormErrorContent = 'Email không hợp lệ';
    }

    return {
      playerEmailInFormError,
      playerEmailInFormErrorContent,
      playerNameInFormErrorContent,
      playerNameInFormError,
    };
  }

  private handleConfirmModal = () => {
    const {
      teamNameInFormError,
      teamNameInFormErrorContent,
      teamShortNameInFormError,
      teamShortNameInFormErrorContent
    } = this.validateForm();
    this.setState({
      teamNameInFormError,
      teamNameInFormErrorContent,
      teamShortNameInFormError,
      teamShortNameInFormErrorContent
    });
    if (teamNameInFormError === true || teamShortNameInFormError === true) {
      return;
    }
    const params = {
      path: '',
      param: {},
      data: {
        creatorId: this.props.currentUserInfo!.id,
        competitionId: this.props.routerInfo.match.params.competitionId as number,
        fullName: this.state.teamNameInForm,
        shortName: this.state.teamShortNameInForm,
        players: this.state.listPlayerInForm,
      },
    }
    this.props.registTeam(params);
  };

  private addPlayer = () => {
    const {
      playerEmailInFormError,
      playerEmailInFormErrorContent,
      playerNameInFormErrorContent,
      playerNameInFormError,
    } = this.validateAddPlayer();
    this.setState({
      playerEmailInFormError,
      playerEmailInFormErrorContent,
      playerNameInFormErrorContent,
      playerNameInFormError,
    });
    if (playerNameInFormError === true || playerEmailInFormError === true) {
      return;
    }
    const listTemp = this.state.listPlayerInForm;
    listTemp.push({
      name: this.state.playerNameInForm,
      age: this.state.playerAgeInForm,
      email: this.state.playerEmailInForm,
      gender: (this.state.playerGenderInForm as IParams).label,
    });
    this.setState({
      listPlayerInForm: listTemp,
      playerNameInForm: '',
      playerAgeInForm: 0,
      playerEmailInForm: '',
      playerGenderInForm: { value: true, label: 'Nam' },
    });
  }


  private onChangeTeamNameInForm = (value: string) => {
    this.setState({
      teamNameInForm: value,
    });
  }

  private onChangeTeamShortNameInForm = (value: string) => {
    this.setState({
      teamShortNameInForm: value,
    });
  }

  private onDeletePlayer = (indexx: number) => {
    this.setState({
      listPlayerInForm: this.state.listPlayerInForm.filter((item, index) => index !== indexx),
    });
  }

  private onChangePlayerNameInForm = (value: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      playerNameInForm: value.target.value,
    });
  }

  private onChangePlayerEmailInForm = (value: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      playerEmailInForm: value.target.value,
    });
  }

  private onChangePlayerGenderInForm = (value: ValueType<OptionTypeBase>) => {
    this.setState({ playerGenderInForm: value, });
  }

  private onChangePlayerAgeInForm = (value: React.ChangeEvent<HTMLInputElement>) => {
    let tempValue = 0;
    if (!isNaN(value.target.value as unknown as number)) {
      tempValue = Number(value.target.value);
    } else {
      tempValue = 0;
    }
    this.setState({
      playerAgeInForm: tempValue,
    });
  }

  private handleJoinTournament = () => {
    this.setState({
      showJoinModal: true,
    });
  };

  private onChangeCompetitionFullName = (value: string) => {
    this.setState({ competitionFullName: value, });
  }

  private onChangeSport = (value: ValueType<OptionTypeBase>) => {
    this.setState({
      selectedSport: value,
    });
  }

  private handleOpenEditCompetitionInfo = () => {
    this.setState({
      onEditMode: true,
      competitionFullName: (this.props.competitionInfo!.Competition as unknown as IParams).name != null ? (this.props.competitionInfo!.Competition as unknown as IParams).name as string : '',
      selectedSport: (this.props.competitionInfo!.Competition as unknown as IParams).sportId != null ?
        (sportOptions.find(element => element.value === (this.props.competitionInfo!.Competition as unknown as IParams).sportId) != null ?
          sportOptions.find(element => element.value === (this.props.competitionInfo!.Competition as unknown as IParams).sportId) as ValueType<OptionTypeBase> :
          null) :
        null,
      onePhase: (this.props.competitionInfo!.Competition as unknown as IParams).hasGroupStage === false,
      twoPhase: (this.props.competitionInfo!.Competition as unknown as IParams).hasGroupStage === true,
      selectedCompetitionFormatPhase1: this.props.finalStageSetting != null && this.props.groupStageSetting != null ? ((this.props.competitionInfo!.Competition as unknown as IParams).hasGroupStage === false ? competitionFormatOptions.find(element => element.value === this.props.finalStageSetting!.formatId) : competitionFormatOptions.find(element => element.value === this.props.groupStageSetting!.formatId)) : null,
      selectedCompetitionFormatPhase2: this.props.finalStageSetting != null ? (competitionFormatOptions.find(element => element.value === this.props.finalStageSetting!.formatId) as ValueType<OptionTypeBase>) : null,
      homeWayPhase1: this.props.finalStageSetting != null && this.props.groupStageSetting != null ? ((this.props.competitionInfo!.Competition as unknown as IParams).hasGroupStage === false ? this.props.finalStageSetting.hasHomeMatch as boolean : this.props.groupStageSetting.hasHomeMatch as boolean) : false,
      homeWayPhase2: this.props.finalStageSetting != null ? this.props.finalStageSetting.hasHomeMatch as boolean : false,
      amountOfTeamsInAGroup: this.props.groupStageSetting != null ? this.props.groupStageSetting.maxTeamPerTable as number : 2,
      amountOfTeamsGoOnInAGroup: this.props.groupStageSetting != null ? this.props.groupStageSetting.advanceTeamPerTable as number : 1,
    });
  }

  private validateCompetitionInfo = () => {
    let competitionFullNameError = false;
    let competitionFullNameErrorContent = '';
    if (this.state.competitionFullName.trim() === '') {
      competitionFullNameError = true;
      competitionFullNameErrorContent = 'Tên cuộc thi không được trống';
    }
    let tempList = this.props.allCompetitionByTournamentId!.slice(0);
    const tempList2 = tempList.filter(element => element.id !== (this.props.competitionInfo!.Competition as IParams).id)
    if (tempList2.find(element => element.name === this.state.competitionFullName) != null) {
      competitionFullNameError = true;
      competitionFullNameErrorContent = 'Tên cuộc thi này đã tồn tại';
    }

    return { competitionFullNameError, competitionFullNameErrorContent };
  }

  private handleCloseEditCompetitionInfo = () => {
    const { competitionFullNameError, competitionFullNameErrorContent } = this.validateCompetitionInfo();
    const { amountOfTeamsInAGroupError, amountOfTeamsInAGroupErrorContent } = this.validateAmountOfTeamsInAGroup();
    const { amountOfTeamsGoOnInAGroupError, amountOfTeamsGoOnInAGroupErrorContent } = this.validateAmountOfTeamsGoOnInAGroup();
    this.setState({
      amountOfTeamsInAGroupError,
      amountOfTeamsInAGroupErrorContent,
      amountOfTeamsGoOnInAGroupError,
      amountOfTeamsGoOnInAGroupErrorContent,
      competitionFullNameError,
      competitionFullNameErrorContent,
    });
    if (competitionFullNameError === true || amountOfTeamsInAGroupError === true || amountOfTeamsGoOnInAGroupError === true) {
      return;
    }
    let params: IBigRequest = {
      path: '',
      param: {
        id: this.props.routerInfo.match.params.competitionId as number,
      },
      data: {
        description: (this.props.competitionInfo!.Competition as IParams).description,
        hasGroupStage: this.state.onePhase === true ? false : true,
        name: this.state.competitionFullName,
        sportId: (this.state.selectedSport as IParams).value,
        status: (this.props.competitionInfo!.Competition as IParams).status,
        tournamentId: (this.props.competitionInfo!.Competition as IParams).tournamentId,
        url: (this.props.competitionInfo!.Competition as IParams).url,
      },
    }
    this.props.editCompetition(params);
    params = {
      path: '',
      param: {
        id: (this.props.finalStageSetting as IParams).id,
      },
      data: {
        competitionId: this.props.routerInfo.match.params.competitionId as number,
        formatId: this.state.twoPhase === true ? (this.state.selectedCompetitionFormatPhase2 as IParams).value : (this.state.selectedCompetitionFormatPhase1 as IParams).value,
        hasHomeMatch: this.state.twoPhase === true ? this.state.homeWayPhase2 : this.state.homeWayPhase1,
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
          competitionId: this.props.routerInfo.match.params.competitionId as number,
          formatId: (this.state.selectedCompetitionFormatPhase1 as IParams).value,
          hasHomeMatch: this.state.homeWayPhase1,
          status: (this.props.groupStageSetting as IParams).status,
          url: (this.props.groupStageSetting as IParams).url,
          advanceTeamPerTable: this.state.amountOfTeamsGoOnInAGroup,
          maxTeamPerTable: this.state.amountOfTeamsInAGroup,
        },
      };
      this.props.editGroupStageSetting(params);
    }
    params = {
      path: '',
      param: {
        competitionId: this.props.routerInfo.match.params.competitionId as number,
      },
      data: {},
    };
    this.props.updateSchedule(params);
    params = {
      path: '',
      param: {
        competitionId: this.props.routerInfo.match.params.competitionId as number,
      },
      data: {},
    };
    this.props.queryBracketBoardInfo(params);
    this.setState({
      onEditMode: false,
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
    });
  }

  private onChangeCompetitionFormatPhase2 = (value: ValueType<OptionTypeBase>) => {
    this.setState({
      selectedCompetitionFormatPhase2: value,
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

  private handleReportCheat = () => {
    this.setState({
      showReportModal: true,
    });
  };

  private handleCloseReportModal = () => {
    const confirm = window.confirm('Bạn có chắc chắn muốn hủy form báo cáo?');
    if (confirm === true) {
      this.setState({
        showReportModal: false,
        subjectForm: '',
        subjectFormError: false,
        subjectFormErrorContent: '',
        detailReportForm: '',
        detailReportFormError: false,
        detailReportFormErrorContent: '',
      });
    }
  };

  private validateReportForm = () => {
    let subjectFormError = false;
    let subjectFormErrorContent = '';
    let detailReportFormError = false;
    let detailReportFormErrorContent = '';
    if (this.state.subjectForm.trim() === '') {
      subjectFormError = true;
      subjectFormErrorContent = 'Tiêu đề báo cáo không được trống';
    }
    if (this.state.detailReportForm.trim() === '') {
      detailReportFormError = true;
      detailReportFormErrorContent = 'Nội dung báo cáo không được trống';
    }

    return {
      subjectFormError,
      subjectFormErrorContent,
      detailReportFormError,
      detailReportFormErrorContent,
    };
  }

  private handleConfirmReportModal = () => {
    const {
      subjectFormError,
      subjectFormErrorContent,
      detailReportFormError,
      detailReportFormErrorContent,
    } = this.validateReportForm();
    this.setState({
      subjectFormError,
      subjectFormErrorContent,
      detailReportFormError,
      detailReportFormErrorContent,
    });
    if (subjectFormError === true || detailReportFormError === true) {
      return;
    }
    const params = {
      path: '',
      param: {
      },
      data: {
        tournamentId: (this.props.tournamentInfo!.Tournament as IParams).id,
        content: this.state.detailReportForm.trim(),
        subject: this.state.subjectForm.trim(),
        type: 'fraud',
      },
    }
    this.props.reportViolation(params);
    this.setState({
      showReportModal: false,
      detailReportForm: '',
      detailReportFormError: false,
      detailReportFormErrorContent: '',
      subjectForm: '',
      subjectFormError: false,
      subjectFormErrorContent: '',
    });
  };

  private onChangeSubjectForm = (value: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      subjectForm: value.target.value,
    });
  }

  private onChangeDetailReportForm = (value: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      detailReportForm: value.target.value,
    });
  }

  render() {
    console.log('this.props.competitionInfo', this.props.competitionInfo);
    return (
      <ReduxBlockUi
        tag="div"
        block={REPORT_VIOLATION}
        unblock={[REPORT_VIOLATION_SUCCESS, REPORT_VIOLATION_FAILED]}
      >
        <div className="CompetitionInfo-Container">
          <div className="CompetitionInfo-content-container">
            <div className="CompetitionInfo-content-info-container">
              <div className="CompetitionInfo-content-info-basic-info-container">
                <div className="CompetitionInfo-content-info-basic-info-container-container">
                  <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                    {this.state.onEditMode === false ?
                      <p className="CompetitionInfo-name-text">{this.props.competitionInfo != null && this.props.competitionInfo.Competition ? (this.props.competitionInfo.Competition as unknown as IParams).name : <Skeleton width={400} height={30} />}</p> :
                      <TextInput style={{ width: 300 }} label={'Tên cuộc thi'} value={this.state.competitionFullName} onChangeText={this.onChangeCompetitionFullName} error={this.state.competitionFullNameError} errorContent={this.state.competitionFullNameErrorContent} />
                    }
                  </div>
                  <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                    {
                      this.state.onEditMode === false && <div className="CompetitionInfo-info-item">
                        <p>
                          {this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament ? `Trạng thái: ${formatTournamentStatus((this.props.tournamentInfo.Tournament as unknown as IParams).status as string)}` : <Skeleton width={200} height={20} />}
                        </p>
                      </div>
                    }
                    <div className="CompetitionInfo-info-item">
                      {
                        this.state.onEditMode === false ? <p>{this.props.sportInfo != null ? `Bộ môn thi đấu: ${this.props.sportInfo.fullName}` : <Skeleton width={200} height={20} />}</p> :
                          (sportOptions.length > 0 &&
                            <Select
                              options={sportOptions}
                              className="Select"
                              defaultValue={this.state.selectedSport}
                              value={this.state.selectedSport}
                              onChange={this.onChangeSport}
                              maxMenuHeight={140}
                            />)
                      }
                    </div>
                  </div>
                  {this.state.onEditMode === false && <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                    <div className="CompetitionInfo-info-item">
                      <p>{this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament ? `Thuộc giải: ${(this.props.tournamentInfo.Tournament as unknown as IParams).fullName}` : <Skeleton width={250} height={20} />}</p>
                    </div>
                  </div>}
                  {
                    this.state.onEditMode === true ?
                      <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                        <div className="CompetitionInfo-info-item">
                          <p>Cách tổ chức giải:</p>
                          <input type="radio" name="competitionType" onClick={this.OnChoose1} checked={this.state.onePhase} readOnly />
                          <label onClick={this.OnChoose1}>1 giai đoạn</label>
                          <input type="radio" name="competitionType" onClick={this.OnChoose2} checked={this.state.twoPhase} readOnly />
                          <label onClick={this.OnChoose2}>2 giai đoạn</label>
                        </div>
                      </div> :
                      <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                        <div className="CompetitionInfo-info-item">
                          <p>{this.props.competitionInfo != null && this.props.competitionInfo.Competition ? `Cách tổ chức giải: ${(this.props.competitionInfo.Competition as unknown as IParams).hasGroupStage === true ? '2 giai đoạn' : '1 giai đoạn'}` : <Skeleton width={250} height={20} />}</p>
                        </div>
                      </div>
                  }
                  {
                    this.state.onEditMode === true ?
                      <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                        <div className="CompetitionInfo-info-item">
                          <p>{`Thể thức${this.state.onePhase === true ? '' : ' vòng bảng'}`}</p>
                          <Select
                            options={competitionFormatOptions}
                            className="Select"
                            defaultValue={this.state.selectedCompetitionFormatPhase1}
                            value={this.state.selectedCompetitionFormatPhase1}
                            onChange={this.onChangeCompetitionFormatPhase1}
                            menuPlacement={'top'}
                          />
                        </div>
                      </div> :
                      <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                        <div className="CompetitionInfo-info-item">
                          <p>
                            {
                              this.props.competitionInfo != null && this.props.competitionInfo.Competition ?
                                `${(this.props.competitionInfo.Competition as IParams).hasGroupStage === true ?
                                  'Thể thức vòng bảng: ' : 'Thể thức: '}
                            ${
                                this.props.groupStageSetting != null &&
                                  this.props.allFormats != null &&
                                  this.props.finalStageSetting != null &&
                                  this.props.allFormats.length > 0 &&
                                  this.props.allFormats.find(element => element.id === this.props.finalStageSetting!.formatId) != null &&
                                  this.props.allFormats.find(element => element.id === this.props.groupStageSetting!.formatId) != null ?
                                  ((this.props.competitionInfo.Competition as IParams).hasGroupStage !== true ? this.props.allFormats.find(element => element.id === this.props.finalStageSetting!.formatId)!.description :
                                    this.props.allFormats.find(element => element.id === this.props.groupStageSetting!.formatId)!.description) : 'chưa có'
                                }` : <Skeleton width={300} height={20} />}
                          </p>
                        </div>
                      </div>
                  }
                  {
                    this.state.onEditMode === true ?
                      (this.state.selectedCompetitionFormatPhase1 != null &&
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
                        </div>) :
                      (this.props.competitionInfo != null && this.props.competitionInfo.Competition && ((this.props.competitionInfo.Competition as unknown as IParams).hasGroupStage === true ?
                        this.props.groupStageSetting != null && this.props.groupStageSetting.formatId !== 2 && <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                          <div className="CompetitionInfo-info-item">
                            <p>
                              {
                                this.props.groupStageSetting.hasHomeMatch === true ?
                                  (this.props.groupStageSetting.formatId === 1 ? 'Có trận tranh hạng 3 vòng bảng' : 'Có chơi lượt đi lượt về vòng bảng') :
                                  (this.props.groupStageSetting.formatId === 1 ? 'Không có trận tranh hạng 3 vòng bảng' : 'Không chơi lượt đi lượt về vòng bảng')
                              }
                            </p>
                          </div>
                        </div> : (this.props.finalStageSetting != null && this.props.finalStageSetting.formatId !== 2 && <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                          <div className="CompetitionInfo-info-item">
                            <p>
                              {
                                this.props.finalStageSetting.hasHomeMatch === true ?
                                  (this.props.finalStageSetting.formatId === 1 ? 'Có trận tranh hạng 3' : 'Có chơi lượt đi lượt về') :
                                  (this.props.finalStageSetting.formatId === 1 ? 'Không có trận tranh hạng 3' : 'Không chơi lượt đi lượt về')
                              }
                            </p>
                          </div>
                        </div>)))
                  }
                  {this.state.onEditMode === true ? (this.state.twoPhase === true &&
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
                    </div>) :
                    (this.props.competitionInfo != null &&
                      this.props.competitionInfo.Competition &&
                      (this.props.competitionInfo.Competition as IParams).hasGroupStage === true &&
                      <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                        <div className="CompetitionInfo-info-item">
                          <p>Số đội trong 1 bảng: {this.props.groupStageSetting != null ? this.props.groupStageSetting.maxTeamPerTable as number : 2}</p>
                        </div>
                        <div className="CompetitionInfo-info-item">
                          <p>Số đội đi tiếp trong 1 bảng: {this.props.groupStageSetting != null ? this.props.groupStageSetting.advanceTeamPerTable as number : 1}</p>
                        </div>
                      </div>)
                  }
                  {this.state.onEditMode === true ? (
                    <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                      <div className="CompetitionInfo-info-item">
                        {this.state.twoPhase === true && <p>Thể thức vòng chung kết</p>}
                        {this.state.twoPhase === true && <Select
                          options={competitionFormatOptions}
                          className="Select"
                          defaultValue={this.state.selectedCompetitionFormatPhase2}
                          value={this.state.selectedCompetitionFormatPhase2}
                          onChange={this.onChangeCompetitionFormatPhase2}
                          menuPlacement={'top'}
                        />}
                      </div>
                    </div>) :
                    (this.props.competitionInfo != null && this.props.competitionInfo.Competition != null && (this.props.competitionInfo.Competition as IParams).hasGroupStage === true &&
                      <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                        <div className="CompetitionInfo-info-item">
                          <p>Thể thức vòng chung kết: {
                            this.props.allFormats != null &&
                            this.props.finalStageSetting != null &&
                            this.props.allFormats.length > 0 &&
                            this.props.allFormats.find(element => element.id === this.props.finalStageSetting!.formatId) != null &&
                            this.props.allFormats.find(element => element.id === this.props.finalStageSetting!.formatId)!.description
                          }
                          </p>
                        </div>
                      </div>)
                  }
                  {this.state.onEditMode === false ?
                    this.props.competitionInfo != null && this.props.competitionInfo.Competition != null && (this.props.competitionInfo.Competition as IParams).hasGroupStage === true && this.props.finalStageSetting != null && this.props.finalStageSetting.formatId !== 2 && (this.props.finalStageSetting.formatId === 3 ?
                      <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                        <div className="CompetitionInfo-info-item">
                          <p>{this.props.finalStageSetting.hasHomeMatch === true ? 'Chơi lượt đi lượt về vòng chung kết' : 'Không chơi lượt đi lượt về vòng chung kết'}</p>
                        </div>
                      </div> : <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                        <div className="CompetitionInfo-info-item">
                          <p>{this.props.finalStageSetting.hasHomeMatch === true ? 'Có trận tranh hạng 3 vòng chung kết' : 'Không có trận tranh hạng 3 vòng chung kết'}</p>
                        </div>
                      </div>)
                    : (this.state.twoPhase === true && (this.state.selectedCompetitionFormatPhase2 as IParams).value !== 2 && ((this.state.selectedCompetitionFormatPhase2 as IParams).value === 3 ?
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
                </div>
              </div>
              {/* {(this.state.onEditMode === false
              ?
              <div className="CompetitionInfo-login-container">
                <div
                  className="CompetitionInfo-login"
                  onClick={this.handleOpenEditCompetitionInfo}
                >
                  <h4 className="CompetitionInfo-login-text">Chỉnh sửa thông tin</h4>
                </div>
              </div> : <div className="CompetitionInfo-login-container">
                <div
                  className="CompetitionInfo-login"
                  onClick={this.handleCloseEditCompetitionInfo}
                >
                  <h4 className="CompetitionInfo-login-text">Lưu chỉnh sửa</h4>
                </div>
              </div>)} */}
              {this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament != null && this.props.competitionInfo != null && this.props.competitionInfo.Competition != null && this.props.competitionInfo.Config != null && cookies.get(COOKIES_TYPE.AUTH_TOKEN) != null && ((this.props.competitionInfo.Config as IParams).canEdit !== true ?
                ((this.props.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.OPENING &&
                  <div className="CompetitionInfo-login-container">
                    <div
                      className="CompetitionInfo-login"
                      onClick={this.handleJoinTournament}
                    >
                      <h4 className="CompetitionInfo-login-text">Tham gia cuộc thi</h4>
                    </div>
                  </div>) :
                (((this.props.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.OPENING || (this.props.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING)
                  && (this.state.onEditMode === false
                    ?
                    <div className="CompetitionInfo-login-container">
                      <div
                        className="CompetitionInfo-login"
                        onClick={this.handleOpenEditCompetitionInfo}
                      >
                        <h4 className="CompetitionInfo-login-text">Chỉnh sửa thông tin</h4>
                      </div>
                    </div> : <div className="CompetitionInfo-login-container">
                      <div
                        className="CompetitionInfo-login"
                        onClick={this.handleCloseEditCompetitionInfo}
                      >
                        <h4 className="CompetitionInfo-login-text">Lưu chỉnh sửa</h4>
                      </div>
                    </div>)))
              }
              {this.props.tournamentInfo != null &&
                this.props.competitionInfo != null &&
                this.props.competitionInfo.Config != null &&
                this.props.tournamentInfo.Tournament != null &&
                this.props.competitionInfo.Competition != null &&
                (this.props.competitionInfo.Config as IParams).canEdit !== true &&
                (this.props.tournamentInfo.Tournament as IParams).status !== 'finished' &&
                <div className="CompetitionInfo-login-container">
                  <div
                    className="CompetitionInfo-login"
                    onClick={this.handleReportCheat}
                  >
                    <h4 className="CompetitionInfo-login-text">Báo cáo gian lận</h4>
                  </div>
                </div>
              }
              <div className="CompetitionInfo-content-info-advanced-info-container">
                <CustomTab tabList={this.tabList} componentList={this.componentList} selectedIndex={0}></CustomTab>
              </div>
            </div>
          </div>
          <CustomModal
            customStyles={customStyles2}
            handleCloseModal={this.handleCloseReportModal}
            showModal={this.state.showReportModal}
            handleConfirmModal={this.handleConfirmReportModal}
          >
            <div className={'Report-modal-container'}>
              <div className={'Report-modal-header-container'}>
                <h1>Form Báo cáo</h1>
              </div>
              <div className={'Report-modal-subject-input-container'}>
                <p>Tiêu đề: </p>
                <input style={{ width: '200px', height: '25px', marginLeft: '20px' }} type={'text'} onChange={this.onChangeSubjectForm} value={this.state.subjectForm} />
              </div>
              <p>Nội dung báo cáo: </p>
              <textarea rows={7} cols={60} value={this.state.detailReportForm} onChange={this.onChangeDetailReportForm}></textarea>
              {this.state.subjectFormError === true && <p style={{ color: 'red' }}>{this.state.subjectFormErrorContent}</p>}
              {this.state.detailReportFormError === true && <p style={{ color: 'red' }}>{this.state.detailReportFormErrorContent}</p>}
            </div>
          </CustomModal>
          <CustomModal
            customStyles={customStyles}
            handleCloseModal={this.handleCloseModal}
            showModal={this.state.showJoinModal}
            handleConfirmModal={this.handleConfirmModal}
          >
            <div className={'TournamentInfo-join-tournament-form-competition-header'}>
              <h3>Form đăng ký dự thi</h3>
            </div>
            <TextInput label={'Tên đội'} value={this.state.teamNameInForm} onChangeText={this.onChangeTeamNameInForm} error={this.state.teamNameInFormError} errorContent={this.state.teamNameInFormErrorContent} />
            <TextInput label={'Tên ngắn đội'} value={this.state.teamShortNameInForm} onChangeText={this.onChangeTeamShortNameInForm} error={this.state.teamShortNameInFormError} errorContent={this.state.teamShortNameInFormErrorContent} />
            <div className="TournamentInfo-join-tournament-container">
              <div className="TournamentInfo-join-tournament-item1">
                <p>Tên</p>
              </div>
              <div className="TournamentInfo-join-tournament-item2">
                <p>Giới tính</p>
              </div>
              <div className="TournamentInfo-join-tournament-item2">
                <p>Tuổi</p>
              </div>
              <div className="TournamentInfo-join-tournament-item1">
                <p>Email</p>
              </div>
              <div className="TournamentInfo-join-tournament-setting">
              </div>
            </div>
            {this.state.listPlayerInForm.map((item, index) => <Player onDelete={this.onDeletePlayer} info={item} freeToEdit={true} key={index} index={index} />)}
            <div className="TournamentInfo-join-tournament-container">
              <div className="TournamentInfo-join-tournament-item1">
                <input type={'text'} onChange={this.onChangePlayerNameInForm} value={this.state.playerNameInForm} />
              </div>
              <div className="TournamentInfo-join-tournament-item2">
                <Select
                  options={genderOptions}
                  className="Select"
                  defaultValue={this.state.playerGenderInForm}
                  value={this.state.playerGenderInForm}
                  onChange={this.onChangePlayerGenderInForm}
                />
              </div>
              <div className="TournamentInfo-join-tournament-item2">
                <input style={{ width: '70px' }} type={'text'} onChange={this.onChangePlayerAgeInForm} value={this.state.playerAgeInForm} />
              </div>
              <div className="TournamentInfo-join-tournament-item1">
                <input type={'text'} onChange={this.onChangePlayerEmailInForm} value={this.state.playerEmailInForm} />
              </div>
              <div className="TournamentInfo-join-tournament-setting">
                <IoMdAddCircleOutline color={'white'} size={25} style={{ marginLeft: '3px', marginRight: '3px' }} onClick={this.addPlayer} />
              </div>
            </div>
            {this.state.playerNameInFormError === true && <p style={{ color: 'red' }}>{this.state.playerNameInFormErrorContent}</p>}
            {this.state.playerEmailInFormError === true && <p style={{ color: 'red' }}>{this.state.playerEmailInFormErrorContent}</p>}
          </CustomModal>
        </div>
      </ReduxBlockUi>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    competitionInfo: state.competitionInfo,
    tournamentInfo: state.tournamentInfo,
    allSports: state.allSports,
    sportInfo: state.sportInfo,
    groupStageSetting: state.groupStageSetting,
    finalStageSetting: state.finalStageSetting,
    allFormats: state.allFormats,
    allCompetitionByTournamentId: state.allCompetitionByTournamentId,
    currentUserInfo: state.currentUserInfo,
  };
};

export default connect(
  mapStateToProps,
  {
    editGroupStageSetting,
    editFinalStageSetting,
    editCompetition,
    queryAllFormats,
    queryCompetition,
    queryTournamentInfo,
    queryAllSports,
    querySportInfo,
    queryFinalStageSetting,
    queryGroupStageSetting,
    queryAllCompetitionsByTournamentId,
    updateSchedule,
    reportViolation,
    registTeam,
    queryBracketBoardInfo,
  }
)(CompetitionInfo);