import { IBigRequest } from "interfaces/common";
import {
  QUERY_COMPETITION_INFO,
  QUERY_ALL_FORMATS, QUERY_ALL_SPORTS,
  QUERY_SPORT_INFO,
  QUERY_FINAL_STAGE_SETTING,
  QUERY_GROUP_STAGE_SETTING,
  EDIT_COMPETITION,
  EDIT_FINAL_STAGE_SETTING,
  EDIT_GROUP_STAGE_SETTING,
  UPDATE_SCHEDULE
} from "redux-saga/actions";
import {
  QUERY_ALL_FORMATS_SUCCESS,
  QUERY_ALL_FORMATS_FAILED,
  QUERY_GROUP_STAGE_SETTING_FAILED,
  QUERY_GROUP_STAGE_SETTING_SUCCESS,
  QUERY_FINAL_STAGE_SETTING_FAILED,
  QUERY_FINAL_STAGE_SETTING_SUCCESS,
  QUERY_COMPETITION_INFO_SUCCESS,
  QUERY_COMPETITION_INFO_FAILED,
  QUERY_ALL_SPORTS_SUCCESS,
  QUERY_ALL_SPORTS_FAILED,
  QUERY_SPORT_INFO_SUCCESS,
  QUERY_SPORT_INFO_FAILED,
  EDIT_COMPETITION_SUCCESS,
  EDIT_COMPETITION_FAILED,
  EDIT_FINAL_STAGE_SETTING_SUCCESS,
  EDIT_FINAL_STAGE_SETTING_FAILED,
  EDIT_GROUP_STAGE_SETTING_SUCCESS,
  EDIT_GROUP_STAGE_SETTING_FAILED,
  UPDATE_SCHEDULE_SUCCESS,
  UPDATE_SCHEDULE_FAILED
} from "./reducers";

export const queryCompetition = (data: IBigRequest) => ({
  type: QUERY_COMPETITION_INFO,
  response: {
    success: QUERY_COMPETITION_INFO_SUCCESS,
    failed: QUERY_COMPETITION_INFO_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const editCompetition = (data: IBigRequest) => ({
  type: EDIT_COMPETITION,
  response: {
    success: EDIT_COMPETITION_SUCCESS,
    failed: EDIT_COMPETITION_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const editFinalStageSetting = (data: IBigRequest) => ({
  type: EDIT_FINAL_STAGE_SETTING,
  response: {
    success: EDIT_FINAL_STAGE_SETTING_SUCCESS,
    failed: EDIT_FINAL_STAGE_SETTING_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const editGroupStageSetting = (data: IBigRequest) => ({
  type: EDIT_GROUP_STAGE_SETTING,
  response: {
    success: EDIT_GROUP_STAGE_SETTING_SUCCESS,
    failed: EDIT_GROUP_STAGE_SETTING_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const updateSchedule = (data: IBigRequest) => ({
  type: UPDATE_SCHEDULE,
  response: {
    success: UPDATE_SCHEDULE_SUCCESS,
    failed: UPDATE_SCHEDULE_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const queryFinalStageSetting = (data: IBigRequest) => ({
  type: QUERY_FINAL_STAGE_SETTING,
  response: {
    success: QUERY_FINAL_STAGE_SETTING_SUCCESS,
    failed: QUERY_FINAL_STAGE_SETTING_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const queryGroupStageSetting = (data: IBigRequest) => ({
  type: QUERY_GROUP_STAGE_SETTING,
  response: {
    success: QUERY_GROUP_STAGE_SETTING_SUCCESS,
    failed: QUERY_GROUP_STAGE_SETTING_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const querySportInfo = (data: IBigRequest) => ({
  type: QUERY_SPORT_INFO,
  response: {
    success: QUERY_SPORT_INFO_SUCCESS,
    failed: QUERY_SPORT_INFO_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const queryAllSports = () => ({
  type: QUERY_ALL_SPORTS,
  response: {
    success: QUERY_ALL_SPORTS_SUCCESS,
    failed: QUERY_ALL_SPORTS_FAILED,
  },
});

export const queryAllFormats = () => ({
  type: QUERY_ALL_FORMATS,
  response: {
    success: QUERY_ALL_FORMATS_SUCCESS,
    failed: QUERY_ALL_FORMATS_FAILED,
  },
});