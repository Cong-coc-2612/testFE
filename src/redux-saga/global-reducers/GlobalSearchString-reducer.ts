import { IAction } from 'interfaces/common';
import { SET_GLOBAL_SEARCH_STRING } from 'redux-saga/actions';

export function GlobalSearchString(state: string = '', action: IAction<string>) {
  switch (action.type) {
    case SET_GLOBAL_SEARCH_STRING:
      return action.payload;
    default:
      return state;
  }
}