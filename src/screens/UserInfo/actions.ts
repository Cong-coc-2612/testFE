import { IBigRequest } from "interfaces/common";
import { QUERY_USER_INFO, EDIT_USER_INFO, USER_UPDATE_BACKGROUND, USER_UPDATE_AVATAR } from "redux-saga/actions";
import { QUERY_USER_INFO_SUCCESS, QUERY_USER_INFO_FAILED, EDIT_USER_INFO_SUCCESS, EDIT_USER_INFO_FAILED, USER_UPDATE_BACKGROUND_SUCCESS, USER_UPDATE_BACKGROUND_FAILED, USER_UPDATE_AVATAR_SUCCESS, USER_UPDATE_AVATAR_FAILED } from "./reducers";

export const queryUserInfo = (data: IBigRequest) => ({
  type: QUERY_USER_INFO,
  response: {
    success: QUERY_USER_INFO_SUCCESS,
    failed: QUERY_USER_INFO_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const editUserInfo = (data: IBigRequest) => ({
  type: EDIT_USER_INFO,
  response: {
    success: EDIT_USER_INFO_SUCCESS,
    failed: EDIT_USER_INFO_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const updateBackground = (data: IBigRequest) => ({
  type: USER_UPDATE_BACKGROUND,
  response: {
    success: USER_UPDATE_BACKGROUND_SUCCESS,
    failed: USER_UPDATE_BACKGROUND_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const updateAvatar = (data: IBigRequest) => ({
  type: USER_UPDATE_AVATAR,
  response: {
    success: USER_UPDATE_AVATAR_SUCCESS,
    failed: USER_UPDATE_AVATAR_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});