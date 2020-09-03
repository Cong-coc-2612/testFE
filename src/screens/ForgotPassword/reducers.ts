import { IAction, IParams } from "interfaces/common";

export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export function ForgotPassword(state: IParams | null = null, action: IAction<IParams>) {
  switch (action.type) {
    case FORGOT_PASSWORD_SUCCESS:
      return action.payload;
    case FORGOT_PASSWORD_FAILED:
      return null;
    default:
      return state;
  }
}