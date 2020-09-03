import { IAction, IParams } from "interfaces/common";

export const GET_BRACKET_RANK_INFO_SUCCESS = 'GET_BRACKET_RANK_INFO_SUCCESS';
export const GET_BRACKET_RANK_INFO_FAILED = 'GET_BRACKET_RANK_INFO_FAILED';

export function BracketRankInfo(state: IParams | null = null, action: IAction<IParams | null>) {
  switch (action.type) {
    case GET_BRACKET_RANK_INFO_SUCCESS:
      return action.payload;
    case GET_BRACKET_RANK_INFO_FAILED:
      return null;
    default:
      return state;
  }
}