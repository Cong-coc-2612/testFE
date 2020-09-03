import { IBigRequest } from "interfaces/common";
import { QUERY_LIST_USER, DEACTIVE_USER, ACTIVE_USER, SET_ADMIN } from "redux-saga/actions";
import { QUERY_LIST_USER_SUCCESS, QUERY_LIST_USER_FAILED, DEACTIVE_USER_SUCCESS, DEACTIVE_USER_FAILED, ACTIVE_USER_SUCCESS, ACTIVE_USER_FAILED, SET_ADMIN_SUCCESS, SET_ADMIN_FAILED } from "./reducers";

export const queryListUsers = (data: IBigRequest) => ({
  type: QUERY_LIST_USER,
  response: {
    success: QUERY_LIST_USER_SUCCESS,
    failed: QUERY_LIST_USER_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const deActiveUser = (data: IBigRequest) => ({
  type: DEACTIVE_USER,
  response: {
    success: DEACTIVE_USER_SUCCESS,
    failed: DEACTIVE_USER_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const activeUser = (data: IBigRequest) => ({
  type: ACTIVE_USER,
  response: {
    success: ACTIVE_USER_SUCCESS,
    failed: ACTIVE_USER_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const setAdmin = (data: IBigRequest) => ({
  type: SET_ADMIN,
  response: {
    success: SET_ADMIN_SUCCESS,
    failed: SET_ADMIN_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});