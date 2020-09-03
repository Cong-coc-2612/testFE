import { IBigRequest } from "interfaces/common";
import { QUERY_ALL_REPORTS } from "redux-saga/actions";
import { QUERY_ALL_REPORTS_SUCCESS, QUERY_ALL_REPORTS_FAILED } from "./reducers";

export const queryAllReports = (data: IBigRequest) => ({
  type: QUERY_ALL_REPORTS,
  response: {
    success: QUERY_ALL_REPORTS_SUCCESS,
    failed: QUERY_ALL_REPORTS_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});