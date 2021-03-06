import { IBigRequest } from "interfaces/common";
import { UPDATE_MATCH_RESULT, UPDATE_MATCH_INFO, UPDATE_MATCH_INFO_BEFORE_START } from "redux-saga/actions";
import { UPDATE_MATCH_RESULT_SUCCESS, UPDATE_MATCH_RESULT_FAILED, UPDATE_MATCH_INFO_SUCCESS, UPDATE_MATCH_INFO_FAILED, UPDATE_MATCH_INFO_BEFORE_START_SUCCESS, UPDATE_MATCH_INFO_BEFORE_START_FAILED } from "./reducers";

export const updateResult = (data: IBigRequest) => ({
  type: UPDATE_MATCH_RESULT,
  response: {
    success: UPDATE_MATCH_RESULT_SUCCESS,
    failed: UPDATE_MATCH_RESULT_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const updateMatchInfo = (data: IBigRequest) => ({
  type: UPDATE_MATCH_INFO,
  response: {
    success: UPDATE_MATCH_INFO_SUCCESS,
    failed: UPDATE_MATCH_INFO_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const updateMatchInfoBeforeStart = (data: IBigRequest) => ({
  type: UPDATE_MATCH_INFO_BEFORE_START,
  response: {
    success: UPDATE_MATCH_INFO_BEFORE_START_SUCCESS,
    failed: UPDATE_MATCH_INFO_BEFORE_START_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});