import { IBigRequest } from "interfaces/common";
import { GET_MATCH_RESULT, QUERY_MATCH_INFO, FINISH_MATCH } from "redux-saga/actions";
import { GET_MATCH_RESULT_SUCCESS, GET_MATCH_RESULT_FAILED, QUERY_MATCH_INFO_SUCCESS, QUERY_MATCH_INFO_FAILED, FINISH_MATCH_SUCCESS, FINISH_MATCH_FAILED } from "./reducers";

export const getMatchResult = (data: IBigRequest) => ({
  type: GET_MATCH_RESULT,
  response: {
    success: GET_MATCH_RESULT_SUCCESS,
    failed: GET_MATCH_RESULT_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const queryMatchInfo = (data: IBigRequest) => ({
  type: QUERY_MATCH_INFO,
  response: {
    success: QUERY_MATCH_INFO_SUCCESS,
    failed: QUERY_MATCH_INFO_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const finishMatch = (data: IBigRequest) => ({
  type: FINISH_MATCH,
  response: {
    success: FINISH_MATCH_SUCCESS,
    failed: FINISH_MATCH_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});