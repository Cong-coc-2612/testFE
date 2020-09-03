import { IBigRequest } from "interfaces/common";
import { QUERY_LIST_TEAM, ADD_A_TEAM_TO_COMPETITION } from "redux-saga/actions";
import { QUERY_LIST_TEAM_SUCCESS, QUERY_LIST_TEAM_FAILED, ADD_A_TEAM_TO_COMPETITION_SUCCESS, ADD_A_TEAM_TO_COMPETITION_FAILED } from "./reducers";

export const queryListTeams = (data: IBigRequest) => ({
  type: QUERY_LIST_TEAM,
  response: {
    success: QUERY_LIST_TEAM_SUCCESS,
    failed: QUERY_LIST_TEAM_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const addATeamToCompetition = (data: IBigRequest) => ({
  type: ADD_A_TEAM_TO_COMPETITION,
  response: {
    success: ADD_A_TEAM_TO_COMPETITION_SUCCESS,
    failed: ADD_A_TEAM_TO_COMPETITION_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});