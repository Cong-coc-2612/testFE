import { IBigRequest } from "interfaces/common";
import { ACTIVE_ACCOUNT } from "redux-saga/actions";
import { ACTIVE_ACCOUNT_SUCCESS, ACTIVE_ACCOUNT_FAILED } from "./reducers";

export const activeAccount = (data: IBigRequest) => ({
  type: ACTIVE_ACCOUNT,
  response: {
    success: ACTIVE_ACCOUNT_SUCCESS,
    failed: ACTIVE_ACCOUNT_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});