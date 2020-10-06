import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { IoMdAddCircleOutline } from 'react-icons/io';
import ReduxBlockUi from 'react-block-ui/redux';
import Select, { ValueType, OptionTypeBase } from 'react-select';
import { RouteComponentProps } from 'react-router-dom';
import * as H from 'history';
import { StaticContext } from 'react-router';
import Skeleton from 'react-loading-skeleton';
import { Styles } from 'react-modal';
import { AiFillCamera } from 'react-icons/ai';
import CustomTab from 'components/CustomTab';
import CustomModal from 'components/CustomModal';
import TournamentSetting from 'components/TournamentSetting';
import Player from 'components/Player';
import TextInput from 'components/TextInput';
import BracketBoard from 'components/BracketBoard';
import BracketSchedule from 'components/BracketSchedule';
import BracketRank from 'components/BracketRank';
import TournamentReport from 'components/TournamentReport';
import PendingTeams from 'components/PendingTeams';
import Teams from 'components/Teams';
import { IBigRequest, IParams } from 'interfaces/common';
import { COOKIES_TYPE, TOURNAMENT_STATUS } from 'global';
import { IState } from 'redux-saga/reducers';
import { cookies } from 'utils/cookies';
import { formatDateToDisplay } from 'utils/datetime';
import config from 'config';
import { formatTournamentStatus } from 'utils/common';
import { onEditBracketMode, deleteListSelectingTeam } from 'components/BracketTeam/actions';
import { queryAllCompetitionsByTournamentId } from 'components/CompetitionsSetting/actions';
import { querySportInfo, queryAllFormats, queryFinalStageSetting, queryGroupStageSetting, } from 'screens/CompetitionInfo/actions';
import { openRegisterForm, closeRegisterForm, registTeam, reportViolation, updateBackgroundTournament, updateAvatarTournament, queryTournamentInfo, querySportsByTournament, finishTournament, queryCompetitionsBySportAndTournament, startTournament } from './actions';
import { START_TOURNAMENT, FINISH_TOURNAMENT, REPORT_VIOLATION } from 'redux-saga/actions';
import { START_TOURNAMENT_SUCCESS, START_TOURNAMENT_FAILED, FINISH_TOURNAMENT_SUCCESS, FINISH_TOURNAMENT_FAILED, REPORT_VIOLATION_SUCCESS, REPORT_VIOLATION_FAILED } from './reducers';
import './styles.css';

interface ITournamentInfoProps extends React.ClassAttributes<TournamentInfo> {
  routerInfo: RouteComponentProps<any, StaticContext, H.LocationState>;
  tournamentInfo: IParams | null;
  listSportsByTournament: IParams[] | null;
  listCompetitionsBySportAndTournament: IParams[] | null;
  allCompetitionByTournamentId: IParams[] | null;
  currentUserInfo: IParams | null;
  sportInfo: IParams | null;
  allFormats: IParams[];
  finalStageSetting: IParams | null;
  groupStageSetting: IParams | null;

  queryTournamentInfo(param: IBigRequest): void;
  querySportInfo(params: IBigRequest): void;
  querySportsByTournament(param: IBigRequest): void;
  queryCompetitionsBySportAndTournament(param: IBigRequest): void;
  startTournament(param: IBigRequest): void;
  finishTournament(param: IBigRequest): void;
  queryFinalStageSetting(params: IBigRequest): void;
  queryGroupStageSetting(params: IBigRequest): void;
  updateAvatarTournament(param: IBigRequest): void;
  updateBackgroundTournament(param: IBigRequest): void;
  onEditBracketMode(status: boolean): void;
  deleteListSelectingTeam(): void;
  queryAllCompetitionsByTournamentId(param: IBigRequest): void;
  reportViolation(param: IBigRequest): void;
  registTeam(param: IBigRequest): void;
  openRegisterForm(param: IBigRequest): void;
  closeRegisterForm(param: IBigRequest): void;
  queryAllFormats(): void;
}

interface ITournamentInfoState {
  showJoinModal: boolean;
  showReportModal: boolean;
  showReportModal2: boolean;
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
  teamShortNameInFormErrorContent: string;
  subjectForm: string;
  subjectForm2: string;
  detailReportForm: string;
  detailReportForm2: string;
  subjectFormError: boolean;
  subjectFormError2: boolean;
  subjectFormErrorContent: string;
  subjectFormErrorContent2: string;
  detailReportFormError: boolean;
  detailReportFormError2: boolean;
  detailReportFormErrorContent: string;
  detailReportFormErrorContent2: string;
  listPlayerInForm: IParams[];
  playerGenderInForm: ValueType<OptionTypeBase>;
  errorLoadImage: boolean;
  errorLoadBackgroundImage: boolean;
}

let allCompetitionOptions: IParams[] = [
];

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

const customStyles3: Styles = {
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

class TournamentInfo extends React.Component<ITournamentInfoProps, ITournamentInfoState> {
  private tabList: string[] = [];
  private componentList: ReactNode[] = [];

  constructor(props: ITournamentInfoProps) {
    super(props);
    this.state = {
      showJoinModal: false,
      showReportModal: false,
      showReportModal2: false,
      teamNameInForm: '',
      playerEmailInForm: '',
      subjectForm: '',
      subjectForm2: '',
      detailReportForm: '',
      detailReportForm2: '',
      subjectFormError: false,
      subjectFormError2: false,
      subjectFormErrorContent: '',
      subjectFormErrorContent2: '',
      detailReportFormError: false,
      detailReportFormError2: false,
      detailReportFormErrorContent: '',
      detailReportFormErrorContent2: '',
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
      teamShortNameInFormErrorContent: '',
      errorLoadImage: false,
      errorLoadBackgroundImage: false,
      listPlayerInForm: [
      ],
    };
  }

  shouldComponentUpdate(nextProps: ITournamentInfoProps, nextState: ITournamentInfoState) {
    if (this.props.tournamentInfo !== nextProps.tournamentInfo) {
      this.tabList = [];
      this.componentList = [];
      if (nextProps.tournamentInfo != null) {
        if ((nextProps.tournamentInfo as IParams).Config != null && ((nextProps.tournamentInfo as IParams).Config as IParams).canEdit === true) {
          if ((nextProps.tournamentInfo.Tournament as IParams).hasGroupStage === true) {
            if ((nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || (nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.OPENING) {
              this.tabList = [
                // 'Các cuộc thi trong giải',
                'Nhánh thi đấu vòng bảng',
                'Lịch thi đấu vòng bảng',
                'Nhánh thi đấu vòng chung kết',
                'Lịch thi đấu vòng chung kết',
                'Các đội tham gia giải',
                'Các đội đang chờ phê duyệt',
                'Báo cáo giải',
                'Cài đặt'
              ];
              this.componentList = [
                // <CompetitionsSetting canEdit={((nextProps.tournamentInfo as IParams).Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || ((nextProps.tournamentInfo as IParams).Tournament as IParams).status === TOURNAMENT_STATUS.OPENING} tournamentInfo={nextProps.tournamentInfo.Tournament as unknown as IParams} tournamentId={Number(this.props.routerInfo.match.params.tournamentId)} onChangeCompetitionSetting={this.onChangeCompetitionSetting} />,
                <BracketBoard swapAble={(nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || (nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.OPENING} tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={false} />,
                <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={false} />,
                <BracketBoard swapAble={(nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || (nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.OPENING} tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={true} />,
                <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={true} />,
                <Teams tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentInfo={nextProps.tournamentInfo} id={this.props.routerInfo.match.params.tournamentId as number} />,
                <PendingTeams tournamentInfo={nextProps.tournamentInfo} id={this.props.routerInfo.match.params.tournamentId as number} />,
                <TournamentReport tournamentId={Number(this.props.routerInfo.match.params.tournamentId)} tournamentInfo={nextProps.tournamentInfo.Tournament as unknown as IParams} />,
                <TournamentSetting tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentId={Number(this.props.routerInfo.match.params.tournamentId)} tournamentInfo={nextProps.tournamentInfo.Tournament as unknown as IParams} />
              ];
            } else {
              this.tabList = [
                // 'Các cuộc thi trong giải',
                'Nhánh thi đấu vòng bảng',
                'Lịch thi đấu vòng bảng',
                'BXH vòng bảng',
                'Nhánh thi đấu vòng chung kết',
                'Lịch thi đấu vòng chung kết',
                'BXH vòng chung kết',
                'Các đội tham gia giải',
                'Các đội đang chờ phê duyệt',
                'Báo cáo giải',
                'Cài đặt'
              ];
              this.componentList = [
                // <CompetitionsSetting canEdit={((nextProps.tournamentInfo as IParams).Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || ((nextProps.tournamentInfo as IParams).Tournament as IParams).status === TOURNAMENT_STATUS.OPENING} tournamentInfo={nextProps.tournamentInfo.Tournament as unknown as IParams} tournamentId={Number(this.props.routerInfo.match.params.tournamentId)} onChangeCompetitionSetting={this.onChangeCompetitionSetting} />,
                <BracketBoard swapAble={(nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || (nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.OPENING} tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={false} />,
                <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={false} />,
                <BracketRank finalStage={false} tournamentId={this.props.routerInfo.match.params.tournamentId as number} />,
                <BracketBoard swapAble={(nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || (nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.OPENING} tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={true} />,
                <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={true} />,
                <BracketRank finalStage={true} tournamentId={this.props.routerInfo.match.params.tournamentId as number} />,
                <Teams tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentInfo={nextProps.tournamentInfo} id={this.props.routerInfo.match.params.tournamentId as number} />,
                <PendingTeams tournamentInfo={nextProps.tournamentInfo} id={this.props.routerInfo.match.params.tournamentId as number} />,
                <TournamentReport tournamentId={Number(this.props.routerInfo.match.params.tournamentId)} tournamentInfo={nextProps.tournamentInfo.Tournament as unknown as IParams} />,
                <TournamentSetting tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentId={Number(this.props.routerInfo.match.params.tournamentId)} tournamentInfo={nextProps.tournamentInfo.Tournament as unknown as IParams} />
              ];
            }
          } else {
            if ((nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || (nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.OPENING) {
              this.tabList = [
                // 'Các cuộc thi trong giải',
                'Nhánh thi đấu vòng chung kết',
                'Lịch thi đấu vòng chung kết',
                'Các đội tham gia giải',
                'Các đội đang chờ phê duyệt',
                'Báo cáo giải',
                'Cài đặt'
              ];
              this.componentList = [
                // <CompetitionsSetting canEdit={((nextProps.tournamentInfo as IParams).Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || ((nextProps.tournamentInfo as IParams).Tournament as IParams).status === TOURNAMENT_STATUS.OPENING} tournamentInfo={nextProps.tournamentInfo.Tournament as unknown as IParams} tournamentId={Number(this.props.routerInfo.match.params.tournamentId)} onChangeCompetitionSetting={this.onChangeCompetitionSetting} />,
                <BracketBoard swapAble={(nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || (nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.OPENING} tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={true} />,
                <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={true} />,
                <Teams tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentInfo={nextProps.tournamentInfo} id={this.props.routerInfo.match.params.tournamentId as number} />,
                <PendingTeams tournamentInfo={nextProps.tournamentInfo} id={this.props.routerInfo.match.params.tournamentId as number} />,
                <TournamentReport tournamentId={Number(this.props.routerInfo.match.params.tournamentId)} tournamentInfo={nextProps.tournamentInfo.Tournament as unknown as IParams} />,
                <TournamentSetting tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentId={Number(this.props.routerInfo.match.params.tournamentId)} tournamentInfo={nextProps.tournamentInfo.Tournament as unknown as IParams} />
              ];
            } else {
              this.tabList = [
                // 'Các cuộc thi trong giải',
                'Nhánh thi đấu vòng chung kết',
                'Lịch thi đấu vòng chung kết',
                'BXH vòng chung kết',
                'Các đội tham gia giải',
                'Các đội đang chờ phê duyệt',
                'Báo cáo giải',
                'Cài đặt'
              ];
              this.componentList = [
                // <CompetitionsSetting canEdit={((nextProps.tournamentInfo as IParams).Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || ((nextProps.tournamentInfo as IParams).Tournament as IParams).status === TOURNAMENT_STATUS.OPENING} tournamentInfo={nextProps.tournamentInfo.Tournament as unknown as IParams} tournamentId={Number(this.props.routerInfo.match.params.tournamentId)} onChangeCompetitionSetting={this.onChangeCompetitionSetting} />,
                <BracketBoard swapAble={(nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || (nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.OPENING} tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={true} />,
                <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={true} />,
                <BracketRank finalStage={true} tournamentId={this.props.routerInfo.match.params.tournamentId as number} />,
                <Teams tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentInfo={nextProps.tournamentInfo} id={this.props.routerInfo.match.params.tournamentId as number} />,
                <PendingTeams tournamentInfo={nextProps.tournamentInfo} id={this.props.routerInfo.match.params.tournamentId as number} />,
                <TournamentReport tournamentId={Number(this.props.routerInfo.match.params.tournamentId)} tournamentInfo={nextProps.tournamentInfo.Tournament as unknown as IParams} />,
                <TournamentSetting tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentId={Number(this.props.routerInfo.match.params.tournamentId)} tournamentInfo={nextProps.tournamentInfo.Tournament as unknown as IParams} />
              ];
            }
          }
        } else {
          if ((nextProps.tournamentInfo.Tournament as IParams).hasGroupStage === true) {
            if ((nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || (nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.OPENING) {
              this.tabList = [
                // 'Các cuộc thi trong giải',
                'Nhánh thi đấu vòng bảng',
                'Lịch thi đấu vòng bảng',
                'Nhánh thi đấu vòng chung kết',
                'Lịch thi đấu vòng chung kết',
                'Các đội tham gia giải'
              ];
              this.componentList = [
                // <CompetitionsSetting canEdit={((nextProps.tournamentInfo as IParams).Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || ((nextProps.tournamentInfo as IParams).Tournament as IParams).status === TOURNAMENT_STATUS.OPENING} tournamentInfo={nextProps.tournamentInfo.Tournament as unknown as IParams} tournamentId={Number(this.props.routerInfo.match.params.tournamentId)} onChangeCompetitionSetting={this.onChangeCompetitionSetting} />,
                <BracketBoard swapAble={false} tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={false} />,
                <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={false} />,
                <BracketBoard swapAble={false} tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={true} />,
                <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={true} />,
                <Teams addItem={false} tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentInfo={nextProps.tournamentInfo} id={this.props.routerInfo.match.params.tournamentId as number} />
              ];
            } else {
              this.tabList = [
                // 'Các cuộc thi trong giải',
                'Nhánh thi đấu vòng bảng',
                'Lịch thi đấu vòng bảng',
                'BXH vòng bảng',
                'Nhánh thi đấu vòng chung kết',
                'Lịch thi đấu vòng chung kết',
                'BXH vòng chung kết',
                'Các đội tham gia giải'
              ];
              this.componentList = [
                // <CompetitionsSetting canEdit={((nextProps.tournamentInfo as IParams).Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || ((nextProps.tournamentInfo as IParams).Tournament as IParams).status === TOURNAMENT_STATUS.OPENING} tournamentInfo={nextProps.tournamentInfo.Tournament as unknown as IParams} tournamentId={Number(this.props.routerInfo.match.params.tournamentId)} onChangeCompetitionSetting={this.onChangeCompetitionSetting} />,
                <BracketBoard swapAble={false} tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={false} />,
                <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={false} />,
                <BracketRank finalStage={false} tournamentId={this.props.routerInfo.match.params.tournamentId as number} />,
                <BracketBoard swapAble={false} tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={true} />,
                <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={true} />,
                <BracketRank finalStage={true} tournamentId={this.props.routerInfo.match.params.tournamentId as number} />,
                <Teams addItem={false} tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentInfo={nextProps.tournamentInfo} id={this.props.routerInfo.match.params.tournamentId as number} />
              ];
            }
          } else {
            if ((nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || (nextProps.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.OPENING) {
              this.tabList = [
                // 'Các cuộc thi trong giải',
                'Nhánh thi đấu vòng chung kết',
                'Lịch thi đấu vòng chung kết',
                'Các đội tham gia giải'
              ];
              this.componentList = [
                // <CompetitionsSetting canEdit={((nextProps.tournamentInfo as IParams).Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || ((nextProps.tournamentInfo as IParams).Tournament as IParams).status === TOURNAMENT_STATUS.OPENING} tournamentInfo={nextProps.tournamentInfo.Tournament as unknown as IParams} tournamentId={Number(this.props.routerInfo.match.params.tournamentId)} onChangeCompetitionSetting={this.onChangeCompetitionSetting} />,
                <BracketBoard swapAble={false} tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={true} />,
                <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={true} />,
                <Teams addItem={false} tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentInfo={nextProps.tournamentInfo} id={this.props.routerInfo.match.params.tournamentId as number} />
              ];
            } else {
              this.tabList = [
                // 'Các cuộc thi trong giải',
                'Nhánh thi đấu vòng chung kết',
                'Lịch thi đấu vòng chung kết',
                'BXH vòng chung kết',
                'Các đội tham gia giải'
              ];
              this.componentList = [
                // <CompetitionsSetting canEdit={((nextProps.tournamentInfo as IParams).Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING || ((nextProps.tournamentInfo as IParams).Tournament as IParams).status === TOURNAMENT_STATUS.OPENING} tournamentInfo={nextProps.tournamentInfo.Tournament as unknown as IParams} tournamentId={Number(this.props.routerInfo.match.params.tournamentId)} onChangeCompetitionSetting={this.onChangeCompetitionSetting} />,
                <BracketBoard swapAble={false} tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={true} />,
                <BracketSchedule started={(nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.INITIALIZING && (nextProps.tournamentInfo.Tournament as IParams).status !== TOURNAMENT_STATUS.OPENING} tournamentId={this.props.routerInfo.match.params.tournamentId as number} finalStage={true} />,
                <BracketRank finalStage={true} tournamentId={this.props.routerInfo.match.params.tournamentId as number} />,
                <Teams addItem={false} tournamentStatus={(nextProps.tournamentInfo.Tournament as IParams).status as string} tournamentInfo={nextProps.tournamentInfo} id={this.props.routerInfo.match.params.tournamentId as number} />
              ];
            }
          }
        }
      }
      if (nextProps.tournamentInfo != null && nextProps.tournamentInfo.Tournament != null) {
        let params: IBigRequest = {
          path: '',
          param: {
            id: (nextProps.tournamentInfo.Tournament as IParams).sportId,
          },
          data: {},
        };
        this.props.querySportInfo(params);
        params = {
          path: '',
          param: {
            tournamentId: this.props.routerInfo.match.params.tournamentId as number,
          },
          data: {},
        };
        this.props.queryFinalStageSetting(params);
        params = {
          path: '',
          param: {
            tournamentId: this.props.routerInfo.match.params.tournamentId as number,
          },
          data: {},
        };
        this.props.queryGroupStageSetting(params);
      }
    }
    // if (this.state.selectedSport !== nextState.selectedSport || this.state.selectedCompetition !== nextState.selectedCompetition) {
    //   this.props.onEditBracketMode(false);
    //   this.props.deleteListSelectingTeam();
    // }
    // if (this.props.listSportsByTournament !== nextProps.listSportsByTournament) {
    //   sportOptions = [];
    //   if (nextProps.listSportsByTournament != null) {
    //     nextProps.listSportsByTournament.map((item, index) => sportOptions.push({ value: item.id, label: item.fullName }));
    //   }
    //   sportOptions.unshift({
    //     value: null, label: '(Tất cả)',
    //   });
    // }
    // if (this.props.listCompetitionsBySportAndTournament !== nextProps.listCompetitionsBySportAndTournament) {
    //   competitionOptions = [];
    //   if (nextProps.listCompetitionsBySportAndTournament != null) {
    //     nextProps.listCompetitionsBySportAndTournament.map((item, index) => competitionOptions.push({ value: item.id, label: item.name }));
    //   }
    // }
    if (this.props.allCompetitionByTournamentId !== nextProps.allCompetitionByTournamentId) {
      allCompetitionOptions = [];
      if (nextProps.allCompetitionByTournamentId != null) {
        nextProps.allCompetitionByTournamentId.map((item, index) => allCompetitionOptions.push({ value: item.id, label: item.name }));
      }
    }
    // if (this.state.selectedSport !== nextState.selectedSport && nextState.selectedSport != null) {
    //   competitionOptions = [];
    //   this.setState({
    //     selectedCompetition: null,
    //   });
    //   const params = {
    //     path: '',
    //     param: {
    //       tournamentId: Number(this.props.routerInfo.match.params.tournamentId),
    //       sportId: (nextState.selectedSport as IParams).value,
    //     },
    //     data: {},
    //   };
    //   this.props.queryCompetitionsBySportAndTournament(params);
    // }
    return true;
  }

  componentDidMount() {
    this.requestData();
  }

  private requestData = () => {
    let params: IBigRequest = {
      path: '',
      param: {
        id: Number(this.props.routerInfo.match.params.tournamentId),
      },
      data: {},
    };
    this.props.queryTournamentInfo(params);
    this.props.queryAllFormats();
    // params = {
    //   path: '',
    //   param: {
    //     tournamentId: Number(this.props.routerInfo.match.params.tournamentId),
    //     limit: 99,
    //   },
    //   data: {},
    // };
    // this.props.queryAllCompetitionsByTournamentId(params);
  }

  private updateBackground = (selectorFiles: FileList | null) => {
    if (selectorFiles !== null && selectorFiles.length > 0) {
      const params = {
        path: '',
        param: {
          id: Number(this.props.routerInfo.match.params.tournamentId),
          file: selectorFiles,
        },
        data: {
        },
      };

      this.props.updateBackgroundTournament(params);
    }
  };

  private updateAvatar = (selectorFiles: FileList | null) => {
    if (selectorFiles !== null && selectorFiles.length > 0) {
      const params = {
        path: '',
        param: {
          id: Number(this.props.routerInfo.match.params.tournamentId),
          file: selectorFiles,
        },
        data: {
        },
      };

      this.props.updateAvatarTournament(params);
    }
  };

  private handleStartTournament = () => {
    const confirm = window.confirm('Khi bắt đầu giải bạn sẽ không thể thay đổi thông tin các cuộc thi và các đội nữa, bạn có chắc chắn?')
    if (confirm === true) {
      const params = {
        path: '',
        param: {
          id: Number(this.props.routerInfo.match.params.tournamentId),
        },
        data: {
        },
      };

      this.props.startTournament(params);
    }
  };

  private handleOpenRegistForm = () => {
    const confirm = window.confirm('Bạn có chắc chắn muốn mở form đăng ký?')
    if (confirm === true) {
      const params = {
        path: '',
        param: {
          id: Number(this.props.routerInfo.match.params.tournamentId),
        },
        data: {
        },
      };

      this.props.openRegisterForm(params);
    }
  };

  private handleCloseRegistForm = () => {
    const confirm = window.confirm('Bạn có chắc chắn muốn đóng form đăng ký?')
    if (confirm === true) {
      const params = {
        path: '',
        param: {
          id: Number(this.props.routerInfo.match.params.tournamentId),
        },
        data: {
        },
      };

      this.props.closeRegisterForm(params);
    }
  };

  private handleJoinTournament = () => {
    this.setState({
      showJoinModal: true,
    });
  };

  private handleReportViolate = () => {
    this.setState({
      showReportModal: true,
    });
  };

  private handleCloseModal = () => {
    const confirm = window.confirm('Bạn có chắc chắn muốn hủy form đăng ký?');
    if (confirm === true) {
      this.setState({
        showJoinModal: false,
      });
    }
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

  private validateForm = () => {
    let teamNameInFormError = false;
    let teamNameInFormErrorContent = '';
    let teamShortNameInFormErrorContent = '';
    let teamShortNameInFormError = false;
    if (this.state.teamNameInForm.trim() === '' || !config.regex.teamName.test(this.state.teamNameInForm)) {
      teamNameInFormError = true;
      teamNameInFormErrorContent = 'Tên đội không được trống và không được chứa kí tự đặc biệt';
    }
    if (this.state.teamShortNameInForm.trim() === '' || !config.regex.teamShortName.test(this.state.teamShortNameInForm)) {
      teamShortNameInFormError = true;
      teamShortNameInFormErrorContent = 'Tên ngắn đội không được trống, tối đa 8 kí tự và không chứa kí tự đặc biệt';
    }

    return {
      teamNameInFormError,
      teamNameInFormErrorContent,
      teamShortNameInFormError,
      teamShortNameInFormErrorContent
    };
  }

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
        tournamentId: this.props.routerInfo.match.params.tournamentId as number,
        fullName: this.state.teamNameInForm,
        shortName: this.state.teamShortNameInForm,
        players: this.state.listPlayerInForm,
      },
    }
    this.props.registTeam(params);
    this.setState({
      showJoinModal: false,
    });
  };

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
        type: 'violation',
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

  private handleFinishTournament = () => {
    const confirm = window.confirm('Khi Kết thúc giải đồng nghĩa với việc tất cả các cuộc thi cũng sẽ kết thúc, bạn có chắc chắn?')
    if (confirm === true) {
      const params = {
        path: '',
        param: {
          id: Number(this.props.routerInfo.match.params.tournamentId),
        },
        data: {
        },
      };

      this.props.finishTournament(params);
    }
  };

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

  private onImageError = () => {
    this.setState({
      errorLoadImage: true,
    });
  };

  private onImageBackgroundError = () => {
    this.setState({
      errorLoadBackgroundImage: true,
    });
  };

  private handleReportCheat = () => {
    this.setState({
      showReportModal2: true,
    });
  };

  private handleCloseReportModal2 = () => {
    const confirm = window.confirm('Bạn có chắc chắn muốn hủy form báo cáo?');
    if (confirm === true) {
      this.setState({
        showReportModal2: false,
        subjectForm2: '',
        subjectFormError2: false,
        subjectFormErrorContent2: '',
        detailReportForm2: '',
        detailReportFormError2: false,
        detailReportFormErrorContent2: '',
      });
    }
  };

  private validateReportForm2 = () => {
    let subjectFormError2 = false;
    let subjectFormErrorContent2 = '';
    let detailReportFormError2 = false;
    let detailReportFormErrorContent2 = '';
    if (this.state.subjectForm2.trim() === '') {
      subjectFormError2 = true;
      subjectFormErrorContent2 = 'Tiêu đề báo cáo không được trống';
    }
    if (this.state.detailReportForm2.trim() === '') {
      detailReportFormError2 = true;
      detailReportFormErrorContent2 = 'Nội dung báo cáo không được trống';
    }

    return {
      subjectFormError2,
      subjectFormErrorContent2,
      detailReportFormError2,
      detailReportFormErrorContent2,
    };
  }

  private handleConfirmReportModal2 = () => {
    const {
      subjectFormError2,
      subjectFormErrorContent2,
      detailReportFormError2,
      detailReportFormErrorContent2,
    } = this.validateReportForm2();
    this.setState({
      subjectFormError2,
      subjectFormErrorContent2,
      detailReportFormError2,
      detailReportFormErrorContent2,
    });
    if (subjectFormError2 === true || detailReportFormError2 === true) {
      return;
    }
    const params = {
      path: '',
      param: {
      },
      data: {
        tournamentId: (this.props.tournamentInfo!.Tournament as IParams).id,
        content: this.state.detailReportForm2.trim(),
        subject: this.state.subjectForm2.trim(),
        type: 'fraud',
      },
    }
    this.props.reportViolation(params);
    this.setState({
      showReportModal2: false,
      detailReportForm2: '',
      detailReportFormError2: false,
      detailReportFormErrorContent2: '',
      subjectForm2: '',
      subjectFormError2: false,
      subjectFormErrorContent2: '',
    });
  };

  private onChangeSubjectForm2 = (value: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      subjectForm2: value.target.value,
    });
  }

  private onChangeDetailReportForm2 = (value: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      detailReportForm2: value.target.value,
    });
  }

  render() {
    return (
      <ReduxBlockUi
        tag="div"
        block={START_TOURNAMENT}
        unblock={[START_TOURNAMENT_SUCCESS, START_TOURNAMENT_FAILED]}
      >
        <ReduxBlockUi
          tag="div"
          block={FINISH_TOURNAMENT}
          unblock={[FINISH_TOURNAMENT_SUCCESS, FINISH_TOURNAMENT_FAILED]}
        >
          <ReduxBlockUi
            tag="div"
            block={REPORT_VIOLATION}
            unblock={[REPORT_VIOLATION_SUCCESS, REPORT_VIOLATION_FAILED]}
          >
            <div className="TournamentInfo-Container">
              <div className="TournamentInfo-background-image-container">
                {this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament != null && <img className={'TournamentInfo-background-image'} src={(this.state.errorLoadBackgroundImage === false ? ((this.props.tournamentInfo.Tournament as IParams).background != null ? (this.props.tournamentInfo.Tournament as IParams).background as string : config.defaultBackground) : config.defaultBackground)} alt={'logo'} onError={this.onImageBackgroundError} />}
                {/* <img className={'TournamentInfo-background-image'} src={require('../../assets/38155584462_74d5f1cc1d_b.jpg')} alt={'logo'} /> */}
                {this.props.tournamentInfo != null && (this.props.tournamentInfo as IParams).Config != null && ((this.props.tournamentInfo as unknown as IParams).Config as unknown as IParams).canEdit === true && <AiFillCamera className={'TournamentInfo-change-image-icon'} />}
                {this.props.tournamentInfo != null && (this.props.tournamentInfo as IParams).Config != null && ((this.props.tournamentInfo as unknown as IParams).Config as unknown as IParams).canEdit === true && <div className={'TournamentInfo-Overlay'}>
                  <input type="file" onChange={(e) => this.updateBackground(e.target.files)} />
                </div>}
              </div>
              <div className="TournamentInfo-content-container">
                <div className="TournamentInfo-content-info-container">
                  <div className="TournamentInfo-content-info-basic-info-container">
                    <div className="TournamentInfo-content-info-basic-info-container-container">
                      <div className="TournamentInfo-content-info-basic-info-container-singleRow">
                        <p className="TournamentInfo-name-text">{this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament ? (this.props.tournamentInfo.Tournament as unknown as IParams).fullName : <Skeleton width={400} height={30} />}</p>
                      </div>
                      <div className="TournamentInfo-content-info-basic-info-container-singleRow">
                        <div className="TournamentInfo-info-item">
                          <p>{this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament ? `Tên ngắn: ${(this.props.tournamentInfo.Tournament as unknown as IParams).shortName}` : <Skeleton width={200} height={20} />}</p>
                        </div>
                      </div>
                      <div className="TournamentInfo-content-info-basic-info-container-singleRow">
                        <div className="TournamentInfo-info-item">
                          <p>{this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament ? `Nhà tài trợ: ${(this.props.tournamentInfo.Tournament as unknown as IParams).donor}` : <Skeleton width={250} height={20} />}</p>
                        </div>
                        <div className="TournamentInfo-info-item">
                          <p>{this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament ? `Trạng thái: ${formatTournamentStatus((this.props.tournamentInfo.Tournament as IParams).status as string)}` : <Skeleton width={225} height={20} />}</p>
                        </div>
                      </div>
                      <div className="TournamentInfo-content-info-basic-info-container-singleRow">
                        <div className="TournamentInfo-info-item">
                          <p>{this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament ? `Ngày bắt đầu: ${formatDateToDisplay((this.props.tournamentInfo.Tournament as unknown as IParams).openingTime as string | undefined, 'dd/MM/yyyy', 'yyyy-MM-dd HH:mm:ss')}` : <Skeleton width={250} height={20} />}</p>
                        </div>
                        <div className="TournamentInfo-info-item">
                          <p>{this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament ? `Địa điểm khai mạc: ${(this.props.tournamentInfo.Tournament as unknown as IParams).openingLocation}` : <Skeleton width={275} height={20} />}</p>
                        </div>
                      </div>
                      <div className="TournamentInfo-content-info-basic-info-container-singleRow">
                        <div className="TournamentInfo-info-item">
                          <p>{this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament ? `Ngày kết thúc: ${formatDateToDisplay((this.props.tournamentInfo.Tournament as unknown as IParams).closingTime as string | undefined, 'dd/MM/yyyy', 'yyyy-MM-dd HH:mm:ss')}` : <Skeleton width={250} height={20} />}</p>
                        </div>
                        <div className="TournamentInfo-info-item">
                          <p>{this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament ? `Địa điểm bế mạc: ${(this.props.tournamentInfo.Tournament as unknown as IParams).closingLocation}` : <Skeleton width={275} height={20} />}</p>
                        </div>
                      </div>
                      <div className="TournamentInfo-content-info-basic-info-container-singleRow">
                        <div className="TournamentInfo-info-item">
                          <p>{this.props.sportInfo != null ? `Bộ môn thi đấu: ${this.props.sportInfo.fullName}` : <Skeleton width={200} height={20} />}</p>
                        </div>
                        <div className="TournamentInfo-info-item">
                          <p>{this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament ? `Cách tổ chức giải: ${(this.props.tournamentInfo.Tournament as IParams).hasGroupStage === true ? '2 giai đoạn' : '1 giai đoạn'}` : <Skeleton width={200} height={20} />}</p>
                        </div>
                      </div>
                      <div className="TournamentInfo-content-info-basic-info-container-singleRow">
                        <div className="TournamentInfo-info-item">
                          <p>
                            {
                              this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament ?
                                `${(this.props.tournamentInfo.Tournament as IParams).hasGroupStage === true ?
                                  'Thể thức vòng bảng: ' : 'Thể thức: '}
                            ${this.props.groupStageSetting != null &&
                                  this.props.allFormats != null &&
                                  this.props.finalStageSetting != null &&
                                  this.props.allFormats.length > 0 &&
                                  this.props.allFormats.find(element => element.id === this.props.finalStageSetting!.formatId) != null &&
                                  this.props.allFormats.find(element => element.id === this.props.groupStageSetting!.formatId) != null ?
                                  ((this.props.tournamentInfo.Tournament as IParams).hasGroupStage !== true ? this.props.allFormats.find(element => element.id === this.props.finalStageSetting!.formatId)!.description :
                                    this.props.allFormats.find(element => element.id === this.props.groupStageSetting!.formatId)!.description) : 'chưa có'
                                }` : <Skeleton width={300} height={20} />}
                          </p>
                        </div>
                      </div>
                      {(this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament && ((this.props.tournamentInfo.Tournament as IParams).hasGroupStage === true ?
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
                        </div>)))}
                      <div className="TournamentInfo-content-info-basic-info-container-singleRow">
                        <div className="TournamentInfo-info-item">
                          <p>
                            {
                              this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament ?
                                `${(this.props.tournamentInfo.Tournament as IParams).hasGroupStage !== true ?
                                  'Số set đấu tối đa 1 trận: ' : 'Số set đấu tối đa 1 trận vòng bảng: '}
                            ${this.props.groupStageSetting != null &&
                                  this.props.finalStageSetting != null ?
                                  ((this.props.tournamentInfo.Tournament as IParams).hasGroupStage !== true ? this.props.finalStageSetting.bo :
                                    this.props.groupStageSetting.bo) : 'chưa có'
                                }` : <Skeleton width={300} height={20} />}
                          </p>
                        </div>
                      </div>
                      {(this.props.tournamentInfo != null &&
                        this.props.tournamentInfo.Tournament &&
                        (this.props.tournamentInfo.Tournament as IParams).hasGroupStage === true &&
                        <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                          <div className="CompetitionInfo-info-item">
                            <p>Số đội tối đa trong 1 bảng: {this.props.groupStageSetting != null ? this.props.groupStageSetting.maxTeamPerTable as number : 2}</p>
                          </div>
                          <div className="CompetitionInfo-info-item">
                            <p>Số đội đi tiếp trong 1 bảng: {this.props.groupStageSetting != null ? this.props.groupStageSetting.advanceTeamPerTable as number : 1}</p>
                          </div>
                        </div>)}
                      {(this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament != null && (this.props.tournamentInfo.Tournament as IParams).hasGroupStage === true &&
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
                        </div>)}
                      {this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament != null && (this.props.tournamentInfo.Tournament as IParams).hasGroupStage === true && this.props.finalStageSetting != null && this.props.finalStageSetting.formatId !== 2 && (this.props.finalStageSetting.formatId === 3 ?
                        <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                          <div className="CompetitionInfo-info-item">
                            <p>{this.props.finalStageSetting.hasHomeMatch === true ? 'Chơi lượt đi lượt về vòng chung kết' : 'Không chơi lượt đi lượt về vòng chung kết'}</p>
                          </div>
                        </div> : <div className="CompetitionInfo-content-info-basic-info-container-singleRow">
                          <div className="CompetitionInfo-info-item">
                            <p>{this.props.finalStageSetting.hasHomeMatch === true ? 'Có trận tranh hạng 3 vòng chung kết' : 'Không có trận tranh hạng 3 vòng chung kết'}</p>
                          </div>
                        </div>)}
                      {this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament != null && (this.props.tournamentInfo.Tournament as IParams).hasGroupStage === true && this.props.finalStageSetting != null &&
                        <div className="TournamentInfo-content-info-basic-info-container-singleRow">
                          <div className="TournamentInfo-info-item">
                            <p>Số set đấu tối đa 1 trận vòng chung kết: {this.props.finalStageSetting.bo}</p>
                          </div>
                        </div>}
                      <div className="TournamentInfo-content-info-basic-info-container-singleRow">
                        <div className="TournamentInfo-info-item">
                          <p>{this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament ? `Mô tả: ${(this.props.tournamentInfo.Tournament as unknown as IParams).description}` : <Skeleton width={300} height={20} />}</p>
                        </div>
                      </div>
                    </div>
                    {this.props.tournamentInfo != null && this.props.tournamentInfo.Tournament != null && <img className={'TournamentInfo-avatar-image'} src={(this.state.errorLoadImage === false ? ((this.props.tournamentInfo.Tournament as IParams).avatar != null ? (this.props.tournamentInfo.Tournament as IParams).avatar as string : config.defaultAvatar) : config.defaultAvatar)} alt={'logo'} onError={this.onImageError} />}
                    {/* <img className={'TournamentInfo-avatar-image'} src={require('../../assets/7ab1b0125d485c8dd6a4e78832b0a4b2fbed3cf8.png')} alt={'logo'} /> */}
                    {this.props.tournamentInfo != null && (this.props.tournamentInfo as IParams).Config != null && ((this.props.tournamentInfo as unknown as IParams).Config as unknown as IParams).canEdit === true && <AiFillCamera className={'TournamentInfo-change-avatar-icon'} />}
                    {this.props.tournamentInfo != null && (this.props.tournamentInfo as IParams).Config != null && ((this.props.tournamentInfo as unknown as IParams).Config as unknown as IParams).canEdit === true && <div className={'TournamentInfo-Overlay2'}>
                      <input type="file" onChange={(e) => this.updateAvatar(e.target.files)} />
                    </div>}
                  </div>
                  {this.props.tournamentInfo != null && this.props.tournamentInfo.Config != null && this.props.tournamentInfo.Tournament != null &&
                    ((this.props.tournamentInfo.Config as IParams).canEdit === true ?
                      ((this.props.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING ?
                        <div className="TournamentInfo-login-container">
                          <div
                            className="TournamentInfo-login"
                            onClick={this.handleStartTournament}
                          >
                            <h4 className="TournamentInfo-login-text">Bắt đầu giải</h4>
                          </div>
                        </div> : ((this.props.tournamentInfo.Tournament as IParams).status === 'processing' ?
                          <div className="TournamentInfo-login-container">
                            <div
                              className="TournamentInfo-login"
                              onClick={this.handleFinishTournament}
                            >
                              <h4 className="TournamentInfo-login-text">Kết thúc giải</h4>
                            </div>
                          </div> : null)) : (cookies.get(COOKIES_TYPE.AUTH_TOKEN) != null && (this.props.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.OPENING &&
                            <div className="TournamentInfo-login-container">
                              <div
                                className="TournamentInfo-login"
                                onClick={this.handleJoinTournament}
                              >
                                <h4 className="TournamentInfo-login-text">Tham gia giải</h4>
                              </div>
                            </div>))
                  }
                  {this.props.tournamentInfo != null && this.props.tournamentInfo.Config != null && this.props.tournamentInfo.Tournament != null && (this.props.tournamentInfo.Config as IParams).canEdit === true && ((this.props.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.INITIALIZING ?
                    <div className="TournamentInfo-login-container">
                      <div
                        className="TournamentInfo-login"
                        onClick={this.handleOpenRegistForm}
                      >
                        <h4 className="TournamentInfo-login-text">Mở form đăng ký</h4>
                      </div>
                    </div> : ((this.props.tournamentInfo.Tournament as IParams).status === TOURNAMENT_STATUS.OPENING &&
                      <div className="TournamentInfo-login-container">
                        <div
                          className="TournamentInfo-login"
                          onClick={this.handleCloseRegistForm}
                        >
                          <h4 className="TournamentInfo-login-text">Đóng form đăng ký</h4>
                        </div>
                      </div>
                    ))
                  }
                  {this.props.tournamentInfo != null && this.props.tournamentInfo.Config != null && this.props.tournamentInfo.Tournament != null && (this.props.tournamentInfo.Config as IParams).canEdit !== true && (this.props.tournamentInfo.Tournament as IParams).status !== 'finished' &&
                    <div className="TournamentInfo-login-container">
                      <div
                        className="TournamentInfo-login"
                        onClick={this.handleReportViolate}
                      >
                        <h4 className="TournamentInfo-login-text">Báo cáo vi phạm</h4>
                      </div>
                    </div>
                  }
                  {this.props.tournamentInfo != null && this.props.tournamentInfo.Config != null && this.props.tournamentInfo.Tournament != null && (this.props.tournamentInfo.Config as IParams).canEdit !== true && (this.props.tournamentInfo.Tournament as IParams).status !== 'finished' &&
                    <div className="TournamentInfo-login-container">
                      <div
                        className="TournamentInfo-login"
                        onClick={this.handleReportCheat}
                      >
                      <h4 className="TournamentInfo-login-text">Báo cáo gian lận</h4>
                      </div>
                    </div>
                  }
                  {/* {this.props.tournamentInfo != null && (this.props.tournamentInfo as IParams).Config != null &&
              (((this.props.tournamentInfo as unknown as IParams).Config as unknown as IParams).canEdit === true ?
                (this.props.tournamentInfo.Tournament != null && (
                  (this.props.tournamentInfo.Tournament as unknown as IParams).status === 'initializing' ?
                    <div className="TournamentInfo-login-container">
                      <div
                        className="TournamentInfo-login"
                        onClick={this.handleStartTournament}
                      >
                        <h4 className="TournamentInfo-login-text">Bắt đầu giải</h4>
                      </div>
                    </div> : ((this.props.tournamentInfo.Tournament as unknown as IParams).status === 'processing' ?
                      <div className="TournamentInfo-login-container">
                        <div
                          className="TournamentInfo-login"
                          onClick={this.handleFinishTournament}
                        >
                          <h4 className="TournamentInfo-login-text">Kết thúc giải</h4>
                        </div>
                      </div> : null))) :
                (cookies.get(COOKIES_TYPE.AUTH_TOKEN) != null && (this.props.tournamentInfo.Tournament as unknown as IParams).status === 'opening' &&
                (<div className="TournamentInfo-login-container">
                  <div
                    className="TournamentInfo-login"
                    onClick={this.handleJoinTournament}
                  >
                    <h4 className="TournamentInfo-login-text">Tham gia giải</h4>
                  </div>
                </div>)
              ))
            } */}
                  {this.props.tournamentInfo != null &&
                    <div className="TournamentInfo-content-info-advanced-info-container">
                      <CustomTab tabList={this.tabList} componentList={this.componentList} selectedIndex={0}></CustomTab>
                    </div>
                  }
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
                    <p style={{ color: 'white', fontSize: '25px' }}>Tiêu đề: </p>
                    <input style={{ width: '200px', height: '25px', marginLeft: '20px' }} type={'text'} onChange={this.onChangeSubjectForm} value={this.state.subjectForm} />
                  </div>
                  <p style={{ color: 'white', fontSize: '25px' }}>Nội dung báo cáo: </p>
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
                {/* <div className={'TournamentInfo-join-tournament-form-competition-option'}>
                  <p>Chọn cuộc thi</p>
                  <Select
                    options={allCompetitionOptions}
                    className="Select"
                    defaultValue={this.state.selectedCompetitionInForm}
                    value={this.state.selectedCompetitionInForm}
                    onChange={this.onChangeSelectedCompetitionInForm}
                    maxMenuHeight={140}
                  />
                  {this.state.selectedCompetitionInFormError === true && <p style={{ color: 'red' }}>{this.state.selectedCompetitionInFormErrorContent}</p>}
                </div> */}
                <TextInput label={'Tên đội'} value={this.state.teamNameInForm} onChangeText={this.onChangeTeamNameInForm} error={this.state.teamNameInFormError} errorContent={this.state.teamNameInFormErrorContent} />
                <TextInput label={'Tên ngắn đội'} value={this.state.teamShortNameInForm} onChangeText={this.onChangeTeamShortNameInForm} error={this.state.teamShortNameInFormError} errorContent={this.state.teamShortNameInFormErrorContent} />
                <div className="TournamentInfo-join-tournament-container">
                  <div className="TournamentInfo-join-tournament-item1">
                    <p style={{color: 'white'}}>Tên</p>
                  </div>
                  <div className="TournamentInfo-join-tournament-item2">
                    <p style={{color: 'white'}}>Giới tính</p>
                  </div>
                  <div className="TournamentInfo-join-tournament-item2">
                    <p style={{color: 'white'}}>Tuổi</p>
                  </div>
                  <div className="TournamentInfo-join-tournament-item1">
                    <p style={{ color: 'white' }}>Email</p>
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
              <CustomModal
                customStyles={customStyles3}
                handleCloseModal={this.handleCloseReportModal2}
                showModal={this.state.showReportModal2}
                handleConfirmModal={this.handleConfirmReportModal2}
              >
                <div className={'Report-modal-container'}>
                  <div className={'Report-modal-header-container'}>
                    <h1>Form Báo cáo gian lận trong giải</h1>
                  </div>
                  <div className={'Report-modal-subject-input-container'}>
                    <p style={{ color: 'white', fontSize: '25px' }}>Tiêu đề: </p>
                    <input style={{ width: '200px', height: '25px', marginLeft: '20px' }} type={'text'} onChange={this.onChangeSubjectForm2} value={this.state.subjectForm2} />
                  </div>
                  <p style={{ color: 'white', fontSize: '25px' }}>Nội dung báo cáo: </p>
                  <textarea rows={7} cols={60} value={this.state.detailReportForm2} onChange={this.onChangeDetailReportForm2}></textarea>
                  {this.state.subjectFormError2 === true && <p style={{ color: 'red' }}>{this.state.subjectFormErrorContent2}</p>}
                  {this.state.detailReportFormError2 === true && <p style={{ color: 'red' }}>{this.state.detailReportFormErrorContent2}</p>}
                </div>
              </CustomModal>
            </div>
          </ReduxBlockUi>
        </ReduxBlockUi>
      </ReduxBlockUi>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    tournamentInfo: state.tournamentInfo,
    listSportsByTournament: state.listSportsByTournament,
    listCompetitionsBySportAndTournament: state.listCompetitionsBySportAndTournament,
    allCompetitionByTournamentId: state.allCompetitionByTournamentId,
    currentUserInfo: state.currentUserInfo,
    sportInfo: state.sportInfo,
    allFormats: state.allFormats,
    groupStageSetting: state.groupStageSetting,
    finalStageSetting: state.finalStageSetting,
  };
};

export default connect(
  mapStateToProps,
  { queryFinalStageSetting, queryGroupStageSetting, queryAllFormats, querySportInfo, openRegisterForm, closeRegisterForm, registTeam, reportViolation, queryAllCompetitionsByTournamentId, deleteListSelectingTeam, onEditBracketMode, updateBackgroundTournament, updateAvatarTournament, queryTournamentInfo, querySportsByTournament, queryCompetitionsBySportAndTournament, startTournament, finishTournament }
)(TournamentInfo);