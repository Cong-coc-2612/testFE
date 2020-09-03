import { IBigRequest } from "interfaces/common";
import { SIGNUP } from "redux-saga/actions";
import { SIGNUP_SUCCESS, SIGNUP_FAILED } from "./reducers";

export const signUp = (data: IBigRequest) => ({
  type: SIGNUP,
  response: {
    success: SIGNUP_SUCCESS,
    failed: SIGNUP_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});