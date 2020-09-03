import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, GET_MATCH_RESULT } from 'redux-saga/actions';


const getMatchResult = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'results/getByMatchId';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.GET, datas, params, paths);
};

function* doGetMatchResult(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(getMatchResult, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data.Results,
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
        title: 'GetMatchResult',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchGetMatchResult() {
  yield takeLatest(GET_MATCH_RESULT, doGetMatchResult);
}
