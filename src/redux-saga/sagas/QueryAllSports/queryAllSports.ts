import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, QUERY_ALL_SPORTS } from 'redux-saga/actions';


const queryAllSports = () => {
  const uri = 'sports';
  return query(uri, METHOD.GET, {}, {}, '');
};

function* doQueryAllSports(request: IRequest<null>) {
  try {
    const response = yield call(queryAllSports);
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
        title: 'QueryAllSports',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchQueryAllSports() {
  yield takeLatest(QUERY_ALL_SPORTS, doQueryAllSports);
}
