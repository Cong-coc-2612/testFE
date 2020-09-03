import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { QUERY_ALL_COMPETITION_BY_TOURNAMENT_ID_SUCCESS } from 'components/CompetitionsSetting/reducers';
import { DELETE_COMPETITION, QUERY_ALL_COMPETITION_BY_TOURNAMENT_ID } from 'redux-saga/actions';

const deleteCompetition = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'competition';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.DELETE, datas, params, paths);
};

function* doDeleteCompetition(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(deleteCompetition, request.data.data, request.data.path, request.data.param);
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
      });
      yield put({
        type: QUERY_ALL_COMPETITION_BY_TOURNAMENT_ID,
        response: {
          success: QUERY_ALL_COMPETITION_BY_TOURNAMENT_ID_SUCCESS,
          failed: QUERY_ALL_COMPETITION_BY_TOURNAMENT_ID_SUCCESS,
        },
        data: {
          path: '',
          param: {
            tournamentId: request.data.data.tournamentId,
            limit: 99,
          },
          data: {},
        },
      });
    } else {
      throw new Error(response.data.error.Message);
    }
  } catch (error) {
    yield put({
      type: request.response.failed,
    });
  }
}

export default function* watchDeleteCompetition() {
  yield takeLatest(DELETE_COMPETITION, doDeleteCompetition);
}
