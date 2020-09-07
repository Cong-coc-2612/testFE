import { IAction, IParams } from "interfaces/common";

export const GET_MATCH_RESULT_SUCCESS = 'GET_MATCH_RESULT_SUCCESS';
export const GET_MATCH_RESULT_FAILED = 'GET_MATCH_RESULT_FAILED';
export const QUERY_MATCH_INFO_SUCCESS = 'QUERY_MATCH_INFO_SUCCESS';
export const QUERY_MATCH_INFO_FAILED = 'QUERY_MATCH_INFO_FAILED';
export const FINISH_MATCH_SUCCESS = 'FINISH_MATCH_SUCCESS';
export const FINISH_MATCH_FAILED = 'FINISH_MATCH_FAILED';

export function MatchResult(state: IParams[] = [], action: IAction<IParams[]>) {
  switch (action.type) {
    case GET_MATCH_RESULT_SUCCESS:
      return action.payload;
    case GET_MATCH_RESULT_FAILED:
      return [];
    default:
      return state;
  }
}

export function MatchInfo(state: IParams | null = null, action: IAction<IParams | null>) {
  switch (action.type) {
    case QUERY_MATCH_INFO_SUCCESS:
      return action.payload;
    case QUERY_MATCH_INFO_FAILED:
      return [];
    default:
      return state;
  }
}