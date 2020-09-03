import { IBigRequest } from "interfaces/common";
import { REPORT_VIOLATION, QUERY_TOURNAMENT_INFO, QUERY_SPORTS_BY_TOURNAMENT, QUERY_COMPETITIONS_BY_SPORT_AND_TOURNAMENT, START_TOURNAMENT, FINISH_TOURNAMENT, TOURNAMENT_UPDATE_AVATAR, TOURNAMENT_UPDATE_BACKGROUND, REGIST_TEAM, OPEN_REGISTER_FORM, CLOSE_REGISTER_FORM } from "redux-saga/actions";
import { REGIST_TEAM_FAILED, QUERY_TOURNAMENT_INFO_SUCCESS, QUERY_TOURNAMENT_INFO_FAILED, QUERY_SPORTS_BY_TOURNAMENT_SUCCESS, QUERY_SPORTS_BY_TOURNAMENT_FAILED, QUERY_COMPETITIONS_BY_SPORT_AND_TOURNAMENT_SUCCESS, QUERY_COMPETITIONS_BY_SPORT_AND_TOURNAMENT_FAILED, FINISH_TOURNAMENT_SUCCESS, FINISH_TOURNAMENT_FAILED, START_TOURNAMENT_SUCCESS, START_TOURNAMENT_FAILED, TOURNAMENT_UPDATE_AVATAR_SUCCESS, TOURNAMENT_UPDATE_AVATAR_FAILED, TOURNAMENT_UPDATE_BACKGROUND_SUCCESS, TOURNAMENT_UPDATE_BACKGROUND_FAILED, REPORT_VIOLATION_SUCCESS, REPORT_VIOLATION_FAILED, REGIST_TEAM_SUCCESS, OPEN_REGISTER_FORM_SUCCESS, OPEN_REGISTER_FORM_FAILED, CLOSE_REGISTER_FORM_SUCCESS, CLOSE_REGISTER_FORM_FAILED } from "./reducers";

export const queryTournamentInfo = (data: IBigRequest) => ({
  type: QUERY_TOURNAMENT_INFO,
  response: {
    success: QUERY_TOURNAMENT_INFO_SUCCESS,
    failed: QUERY_TOURNAMENT_INFO_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const querySportsByTournament = (data: IBigRequest) => ({
  type: QUERY_SPORTS_BY_TOURNAMENT,
  response: {
    success: QUERY_SPORTS_BY_TOURNAMENT_SUCCESS,
    failed: QUERY_SPORTS_BY_TOURNAMENT_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const queryCompetitionsBySportAndTournament = (data: IBigRequest) => ({
  type: QUERY_COMPETITIONS_BY_SPORT_AND_TOURNAMENT,
  response: {
    success: QUERY_COMPETITIONS_BY_SPORT_AND_TOURNAMENT_SUCCESS,
    failed: QUERY_COMPETITIONS_BY_SPORT_AND_TOURNAMENT_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const startTournament = (data: IBigRequest) => ({
  type: START_TOURNAMENT,
  response: {
    success: START_TOURNAMENT_SUCCESS,
    failed: START_TOURNAMENT_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const finishTournament = (data: IBigRequest) => ({
  type: FINISH_TOURNAMENT,
  response: {
    success: FINISH_TOURNAMENT_SUCCESS,
    failed: FINISH_TOURNAMENT_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const updateAvatarTournament = (data: IBigRequest) => ({
  type: TOURNAMENT_UPDATE_AVATAR,
  response: {
    success: TOURNAMENT_UPDATE_AVATAR_SUCCESS,
    failed: TOURNAMENT_UPDATE_AVATAR_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const updateBackgroundTournament = (data: IBigRequest) => ({
  type: TOURNAMENT_UPDATE_BACKGROUND,
  response: {
    success: TOURNAMENT_UPDATE_BACKGROUND_SUCCESS,
    failed: TOURNAMENT_UPDATE_BACKGROUND_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const reportViolation = (data: IBigRequest) => ({
  type: REPORT_VIOLATION,
  response: {
    success: REPORT_VIOLATION_SUCCESS,
    failed: REPORT_VIOLATION_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const registTeam = (data: IBigRequest) => ({
  type: REGIST_TEAM,
  response: {
    success: REGIST_TEAM_SUCCESS,
    failed: REGIST_TEAM_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const openRegisterForm = (data: IBigRequest) => ({
  type: OPEN_REGISTER_FORM,
  response: {
    success: OPEN_REGISTER_FORM_SUCCESS,
    failed: OPEN_REGISTER_FORM_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const closeRegisterForm = (data: IBigRequest) => ({
  type: CLOSE_REGISTER_FORM,
  response: {
    success: CLOSE_REGISTER_FORM_SUCCESS,
    failed: CLOSE_REGISTER_FORM_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});