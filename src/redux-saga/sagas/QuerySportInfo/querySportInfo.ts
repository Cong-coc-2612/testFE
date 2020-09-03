import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, QUERY_SPORT_INFO } from 'redux-saga/actions';


const querySportInfo = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'sport';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.GET, datas, params, paths);
};

function* doQuerySportInfo(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(querySportInfo, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data.Sport,
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
        title: 'QuerySportInfo',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchQuerySportInfo() {
  yield takeLatest(QUERY_SPORT_INFO, doQuerySportInfo);
}
