import { SET_BRACKET_STATUS } from "redux-saga/actions";
import { IAction, IParams } from "interfaces/common";

export const GET_BRACKET_BOARD_INFO_SUCCESS = 'GET_BRACKET_BOARD_INFO_SUCCESS';
export const GET_BRACKET_BOARD_INFO_FAILED = 'GET_BRACKET_BOARD_INFO_FAILED';

export function BracketBoardInfo(state: IParams | null = null, action: IAction<IParams | null>) {
  switch (action.type) {
    case GET_BRACKET_BOARD_INFO_SUCCESS:
      return action.payload;
    case GET_BRACKET_BOARD_INFO_FAILED:
      return null;
    default:
      return state;
  }
}

export function BracketStartedStatus(state = false, action: IAction<boolean>) {
  switch (action.type) {
    case SET_BRACKET_STATUS:
      return action.payload;
    default:
      return state;
  }
}