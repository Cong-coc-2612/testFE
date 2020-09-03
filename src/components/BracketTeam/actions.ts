import { IParams } from "interfaces/common";
import { SET_HOVERING_TEAM, ON_EDIT_BRACKET_MODE, ADD_LIST_TEAM_SELECTING, DELETE_LIST_SELECTING_TEAM } from "redux-saga/actions";
import { ADD_LIST_TEAM_SELECTING_SUCCESS, ADD_LIST_TEAM_SELECTING_FAILED } from "./reducers";

export const setHoveringTeam = (data: number | null) => ({
  type: SET_HOVERING_TEAM,
  payload: data,
});

export const onEditBracketMode = (data: boolean) => ({
  type: ON_EDIT_BRACKET_MODE,
  payload: data,
});

export const deleteListSelectingTeam = () => ({
  type: DELETE_LIST_SELECTING_TEAM,
});

export const addListTeamSelecting = (data: IParams) => ({
  type: ADD_LIST_TEAM_SELECTING,
  response: {
    success: ADD_LIST_TEAM_SELECTING_SUCCESS,
    failed: ADD_LIST_TEAM_SELECTING_FAILED,
  },
  data: data,
});