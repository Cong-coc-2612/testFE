import { takeLatest, put } from 'redux-saga/effects';
import { DELETE_LIST_SELECTING_TEAM, ADD_LIST_TEAM_SELECTING } from 'redux-saga/actions';
import { ADD_LIST_TEAM_SELECTING_SUCCESS, ADD_LIST_TEAM_SELECTING_FAILED } from 'components/BracketTeam/reducers';

function* doDeleteListSelectingTeam() {
  try {
    yield put({
      type: ADD_LIST_TEAM_SELECTING,
      response: {
        success: ADD_LIST_TEAM_SELECTING_SUCCESS,
        failed: ADD_LIST_TEAM_SELECTING_FAILED,
      },
      data: { listTeamId: [] },
    });
  } catch (error) {
  }
}

export default function* watchDeleteListSelectingTeam() {
  yield takeLatest(DELETE_LIST_SELECTING_TEAM, doDeleteListSelectingTeam);
}
