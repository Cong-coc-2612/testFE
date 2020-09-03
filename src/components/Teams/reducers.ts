import { IAction, IParams } from "interfaces/common";

export const QUERY_LIST_TEAM_SUCCESS = 'QUERY_LIST_TEAM_SUCCESS';
export const QUERY_LIST_TEAM_FAILED = 'QUERY_LIST_TEAM_FAILED';
export const ADD_A_TEAM_TO_COMPETITION_SUCCESS = 'ADD_A_TEAM_TO_COMPETITION_SUCCESS';
export const ADD_A_TEAM_TO_COMPETITION_FAILED = 'ADD_A_TEAM_TO_COMPETITION_FAILED';

export function ListTeam(state: IParams[] | null = null, action: IAction<IParams[]>) {
  switch (action.type) {
    case QUERY_LIST_TEAM_SUCCESS:
      return action.payload;
    case QUERY_LIST_TEAM_FAILED:
      return null;
    default:
      return state;
  }
}