import { IAction, IParams } from "interfaces/common";
import { cookies } from 'utils/cookies';
import { COOKIES_TYPE } from "global";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export function CurrentUserInfo(state: IParams | null = cookies.get(COOKIES_TYPE.AUTH_TOKEN) != null && cookies.get(COOKIES_TYPE.AUTH_TOKEN).User != null ? cookies.get(COOKIES_TYPE.AUTH_TOKEN).User : null, action: IAction<IParams>) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload;
    case LOGIN_FAILED:
      return null;
    default:
      return state;
  }
}