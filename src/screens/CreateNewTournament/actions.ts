import { IBigRequest } from "interfaces/common";
import { CREATE_NEW_TOURNAMENT } from "redux-saga/actions";
import { CREATE_NEW_TOURNAMENT_SUCCESS, CREATE_NEW_TOURNAMENT_FAILED } from "./reducers";

export const createNewTournament = (data: IBigRequest) => ({
  type: CREATE_NEW_TOURNAMENT,
  response: {
    success: CREATE_NEW_TOURNAMENT_SUCCESS,
    failed: CREATE_NEW_TOURNAMENT_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});