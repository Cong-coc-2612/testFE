import { IParams, IAction } from "interfaces/common";

export const QUERY_TOURNAMENT_REPORT_SUCCESS = 'QUERY_TOURNAMENT_REPORT_SUCCESS';
export const QUERY_TOURNAMENT_REPORT_FAILED = 'QUERY_TOURNAMENT_REPORT_FAILED';

export function ListTournamentReport(state: IParams | null = null, action: IAction<IParams | null>) {
  switch (action.type) {
    case QUERY_TOURNAMENT_REPORT_SUCCESS:
      return action.payload;
    case QUERY_TOURNAMENT_REPORT_FAILED:
      return null;
    default:
      return state;
  }
}