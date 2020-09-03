import { IBigRequest } from "interfaces/common";
import { CHECK_EMAIL_EXISTED } from "redux-saga/actions";
import { CHECK_EMAIL_EXISTED_SUCCESS, CHECK_EMAIL_EXISTED_FAILED, CHECK_EMAIL_EXISTED_DEFAULT } from "../global-reducers/IsEmailExisted-reducer";

export const checkEmailExisted = (data: IBigRequest) => ({
  type: CHECK_EMAIL_EXISTED,
  response: {
    success: CHECK_EMAIL_EXISTED_SUCCESS,
    failed: CHECK_EMAIL_EXISTED_FAILED,
  },
  data: {
    path: data.path,
    param: data.param,
    data: data.data,
  },
});

export const setEmailExistedDefault = () => ({
  type: CHECK_EMAIL_EXISTED_DEFAULT,
});