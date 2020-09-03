import { IAction } from "interfaces/common";

export const ACTIVE_ACCOUNT_SUCCESS = 'ACTIVE_ACCOUNT_SUCCESS';
export const ACTIVE_ACCOUNT_FAILED = 'ACTIVE_ACCOUNT_FAILED';
export const ACTIVE_ACCOUNT_DEFAULT = 'ACTIVE_ACCOUNT_DEFAULT';

export function ActiveAccountStatus(state: boolean | null = null, action: IAction<boolean | null>) {
  switch (action.type) {
    case ACTIVE_ACCOUNT_SUCCESS:
      return true;
    case ACTIVE_ACCOUNT_FAILED:
      return false;
    case ACTIVE_ACCOUNT_DEFAULT:
      return null;
    default:
      return state;
  }
}