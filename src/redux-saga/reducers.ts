import { combineReducers } from 'redux';
import { CurrentPage } from './global-reducers/CurrentPage';
import { BracketBoardInfo, BracketStartedStatus, AllMatches } from 'components/BracketBoard/reducers';
import { HoveringTeam, EditBracketMode, ListTeamSelecting } from 'components/BracketTeam/reducers';
import { CurrentUserInfo } from 'screens/Login/reducers';
import { SignUp } from 'screens/SignUp/reducers';
import { ForgotPassword } from 'screens/ForgotPassword/reducers';
import { UserInfo } from 'screens/UserInfo/reducers';
import { TournamentInfo, ListSportsByTournament, ListCompetitionsBySportAndTournament } from 'screens/TournamentInfo/reducers';
import { IsUsernameExisted } from './global-reducers/IsUsernameExisted-reducer';
import { ListTournamentOfUser } from 'components/UserInfoTournament/reducers';
import { ListTeam } from 'components/Teams/reducers';
import { AllCompetitionByTournamentId, NewCompetition } from 'components/CompetitionsSetting/reducers';
import { IsEmailExisted } from './global-reducers/IsEmailExisted-reducer';
import { ListTournament } from 'components/AllTournaments/reducers';
import { ActiveAccountStatus } from 'screens/ActiveAccount/reducers';
import { GlobalSearchString } from './global-reducers/GlobalSearchString-reducer';
import { ListUsers } from 'components/AllUsers/reducers';
import { CompetitionInfo, AllSports, SportInfo, GroupStageSetting, FinalStageSetting, AllFormats } from 'screens/CompetitionInfo/reducers';
import { BracketRankInfo } from 'components/BracketRank/reducers';
import { MatchResult, MatchInfo } from 'components/BracketMatch/reducers';
import { ListTournamentReport } from 'components/TournamentReport/reducers';
import { ListReports } from 'components/AllReports/reducers';
import { ListPendingTeam } from 'components/PendingTeams/reducers';

export const appReducer = combineReducers({
  currentPage: CurrentPage,
  bracketBoardInfo: BracketBoardInfo,
  hoveringTeam: HoveringTeam,
  bracketStartedStatus: BracketStartedStatus,
  currentUserInfo: CurrentUserInfo,
  userInfo: UserInfo,
  signUp: SignUp,
  forgotPassword: ForgotPassword,
  tournamentInfo: TournamentInfo,
  isUsernameExisted: IsUsernameExisted,
  isEmailExisted: IsEmailExisted,
  listTournamentOfUser: ListTournamentOfUser,
  listTournament: ListTournament,
  listTeam: ListTeam,
  allCompetitionByTournamentId: AllCompetitionByTournamentId,
  activeAccountStatus: ActiveAccountStatus,
  globalSearchString: GlobalSearchString,
  listSportsByTournament: ListSportsByTournament,
  listUsers: ListUsers,
  listCompetitionsBySportAndTournament: ListCompetitionsBySportAndTournament,
  editBracketMode: EditBracketMode,
  listTeamSelecting: ListTeamSelecting,
  competitionInfo: CompetitionInfo,
  allSports: AllSports,
  sportInfo: SportInfo,
  groupStageSetting: GroupStageSetting,
  finalStageSetting: FinalStageSetting,
  allFormats: AllFormats,
  newCompetition: NewCompetition,
  bracketRankInfo: BracketRankInfo,
  matchResult: MatchResult,
  listTournamentReport: ListTournamentReport,
  listReports: ListReports,
  listPendingTeam: ListPendingTeam,
  matchInfo: MatchInfo,
  allMatches: AllMatches,
});

export type IState = ReturnType<typeof appReducer>;