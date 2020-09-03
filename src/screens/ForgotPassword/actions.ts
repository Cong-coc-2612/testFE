import { IBigRequest } from "interfaces/common";
import { FORGOT_PASSWORD } from "redux-saga/actions";
import { FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED } from "./reducers";

export const forgotPassword = (data: IBigRequest) => ({
  type: FORGOT_PASSWORD,
  response: {
    success: FORGOT_PASSWORD_SUCCESS,
    failed: FORGOT_PASSWORD_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});