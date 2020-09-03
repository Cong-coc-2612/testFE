import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { SEARCH_TOURNAMENT, COMMON_SHOW_NOTIFICATION } from 'redux-saga/actions';


const searchTournament = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'tournaments/getBySearchString';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.GET, datas, params, paths);
};

function* doSearchTournament(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(searchTournament, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: {Tournaments: data.Tournaments, TotalPage: data.TotalPage},
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
        title: 'SearchTournament',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchSearchTournament() {
  yield takeLatest(SEARCH_TOURNAMENT, doSearchTournament);
}
