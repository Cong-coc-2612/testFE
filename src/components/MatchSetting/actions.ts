import { IBigRequest } from "interfaces/common";
import { UPDATE_MATCH_RESULT } from "redux-saga/actions";
import { UPDATE_MATCH_RESULT_SUCCESS, UPDATE_MATCH_RESULT_FAILED } from "./reducers";

export const updateResult = (data: IBigRequest) => ({
  type: UPDATE_MATCH_RESULT,
  response: {
    success: UPDATE_MATCH_RESULT_SUCCESS,
    failed: UPDATE_MATCH_RESULT_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});