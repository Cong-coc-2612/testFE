import { SET_GLOBAL_SEARCH_STRING } from "redux-saga/actions";

export const setGlobalSearchString = (data: string) => ({
  type: SET_GLOBAL_SEARCH_STRING,
  payload: data,
});