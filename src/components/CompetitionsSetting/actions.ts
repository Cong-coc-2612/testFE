import { IBigRequest } from "interfaces/common";
import { QUERY_ALL_COMPETITION_BY_TOURNAMENT_ID, ADD_A_COMPETITION, CREATE_A_FINAL_STAGE_SETTING, CREATE_A_GROUP_STAGE_SETTING } from "redux-saga/actions";
import { QUERY_ALL_COMPETITION_BY_TOURNAMENT_ID_SUCCESS, QUERY_ALL_COMPETITION_BY_TOURNAMENT_ID_FAILED, ADD_A_COMPETITION_SUCCESS, ADD_A_COMPETITION_FAILED, CREATE_A_FINAL_STAGE_SETTING_SUCCESS, CREATE_A_FINAL_STAGE_SETTING_FAILED, CREATE_A_GROUP_STAGE_SETTING_SUCCESS, CREATE_A_GROUP_STAGE_SETTING_FAILED } from "./reducers";

export const queryAllCompetitionsByTournamentId = (data: IBigRequest) => ({
  type: QUERY_ALL_COMPETITION_BY_TOURNAMENT_ID,
  response: {
    success: QUERY_ALL_COMPETITION_BY_TOURNAMENT_ID_SUCCESS,
    failed: QUERY_ALL_COMPETITION_BY_TOURNAMENT_ID_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const addACompetition = (data: IBigRequest) => ({
  type: ADD_A_COMPETITION,
  response: {
    success: ADD_A_COMPETITION_SUCCESS,
    failed: ADD_A_COMPETITION_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const createAFinalStageSetting = (data: IBigRequest) => ({
  type: CREATE_A_FINAL_STAGE_SETTING,
  response: {
    success: CREATE_A_FINAL_STAGE_SETTING_SUCCESS,
    failed: CREATE_A_FINAL_STAGE_SETTING_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const createAGroupStageSetting = (data: IBigRequest) => ({
  type: CREATE_A_GROUP_STAGE_SETTING,
  response: {
    success: CREATE_A_GROUP_STAGE_SETTING_SUCCESS,
    failed: CREATE_A_GROUP_STAGE_SETTING_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});