import { IBigRequest } from "interfaces/common";
import { EDIT_TEAM, DELETE_TEAM } from "redux-saga/actions";
import { EDIT_TEAM_SUCCESS, EDIT_TEAM_FAILED, DELETE_TEAM_SUCCESS, DELETE_TEAM_FAILED } from "./reducers";

export const editTeam = (data: IBigRequest) => ({
  type: EDIT_TEAM,
  response: {
    success: EDIT_TEAM_SUCCESS,
    failed: EDIT_TEAM_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const deleteTeam = (data: IBigRequest) => ({
  type: DELETE_TEAM,
  response: {
    success: DELETE_TEAM_SUCCESS,
    failed: DELETE_TEAM_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});