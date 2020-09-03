import { IBigRequest } from "interfaces/common";
import { EDIT_TOURNAMENT_INFO } from "redux-saga/actions";
import { EDIT_TOURNAMENT_INFO_SUCCESS, EDIT_TOURNAMENT_INFO_FAILED } from "./reducers";

export const editTournamentInfo = (data: IBigRequest) => ({
  type: EDIT_TOURNAMENT_INFO,
  response: {
    success: EDIT_TOURNAMENT_INFO_SUCCESS,
    failed: EDIT_TOURNAMENT_INFO_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});