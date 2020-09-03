import { IAction, IParams } from "interfaces/common";

export const QUERY_ALL_REPORTS_SUCCESS = 'QUERY_ALL_REPORTS_SUCCESS';
export const QUERY_ALL_REPORTS_FAILED = 'QUERY_ALL_REPORTS_FAILED';

export function ListReports(state: IParams | null = null, action: IAction<IParams>) {
  switch (action.type) {
    case QUERY_ALL_REPORTS_SUCCESS:
      return action.payload;
    case QUERY_ALL_REPORTS_FAILED:
      return null;
    default:
      return state;
  }
}