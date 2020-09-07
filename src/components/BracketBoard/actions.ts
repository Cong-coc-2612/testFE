import { IBigRequest } from "interfaces/common";
import { GET_BRACKET_BOARD_INFO, SET_BRACKET_STATUS, QUERY_ALL_MATCHES } from "redux-saga/actions";
import { GET_BRACKET_BOARD_INFO_SUCCESS, GET_BRACKET_BOARD_INFO_FAILED, QUERY_ALL_MATCHES_SUCCESS, QUERY_ALL_MATCHES_FAILED } from "./reducers";

export const queryBracketBoardInfo = (data: IBigRequest) => ({
  type: GET_BRACKET_BOARD_INFO,
  response: {
    success: GET_BRACKET_BOARD_INFO_SUCCESS,
    failed: GET_BRACKET_BOARD_INFO_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const queryAllMatches = (data: IBigRequest) => ({
  type: QUERY_ALL_MATCHES,
  response: {
    success: QUERY_ALL_MATCHES_SUCCESS,
    failed: QUERY_ALL_MATCHES_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const setBracketStartedStatus = (data: boolean) => ({
  type: SET_BRACKET_STATUS,
  payload: data,
});