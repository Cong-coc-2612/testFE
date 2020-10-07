import { IAction } from "interfaces/common";

export const SWAP_TEAM_IN_BRACKET_RANK_SUCCESS = 'SWAP_TEAM_IN_BRACKET_RANK_SUCCESS';
export const SWAP_TEAM_IN_BRACKET_RANK_FAILED = 'SWAP_TEAM_IN_BRACKET_RANK_FAILED';

export function SwappedTeamInBracketRank(state: boolean = false, action: IAction<boolean>) {
  switch (action.type) {
    case SWAP_TEAM_IN_BRACKET_RANK_SUCCESS:
      return action.payload;
    case SWAP_TEAM_IN_BRACKET_RANK_FAILED:
      return action.payload;
    default:
      return state;
  }
}