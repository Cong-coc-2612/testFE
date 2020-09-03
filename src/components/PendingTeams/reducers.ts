import { IAction, IParams } from "interfaces/common";

export const QUERY_LIST_PENDING_TEAM_SUCCESS = 'QUERY_LIST_PENDING_TEAM_SUCCESS';
export const QUERY_LIST_PENDING_TEAM_FAILED = 'QUERY_LIST_PENDING_TEAM_FAILED';

export function ListPendingTeam(state: IParams[] | null = null, action: IAction<IParams[]>) {
  switch (action.type) {
    case QUERY_LIST_PENDING_TEAM_SUCCESS:
      return action.payload;
    case QUERY_LIST_PENDING_TEAM_FAILED:
      return null;
    default:
      return state;
  }
}