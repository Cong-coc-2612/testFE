import { IBigRequest } from "interfaces/common";
import { SWAP_TEAM_IN_BRACKET_RANK  } from "redux-saga/actions";
import { SWAP_TEAM_IN_BRACKET_RANK_SUCCESS, SWAP_TEAM_IN_BRACKET_RANK_FAILED } from "./reducers";

export const swapTeamInBracketRank = (data: IBigRequest) => ({
  type: SWAP_TEAM_IN_BRACKET_RANK,
  response: {
    success: SWAP_TEAM_IN_BRACKET_RANK_SUCCESS,
    failed: SWAP_TEAM_IN_BRACKET_RANK_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});