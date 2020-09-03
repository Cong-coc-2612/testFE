import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, QUERY_SPORTS_BY_TOURNAMENT } from 'redux-saga/actions';


const querySportsByTournament = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'sports/getByTournamentId';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.GET, datas, params, paths);
};

function* doQuerySportsByTournament(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(querySportsByTournament, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data.Sports,
      });
    } else {
      throw new Error(response.data.error.Message);
    }
  } catch (error) {
    yield put({
      type: request.response.failed,
    });
    yield put({
      type: COMMON_SHOW_NOTIFICATION,
      data: {
        type: 'error',
        title: 'QuerySportsByTournament',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchQuerySportsByTournament() {
  yield takeLatest(QUERY_SPORTS_BY_TOURNAMENT, doQuerySportsByTournament);
}
