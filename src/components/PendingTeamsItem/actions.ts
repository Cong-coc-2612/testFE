import { IBigRequest } from "interfaces/common";
import { APPROVE_TEAM, REJECT_TEAM } from "redux-saga/actions";
import { APPROVE_TEAM_SUCCESS, APPROVE_TEAM_FAILED, REJECT_TEAM_SUCCESS, REJECT_TEAM_FAILED } from "./reducers";

export const approveTeam = (data: IBigRequest) => ({
  type: APPROVE_TEAM,
  response: {
    success: APPROVE_TEAM_SUCCESS,
    failed: APPROVE_TEAM_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const rejectTeam = (data: IBigRequest) => ({
  type: REJECT_TEAM,
  response: {
    success: REJECT_TEAM_SUCCESS,
    failed: REJECT_TEAM_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});