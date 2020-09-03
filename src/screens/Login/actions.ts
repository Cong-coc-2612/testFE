import { IBigRequest } from "interfaces/common";
import { LOGIN } from "redux-saga/actions";
import { LOGIN_SUCCESS, LOGIN_FAILED } from "./reducers";

export const login = (data: IBigRequest) => ({
  type: LOGIN,
  response: {
    success: LOGIN_SUCCESS,
    failed: LOGIN_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});