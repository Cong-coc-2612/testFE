import { IAction, IParams } from "interfaces/common";

export const CHECK_EMAIL_EXISTED_SUCCESS = 'CHECK_EMAIL_EXISTED_SUCCESS';
export const CHECK_EMAIL_EXISTED_FAILED = 'CHECK_EMAIL_EXISTED_FAILED';
export const CHECK_EMAIL_EXISTED_DEFAULT = 'CHECK_EMAIL_EXISTED_DEFAULT';

export function IsEmailExisted(state: boolean | null | {} = {}, action: IAction<IParams>) {
  switch (action.type) {
    case CHECK_EMAIL_EXISTED_SUCCESS:
      return action.payload;
    case CHECK_EMAIL_EXISTED_FAILED:
      return null;
    case CHECK_EMAIL_EXISTED_DEFAULT:
      return {};
    default:
      return state;
  }
}