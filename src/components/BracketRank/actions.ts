import { IBigRequest } from "interfaces/common";
import { GET_BRACKET_RANK_INFO, CHANGE_NOTE_BRACKET_RANK } from "redux-saga/actions";
import { GET_BRACKET_RANK_INFO_SUCCESS, GET_BRACKET_RANK_INFO_FAILED, CHANGE_NOTE_BRACKET_RANK_SUCCESS, CHANGE_NOTE_BRACKET_RANK_FAILED } from "./reducers";

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

export const changeNoteBracketRank = (data: IBigRequest) => ({
  type: CHANGE_NOTE_BRACKET_RANK,
  response: {
    success: CHANGE_NOTE_BRACKET_RANK_SUCCESS,
    failed: CHANGE_NOTE_BRACKET_RANK_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});