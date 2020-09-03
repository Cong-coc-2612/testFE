import { IAction, IParams } from "interfaces/common";

export const QUERY_LIST_TOURNAMENT_SUCCESS = 'QUERY_LIST_TOURNAMENT_SUCCESS';
export const STOP_TOURNAMENT_SUCCESS = 'STOP_TOURNAMENT_SUCCESS';
export const STOP_TOURNAMENT_FAILED = 'STOP_TOURNAMENT_FAILED';
export const CONTINUE_TOURNAMENT_SUCCESS = 'CONTINUE_TOURNAMENT_SUCCESS';
export const CONTINUE_TOURNAMENT_FAILED = 'CONTINUE_TOURNAMENT_FAILED';
export const QUERY_LIST_TOURNAMENT_FAILED = 'QUERY_LIST_TOURNAMENT_FAILED';

export function ListTournament(state: IParams | null = null, action: IAction<IParams>) {
  switch (action.type) {
    case QUERY_LIST_TOURNAMENT_SUCCESS:
      return action.payload;
    case QUERY_LIST_TOURNAMENT_FAILED:
      return null;
    default:
      return state;
  }
}