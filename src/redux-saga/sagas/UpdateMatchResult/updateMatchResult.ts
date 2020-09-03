import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, UPDATE_MATCH_RESULT } from 'redux-saga/actions';


const updateMatchResult = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'results/updateByMatchId';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.PUT, datas, params, paths);
};

function* doUpdateMatchResult(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(updateMatchResult, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data,
      });
      // yield put({
      //   type: QUERY_COMPETITION_INFO_SUCCESS,
      //   payload: { ...store.getState().competitionInfo, Competition: data.Competition },
      // });
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
        title: 'UpdateMatchResult',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchUpdateMatchResult() {
  yield takeLatest(UPDATE_MATCH_RESULT, doUpdateMatchResult);
}
