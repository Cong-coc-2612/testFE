import { IAction, IParams } from "interfaces/common";

export const CHECK_USERNAME_EXISTED_SUCCESS = 'CHECK_USERNAME_EXISTED_SUCCESS';
export const CHECK_USERNAME_EXISTED_FAILED = 'CHECK_USERNAME_EXISTED_FAILED';
export const CHECK_USERNAME_EXISTED_DEFAULT = 'CHECK_USERNAME_EXISTED_DEFAULT';

export function IsUsernameExisted(state: boolean | null | {} = {}, action: IAction<IParams>) {
  switch (action.type) {
    case CHECK_USERNAME_EXISTED_SUCCESS:
      return action.payload;
    case CHECK_USERNAME_EXISTED_FAILED:
      return null;
    case CHECK_USERNAME_EXISTED_DEFAULT:
      return {};
    default:
      return state;
  }
}