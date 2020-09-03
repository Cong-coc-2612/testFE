import { IAction, IParams } from "interfaces/common";

export const QUERY_ALL_COMPETITION_BY_TOURNAMENT_ID_SUCCESS = 'QUERY_ALL_COMPETITION_BY_TOURNAMENT_ID_SUCCESS';
export const ADD_A_COMPETITION_SUCCESS = 'ADD_A_COMPETITION_SUCCESS';
export const ADD_A_COMPETITION_FAILED = 'ADD_A_COMPETITION_FAILED';
export const QUERY_ALL_COMPETITION_BY_TOURNAMENT_ID_FAILED = 'QUERY_ALL_COMPETITION_BY_TOURNAMENT_ID_FAILED';
export const CREATE_A_FINAL_STAGE_SETTING_SUCCESS = 'CREATE_A_FINAL_STAGE_SETTING_SUCCESS';
export const CREATE_A_FINAL_STAGE_SETTING_FAILED = 'CREATE_A_FINAL_STAGE_SETTING_FAILED';
export const CREATE_A_GROUP_STAGE_SETTING_SUCCESS = 'CREATE_A_GROUP_STAGE_SETTING_SUCCESS';
export const CREATE_A_GROUP_STAGE_SETTING_FAILED = 'CREATE_A_GROUP_STAGE_SETTING_FAILED';

export function AllCompetitionByTournamentId(state: IParams[] | null = null, action: IAction<IParams[]>) {
  switch (action.type) {
    case QUERY_ALL_COMPETITION_BY_TOURNAMENT_ID_SUCCESS:
      return action.payload;
    case QUERY_ALL_COMPETITION_BY_TOURNAMENT_ID_FAILED:
      return null;
    default:
      return state;
  }
}

export function NewCompetition(state: IParams | null = null, action: IAction<IParams>) {
  switch (action.type) {
    case ADD_A_COMPETITION_SUCCESS:
      return action.payload;
    case ADD_A_COMPETITION_FAILED:
      return null;
    default:
      return state;
  }
}