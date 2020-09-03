import { IAction, IParams } from "interfaces/common";

export const QUERY_LIST_USER_SUCCESS = 'QUERY_LIST_USER_SUCCESS';
export const QUERY_LIST_USER_FAILED = 'QUERY_LIST_USER_FAILED';
export const DEACTIVE_USER_SUCCESS = 'DEACTIVE_USER_SUCCESS';
export const DEACTIVE_USER_FAILED = 'DEACTIVE_USER_FAILED';
export const ACTIVE_USER_FAILED = 'ACTIVE_USER_FAILED';
export const ACTIVE_USER_SUCCESS = 'ACTIVE_USER_SUCCESS';
export const SET_ADMIN_SUCCESS = 'SET_ADMIN_SUCCESS';
export const SET_ADMIN_FAILED = 'SET_ADMIN_FAILED';

export function ListUsers(state: IParams | null = null, action: IAction<IParams>) {
  switch (action.type) {
    case QUERY_LIST_USER_SUCCESS:
      return action.payload;
    case QUERY_LIST_USER_FAILED:
      return null;
    default:
      return state;
  }
}