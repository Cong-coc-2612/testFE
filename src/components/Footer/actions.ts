import { IBigRequest } from "interfaces/common";
import { LOGOUT, SEARCH_TOURNAMENT, SEARCH_USER } from "redux-saga/actions";
import { QUERY_LIST_TOURNAMENT_SUCCESS, QUERY_LIST_TOURNAMENT_FAILED } from "components/AllTournaments/reducers";
import { QUERY_LIST_USER_SUCCESS, QUERY_LIST_USER_FAILED } from "components/AllUsers/reducers";

export const logOut = () => ({
  type: LOGOUT,
});

export const searchTournaments = (data: IBigRequest) => ({
  type: SEARCH_TOURNAMENT,
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

export const searchUsers = (data: IBigRequest) => ({
  type: SEARCH_USER,
  response: {
    success: QUERY_LIST_USER_SUCCESS,
    failed: QUERY_LIST_USER_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});