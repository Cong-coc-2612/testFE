import { IAction, IParams } from "interfaces/common";

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

export function SignUp(state: IParams | null = null, action: IAction<IParams>) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return action.payload;
    case SIGNUP_FAILED:
      return null;
    default:
      return state;
  }
}