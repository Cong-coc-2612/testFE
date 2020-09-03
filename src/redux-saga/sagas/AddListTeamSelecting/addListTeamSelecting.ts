import { put, takeEvery } from 'redux-saga/effects';
import { IRequest, IParams } from 'interfaces/common';
import { SWAP_TWO_TEAM_IN_BRACKET_SUCCESS, SWAP_TWO_TEAM_IN_BRACKET_FAILED } from 'components/BracketTeam/reducers';
import { ADD_LIST_TEAM_SELECTING, SWAP_TWO_TEAM_IN_BRACKET, COMMON_SHOW_NOTIFICATION } from 'redux-saga/actions';

function* doAddListTeamSelecting(request: IRequest<IParams>) {
  try {
    yield put({
      type: request.response.success,
      payload: request.data.listTeamId,
    });
    if ((request.data.listTeamId as number[]).length === 2) {
      yield put({
        type: SWAP_TWO_TEAM_IN_BRACKET,
        response: {
          success: SWAP_TWO_TEAM_IN_BRACKET_SUCCESS,
          failed: SWAP_TWO_TEAM_IN_BRACKET_FAILED,
        },
        data: {
          path: '',
          param: {
            team1Id: (request.data.listTeamId as number[])[0],
            team2Id: (request.data.listTeamId as number[])[1],
          },
          data: {
            competitionId: request.data.competitionId,
          },
        },
      });
    }
  } catch (error) {
    yield put({
      type: request.response.failed,
    });
    yield put({
      type: COMMON_SHOW_NOTIFICATION,
      data: {
        type: 'error',
        title: 'EditTournamentInfo',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchQueryBracketBoardInfo() {
  yield takeEvery(ADD_LIST_TEAM_SELECTING, doAddListTeamSelecting);
}
