import { IBigRequest } from "interfaces/common";
import { CHANGE_PASSWORD } from "redux-saga/actions";
import { CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILED } from "./reducers";

export const changePassword = (data: IBigRequest) => ({
  type: CHANGE_PASSWORD,
  response: {
    success: CHANGE_PASSWORD_SUCCESS,
    failed: CHANGE_PASSWORD_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});