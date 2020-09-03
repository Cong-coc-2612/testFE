import { IAction, IParams } from "interfaces/common";

export const QUERY_USER_INFO_SUCCESS = 'QUERY_USER_INFO_SUCCESS';
export const QUERY_USER_INFO_FAILED = 'QUERY_USER_INFO_FAILED';
export const EDIT_USER_INFO_SUCCESS = 'EDIT_USER_INFO_SUCCESS';
export const EDIT_USER_INFO_FAILED = 'EDIT_USER_INFO_FAILED';
export const USER_UPDATE_AVATAR_SUCCESS = 'USER_UPDATE_AVATAR_SUCCESS';
export const USER_UPDATE_AVATAR_FAILED = 'USER_UPDATE_AVATAR_FAILED';
export const USER_UPDATE_BACKGROUND_SUCCESS = 'USER_UPDATE_BACKGROUND_SUCCESS';
export const USER_UPDATE_BACKGROUND_FAILED = 'USER_UPDATE_BACKGROUND_FAILED';

export function UserInfo(state: IParams | null = null, action: IAction<IParams>) {
  switch (action.type) {
    case QUERY_USER_INFO_SUCCESS:
      return action.payload;
    case QUERY_USER_INFO_FAILED:
      return null;
    default:
      return state;
  }
}

export function EditUserInfo(state: IParams | null = null, action: IAction<IParams>) {
  switch (action.type) {
    case EDIT_USER_INFO_SUCCESS:
      return action.payload.User;
    case EDIT_USER_INFO_FAILED:
      return null;
    default:
      return state;
  }
}