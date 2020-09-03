import { IBigRequest } from "interfaces/common";
import { QUERY_LIST_TOURNAMENT, STOP_TOURNAMENT, CONTINUE_TOURNAMENT } from "redux-saga/actions";
import { QUERY_LIST_TOURNAMENT_SUCCESS, QUERY_LIST_TOURNAMENT_FAILED, STOP_TOURNAMENT_SUCCESS, STOP_TOURNAMENT_FAILED, CONTINUE_TOURNAMENT_SUCCESS, CONTINUE_TOURNAMENT_FAILED } from "./reducers";

export const queryListTournament = (data: IBigRequest) => ({
  type: QUERY_LIST_TOURNAMENT,
  response: {
    success: QUERY_LIST_TOURNAMENT_SUCCESS,
    failed: QUERY_LIST_TOURNAMENT_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const stopTournament = (data: IBigRequest) => ({
  type: STOP_TOURNAMENT,
  response: {
    success: STOP_TOURNAMENT_SUCCESS,
    failed: STOP_TOURNAMENT_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const continueTournament = (data: IBigRequest) => ({
  type: CONTINUE_TOURNAMENT,
  response: {
    success: CONTINUE_TOURNAMENT_SUCCESS,
    failed: CONTINUE_TOURNAMENT_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});