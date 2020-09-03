import { IBigRequest } from "interfaces/common";
import { DELETE_COMPETITION } from "redux-saga/actions";
import { DELETE_COMPETITION_SUCCESS, DELETE_COMPETITION_FAILED } from "./reducers";

export const deleteCompetition = (data: IBigRequest) => ({
  type: DELETE_COMPETITION,
  response: {
    success: DELETE_COMPETITION_SUCCESS,
    failed: DELETE_COMPETITION_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});