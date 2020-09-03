import { IBigRequest } from "interfaces/common";
import { QUERY_TOURNAMENT_REPORT } from "redux-saga/actions";
import { QUERY_TOURNAMENT_REPORT_SUCCESS, QUERY_TOURNAMENT_REPORT_FAILED } from "./reducers";

export const queryTournamentReport = (data: IBigRequest) => ({
  type: QUERY_TOURNAMENT_REPORT,
  response: {
    success: QUERY_TOURNAMENT_REPORT_SUCCESS,
    failed: QUERY_TOURNAMENT_REPORT_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});