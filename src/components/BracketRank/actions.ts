import { IBigRequest } from "interfaces/common";
import { GET_BRACKET_RANK_INFO } from "redux-saga/actions";
import { GET_BRACKET_RANK_INFO_SUCCESS, GET_BRACKET_RANK_INFO_FAILED } from "./reducers";

export const queryBracketRankInfo = (data: IBigRequest) => ({
  type: GET_BRACKET_RANK_INFO,
  response: {
    success: GET_BRACKET_RANK_INFO_SUCCESS,
    failed: GET_BRACKET_RANK_INFO_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});