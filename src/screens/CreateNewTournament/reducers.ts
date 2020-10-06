import { IParams, IAction } from "interfaces/common";

export const CREATE_NEW_TOURNAMENT_FAILED = 'CREATE_NEW_TOURNAMENT_FAILED';
export const CREATE_NEW_TOURNAMENT_SUCCESS = 'CREATE_NEW_TOURNAMENT_SUCCESS';

export function NewTournament(state: IParams | null = null, action: IAction<IParams>) {
  switch (action.type) {
    case CREATE_NEW_TOURNAMENT_SUCCESS:
      return action.payload;
    case CREATE_NEW_TOURNAMENT_FAILED:
      return null;
    default:
      return state;
  }
}