import { IBigRequest } from "interfaces/common";
import { CHECK_USERNAME_EXISTED } from "redux-saga/actions";
import { CHECK_USERNAME_EXISTED_SUCCESS, CHECK_USERNAME_EXISTED_FAILED, CHECK_USERNAME_EXISTED_DEFAULT } from "../global-reducers/IsUsernameExisted-reducer";

export const checkUsernameExisted = (data: IBigRequest) => ({
  type: CHECK_USERNAME_EXISTED,
  response: {
    success: CHECK_USERNAME_EXISTED_SUCCESS,
    failed: CHECK_USERNAME_EXISTED_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const setUsernameExistedDefault = () => ({
  type: CHECK_USERNAME_EXISTED_DEFAULT,
});