import { IBigRequest } from "interfaces/common";
import { GET_MATCH_RESULT } from "redux-saga/actions";
import { GET_MATCH_RESULT_SUCCESS, GET_MATCH_RESULT_FAILED } from "./reducers";

export const getMatchResult = (data: IBigRequest) => ({
  type: GET_MATCH_RESULT,
  response: {
    success: GET_MATCH_RESULT_SUCCESS,
    failed: GET_MATCH_RESULT_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});