import { call, takeLatest, put } from 'redux-saga/effects';
import { query, METHOD } from 'utils/socketApi';
import { IRequest, IParams, IBigRequest } from 'interfaces/common';
import { COMMON_SHOW_NOTIFICATION, UPDATE_SCHEDULE } from 'redux-saga/actions';

const updateSchedule = (data: IParams, path: string | number, param: IParams) => {
  const uri = 'schedule';
  const datas = { ...data };
  const paths = path;
  const params = { ...param };
  return query(uri, METHOD.POST, datas, params, paths);
};

function* doUpdateSchedule(request: IRequest<IBigRequest>) {
  try {
    const response = yield call(updateSchedule, request.data.data, request.data.path, request.data.param);
    const data = response.data.result;
    if (response.data.error.MessageCode === 0) {
      yield put({
        type: request.response.success,
        payload: data,
      });
    } else {
      throw new Error(response.data.error.Message);
    }
  } catch (error) {
    yield put({
      type: COMMON_SHOW_NOTIFICATION,
      data: {
        type: 'error',
        title: 'UpdateSchedule',
        content: error,
        time: new Date(),
      },
    });
  }
}

export default function* watchUpdateSchedule() {
  yield takeLatest(UPDATE_SCHEDULE, doUpdateSchedule);
}
