import { IAction } from "interfaces/common";
import { SET_HOVERING_TEAM, ON_EDIT_BRACKET_MODE } from "redux-saga/actions";

export const ADD_LIST_TEAM_SELECTING_SUCCESS = 'ADD_LIST_TEAM_SELECTING_SUCCESS';
export const ADD_LIST_TEAM_SELECTING_FAILED = 'ADD_LIST_TEAM_SELECTING_FAILED';
export const SWAP_TWO_TEAM_IN_BRACKET_SUCCESS = 'SWAP_TWO_TEAM_IN_BRACKET_SUCCESS';
export const SWAP_TWO_TEAM_IN_BRACKET_FAILED = 'SWAP_TWO_TEAM_IN_BRACKET_FAILED';

export function HoveringTeam(state: number | null = null, action: IAction<number | null>) {
  switch (action.type) {
    case SET_HOVERING_TEAM:
      return action.payload;
    default:
      return state;
  }
}

export function EditBracketMode(state: boolean = false, action: IAction<boolean>) {
  switch (action.type) {
    case ON_EDIT_BRACKET_MODE:
      return action.payload;
    default:
      return state;
  }
}

export function ListTeamSelecting(state: number[] = [], action: IAction<number[]>) {
  switch (action.type) {
    case ADD_LIST_TEAM_SELECTING_SUCCESS:
      return action.payload;
    case ADD_LIST_TEAM_SELECTING_FAILED:
      return [];
    default:
      return state;
  }
}

// export function SwapTeamStatus(state: boolean = false, action: IAction<boolean>) {
//   switch (action.type) {
//     case ADD_LIST_TEAM_SELECTING_SUCCESS:
//       return action.payload;
//     case ADD_LIST_TEAM_SELECTING_FAILED:
//       return false;
//     default:
//       return state;
//   }
// }