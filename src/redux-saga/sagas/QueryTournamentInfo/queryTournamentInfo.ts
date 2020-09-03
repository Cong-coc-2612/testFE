import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, QUERY_TOURNAMENT_INFO } from 'redux-saga/actions';


const queryTournamentInfo = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'tournament';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.GET, datas, params, paths);
};

function* doQueryTournamentInfo(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(queryTournamentInfo, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: { Tournament: data.Tournament, Config: response.data.config.Global },
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
        title: 'QueryTournamentInfo',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchQueryTournamentInfo() {
  yield takeLatest(QUERY_TOURNAMENT_INFO, doQueryTournamentInfo);
}
