import { IAction } from 'interfaces/common';

export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

export function CurrentPage(state = null, action: IAction<string>) {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return action.payload;
    default:
      return state;
  }
}