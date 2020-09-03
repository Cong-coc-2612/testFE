import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, QUERY_ALL_FORMATS } from 'redux-saga/actions';


const queryAllFormat = () => {
  const uri = 'formats';
  return query(uri, METHOD.GET, {}, {}, '');
};

function* doQueryAllFormat(request: IRequest<null>) {
  try {
    const response = yield call(queryAllFormat);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data.CompetitionSettings,
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
        title: 'QueryAllFormat',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchQueryAllFormat() {
  yield takeLatest(QUERY_ALL_FORMATS, doQueryAllFormat);
}
