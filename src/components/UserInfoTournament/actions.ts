import { IBigRequest } from "interfaces/common";
import { QUERY_LIST_TOURNAMENT_OF_USER } from "redux-saga/actions";
import { QUERY_LIST_TOURNAMENT_OF_USER_SUCCESS, QUERY_LIST_TOURNAMENT_OF_USER_FAILED } from "./reducers";

export const queryListTournamentsOfUser = (data: IBigRequest) => ({
  type: QUERY_LIST_TOURNAMENT_OF_USER,
  response: {
    success: QUERY_LIST_TOURNAMENT_OF_USER_SUCCESS,
    failed: QUERY_LIST_TOURNAMENT_OF_USER_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});