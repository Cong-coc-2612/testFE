import { IAction, IParams } from "interfaces/common";

export const QUERY_COMPETITION_INFO_SUCCESS = 'QUERY_COMPETITION_INFO_SUCCESS';
export const QUERY_COMPETITION_INFO_FAILED = 'QUERY_COMPETITION_INFO_FAILED';
export const QUERY_ALL_SPORTS_SUCCESS = 'QUERY_ALL_SPORTS_SUCCESS';
export const QUERY_ALL_SPORTS_FAILED = 'QUERY_ALL_SPORTS_FAILED';
export const QUERY_SPORT_INFO_SUCCESS = 'QUERY_SPORT_INFO_SUCCESS';
export const QUERY_SPORT_INFO_FAILED = 'QUERY_SPORT_INFO_FAILED';
export const QUERY_GROUP_STAGE_SETTING_FAILED = 'QUERY_GROUP_STAGE_SETTING_FAILED';
export const QUERY_GROUP_STAGE_SETTING_SUCCESS = 'QUERY_GROUP_STAGE_SETTING_SUCCESS';
export const QUERY_FINAL_STAGE_SETTING_SUCCESS = 'QUERY_FINAL_STAGE_SETTING_SUCCESS';
export const QUERY_FINAL_STAGE_SETTING_FAILED = 'QUERY_FINAL_STAGE_SETTING_FAILED';
export const EDIT_FINAL_STAGE_SETTING_SUCCESS = 'EDIT_FINAL_STAGE_SETTING_SUCCESS';
export const EDIT_FINAL_STAGE_SETTING_FAILED = 'EDIT_FINAL_STAGE_SETTING_FAILED';
export const QUERY_ALL_FORMATS_FAILED = 'QUERY_ALL_FORMATS_FAILED';
export const QUERY_ALL_FORMATS_SUCCESS = 'QUERY_ALL_FORMATS_SUCCESS';
export const EDIT_COMPETITION_SUCCESS = 'EDIT_COMPETITION_SUCCESS';
export const EDIT_COMPETITION_FAILED = 'EDIT_COMPETITION_FAILED';
export const EDIT_GROUP_STAGE_SETTING_SUCCESS = 'EDIT_GROUP_STAGE_SETTING_SUCCESS';
export const EDIT_GROUP_STAGE_SETTING_FAILED = 'EDIT_GROUP_STAGE_SETTING_FAILED';
export const UPDATE_SCHEDULE_SUCCESS = 'UPDATE_SCHEDULE_SUCCESS';
export const UPDATE_SCHEDULE_FAILED = 'UPDATE_SCHEDULE_FAILED';

export function CompetitionInfo(state: IParams | null = null, action: IAction<IParams>) {
  switch (action.type) {
    case QUERY_COMPETITION_INFO_SUCCESS:
      return action.payload;
    case QUERY_COMPETITION_INFO_FAILED:
      return null;
    default:
      return state;
  }
}

export function AllSports(state: IParams[] = [], action: IAction<IParams[]>) {
  switch (action.type) {
    case QUERY_ALL_SPORTS_SUCCESS:
      return action.payload;
    case QUERY_ALL_SPORTS_FAILED:
      return [];
    default:
      return state;
  }
}

export function AllFormats(state: IParams[] = [], action: IAction<IParams[]>) {
  switch (action.type) {
    case QUERY_ALL_FORMATS_SUCCESS:
      return action.payload;
    case QUERY_ALL_FORMATS_FAILED:
      return [];
    default:
      return state;
  }
}

export function SportInfo(state: IParams | null = null, action: IAction<IParams>) {
  switch (action.type) {
    case QUERY_SPORT_INFO_SUCCESS:
      return action.payload;
    case QUERY_SPORT_INFO_FAILED:
      return null;
    default:
      return state;
  }
}

export function GroupStageSetting(state: IParams | null = null, action: IAction<IParams>) {
  switch (action.type) {
    case QUERY_GROUP_STAGE_SETTING_SUCCESS:
      return action.payload;
    case QUERY_GROUP_STAGE_SETTING_FAILED:
      return null;
    default:
      return state;
  }
}

export function FinalStageSetting(state: IParams | null = null, action: IAction<IParams>) {
  switch (action.type) {
    case QUERY_FINAL_STAGE_SETTING_SUCCESS:
      return action.payload;
    case QUERY_FINAL_STAGE_SETTING_FAILED:
      return null;
    default:
      return state;
  }
}